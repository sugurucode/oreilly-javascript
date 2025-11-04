import { instanceOf } from './index.ts';

describe('instanceOf', () => {
  // 多段継承
  class A {}
  class B extends A {}
  class C extends B {}
  const c = new C();
  test('多段継承: CのインスタンスはAのインスタンスである', () => {
    expect(instanceOf(c, A)).toBe(true);
    expect(instanceOf(c, B)).toBe(true);
    expect(instanceOf(c, C)).toBe(true);
  });

  // 継承関係なし
  class X {}
  class Y {}
  const x = new X();
  test('継承関係なし: XのインスタンスはYのインスタンスではない', () => {
    expect(instanceOf(x, Y)).toBe(false);
  });

  // プリミティブ型
  test('プリミティブ型は常にfalse', () => {
    expect(instanceOf(123, Number)).toBe(false);
    expect(instanceOf('abc', String)).toBe(false);
    expect(instanceOf(null, Object)).toBe(false);
    expect(instanceOf(undefined, Object)).toBe(false);
  });
});
