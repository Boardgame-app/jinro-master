function start() {
  document.getElementById("title-image").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("copyright").style.display = "none";
  document.getElementById("content").style.display = "block";
}

const bgm = document.getElementById('bgm');

function playBGM() {
  bgm.currentTime = 0; // 再生位置を先頭に戻す
  //bgm.play();
}

function stopBGM() {
  //bgm.pause();
}