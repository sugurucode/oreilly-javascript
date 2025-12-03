export class IgnoreAccentPattern {
  constructor(pattern) {
    // console.log(/Cafe/.source); // Cafe
    // パターンがRegExpならそのsourceを、文字列ならそのまま使う
    const src = pattern instanceof RegExp ? pattern.source : pattern;
    // ダイアクリティカルマークを除去したパターンを作る
    // normalize('NFD')でunicode正規化して分解、正規表現/[\u0300-\u036f]/gでダイアクリティカルマークを除去
    // NFCは合成正規化、NFDは分解正規化
    this.regexPattern = src.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // フラグを取得
    this.flags = pattern instanceof RegExp ? pattern.flags : '';
    // 実際に使うRegExp
    this.re = new RegExp(this.regexPattern, this.flags);
  }
  [Symbol.match](str) {
    // strを分解・除去してmatch
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .match(this.re);
  }
  [Symbol.search](str) {
    // strを分解・除去してsearch
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .search(this.re);
  }
}
