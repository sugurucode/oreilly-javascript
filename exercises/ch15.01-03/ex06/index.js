function addDeviceInfo(label, value) {
  // ulタグ（リスト）の中にli（項目）を追加していく。
  const list = document.getElementById('info-list');
  const li = document.createElement('li');

  // 値がない場合は「不明」または非表示にする
  if (!value) return;
  // liの中にラベルと値をセット
  li.innerHTML = `
        <span class="info-label">${label}:</span>
        <span class="info-value">${value}</span>
    `;
  list.appendChild(li);
}

/**
 * メイン処理: ページ読み込み完了後に実行
 */
window.addEventListener('DOMContentLoaded', () => {
  // 1. OS / ブラウザ情報の取得
  // 「Windows10を使用中だよね」
  addDeviceInfo('OS/Browser', navigator.userAgent);

  // 2. 言語設定
  // 「日本語環境だよね」
  addDeviceInfo('言語設定', navigator.language);

  // 3. 画面解像度
  // 「あなたのモニターサイズわかるよ」
  const resolution = `${window.screen.width} x ${window.screen.height}`;
  addDeviceInfo('画面解像度', resolution);

  // 4. CPUコア数 (論理コア数)
  if (navigator.hardwareConcurrency) {
    addDeviceInfo('CPU論理コア数', `${navigator.hardwareConcurrency} コア`);
  }

  // 5. デバイスメモリ (GB) - Chrome等の一部ブラウザのみ対応
  if (navigator.deviceMemory) {
    addDeviceInfo('RAM容量', `${navigator.deviceMemory} GB`);
  }

  // 6. 接続状況
  // 不安を煽るため、あえて赤字や警告風の文字列にします
  const connectionStatus = navigator.onLine
    ? "<span style='color:red'> データ送信中</span>"
    : 'オフライン';
  addDeviceInfo('ネットワーク', connectionStatus);

  // --- ボタンクリック時のイベント (学習用のアラート) ---
  document.getElementById('call-btn').addEventListener('click', () => {
    alert('これは学習用のデモ画面です。');
  });
});
