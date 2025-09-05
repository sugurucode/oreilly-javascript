import { TypedMap } from './index.ts';

describe('TypedMap (composition)', () => {
  test('型が一致する場合はset/getできる', () => {
    const m = new TypedMap('string', 'number', null);
    m.set('foo', 42);
    expect(m.get('foo')).toBe(42);
  });

  test('キーの型が違う場合は例外', () => {
    const m = new TypedMap('string', 'number', null);
    expect(() => m.set(123, 42)).toThrow();
  });

  test('値の型が違う場合は例外', () => {
    const m = new TypedMap('string', 'number', null);
    expect(() => m.set('foo', 'bar')).toThrow();
  });

  test('型チェックなしの場合はどんな型でもOK', () => {
    const m = new TypedMap(undefined, undefined, null);
    m.set('foo', 1);
    m.set(123, 'bar');
    expect(m.get('foo')).toBe(1);
    expect(m.get(123)).toBe('bar');
  });
});
