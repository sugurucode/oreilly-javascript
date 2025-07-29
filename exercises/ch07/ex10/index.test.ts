import { describe, test, expect } from '@jest/globals';
import { DynamicSizeArray } from './index.ts';

describe('DynamicSizeArray', () => {
  test('初期状態：長さが0であること', () => {
    const array = new DynamicSizeArray();
    expect(array.length()).toBe(0);
  });

  test('push と get：要素を追加して取得できること', () => {
    const array = new DynamicSizeArray();
    array.push(1);
    array.push(2);
    array.push(3);
    expect(array.length()).toBe(3);
    expect(array.get(0)).toBe(1);
    expect(array.get(1)).toBe(2);
    expect(array.get(2)).toBe(3);
  });

  test('set と get：要素を更新して取得できること', () => {
    const array = new DynamicSizeArray();
    array.push(1);
    array.push(2);
    // 書き換える
    array.set(0, 10);
    array.set(1, 20);
    // ちゃんと書き換えられている
    expect(array.get(0)).toBe(10);
    expect(array.get(1)).toBe(20);
  });

  test('配列の自動拡張：サイズを超えたpushで配列が自動的に拡張されること', () => {
    const array = new DynamicSizeArray();
    // 初期サイズは4
    array.push(1);
    array.push(2);
    array.push(3);
    array.push(4);
    // この push で配列サイズが8に拡張される
    array.push(5);
    expect(array.length()).toBe(5);
    expect(array.get(4)).toBe(5);
  });
});
