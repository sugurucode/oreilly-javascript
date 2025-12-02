class IgnoreAccentPattern {
  constructor(pattern) {
    // パターンがRegExpならそのsourceを、文字列ならそのまま使う
    const src = pattern instanceof RegExp ? pattern.source : pattern;
    // ダイアクリティカルマークを除去したパターンを作る
    this.pattern = src.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // フラグを取得
    this.flags = pattern instanceof RegExp ? pattern.flags : '';
    // 実際に使うRegExp
    this.re = new RegExp(this.pattern, this.flags);
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

export { IgnoreAccentPattern };
