let audioElement = new Audio('se/bgm.ogg');
audioElement.loop = true;
let isPlaying = false;

function toggleBGM() {
  if (!isPlaying) {
    audioElement.play();
    isPlaying = true;
    event.target.textContent = '🔊';
  } else {
    audioElement.pause();
    // audioElement.currentTime = 0;
    isPlaying = false;
    event.target.textContent = '🔇';
  }
}