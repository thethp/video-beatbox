var muted = false;
var videos = [];
var audios = [];
var beat = 681;
var beatCounter = 0;
var beatEvent;

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

window.onload = function() {
  if(navigator.getUserMedia !== undefined) {
    videos = document.getElementsByTagName('video');
    audios = document.getElementsByTagName('audio');

    //Startup WebRTC and RecordRTC
    new WebRTC({
      video: true,
      audio: true
    });

   beatEvent = setInterval(onBeat,beat);
    
    //EVENT LISTENERS
    document.getElementById('toggle').addEventListener('click', muteAudio);
    document.getElementsByName('bpm')[0].addEventListener('change', updateInterval);
    document.getElementsByName('numBeats')[0].addEventListener('change', updateInterval);
    for(var els = document.getElementsByName('muter'),i=0;i<els.length;i++) {
      els[i].addEventListener('click', muteOneAudio);
    }
  }
}

muteAudio = function(_ev) {
  muted = !muted;
  for(var els = document.getElementsByTagName('audio'),i=0;i<els.length;i++) {
    els[i].muted = muted;
  }
  document.getElementById('toggle').classList.toggle('on');
}

muteOneAudio = function(_ev) {
  var num = _ev.target.getAttribute('num');
  document.getElementsByTagName('audio')[num].muted = !document.getElementsByTagName('audio')[num].muted;
  _ev.target.classList.toggle('paused');
}

onBeat = function(_ev) {
  if(beatCounter % parseInt(document.getElementsByName('numBeats')[0].value) == 0) {
    document.getElementById('pulse').style.background = '#090';
    onMeasure();
  } else {
      document.getElementById('pulse').style.background ='#900';
  }
  setTimeout(function(){document.getElementById('pulse').style.background = '#FFF';},beat/4);
 
  beatCounter++;
}

onMeasure = function(_ev) {
  for(var i=0;i<videos.length;i++) {
    if(videos[i].readyState === 4 && audios[i].readyState === 4) {
      videos[i].currentTime = 0;
      videos[i].play();
      audios[i].currentTime = 0;
      audios[i].play();
    }
  }
}

updateInterval = function(_ev) {
  clearInterval(beatEvent);

  beat = 60/document.getElementsByName('bpm')[0].value * 1000;
  beatCounter = 0;

  beatEvent = setInterval(onBeat,beat);
}
