export function equalArrays<T>(a: T[], b: T[]) {
  if (a === b) return true // ==は型変換して比較。====は型変換せずに比較。
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}
