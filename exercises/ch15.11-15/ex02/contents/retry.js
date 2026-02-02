export async function fetchWithRetry(url, options = {}) {
  const maxRetry = 3; // 1/3で失敗→とりあえず3回リトライ
  for (let i = 0; i <= maxRetry; i++) {
    // タイムアウト用の AbortController を作成
    const controller = new AbortController();
    // abort()でリクエストを中止するタイマーをセット（3秒）
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      // fetch に signal オプションを渡す
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      // 成功なら即終了
      if (res.ok) return res;

      // リトライ対象外なら即終了
      const isRetryable = res.status === 408 || res.status === 429 || res.status >= 500;
      if (!isRetryable) return res;

      // リトライ上限に達したら終了
      if (i === maxRetry) return res;

      // まだ次があるなら、3秒待機してからループの先頭へ
      // 503などはサーバーが混雑している状態なので、少し待ってから再度試す
      const waitTime = 3000;
      // 一次停止
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    } catch (error) {
      // 3秒待っても応答がない場合やネットワークエラーの場合
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        alert('リクエストがタイムアウトしました');
        throw new Error('Timeout');
      }

      // エラーが起きても、まだ次があるならループを続ける（catchを抜けて次の for へ）
      // 最後ならエラーを投げる
      if (i === maxRetry) throw error;
    }
  }
}
