## Node で debugger 文を使ってデバッグする方法

Node.js で`debugger`文を使うには、ソースコード内に`debugger;`を記述する。 その後、以下のコマンドでプログラムを実行する。

(tsの時はjsに変換してから

```bash
npx tsc ./exercises-public/exercises/ch05/ex11/index.ts
```

)

```bash
node inspect ファイル名.js
```

または、Node.js v8以降では以下のコマンドも使える。

```bash
node --inspect ファイル名.js
```

プログラムが `debugger` 文に到達すると、実行が一時停止し、デバッガで変数の値を確認したり、ステップ実行ができる。  
Chrome DevTools などの外部デバッガとも連携可能。

（参考: [Node.js公式ドキュメント - Debugging Guide](https://nodejs.org/ja/docs/guides/debugging-getting-started/)）

## やってみた

```bash
suguru@A081003065:~/oreilly_javascript7$ node inspect exercises-public/exercises/ch05/ex11/index.js
< Debugger listening on ws://127.0.0.1:9229/81f76291-e11b-479e-b0e8-6d565bec09ab
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
Break on start in exercises-public/exercises/ch05/ex11/index.js:1
> 1 var x = 1;
  2 var y = 2;
  3 var sum = x + y;
debug> repl
Press Ctrl+C to leave debug repl
> x
undefined
> sum
undefined
debug> n
step in exercises-public/exercises/ch05/ex11/index.js:1
> 1 var x = 1;
  2 var y = 2;
  3 var sum = x + y;
debug> n
step in exercises-public/exercises/ch05/ex11/index.js:2
  1 var x = 1;
> 2 var y = 2;
  3 var sum = x + y;
  4 // eslint-disable-next-line no-debugger
debug> n
step in exercises-public/exercises/ch05/ex11/index.js:3
  1 var x = 1;
  2 var y = 2;
> 3 var sum = x + y;
  4 // eslint-disable-next-line no-debugger
  5 debugger; // ここで一時停止して変数の値を確認できる
debug> n
ambiguous in exercises-public/exercises/ch05/ex11/index.js:5
  3 var sum = x + y;
  4 // eslint-disable-next-line no-debugger
> 5 debugger; // ここで一時停止して変数の値を確認できる
  6 sum = sum * 2;
  7 console.log('sum:', sum);
debug> repl
Press Ctrl+C to leave debug repl
> sum
3
debug> n
step in exercises-public/exercises/ch05/ex11/index.js:6
  4 // eslint-disable-next-line no-debugger
  5 debugger; // ここで一時停止して変数の値を確認できる
> 6 sum = sum * 2;
  7 console.log('sum:', sum);
  8
debug> repl
Press Ctrl+C to leave debug repl
> sum
3
debug> n
step in exercises-public/exercises/ch05/ex11/index.js:7
  5 debugger; // ここで一時停止して変数の値を確認できる
  6 sum = sum * 2;
> 7 console.log('sum:', sum);
  8
debug> repl
Press Ctrl+C to leave debug repl
> sum
6
```

## タスクkill

デバッカの停止。

```bash
lsof -i :9229
kill <PID>
```

## よく使うコマンド

- cont または c
  → 次のブレークポイントやdebugger;文まで進める

- next または n
  → 次の行まで1行ずつ進める（ステップオーバー）

- step または s
  → 関数の中に入って1行進める（ステップイン）

- out
  → 関数の外に出る（ステップアウト）

- repl
  → 変数の値を確認したり、式を評価できるモードに入る
  例: repl と入力後、sum と入力すると現在のsumの値が表示される

- pause
  → 実行中のプログラムを一時停止

- help
  → コマンド一覧を表示
