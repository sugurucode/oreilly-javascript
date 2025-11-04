import { sortJapanese, toJapaneseDateString } from './index.ts';

describe('sortJapanese', () => {
  it('濁点・半濁点・小文字・大文字を無視してソートできる', () => {
    const arr = [
      'は',
      'ば',
      'ぱ',
      'ハ',
      'バ',
      'パ',
      'つ',
      'っ',
      'ツ',
      'ッ',
      'あ',
      'ア',
      'い',
      'イ',
      'う',
      'ウ',
      'か',
      'が',
      'カ',
      'ガ',
      'さ',
      'ざ',
      'サ',
      'ザ',
    ];
    // localeCompare('ja-JP', {sensitivity: 'base'})でのソート結果
    const expected = arr
      .slice()
      .sort((a, b) => a.localeCompare(b, 'ja-JP', { sensitivity: 'base' }));
    const sorted = sortJapanese(arr);
    expect(sorted).toEqual(expected);
  });
});

describe('toJapaneseDateString', () => {
  it('令和の日付を正しく変換できる', () => {
    const date = new Date(2025, 9, 2); // 2025年10月2日
    expect(toJapaneseDateString(date)).toBe('令和7年10月2日');
  });
  it('平成の日付を正しく変換できる', () => {
    const date = new Date(1995, 4, 15); // 1995年5月15日
    expect(toJapaneseDateString(date)).toBe('平成7年5月15日');
  });
  it('昭和の日付を正しく変換できる', () => {
    const date = new Date(1970, 0, 1); // 1970年1月1日
    expect(toJapaneseDateString(date)).toBe('昭和45年1月1日');
  });
  it('昭和以前は空文字を返す', () => {
    const date = new Date(1920, 0, 1); // 1920年1月1日
    expect(toJapaneseDateString(date)).toBe('昭和以前は対応していません');
  });
});
