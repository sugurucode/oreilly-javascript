import { parse } from 'acorn';
import { writeFileSync } from 'fs';

// JavaScript code to parse
const code1 = `let a;\na = 3;\nconsole.log(a);`;
const code2 = `let a; a = 3; console.log(a);`;
const code3 = `1+1`;


// Parse the code into AST
const ast1 = parse(code1, { ecmaVersion: 2020 });
const ast2 = parse(code2, { ecmaVersion: 2020 });
const example = parse(code3, { ecmaVersion: 2020 });

// Save ASTs as JSON files
writeFileSync('exercises-public/exercises/ch02/ex08/ast1.json', JSON.stringify(ast1, null, 2)); // `ast1`をJSON形式で保存
writeFileSync('exercises-public/exercises/ch02/ex08/ast2.json', JSON.stringify(ast2, null, 2)); // `ast2`をJSON形式で保存
writeFileSync('exercises-public/exercises/ch02/ex08/example3.json', JSON.stringify(example, null, 2)); // `ast2`をJSON形式で保存

console.log('ASTs have been generated and saved as ast1.json and ast2.json.');