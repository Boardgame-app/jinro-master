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
    select.style.textDecoration = "underline"; // テキストに下線を追加
    select.style.marginLeft = "3px";
    //select.style.pointerEvents = "none";        // クリックなど一切無効化（保険）
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
    select.style.textDecoration = "";
    select.style.marginLeft = "";
    select.style.pointerEvents = "";
    select.style.appearance = "";
    });
}

function syncModalWithSelectFromTemplate() {
  const template = document.getElementById("job-options");
  const valuesFromTemplate = Array.from(template.content.querySelectorAll('option')).map(opt => opt.value);

  // モーダル内の .item に選択状態を付与
  document.querySelectorAll('.item').forEach(item => {
    const value = item.getAttribute('data-value');
    if (valuesFromTemplate.includes(value)) {
      item.classList.add('selected');
    }
  });
}

function OpenJobSelecter(){
  document.getElementById("JobSelectModal").style.display = "flex";
  syncModalWithSelectFromTemplate(); // ← 初期テンプレートに基づいて同期
}

function CloseJobSelecter(){
  document.getElementById("JobSelectModal").style.display = "none";
}

const items = document.querySelectorAll('.item');
const applyBtn = document.getElementById('applyBtn');

// 選択トグル処理（人狼* は選択解除不可）
items.forEach(item => {
  item.addEventListener('click', () => {
    const value = item.getAttribute('data-value');
    if (value === "人狼*") return; // 人狼は常に選択状態
    item.classList.toggle('selected');
  });
});

applyBtn.addEventListener('click', () => {
  const selectedItems = document.querySelectorAll('.item.selected');
  const selectedValues = Array.from(selectedItems).map(item => item.getAttribute('data-value'));

  document.querySelectorAll(".job-select").forEach((select, index) => {
    const previousValue = select.value;

    select.innerHTML = "";

    // 市民を追加（優先表示）
    if (!selectedValues.includes("市民")) {
      selectedValues.unshift("市民");
    }

    selectedValues.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });

    // 元の選択値が存在すれば優先
    if (selectedValues.includes(previousValue)) {
      select.value = previousValue;
    } else {
      select.value = "市民"; // ← ここで「市民」に戻る！
      const row = document.getElementById(`row${index + 1}`);
      row.style.backgroundColor = ""; // 元に戻す（空にする）
    }
  });
});
