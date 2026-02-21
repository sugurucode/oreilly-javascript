const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

// 15.11-15.4からの変更点:
// ・window.localStorage を window.sessionStorage に変更
// ・あとは関数名を変更しただけ

let storage = null;
try {
  // sessionStorage が利用可能か確認
  storage = window.sessionStorage;
} catch (e) {
  // 無効化されている場合は null のままにしておく
  // try-catch で囲まないと例外が発生して要件満たせない
}

const STORAGE_KEY = 'todo-list-data';

const saveTodosToSessionStorage = () => {
  if (!storage) return;

  const todos = [];
  // list 内の li 要素を全て取り出して、保存用の配列を構築する
  list.querySelectorAll('li').forEach((li) => {
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

const loadTodosFromSessionStorage = () => {
  if (!storage) return;
  const json = storage.getItem(STORAGE_KEY);
  if (json) {
    const todos = JSON.parse(json);
    list.innerHTML = '';
    todos.forEach((todo) => {
      appendTodoItem(todo.text, todo.completed);
    });
  }
};

// 注意: sessionStorage は「タブごと」に隔離されているため、
// 別のタブで変更してもこのイベントは発火しません（同一タブ内のiframe等でのみ有効）。
// そのため、localStorage版のような「タブ間同期」は機能しなくなります。
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    loadTodosFromSessionStorage();
  }
});

const appendTodoItem = (todoText, isCompleted = false) => {
  const elem = document.createElement('li');
  const label = document.createElement('label');
  label.textContent = todoText;
  label.style.textDecorationLine = isCompleted ? 'line-through' : 'none';

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = isCompleted;
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      label.style.textDecorationLine = 'line-through';
    } else {
      label.style.textDecorationLine = 'none';
    }
    saveTodosToSessionStorage();
  });

  const destroy = document.createElement('button');
  destroy.textContent = '❌';
  destroy.addEventListener('click', () => {
    elem.remove();
    saveTodosToSessionStorage();
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.appendChild(elem);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  input.value = '';

  appendTodoItem(todo);

  saveTodosToSessionStorage();
});

// 初回読み込みを実行
loadTodosFromSessionStorage();
