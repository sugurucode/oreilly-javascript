# 練習問題: 11 章

## 問題 11.1 💻🧪

以下のような動作を実現する、 `TypeMap` クラスを作成しなさい。

```js
class Foo {}

const typeMap = new TypeMap()
typeMap.set(String, 'string')
typeMap.set(Number, 123)
typeMap.set(Foo, new Foo())
typeMap.set(Date, 'not a date') // -> Error

typeMap.get(String) // -> "string"
typeMap.get(Number) // -> 123
```

- `Map` と同様のインタフェース(`get`, `set`)を持つ。ただし、`key` はコンストラクタ関数に限定する
- `set` では、 コンストラクタ関数の `key` と そのクラスの `value` のみ受け付け、それ以外の値が渡された場合はエラーとする。これにより、`get` で取得する値が `key` に指定したコンストラクタ関数のクラスであることを保証する。
  - TypeScriptの場合はそのような `key`, `value` の型定義とする
- プリミティブ値は、ラッパークラスのコンストラクタ関数で `get`/`set` 可能とする

**出題範囲**: 11.1

## 問題 11.2 💻🧪

オブジェクトを1つ引数に取り、何らかの時間のかかる計算を行い、与えられた引数に対して一意な結果を返す関数`slowFn`を考える。`slowFn`の計算結果をキャッシュし、同じ引数で繰り返し呼び出された時にはキャッシュを返す関数`cachedSlowFn`を生成する関数`cache`を実装しなさい。ただし`slowFn`の引数のオブジェクトが到達不能になった場合には、キャッシュがガベージコレクションの対象になるように実装しなさい。また`slowFn`は任意の実装で良い。

```js
// f はオブジェクトを1つ引数に取る関数
function cache(f) {
  // この関数を実装する
}

function slowFn(obj) {
  // 時間のかかる処理
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn)
```

**出題範囲**: 11.1

## 問題 11.3 💻🧪

引数として与えられる 符号なし 32 ビット整数の配列(Uint32Array) を受け取り、変換して符号なし 32 ビット整数の配列(Uint32Array) を返す次の二つの関数を実装しなさい。

- リトルエンディアンのバイト列として引数のデータを読み込み、ビッグエンディアンのバイト列に変換して返す関数
- ビッグエンディアンのバイト列として引数のデータを読み込み、リトルエンディアンのバイト列に変換して返す関数

**出題範囲**: 11.2

## 問題 11.4 🖋️💻

ch11/ex04/index.js の実装を完成させ型付き配列と通常の配列で行列の乗算の速度を比較してみなさい。また実行する前にどのような結果になるか予測しなさい。

**注意:** 問題 11.11 でも示すようにベンチマークの測定は難しい。ここでは学習のため一から実装しているが、実際にベンチマークを行う場合は専用のライブラリを利用すること。

**出題範囲**: 11.2

## 問題 11.5 💻📄

