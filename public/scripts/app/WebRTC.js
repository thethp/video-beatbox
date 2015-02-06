var stream = undefined;
var recordVideo;
var recordAudio;

function WebRTC(_options) {
  this.options = _options;
  if(navigator.getUserMedia !== undefined) {
    navigator.getUserMedia(this.options, this.onConnection, this.onError);
  } else {
    alert("Your browser doesn't support WebRTC, this site won't work for you");
  }
}

WebRTC.prototype.onConnection = function(_stream) {
  stream = _stream;
  for(var els = document.getElementsByTagName('video'),i=0;i<els.length;i++) {
    els[i].src = URL.createObjectURL(_stream);
    els[i].addEventListener('click', handleRecording);
  }
}

WebRTC.prototype.onError = function(_error) {
  console.log("Error: ",_error);
}

handleRecording = function(_ev,index) {
  var elV = _ev.target;
  var elA = _ev.target.getElementsByTagName('audio')[0];
  if (stream != undefined) {
    if(!document.getElementsByName('headphones')[0].checked) muteAudio();
    recordVideo = RecordRTC(stream, {type: 'video'});
    recordAudio = RecordRTC(stream);
    recordVideo.startRecording();
    recordAudio.startRecording();
    console.log(parseInt(document.getElementsByName('numBeats')[0].value)*beat);
    setTimeout(function() {
      recordVideo.stopRecording(function(_url){
        elV.src = _url;
	elV.parentElement.setAttribute('hasContent',true);
      });
      recordAudio.stopRecording(function(_url) {
        elA.src = _url;
      });
      if(!document.getElementsByName('headphones')[0].checked) muteAudio();
    },parseInt(document.getElementsByName('numBeats')[0].value)*beat);
  }
}

stopRecording = function(_elV,_elA) {
  recordVideo.stopRecording(function(_url){
    elV.src = _url;
  });
  recordAudio.stopRecording(function(_url) {
    elA.src = _url;
  });
}
