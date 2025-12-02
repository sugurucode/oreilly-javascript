// 1. 自然数`n`と英数文字`c`を引数にとり、文字`c`を`n`回コンソール出力してから文字`c`を`n`個含む配列を返す
// 引数が複数必要な場合は、引数を囲む（）が必要。
export const stringDisplay = (n, c) => {
    for (let i = 0; i < n; i++) {
        console.log(c);
    }
    // 複数の文があるため、関数本体を中括弧{}で囲み、明示的なreturnキーワードが必要s
    return Array(n).fill(c); // fill(c)で配列をcで埋める
};
// 2. 数値`x`を引数にとり、`x`の二乗の数値を返す
// 引数が1つだけの場合は、引数を囲む（）は不要。
export const square = (x) => x * x;
// 関数本体が1つの式だけの場合は、中括弧{}を省略でき、returnキーワードも不要。
//3. 引数なしで、現在時刻のプロパティ`now`を含むオブジェクトを返す
// 引数はないが、空の（）が必要。
export const getCurrentTime = () => ({ now: new Date() });
// 関数本体が1つの式だけの場合は、中括弧{}を省略でき、returnキーワードも不要。
// オブジェクトリテラルを返す場合は、オブジェクト全体を括弧()で囲む必要がある。
// 囲まないと、中括弧{}が関数本体の始まりと解釈されてしまう。
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsMEJBQTBCO0FBQzFCLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQWlCLEVBQUU7SUFDbkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNELDhDQUE4QztJQUM5QyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7QUFDOUMsQ0FBQyxDQUFDO0FBRUYsOEJBQThCO0FBQzlCLDBCQUEwQjtBQUMxQixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsNkNBQTZDO0FBRTdDLHNDQUFzQztBQUN0QyxrQkFBa0I7QUFDbEIsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQsNkNBQTZDO0FBQzdDLDBDQUEwQztBQUMxQyxpQ0FBaUMifQ==