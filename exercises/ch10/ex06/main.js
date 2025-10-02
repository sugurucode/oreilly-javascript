console.log('1');
import './a.js';
console.log('2');

console.log('3');
import './b.js';
console.log('4');

console.log('5');
import './a.js';
console.log('6');

//a.js loaded
// b.js loaded
// 1
// 2
// 3
// 4
// 5
// 6
