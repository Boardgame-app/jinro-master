let interval = null;
let total = 300;

function toggleTimer() {
  if (interval === null) {
    startTimer();
  } else {
    stopTimer();
  }
}

function startTimer() {
  if (interval) return;
  if (isNaN(total) || total <= 0) return;

  const display = document.getElementById("display");
  const alarm = document.getElementById("alarm");
  const btn = document.getElementById("toggleButton");

  btn.textContent = "STOP";
  document.getElementById("resetButton").disabled = true;
  
  // STARTボタン押したら最初に1回だけ表示更新
  const m = Math.floor(total / 60).toString().padStart(2, '0');
  const s = (total % 60).toString().padStart(2, '0');
  display.textContent = `${m}:${s}`;

  interval = setInterval(() => {

    total--; // ← 先に減らす！
    
    if (total <= 0) {
      clearInterval(interval);
      interval = null;
      alarm.currentTime = 0;
      alarm.play().catch(e => console.log("再生エラー:", e));

      btn.textContent = "START";
      document.getElementById("resetButton").disabled = false;

      display.textContent = "00:00";
      display.classList.add("warning"); // 最後も赤で残す
      document.getElementById("timerModal").style.display = "flex";
      updateStartButtonState();
      return;
    }

    const m = Math.floor(total / 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    display.textContent = `${m}:${s}`;

    if (total <= 59) {
      display.classList.add("warning");
    } else {
      display.classList.remove("warning");
    }

  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
  const btn = document.getElementById("toggleButton"); // ← 追加！
  btn.textContent = "START";
  document.getElementById("resetButton").disabled = false;
}

function resetTimer() {
  const display = document.getElementById("display");
  const btn = document.getElementById("toggleButton");

  clearInterval(interval);
  interval = null;
  total = 300;
  document.getElementById("display").textContent = "05:00";
  display.classList.remove("warning");
  btn.textContent = "START";
  document.getElementById("resetButton").disabled = false;
  updateStartButtonState();
}

function adjustTime(amount) {
  total += amount;
  if (total < 0) total = 0;

  const display = document.getElementById("display");
  const m = Math.floor(total / 60).toString().padStart(2, '0');
  const s = (total % 60).toString().padStart(2, '0');
  display.textContent = `${m}:${s}`;
  display.classList.remove("warning");
  updateStartButtonState();
}

// モーダルの開閉用関数
function openTimerModal() {
  document.getElementById("timerModal").style.display = "flex";
  const btn = document.getElementById("toggleButton");
  btn.textContent = interval ? "STOP" : "START";
}

function closeTimerModal() {
  document.getElementById("timerModal").style.display = "none";
}

function updateStartButtonState() {
  const startBtn = document.getElementById("toggleButton");
  startBtn.disabled = total <= 0;
}

//モーダルの外側をクリックすると閉じる
window.addEventListener("click", (e) => {
  const modal = document.getElementById("timerModal");
  if (e.target === modal) {
    closeTimerModal();
  }
});
