const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

form.addEventListener('submit', (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // ページがリロードされるのをふせぐため。
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = '';

  // ここから #todo-list に追加する要素を構築する
  // liは1つのTODOアイテムを表す
  const elem = document.createElement('li');
  // labelはTODOのテキストを表示する要素
  const label = document.createElement('label');
  label.textContent = todo;
  // 初期状態では取り消し線は引かれていない
  label.style.textDecorationLine = 'none';

  const toggle = document.createElement('input');
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.type = 'checkbox';
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      label.style.textDecorationLine = 'line-through';
    } else {
      label.style.textDecorationLine = 'none';
    }
  });
  const destroy = document.createElement('button');
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = '❌';
  destroy.addEventListener('click', () => {
    elem.remove();
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
});
