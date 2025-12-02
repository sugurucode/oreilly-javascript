// index.test.js
import { makeProxyAndLogs } from './index.js';

describe('makeProxyAndLogsのテスト', () => {
  test('メソッド呼び出しが正しくログに記録されること', () => {
    // テスト用のオブジェクト
    const target = {
      p: 100,
      add: (a, b) => a + b,
      greet: (name) => `Hello, ${name}`,
    };

    // Proxyとログ配列を取得
    const [proxy, logs] = makeProxyAndLogs(target);

    // 1. まだ何もしていないのでログは空のはず
    expect(logs).toEqual([]);

    // 2. プロパティへのアクセス (関数呼び出しではない)
    expect(proxy.p).toBe(100);
    // プロパティアクセスだけではログは増えない仕様です
    expect(logs.length).toBe(0);

    // 3. メソッド呼び出し (add)
    const resultAdd = proxy.add(1, 2);
    expect(resultAdd).toBe(3); // 計算結果が正しいか

    // ログが1つ増えているはず
    expect(logs.length).toBe(1);
    expect(logs[0].name).toBe('add');
    expect(logs[0].args).toEqual([1, 2]);
    // timestampはDateオブジェクトであることだけ確認
    expect(logs[0].timestamp).toBeInstanceOf(Date);

    // 4. 別のメソッド呼び出し (greet)
    const resultGreet = proxy.greet('World');
    expect(resultGreet).toBe('Hello, World');

    // ログが追記されているはず
    expect(logs.length).toBe(2);
    expect(logs[1].name).toBe('greet');
    expect(logs[1].args).toEqual(['World']);
  });
});
