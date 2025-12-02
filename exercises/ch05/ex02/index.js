// 文字列中の制御文字やエスケープ対象文字をエスケープシーケンスに変換する（if-else版）
export const escapeStringIf = (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        // \\でバックスラッシュ1つ。エスケープ\+バックスラッシュ\
        if (c === '\\') {
            result += '\\\\';
        }
        else if (c === '\0') {
            result += '\\0';
        }
        else if (c === '\b') {
            result += '\\b';
        }
        else if (c === '\t') {
            result += '\\t';
        }
        else if (c === '\n') {
            result += '\\n';
        }
        else if (c === '\v') {
            result += '\\v';
        }
        else if (c === '\f') {
            result += '\\f';
        }
        else if (c === '\r') {
            result += '\\r';
        }
        else if (c === '"') {
            result += '\\"';
        }
        else if (c === "'") {
            result += "\\'";
        }
        else {
            result += c;
        }
    }
    return result;
};
// 文字列中の制御文字やエスケープ対象文字をエスケープシーケンスに変換する（switch版）
export const escapeStringSwitch = (str) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnREFBZ0Q7QUFDaEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDcEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNmLE1BQU0sSUFBSSxNQUFNLENBQUM7UUFDbkIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDbEIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDbEIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDbEIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDbEIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDbEIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDbEIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFD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