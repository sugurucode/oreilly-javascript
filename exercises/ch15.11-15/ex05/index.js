const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

// --- IndexedDB と同期の設定 ---
const DB_NAME = 'SimpleTodoDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';
const SYNC_CHANNEL = 'todo_sync'; // タブ間同期用のチャンネル名

let db;
// BroadcastChannelはタブ間通信用のAPI。例えば、あるタブで変更があったら他のタブに通知できる
const channel = new BroadcastChannel(SYNC_CHANNEL);

// 1. DBを開く
const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = (e) => {
  db = e.target.result;
  // id をキーパスにし、自動採番 (autoIncrement) を有効にする
  if (!db.objectStoreNames.contains(STORE_NAME)) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  }
};

request.onsuccess = (e) => {
  db = e.target.result;
  loadTodos(); // DB接続成功時にリストを表示
};

request.onerror = (e) => {
  console.error('IndexedDB error:', e.target.errorCode);
};

// --- 同期機能 (BroadcastChannel) ---
// 他のタブからメッセージを受け取ったらリストを再読み込み
channel.onmessage = () => {
  loadTodos();
};

// 他のタブに更新を通知する関数
function notifyChange() {
  channel.postMessage('update');
}

// --- ロジックの分離 ---

// DBから全てのToDoを読み込んで表示する
function loadTodos() {
  if (!db) return;

  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const req = store.getAll();

  req.onsuccess = (e) => {
    const todos = e.target.result;
    list.innerHTML = ''; // リストを一度クリア

    // DBのデータをもとにDOM要素を作成して配置
    todos.forEach((todo) => {
      const elem = createTodoElement(todo);
      // 元のコードに合わせて prepend (新しいものを上) するなら
      // DBの並び順次第ですが、ここでは素直に prepend します
      list.prepend(elem);
    });
  };
}

// 単一のToDoデータ (オブジェクト) から DOM要素 (li) を生成する関数
// ※元のコードのロジックをここに移植しました
function createTodoElement(todoData) {
  const elem = document.createElement('li');

  const label = document.createElement('label');
  label.textContent = todoData.text;
  // DBの状態に合わせてスタイルを適用
  label.style.textDecorationLine = todoData.completed ? 'line-through' : 'none';

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  // DBの状態に合わせてチェックを入れる
  toggle.checked = todoData.completed;

  // toggle が変化した際の処理
  toggle.addEventListener('change', () => {
    // 1. 見た目の変更
    if (toggle.checked) {
      label.style.textDecorationLine = 'line-through';
    } else {
      label.style.textDecorationLine = 'none';
    }

    // 2. DBの更新 (completedの状態を保存)
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    // 更新用のデータを作成
    const updatedTodo = { ...todoData, completed: toggle.checked };
    store.put(updatedTodo); // putはIDが同じなら上書き更新

    transaction.oncomplete = () => notifyChange(); // 他タブへ通知
  });

  const destroy = document.createElement('button');
  destroy.textContent = '❌';

  // destroy がクリックされた場合の処理
  destroy.addEventListener('click', () => {
    // 1. DBから削除
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(todoData.id);

    // 2. 画面から削除
    elem.remove();

    transaction.oncomplete = () => notifyChange(); // 他タブへ通知
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);

  return elem;
}

// --- イベントハンドラ ---

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input.value.trim() === '') {
    return;
  }
  const todoText = input.value.trim();
  input.value = '';

  // DBに追加するデータオブジェクト
  const newTodo = {
    text: todoText,
    completed: false,
  };

  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const req = store.add(newTodo);

  req.onsuccess = (e) => {
    // 追加に成功したら、IDが付与されるのでそれを取得
    newTodo.id = e.target.result;

    // DOM要素を作成して追加
    const elem = createTodoElement(newTodo);
    list.prepend(elem);

    notifyChange(); // 他タブへ通知
  };
});
