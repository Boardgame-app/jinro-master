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

  //ゲーム中断
  if (btn4.textContent !== "ゲーム開始") {
    gamestop();
    return;
  }

  // スペース除去
  for (let i = 1; i <= 12; i++) {
    const input = document.getElementById(`pn${i}`);
    if (input) input.value = input.value.trim();
  }

  // 未入力エラー検知
  for (let i = 1; i <= 12; i++) {
    const nameInput = document.getElementById(`pn${i}`);
    const checkbox = document.getElementById(`sw${i}`);
    const jobSelect = document.getElementById(`jb${i}`);

    if (checkbox?.checked && nameInput?.value.trim() === "") {
      let role = jobSelect?.value || `プレイヤー${i}`; // 選択された value 属性を取得

      // 「*」が末尾にある場合は削除
      if (role.endsWith("*")) {
        role = role.slice(0, -1).trim();
      }

      missingList.push(`・${role}`);
    }
  }

  if (missingList.length > 0) {
    const msg = `プレイヤー名が未入力です。`;
    const listText = missingList.join("\n")+ "\n"+ "\n";
    document.getElementById("missingRoles").textContent = listText;

    alertModal(msg); // カスタムモーダルへ渡す
    return;
  }

  // 参加人数カウント
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

  if (JinroCount === 0) {
    alertModal("人狼を一人以上設定してください。");
    return;
  }

  if (HumanCount <= JinroCount) {
    alertModal("人間を人狼より多く設定してください。");
    return;
  }

  // ダイアログ「ゲームを開始しますか」表示の場合
  // document.getElementById("gsModal").style.display = "flex";
  gamestartModal();

}

function gamestartModal(){
  // UIの更新
  btn4.textContent = "ゲーム中断";
  btn4.style.color = "yellow";
  
  if (btn6.textContent === "吊スキップ") {
    enableSwitchLimit();
  }else{
    disableAllSwitches();
  }

  jobfix();

  for (let i = 1; i <= 12; i++) {
    const input = document.getElementById(`pn${i}`);
    if (input) input.disabled = true;
  }

  document.querySelectorAll(".underline-input").forEach(input => {
    input.style.borderBottomColor = "transparent";
  });

  //document.getElementById("btn5").disabled = true;
  document.getElementById("btn6").disabled = false;
  document.getElementById("btnJobset").disabled = true;
  document.getElementById("btnClear").style.display = "none";
  closegsModal();
  if (btn6.textContent === "フラグ実行") {
    //playBGM();
    CheckboxEnable();
  }
  jobsort();
  hiderow();
  OpacityOn();
}

const roleOrder = {
  "人狼*": 1,
  "狼少年": 2,
  "妖狐": 3,
  "占い師*": 4,
  "ボディガード*": 5,
  "霊媒師*": 6,
  "裏切り者": 7,
  "逃亡者*": 8,
  "サムライ*": 9,
  "ハンター*": 10,
  "タフガイ": 11,
  "肥満児": 12,
  "市民": 13,
};

function getRoleRank(role) {
  return roleOrder[role] ?? 999;
}

function jobsort() {
  const table = document.getElementById("memberTable"); // ← テーブルのIDは適宜変更
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  rows.sort((a, b) => {
    const roleA = getRoleRank(a.querySelector(".job-select").value);
    const roleB = getRoleRank(b.querySelector(".job-select").value);
    return roleA - roleB;
  });

  const tbody = table.querySelector("tbody");
  rows.forEach(row => tbody.appendChild(row));
}

function closeecModal() {
    document.getElementById("ecModal").style.display = "none";
}

function closegsModal() {
    document.getElementById("gsModal").style.display = "none";
}

function ecModalopen(){
  const btn6 = document.getElementById('btn6');
  if (btn6.textContent === "吊スキップ") {
    btn6.textContent = "フラグ実行";
    document.querySelector(".bg-layer").style.backgroundImage = "url(png/bgmidnight.png)";
    disableAllSwitches();
    let gisei = "【本日の処刑者】\n" + "・なし" + "\n"+ "\n";  // ⬅︎ 初期状態を定数で定義
    updateGameResult(gisei);
    return;
  }

  document.getElementById("ecModal").style.display = "flex";
}

