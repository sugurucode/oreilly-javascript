const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');
const template = document.querySelector('#todo-template');

// { content: "...", completed: true or false } の配列
let todos = []; // 動かなかったのでletに変更

function renderTodos(todos) {
  list.innerHTML = '';
  todos.forEach((todo) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    const toggle = clone.querySelector('input');
    const label = clone.querySelector('label');
    const destroy = clone.querySelector('button');

    li.classList.toggle('completed', todo.completed);
    li.classList.toggle('active', !todo.completed);
    // チェックボックスが変わるたびにdispatchEventでhashchangeイベントを発火させる
    toggle.addEventListener('change', () => {
      todo.completed = toggle.checked;
      // dispatchEventを使ってhashchangeイベントを手動で発火させる
      window.dispatchEvent(new Event('hashchange'));
    });

    label.textContent = todo.content;
    toggle.checked = todo.completed;
    // 削除ボタンがクリックされたときの処理
    destroy.addEventListener('click', () => {
      deleteTodo(todo.content); // todo.contentには選択したTODOの内容が入っている
      window.dispatchEvent(new Event('hashchange')); // 画面更新
    });
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  input.value = '';

  todos.push({ content: todo, completed: false });
  window.dispatchEvent(new Event('hashchange'));
});

// ハッシュが変わったときの処理
window.addEventListener('hashchange', () => {
  // ここを実装してね
  // URLのハッシュ部分を取得
  // ハッシュとは、URLの「#」以降の部分のことで、ページ内リンクや状態管理に使用。
  const hash = window.location.hash; // 例: '#/completed', '#/active', ''
  if (hash === '#/completed') {
    //
    renderTodos(todos.filter((t) => t.completed));
  } else if (hash === '#/active') {
    renderTodos(todos.filter((t) => !t.completed));
  } else {
    renderTodos(todos);
  }
});

function deleteTodo(content) {
  // filtrを使って、選択されたcontentと異なるものだけを残す
  todos = todos.filter((t) => t.content !== content);
}

// 初回読み込み時に現在のハッシュに合わせて描画を実行
window.dispatchEvent(new Event('hashchange'));
