function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// TODO: then のネストを無くしなさい
// コールバック地獄を避けることができる
export function g1() {
  return wait(1000)
    .then(() => {
      console.log('A');
      // 次の非同期処理 (Promise) を return すると、
      // 次の .then はその完了を待つ
      return wait(2000);
    })
    .then(() => {
      console.log('B');
      // 同様に次の非同期処理を return する
      return wait(3000);
    })
    .then(() => {
      console.log('C');
    });
}

// TODO: new Promise を使わないように書き換えなさい
export function g2() {
  // Promise チェーン自体がPromiseを返すので、new Promise は不要
  return wait(1000)
    .then(() => console.log('A'))
    .then(() => wait(2000))
    .then(() => console.log('B'))
    .then(() => wait(3000))
    .then(() => console.log('C'));
  // 最後の .then(resolve, reject) は、
  // new Promise のコンストラクタに渡すためにあったものなので不要
}

// Primiseチェーンはデータを次に渡すこともできる
export function g3() {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser() {
    return Promise.resolve({ id: 42, name: 'John' });
  }
  function fetchUserFriends(user) {
    return Promise.resolve([
      { name: 'Sam', id: 100 },
      { name: 'Bob', id: 1 },
    ]);
  }

  return fetchUser()
    .then((user) => {
      // userにはfetchUser()の結果が入る
      // user と fetchUserFriends(user) の結果 (friends) を両方次に渡す
      return fetchUserFriends(user).then((friends) => {
        // friendsにはfetchUserFriends(user)の結果が入る
        // [user, friends] という配列で両方の値を次の .then に渡す
        return [user, friends]; // 配列を返す
      });
    })
    .then(([user, friends]) => {
      // 配列の分割代入で user と friends を受け取る
      console.log(`${user.name} has ${friends.length} friends!`);
    });
}

// TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
export function g4() {
  function someFunction() {
    return 42;
  }
  // NOTE: (中略)

  // 同期的な値を Promise に変換するには Promise.resolve() を使う
  return Promise.resolve(someFunction());
}
