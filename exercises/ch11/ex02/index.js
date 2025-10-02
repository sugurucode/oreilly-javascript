export function cache(f) {
  // WeakMapを利用してキャッシュを実装
  // objが到達不能になると、キャッシュもガベージコレクションされる
  const map = new WeakMap();
  return function (obj) {
    // objがキャッシュにあればそれを返す
    if (map.has(obj)) {
      return map.get(obj);
    }
    // なければfを呼び出して結果をキャッシュに保存してから返す
    const result = f(obj);
    map.set(obj, result);
    return result;
  };
}

export function slowFn(obj) {
  // 時間のかかる処理
  for (let i = 0; i < 1e8; i++) {
    i++;
  }
  return obj;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cachedSlowFn = cache(slowFn);
