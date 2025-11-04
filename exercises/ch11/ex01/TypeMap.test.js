import { TypeMap } from './TypeMap';

class Foo {}
class Bar {}

describe('TypeMap', () => {
  test('set/get primitive types', () => {
    const typeMap = new TypeMap();
    typeMap.set(String, 'hello');
    typeMap.set(Number, 42);
    typeMap.set(Boolean, true);
    expect(typeMap.get(String)).toBe('hello');
    expect(typeMap.get(Number)).toBe(42);
    expect(typeMap.get(Boolean)).toBe(true);
  });

  test('set/get class instances', () => {
    const typeMap = new TypeMap();
    const foo = new Foo();
    typeMap.set(Foo, foo);
    expect(typeMap.get(Foo)).toBe(foo);
  });

  test('throw error for mismatched type', () => {
    const typeMap = new TypeMap();
    expect(() => typeMap.set(Date, 'not a date')).toThrow(
      'TypeMap: valueはkeyで指定した型のインスタンスである必要があります',
    );
    expect(() => typeMap.set(Foo, {})).toThrow(
      'TypeMap: valueはkeyで指定した型のインスタンスである必要があります',
    );
    expect(() => typeMap.set(Number, 'string')).toThrow(
      'TypeMap: valueはkeyで指定した型のインスタンスである必要があります',
    );
  });

  test('return undefined for unset type', () => {
    const typeMap = new TypeMap();
    expect(typeMap.get(Bar)).toBeUndefined();
  });
});
