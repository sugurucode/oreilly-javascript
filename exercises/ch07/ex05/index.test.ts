import { describe, it, expect } from '@jest/globals';
import { pop, push, shift, unshift, sort } from './index.ts';

// 問題にあるパターン＋元の配列は変更されていないかをテスト

describe('配列操作関数', () => {
  const arr = [1, 2, 3, 4, 5];

  it('pop: 最後の要素を除く', () => {
    expect(pop(arr)).toEqual([1, 2, 3, 4]);
    expect(arr).toEqual([1, 2, 3, 4, 5]); // 非破壊的
  });

  it('push: 要素を末尾に追加', () => {
    expect(push(arr, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('shift: 先頭要素を除く', () => {
    expect(shift(arr)).toEqual([2, 3, 4, 5]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('unshift: 先頭に要素を追加', () => {
    expect(unshift(arr, 0)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('sort: 昇順・降順ソート', () => {
    expect(sort(arr)).toEqual([1, 2, 3, 4, 5]);
    expect(sort(arr, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});
