import greet from './module.js';
import { Human } from './util.js';

console.log(greet('太郎'));
const person = new Human('花子');
console.log(person.sayHello());
