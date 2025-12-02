// index.js

/**
 * オブジェクトのメソッド呼び出しを記録するProxyを作成する関数
 * @param {object} targetObj - 監視対象のオブジェクト
 * @returns {[object, array]} - [Proxy化されたオブジェクト, ログ配列]
 */
export function makeProxyAndLogs(targetObj) {
  // 1. 履歴を保存するための空の配列を作ります
  const logs = [];

  // 2. Proxyの「ハンドラ（挙動の定義）」を作ります
  const handler = {
    /**
     * getトラップ
     * プロパティやメソッドにアクセスしようとした時に自動的に呼ばれます
     * 例: proxy.p や proxy.f(1, 2) の「proxy.f」の部分で発動
     */
    get(target, prop, receiver) {
      // 本来の値（または関数）を取得します
      const value = target[prop];

      // もし取得したものが「関数（メソッド）」だった場合だけ、特別な処理をします
      if (typeof value === 'function') {
        // 関数をそのまま返さず、「ログを取ってから実行する関数」に包んで返します
        return function (...args) {
          // A. ログを保存
          logs.push({
            name: prop, // 呼ばれたメソッド名 (例: 'f')
            args: args, // 渡された引数 (例: [1, 2])
            timestamp: new Date(), // 実行時刻
          });

          // B. 本来の関数を実行して、その結果を返す
          // applyを使うことで、this(target)を正しく紐付けて実行します
          return value.apply(target, args);
        };
      }

      // 関数じゃない場合（ただの数字や文字のプロパティ）は
      // 何もせずそのまま値を返します
      return value;
    },
  };

  // 3. targetObj を handler のルールで動く Proxy に変換します
  const proxy = new Proxy(targetObj, handler);

  // 4. Proxy と logs をペアにして返します
  return [proxy, logs];
}
