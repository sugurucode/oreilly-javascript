var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 配列にはnumberしか入らないものとする。
// slice(0,-1)で最後の要素を取り除くpop、
export var pop = function (arr) { return arr.slice(0, -1); };
export var push = function (arr, num) { return __spreadArray(__spreadArray([], arr, true), [num], false); };
export var shift = function (arr) { return arr.slice(1); };
export var unshift = function (arr, num) { return __spreadArray([num], arr, true); };
export var sort = function (arr, compareFn) {
    // 新しい配列にコピーしてからソート
    var sortedArr = __spreadArray([], arr, true);
    return sortedArr.sort(compareFn);
};
var seq = [1, 2, 3, 4, 5];
console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, function (a, b) { return b - a; })); // [5, 4, 3, 2, 1]
// 元の配列は変更されていません
console.log(seq); // [1, 2, 3, 4, 5]
