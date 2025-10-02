import { retryWithExponentialBackoff } from './index.js';
describe('retryWithExponentialBackoff', () => {
  // Jestのタイマーをモックに置き換え
  // setTimeoutを動かすのに必要
  jest.useFakeTimers();

  it('funcが最初でtrueなら即callback(true)', () => {
    // trueを返すモック関数
    const func = jest.fn(() => true);
    // コールバック関数のモック
    const callback = jest.fn();
    retryWithExponentialBackoff(func, 3, callback);
    // setTimeoutで登録された全てのタイマーを実行
    // setTimeoutを動かすのに必要
    jest.runAllTimers();
    // funcは1回だけ呼ばれる
    expect(func).toHaveBeenCalledTimes(1);
    // funcが成功したら、callback(true)が呼ばれる
    expect(callback).toHaveBeenCalledWith(true);
  });

  it('funcがfalseを返し続けたらmaxRetry回でcallback(false)', () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();
    retryWithExponentialBackoff(func, 2, callback);
    jest.runAllTimers();
    expect(func).toHaveBeenCalledTimes(3); // 1回+2回リトライ
    expect(callback).toHaveBeenCalledWith(false);
  });

  it('途中でfuncがtrueになったらcallback(true)', () => {
    let count = 0;
    // 呼ばれるたびにcountを1増やし、2回目にtrueを返す
    const func = jest.fn(() => ++count === 2);
    const callback = jest.fn();
    retryWithExponentialBackoff(func, 3, callback);
    jest.runAllTimers();
    // funcは2回呼ばれる
    expect(func).toHaveBeenCalledTimes(2);
    // funcが成功したら、callback(true)が呼ばれる
    expect(callback).toHaveBeenCalledWith(true);
  });
});
