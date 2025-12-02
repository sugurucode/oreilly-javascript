"use strict";
class Example {
    // JavaScriptの全てのオブジェクトが継承している。
    valueOf() {
        return 10;
    }
    toString() {
        return 'Hello, World!';
    }
}
// インスタンスを作成
const obj = new Example();
// valueOf()の結果を直接呼ばずに出力（暗黙の型変換を利用）
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log(obj + 1); // 11（obj.valueOf()が呼ばれる）
// toString()の結果を直接呼ばずに出力（暗黙の型変換を利用）
console.log(`${obj}`); // "Hello, World!"（obj.toString()が呼ばれる）
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxPQUFPO0lBQ1gsK0JBQStCO0lBQy9CLE9BQU87UUFDTCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQztDQUNGO0FBRUQsWUFBWTtBQUNaLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUE7QUFFekIsbUNBQW1DO0FBQ25DLDZEQUE2RDtBQUM3RCxhQUFhO0FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyx5QkFBeUI7QUFFOUMsb0NBQW9DO0FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUMsdUNBQXVDIn0=