const template = document.createElement('template');
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    // attachShadow: この要素にShadow DOMをアタッチするメソッド
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector('#new-todo-form');
    // TODO: 残りを実装
    // shadowRoot:shadow DOM内を参照するためのプロパティ
    this.input = this.shadowRoot.querySelector('#new-todo');
    this.list = this.shadowRoot.querySelector('#todo-list');

    // フォームの送信イベントを処理
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addTodo(this.input.value);
      this.input.value = '';
    });
  }
  addTodo(text) {
    // 空文字の場合は何もしない
    if (!text || text.trim() === '') return;

    // リストアイテム (li) を作成
    const li = document.createElement('li');

    // テキスト部分を作成 (span)
    const span = document.createElement('span');
    span.textContent = text;
    // クリックで見栄えを変更するイベント (完了状態のトグル)
    span.addEventListener('click', () => {
      span.classList.toggle('completed');
    });
    // カーソルをポインターにしてクリックできることを明示（任意）
    span.style.cursor = 'pointer';

    // 削除ボタンを作成
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.style.marginLeft = '10px';
    // クリックで要素を削除するイベント
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    // li に要素を組み立てて追加
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Shadow DOM 内のリストに追加
    this.list.appendChild(li);
  }
}

customElements.define('todo-app', TodoApp);
