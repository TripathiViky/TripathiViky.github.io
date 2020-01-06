
const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  faceapi.nets.faceExpressionNet.loadFromUri('models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  var name = "Guest";
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
//document.body.append("Uploaded")
  // const canvas = faceapi.createCanvasFromMedia(video)
  // document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  // faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {

    // const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    // const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

    results.forEach((result, i) => {
      // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      // const box = resizedDetections[i].detection.box
      // const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      name = result.toString()
      name = name.substring(0,name.length-6)
      if(name.startsWith("u",0)){
      name="Hello, Guest"
      console.log("Hello, Guest")  
    }
    else{
    name= "Hello, "+name
    console.log(name)
    }
    document.getElementById('output').innerHTML=name;
      //document.body.append(result.toString())
	  // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    // drawBox.draw(canvas)
    
	  //faceapi.drawBox.draw(canvas)
    //drawBox.draw(canvas)
    })
  }, 500)
})

function loadLabeledImages() {
  const labels = ['Abraham','Georgy','Murali','Sreenath','Vikas']
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



