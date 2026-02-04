const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

// DB名とバージョン
const DB_NAME = 'todo-app-indexedDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

// データベース接続を保持する変数
let db;

// 1. ブラウザに指定のDBがなければ作成してopen。あればopenのみ
const request = indexedDB.open(DB_NAME, DB_VERSION);

// DBの新規作成またはバージョンアップ時に実行される
request.onupgradeneeded = (event) => {
  // eventのtarget.result にDB接続オブジェクトが入っている
  const db = event.target.result;
  // オブジェクトストアを作成。
  // keyPath: 'id' を指定して、各ToDoに一意のIDを持たせる
  // autoIncrement: true でIDを自動採番する

  // objectStoreNamesの中にSTORE_NAMEがなければ作成
  if (!db.objectStoreNames.contains(STORE_NAME)) {
    // KeyPathに'id'を指定。idがプライマリキーになり、autoIncrementで自動採番される
    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  // DB接続成功後に現在のToDo一覧を表示
  loadTodosFromIndexedDB();
};

request.onerror = (event) => {
  console.error('データベースエラー:', event.target.error);
};

// 2. ToDo一覧をDBから読み込んで表示する関数
const loadTodosFromIndexedDB = () => {
  if (!db) return;

  // 読み取り専用のトランザクションを開始
  const transaction = db.transaction([STORE_NAME], 'readonly');
  // オブジェクトストアを取得
  const store = transaction.objectStore(STORE_NAME);
  // すべてのデータを取得するリクエスト
  const request = store.getAll();
  // request.onsucessは非同期で実行される。つまりstore.getAll()の完了を待ってから実行される
  request.onsuccess = () => {
    // リストをクリアしてから再描画
    list.innerHTML = '';
    const todos = request.result;
    // 取得したToDoを画面に追加
    todos.forEach((todo) => {
      appendTodoItem(todo);
    });
  };
};

// 3. ToDoアイテムを画面に追加する関数
// 引数 todo は { id, text, completed } のオブジェクト
const appendTodoItem = (todo) => {
  const elem = document.createElement('li');

  const label = document.createElement('label');
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? 'line-through' : 'none';

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = todo.completed;

  // チェックボックス変更時の処理
  toggle.addEventListener('change', () => {
    const isCompleted = toggle.checked;
    label.style.textDecorationLine = isCompleted ? 'line-through' : 'none';

    // DB更新: 読み書きトランザクション
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // 内容を更新して保存 (put)
    store.put({ ...todo, completed: isCompleted });

    // もうindexedDBのお作法敵に必要。
    // putが完了したら他タブへ通知
    transaction.oncomplete = () => {
      triggerStorageEvent(); // 他タブへ通知
    };
  });

  const destroy = document.createElement('button');
  destroy.textContent = '❌';

  // 削除ボタンクリック時の処理
  destroy.addEventListener('click', () => {
    // DB削除: 読み書きトランザクション
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // IDを指定して削除
    store.delete(todo.id);

    transaction.oncomplete = () => {
      elem.remove();
      triggerStorageEvent(); // 他タブへ通知
    };
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.appendChild(elem);
};

// 4. localstorageを適当に発火させて他タブのstorageイベントを発火させる関数
const triggerStorageEvent = () => {
  // localStorage の 'trigger-storage-event' キーに現在時刻を書き込む。
  // 'storage' イベントを発火させたいだけ。
  localStorage.setItem('trigger-storage-event', Date.now().toString());
};

// 5. 他のタブからの変更を検知する
// triggerStorageEvent が実行されると storage イベントが発火する
window.addEventListener('storage', (e) => {
  // キーが 'trigger-storage-event' の場合にToDo一覧を再読み込み
  if (e.key === 'trigger-storage-event') {
    loadTodosFromIndexedDB();
  }
});

// 6. フォーム送信時の処理
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input.value.trim() === '') {
    return;
  }
  const text = input.value.trim();
  input.value = '';

  // DBへの追加: 読み書きトランザクション
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  // 新規ToDoを追加 (add)
  // IDは autoIncrement なので指定しなくてよい
  store.add({ text: text, completed: false });

  transaction.oncomplete = () => {
    // 追加完了後に画面を再読み込みして反映
    loadTodosFromIndexedDB();
    triggerStorageEvent(); // 他タブへ通知
  };
});
