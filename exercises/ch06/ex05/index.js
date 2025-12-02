"use strict";
// プロトタイプとなるオブジェクトを作成
const proto = {
    // プロパティ名が数値のプロパティ
    1: 'number1',
    2: 'number2',
    // プロパティ名が文字列のプロパティ
    str: 'string',
    // 列挙可能なプロパティ（中括弧でオブジェクト作成（オブジェクトリテラル）したらデフォで列挙可能）
    enum: { a: 'enum1', b: 'enum2' },
};
const newObj = Object.create(proto, {
    // プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
    1: { value: 'newNumber1', enumerable: true },
    // プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
    3: { value: 'newNumber3', enumerable: true },
    // プロパティ名が文字列かつプロトタイプの文字列プロパティと同名のプロパティ
    str: { value: 'newString', enumerable: true },
    // プロパティ名が文字列かつプロトタイプの文字列プロパティと同名でないプロパティ
    newStr: { value: 'newString2', enumerable: true },
    // 列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ
    enum: { value: { c: 'enum3', d: 'enum4' }, enumerable: false },
});
// for inループで確認keyとvalueを出力
for (const key in newObj) {
    console.log(`${key}: ${newObj[key]}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXFCO0FBQ3JCLE1BQU0sS0FBSyxHQUFHO0lBQ1osa0JBQWtCO0lBQ2xCLENBQUMsRUFBRSxTQUFTO0lBQ1osQ0FBQyxFQUFFLFNBQVM7SUFDWixtQkFBbUI7SUFDbkIsR0FBRyxFQUFFLFFBQVE7SUFDYixrREFBa0Q7SUFDbEQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFO0NBQ2pDLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtJQUNsQyxxQ0FBcUM7SUFDckMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0lBQzVDLHVDQUF1QztJQUN2QyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7SUFDNUMsdUNBQXVDO0lBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtJQUM3Qyx5Q0FBeUM7SUFDekMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0lBQ2pELGtDQUFrQztJQUNsQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO0NBQy9ELENBQUMsQ0FBQztBQUVILDJCQUEyQjtBQUMzQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QyxDQUFDIn0=