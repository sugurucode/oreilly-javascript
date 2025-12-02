// 任意のオブジェクトのすべての独自プロパティ（protoから継承したものではない
// および列挙可能な継承プロパティのプロパティ名の配列を返す
export const getAllPropertyKeysArry = (obj) => {
    //getOwnPropertyNames(obj):objが持つ全ての文字列名のプロパティを配列で返す
    const ownNames = Object.getOwnPropertyNames(obj);
    //getOwnPropertySymbols(obj):objが持つ全てのシンボル名のプロパティを配列で返す
    const ownSymbols = Object.getOwnPropertySymbols(obj);
    const result = [...ownNames, ...ownSymbols];
    // 列挙可能な継承プロパティ（Symbolは必須でないので除外）
    for (const key in obj) {
        console.log(`key: ${key}`);
        if (!ownNames.includes(key)) {
            result.push(key);
        }
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQ0FBMEM7QUFDMUMsK0JBQStCO0FBQy9CLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLENBQUMsR0FBVyxFQUF1QixFQUFFO0lBQ3pFLG9EQUFvRDtJQUNwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsdURBQXVEO0lBQ3ZELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRCxNQUFNLE1BQU0sR0FBd0IsQ0FBQyxHQUFHLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBRWpFLGlDQUFpQztJQUNqQyxLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyJ9