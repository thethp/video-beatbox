var webRTC;
navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

function bindConnection(fn,me) {
  return function() { 
    return fn.apply(me, arguments);
  }
}

function WebRTC(options) {
  this.options = options;
  this.onConnection = bindConnection(this.onConnection, this);
  navigator.getUserMedia(this.options, this.onConnection, this.onError);
}

WebRTC.prototype.onConnection = function(stream) {
  for(var els = document.getElementsByTagName('video'),i=0;i<els.length;i++) {
    els[i].src = URL.createObjectURL(stream);
  }
}

WebRTC.prototype.onError = function(error) {
  console.log("Error: ",error);
}

new WebRTC({
  video: true,
  audio: true
});
