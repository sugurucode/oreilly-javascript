const script = document.createElement('script');
script.src = './sample.js';
// SHA384ハッシュ値（空ファイルの場合）
script.integrity = 'sha384-OLBgpGvF6fF1F1QZQ+Q0VYt6v1Qe1QZQ+Q0VYt6v1Qe1QZQ+Q0VYt6v1Qe1QZQ+';
script.crossOrigin = 'anonymous';
script.onload = function () {
  document.body.textContent = 'ロード成功';
};
script.onerror = function () {
  document.body.textContent = 'ロード失敗';
};
document.body.appendChild(script);
