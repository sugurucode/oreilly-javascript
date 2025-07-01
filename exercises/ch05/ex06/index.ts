// ...existing code...
// try-catch-finally の実行順序が確認できるサンプル
const showTryCatchFinallyOrder = () => {
  console.log('1:tryの上');
  try {
    console.log('2:tryブロックの中');
    throw new Error('エラーが発生しました');
  } catch (e) {
    console.log('3:catchブロック');
  } finally {
    console.log('4:finallyブロック');
  }
  console.log('5: try-catch-finallyの外');
};

showTryCatchFinallyOrder();
