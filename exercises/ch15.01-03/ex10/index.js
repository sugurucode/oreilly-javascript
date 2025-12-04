// div 要素をクリックすると input 要素が focus される
// div 要素は通常白色で input 要素に focus されると灰色 (silver)になる (input 要素から focus が外れると白色に戻る)
// input 要素に入力された text は div 要素にも表示される
const div = document.getElementById('editor-front');
const input = document.getElementById('editor-back');

// divクリックでinputにfocus
if (div && input) {
  div.addEventListener('click', () => {
    input.focus();
    div.style.backgroundColor = 'silver';
  });
  // input focus時div背景色をsilver、blurで白に戻す
  input.addEventListener('focus', () => {
    div.style.backgroundColor = 'silver';
  });
  // blurはfocusが外れること
  input.addEventListener('blur', () => {
    div.style.backgroundColor = 'white';
  });

  // inputの内容をdivに表示（HTMLタグはエスケープして表示）
  // inputはユーザーが値を入力するたびに発火する
  input.addEventListener('input', () => {
    // divのtextereaにinputの値を設定
    div.textContent = input.value;
  });
}

// suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ npm run test:browser -- exercises/ch15.01-03/ex10/index.spec.js

// > preset-ts@1.0.0 test:browser
// > playwright test exercises/ch15.01-03/ex10/index.spec.js

// Running 4 tests using 1 worker

//   ✓  1 …he div, then it focus the input (187ms)
//   ✓  2 … the color of the div is silver (130ms)
//   ✓  3 …xts, then the div displays texts (86ms)
//   ✓  4 …he div displays sanitiezed texts (75ms)

//   4 passed (1.3s)
