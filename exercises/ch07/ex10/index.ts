// 固定長配列の型定義
type FixedSizeArray = {
  get(index: number): number;
  set(index: number, value: number): void;
  length(): number;
};

function makeFixedSizeArray(size: number): FixedSizeArray {
  const array = new Array(size);
  return {
    get(index) {
      return array[index];
    },
    set(index, value) {
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ
  private len: number; // 実際に格納されている要素数
  private array: FixedSizeArray;

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index: number): number {
    return this.array.get(index);
  }
  set(index: number, value: number): void {
    this.array.set(index, value);
  }
  length() {
    return this.len;
  }
  push(value: number): void {
    // this.arrayに空きがない場合は「再配置」を行う
    if (this.len >= this.array.length()) {
      // 新しい固定長配列を作成
      const old = this.array;
      // 古い配列の2倍のサイズを持つ新しい配列を作成
      this.array = makeFixedSizeArray(old.length() * 2);
      // 古い配列(old)の要素を新しい配列にコピー
      for (let i = 0; i < old.length(); i++) {
        this.array.set(i, old.get(i));
      }
    }
    // 新しい値を末尾に追加
    this.array.set(this.len, value);
    this.len++; // ← ここで要素数を1つ増やす
  }
}
