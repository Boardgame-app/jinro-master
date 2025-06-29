//人狼の噛みフラグは常に無効
document.getElementById("fla1").disabled = true;
document.getElementById("fla2").disabled = true;

//生存スイッチがオフになるとチェックボックスが無効
for (let i = 1; i <= 19; i++) {
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

    if (i === 1 || i === 2) {
      // 特例：fla1・fla2 は常に無効化
      if (fla) {
        fla.disabled = true;
        fla.checked = false;
      }

      // flb1・flb2 はスイッチに応じて切り替え
      if (flb) {
        flb.disabled = !isOn;
        if (!isOn) flb.checked = false;
      }

    } else {
      // 通常処理：fla/flb 両方をスイッチに応じて制御
      if (fla) {
        fla.disabled = !isOn;
        if (!isOn) fla.checked = false;
      }

      if (flb) {
        flb.disabled = !isOn;
        if (!isOn) flb.checked = false;
      }
    }

    if (prevChecked === true && isOn === false && pn.value!=="") {
        // 人狼の生存カウント（sw1, sw2）
        let JinroCount = 0;
        for (let j = 1; j <= 2; j++) {
            const swJinro = document.getElementById(`sw${j}`);
            if (swJinro && swJinro.checked) {
            JinroCount++;
            }
        }

        // 市民の生存カウント（sw4〜sw19）
        let HumanCount = 0;
        for (let j = 4; j <= 19; j++) {
            const swCity = document.getElementById(`sw${j}`);
            if (swCity && swCity.checked) {
            HumanCount++;
            }
        }

        // 妖狐の生存カウント（sw3）
        let YoukoCount = 0;
        const swYouko = document.getElementById("sw3");
        if (swYouko && swYouko.checked) {
            YoukoCount++;
        }

        let gisei = "";

        gisei +=
            "【生存者数】\n" +
            "・人狼：" + JinroCount + "\n" +
            "・市民：" + HumanCount + "\n";
        
        const pn3 = document.getElementById("pn3");
        if (pn3 && pn3.value !== "") {
            gisei += "・妖狐：" + YoukoCount + "\n";
        }

        //ゲーム結果
        if (JinroCount === 0 && HumanCount === 0 && YoukoCount === 0) {
            // 全滅：引き分け
            gisei +=
            "\n★ゲーム終了\n" +
            "★引き分け\n"+
            "「この村には誰もいなくなりました」\n";

        } else if (JinroCount === 0) {
            // 人狼全滅
            if (YoukoCount === 0) {
            // 村人勝利
            gisei +=
            "\n★ゲーム終了\n" +
            "★市民の勝ち\n"+
            "「この村に平和が訪れました」\n";
            } else {
            // 妖狐勝利
            gisei +=
            "\n★ゲーム終了\n" +
            "★妖狐の勝ち\n"+
            "「この村は妖狐に支配されました」\n";
            }
        } else if (JinroCount >= HumanCount) {
            // 人狼が市民を上回った
            if (YoukoCount === 0) {
            // 人狼勝利
            gisei +=
            "\n★ゲーム終了\n" +
            "★人狼の勝ち\n"+
            "「この村は人狼に支配されました」\n";
            } else {
            // 妖狐勝利
            gisei +=
            "\n★ゲーム終了\n" +
            "★妖狐の勝ち\n"+
            "「この村は妖狐に支配されました」\n";
            }
        } else {
            // まだゲーム続行
                gisei +=
            "\n★ゲーム続行\n";
        }
        syokeiModal(gisei)
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
  for (let i = 1; i <= 19; i++) {
    const textInput = document.getElementById(`pn${i}`);
    const checkbox = document.getElementById(`sw${i}`);

    if (textInput && checkbox) {
      textInput.addEventListener("input", () => {
        checkbox.checked = textInput.value.trim() !== "";
        checkbox.dispatchEvent(new Event("change")); // ← ここ！
      });
    }
  }
});

