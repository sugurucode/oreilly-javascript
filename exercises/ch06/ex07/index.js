// testが実行できない。
export function assign(target, ...sources) {
    if ((target == null) | undefined) {
        throw new TypeError('target is undefined or null');
    }
    // targetをオブジェクトに変換
    const targetObj = Object(target);
    for (const source of sources) {
        if (source == null)
            continue;
        // sourcesの中のsourceの複数プロパティキーを取得
        const keys = Object.keys(source);
        // 各キーに対して、ターゲットオブジェクトにプロパティをコピー
        for (const key of keys) {
            targetObj[key] = source[key];
        }
        // ソースオブジェクトのシンボルプロパティを取得
        const symbols = Object.getOwnPropertySymbols(source);
        for (const sym of symbols) {
            // propertyIsEnumerable:列挙可能ならtrueを返す
            // call:↑をsourceに適用
            if (Object.propertyIsEnumerable.call(source, sym)) {
                targetObj[sym] = source[sym];
            }
        }
    }
    return targetObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0FBQ2YsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPO0lBQ3ZDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDakMsTUFBTSxJQUFJLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDRCxtQkFBbUI7SUFDbkIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxNQUFNLElBQUksSUFBSTtZQUFFLFNBQVM7UUFDN0IsZ0NBQWdDO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsZ0NBQWdDO1FBQ2hDLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QseUJBQXlCO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxLQUFLLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzFCLHFDQUFxQztZQUNyQyxtQkFBbUI7WUFDbkIsSUFBSSxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==