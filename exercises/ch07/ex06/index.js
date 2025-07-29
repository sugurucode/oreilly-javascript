var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var data = [
    { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 },
    { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
    { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
    { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
    { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
    { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
    { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
    { name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30 },
    { name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90 },
];
// ソート用の比較関数
function compareStudents(a, b) {
    if (b.math !== a.math)
        return b.math - a.math;
    if (b.chemistry !== a.chemistry)
        return b.chemistry - a.chemistry;
    return b.geography - a.geography;
}
var sortStudents = function (arr) {
    return __spreadArray([], arr, true).sort(compareStudents);
};
var sorted = sortStudents(data);
console.log(sorted);
