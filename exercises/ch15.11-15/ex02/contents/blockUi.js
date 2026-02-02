/**
 * 通信中に画面操作をブロック/解除する関数
 */
export function setAppBusy(isBusy) {
  // 画面内のすべての input と button を無効化/有効化
  const elements = document.querySelectorAll('input, button');
  elements.forEach((el) => {
    el.disabled = isBusy;
  });
}
