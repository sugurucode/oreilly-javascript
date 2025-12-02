// 偶数の値を持つプロパティだけを残した新しいオブジェクトを返す関数
export const f = (obj) => {
    // object.entriesでキーとバリューの配列にする
    // object.fromEntriesで配列から新しいオブジェクトを作る。
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value % 2 === 0));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxtQ0FBbUM7QUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFvQixFQUFFO0lBQ2xELCtCQUErQjtJQUMvQix1Q0FBdUM7SUFDdkMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEYsQ0FBQyxDQUFDIn0=