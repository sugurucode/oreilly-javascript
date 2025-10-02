// JavaScriptオブジェクトや値をJSON形式の文字列に変換
export function stringifyJSON(json) {
  // 文字列を安全にエスケープする
  function escapeString(str) {
    // 制御文字や特殊文字をエスケープ
    function unicodeEscape(char) {
      //'A'.charCodeAt(0) → 65
      // 65..toString(16) → '41'
      const hex = char.charCodeAt(0).toString(16); // 16進数に変換
      //  \\u + ゼロ埋め + 16進数文字列 で \uXXXX 形式のエスケープ文字列を生成
      //  hex.length が 2 の場合（例: '41'）、
      // '0000'.slice(2) → '00'
      return '\\u' + '0000'.slice(hex.length) + hex;
    }
    return str.replace(/[\\"\u0000-\u001F\u2028\u2029]/g, (char) => {
      //'["A", "\\"", "\\\\", "\\/", "\\b", "\\f", "\\n", "\\r", "\\t", "Hello, world!😇\\n", "あ and \\u3042"]',
      // 絵文字などのサロゲートペアはdefault
      switch (char) {
        case '"':
          return '\\"'; // ダブルクォート
        case '\\':
          return '\\\\'; // バックスラッシュ
        case '\b':
          return '\\b'; // バックスペース
        case '\f':
          return '\\f'; // フォームフィード
        case '\n':
          return '\\n'; // 改行
        case '\r':
          return '\\r'; // 復帰
        case '\t':
          return '\\t'; // タブ
        case '\u2028':
          return '\\u2028'; // 行分離文字
        case '\u2029':
          return '\\u2029'; // 段落分離文字
        default:
          return unicodeEscape(char); // その他制御文字
      }
    });
  }

  if (json === null) {
    return 'null';
  }

  if (typeof json === 'number') {
    // JSON.stringifyはNaNやInfinityをnullに変換する
    if (isFinite(json)) {
      // 有限なら文字列に変換して返す
      return String(json);
    } else {
      return 'null';
    }
  }

  if (typeof json === 'boolean') {
    return json ? 'true' : 'false';
  }

  if (typeof json === 'string') {
    return `"${escapeString(json)}"`;
  } // 配列の場合、オブジェクトとして扱われるため、Array.isArrayで配列かどうかを判定する

  // わからないので生成しました。
  // Expected: "[\"aa\"]"
  // Received: "{\"0\":\"aa\"}" 左オブジェクトの形式になっている
  if (Array.isArray(json)) {
    // 配列の各要素を再帰的にstringifyJSONで変換し、カンマで結合して配列形式の文字列を生成
    const arrContents = json
      .map((item) => {
        // undefinedや関数はnullに変換されるが今回は未対応のためnullに変換
        if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
          return 'null';
        }
        return stringifyJSON(item);
      })
      .join(',');
    return `[${arrContents}]`;
  }

  // オブジェクトの場合
  // ここもわからず生成しました。
  if (typeof json === 'object') {
    const keys = Object.keys(json);
    const objContents = keys
      .map((key) => {
        const value = json[key];
        if (
          typeof value === 'undefined' ||
          typeof value === 'function' ||
          typeof value === 'symbol'
        ) {
          return undefined; // オブジェクトのプロパティでundefinedは除外される
        }
        return `${stringifyJSON(key)}:${stringifyJSON(value)}`;
      })
      .filter((entry) => entry !== undefined)
      .join(',');
    return `{${objContents}}`;
  }

  // その他の場合はundefinedとして扱う（stringifyJSONは呼ばれない想定）
  return undefined;
}

console.log(
  JSON.stringify(
    '["A", "\\"", "\\\\", "\\/", "\\b", "\\f", "\\n", "\\r", "\\t", "Hello, world!😇\\n", "あ and \\u3042"',
  ),
);
