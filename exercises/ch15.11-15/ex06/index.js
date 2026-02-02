const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

const STORAGE_KEY = 'todo-session-data';
const CHANNEL_NAME = 'todo_sync_channel';

// タブ間通信用のチャンネルを作成
const channel = new BroadcastChannel(CHANNEL_NAME);

let todoItems = [];

/**
 * データをセッションストレージから読み込む
 */
function loadFromStorage() {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (data) {
      todoItems = JSON.parse(data);
    } else {
      todoItems = [];
    }
  } catch (e) {
    console.warn('sessionStorage is disabled or inaccessible.');
    todoItems = [];
  }
}

/**
 * データをセッションストレージに保存する
 * @param {boolean} shouldBroadcast - 他のタブに通知するかどうか（無限ループ防止のため受信時はfalseにする）
 */
function saveToStorage(shouldBroadcast = true) {
  try {
    const dataStr = JSON.stringify(todoItems);
    sessionStorage.setItem(STORAGE_KEY, dataStr);

    if (shouldBroadcast) {
      // 変更内容（全データ）を他のタブに送信
      channel.postMessage(todoItems);
    }
  } catch (e) {
    console.warn('Cannot save to sessionStorage.');
  }
}

/**
 * UIを描画する
 */
function renderList() {
  list.innerHTML = '';
  todoItems.forEach((task) => {
    appendToDoItem(task);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  renderList();
});

// ★追加: 別タブからのメッセージを受け取ったときの処理
channel.onmessage = (event) => {
  // 受け取ったデータでリストを更新
  todoItems = event.data;

  // 自分のsessionStorageも更新するが、通知は送り返さない（無限ループ防止: false）
  saveToStorage(false);

  // 画面再描画
  renderList();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === '') return;
  input.value = '';

  const newTask = {
    id: Date.now(),
    name: todo,
    status: 'active',
  };

  todoItems.push(newTask);
  saveToStorage(); // 保存して通知
  appendToDoItem(newTask);
});

function appendToDoItem(task) {
  const elem = document.createElement('li');

  const label = document.createElement('label');
  label.textContent = task.name;
  label.style.textDecorationLine = task.status === 'completed' ? 'line-through' : 'none';

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = task.status === 'completed';

  toggle.addEventListener('change', () => {
    const targetTask = todoItems.find((t) => t.id === task.id);
    if (targetTask) {
      targetTask.status = toggle.checked ? 'completed' : 'active';
      label.style.textDecorationLine = toggle.checked ? 'line-through' : 'none';
      saveToStorage(); // 保存して通知
    }
  });

  const destroy = document.createElement('button');
  destroy.textContent = 'Delete';

  destroy.addEventListener('click', () => {
    todoItems = todoItems.filter((t) => t.id !== task.id);
    elem.remove();
    saveToStorage(); // 保存して通知
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);

  list.prepend(elem);
}
