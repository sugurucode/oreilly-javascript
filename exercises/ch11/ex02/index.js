export function cache(f) {
  const wm = new WeakMap();
  return function (obj) {
    if (wm.has(obj)) {
      return wm.get(obj);
    }
    const result = f(obj);
    wm.set(obj, result);
    return result;
  };
}

export function slowFn(obj) {
  // 時間のかかる処理の例
  return JSON.stringify(obj) + Date.now();
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
export const cachedSlowFn = cache(slowFn);
