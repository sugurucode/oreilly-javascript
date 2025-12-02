//1. 奇数番に string の値を受け取り偶数番に任意の値を受け取り、各偶数奇数のペアで `{奇数番の値: 偶数番の値}`の形式になるオブジェクトを返却する。例えば`sequenceToObject("a", 1, "b", 2)`は`{a: 1, b: 2}`を返却する
// 2. いずれかの奇数番の値が string でない場合、または値の個数の合計が偶数ではない場合は例外を発生させる
// { [key: string]: number }→{ key: string の形のプロパティを持ち、その値が number 型であるオブジェクト }
export const sequenceToObject = (...values) => {
    // 値の個数の合計が偶数でない
    if (values.length % 2 !== 0) {
        throw new Error('値の個数が偶数ではありません');
    }
    const result = {};
    for (let i = 0; i < values.length; i += 2) {
        const key = values[i];
        const value = values[i + 1];
        // 奇数番の値が string でない場合
        if (typeof key !== 'string') {
            throw new Error('奇数番の値が文字列ではありません');
        }
        result[key] = value;
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwySUFBMkk7QUFDM0ksMkRBQTJEO0FBQzNELCtFQUErRTtBQUMvRSxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsTUFBc0IsRUFBOEIsRUFBRTtJQUN4RixnQkFBZ0I7SUFDaEIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUErQixFQUFFLENBQUM7SUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVCLHNCQUFzQjtRQUN0QixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=