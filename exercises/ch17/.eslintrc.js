// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // eslint-config-prettier を最後に追加してフォーマット競合を防ぐ
  // eslint:recommended で基本的な潜在的エラーを検知します
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    /* =========================================================
        Google Style Guide 準拠
       ========================================================= */

    // 5.1.1 var declarations are not used
    // varは使用せず、ブロックスコープを持つ const か let を使用する
    'no-var': 'error',
    // 再代入されない変数はすべて const を使用する
    'prefer-const': 'error',

    // 4.1.1 Braces are used for all control structures
    // if文やループなどの制御構造では、1行であっても必ず波括弧（ブレース）を使用する
    curly: ['error', 'all'],

    // 5.2 The === and !== operators
    // 暗黙の型変換による予期せぬバグを防ぐため、厳密等価演算子（===, !==）を使用する
    eqeqeq: ['error', 'always'],

    // 5.3.3 Do not use wrapper objects for primitive types
    // プリミティブ型のラッパーオブジェクト（new String() など）は使用しない
    'no-new-wrappers': 'error',

    // 6.2.2 Camel case: defined
    // 変数名・関数名などはキャメルケース（camelCase）を使用する
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],

    // 5.5.5.1 Exception: no argument formatting
    // argumentsオブジェクトの直接使用を避け、ES6のレストパラメータ（...args）を使用する
    'prefer-rest-params': 'error',

    // 5.8.2 Exceptions
    // 例外を投げる際は、文字列や数値ではなく必ず Error オブジェクト（new Error('...')）を投げる
    'no-throw-literal': 'error',

    // 5.6.3 No line continuations
    // 文字列内でバックスラッシュ（\）を使った改行継続を使用しない
    'no-multi-str': 'error',

    // 5.8.1 For loops
    // for-inループはprototypeチェーン上のプロパティまで列挙するリスクがあるため避ける。for-of や Object.keys() を推奨
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for-in loops are discouraged. Prefer for-of or Object.keys(). (Google Style 5.8.1)',
      },
    ],

    /* =========================================================
         新しく追加したルール（Google Style Guide 準拠）
         ========================================================= */

    // 5.3.1 Array literals
    // 配列を作成する際は、コンストラクタ（new Array()）ではなくリテラル（[]）を使用する
    'no-array-constructor': 'error',

    // 5.3.2 Object literals
    // オブジェクトを作成する際は、コンストラクタ（new Object()）ではなくリテラル（{}）を使用する
    // ※ESLint v8.50.0以降は 'no-object-constructor' 推奨ですが、古いバージョン互換のため 'no-new-object' にしています
    'no-new-object': 'error',

    // 5.4.1 Arrow functions
    // コールバック関数や無名関数には、従来の function() ではなくアロー関数（=>）を使用する
    'prefer-arrow-callback': 'error',

    // 5.6.2 Template literals
    // 文字列の結合には + 演算子ではなく、テンプレートリテラル（` ${val} `）を使用する
    'prefer-template': 'error',

    // 5.8.3 Switch statements
    // switch文には、たとえ中身が空であっても必ず default 句を含める
    'default-case': 'error',

    // 5.8.5 eval()
    // セキュリティとパフォーマンスに深刻な悪影響を及ぼすため、eval() は絶対に使用しない
    'no-eval': 'error',

    // 6.2.3 Class names
    // クラス名やコンストラクタ関数（newで呼び出す関数）の命名はパスカルケース（PascalCase）にする
    'new-cap': 'error',

    // 5.5.5.2 non-standard properties
    // 非標準かつStrictモードでエラーになる arguments.caller や arguments.callee の使用を禁止する
    'no-caller': 'error',

    // 5.10.1 with()
    // スコープチェーンが混乱しバグの温床になるため、with文は使用しない
    'no-with': 'error',
  },
};
