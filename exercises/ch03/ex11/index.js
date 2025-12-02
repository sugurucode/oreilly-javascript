// import lodash from "lodash"; // 修正: lodashをデフォルトインポート
// const { isEqual } = lodash;
const obj1 = { x: 1 }; //TypeScriptではasがないとできない
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;
console.log(obj1);
const obj2 = { x: 1, y: 2 };
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2); //予想：false 理由：参照を比較しているから。
// オブジェクト比較は以下のライブラリ使用
//console.log(isEqual(obj1, obj2));
// TypeScriptでは、オブジェクトのキーが文字列であることを明示的に示すために、
// []を使用してプロパティ名を指定する必要があります。
export const equals = (o1, o2) => {
    // 1.厳密等価の場合
    if (o1 === o2)
        return true;
    // 2.null またはオブジェクト以外の場合
    if (typeof o1 !== 'object' || typeof o2 !== 'object' || o1 === null || o2 === null) {
        return false;
    }
    // 3.プロパティの数と名前を比較
    const keys1 = Object.keys(o1); // プロパティ名を配列で返す
    const keys2 = Object.keys(o2);
    // プロパティの数が異なる場合は等しくない
    if (keys1.length !== keys2.length)
        return false;
    // プロパティ名が異なる場合は等しくない
    // .every()は配列内の全ての要素が指定した条件を満たす場合にtrueを返す
    // !で否定しているので、keys1の全ての要素がkeys2に含まれていない場合はfalseを返す
    if (!keys1.every((key) => keys2.includes(key)))
        return false;
    // 4.プロパティの各値を比較()
    for (const key of keys1) {
        if (!equals(o1[key], o2[key])) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSx3REFBd0Q7QUFDeEQsOEJBQThCO0FBRTlCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBK0IsQ0FBQSxDQUFDLHdCQUF3QjtBQUUzRSxnREFBZ0Q7QUFDaEQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFVixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRWpCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7QUFDM0IscUNBQXFDO0FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFBLENBQUMsMEJBQTBCO0FBRXJELHNCQUFzQjtBQUN0QixtQ0FBbUM7QUFDbkMsNkNBQTZDO0FBQzdDLDZCQUE2QjtBQUM3QixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FDcEIsRUFBOEMsRUFDOUMsRUFBOEMsRUFDckMsRUFBRTtJQUNYLFlBQVk7SUFDWixJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFMUIsd0JBQXdCO0lBQ3hCLElBQUksT0FBTyxFQUFFLEtBQUssUUFBUSxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNuRixPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFFRCxrQkFBa0I7SUFDbEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLGVBQWU7SUFDN0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUU3QixzQkFBc0I7SUFDdEIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFDL0MscUJBQXFCO0lBQ3JCLDBDQUEwQztJQUMxQyxrREFBa0Q7SUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUU1RCxrQkFBa0I7SUFDbEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQStCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBK0IsQ0FBQyxFQUFFLENBQUM7WUFDMUYsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=