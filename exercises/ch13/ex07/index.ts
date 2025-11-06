import { log } from 'console';

// async function h4() {
//   // NOTE: 2つの例外は両方 catch できるか？
//   try {
//     const p1 = wait2().then(() => {
//       errX();
//     });
//     const p2 = wait1().then(() => {
//       errY();
//     });
//     await p1;
//     await p2;
//   } catch (e) {
//     log(e.message);
//   }
// }

function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// const wait1 = () => wait(1000);
// const wait2 = () => wait(2000);

// // 例外
const errX = () => {
  throw new Error('X');
};
// const errY = () => {
//   throw new Error('Y');
// };

// h4();

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

h3();
