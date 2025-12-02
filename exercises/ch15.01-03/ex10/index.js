// ...新規ファイル...
const div = document.getElementById('editor-front');
const input = document.getElementById('editor-back');

// divクリックでinputにfocus
if (div && input) {
  div.addEventListener('click', () => {
    input.focus();
  });

  // input focus時div背景色をsilver、blurで白に戻す
  input.addEventListener('focus', () => {
    div.style.backgroundColor = 'silver';
  });
  input.addEventListener('blur', () => {
    div.style.backgroundColor = 'white';
  });

  // inputの内容をdivに表示（HTMLタグはエスケープして表示）
  input.addEventListener('input', () => {
    div.textContent = input.value;
  });
}
// ...新規ファイル...
