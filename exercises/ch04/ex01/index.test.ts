import { add, sub, mul, div } from './index.ts'

describe('複素数演算テスト', () => {
  it('addの通常ケース', () => {
    expect(add({ real: 1, imaginary: 2 }, { real: 3, imaginary: 4 })).toEqual({
      real: 4,
      imaginary: 6,
    })
  })
  it('addの虚部が0のケース', () => {
    expect(add({ real: 1, imaginary: 0 }, { real: 3, imaginary: 0 })).toEqual({
      real: 4,
      imaginary: 0,
    })
  })
  it('subの通常ケース', () => {
    expect(sub({ real: 5, imaginary: 6 }, { real: 3, imaginary: 4 })).toEqual({
      real: 2,
      imaginary: 2,
    })
  })
  it('subの虚部が0のケース', () => {
    expect(sub({ real: 5, imaginary: 0 }, { real: 3, imaginary: 0 })).toEqual({
      real: 2,
      imaginary: 0,
    })
  })
  it('mulの通常ケース', () => {
    expect(mul({ real: 1, imaginary: 2 }, { real: 3, imaginary: 4 })).toEqual({
      real: -5,
      imaginary: 10,
    })
  })
  it('mulの虚部が0のケース', () => {
    expect(mul({ real: 1, imaginary: 0 }, { real: 3, imaginary: 0 })).toEqual({
      real: 3,
      imaginary: 0,
    })
  })
  it('divの通常ケース', () => {
    expect(div({ real: 1, imaginary: 2 }, { real: 3, imaginary: 4 })).toEqual({
      real: 0.44,
      imaginary: 0.08,
    })
  })
  it('divの虚部が0のケース', () => {
    expect(div({ real: 1, imaginary: 0 }, { real: 3, imaginary: 0 })).toEqual({
      real: 0.33,
      imaginary: 0,
    })
  })
  it('divの0除算ケース', () => {
    expect(() => div({ real: 1, imaginary: 2 }, { real: 0, imaginary: 0 })).toThrow(
      '除算の分母が0です',
    )
  })
})
