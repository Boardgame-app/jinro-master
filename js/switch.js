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

  if (!sw) continue;

  // 前回状態を記憶する変数（クロージャー化）
  let prevChecked = sw.checked;

  sw.addEventListener("change", () => {

    stopTimer();
    resetTimer();

    const isOn = sw.checked;

    for (let i = 1; i <= 12; i++) {
      const select = document.getElementById(`jb${i}`);
      const fla = document.getElementById(`fla${i}`);
      const flb = document.getElementById(`flb${i}`);
      const sw = document.getElementById(`sw${i}`);
      const isOn = sw?.checked;

      if (select && select.value === "人狼*") {
        // 特例：人狼は flb だけ制御、fla は常に無効
        if (fla) {
          fla.disabled = true;
          fla.checked = false;
        }
        if (flb) {
          flb.disabled = !isOn;
          if (!isOn) flb.checked = false;
        }
      } else {
        // 通常処理：fla / flb 両方スイッチに応じて制御
        if (fla) {
          fla.disabled = !isOn;
          if (!isOn) fla.checked = false;
        }
        if (flb) {
          flb.disabled = !isOn;
          if (!isOn) flb.checked = false;
        }
      }
    }

    if( btn4.textContent == "ゲーム中断"){
      //スイッチがオンからオフになったら
      if (prevChecked === true && isOn === false && pn.value!=="") {

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
        let gisei = ""

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
          gameend()

        } else if (JinroCount === 0) {
          // 人狼全滅
          if (YoukoCount === 0) {
          // 村人勝利
          imageSrc = "png/shiminwin.png";
          } else {
          // 妖狐勝利
          imageSrc = "png/youkowin.png";
          }
          gameend()
          
        } else if (JinroCount >= HumanCount) {
          // 人狼が市民を上回った
          if (YoukoCount === 0) {
          // 人狼勝利
          imageSrc = "png/jinrowin.png";
          } else {
          // 妖狐勝利
          imageSrc = "png/youkowin.png";
          }
          gameend()

        } else {
          // まだゲーム続行
          imageSrc = "png/continue.png";

        }

        modalImage.src = imageSrc;
        syokeiModal(gisei)
      }
    }
    prevChecked = isOn;
  });

  // 初期状態に応じて反映
  sw.dispatchEvent(new Event("change"));
}

function syokeiModal(gisei) {
  document.getElementById("result").innerHTML = gisei.replace(/\n/g, "<br>");
  document.getElementById("erModal").style.display = "flex";
}

//名前を入力すると生存スイッチをオンにする
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 12; i++) {
    const textInput = document.getElementById(`pn${i}`);
    const checkbox = document.getElementById(`sw${i}`);

    if (textInput && checkbox) {
      textInput.addEventListener("input", () => {
        const shouldBeChecked = textInput.value.trim() !== "";

        if (checkbox.checked !== shouldBeChecked) {
          checkbox.checked = shouldBeChecked;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
    }
  }
});