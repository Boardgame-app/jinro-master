document.getElementById("startscreen").addEventListener("click", function() {
  document.getElementById("title-image").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("copyright").style.display = "none";
  document.getElementById("content").style.display = "block";
});

<script>
  function adjustScale() {
    const content = document.querySelector('.content');
    const scaleX = window.innerWidth / 800;
    const scaleY = window.innerHeight / 600;
    const scale = Math.min(scaleX, scaleY);  // 画面に収まる最大サイズに調整
    content.style.setProperty('--scale', scale);
  }

  window.addEventListener('resize', adjustScale);
  window.addEventListener('load', adjustScale);
</script>
