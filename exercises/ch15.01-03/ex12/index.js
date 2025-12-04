javascript: (function () {
  const selectedText = window.getSelection().toString();
  const charCount = selectedText.length;
  if (charCount > 0) {
    alert('選択されたテキストの文字数: ' + charCount + '文字\n\n（空白・改行を含む）');
  } else {
    alert('テキストが選択されていません。');
  }
})();
