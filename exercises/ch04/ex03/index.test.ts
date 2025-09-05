import { sub } from './index.ts'

describe('sub', () => {
  it('正の数の減算', () => {
    expect(sub(5, 3)).toBe(2)
    expect(sub(10, 4)).toBe(6)
  })

  it('負の数の減算', () => {
    expect(sub(-5, -3)).toBe(-2)
    expect(sub(-10, -4)).toBe(-6)
  })

  it('正と負の組み合わせ', () => {
    expect(sub(5, -3)).toBe(8)
    expect(sub(-5, 3)).toBe(-8)
  })

  it('ゼロの減算', () => {
    expect(sub(0, 0)).toBe(0)
    expect(sub(5, 0)).toBe(5)
    expect(sub(0, 5)).toBe(-5)
  })
})
