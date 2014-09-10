var stream = undefined;
var isRecording = false;
var recordRTC = undefined;
navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

function bindConnection(_fn,_me) {
  return function() { 
    return _fn.apply(_me, arguments);
  }
}

function WebRTC(_options) {
  this.options = _options;
  this.onConnection = bindConnection(this.onConnection, this);
  navigator.getUserMedia(this.options, this.onConnection, this.onError);
}

WebRTC.prototype.onConnection = function(_stream) {
  stream = _stream;
  for(var els = document.getElementsByTagName('video'),i=0;i<els.length;i++) {
    els[i].src = URL.createObjectURL(_stream);
    els[i].addEventListener('click', this.onElClick);
  }
}

WebRTC.prototype.onError = function(_error) {
  console.log("Error: ",_error);
}

WebRTC.prototype.onElClick = function(_ev) {
  if (!isRecording && stream != undefined) {
    recordRTC = RecordRTC(stream);
    recordRTC.startRecording();
  } else if (isRecording) {
    recordRTC.stopRecording(function(_url){
      _ev.target.src = _url;
      _ev.target.removeAttribute('muted');
      _ev.target.muted = false;
      _ev.target.play();
    });
  }
  isRecording = !isRecording;
}

new WebRTC({
  video: true,
  audio: true
});
