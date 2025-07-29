// 文字列を数値に変換するハッシュ関数
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // charCodeAtを使って文字コードを取得。ハッシュ値を計算
    hash = hash * 31 + str.charCodeAt(i);
  }
  // Math.absで負の値を正に変換
  return Math.abs(hash);
};

export function newHashTable(capacity: number) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), //マッピングを格納する固定長の配列
    get(key: string) {
      // 「ハッシュ値に対して配列サイズの剰余を用いる」
      const index = hashString(key) % capacity;
      // 1つのentries[index]には複数のマッピングがある可能性。
      // そのindexの配列要素を取得。
      let node = this.entries[index];
      // 配列要素は複数の可能性
      // リンクリストをたどってキーを探す
      while (node) {
        if (node.key === key) return node.value;
        // リンクリストの次のノード（リンクリスト.next）
        node = node.next;
      }
      return undefined;
    },

    put(key: string, value: object | string) {
      const index = hashString(key) % capacity;
      let node = this.entries[index];

      // 「keyが存在する場合はvalueを上書きする」
      while (node) {
        if (node.key === key) {
          node.value = value;
          return;
        }
      }
      // keyが存在しない場合は新しいマッピングをリンクリストの先頭に追加する
      // {キー、バリュー、先頭ノード}
      const newhashArray = { key, value, next: this.entries[index] };
      this.entries[index] = newhashArray;
      this.size++;
    },
    remove(key: string) {
      const index = hashString(key) % capacity;
      let node = this.entries[index];
      // 先頭ノードが削除対象の場合
      if (node && node.key === key) {
        // 先頭ノードを次のノードに置き換える（先頭ノードの削除）
        // 先頭ノードはガベージコレクションの対象
        this.entries[index] = node.next;
        this.size--;
        return;
      }
      // それ以外はnextを辿って削除
      while (node && node.next) {
        if (node.next.key === key) {
          // node.nextを削除するために、node.next.nextをnode.nextに設定
          node.next = node.next.next;
          this.size--;
          return;
        }
        node = node.next;
      }
    },
  };
}
