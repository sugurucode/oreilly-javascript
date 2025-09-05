// 値が数値のプロパティを持つオブジェクトの型
export type typeval = { x: number; y: number; z: number };

// 偶数の値を持つプロパティだけを残した新しいオブジェクトを返す関数
export const f = (obj: typeval): Partial<typeval> => {
  // object.entriesでキーとバリューの配列にする
  // object.fromEntriesで配列から新しいオブジェクトを作る。
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value % 2 === 0));
};
