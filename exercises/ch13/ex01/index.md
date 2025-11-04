# 予想

1000ミリ秒（1秒後）にコンソールにHello,world!と表示

# 結果

実行されない

#　理由

## タスクについて

```
タスクとは、プログラムの初期実行、イベントコールバックの実行、インターバルやタイムアウトの発生など、標準的なメカニズムによって実行がスケジュールされる JavaScript コードのことです。これらはすべてタスクキューにスケジューリングされます。
```

https://developer.mozilla.org/ja/docs/Web/API/HTML_DOM_API/Microtask_guide

# タスクキューに追加されるケース

```
- 新しい JavaScript プログラムやサブプログラムが（コンソールから、あるいは <script> 要素内のコードを実行して）直接実行されたとき。

- イベントが発生し、イベントのコールバック関数がタスクキューに追加された場合。

- setTimeout() または setInterval() で作成したタイムアウトまたはインターバルに達すると、対応するコールバックがタスクキューに追加されます。
```

以下が重要
**setTimeout() または setInterval() で作成したタイムアウトまたはインターバルに達すると、対応するコールバックがタスクキューに追加されます。**

つまり、以下のコードでは

```ts
setTimeout(() => console.log('Hello, world!'), 1000);

function longRunningFunction() {
  while (true) {}
}

longRunningFunction();
```

タスクキューに入る順番が以下になる。

1. setTimeOut()
2. longRunningFunction()
3. console.log("Hello,world")

2が無限に続くので3に行かない。
