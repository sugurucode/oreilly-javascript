module.exports = {
  // 4.3.1 Column limit: 80
  // 1行の文字数は80文字を上限とする
  printWidth: 80,

  // 4.2 Block indentation: +2 spaces
  // インデントは2スペースを使用する
  tabWidth: 2,
  useTabs: false,

  // 3.2.1 Semicolons are required
  // 文末のセミコロンは必須とする
  semi: true,

  // 5.1.2 Strings
  // 文字列はダブルクォートよりシングルクォートを優先する
  singleQuote: true,

  // 5.2.1 Array literals / 5.3.1 Object literals
  // 複数行にまたがる配列・オブジェクトの末尾のカンマは必須（バージョン管理の差分を綺麗にするため）
  trailingComma: 'all',

  // 4.6.2 Horizontal whitespace
  // オブジェクトリテラルの括弧内のスペース。
  // Googleスタイルでは { a: 1 } のような余白が一般的によく使われるため true を推奨しますが、
  // 厳密な規定はないため、プロジェクトの好みに合わせて false にしても問題ありません。
  bracketSpacing: true,

  // 【修正】5.4.1 Arrow functions
  // Googleスタイルでは「引数が1つの場合でも必ず括弧をつける」と規定されています。
  // 誤: 'avoid' -> 正: 'always'
  arrowParens: 'always',

  /* =========================================================
     新しく追加したルール（Google Style Guide 準拠）
     ========================================================= */

  // 5.3.3 Quoted property names
  // オブジェクトのプロパティ名は、無効な識別子（ハイフンを含むなど）でない限りクォートで囲まない
  quoteProps: 'as-needed',

  // 4.1.2 Blocks and loop formatting
  // 複数行のHTML/JSX要素や関数の閉じ括弧（> など）を、最後の行の末尾に置くのではなく単独の行に配置する
  // （Prettierのデフォルトですが、明示的に設定することでGoogleのブロックスタイルに合わせます）
  bracketSameLine: false,

  // 2.1 File encoding
  // ファイルの文字コードはUTF-8とし、改行コードはLFとする（Unix系の標準に合わせる）
  endOfLine: 'lf',
};
