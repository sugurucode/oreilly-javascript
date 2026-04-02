##　npmとは
npm（Node Package Manager）は、JavaScriptのための世界最大のソフトウェアレジストリ。パッケージの管理機能も提供する。
[npm docs](https://docs.npmjs.com/about-npm)

`npm install <パッケージ名>`でnpmレジストリからライブラリをローカルのnode_modeuleフォルダにインストール。
同時にpackage.jsonにライブラリとそのバージョンを記載。

より詳細なnpmの説明は以下の公式ドキュメントにある。
https://docs.npmjs.com/cli/v11/commands/npm

## npxとは
ローカルまたはリモートのnpmパッケージからコマンドを実行する。

## npxの利点
- プロジェクトを軽量に保てる

`npm install`だとプロジェクトフォルダにnode_moduleが作成され、そこに保存されるが、npxを使うとプロジェクトフォルダ内には何も保存されず、プロジェクトを軽量に保てる。
なお、プロジェクト外の`npmキャッシュ`という場所に一時的にダウンロードして実行されている。
→一回試したいとかの時に便利。（create-react-appなどのプロジェクト初期化ツール）

- 常に最新バージョンを実行できる

**npm install の場合**: 一度インストールすると、package.json にバージョンが固定される。最新版を使いたいときは、npm update。

**npx の場合**: ローカルにそのパッケージがない状態で npx package-name を実行すると、npmレジストリからその時点の最新安定版（latest）を自動で探して実行する。ただし、ローカルにある場合はそれが優先されてしまうので、`npx foo@latest`という形式がいいかも。

https://docs.npmjs.com/cli/v11/commands/npx
