// ダミーデータを返す getData 関数を定義
function getData() {
  // 一次元配列のサンプルデータ
  return [1, 2, 3, 'a', 5, 6, 7, 8, 9];
}

// ラベル文バージョン
let arr1 = getData();
let sum1 = 0,
  success1 = false;

computeSum: if (arr1) {
  for (let i = 0; i < arr1.length; i++) {
    let cell = arr1[i];
    if (isNaN(cell)) break computeSum;
    sum1 += cell;
  }
  success1 = true;
  console.log('[ラベル文] 合計:', sum1);
  console.log('[ラベル文] 成功:', success1);
}
// break文はここにジャンプする。success == false という状態でここにたどりついたら、
// 行列中に何か問題が生じたということ。
console.log('エラー', success1); // false

//-------------------------------------------------------------------------------------------------------------
// 関数バージョン
const validateAndSumArray = (arr: number[]): { sum: number; success: boolean } => {
  let sum = 0;
  if (!arr) return { sum, success: false };
  for (let i = 0; i < arr.length; i++) {
    let cell = arr[i];
    if (isNaN(cell)) return { sum, success: false };
    sum += cell;
  }
  return { sum, success: true };
};

let arr2 = getData();
const { sum: sum2, success: success2 } = validateAndSumArray(arr2);
console.log('[関数] 合計:', sum2);
console.log('[関数] 成功:', success2);

// break 文はここにジャンプする。success == false という状態でここにたどりついたら、
// 行列中に何か問題が生じたということ。
// false でなければ、変数sumには、行列中のすべてのセルの合計値が含まれている。

// ラベルの例
// ラベル文を使って、エラーが発生したときに文を抜け出せるようにする。
