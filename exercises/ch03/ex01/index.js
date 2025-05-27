// 正負の Infinity と NaN の計算結果を確認するコード
const values = [Infinity, -Infinity, NaN];
const operators = ['+', '-', '*', '/'];

for (const a of values) {
  for (const b of values) {
    for (const op of operators) {
      let result;      
        result = eval(`${a} ${op} ${b}`);
        console.log(`${a} ${op} ${b} = ${result}`);
      } 
    }
  }