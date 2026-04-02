## 問題 17.4 解答

### package-lock.json の役割

- `npm install` 実行時に、実際にインストールされたパッケージの正確なバージョン情報が記録されるファイルである。

- `npm ci` コマンドを実行する際に参照され、記述された情報を元に `node_modules` を作成（パッケージをインストール）する。

- インストールするパッケージのバージョンを固定し、どの環境でも同じ状態を再現する役割を持つ。

※`npm install`はpackage.jsonを参照してpackage-lock.jsonを更新することがあるが`npm ci`は更新しない。また`npm ci`はnode_modulesを全て削除してからインストールを行う。


### リポジトリにコミットすべきか

**コミットすべき**

理由：CIの実行時や、他の開発者が `git clone` した直後に `npm ci` コマンドを使って、全員が全く同じパッケージ環境を構築できるようにするため。

https://qiita.com/sugurutakahashi12345/items/1f6bb7a372b8263500e5
