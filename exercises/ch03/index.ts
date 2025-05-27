// JavaScript の整数の最大値と最小値をコンソールに出力
console.log('最大値:', Number.MAX_SAFE_INTEGER);
console.log('最小値:', Number.MIN_SAFE_INTEGER);

// 最大値+1 をコンソールに出力
const maxPlusOne = Number.MAX_SAFE_INTEGER + 1;
console.log('最大値+1:', maxPlusOne);

// 最大値+1 と最大値+2 を比較
const maxPlusTwo = Number.MAX_SAFE_INTEGER + 2;
console.log('最大値+1 === 最大値+2:', maxPlusOne === maxPlusTwo);

// 理由を出力
console.log('JavaScriptでは安全な整数範囲を超えると精度が失われる。最大値+1 と最大値+2 が同じ値として扱われる。');