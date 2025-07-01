import { equals } from './index.ts'

describe('equals function', () => {
  test('厳密等価ならtrue', () => {
    expect(equals({ value: 42 }, { value: 42 })).toBe(true)
    expect(equals(null, null)).toBe(true)
  })

  test('厳密等価ではない場合オブジェクト以外が指定されればfalse', () => {
    expect(equals({ x: 42 }, 42)).toBe(false)
    expect(equals(null, { x: 42 })).toBe(false)
  })

  test('プロパティの数・名前が一致しなければ false', () => {
    expect(equals({ x: 1 }, { y: 1 })).toBe(false)
    expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false)
  })

  // ここはわからなかったのでchat-gptに聞いた。どういう処理がされてる？
  test('プロパティの各値を equals で再帰的に比較', () => {
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true)
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(false)
  })
})
