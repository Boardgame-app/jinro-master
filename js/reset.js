function openrcModal() {
    document.getElementById("rcModal").style.display = "flex";
}

function closercModal() {
    document.getElementById("rcModal").style.display = "none";
}

//モーダルの外側をクリックすると閉じる
window.addEventListener("click", (e) => {
  const modal = document.getElementById("rcModal");
  if (e.target === modal) {
    closercModal();
  }
});

function resetForm() {

  for (let i = 1; i <= 12; i++) {
    // fla・flb をオフに
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    if (fla) fla.checked = false;
    if (flb) flb.checked = false;

    const pn = document.getElementById(`pn${i}`);
    const sw = document.getElementById(`sw${i}`);

    // pn の内容を先に使って sw を判定
    //if (pn && sw) {
    //  const value = pn.value.trim(); // 一時変数に保存
    //  sw.checked = value !== "";
    //  sw.dispatchEvent(new Event("change"));
    //}

  for (let i = 1; i <= 12; i++) {
    const checkbox = document.getElementById(`sw${i}`);
    if (checkbox) {
      checkbox.checked = false;
    }
  }
  
    // その後で pn を空にする
    if (pn) pn.value = "";

    // 役職を全て市民に
    for (let i = 1; i <= 12; i++) {
      const select = document.getElementById(`jb${i}`);
      if (select) {
        select.value = "市民";
      }
    }

    // 行を表示（hidden クラスを外す）
    const row = document.getElementById(`row${i}`);
      if (row) {
        row.classList.remove("hidden");     // 非表示を解除
        row.style.backgroundColor = "";     // 背景色をリセット
      }

  }
    document.getElementById("rcModal").style.display = "none";
    gameend()
    
}

function jobreset() {

  for (let i = 1; i <= 12; i++) {
    // fla・flb をオフに
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    if (fla) fla.checked = false;
    if (flb) flb.checked = false;

    // 役職を全て市民に
    const select = document.getElementById(`jb${i}`);
    if (select) {
      select.value = "市民";
    }

    //名前の入っている生存スイッチをオンに
    const input = document.getElementById(`pn${i}`);
    const checkbox = document.getElementById(`sw${i}`);
    if (input && checkbox) {
      checkbox.checked = input.value.trim() !== "";
    }

    // 行を表示（hidden クラスを外す）
    const row = document.getElementById(`row${i}`);
      if (row) {
        row.classList.remove("hidden");     // 非表示を解除
        row.style.backgroundColor = "";     // 背景色をリセット
      }

  }
    document.getElementById("rcModal").style.display = "none";
    gameend()
    
}