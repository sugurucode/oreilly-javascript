const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

// ローカルストレージのキー
const STORAGE_KEY = 'todo-list-data';

// アプリケーションの状態（タスクの配列）
let todoItems = [];

/**
 * データをローカルストレージから読み込む関数
 * localStorageが無効化されていてもエラーにならないように try-catch する
 */
function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      todoItems = JSON.parse(data);
    } else {
      todoItems = [];
    }
  } catch (e) {
    // localStorageが無効な場合は、何もしない（メモリ上の todoItems は空のまま開始）
    console.warn('localStorage is disabled or inaccessible. Falling back to in-memory storage.');
  }
}

/**
 * データをローカルストレージに保存する関数
 * localStorageが無効化されていてもエラーにならないように try-catch する
 */
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
  } catch (e) {
    // localStorageが無効な場合は、保存できないだけでエラーにはしない
    console.warn('Cannot save to localStorage.');
  }
}

/**
 * UI全体を再描画する関数
 * タブ間同期などでデータがごっそり入れ替わった場合に使用
 */
function renderList() {
  // 一旦リストを空にする
  list.innerHTML = '';
  // 現在の todoItems をもとに要素を作り直す
  todoItems.forEach((task) => {
    appendToDoItem(task);
  });
}

// ページの読み込みが完了したら実行される
document.addEventListener('DOMContentLoaded', () => {
  // ストレージから読み込み
  loadFromStorage();
  // 描画
  renderList();
});

// 他のタブで localStorage が更新されたときに発火するイベント
window.addEventListener('storage', (e) => {
  // 今回関係あるキーの変更でなければ無視
  if (e.key !== STORAGE_KEY) return;

  // 新しいデータを読み込んで再描画
  loadFromStorage();
  renderList();
});

// new-todo-form が送信された際に実行される
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === '') {
    return;
  }

  input.value = '';

  // 新しいタスクを作成
  // IDはサーバーがないので現在時刻などで生成する
  const newTask = {
    id: Date.now(),
    name: todo,
    status: 'active',
  };

  // 配列に追加
  todoItems.push(newTask);

  // 保存して画面に追加
  saveToStorage();
  appendToDoItem(newTask);
});

// タスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  const elem = document.createElement('li');

  const label = document.createElement('label');
  label.textContent = task.name;
  label.style.textDecorationLine = task.status === 'completed' ? 'line-through' : 'none';

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = task.status === 'completed';

  // チェックボックス変更時の処理
  toggle.addEventListener('change', () => {
    // 配列内の対象タスクの状態を更新
    const targetTask = todoItems.find((t) => t.id === task.id);
    if (targetTask) {
      targetTask.status = toggle.checked ? 'completed' : 'active';
      // 装飾を変更
      label.style.textDecorationLine = toggle.checked ? 'line-through' : 'none';
      // 保存
      saveToStorage();
    }
  });

  const destroy = document.createElement('button');
  destroy.textContent = 'Delete';

  // 削除ボタンクリック時の処理
  destroy.addEventListener('click', () => {
    // 配列から削除
    todoItems = todoItems.filter((t) => t.id !== task.id);
    // UIから削除
    elem.remove();
    // 保存
    saveToStorage();
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);

  list.prepend(elem);
}
