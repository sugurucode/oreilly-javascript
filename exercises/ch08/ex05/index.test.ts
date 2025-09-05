import { sequenceToObject } from './index.ts';

describe('sequenceToObject', () => {
  it('ペアでオブジェクトを返す（数値）', () => {
    expect(sequenceToObject('a', 1, 'b', 2)).toEqual({ a: 1, b: 2 });
  });

  it('ペアでオブジェクトを返す（文字列）', () => {
    expect(sequenceToObject('x', 'foo', 'y', 'bar')).toEqual({ x: 'foo', y: 'bar' });
  });

  it('ペアでオブジェクトを返す（混在）', () => {
    expect(sequenceToObject('k', 100, 'v', 'value')).toEqual({ k: 100, v: 'value' });
  });

  it('奇数番がstringでない場合は例外', () => {
    expect(() => sequenceToObject(1, 2)).toThrow('奇数番の値が文字列ではありません');
  });

  it('値の個数が偶数でない場合は例外', () => {
    expect(() => sequenceToObject('a', 1, 'b')).toThrow('値の個数が偶数ではありません');
  });

  it('スプレッド演算子で配列を渡しても動作する', () => {
    const arr = ['x', 'foo', 'y', 20];
    expect(sequenceToObject(...arr)).toEqual({ x: 'foo', y: 20 });
  });
});
