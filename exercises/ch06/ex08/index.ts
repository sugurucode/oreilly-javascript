export function restrict(target, template) {
  // target の独自プロパティ名を取得
  const targetKeys = Object.keys(target);
  // template の独自プロパティ名をセットに変換
  const templateKey = Object.keys(template);

  // target の各独自プロパティ名を反復処理します。
  for (const key of targetKeys) {
    // templateKeyの中にkeyが含まれていない場合、targetからkeyを削除。
    if (!templateKey.includes(key)) {
      delete target[key];
    }
  }

  return target;
}

export function substract(target, ...sources) {
  // targetの独自プロパティ名を取得
  const targetKeys = Object.keys(target);

  // sourcesの独自プロパティ名を全て配列にまとめる
  const sourceKeys: string[] = [];
  for (const source of sources) {
    sourceKeys.push(...Object.keys(source));
  }

  // targetの各独自プロパティ名がsourcesにあれば削除
  for (const key of targetKeys) {
    if (sourceKeys.includes(key)) {
      delete target[key];
    }
  }

  return target;
}
