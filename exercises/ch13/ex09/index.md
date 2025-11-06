## i1

```ts
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;
  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);
  log(v);
  await wait2();
  log(v);
}
```

### 予想

```
42
100
```

### 結果

```
42
100
```

### 理由

`Promise.any`は、渡した`Promise`の中で一番早く終了した結果を返す。
`wait1`が1秒で完了して42を返すので、vは42になる。この時点で`promise.any`は終了する。
しかし、スタートさせた`wait2`の方も**動き続けている**。よって、二回目の`log(v)`では100に書き変わている。

### 確認コード

```ts
const log = (v) => console.log(v);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const wait1 = () => wait(1000); // 1秒
const wait2 = () => wait(2000); // 2秒

async function i1() {
  let v = 0;
  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);
  log(v);
  await wait2();
  log(v);
}
i1();
```

---

## i2

```ts
async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return 'A';
    }),
    wait2().then(() => {
      logB();
      return 'B';
    }),
    wait1().then(() => {
      logC();
      return 'C';
    }),
  ]);
  log(v);
}
```

### 予想

```
C
B
A
[ 'C', 'B', 'A' ]
```

### 結果

```
C
B
A
[ 'A', 'B', 'C' ]
```

### 理由

`Promise.all`は、渡した`Promise`を全て同時に動かす。
`wait1`, `wait2`, `wait3`が終わるたびに`log`が呼ばれる。1秒後に「C」、2秒後に「B」、3秒後に「A」が出力される
`await Promise.all`は、全部の`Promise`が終わるまで待つ（いちばん遅い`wait3`が終わるのは3秒後）。
`v`には、`Promise.all`に**渡した配列の順番**で結果が入る。

### 確認コード

```ts
const log = (v: any) => {
  console.log(v);
};

const logA = () => console.log('A');
const logB = () => console.log('B');
const logC = () => console.log('C');

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 各待機時間用の関数
const wait1 = () => wait(1000); // 1秒
const wait2 = () => wait(2000); // 2秒
const wait3 = () => wait(3000); // 3秒

async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return 'A';
    }),
    wait2().then(() => {
      logB();
      return 'B';
    }),
    wait1().then(() => {
      logC();
      return 'C';
    }),
  ]);
  log(v);
}

i2();
```

---

## i3

```ts
async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
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
```

### 予想

```
Y
42
0
```

### 結果

```
Y
B
42
0
```

### 理由

`Promise.all`は、どれか1つでも失敗すると即座にエラー。
`wait1`が1秒で失敗するから、`catch`に入って`Y`が出力。
この時点でwait3はまだ終了しておらず、vは42のまま。
`Promise.all`が失敗しても、他の`Promise`は止まらないから、2秒後に`B`が出て、3秒後に`v`が`0`になる。

### 確認コード

```ts
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
```

---

## i4

```ts
async function i4() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };
  await Promise.all([p1(), p2()]);
  log(v);
}
```

### 予想

わからなかった。

```

```

### 結果

```
5
```

### 理由

競合状態とは、複数の非同期処理が同じ変数に同時アクセスし、値の読み取りと書き込みが重なる現象。
`p1`と`p2`が同時に`v`を読んで同じ値を書き込むため、インクリメントが失われる。
`v`の更新が期待より少なくなり、最終的に5回しか増えない。

### 確認コード

```ts
const log = (v) => console.log(v);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const wait1 = () => wait(1000); // 1秒
const wait2 = () => wait(2000); // 2秒

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
  await Promise.all([p1(), p2()]);
  log(v);
}
i4();
```

### 修正コード (v が 10 になる)

```ts
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
```
