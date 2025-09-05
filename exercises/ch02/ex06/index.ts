// prettier-ignore
export const fizzbuzz = () => Array.from({ length: 100 }, (_, i) => { const num = i + 1; const fizz = num % 3 === 0 ? 'Fizz' : ''; const buzz = num % 5 === 0 ? 'Buzz' : ''; return fizz || buzz ? fizz + buzz : num; }).join('\n') + '\n';
