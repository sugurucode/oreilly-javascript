https://www.perplexity.ai/search/javascript-typescriptte-ya-wob-6TmM.EvORf6N_JDviGpXAw

## 代表的なライブラリ
$：jQuery、RxJS
_：Underscore.js、Lodash

## ドル記号（＄）を変数名に使うライブラリ・事例
- jQuery
JavaScript界隈で最も有名な $ 変数はjQueryです。jQueryを導入すると $ がグローバル変数として定義され、DOM操作などに広く利用されます。TypeScriptでjQueryを使う場合、型定義ファイル（@types/jquery など）を導入するか、declare var $: any; のように宣言することで $ を利用できます。

- RxJS
RxJSでも $ を変数名やプロパティ名の末尾に付ける慣習（例：value$）があります。これは「Observableであること」を示すための命名規則です。

- TypeScriptの型変数
TypeScriptではジェネリック型変数名にも $ を使うことができます（例：function func4<$>(x: $) {}）。

## _（アンダースコア）を変数名に使うライブラリ・事例

- Underscore.js / Lodash
どちらもグローバル変数 _ をエクスポートします。_ を使ってコレクション操作やユーティリティ関数を呼び出すことができます。

- 一時変数・無名変数としての利用
JavaScript/TypeScriptの関数やコールバックの引数で _ を一時変数や「使わない変数」として利用する慣習があります。例えば、args.find(_ => ...) のような使い方です。

- TypeScriptの型変数
TypeScriptのジェネリック型変数名にも _ を使うことができます（例：function func4<_>(x: _) {}）。