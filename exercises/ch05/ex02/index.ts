// 文字列中の制御文字やエスケープ対象文字をエスケープシーケンスに変換する（if-else版）
export const escapeStringIf = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    // \\でバックスラッシュ1つ。エスケープ\+バックスラッシュ\
    if (c === '\\') {
      result += '\\\\';
    } else if (c === '\0') {
      result += '\\0';
    } else if (c === '\b') {
      result += '\\b';
    } else if (c === '\t') {
      result += '\\t';
    } else if (c === '\n') {
      result += '\\n';
    } else if (c === '\v') {
      result += '\\v';
    } else if (c === '\f') {
      result += '\\f';
    } else if (c === '\r') {
      result += '\\r';
    } else if (c === '"') {
      result += '\\"';
    } else if (c === "'") {
      result += "\\'";
    } else {
      result += c;
    }
  }
  return result;
};

// 文字列中の制御文字やエスケープ対象文字をエスケープシーケンスに変換する（switch版）
export const escapeStringSwitch = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    switch (c) {
      case '\\':
        result += '\\\\';
        break;
      case '\0':
        result += '\\0';
        break;
      case '\b':
        result += '\\b';
        break;
      case '\t':
        result += '\\t';
        break;
      case '\n':
        result += '\\n';
        break;
      case '\v':
        result += '\\v';
        break;
      case '\f':
        result += '\\f';
        break;
      case '\r':
        result += '\\r';
        break;
      case '"':
        result += '\\"';
        break;
      case "'":
        result += "\\'";
        break;
      default:
        result += c;
        break;
    }
  }
  return result;
};

const testStr = 'a\\b\nc\td"e\'f';
console.log('testStr:', testStr);
console.log('testStr.split(""):', testStr.split(''));
for (let i = 0; i < testStr.length; i++) {
  console.log(`testStr[${i}]:`, testStr[i]);
}
console.log('--- debug end ---');

console.log(escapeStringIf(testStr));

//\nなどで一文字扱い
// testStr[0]: a
// testStr[1]: \
// testStr[2]: b
// testStr[3]:

// testStr[4]: c
// testStr[5]:
// testStr[6]: d
// testStr[7]: "
// testStr[8]: e
// testStr[9]: '
// testStr[10]: f
