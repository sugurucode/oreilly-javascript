export function* fibonacciSequence() {
    let x = 0, y = 1;
    for (;;) {
        yield y;
        [x, y] = [y, x + y]; // 分割代入を行っている。
    }
}
// const fib = fibonacciSequence();
// for (let i = 0; i < 10; i++) {
//   console.log(fib.next().value);
// }
export function fibonacciIterator() {
    // 状態変数 (x, y) をクロージャで保持
    let x = 0, y = 1;
    // イテレータオブジェクトを返す
    return {
        /**
         * [Symbol.iterator]メソッド
         * イテラブル（反復可能）にするために必要。
         */
        [Symbol.iterator]() {
            return this;
        },
        /**
         * next() メソッド
         * イテレータの本体。
         * 呼び出されるたびに次の値を生成する。
         */
        next() {
            // 1. 現在の y の値を返す値 (value) として保持
            const value = y;
            // 2. 次の状態を計算
            [x, y] = [y, x + y];
            // 3. { value, done } オブジェクトを返す
            return { value: value, done: false };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFNBQVMsQ0FBQyxDQUFDLGlCQUFpQjtJQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1AsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNSLFNBQVMsQ0FBQztRQUNSLE1BQU0sQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYztJQUNyQyxDQUFDO0FBQ0gsQ0FBQztBQUVELG1DQUFtQztBQUNuQyxpQ0FBaUM7QUFDakMsbUNBQW1DO0FBQ25DLElBQUk7QUFFSixNQUFNLFVBQVUsaUJBQWlCO0lBQy9CLHdCQUF3QjtJQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1AsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVSLGlCQUFpQjtJQUNqQixPQUFPO1FBQ0w7OztXQUdHO1FBQ0gsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2YsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILElBQUk7WUFDRixnQ0FBZ0M7WUFDaEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRWhCLGFBQWE7WUFDYixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFcEIsK0JBQStCO1lBQy9CLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==