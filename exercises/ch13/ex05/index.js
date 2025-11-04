function wait(duration) {
  return new Promise((resolve) => {
    // duration ミリ秒後に resolve() を呼び出す
    setTimeout(resolve, duration);
  });
}

// TODO: then のネストを無くしなさい
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
      return wait(3000);
    })
    .then(() => {
      console.log('C');
    });
}

// TODO: new Promise を使わないように書き換えなさい
export function g2() {
  // Promise チェーン自体が Promise を返すので、そのまま return する
  return wait(1000)
    .then(() => console.log('A'))
    .then(() => wait(2000))
    .then(() => console.log('B'))
    .then(() => wait(3000))
    .then(() => console.log('C'));
  // 最後の .then(resolve, reject) は、
  // new Promise のコンストラクタに渡すためにあったものなので不要
}

// (fetchUser, fetchUserFriends は省略)

// TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
export function g3() {
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
      // user と fetchUserFriends(user) の結果 (friends) を両方次に渡す
      return fetchUserFriends(user).then((friends) => {
        // [user, friends] という配列で両方の値を次の .then に渡す
        return [user, friends];
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
