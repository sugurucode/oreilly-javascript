const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

// 課題要件: localStorage の無効化対応
let storage = null;
try {
  // localStorage が利用可能か確認
  storage = window.localStorage;
} catch (e) {
  // 無効化されている場合は null のままにしておく
  // try-catch で囲まないと例外が発生して要件満たせない
}

const STORAGE_KEY = 'todo-list-data';

// データを保存する関数
const saveTodosToLocalStorage = () => {
  if (!storage) return; // localStorage が利用できない場合は何もしない

  const todos = [];
  // list 内の li 要素を全て取り出して、保存用の配列を構築する
  list.querySelectorAll('li').forEach((li) => {
    // li内のlabelに
    const label = li.querySelector('label');
    const checkbox = li.querySelector('input[type="checkbox"]');
    todos.push({
      text: label.textContent,
      completed: checkbox.checked,
    });
  });

  // localStorageは文字列しか保存できないためJSON化する
  storage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// 課題要件: 画面更新しても維持されるように復元する(localStorageから読み込み)
const loadTodosFromLocalstorage = () => {
  if (!storage) return;
  // localStorageからデータを取得。getItemの戻り値はJSON文字列
  const json = storage.getItem(STORAGE_KEY); // {"text":"買い物","completed":false} の配列のJSON文字列
  if (json) {
    // JSON文字列をオブジェクトに変換
    const todos = JSON.parse(json); // [{text: "買い物", completed: false}, ...]
    // innerHTMLは既存の要素をクリアする
    list.innerHTML = '';
    todos.forEach((todo) => {
      // 要素を先頭から順に追加
      appendTodoItem(todo.text, todo.completed);
    });
  }
};

// 課題要件: 他のタブにも自動的に反映されるようにする
// localStorageの内容が変更されると storage イベントが発生する
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    loadTodosFromLocalstorage();
  }
});

// 要素を作成してリストに追加する関数（既存コードを関数化）
const appendTodoItem = (todoText, isCompleted = false) => {
  // ここから #todo-list に追加する要素を構築する
  // liは1つのTODOアイテムを表す
  const elem = document.createElement('li');
  // labelはTODOのテキストを表示する要素
  const label = document.createElement('label');
  label.textContent = todoText;
  //  初期状態では取り消し線は保存された状態を反映
  label.style.textDecorationLine = isCompleted ? 'line-through' : 'none';
  // inputタグを作成（inputタグは後からパスワード入力、ボタン、チェックボックスなど様々な役割を持たせることができる）
  const toggle = document.createElement('input');
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  // toggleはチェックボックス
  toggle.type = 'checkbox';
  // toggleのチェックボックスはlocalStorageに保存された状態を反映
  toggle.checked = isCompleted;
  // チェックボックスの状態が変化したときの処理
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      label.style.textDecorationLine = 'line-through';
    } else {
      label.style.textDecorationLine = 'none';
    }
    // localStorageに変更を保存
    saveTodosToLocalStorage();
  });
  const destroy = document.createElement('button');
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = '❌';
  destroy.addEventListener('click', () => {
    elem.remove();
    saveTodosToLocalStorage(); // 変更をlocalStorageに保存
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  // 追加した要素をリストの後ろに追加
  list.appendChild(elem);
};

form.addEventListener('submit', (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // ページがリロードされるのをふせぐため。
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身はsubmitの度に空にする
  input.value = '';

  // 要素を追加
  appendTodoItem(todo);

  // 保存を実行
  saveTodosToLocalStorage();
});

// 初回読み込みを実行
loadTodosFromLocalstorage();
