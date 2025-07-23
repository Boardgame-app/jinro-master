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
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    const pn = document.getElementById(`pn${i}`);
    const sw = document.getElementById(`sw${i}`);
    const select = document.getElementById(`jb${i}`);
    const row = document.getElementById(`row${i}`);

    if (fla) {
      fla.checked = false;
      fla.disabled = true;
    }
    if (flb) {
      flb.checked = false;
      flb.disabled = true;
    }

    if (pn) pn.value = "";
    if (sw) {
      sw.checked = false;
      sw.dispatchEvent(new Event("change"));
    }

    if (select) select.value = "市民";

    if (row) {
      row.classList.remove("hidden");
      row.style.backgroundColor = "";
    }
  }

  document.getElementById("rcModal").style.display = "none";
  document.querySelector(".bg-layer").style.backgroundImage = "";
  
  const btn6 = document.getElementById("btn6");
  btn6.textContent = "フラグ実行";
  FatEat = 0;
  gameend();
}

function jobreset() {

  for (let i = 1; i <= 12; i++) {
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    const input = document.getElementById(`pn${i}`);
    const sw = document.getElementById(`sw${i}`);
    const select = document.getElementById(`jb${i}`);
    const row = document.getElementById(`row${i}`);

    if (fla) fla.checked = false;
    if (flb) flb.checked = false;

    if (select) select.value = "市民";

    if (input && sw) {
      sw.checked = input.value.trim() !== "";
    }

    const isOn = sw?.checked ?? false;

    if (fla) {
      fla.disabled = !isOn;
      if (!isOn) fla.checked = false;
    }
    if (flb) {
      flb.disabled = !isOn;
      if (!isOn) flb.checked = false;
    }

    if (row) {
      row.classList.remove("hidden");
      row.style.backgroundColor = "";
    }
  }

  document.getElementById("rcModal").style.display = "none";
  document.querySelector(".bg-layer").style.backgroundImage = "";
  
  const btn6 = document.getElementById("btn6");
  btn6.textContent = "フラグ実行";
  FatEat = 0;
  gameend();
}
