import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from './index';

describe('retryWithExponentialBackoff', () => {
  it('成功時は即座に結果を返す', async () => {
    const func = jest.fn().mockResolvedValue('成功'); // 常に成功する関数
    // Promiseが解決され、その値が成功(第２引数は適当な値)
    await expect(retryWithExponentialBackoff(func, 3)).resolves.toBe('成功');
    // funcが1回だけ呼ばれたことを確認
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('失敗後に成功した場合、リトライして結果を返す', async () => {
    const func = jest
      .fn()
      .mockRejectedValueOnce(new Error('失敗')) // 最初の呼び出しで失敗
      .mockResolvedValue('リトライ成功'); // 2回目で成功
    await expect(retryWithExponentialBackoff(func, 2)).resolves.toBe('リトライ成功');
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('全て失敗した場合、エラーになる', async () => {
    const func = jest.fn().mockRejectedValue(new Error('常に失敗'));
    // Promiseが拒否され、その理由がErrorオブジェクトであることを確認

    await expect(retryWithExponentialBackoff(func, 1)).rejects.toThrow('常に失敗');
    // 試行回数は最初の1回と1回リトライの合計2回
    expect(func).toHaveBeenCalledTimes(2); // 初回+1回リトライ
  });
});
