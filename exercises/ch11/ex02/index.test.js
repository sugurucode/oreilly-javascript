import { cache, slowFn } from './index';

describe('cache and slowFn)', () => {
  it('should cache the result and improve performance for repeated calls', () => {
    const cachedSlowFn = cache(slowFn);
    const obj = {};
    // 1回目は遅い
    const start1 = Date.now();
    cachedSlowFn(obj);
    const end1 = Date.now();
    // 2回目は速い
    const start2 = Date.now();
    cachedSlowFn(obj);
    const end2 = Date.now();
    // 2回目の方が明らかに速いことを確認
    expect(end2 - start2).toBeLessThan(end1 - start1);
  });

  it('should not cache for different objects', () => {
    const cachedSlowFn = cache(slowFn);
    const obj1 = {};
    const obj2 = {};
    const start1 = Date.now();
    cachedSlowFn(obj1);
    const end1 = Date.now();
    const start2 = Date.now();
    cachedSlowFn(obj2);
    const end2 = Date.now();
    // 両方とも遅い（キャッシュされない）
    expect(end1 - start1).toBeGreaterThan(0);
    expect(end2 - start2).toBeGreaterThan(0);
  });
});
