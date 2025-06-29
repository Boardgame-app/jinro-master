// すべての .openCard にクリックイベントをつける
document.querySelectorAll(".openCard").forEach(elem => {
  elem.addEventListener("click", () => {
    const title = elem.getAttribute("data-title");
    const imgSrc = elem.getAttribute("data-img");

    // モーダル内の中身を切り替える
    document.getElementById("modalTitle").textContent = "";
    document.getElementById("modalImage").src = imgSrc;
    document.getElementById("cardModal").style.display = "flex";
  });
});

function closeCardModal() {
  document.getElementById("cardModal").style.display = "none";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("cardModal");
  if (e.target === modal) {
    closeCardModal();
  }
});