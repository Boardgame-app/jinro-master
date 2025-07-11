function OpenHelpSelectModal(){
  document.getElementById("HelpSelectModal").style.display = "flex";
}

function CloseHelpSelectModal(){
  document.getElementById("HelpSelectModal").style.display = "none";
}

//最初の夜にすること
function OpenHelpModal1() {
  document.getElementById("HelpModal").style.display = "flex";
  document.getElementById("Help").innerHTML = `
    ■村設定<br>
    ゲームで使用する役職を選択してください。<br><br>
    
    ■名前<br>
    ゲームに参加するプレイヤーの名前を入力してください。<br><br>

    ■役職<br>
    役職確認を行い、役職をリストから選択してください。<br>
    なお、裏切り者については役職確認を行わなくても進行上問題ありません。<br><br>

    ■ゲーム開始<br>
    役職確認が全て完了したら、「ゲーム開始」ボタンを押してください。<br>
    役職や名前の変更をしたいときは、「ゲーム中断」ボタンを押してください。<br><br>
  `;

}

//夜ターンにすること
function OpenHelpModal2() {
  document.getElementById("HelpModal").style.display = "flex";
  document.getElementById("Help").innerHTML = `
    ■能力<br>
    末尾に「＊」のある役職を上から順に起こし、能力を使用させてください。<br>
    役職名をクリックすると、役職の説明を見ることができます。<br><br>

    ■フラグ<br>
    Flag1は人狼の襲撃による死亡フラグ、Flag2はその他の能力・効果による死亡フラグです。<br>
    具体的には、以下のように対応してください。<br><br>

    ・人狼<br>
    襲撃先として指定したプレイヤーのFlag1にチェックを入れてください。<br>
    （襲撃されたプレイヤーが妖狐や逃亡者など、噛まれても死亡しない役職だった場合も、同様にチェックを入れてください。）<br><br>

    ・ボディガード<br>
    護衛先として指定したプレイヤーのFlag1にチェックが入っていた場合は、チェックを外してください。<br><br>

    ・占い師<br>
    占い先として指定したプレイヤーが妖狐だった場合は、妖狐のFlag2にチェックを入れてください。<br><br>

    ・逃亡者<br>
    逃亡先として指定したプレイヤーが、人狼またはFlag1にチェックが入っている者だった場合は、逃亡者のFlag2にチェックを入れてください。<br><br>

    ・サムライ<br>
    斬り先として指定したプレイヤーのFlag2にチェックを入れてください。<br>
    そのプレイヤーが村人陣営だった場合は、サムライのFlag2にもチェックを入れてください。<br><br>

    ・ハンター<br>
    ハンターのFlag1又はFlag2にチェックが入っている場合、狙撃先として指定されたプレイヤーのFlag2にチェックを入れてください。<br><br>

    ■フラグ実行<br>
    夜の行動が全て終了したら、「フラグ実行」ボタンを押してください。<br>
    Flag1又はFlag2のどちらか一つでもチェックが入っているプレイヤーは、原則として死亡します（生存スイッチがOFFになります）。<br>
    例外的に、妖狐と逃亡者は、Flag1にチェックが入っていても死亡しません。<br>
    タフガイは、Flag1にチェックが入っていても死亡しませんが、Flag2にチェックが入ります（翌日に再度フラグを実行すると死亡します）。<br>
  `;
}

//昼ターンにすること  
function OpenHelpModal3() {
  document.getElementById("HelpModal").style.display = "flex";
  document.getElementById("Help").innerHTML = `
    ■議論<br>
    タイマーを開いて議論の時間を計ってください。<br>
    議論の時間はデフォルトで［生存者数×１分］となっています。<br>
    STARTボタンを押すとカウントダウンが開始します。<br>
    タイマー画面を閉じてもカウントダウンは続きます。<br><br>

    ■処刑<br>
    生存スイッチをOFFにしてください。<br><br>
  `;

}

function CloseHelpModal() {
  document.getElementById("HelpModal").style.display = "none";
}

// モーダル外クリックでも閉じるようにする（オプション）
window.addEventListener("click", (e) => {
  const modal = document.getElementById("HelpSelectModal");
  if (e.target === modal) {
    CloseHelpSelectModal();
  }
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("HelpModal");
  if (e.target === modal) {
    CloseHelpModal();
  }
});