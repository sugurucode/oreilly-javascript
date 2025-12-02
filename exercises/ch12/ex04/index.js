/**
 * P363 の filter 関数（ヒント）
 * iterable をフィルタし、predicate が true の要素のみを反復する
 */
// const plus2 = n => n + 2;
// console.log(plus2(3)); // 5
// 使用例: filter([1, 2, 3, 4, 5], n => n % 2 === 0) は 2, 4 を生成
// 反復可能オブジェクトを渡すと、predicate に合致する要素のみを返す
function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            for (;;) {
                let v = iterator.next();
                // 終了状態 (done: true) または predicate が true の場合に返す
                //predicateは関数
                if (v.done || predicate(v.value)) {
                    return v;
                }
                // predicate が false だったら、次の要素に進む (for(;;) ループ)
            }
        },
    };
}
/**
 * n から始まる無限の整数列を生成するジェネレータ
 * (例: 2, 3, 4, 5, ...)
 */
function* integersFrom(n) {
    while (true) {
        yield n++;
    }
}
export function* primes() {
    // 2から始まる無限の整数列を取得
    let numbers = integersFrom(2); // [2, 3, 4, 5, ...]
    // 無限ループで素数をふるい落とし続ける
    while (true) {
        let p = numbers.next().value;
        // 素数は割り切れても自分自身だけなので、最初に得られる数字は常に素数
        yield p; //{value: p, done: false};
        // ある数字nが、それより小さい素数で割り切れない場合、nは素数である。
        // したがって素数pで割り切れる数を取り除く。(再起)
        // numbersからpで割り切れる数を除外した新しいイテレータに置き換える（filter関数を使用）。
        numbers = filter(numbers, (n) => n % p !== 0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCw0QkFBNEI7QUFDNUIsOEJBQThCO0FBRTlCLDREQUE0RDtBQUM1RCx3Q0FBd0M7QUFDeEMsU0FBUyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVM7SUFDakMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQzNDLE9BQU87UUFDTCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDZixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJO1lBQ0YsU0FBUyxDQUFDO2dCQUNSLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsZ0RBQWdEO2dCQUNoRCxjQUFjO2dCQUNkLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ2pDLE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBQ0QsK0NBQStDO1lBQ2pELENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0QixPQUFPLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7QUFDSCxDQUFDO0FBQ0QsTUFBTSxTQUFTLENBQUMsQ0FBQyxNQUFNO0lBQ3JCLGtCQUFrQjtJQUNsQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7SUFFbkQscUJBQXFCO0lBQ3JCLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQzdCLG9DQUFvQztRQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtRQUVuQyxxQ0FBcUM7UUFDckMsNEJBQTRCO1FBQzVCLHFEQUFxRDtRQUNyRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0FBQ0gsQ0FBQyJ9