import { MyArray, MyArrayLike } from './index.js';

test('MyArray.map()', () => {
  const array = new MyArray([1, 2, 3, 4, 5]);
  // staticをつけることで、MyArrayのインスタンスからも
  // Symbol.speciesにアクセスできるようになる。
  const result = array.map((x) => x * x);
  //Symbol.speciesにMyArrayLikeが設定されているため
  expect(result instanceof MyArrayLike).toBe(true);
  expect(result.length).toBe(5);
  // Symbol.iteratorが実装されているため、Array.fromで配列に変換できる
  expect(Array.from(result)).toStrictEqual([1, 4, 9, 16, 25]);
});

test('MyArray.slice()', () => {
  const array = new MyArray(['A', 'B', 'C', 'D']);
  // Symbol.speciesにMyArrayLikeが設定されているので、sliceの結果もMyArrayLikeになる
  const result = array.slice(1, 3);

  expect(result instanceof MyArrayLike).toBe(true);
  expect(result.length).toBe(2);
  expect(Array.from(result)).toStrictEqual(['B', 'C']);
});
