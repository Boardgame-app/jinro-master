function openrcModal() {
    document.getElementById("rcModal").style.display = "flex";
}

function closercModal() {
    document.getElementById("rcModal").style.display = "none";
}

function resetForm() {

  for (let i = 1; i <= 19; i++) {
    // fla・flb をオフに
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    if (fla) fla.checked = false;
    if (flb) flb.checked = false;

    const pn = document.getElementById(`pn${i}`);
    const sw = document.getElementById(`sw${i}`);

    // pn の内容を先に使って sw を判定
    if (pn && sw) {
      const value = pn.value.trim(); // 一時変数に保存
      sw.checked = value !== "";
      sw.dispatchEvent(new Event("change"));
    }

    // その後で pn を空にする
    if (pn) pn.value = "";

    // 行を表示（hidden クラスを外す）
    const row = document.getElementById(`row${i}`);
    if (row) row.classList.remove("hidden");
  }
    document.getElementById("rcModal").style.display = "none";
    gameend()
    
}