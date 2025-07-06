function openCardModalById(id){
  if (btn4.textContent === "ゲーム中断") {
    // select要素のIDを生成
    const selectId = `jb${id}`;
    const selectElement = document.getElementById(selectId);

    if (selectElement) {
      const selectedValue = selectElement.value;

      // 画像の切り替え
      let imagePath = ""; // 初期化

      // 値に応じた画像パス（ここに必要な条件追加）
      switch (selectedValue) {
        case "市民":
          imagePath = "png/shimin.png";
          break;
        case "人狼":
          imagePath = "png/jinro.png";
          break;
        case "占い師":
          imagePath = "png/uranai.png";
          break;
        case "ボディガード":
          imagePath = "png/bodygard.png";
          break;
        case "霊媒師":
          imagePath = "png/reibai.png";
          break;
        case "裏切り者":
          imagePath = "png/uragiri.png";
          break;
        case "妖狐":
          imagePath = "png/youko.png";
          break;
        case "ハンター":
          imagePath = "png/hunter.png";
          break;
        case "タフガイ":
          imagePath = "png/toughguy.png";
          break;
        case "肥満児":
          imagePath = "png/himanji.png";
          break;
        case "狼少年":
          imagePath = "png/syounen.png";
          break;
        case "逃亡者":
          imagePath = "png/toubou.png";
          break;
        case "サムライ":
          imagePath = "png/samurai.png";
          break;
        default:
          imagePath = ""; // 未設定時などの画像
      }

      document.getElementById("modalImage").src = imagePath;

      // モーダル表示
      document.getElementById("cardModal").style.display = "flex";
    }
  }
}

function closeCardModal() {
  document.getElementById("cardModal").style.display = "none";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("cardModal");
  if (e.target === modal) {
    closeCardModal();
  }
});