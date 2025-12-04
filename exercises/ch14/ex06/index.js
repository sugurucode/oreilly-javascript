// index.js

export function makeProxyAndLogs(targetObj) {
  // 任意のオブジェクトを引数に取る
  // 1. 履歴を保存するための空の配列
  const logs = [];

  // 2. Proxyの「ハンドラ（挙動の定義）」
  const handler = {
    /**
     * プロパティやメソッドにアクセスしようとした時に自動的に呼ばれる
     * 例: proxy.p、proxy.f(1, 2) の「proxy.f」の部分で発動
     */
    get(target, prop) {
      // 本来の値（または関数）を取得
      const value = target[prop];

      // 任意のメソッド呼び出しに対して
      if (typeof value === 'function') {
        // ログを保存してから本来の関数を実行する新しい関数を返す
        return function (...args) {
          // ログを保存
          logs.push({
            timestamp: new Date(), // 呼び出された時刻
            name: prop, // 呼ばれたメソッド名 (例: 'f')
            args: args, // パラメータ (例: [1, 2])
          });

          // proxyObj.f(1, 2, 3);と呼ばれた場合、
          // argsには[1, 2, 3]が入る。
          // thisをtargetに紐付けて,引数にargsを展開して実行
          return value.call(target, ...args);
        };
      }
      // 関数じゃない場合はなにもしない
      return value;
    },
  };

  // 3. targetObj を handler のルールで動く Proxy に変換
  const proxy = new Proxy(targetObj, handler);

  // 4. Proxy と logs をペアにして返します
  return [proxy, logs];
}
