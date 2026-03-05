## 問題 16.8 💻

GitHub の REST API を利用して Issue を操作するコマンドラインツールを実装しなさい。最低限以下の要件を満たすこと。

- 入力はコマンドライン引数から受け取る
- Issue を作成できる
- 指定した Issue をクローズできる
- オープンな Issue の Id と Title の一覧を表示できる
- `-h`または`--help`オプションで使い方が確認できる
- `-v`または`--verbose`オプションで HTTP ログを出力する

**出題範囲**: 16.1, 16.8

###　GitHub の REST API を利用して Issue を操作

[Github ドキュメント REST API](https://docs.github.com/ja/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2022-11-28)

octokit.rest.issuesの使い方が書いてある公式ドキュメント
[octokit/rest.js - GitHub Pages](https://octokit.github.io/rest.js/v20/)

- node exercises/ch16/ex08/index.js list

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ node exercises/ch16/ex08/index.js list
Issueの番号: 2, タイトル: テストissue

```

- node exercises/ch16/ex08/index.js create issue-create

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ node exercises/ch16/ex08/index.js create issue-create
Issueを作成しました: #3 issue-create
```

- node exercises/ch16/ex08/index.js close 2

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ node exercises/ch16/ex08/index.js close 2
Closed: #2
```
