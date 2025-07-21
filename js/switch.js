//名前を入力すると生存スイッチをオンにする
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 12; i++) {
    const textInput = document.getElementById(`pn${i}`);
    const checkbox = document.getElementById(`sw${i}`);
    //const fla = document.getElementById(`fla${i}`);
    //const flb = document.getElementById(`flb${i}`);
    //const jb = document.getElementById(`jb${i}`);

    //fla?.setAttribute("disabled", "true");
    //flb?.setAttribute("disabled", "true");
    checkbox.checked = false;

    if (textInput && checkbox) {
      textInput.addEventListener("input", () => {
        const inputText = textInput.value.trim();
        const shouldBeChecked = inputText !== "";
        checkbox.checked = shouldBeChecked;
        checkbox.dispatchEvent(new Event("change"));

        //const isWerewolf = jb?.value.trim().startsWith("人狼");

        //if (inputText.length >= 1) {
          // 👇 人狼なら fla を有効化させない
        //  if (!isWerewolf) {
        //    fla?.removeAttribute("disabled");
        //  } else {
        //    fla?.setAttribute("disabled", "true");
        //  }

          // flb は常に有効化する
        //  flb?.removeAttribute("disabled");
        //} else {
        //  fla?.setAttribute("disabled", "true");
        //  flb?.setAttribute("disabled", "true");
        //}
      });
    }
  }
});

//フラグ無効
for (let i = 1; i <= 12; i++) {
  const element = document.getElementById(`fla${i}`);
  if (element) {
    element.disabled = true;
  }
}
for (let i = 1; i <= 12; i++) {
  const element = document.getElementById(`flb${i}`);
  if (element) {
    element.disabled = true;
  }
}

//生存スイッチがオフになるとチェックボックスが無効
for (let i = 1; i <= 12; i++) {
  const sw = document.getElementById(`sw${i}`);
  const fla = document.getElementById(`fla${i}`);
  const flb = document.getElementById(`flb${i}`);
  const pn = document.getElementById(`pn${i}`);
  const jb = document.getElementById(`jb${i}`);
  if (!sw) continue;

  let prevChecked = sw.checked;

  sw.addEventListener("change", () => {
    stopTimer();
    resetTimer();

    const isOn = sw.checked;

    if (!isOn && btn4.textContent === "ゲーム中断") {
      if (fla) fla.checked = false;
      if (flb) flb.checked = false;
      if (pn) pn.style.opacity = "0.5";
      if (jb) jb.style.opacity = "0.5";
    } else {
      if (pn) pn.style.opacity = "1";
      if (jb) jb.style.opacity = "1";
    }

    // ⬇︎ 状態に応じた disable/checked 管理（コメントアウト部分の整理）
    // if (select?.value === "人狼*") {
    //   if (fla) {
    //     fla.disabled = true;
    //     fla.checked = false;
    //   }
    //   if (flb) {
    //     flb.disabled = !isOn;
    //     if (!isOn) flb.checked = false;
    //   }
    // } else {
    //   if (fla) {
    //     fla.disabled = !isOn;
    //     if (!isOn) fla.checked = false;
    //   }
    //   if (flb) {
    //     flb.disabled = !isOn;
    //     if (!isOn) flb.checked = false;
    //   }
    // }

    // ゲーム中断時の処刑者ログ
    if (btn4.textContent === "ゲーム中断") {
      if (prevChecked && !isOn && pn?.value !== "") {
        const gisei = `【本日の処刑者】\n・${pn.value}\n\n`;
        updateGameResult(gisei);
      }
    }

    prevChecked = isOn;
  });

  // 初期状態反映
  sw.dispatchEvent(new Event("change"));
}

function syokeiModal(gisei) {
  document.getElementById("result").innerHTML = gisei.replace(/\n/g, "<br>");
  document.getElementById("erModal").style.display = "flex";
}

function updateGameResult(gisei) {

  // 生存数カウント
  let JinroCount = 0;
  let YoukoCount = 0;
  let TotalSwitchOn = 0;

  for (let i = 1; i <= 12; i++) {
    const sw = document.getElementById(`sw${i}`);
    const jb = document.getElementById(`jb${i}`);

    if (sw?.checked) {
      TotalSwitchOn++; // スイッチがオンな行の数

      if (jb?.value === "人狼*") {
        JinroCount++;
      } else if (jb?.value === "妖狐") {
        YoukoCount++;
      }
    }
  }
  let HumanCount = TotalSwitchOn - JinroCount - YoukoCount;

  gisei +=
    "【生存者数】\n" +
    "・人狼：" + JinroCount + "\n" +
    "・市民：" + HumanCount + "\n";
  
  let isYoukoPresent = false;

  for (let i = 1; i <= 12; i++) {
    const jb = document.getElementById(`jb${i}`);
    const pn = document.getElementById(`pn${i}`);

    const isYoukoSelected = jb?.value === "妖狐";
    const isPnFilled = pn?.value.trim() !== "";

    if (isYoukoSelected && isPnFilled) {
      isYoukoPresent = true;
      break; // 条件を満たす妖狐がいたら即終了
    }
  }

  if (isYoukoPresent) {
    gisei += "・妖狐：" + YoukoCount + "\n";
  }

  let imageSrc;
  const modalImage = document.getElementById("modal-image");
  console.log(modalImage);
  const modal = document.getElementById("erModal");

  //ゲーム結果
  if (JinroCount === 0 && HumanCount === 0 && YoukoCount === 0) {
    // 全滅：引き分け
    imageSrc = "png/draw.png";
    document.querySelector(".bg-layer").style.backgroundImage = "";
    btn6.textContent = "フラグ実行"
    gameend();

  } else if (JinroCount === 0) {
    // 人狼全滅
    if (YoukoCount === 0) {
    // 村人勝利
    imageSrc = "png/shiminwin.png";

    } else {
    // 妖狐勝利
    imageSrc = "png/youkowin.png";
    
    }
    document.querySelector(".bg-layer").style.backgroundImage = "";
    btn6.textContent = "フラグ実行"
    gameend();
    
  } else if (JinroCount >= HumanCount) {
    // 人狼が市民を上回った
    if (YoukoCount === 0) {
    // 人狼勝利
    imageSrc = "png/jinrowin.png";

    } else {
    // 妖狐勝利
    imageSrc = "png/youkowin.png";
    }
    document.querySelector(".bg-layer").style.backgroundImage = "";
    btn6.textContent = "フラグ実行"
    gameend();

  } else {
    // まだゲーム続行
    imageSrc = "png/continueNight.png";
    // 背景・夜
    document.querySelector(".bg-layer").style.backgroundImage = "url(png/bgmidnight.png)";
    btn6.textContent = "フラグ実行"
    disableAllSwitches();
  }

  modalImage.src = imageSrc;
  syokeiModal(gisei);
}