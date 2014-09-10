var stream = undefined;
var isRecording = false;
var recordRTC = undefined;
var options = undefined;

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
  options = _options;
  this.onConnection = bindConnection(this.onConnection, this);
  navigator.getUserMedia(options, this.onConnection, this.onError);
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
  console.log(options);
  if (!isRecording && stream != undefined) {
    recordRTC = RecordRTC(stream, options);
    recordRTC.startRecording();
  } else if (isRecording) {
    recordRTC.stopRecording(function(_url){
      var el = _ev.target;
      el.src = _url;
      el.muted = false;
      el.loop = true;      
      el.setAttribute('loop',true);
      el.play();
    });
  }
  isRecording = !isRecording;
}

new WebRTC({
  video: true,
  audio: true,
  type: 'video'
});
