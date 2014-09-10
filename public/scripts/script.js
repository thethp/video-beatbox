var muted = false;

new WebRTC({
  video: true,
  audio: true
});

//EVENT LISTENERS
window.onload = function() {
  document.getElementById('toggle').addEventListener('click', function() {
    muted = !muted;
    for(var els = document.getElementsByTagName('audio'),i=0;i<els.length;i++) {
      els[i].muted = muted;
    }
    document.getElementById('toggle').classList.toggle('on');      
  });
}
