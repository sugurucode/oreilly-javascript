import { equalArrays } from './index.ts'

test('ch03-ex07', () => {
  // objectは値では比較しない。参照で比較する。p47
  const x = [1, 2] // ここを変更
  // インデックス0が1、インデックス1が2の長さ2の配列風オブジェクト
  const y = { 0: 1, 1: 2, length: 2 } as unknown as number[] // ここを変更
  console.log(x[0]) // 1
  console.log(y[0]) // 1

  expect(equalArrays(x, y)).toBe(true) // 等価性が満たされる
  expect(x).not.toEqual(y) // 型が異なるため、配列としては等価ではない
})
