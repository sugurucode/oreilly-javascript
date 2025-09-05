import { sort } from './index.ts';
import { sortInsert } from './index.ts';

// chatGPT

describe('バブルソート', () => {
  it('数値配列を昇順にソートできる', () => {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    expect(sort([...arr])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it('カスタム比較関数で降順にソートできる', () => {
    const arr = [1, 5, 2, 4, 3];
    const descendingCompare = (a: number, b: number) => b - a;
    expect(sort([...arr], descendingCompare)).toEqual([5, 4, 3, 2, 1]);
  });

  it('空の配列をソートできる', () => {
    expect(sort([])).toEqual([]);
  });

  it('1要素の配列をソートできる', () => {
    expect(sort([1])).toEqual([1]);
  });

  it('同じ値を含む配列をソートできる', () => {
    const arr = [3, 1, 3, 2, 1];
    expect(sort([...arr])).toEqual([1, 1, 2, 3, 3]);
  });
});

describe('sortとsortInsertの結果比較', () => {
  it('同じ入力で同じ結果になる', () => {
    const arr = [5, 2, 9, 1, 5, 6];
    const result1 = sort([...arr]);
    const result2 = sortInsert([...arr]);
    expect(result1).toEqual(result2);
  });
});
