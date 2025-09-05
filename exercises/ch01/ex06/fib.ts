// F0=0;
// F1=1;
// F(n+2) = Fn+F(n+1) (n>=0)
// --動かし方1(実行時トランスパイル)
// npx ts-node fib.ts
// npx tsx fib.ts
// --動かし方2(node)
// --npx tsc fib.ts  ts→js変換

// 重すぎ
export const fib1 = (n: number): number => {
  if (n == 0) {
    return 0
  } else if (n == 1) {
    return 1
  } else {
    return fib1(n - 1) + fib1(n - 2)
  }
}

export const fib2 = (n: number): number => {
  if (n === 0) return 0
  let a = 0,
    b = 1
  for (let i = 2; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}

console.log(fib2(75)) // 一瞬で終わる！
