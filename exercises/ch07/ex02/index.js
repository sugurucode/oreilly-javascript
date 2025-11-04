"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fizzbuzz = fizzbuzz;
exports.sumOfSquaredDifference = sumOfSquaredDifference;
exports.sumOfEvensIsLargerThan42 = sumOfEvensIsLargerThan42;
/**
 * 1からnまでの数をFizzBuzz規則に従って出力する
 * for文の代わりにArray.fromとforEachを使用
 * if文の代わりに三項演算子を使用
 */
function fizzbuzz(n) {
    // 7.1.5 Array.fromの使い方例
    // const arr = [10, 20, 30];
    // const doubled = Array.from(arr, (value, i) => value * i);
    // 結果: [0, 20, 60]
    // 第一引数として反復可能オブジェクトか配列を指定
    // 第二引数として各要素に対する変換関数を指定 ???
    Array.from({ length: n }, function (_, i) { return i + 1; }).forEach(function (i) {
        console.log(i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i);
    });
}
/**
 * 2つの配列の対応する要素の差の2乗の合計を計算
 * for文の代わりにreduceを使用して合計を計算
 * 各イテレーションで (f[i] - g[i])^2 を計算して合計に加算
 */
function sumOfSquaredDifference(f, g) {
    return f.reduce(function (sum, value, i) { return sum + Math.pow((value - g[i]), 2); }, 0);
}
/**
 * 配列内の偶数の合計が42以上かどうかを判定
 * for文とif文の代わりにfilterとreduceを使用
 * filterで偶数のみを抽出し、reduceで合計を計算して42以上
 */
function sumOfEvensIsLargerThan42(array) {
    return (array.filter(function (num) { return num % 2 === 0; }).reduce(function (sum, evenNumber) { return sum + evenNumber; }, 0) >= 42);
}
