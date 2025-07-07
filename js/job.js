  const optionsTemplate = document.getElementById("job-options").content;
  document.querySelectorAll(".job-select").forEach(select => {
    select.appendChild(optionsTemplate.cloneNode(true));
  });

function jobfix(){
    document.querySelectorAll(".job-select").forEach(select => {
    // 選択できないようにする（無効化）
    select.style.pointerEvents = "none";        // ⬅︎ 操作不能に

    // スタイルで見た目を「ただのテキスト風」にする
    select.style.border = "1px solid transparent"; // 枠を消す
    select.style.backgroundColor = "transparent"; // 背景を透明に
    select.style.color = "white";
    select.style.marginLeft = "3px";
    select.style.pointerEvents = "none";        // クリックなど一切無効化（保険）
    select.style.appearance = "none";           // OS依存のUIを無効化（ブラウザ対応により必要）
    });
}

function fixcancel(){
    document.querySelectorAll(".job-select").forEach(select => {
    // 操作不能を解除する
    select.style.pointerEvents = "";

    // インラインスタイルを初期化（CSS指定が復活）
    select.style.border = "";
    select.style.backgroundColor = "";
    select.style.marginLeft = "";
    select.style.pointerEvents = "";
    select.style.appearance = "";
    });

}
