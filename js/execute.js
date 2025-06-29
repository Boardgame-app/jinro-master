function alertModal(message) {
  document.getElementById("alert").innerText = message;
  document.getElementById("exModal").style.display = "flex";
}

function closeexModal() {
    document.getElementById("exModal").style.display = "none";
}

function execute() {
  const pn1 = document.getElementById('pn1').value.trim();
  const pn2 = document.getElementById('pn2').value.trim();

  // 人狼のカウント（pn1, pn2）
  let JinroCount = 0;
  for (let i = 1; i <= 2; i++) {
    const value = document.getElementById(`pn${i}`).value.trim();
    if (value !== "") JinroCount++;
  }

  // 市民のカウント（pn4〜pn19）
  let HumanCount = 0;
  for (let i = 4; i <= 19; i++) {
    const value = document.getElementById(`pn${i}`).value.trim();
    if (value !== "") HumanCount++;
  }

  if (JinroCount==0) {
    alertModal("人狼を一人以上設定してください。");
  } else if(HumanCount <= JinroCount) {
    alertModal("人間を人狼より多く設定してください。")
  } else{
    document.getElementById("ecModal").style.display = "flex";
  }

}

function closeecModal() {
    document.getElementById("ecModal").style.display = "none";
}

function resultModal() {
    document.getElementById("ecModal").style.display = "none";
    let gisei = updateAllSwitches();
    document.getElementById("result").innerHTML = gisei.replace(/\n/g, "<br>");
    document.getElementById("erModal").style.display = "flex";
    return gisei;
}

function updateAllSwitches() {

  const base = "【本日の犠牲者】\n";  // ⬅︎ 初期状態を定数で定義
  let gisei = base;

  for (let i = 1; i <= 19; i++) { //flag1とflag2のどちらかがONならスイッチオフ
    
    const pn = document.getElementById(`pn${i}`);
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    const sw  = document.getElementById(`sw${i}`); 

    // 3、9、12番はflbがONの場合のみスイッチオフ
    // 特別処理：3, 9, 12番は flb が ON のときのみ対象
    if (i === 3 || i === 9 || i === 12) {
      if (flb && flb.checked) {
        if (sw) sw.checked = false;
        sw.dispatchEvent(new Event("change"));

        fla.disabled = true;
        flb.disabled = true;

        if (pn) gisei += "・" + pn.value + "\n";
      }
      continue; // 他の条件には入らないように
    }

  // 通常処理：fla または flb が ON のとき対象
    if ((fla && fla.checked) || (flb && flb.checked)) {
      if (sw) sw.checked = false;
      sw.dispatchEvent(new Event("change"));

        fla.disabled = true;
        flb.disabled = true;

      gisei += "・" + pn.value  + "\n" ; // 文字列として結合
    }
  }

  if (gisei === base) {
    gisei += "・なし\n";
  }

  // 人狼の生存カウント（sw1, sw2）
  let JinroCount = 0;
  for (let i = 1; i <= 2; i++) {
    const sw = document.getElementById(`sw${i}`);
    if (sw && sw.checked) {
      JinroCount++;
    }
  }

  // 市民の生存カウント（sw4〜sw19）
  let HumanCount = 0;
  for (let i = 4; i <= 19; i++) {
    const sw = document.getElementById(`sw${i}`);
    if (sw && sw.checked) {
      HumanCount++;
    }
  }

  // 妖狐の生存カウント（sw3）
  let YoukoCount = 0;
  const sw = document.getElementById("sw3");
  if (sw && sw.checked) {
    YoukoCount++;
  }

  gisei +=
    "\n【生存者数】\n" +
    "・人狼：" + JinroCount + "\n" +
    "・市民：" + HumanCount + "\n";
  
  if (pn3.value !== "") {
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


  // flb を全てオフに
  for (let i = 1; i <= 19; i++) {
    const flb = document.getElementById(`flb${i}`);
    if (flb) flb.checked = false;
  }

  const fla12 = document.getElementById("fla12");
  const flb12 = document.getElementById("flb12");

  if (fla12.checked === true) {
    flb12.checked = true;
  }

  // fla を全てオフに
  for (let i = 1; i <= 19; i++) {
    const fla = document.getElementById(`fla${i}`);
    if (fla) fla.checked = false;
  }

  return gisei

}

function closeErModal() {
    document.getElementById("erModal").style.display = "none";
}