prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fhZMpISpJ/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
function speak()
{
  var synth = window.speechSynthesis;
  speak_data_1 = "The first prediction is " + prediction_1;
  speak_data_2 = "And the second prediction is " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img , gotResult);
}
function gotResult (error , results) {
 if(error) {
  console.error(error);
 }
 else {
  console.log(results);
  prediction_1 = results[0].label;
  prediction_2 = results[1].label;
  document.getElementById("result_emotion_name").innerHTML = prediction_1;
  document.getElementById("result_emotion_name2").innerHTML = prediction_2;
  speak();
  if(prediction_1 == 'happy') {
  document.getElementById("update_emoji").innerHTML = "&#128522";
  }
  if(prediction_1 == 'sad') {
    document.getElementById("update_emoji").innerHTML = "&#128532";
    }
    if(prediction_1 == 'angry') {
      document.getElementById("update_emoji").innerHTML = "&#128545";
      }
      if(prediction_2 == 'happy') {
        document.getElementById("update_emoji2").innerHTML = "&#128522";
        }
        if(prediction_2 == 'sad') {
          document.getElementById("update_emoji2").innerHTML = "&#128532";
          }
          if(prediction_2 == 'angry') {
            document.getElementById("update_emoji2").innerHTML = "&#128545";
            }
 }
 
 
 
}
window.addEventListener("keydown", capture_keydown);
function capture_keydown(e) {
keyPressed = e.keyCode;
if(keyPressed == '67') {
  take_snapshot();
}
if(keyPressed == '80') {
  check();
}
}
 

 
