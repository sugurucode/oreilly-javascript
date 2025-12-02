window.addEventListener('DOMContentLoaded', () => {
  // 仮定: 同一オリジンポリシーが無効
  const iframe = document.getElementById('other');
  const titles = iframe.contentWindow.document.querySelectorAll('#video-title');
  for (const t of titles) {
    fetch('/your-server-path', { method: 'POST', body: t.textContent });
  }
});
