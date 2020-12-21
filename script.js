// const video = document.getElementById('video')
var slideIndex = 0;


// video.addEventListener('playing', async () => {
//   console.log("Loaded..")

//   const displaySize = { width: video.width, height: video.height }

//   setInterval(async () => {

//     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender()
//     const resizedDetections = faceapi.resizeResults(detections, displaySize)

//     var mygender;
//     var myage;
//     var prevGender;
//     var genderFlag = 0;
//     const rounded = Math.floor(myage);

//     resizedDetections.forEach(detections => {

//       mygender = detections.gender

//       myage = detections.age



//       name = "Hello, " + name
//       if (mygender == "male" && prevGender != detections.gender && genderFlag != 1) {

//         var x = document.getElementsByClassName("mySlides");
//         x[0].src = './male_ads/0.png';
//         x[1].src = './male_ads/1.png';
//         x[2].src = './male_ads/2.png';
//         x[3].src = './male_ads/3.png';
//         x[4].src = './male_ads/4.png';
//         x[5].src = './male_ads/5.png';
//         console.log(x);

//         prevGender = detections.gender;
//         genderFlag = 1;


//       }
//       else if (mygender == "female" && prevGender != detections.gender && genderFlag != 2) {

//         var x = document.getElementsByClassName("mySlides");
//         x[0].src = './female_ads/0.png';
//         x[1].src = './female_ads/1.png';
//         x[2].src = './female_ads/2.png';
//         x[3].src = './female_ads/3.png';
//         x[4].src = './female_ads/4.png';
//         x[5].src = './female_ads/5.png';
//         console.log(x);

//         prevGender = detections.gender;
//         genderFlag = 2;


//       }
//       else {

//         if (genderFlag != 0) {

//           var x = document.getElementsByClassName("mySlides");
//           console.log(x);
//           x[0].src = './generic_ads/0.jpg';
//           x[1].src = './generic_ads/1.jpg';
//           x[2].src = './generic_ads/2.jpg';
//           x[3].src = './generic_ads/3.jpg';
//           x[4].src = './generic_ads/4.jpg';
//           x[5].src = './generic_ads/5.jpg';

//         }
//         genderFlag = 0;
//       }

//       console.log(detections.gender + "------" + prevGender + "---Flag " + genderFlag);

//     })

//     if (detections.length == 0) {

//       var x = document.getElementsByClassName("mySlides");
//       x[0].src = './generic_ads/0.jpg';
//       x[1].src = './generic_ads/1.jpg';
//       x[2].src = './generic_ads/2.jpg';
//       x[3].src = './generic_ads/3.jpg';
//       x[4].src = './generic_ads/4.jpg';
//       x[5].src = './generic_ads/5.jpg';
//       console.log(x);
//       genderFlag = 0;
//       console.log(detections.gender + "------" + prevGender + "---Flag " + genderFlag);

//     }
//   }, 1000)

// })



function loadLabeledImages() {
  const labels = ['Abraham', 'Georgy', 'Murali', 'Omal', 'Sreenath', 'Vikas']
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

// {
/* <script>
var slideIndex = 0;
showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = 6;
    for (i = 0; i < slides.length; {
  slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (var i = 0; i < dots.length; {
  dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
</script> */
// }

function showMaleAds() {
  var slideIndex = 0;
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = 6;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}





var DetectedGender = 'generic';
var prevGender;
var maleFlag;
var femaleFlag;
setInterval(getFacialData(), 1000);

function getFacialData() {

  $.ajax({
    type: "GET",
    // dataType: json,
    url: "http://192.168.1.20:8100/JSON",
    success: function (data) {
      // var strlen = data.length;
      // var res = data.substring(1, strlen-1);
      var obj = JSON.parse(data);
      console.log(obj.people.length);
      if (obj.people.length == 1) {

        for (var i = 0; i < obj.people.length; i++) {
          var gender = obj.people[i].gender;
          console.log(prevGender);
          if (gender <= -95 && prevGender >= -95) {
            console.log("male detected");

            var x = document.getElementsByClassName("mySlides");
            x[0].src = './male_ads/0.png';
            x[1].src = './male_ads/1.png';
            x[2].src = './male_ads/2.png';
            x[3].src = './male_ads/3.png';
            x[4].src = './male_ads/4.png';
            x[5].src = './male_ads/5.png';
            //console.log(x);

          }
          else if (gender >= 95 && prevGender <= 95) {
            console.log("Female detected");

            var x = document.getElementsByClassName("mySlides");
            x[0].src = './female_ads/0.png';
            x[1].src = './female_ads/1.png';
            x[2].src = './female_ads/2.png';
            x[3].src = './female_ads/3.png';
            x[4].src = './female_ads/4.png';
            x[5].src = './female_ads/5.png';
            //console.log(x);
          }

          prevGender = gender;
        }

      }
      else if (obj.people.length > 1) {
        maleFlag = 0;
        femaleFlag = 0;
        for (var i = 0; i < obj.people.length; i++) {
          var gender = obj.people[i].gender;
          if (gender <= -95) {
            maleFlag++;
          }
          else if (gender >= 95) {
            femaleFlag++;
          }

        }
        if (maleFlag > 0 && femaleFlag == 0) {
          //show male ads
          console.log("males detected");
          var x = document.getElementsByClassName("mySlides");
          x[0].src = './male_ads/0.png';
          x[1].src = './male_ads/1.png';
          x[2].src = './male_ads/2.png';
          x[3].src = './male_ads/3.png';
          x[4].src = './male_ads/4.png';
          x[5].src = './male_ads/5.png';
          //console.log(x);
        }
        else if (femaleFlag > 0 && maleFlag == 0) {
          //show female ads
          console.log("females detected");
          var x = document.getElementsByClassName("mySlides");
          x[0].src = './female_ads/0.png';
          x[1].src = './female_ads/1.png';
          x[2].src = './female_ads/2.png';
          x[3].src = './female_ads/3.png';
          x[4].src = './female_ads/4.png';
          x[5].src = './female_ads/5.png';
          //console.log(x);
        }
        else if (femaleFlag > 0 && maleFlag >= 0) {
          //show ads relevant for both(eg. family ads)
          console.log("both detected");
          var x = document.getElementsByClassName("mySlides");
          x[0].src = './family_ads/0.png';
          x[1].src = './family_ads/1.jpg';
          x[2].src = './family_ads/2.png';
          x[3].src = './male_ads/3.png';
          x[4].src = './female_ads/4.png';
          x[5].src = './male_ads/5.png';

          //console.log(x);
        }
        else {
          console.log("Generic");
          var x = document.getElementsByClassName("mySlides");
          console.log(x);
          x[0].src = './generic_ads/0.jpg';
          x[1].src = './generic_ads/1.jpg';
          x[2].src = './generic_ads/2.jpg';
          x[3].src = './generic_ads/3.jpg';
          x[4].src = './generic_ads/4.jpg';
          x[5].src = './generic_ads/5.jpg';
        }
      }
      else {
        console.log("Generic");
        maleFlag = 0;
        femaleFlag = 0;
        var x = document.getElementsByClassName("mySlides");
        console.log(x);
        x[0].src = './generic_ads/0.jpg';
        x[1].src = './generic_ads/1.jpg';
        x[2].src = './generic_ads/2.jpg';
        x[3].src = './generic_ads/3.jpg';
        x[4].src = './generic_ads/4.jpg';
        x[5].src = './generic_ads/5.jpg';
      }

    },
    error: function () {
      alert('Some error occurred!');
    }
  });
  setTimeout(getFacialData, 1000);
}


