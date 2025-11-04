import { primes } from './index.ts';

describe('primes (素数ジェネレータ)', () => {
  let primeGen;

  // 各テスト ('test(...)') の実行前に、
  // ジェネレータを新しく初期化する
  beforeEach(() => {
    primeGen = primes();
  });

  test('最初の素数が 2 であること', () => {
    expect(primeGen.next().value).toBe(2);
  });

  test('最初の6つの素数 (2, 3, 5, 7, 11, 13) を順番通りに生成すること', () => {
    const expectedPrimes = [2, 3, 5, 7, 11, 13];
    const generatedPrimes = [];
    for (let i = 0; i < expectedPrimes.length; i++) {
      generatedPrimes.push(primeGen.next().value);
    }
    expect(generatedPrimes).toEqual(expectedPrimes);
  });

  test('next() を連続で呼び出したときに正しい順序で素数を返すこと', () => {
    expect(primeGen.next().value).toBe(2); // 1番目
    expect(primeGen.next().value).toBe(3); // 2番目
    expect(primeGen.next().value).toBe(5); // 3番目
  });

  test('10番目の素数が 29 であること', () => {
    let prime = 0;
    // 10回ループを回す
    for (let i = 1; i <= 10; i++) {
      prime = primeGen.next().value;
    }
    // 10回目の .next() の値が 29 であることを確認
    expect(prime).toBe(29);
  });
});
