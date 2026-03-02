setInterval(() => {
  console.log('child processing...');
  // 0<= Math.random() < 1
  if (Math.random() < 1 / 3) {
    console.log('An error occurred. Exiting...');
    // 引数1は異常終了を意味するコード
    process.exit(1);
  }
}, 100);
