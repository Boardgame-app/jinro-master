function toggleRows() {
let visibleSwitchesAllOn = true;

  for (let i = 1; i <= 19; i++) {
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

function hiderow(){
  for (let i = 1; i <= 19; i++) {
    const sw = document.getElementById(`sw${i}`);
    const row = document.getElementById(`row${i}`);
    if (!sw.checked) {
      row.classList.add("hidden");
    } else {
      row.classList.remove("hidden");
    }
  }
}

function showallrow(){
  for (let i = 1; i <= 19; i++) {
    document.getElementById(`row${i}`).classList.remove("hidden");
  }
}