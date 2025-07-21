// 選択された値によって対応する row の背景色を変える処理
document.querySelectorAll(".job-select").forEach((select, index) => {
  select.addEventListener("change", () => {
    const i = index + 1;
    const row = document.getElementById(`row${index + 1}`);
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    const pn = document.getElementById(`pn${i}`);

    if (select.value === "人狼*") {
      row.style.backgroundColor = "red";
      //if (pn && pn.value.trim() !== "") {
        // 空白じゃない場合：有効化
        //if (flb) flb.disabled = false;
        //if (fla) fla.disabled = true;
        if (fla) fla.checked = false; // 任意：チェック状態も解除
      //}
    }else if (select.value === "妖狐"){
      row.style.backgroundColor = "rgba(210, 50, 210, 1)";
      //if (pn && pn.value.trim() !== "") {
        // 空白じゃない場合：有効化
        //if (fla) fla.disabled = false;
        //if (flb) flb.disabled = false;
      //}
    } else {
      row.style.backgroundColor = ""; // 元に戻す（空にする）
      //if (pn && pn.value.trim() !== "") {
        // 空白じゃない場合：有効化
        //if (fla) fla.disabled = false;
        //if (flb) flb.disabled = false;
      //}
    }
  });
});

function toggleRows() {
let visibleSwitchesAllOn = true;

  for (let i = 1; i <= 12; i++) {
    const row = document.getElementById(`row${i}`);
    const sw = document.getElementById(`sw${i}`);

    // 表示されている行の中で、スイッチがOFFのものがあれば false
    if (!row.classList.contains("hidden") && !sw.checked) {
      visibleSwitchesAllOn = false;
      break;
    }
  }

  if (visibleSwitchesAllOn) {
    // 表示されている行にOFFが含まれていなければ、全行を表示に戻す
    showallrow()
  } else {
    // OFFのスイッチに対応する行だけ非表示にする
    hiderow()
  }
}

function hiderow() {
  for (let i = 1; i <= 12; i++) {
    const input = document.getElementById(`pn${i}`);
    const row = document.getElementById(`row${i}`);

    if (!input.value.trim()) {
      // 入力が空白または未入力の場合は非表示
      row.classList.add("hidden");
    } else {
      // 入力されている場合は表示
      row.classList.remove("hidden");
    }
  }
}

function showallrow(){
  for (let i = 1; i <= 12; i++) {
    document.getElementById(`row${i}`).classList.remove("hidden");
  }
}