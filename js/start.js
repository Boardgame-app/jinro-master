function start() {
  document.getElementById("title-image").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("copyright").style.display = "none";
  document.getElementById("content").style.display = "block";
}

function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', setVH);
setVH();

