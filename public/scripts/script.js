var muted = false;
navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

window.onload = function() {
  console.log(navigator.getUserMedia);
  if(navigator.getUserMedia == undefined) {
    alert("Your browser doesn't support WebRTC, this site won't work for you");
  } else {
    new WebRTC({
      video: true,
      audio: true
    });

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
