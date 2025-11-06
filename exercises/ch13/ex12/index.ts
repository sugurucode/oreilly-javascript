setTimeout(() => console.log('Hello, world!'), 1000);

async function longA() {
  let count = 0;
  while (true) {
    // 1秒ごとに 'A' を出力
    if (++count % 1000 === 0) {
      console.log('A');
    }
    await Promise.resolve({});
  }
}

async function longB() {
  let count = 0;
  while (true) {
    // 1秒ごとに 'B' を出力
    if (++count % 1000 === 0) {
      console.log('B');
    }
    await Promise.resolve({});
  }
}

longA();
longB();
