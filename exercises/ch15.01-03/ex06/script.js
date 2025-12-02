/**
 * 情報をリストに追加する関数
 * @param {string} label - 項目名
 * @param {string} value - 取得した値
 */
function addDeviceInfo(label, value) {
  const list = document.getElementById('info-list');
  const li = document.createElement('li');

  // 値がない場合は「不明」または非表示にする
  if (!value) return;

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
  // 1. OS / ブラウザ情報の取得 (UserAgent)
  // 詐欺サイトはこれを見せて「Windows 10を使用中ですね？」などと脅します
  addDeviceInfo('OS/Browser', navigator.userAgent.slice(0, 40) + '...');

  // 2. 言語設定
  // 日本語環境であることを強調します
  addDeviceInfo('言語設定', navigator.language);

  // 3. 画面解像度
  // 「あなたのモニターサイズを特定しました」という演出に使われます
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
    ? "<span style='color:red'>⚠️ オンライン (データ送信中)</span>"
    : 'オフライン';
  addDeviceInfo('ネットワーク', connectionStatus);

  // 7. プラットフォーム情報 (Win32, MacIntelなど)
  if (navigator.platform) {
    addDeviceInfo('プラットフォーム', navigator.platform);
  }

  // --- カウントダウンタイマーの処理 ---
  let timeLeft = 300; // 5分 (300秒)
  const timerElement = document.getElementById('countdown');

  setInterval(() => {
    if (timeLeft <= 0) {
      timerElement.textContent = '00:00';
      return;
    }
    timeLeft--;

    // 分と秒を計算して 0埋め表示 (例: 04:05)
    const minutes = Math.floor(timeLeft / 60);
    const seconds = String(timeLeft % 60).padStart(2, '0');

    timerElement.textContent = `0${minutes}:${seconds}`;
  }, 1000);

  // --- ボタンクリック時のイベント (学習用のアラート) ---
  document.getElementById('call-btn').addEventListener('click', () => {
    alert(
      'これは学習用のデモ画面です。\n実際の詐欺サイトでは電話をかけさせたり、アプリをインストールさせようとします。',
    );
  });
});
