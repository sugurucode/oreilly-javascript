import { comparisonEquality, comparisonEqualityWithEpsilon } from './index.ts'

describe('フィボナッチ関数', () => {
  it('comparisonEquality関数のテスト', () => {
    expect(comparisonEquality(0.3 - 0.2, 0.1)).toBe(false)
  })

  it('comparisonEqualityWithEpsilon', () => {
    expect(comparisonEqualityWithEpsilon(0.3 - 0.2, 0.1)).toBe(true)
  })
})
