export const reverse = (arr: string): string => {
  // graphemeで絵文字や複合文字も一文字として扱う
  const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'grapheme' });
  // Segmenterを使って文字列を分割
  const iterator = segmenter.segment(arr);
  // 各segmentオブジェクトから文字列を抽出
  const segments = [...iterator].map((seg) => seg.segment);
  console.log('segments:', segments); // segments: [ '𠮷', '野', '家' ]
  // 文字列を逆順にして結合
  return segments.reverse().join('');
};
