// パンの問題
console.log('NFC', '\u30D1\u30F3');
console.log('NFD', '\u30CF\u309A\u30F3');

// 以下自由に実験
console.log('NFC', '\u00e9');
console.log('NFD', 'e\u0301');

const nfc = '\u30D1\u30F3';
//const nfd = '\u30CF\u309A\u30F3';

// console.log(nfc == nfd); // -> false
console.log(nfc == nfc); // -> false
