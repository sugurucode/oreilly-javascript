// ビット演算のみで減算を行う関数（アロー関数バージョン）
export const sub = (a, b) => {
    let x = a;
    let y = ~b + 1; // ~bでbをビット反転。+1して２の補数
    while (y !== 0) {
        const carry = x & y; //2つの数値の各ビットを比較し、両方が1のときだけ1。
        x = x ^ y; //
        y = carry << 1;
    }
    return x;
};
// ビット演算のみで減算を行う関数（アロー関数バージョン）
export const sub = (a, b) => {
    // xにaを代入（計算のベースとなる値）
    let x = a;
    // yにbの2の補数（-b）を代入。~bでビット反転し+1することで-bを作る
    let y = ~b + 1;
    // yが0になるまでループ（加算処理を繰り返す）
    while (y !== 0) {
        // carryはxとyのビットごとのAND。繰り上がりが発生するビット位置を示す
        const carry = x & y;
        // xとyのビットごとのXOR。繰り上がりなしで加算した結果
        x = x ^ y;
        // carryを1ビット左シフト。次の桁の繰り上がりとしてyにセット
        y = carry << 1;
    }
    // 最終的な計算結果（a-b）を返す
    return x;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBVSxFQUFFO0lBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtJQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNmLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7UUFDakQsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2IsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDO0FBRUYsOEJBQThCO0FBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQVUsRUFBRTtJQUNsRCxxQkFBcUI7SUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1Ysd0NBQXdDO0lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLHlCQUF5QjtJQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNmLHlDQUF5QztRQUN6QyxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLCtCQUErQjtRQUMvQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLG1DQUFtQztRQUNuQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsbUJBQW1CO0lBQ25CLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDIn0=