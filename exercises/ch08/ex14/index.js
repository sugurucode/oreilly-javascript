// 高階関数：関数を引数として受け取ったり、返したりする関数
// 残余パラメータ： ...args
// 1. 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返す`any` 関数
// any関数の実装
export function any(...fns) {
    return function (arg) {
        for (const fn of fns) {
            // いずれかの関数がtrueを返せばtrueを返す
            if (fn(arg)) {
                return true;
            }
        }
        return false;
    };
}
const isNonZero = any((n) => n > 0, (n) => n < 0);
console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true
// 2.  引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返す`catching` 関数
// catching関数の実装
export function catching(tryFn, catchFn) {
    return function (arg) {
        try {
            return tryFn(arg);
        }
        catch (e) {
            return catchFn(e);
        }
    };
}
const safeJsonParse = catching(JSON.parse, (e) => {
    return { error: e.toString() };
});
console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse('{Invalid Json}')); // => {error: "SyntaxError: ..."}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0IsbUJBQW1CO0FBRW5CLHdFQUF3RTtBQUN4RSxXQUFXO0FBQ1gsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEdBQUc7SUFDeEIsT0FBTyxVQUFVLEdBQUc7UUFDbEIsS0FBSyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNyQiwwQkFBMEI7WUFDMUIsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDWixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUNuQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDYixDQUFDO0FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7QUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUV4QyxtRkFBbUY7QUFDbkYsZ0JBQWdCO0FBQ2hCLE1BQU0sVUFBVSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU87SUFDckMsT0FBTyxVQUFVLEdBQUc7UUFDbEIsSUFBSSxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztBQUNqQyxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO0FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLGlDQUFpQyJ9