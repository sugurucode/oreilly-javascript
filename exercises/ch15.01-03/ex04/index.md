1. グローバルオブジェクトを参照する3つの方法
   環境に応じて以下のキーワードを使用します。

ブラウザ内: window (または self, frames)

Node.js 内: global

環境問わず (モダン): globalThis (ES2020より導入された標準規格)

2. ブラウザ独自のグローバルプロパティ・メソッド (10選)
   ブラウザと Node.js の大きな違いは、ブラウザが BOM (Browser Object Model) と DOM (Document Object Model) を持っている点です。以下は Node.js のグローバルには標準で存在しない、ブラウザ特有のプロパティの例です。

Shutterstock

document: DOMツリーへのエントリーポイント。

location: 現在のURL情報の取得や操作。

navigator: ブラウザやOSの情報（User Agentなど）。

history: ブラウザの履歴操作。

localStorage: ローカルストレージへのアクセス。

sessionStorage: セッションストレージへのアクセス。

alert(): 警告ダイアログの表示。

confirm(): 確認ダイアログの表示。

prompt(): 入力ダイアログの表示。

screen: ユーザーの画面解像度などの情報。

Note: console や setTimeout は両方の環境に共通して存在しますが、内部の実装は異なります。

3. グローバルオブジェクトの undefined と過去の問題
   グローバルオブジェクトには undefined というプロパティが定義されており、プリミティブ値の undefined を保持しています。

過去のES仕様（ES3以前）での問題
かつて undefined は書き換え可能なプロパティ (writable) でした。

JavaScript

// 昔の危険なコード例 (ES3)
undefined = "値が入ってしまった";

if (someVar === undefined) {
// undefinedが書き換えられているため、この判定が正しく機能しなくなる
}
現在（ES5以降）
この問題を防ぐため、現在の仕様ではグローバルオブジェクトの undefined は Read-only (書き込み不可) かつ Non-configurable に設定されています。 ただし、関数スコープ内では現在でも undefined という変数名を宣言できてしまうため、より安全に undefined 値を参照するために void 0 が使われることがあります。
