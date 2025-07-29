// ビット演算のみで減算を行う関数（アロー関数バージョン）
export const sub = (a: number, b: number): number => {
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
export const sub = (a: number, b: number): number => {
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
