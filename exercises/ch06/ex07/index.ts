// testが実行できない。
export function assign(target, ...sources) {
  if ((target == null) | undefined) {
    throw new TypeError('target is undefined or null');
  }
  // targetをオブジェクトに変換
  const targetObj = Object(target);
  for (const source of sources) {
    if (source == null) continue;
    // sourcesの中のsourceの複数プロパティキーを取得
    const keys = Object.keys(source);
    // 各キーに対して、ターゲットオブジェクトにプロパティをコピー
    for (const key of keys) {
      targetObj[key] = source[key];
    }
    // ソースオブジェクトのシンボルプロパティを取得
    const symbols = Object.getOwnPropertySymbols(source);
    for (const sym of symbols) {
      // propertyIsEnumerable:列挙可能ならtrueを返す
      // call:↑をsourceに適用
      if (Object.propertyIsEnumerable.call(source, sym)) {
        targetObj[sym] = source[sym];
      }
    }
  }
  return targetObj;
}
