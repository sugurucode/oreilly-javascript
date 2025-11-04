## jQuery Deferred と Promise の関係性

### 1. 概要

`jQuery Deferred` と `Promise` は、どちらもJavaScriptの「非同期処理」（時間がかかる処理）を分かりやすく管理するための仕組みである。

---

### 2. 各定義

- **jQuery Deferred:**
  jQueryライブラリが**独自に提供**する非同期処理の仕組み。`.done()` (成功時) や `.fail()` (失敗時) といった独自のメソッドで処理を管理する。

- **Promise:**
  ES2015（ES6）以降のJavaScript言語に**標準搭載**された非同期処理の仕組み。`.then()` (成功時) や `.catch()` (失敗時) で処理を管理する。

---

### 3. 関係性

`Deferred`は、JavaScriptに`Promise`が標準化される以前に、jQueryが先行して開発した**「Promiseの原型・先輩」**にあたる機能である。

両者は非同期処理を整理するという同じ目的を持つが、`Deferred`がjQueryライブラリ固有の機能であるのに対し、`Promise`は言語標準の機能である点が異なる。

---

### 4. 結論

`Deferred`はjQueryにおける**先行実装**、`Promise`は現代JavaScriptにおける**標準仕様**である。現在は、言語標準である`Promise`（および、それを発展させた`async/await`構文）の使用が主流となっている。
