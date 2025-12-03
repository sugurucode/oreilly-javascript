// hiragana.js

export class Hiragana {
  constructor(char) {
    this.char = char; // ひらがなそのもの
    //
    this.code = char.charCodeAt(0); // UTF-16 コード単位 (数字)
  }

  [Symbol.toPrimitive](hint) {
    // 1. 数字が期待される場合 (例: < > での比較、引き算など)
    // UTF-16コード(数字)を返します
    if (hint === 'number') {
      return this.code;
    }

    // 2. 文字列が期待される場合 (例: テンプレートリテラル、String()など)
    // ひらがな(文字)を返します
    if (hint === 'string') {
      return this.char;
    }

    // 3. どちらでもない場合 (例: + 演算子での結合など)
    // 要件通り、ひらがな(文字)を返します
    return this.char;
  }
}
