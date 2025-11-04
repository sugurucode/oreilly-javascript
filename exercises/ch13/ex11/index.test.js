import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from './index';

describe('retryWithExponentialBackoff', () => {
  it('成功時は即座に結果を返す', async () => {
    const func = jest.fn().mockResolvedValue('成功');
    await expect(retryWithExponentialBackoff(func, 2)).resolves.toBe('成功');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('失敗後に成功した場合、リトライして結果を返す', async () => {
    const func = jest
      .fn()
      .mockRejectedValueOnce(new Error('失敗'))
      .mockResolvedValue('リトライ成功');
    await expect(retryWithExponentialBackoff(func, 2)).resolves.toBe('リトライ成功');
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('全て失敗した場合、エラーになる', async () => {
    const func = jest.fn().mockRejectedValue(new Error('常に失敗'));
    await expect(retryWithExponentialBackoff(func, 1)).rejects.toThrow('常に失敗');
    expect(func).toHaveBeenCalledTimes(2); // 初回+1回リトライ
  });
});
