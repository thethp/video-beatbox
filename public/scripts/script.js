var muted = false;
navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

window.onload = function() {
  if(navigator.getUserMedia !== undefined) {
    //Startup WebRTC and RecordRTC
    new WebRTC({
      video: true,
      audio: true
    });
    
    //EVENT LISTENERS
    document.getElementById('toggle').addEventListener('click', muteAudio);
  }
}

muteAudio = function(_ev) {
  muted = !muted;
  for(var els = document.getElementsByTagName('audio'),i=0;i<els.length;i++) {
    els[i].muted = muted;
  }
  document.getElementById('toggle').classList.toggle('on');
}
