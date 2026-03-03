- 標準入力 (Standard Input / stdin)
  プログラムがデータを受け取るための「標準的な入り口」です。デフォルトではキーボードからの入力に設定されています。

- 標準出力 (Standard Output / stdout)
  プログラムが正常な実行結果を出力するための「標準的な出口」です。デフォルトでは**ディスプレイ（ターミナル画面）**に設定されています。

- 標準エラー出力 (Standard Error / stderr)
  プログラムがエラーメッセージや警告を出力するための「エラー専用の出口」です。標準出力と同じくデフォルトは**ディスプレイ（ターミナル画面）**ですが、標準出力とは別の経路になっているため、正常な結果とエラーを分けて扱うことができます。

- リダイレクト (Redirect)
  上記の標準入出力の「向き先」を変更する機能です。

- パイプ (Pipe : |)
  あるプログラムの「標準出力」を、別のプログラムの「標準入力」へ直接つなぐ機能です。バケツリレーのようにデータを渡していくことができます（例：command1 | command2）。

## 実験結果

- `node cat.mjs`
  予測：何も表示されない
  結果：何も表示されず、処理も終わらない。文字を打ってenterするとそれがすぐ出力される
  理由：pipeは、入力元からEOFが来るまで接続を維持し続ける。ctrl+zで止められる

  ```
  suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch16/ex05$ node cat.mjs
  dfef
  dfef
  erge
  erge
  ^Z
  [1]+  Stopped                 node cat.mjs
  ```

- `echo FOO | node cat.mjs`
  echoは引数を標準出力に表示するコマンド
  予測:FOOが表示されてから、入力待ちになる。
  結果:入力待ちにならずに、FOOだけ表示
  理由:echo処理が終わると即座にプロセスを終了する。パイプは自動的にEOFを送るので終了する。

- `node cat.mjs > output.txt`
  `>`は標準リダイレクト。標準出力に表示されるはずの結果を変更する。
  予測: キーボードの入力がoutput.txtに書き込まれる（事前にoutput.txtを作成しておかないとエラーとかになりそう）
  結果:output.txtが作成されてキーボードの入力が入る。

- `node cat.mjs file`
  予測:fileの内容が標準出力に表示される
  結果:↑の通り

- `node cat.mjs file > output.txt`
  予測：fileの内容がoutput.txtに出力される
  結果：↑の通り
- `node cat.mjs invalid-file > output.txt`
  予測:ファイルが見つからないエラーが起きる
  結果:↑の通り

```
Error: ENOENT: no such file or directory, open 'fefwer.txt'
Emitted 'error' event on ReadStream instance at:
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'fefwer.txt'
}
```

- `node cat.mjs invalid-file 2> error.txt`
  予測:２は標準エラー出力らしいので、エラーメッセージがテキストファイルに書き込まれる
  結果:↑の通り
