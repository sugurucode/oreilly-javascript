import { log } from 'console';
function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

const wait1 = () => wait(1000);
const wait2 = () => wait(2000);

async function i4() {
  let v = 0;
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      console.log('p1 read v=', v, ', next=', next);
      await wait2();
      v = next;
      console.log('p1 write v=', v);
    }
  };
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      console.log('p2 read v=', v, ', next=', next);
      await wait2();
      v = next;
      console.log('p2 write v=', v);
    }
  };

  // [修正点]
  // Promise.all で並列実行すると競合状態が発生する
  // await Promise.all([p1(), p2()]);

  // p1() が完全に終わるのを待ってから p2() を実行する（直列実行）
  await p1();
  await p2();

  log(v); // 10 が出力される
}

i4();

// suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ npm run tsrun exercises/ch13/ex09/index.ts

// > preset-ts@1.0.0 tsrun
// > tsx exercises/ch13/ex09/index.ts

// p1 read v= 0 , next= 1
// p1 write v= 1
// p1 read v= 1 , next= 2
// p1 write v= 2
// p1 read v= 2 , next= 3
// p1 write v= 3
// p1 read v= 3 , next= 4
// p1 write v= 4
// p1 read v= 4 , next= 5
// p1 write v= 5
// p2 read v= 5 , next= 6
// p2 write v= 6
// p2 read v= 6 , next= 7
// p2 write v= 7
// p2 read v= 7 , next= 8
// p2 write v= 8
// p2 read v= 8 , next= 9
// p2 write v= 9
// p2 read v= 9 , next= 10
// p2 write v= 10
// 10
