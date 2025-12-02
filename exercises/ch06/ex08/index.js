export function restrict(target, template) {
    // target の独自プロパティ名を取得
    const targetKeys = Object.keys(target);
    // template の独自プロパティ名をセットに変換
    const templateKey = Object.keys(template);
    // target の各独自プロパティ名を反復処理します。
    for (const key of targetKeys) {
        // templateKeyの中にkeyが含まれていない場合、targetからkeyを削除。
        if (!templateKey.includes(key)) {
            delete target[key];
        }
    }
    return target;
}
export function substract(target, ...sources) {
    // targetの独自プロパティ名を取得
    const targetKeys = Object.keys(target);
    // sourcesの独自プロパティ名を全て配列にまとめる
    const sourceKeys = [];
    for (const source of sources) {
        sourceKeys.push(...Object.keys(source));
    }
    // targetの各独自プロパティ名がsourcesにあれば削除
    for (const key of targetKeys) {
        if (sourceKeys.includes(key)) {
            delete target[key];
        }
    }
    return target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRO0lBQ3ZDLHNCQUFzQjtJQUN0QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLDRCQUE0QjtJQUM1QixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTFDLDZCQUE2QjtJQUM3QixLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzdCLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQy9CLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTztJQUMxQyxxQkFBcUI7SUFDckIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV2Qyw2QkFBNkI7SUFDN0IsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBQ2hDLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7UUFDN0IsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLEtBQUssTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDN0IsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIn0=