import { resettableCounter } from './index.ts';

describe('resettableCounter (リセット可能なカウンタ)', () => {
  let counter; // 各テストで使うジェネレータインスタンス

  // 各テスト ('test()') の実行前に、新しいジェネレータを起動する
  beforeEach(() => {
    counter = resettableCounter();
  });

  test('next() 呼び出しで正常にカウントアップすること', () => {
    // 1, 2, 3 と順番に値が返されるか
    expect(counter.next().value).toBe(1);
    expect(counter.next().value).toBe(2);
    expect(counter.next().value).toBe(3);
  });

  test('throw("reset") でカウンタがリセットされ、1から再開すること', () => {
    expect(counter.next().value).toBe(1);
    expect(counter.next().value).toBe(2);

    const resetResult = counter.throw('reset');

    expect(resetResult.value).toBe(1);
    expect(resetResult.done).toBe(false);

    expect(counter.next().value).toBe(2);
  });

  test('"reset" 以外のエラーはそのままスロー（再スロー）されること', () => {
    const testError = new Error('This is a test error');

    // 1 まで進める
    expect(counter.next().value).toBe(1);

    // ジェネレータに予期せぬエラーを投げ込む
    // 'testError' をスロー（throw）することを期待する
    expect(() => {
      counter.throw(testError);
    }).toThrow(testError);
  });

  test('予期せぬエラーがスローされた後、ジェネレータは終了状態(done: true)になること', () => {
    const testError = new Error('Crash');

    // 1 まで進める
    expect(counter.next().value).toBe(1);

    // エラーをスロー
    try {
      counter.throw(testError);
    } catch (e) {
      // エラーはここでキャッチ
      expect(e).toBe(testError);
    }

    // ジェネレータは unhandled exception (未処理の例外) で
    // 終了状態になる
    const state = counter.next();
    expect(state.done).toBe(true);
    expect(state.value).toBe(undefined);
  });
});
