# マルチスレッドとは

## マルチスレッド（英：multithreading）とは

処理の開始から終了まで線を引いたときに、枝分かれの発生する処理のこと。

つまり

_並行処理が発生するプログラムのこと_

https://wa3.i-3-i.info/word12455.html

## javascriptでのマルチスレッド(Geminiの回答)

```
JavaScriptは本質的にシングルスレッドですが、Web Worker（ブラウザ）やWorker Threads（Node.js）を使用することでマルチスレッド処理を実現できます
```

# 実行結果

##　スレッド数による違い
以下の設定で結果を見る

- フィボナッチ数デフォルト（40）
- スレッド数は可変

### スレッド数1

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch16/ex01$ node mFib.js null 1
Worker 0 execution time: 1.373s
Total execution time: 1.382s
Fibonacci number: 165580140
```

### スレッド数4

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch16/ex01$ node mFib.js null 4
Worker 2 execution time: 236.449ms
Worker 0 execution time: 339.007ms
Worker 3 execution time: 454.487ms
Worker 1 execution time: 625.561ms
Total execution time: 628.942ms
Fibonacci number: 165580140
```

### スレッド数16

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch16/ex01$ node mFib.js null 16
Worker 2 execution time: 433.602ms
Worker 15 execution time: 367.328ms
Worker 14 execution time: 376.174ms
Worker 9 execution time: 417.392ms
Worker 11 execution time: 393.897ms
Worker 13 execution time: 387.686ms
Worker 7 execution time: 432.179ms
Worker 10 execution time: 414.037ms
Worker 12 execution time: 393.462ms
Worker 1 execution time: 463.697ms
Worker 4 execution time: 484.52ms
Worker 8 execution time: 512.9ms
Worker 6 execution time: 594.011ms
Worker 3 execution time: 691.152ms
Worker 5 execution time: 857.501ms
Worker 0 execution time: 1.116s
Total execution time: 1.123s
Fibonacci number: 165580140
```

## PCのCPUスペック

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch16/ex01$ lscpu | grep -E 'CPU\(s\)|Thread'
CPU(s):                               14
On-line CPU(s) list:                  0-13
Thread(s) per core:                   2
```

Thread(s) per core: 2 → 1つの物理コアが2つのスレッドを処理できる。
CPU(s): 14 →　論理スレッド数。
（物理コア数=14 ÷ 2 = 7）

論理スレッド数14なのでスレッド数14が適切かも

### スレッド数14

'''
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch16/ex01$ node mFib.js null 14
Worker 5 execution time: 383.321ms
Worker 4 execution time: 386.583ms
Worker 13 execution time: 338.407ms
Worker 12 execution time: 342.634ms
Worker 11 execution time: 346.968ms
Worker 9 execution time: 374.982ms
Worker 6 execution time: 396.091ms
Worker 2 execution time: 428.068ms
Worker 0 execution time: 467.305ms
Worker 10 execution time: 475.98ms
Worker 7 execution time: 576.787ms
Worker 8 execution time: 666.811ms
Worker 3 execution time: 826.667ms
Worker 1 execution time: 1.103s
Total execution time: 1.110s
Fibonacci number: 165580140
'''

スレッド数4が一番速かった。。。

### Gemini

```
論理スレッド数は14なので、理論的にはスレッド数14が最適に思えます。しかし、実際の結果ではスレッド数4が最速でした。これは以下の理由が考えられます：

スレッド間の通信コスト
スレッド数が増えると、スレッド間でデータをやり取りする通信コストが増加します。特にNode.jsのworker_threadsでは、スレッド間のメッセージングがボトルネックになることがあります。

スレッドの切り替えオーバーヘッド
スレッド数がCPUの論理スレッド数に近づくと、スレッドの切り替え（コンテキストスイッチ）の頻度が増えます。これにより、処理効率が低下する可能性があります。

タスクの分割効率
フィボナッチ数の計算のようなCPU負荷の高いタスクでは、タスクの分割が均等でないと、一部のスレッドが他よりも多くの作業を抱え、全体の処理時間が長くなることがあります。

Node.jsのスレッド管理の特性
Node.jsのworker_threadsは、スレッド数が増えると内部的なリソース管理のオーバーヘッドが増える場合があります。これにより、スレッド数が多いほど効率が低下することがあります。
```
