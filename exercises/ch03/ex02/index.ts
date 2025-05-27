export {}; // モジュールスコープを有効にして、他のファイルとの変数競合を防ぐ

console.log('最大値:', Number.MAX_SAFE_INTEGER);
console.log('最小値:', Number.MIN_SAFE_INTEGER);

const maxPlusOne = Number.MAX_SAFE_INTEGER + 1;
console.log('最大値+1:', maxPlusOne);

const maxPlusTwo = Number.MAX_SAFE_INTEGER + 2;
console.log('最大値+1 === 最大値+2:', maxPlusOne === maxPlusTwo);

console.log('理由: JavaScript では安全な整数範囲を超えると精度が失われ、最大値+1 と最大値+2 が同じ値として扱われるためです。');
