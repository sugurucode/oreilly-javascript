// テスト通らなかった。。。
// FAIL  exercises/ch11/ex06/index.test.js
//   isEmailAddress
//     ✕ checks if given string is e-mail address or not (13 ms)

//   ● isEmailAddress › checks if given string is e-mail address or not

//     expect(received).toBe(expected) // Object.is equality

//     Expected: true
//     Received: false

//       71 |     expect(isEmailAddress('foo@exmaple . com')).toBe(false);
//       72 |     expect(isEmailAddress('foo@あいうえお.com')).toBe(false);
//     > 73 |     expect(isEmailAddress("foo@!#$%&'*+-/=?^_`.{|}~")).toBe(true);
//          |                                                        ^
//       74 |
//       75 |     // 本来の仕様はもっと複雑で例えば以下のようなテストも必要
//       76 |     // expect(isEmailAddress(`")( <>[];:@,.."@example.com`)).toBe(true);

//       at Object.<anonymous> (exercises/ch11/ex06/index.test.js:73:56)

// Test Suites: 1 failed, 1 total
// Tests:       1 failed, 1 total
// Snapshots:   0 total
// Time:        0.146 s, estimated 1 s
// Ran all test suites matching /exercises\/ch11\/ex06\/index.test.js/i.

// test@gmail.com
// local部はtest、domain部はgmail.comで合計13文字
// index.js内に作成する関数
export function isEmailAddress(email) {
  // null, undefined, 非文字列はfalse
  if (typeof email !== 'string') return false;

  // email全体の長さ上限（RFCや実用的な制限）
  if (email.length > 320) return false;

  //  local部 と domain部 に@で分割
  const parts = email.split('@');
  // @がない場合はfalse
  if (parts.length !== 2) return false;

  const [local, domain] = parts;

  // local部は64文字以内、domain部は255文字以内
  if (local.length === 0 || local.length > 64) return false;
  if (domain.length === 0 || domain.length > 252) return false;

  // local部のチェック
  // 大小文字英数字とその他記号.
  // +で.の前後に文字が必要。かつ連続ドット、先頭と末尾ドット不可
  // (),[],:,;,@,,,
  // \-はバックスラッシュOKではなく、-のエスケープ（ハイフンは範囲指定の意味）
  // 全角なし
  const localPartPattern =
    /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/; //+(\. ドット＋許可されている一文字以上
  if (!localPartPattern.test(local)) return false;

  // domain部のチェック
  // 最初と最後のドットなし
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  // 連続ドットなし indexOfは見つる場合はその位置、見つからない場合は-1を返す
  if (domain.indexOf('..') !== -1) return false;
  // gmailとcomのようにドットで区切られた各ラベルをチェック
  const domainLabels = domain.split('.');
  // 各ラベルのチェック(.は複数考えられるのでlocal,domainとは違う分け方)
  for (const label of domainLabels) {
    if (label.length === 0) return false;
    if (!/^[A-Za-z0-9-]+$/.test(label)) return false; // 許可文字チェック
    // ※expect(isEmailAddress("foo@!#$%&'*+-/=?^_`.{|}~")).toBe(true);がとおらなかった
    if (!/^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+$/.test(label)) return false;
    if (label.startsWith('-') || label.endsWith('-')) return false;
  }

  // 日本語などの全角文字や空白はローカル・ドメイン両方とも許可しない
  if (/[^\x00-\x7F]/.test(email)) return false;
  if (/\s/.test(email)) return false;

  return true;
}
