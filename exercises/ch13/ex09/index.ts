const log = (v) => console.log(v);
const logB = () => console.log('B');
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const wait1 = () => wait(1000); // 1秒
const wait2 = () => wait(2000); // 2秒
const wait3 = () => wait(3000); // 3秒
const errX = () => {
  throw new Error('X');
};
const errY = () => {
  throw new Error('Y');
};

async function i3() {
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return 'B';
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}
i3();