バイナリデータの先頭数バイト (マジックバイト) を確認することでファイル種別を推測できる。
例えば PDF ファイルの場合、ファイルの先頭は `25 50 44 46 2D` といったバイト列になっている ([参考](https://en.wikipedia.org/wiki/List_of_file_signatures))。この知識があれば拡張子に頼らずにファイル種別を推測できる。

与えられたバイト列に対し、そのバイナリデータのファイル種別を返す関数 `detectFileType` を書きなさい。
考えられる全てのファイル種別に対応することは現実的ではないため、与えられたテストコードに対して動作する関数を書けば十分とする。

**注意**: マジックバイトを信用しすぎることで思わぬ結果になることもあるため注意 (参考: [ 画像ファイルによるクロスサイト・スクリプティング(XSS)傾向と対策](https://blog.tokumaru.org/2007/12/image-xss-summary.html))

**出題範囲**: 11.2

## 問題 11.6 💻📄

与えられた文字列がメールアドレスであるかチェックする関数`isEmailAddress`を実装しなさい。ただしRFC5322に準拠したメールアドレスの判定は難しいので、与えられたテストコードが通ればよいものとする。

**出題範囲**: 11.3

## 問題 11.7 🖋️

括弧の対応が正しい文字列かどうか判定する正規表現は書けるだろうか。
連続する 2 文字が `()` である箇所を除去する操作を 0 回以上繰り返して空文字列にできるとき、その文字列は括弧の対応が取れているものとする。

以下の文字列に対してはマッチする:

- `"(()(()))"`
- `"(((())))"`

以下の文字列に対してはマッチしない:

- `"((())"`
- `"()()())"`

任意の長さの文字列に対して上記の判定を行う正規表現を書きなさい (書けない場合はその理由を調べて記述しなさい)。

**出題範囲**: 11.3

## 問題 11.8 🖋️

正規表現の処理には予想以上に時間がかかる可能性がある。

例えば利用者によって `^(a|aa)+$` といった文字列が入力されたと考えよう。
この正規表現が `"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"` といった文字列にマッチするか調べようとするとどうなるだろうか。

**出題範囲**: 11.3

## 問題 11.9 💪💻📄

正規表現は魔法ではない。簡単な正規表現のエンジンを書いてみよう。ch11/ex09/index.js を完成させなさい。
ここでは `/([Jj]ava([Ss]cript)?) is fun/` という正規表現を以下のような JavaScript の式で表現するものとする:

```js
const p = seq(
  seq(charFrom('Jj'), quote('ava'), repeat(seq(charFrom('Ss'), quote('cript')), 0, 1)),
  quote(' is fun'),
)
```

**出題範囲**: 11.3

## 問題 11.10 💻🧪

次の関数を実装しなさい。

- 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
- 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
- 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
- ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。

**出題範囲**: 11.4

## 問題 11.11 🖋️

`performance.now` を使ってプログラムの処理時間を測定してみよう。
ch11/ex11/index.js は `"Hello".length` にどれだけの時間がかかるか測定しようと実装したコードである。

コードを実行すると以下の事実に気付くだろう:

- costOfLength が負の値を返すことがある (`"Hello".length` を実行すると時が巻き戻るのだろうか?)
- costOfLength の引数の値を大きくすれば大きくする程結果が小さくなる (`"Hello".length` を実行すればする程速くなるのだろうか?)

どうやら何かがおかしい。どうしてこのような結果になるか調べて説明しなさい。

**出典**: [microbenchmarks fairy tale](https://mrale.ph/blog/2012/12/15/microbenchmarks-fairy-tale.html)

**出題範囲**: 11.4

## 問題 11.12 💻

テキストでは独自のエラーとして ParseError や HTTPError クラスの例がありました。自分でも独自のエラーを実装しなさい。

エラーの例が思いつかない場合には、ファイルのパスを引数に受けとる関数で、ファイルのサイズが許容サイズをオーバーしている場合に投げるエラーを実装しなさい。

**出題範囲**: 11.5

## 問題 11.13 💪💻📄

`JSON.parse` を自作した `parseJSON` 関数を作成しなさい。第二引数の `reviver` には対応しなくて良いものとする。

JSON の構文に関しては MDN の [JSON の完全な構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON#json_%E3%81%AE%E5%AE%8C%E5%85%A8%E3%81%AA%E6%A7%8B%E6%96%87) を参考にしなさい。

問題を簡単にするために JSON の仕様を全て満たさずに一部を未対応としても良い。
その場合はどの仕様を未対応としたか記載すること。また未対応にした仕様に関するテストコードはコメントアウトしておくこと

**注意**: パーサーをどう書けばいいか分からない人向けに途中まで実装したサンプルを用意した。ch11/ex13/index.js を参照。必ずしもサンプルを利用しなくても良い。

**出題範囲**: 11.6

## 問題 11.14 💻🧪

以下の各関数を実装しなさい

1. 日本語文字列の配列を受け取り、文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする `sortJapanese` 関数
2. `Date` オブジェクトを受け取り、`令和6年4月2日` のように `(和暦)y年m月d日` のフォーマットで日付の文字列を返す `toJapaneseDateString` 関数

**出題範囲**: 11.7

## 問題 11.15 💻📄

ベースのURL`base`、追加するクエリ`addQuery`、パス`path`を持つオブジェクトを引数に取り、ベースのURLのパスとクエリを修正した文字列を返す関数`modifyUrl`を実装しなさい。

**出題範囲**: 11.9

## 問題 11.16 💻🧪

以下の仕様を持つ、 `retryWithExponentialBackof` 関数を実装しなさい

```js
function retryWithExponentialBackoff(func, maxRetry, callback)
```

- 受け取った関数 `func` を呼び出し、funcがtrueを返せばそこで終了する
- `func` が `false` を返した場合は以下の待ち時間後に `func` 呼び出しをリトライする
- 待ち時間は`func`の呼び出し回数に応じて1秒, 2秒, 4秒, ...と2倍に増えていく
- `maxRetry` 回リトライしても成功しない場合はそこで終了する
- `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる
- `func` が `true` を返す、またはmaxRetry回のリトライが失敗し終了する際、その結果(`true`/`false`)を引数として関数 `callback` が呼び出される

**出題範囲**: 11.10
