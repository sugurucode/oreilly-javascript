function makeFixedSizeArray(size) {
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
    len; // 実際に格納されている要素数
    array;
    constructor() {
        this.len = 0;
        this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
    }
    get(index) {
        return this.array.get(index);
    }
    set(index, value) {
        this.array.set(index, value);
    }
    length() {
        return this.len;
    }
    push(value) {
        // this.arrayに空きがない場合は「再配置」を行う
        // 実際の要素数が現在の配列の長さ以上になった場合
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxTQUFTLGtCQUFrQixDQUFDLElBQVk7SUFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsT0FBTztRQUNMLEdBQUcsQ0FBQyxLQUFLO1lBQ1AsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUNELEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSztZQUNkLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNELE1BQU07WUFDSixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdEIsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVE7SUFDekIsR0FBRyxDQUFTLENBQUMsZ0JBQWdCO0lBQzdCLEtBQUssQ0FBaUI7SUFFOUI7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNELEdBQUcsQ0FBQyxLQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsR0FBRyxDQUFDLEtBQWEsRUFBRSxLQUFhO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBQ0QsSUFBSSxDQUFDLEtBQWE7UUFDaEIsOEJBQThCO1FBQzlCLDBCQUEwQjtRQUMxQixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1lBQ3BDLGNBQWM7WUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRCx5QkFBeUI7WUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDSCxDQUFDO1FBQ0QsYUFBYTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsaUJBQWlCO0lBQy9CLENBQUMifQ==