function resultModal() {
    document.getElementById("ecModal").style.display = "none";
    let gisei = updateAllSwitches();
    document.getElementById("result").innerHTML = gisei.replace(/\n/g, "<br>");
    document.getElementById("erModal").style.display = "flex";

    return gisei;
}

var FatEat = 0;

function updateAllSwitches() {

  const base = "【本日の犠牲者】\n";  // ⬅︎ 初期状態を定数で定義
  let gisei = base;
  let shouldDisableAllFla = false;

  //フラグ処理
  for (let i = 1; i <= 12; i++) {
    const pn  = document.getElementById(`pn${i}`);
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    const sw  = document.getElementById(`sw${i}`);
    const jb  = document.getElementById(`jb${i}`);

    // 職業が「妖狐」「逃亡者」「タフガイ」のいずれか → 特別処理
    const specialRoles = ["妖狐", "逃亡者*", "タフガイ"];
    const isSpecialRole = specialRoles.includes(jb?.value);

    // 肥満児効果をリセット
    if (sw?.checked === true && jb?.value !== "人狼*") {
      //if (fla) fla.disabled = false;
    }

    if (isSpecialRole) {
      if (flb && flb.checked) {
        if (sw) sw.checked = false;
        sw.dispatchEvent(new Event("change"));

        //if (fla) fla.disabled = true;
        //flb.disabled = true;

        if (pn) gisei += "・" + pn.value + "\n";
      }
      continue; // 通常処理には入らないようにスキップ
    }

    // 通常処理：fla または flb が ON のとき対象
    if ((fla && fla.checked) || (flb && flb.checked)) {
      
      // ここで「肥満児」チェック
      if (jb?.value === "肥満児" && fla?.checked) {
        FatEat = 2;
        //shouldDisableAllFla = true;
      }

      if (sw) sw.checked = false;
      sw.dispatchEvent(new Event("change"));

      //if (fla) fla.disabled = true;
      //if (flb) flb.disabled = true;

      if (pn) gisei += "・" + pn.value + "\n";
    }
  }

  if (gisei === base) {
    gisei += "・なし\n";
  }

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
    "\n【生存者数】\n" +
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
    gameend();

  } else {
    // まだゲーム続行
      imageSrc = "png/continueDay.png";
    // 背景・濃霧の昼間
    document.querySelector(".bg-layer").style.backgroundImage = "url(png/bgday.png)";
    CheckboxDisable();

    const btn6 = document.getElementById('btn6');
    btn6.textContent = "吊スキップ";
    stopBGM();
    enableSwitchLimit();

    // 「肥満児」チェックがtrueなら、flaを全て無効に
    //if (shouldDisableAllFla) {
    //  for (let j = 1; j <= 12; j++) {
    //    const flaAll = document.getElementById(`fla${j}`);
    //    if (flaAll) flaAll.disabled = true;
    //  }
    //}

    if (typeof FatEat === "number" && FatEat > 0) {
      FatEat--;
    }

  }

  modalImage.src = imageSrc;
  modal.style.display = "flex";

  // flb を全てオフに
  for (let i = 1; i <= 12; i++) {
    const flb = document.getElementById(`flb${i}`);
    if (flb) flb.checked = false;
  }

  //タフガイ処理
  for (let i = 1; i <= 12; i++) {
    const jb  = document.getElementById(`jb${i}`);
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);

    if (jb?.value === "タフガイ" && fla?.checked === true) {
      if (flb) flb.checked = true;
      //if (flb) flb.disabled = true;
    }
  }

  // fla を全てオフに
  for (let i = 1; i <= 12; i++) {
    const fla = document.getElementById(`fla${i}`);
    if (fla) fla.checked = false;
  }

  return gisei;

}

function closeErModal() {
    document.getElementById("erModal").style.display = "none";
    if (btn6.textContent === "フラグ実行" && btn4.textContent === "ゲーム中断") {
      CheckboxEnable();
      playBGM();
    }
}

// モーダル外クリックでも閉じるようにする（オプション）
window.addEventListener("click", (e) => {
  const modal = document.getElementById("exModal");
  if (e.target === modal) {
    closeexModal();
  }
});

