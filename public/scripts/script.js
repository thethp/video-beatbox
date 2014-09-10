var stream = undefined;
var isRecording = false;
var recordRTC = undefined;
var recordATC = undefined;

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

WebRTC.prototype.onElClick = function(_ev,index) {
  var el = _ev.target;
  var elA = _ev.target.getElementsByTagName('audio')[0];
  if (!isRecording && stream != undefined) {
    recordRTC = RecordRTC(stream, {type: 'video'});
    recordATC = RecordRTC(stream);
    recordRTC.startRecording();
    recordATC.startRecording();
  } else if (isRecording) {
    recordRTC.stopRecording(function(_url){      
      el.src = _url;
    });
    recordATC.stopRecording(function(_url) {
      elA.src = _url;
      elA.muted = false;
    });
    el.addEventListener('loadeddata', function() {
      elA.play();
      setInterval(function() {
        elA.currentTime = 0;
        el.currentTime = 0;
      },el.duration*1000);
    });
  }
  isRecording = !isRecording;
}

new WebRTC({
  video: true,
  audio: true
});
