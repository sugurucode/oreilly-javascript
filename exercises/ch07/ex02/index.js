/**
 * 1からnまでの数をFizzBuzz規則に従って出力する
 * for文の代わりにArray.fromとforEachを使用
 * if文の代わりに三項演算子を使用
 */
export function fizzbuzz(n) {
    // 7.1.5 Array.fromの使い方例
    // const arr = [10, 20, 30];
    // const doubled = Array.from(arr, (value, i) => value * i);
    // 結果: [0, 20, 60]
    // 第一引数として反復可能オブジェクトか配列を指定
    // 第二引数として各要素に対する変換関数を指定 ???
    Array.from({ length: n }, (_, i) => i + 1).forEach((i) => {
        console.log(i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i);
    });
}
/**
 * 2つの配列の対応する要素の差の2乗の合計を計算
 * for文の代わりにreduceを使用して合計を計算
 * 各イテレーションで (f[i] - g[i])^2 を計算して合計に加算
 */
export function sumOfSquaredDifference(f, g) {
    return f.reduce((sum, value, i) => sum + (value - g[i]) ** 2, 0);
}
/**
 * 配列内の偶数の合計が42以上かどうかを判定
 * for文とif文の代わりにfilterとreduceを使用
 * filterで偶数のみを抽出し、reduceで合計を計算して42以上
 */
export function sumOfEvensIsLargerThan42(array) {
    return (array.filter((num) => num % 2 === 0).reduce((sum, evenNumber) => sum + evenNumber, 0) >= 42);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FBQyxDQUFTO0lBQ2hDLHdCQUF3QjtJQUN4Qiw0QkFBNEI7SUFDNUIsNERBQTREO0lBQzVELGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLENBQVcsRUFBRSxDQUFXO0lBQzdELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHdCQUF3QixDQUFDLEtBQWU7SUFDdEQsT0FBTyxDQUNMLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQzVGLENBQUM7QUFDSixDQUFDIn0=