function gamestop(){
  btn4.textContent = "ゲーム開始";
  btn4.style.color = "white";
  stopBGM();
  EnableAllSwitches();
  fixcancel();
  resetTimer();

  for (let i = 1; i <= 12; i++) {
    const input = document.getElementById(`pn${i}`);
    if (input) {
      input.disabled = false;
    }
  }

  //CheckboxDisable();
  CheckboxEnable();

  const inputs = document.querySelectorAll(".underline-input");
  inputs.forEach(input => {
    input.style.borderBottomColor = "white"; // 下線を白に戻す
  });

  document.getElementById("btn6").disabled = true;
  document.getElementById("btnJobset").disabled = false;
  document.getElementById("btnClear").style.display = "block";
  showallrow();
  OpacityOff();
}

function gameend(){
  gamestop();
  FatEat = 0;
  CheckboxEnable();
}

//生存スイッチのオフからオンへの切替を禁止
function enableSwitchLimit() {
  for (let i = 1; i <= 12; i++) {
    const checkbox = document.getElementById(`sw${i}`);
    if (checkbox.checked === false){
      checkbox.disabled = true;
    }else{
      checkbox.disabled = false;
    }
    //if (!checkbox) continue;

    // イベントの重複を防ぐ
    //if (checkbox._limitHandler) continue;

    // 制限イベント登録
    //checkbox.addEventListener("click", checkbox._limitHandler = function (e) {
    //  if (checkbox.checked) {
    //    e.preventDefault(); // オフ→オンを阻止
    //  }
    //});
  }
}

//生存スイッチのオフからオンへの切替を許可
function disableSwitchLimit() {
  for (let i = 1; i <= 12; i++) {
    const checkbox = document.getElementById(`sw${i}`);
    if (checkbox) {
      checkbox.disabled = false;
    }

    if (!checkbox || !checkbox._limitHandler) continue;

    checkbox.removeEventListener("click", checkbox._limitHandler);
    delete checkbox._limitHandler;
  }
}

//スイッチを全て無効化
function disableAllSwitches() {
  for (let i = 1; i <= 12; i++) {
    const checkbox = document.getElementById(`sw${i}`);
    if (checkbox) {
      checkbox.disabled = true;
    }
  }
}

//スイッチを全て有効化
function EnableAllSwitches() {
  for (let i = 1; i <= 12; i++) {
    const checkbox = document.getElementById(`sw${i}`);
    if (checkbox) {
      checkbox.disabled = false;
    }
  }
}

function CheckboxEnable() {
  for (let i = 1; i <= 12; i++) {
    const sw = document.getElementById(`sw${i}`);
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    const jb = document.getElementById(`jb${i}`);
    if (sw?.checked) {
      if (fla) fla.disabled = false;
      if (flb) flb.disabled = false;
      if (jb?.value === "人狼*") {
        if (fla) fla.disabled = true;
      }
    }
  }

  //肥満児が噛まれた場合はflaを全て無効化
  if (FatEat > 0 ){
    for (let j = 1; j <= 12; j++) {
    const flaAll = document.getElementById(`fla${j}`);
    if (flaAll) flaAll.disabled = true;
    }
  }
}

function CheckboxDisable() {
  for (let i = 1; i <= 12; i++) {
  const fla = document.getElementById(`fla${i}`);
  const flb = document.getElementById(`flb${i}`);
      if (fla) fla.disabled = true;
      if (flb) flb.disabled = true;
  }
}

function OpacityOn(){
  for (let i = 1; i <= 12; i++) {
    const sw = document.getElementById(`sw${i}`);
    const isOn = sw.checked;
    const fla = document.getElementById(`fla${i}`);
    const flb = document.getElementById(`flb${i}`);
    const pn = document.getElementById(`pn${i}`);
    const jb = document.getElementById(`jb${i}`);

    if (!isOn) {
      fla.checked = false;
      flb.checked = false;
      pn.style.opacity = "0.5";
      jb.style.opacity = "0.5";
    } else {
      pn.style.opacity = "1";
      jb.style.opacity = "1";
    }
  }
}

function OpacityOff(){
  for (let i = 1; i <= 12; i++) {
    const pn = document.getElementById(`pn${i}`);
    const jb = document.getElementById(`jb${i}`);
    pn.style.opacity = "1";
    jb.style.opacity = "1";
  }
}