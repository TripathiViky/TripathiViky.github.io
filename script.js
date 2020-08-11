const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  faceapi.nets.faceExpressionNet.loadFromUri('models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
  faceapi.nets.ageGenderNet.loadFromUri('models')
]).then(startVideo)

function startVideo() {
navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err) 
  )
}

video.addEventListener('playing', async() => {
	console.log("Loaded..")
  var name = "Air Arabia";
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

  const displaySize = { width: video.width, height: video.height }
 
  setInterval(async () => {

    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    const exdetections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

    const resizedexDetections = faceapi.resizeResults(exdetections, displaySize)
    const agegenderdetections = await faceapi.detectSingleFace(video).withAgeAndGender()



    try{
      const resizedagenGenderDetections = faceapi.resizeResults(agegenderdetections, displaySize)
      var mygender = resizedagenGenderDetections.gender
      var myage = resizedagenGenderDetections.age
      let expressionobj = resizedexDetections[0].expressions;
      var max = Math.max.apply(null,Object.keys(expressionobj).map(function(x){ return expressionobj[x] }));
var myexpression = Object.keys(expressionobj).filter(function(x){ return expressionobj[x] == max; })[0]
      console.log(resizedexDetections[0].expressions)
    }
    catch{
      myage="";
      mygender=""
    }
    
    const rounded = Math.floor(myage);
    results.forEach((result, i) => {

      name = result.toString()
      name = name.substring(0,name.length-6)
      

      if(name.startsWith("u",0)){
      if(mygender=="male"){
        mygender="👨 "+rounded
      }
      else if(mygender=="female"){
        mygender="👩 "+rounded
      }
      else{
        mygender=""+rounded
      }
      
      name="Welcome Air arabia"
      console.log("Hello, Guest")  
      if(myexpression=="neutral"){
        myexpression="🙂 Smile Please!"
      }
      else if(myexpression=="sad"){
        myexpression="😟 Why are you sad?"
      }
      else if(myexpression=="happy"){
        myexpression="😄 What makes you happy?"
      }
      else if(myexpression=="angry"){
        myexpression="😡 Don't be angry"
      }
      else if(myexpression=="fearful"){
        myexpression="😞 You got scared"
      }
      else if(myexpression=="surprised"){
        myexpression="😮 Surprise!!!"
      }
      else{
        myexpression=""
      }
    }
    else{
      
      
    name= "Hello, "+name
    if(mygender=="male"){
      mygender="👨 "+rounded
    }
    else if(mygender=="female"){
      mygender="👩 "+rounded
    }
    else{
      mygender=""+rounded
    }
    if(myexpression=="neutral"){
      myexpression="🙂 Smile Please!"
    }
    else if(myexpression=="sad"){
      myexpression="😟 Why are you sad?"
    }
    else if(myexpression=="happy"){
      myexpression="😄 What makes you happy?"
    }
    else if(myexpression=="angry"){
      myexpression="😡 Don't be angry"
    }
    else if(myexpression=="fearful"){
      myexpression="😞 You got scared"
    }
    else if(myexpression=="surprised"){
      myexpression="😮 Surprise!!!"
    }
    else{
      myexpression="🙂 Smile Please!"
    }
    console.log(name)
    }
    document.getElementById('output').innerHTML=name;
    document.getElementById('outexpression').innerHTML=myexpression;
    document.getElementById('outgenderage').innerHTML=mygender;
    })
  }, 500)
})

function loadLabeledImages() {
  const labels = ['Abraham','Georgy','Murali','Omal','Sreenath','Vikas']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
