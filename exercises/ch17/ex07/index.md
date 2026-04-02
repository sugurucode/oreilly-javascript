#### 1. tsc（公式コンパイラ）
TypeScript公式コンパイラで、型チェック＋トランスパイル＋型情報ファイル（.d.ts）生成をしてくれる。tsconfig.jsonで調整可能。

#### 2. @babel/preset-typescript（Babel）
Babelのプリセットで、型注釈を除去（型チェックなし）しトランスパイル。他のBabelツールと組み合わせると、古いブラウザ向け変換（preset-env使用）も同時にできて便利。

```
// .babelrc
{
  "presets": [
    "@babel/preset-typescript",  // TypeScript→JS
    "@babel/preset-env"         // 最新JS→古いブラウザ対応JS
  ]
}
```

####　比較
| 項目    | tsc       | @babel/preset-typescript |
| ----- | --------- | ------------------------ |
| 型チェック | ○（必須）     | ×（別途tsc推奨）         |
| 出力    | JS + d.ts | JSのみ                     |
| 速度    | 標準        | 高速（型除去のみ）         |
| 用途    | 開発/ライブラリ  | Webpack等のビルドパイプライン  |

→大規模なプロジェクトならbabel使うと高速だし良いのかも

webpackをtscで作ると型チェックの分遅い。babelだと速い(型除去のみなので)



参考

- [@babel/preset-typescriptを使ってTypeScriptを変換する](https://qiita.com/nacam403/items/edf3e2c8ff364aff910f)

- [TypeScriptでのBabelの使用](https://typescript.dokyumento.jp/docs/handbook/babel-with-typescript.html)

- [@babel/preset-typescript](https://babeljs.io/docs/babel-preset-typescript)
