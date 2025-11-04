// 𠮷野家の場合
var str1 = '𠮷野家';
console.log('𠮷野家[0]:', str1[0]); // サロゲートペアの前半部分
console.log('𠮷野家[1]:', str1[1]); // サロゲートペアの後半部分
console.log('𠮷野家.length:', str1.length); // 4 (サロゲートペアで1文字 + 2文字)
// 👨‍👨‍👧‍👧の場合
var str2 = '👨‍👨‍👧‍👧';
console.log('👨‍👨‍👧‍👧[0]:', str2[0]); // 絵文字の最初のコードポイント
console.log('👨‍👨‍👧‍👧.length:', str2.length); // ZWJで結合された絵文字の全長
