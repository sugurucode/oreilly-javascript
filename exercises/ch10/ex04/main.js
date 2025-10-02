import { sum, Rectangle } from './reexport.js';

console.log(sum(3, 5)); // 8

const rect = new Rectangle(4, 6);
console.log(rect.area()); // 24
