// ビット演算のみで減算を行う関数（アロー関数バージョン）
export const sub = (a: number, b: number): number => {
  let x = a
  let y = ~b + 1 // ~bでbをビット反転。+1して２の補数
  while (y !== 0) {
    const carry = x & y
    x = x ^ y
    y = carry << 1
  }
  return x
}
