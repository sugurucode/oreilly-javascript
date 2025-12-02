// 文字列を数値に変換するハッシュ関数
export const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        // charCodeAtを使って文字コードを取得。ハッシュ値を計算
        // https://rainbow-engine.com/java-hashcode-multi31-reason/
        // 衝突が少なく、計算が速い
        hash = hash * 31 + str.charCodeAt(i);
    }
    // Math.absで負の値を正に変換
    return Math.abs(hash);
};
export function newHashTable(capacity) {
    return {
        size: 0, // マッピング数を示すプロパティ
        entries: new Array(capacity), //マッピングを格納する固定長の配列
        get(key) {
            // 「ハッシュ値に対して配列サイズの剰余を用いる」
            const index = hashString(key) % capacity;
            // 1つのentries[index]には複数のマッピングがある可能性。
            // そのindexの配列要素を取得。
            let node = this.entries[index];
            // 配列要素は複数の可能性
            // リンクリストをたどってキーを探す
            while (node) {
                if (node.key === key)
                    return node.value;
                // リンクリストの次のノード（リンクリスト.next）
                node = node.next;
            }
            return undefined;
        },
        put(key, value) {
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
        remove(key) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDaEQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNwQyxrQ0FBa0M7UUFDbEMsMkRBQTJEO1FBQzNELGVBQWU7UUFDZixJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxvQkFBb0I7SUFDcEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxZQUFZLENBQUMsUUFBZ0I7SUFDM0MsT0FBTztRQUNMLElBQUksRUFBRSxDQUFDLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxrQkFBa0I7UUFDaEQsR0FBRyxDQUFDLEdBQVc7WUFDYiwwQkFBMEI7WUFDMUIsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUN6QyxxQ0FBcUM7WUFDckMsbUJBQW1CO1lBQ25CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsY0FBYztZQUNkLG1CQUFtQjtZQUNuQixPQUFPLElBQUksRUFBRSxDQUFDO2dCQUNaLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHO29CQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDeEMsNEJBQTRCO2dCQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNuQixDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUVELEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBc0I7WUFDckMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9CLDJCQUEyQjtZQUMzQixPQUFPLElBQUksRUFBRSxDQUFDO2dCQUNaLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLE9BQU87Z0JBQ1QsQ0FBQztZQUNILENBQUM7WUFDRCxzQ0FBc0M7WUFDdEMsa0JBQWtCO1lBQ2xCLE1BQU0sWUFBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBVztZQUNoQixNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsZ0JBQWdCO1lBQ2hCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQzdCLDhCQUE4QjtnQkFDOUIsc0JBQXNCO2dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWixPQUFPO1lBQ1QsQ0FBQztZQUNELGtCQUFrQjtZQUNsQixPQUFPLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQzFCLGdEQUFnRDtvQkFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLE9BQU87Z0JBQ1QsQ0FBQztnQkFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNuQixDQUFDO1FBQ0gsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIn0=