var obj = {};
// 各プロパティに異なる属性の組み合わせを定義
Object.defineProperty(obj, 'x', {
    value: '変更できないプロパティ',
    writable: false, // 変更不可
    enumerable: true, // 列挙可能
    configurable: true, // 削除可能
});
Object.defineProperty(obj, 'y', {
    value: '列挙できないプロパティ',
    writable: true, // 変更可能
    enumerable: false, // 列挙不可
    configurable: true, // 削除可能
});
Object.defineProperty(obj, 'z', {
    value: '削除できないプロパティ',
    writable: true, // 変更可能
    enumerable: true, // 列挙可能
    configurable: false, // 削除不可
});
// プロパティの変更テスト
console.log('\n--- プロパティの変更テスト ---');
console.log('xの初期値:', obj.x);
try {
    obj.x = '変更!'; // 変更しようとするとエラーが発生するはず
    console.log('xの変更後の値:', obj.x);
}
catch (e) {
    console.log('xの変更エラー:', e.message);
}
console.log('\nyの初期値:', obj.y);
obj.y = '変更された値';
console.log('yの変更後の値:', obj.y);
// プロパティの列挙テスト
console.log('\n--- プロパティの列挙テスト ---');
console.log('Object.keys(obj)の結果:', Object.keys(obj));
console.log('for...inループの結果:');
for (var key in obj) {
    console.log(key);
}
// プロパティの確認テスト
console.log('\n--- プロパティの確認テスト ---');
console.log('hasOwnPropertyの結果:');
console.log('x:', Object.prototype.hasOwnProperty.call(obj, 'x'));
console.log('y:', Object.prototype.hasOwnProperty.call(obj, 'y'));
console.log('z:', Object.prototype.hasOwnProperty.call(obj, 'z'));
console.log('\npropertyIsEnumerable results:');
console.log('x:', Object.prototype.propertyIsEnumerable.call(obj, 'x'));
console.log('y:', Object.prototype.propertyIsEnumerable.call(obj, 'y'));
console.log('z:', Object.prototype.propertyIsEnumerable.call(obj, 'z'));
// プロパティの削除テスト
console.log('\n--- プロパティの削除テスト ---');
console.log('プロパティの削除を試みます:');
try {
    delete obj.x;
    console.log('xの削除結果:', !Object.prototype.hasOwnProperty.call(obj, 'x'));
}
catch (e) {
    if (e instanceof Error) {
        console.log('xの削除エラー:', e.message);
    }
}
try {
    delete obj.y;
    console.log('yの削除結果:', !Object.prototype.hasOwnProperty.call(obj, 'y'));
}
catch (e) {
    if (e instanceof Error) {
        console.log('yの削除エラー:', e.message);
    }
}
try {
    delete obj.z;
    console.log('zの削除結果:', !Object.prototype.hasOwnProperty.call(obj, 'z'));
}
catch (e) {
    if (e instanceof Error) {
        console.log('zの削除エラー:', e.message);
    }
}
