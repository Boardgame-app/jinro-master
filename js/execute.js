function alertModal(message) {
  document.getElementById("alert").innerText = message;
  document.getElementById("exModal").style.display = "flex";
}

function closeexModal() {
    document.getElementById("exModal").style.display = "none";
}

function execute() {
  let missingList = [];
  document.getElementById("missingRoles").textContent = "";
  const btn4 = document.getElementById('btn4');

  if (btn4.textContent !== "ゲーム開始") {
    document.getElementById("ecModal").style.display = "flex";
    return;
  }

  // スペース除去
  for (let i = 1; i <= 19; i++) {
    const input = document.getElementById(`pn${i}`);
    if (input) input.value = input.value.trim();
  }

  // 未入力エラー検知

  for (let i = 1; i <= 19; i++) {
    const nameInput = document.getElementById(`pn${i}`);
    const checkbox = document.getElementById(`sw${i}`);
    const roleLabel = document.getElementById(`jb${i}`);

    if (checkbox?.checked && nameInput?.value.trim() === "") {
      let role = roleLabel ? roleLabel.textContent.trim() : `プレイヤー${i}`;

      // 「*」が末尾にある場合は削除
      if (role.endsWith("*")) {
        role = role.slice(0, -1).trim();
      }
      missingList.push(`・${role}`);
    }
  }

  if (missingList.length > 0) {
    const msg = `プレイヤー名が未入力の役職があります。`;
    const listText = missingList.join("\n")+ "\n"+ "\n";
    document.getElementById("missingRoles").textContent = listText;

    alertModal(msg); // カスタムモーダルへ渡す
    return;
  }

  // 人狼と市民のカウント
  let JinroCount = 0;
  for (let i = 1; i <= 2; i++) {
    const checkbox = document.getElementById(`sw${i}`);
    if (checkbox?.checked) JinroCount++;
  }

  let HumanCount = 0;
  for (let i = 4; i <= 19; i++) {
    const checkbox = document.getElementById(`sw${i}`);
    if (checkbox?.checked) HumanCount++;
  }

  if (JinroCount === 0) {
    alertModal("人狼を一人以上設定してください。");
    return;
  }

  if (HumanCount <= JinroCount) {
    alertModal("人間を人狼より多く設定してください。");
    return;
  }

  // UIの更新
  btn4.textContent = "フラグ実行";
  btn4.style.color = "yellow";

  for (let i = 1; i <= 19; i++) {
    const input = document.getElementById(`pn${i}`);
    if (input) input.disabled = true;
  }

  document.querySelectorAll(".underline-input").forEach(input => {
    input.style.borderBottomColor = "transparent";
  });

  document.getElementById("btn5").disabled = true;
  hiderow();
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
  
  if (pn3 && pn3.value !== "") {
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
  modal.style.display = "flex";

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

// モーダル外クリックでも閉じるようにする（オプション）
window.addEventListener("click", (e) => {
  const modal = document.getElementById("exModal");
  if (e.target === modal) {
    closeexModal();
  }
});

function gameend(){

  btn4.textContent = "ゲーム開始";
  btn4.style.color = "white";
  for (let i = 1; i <= 19; i++) {
    const input = document.getElementById(`pn${i}`);
    if (input) {
      input.disabled = false;
    }
  }

  const inputs = document.querySelectorAll(".underline-input");
  inputs.forEach(input => {
  input.style.borderBottomColor = "white"; // 下線を白に戻す
  });

  document.getElementById("btn5").disabled = false;
  showallrow()

}