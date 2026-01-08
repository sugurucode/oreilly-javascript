const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');
const template = document.querySelector('#todo-template');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  input.value = '';

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector('li');
  const toggle = clone.querySelector('input');
  const label = clone.querySelector('label');
  const destroy = clone.querySelector('button');

  toggle.addEventListener('change', () => {
    // チェック時にテキストをグレーにし、打ち消し線を引くクラスを追加
    if (toggle.checked) {
      label.classList.add('line-through', 'text-gray-400');
    } else {
      label.classList.remove('line-through', 'text-gray-400');
    }
  });
  label.textContent = todo;
  destroy.addEventListener('click', () => {
    li.remove();
  });

  list.prepend(li);
});
