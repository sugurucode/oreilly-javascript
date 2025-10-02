- costOfLength が負の値を返すことがある ("Hello".length を実行すると時が巻き戻るのだろうか?)

- costOfLength の引数の値を大きくすれば大きくする程結果が小さくなる ("Hello".length を実行すればする程速くなるのだろうか?)
  計測には常に誤差（ノイズ）がある。
  誤差が一定量あるとすると、N 回の合計時間に対する誤差の割合は*誤算/N*
  試行回数 N が大きいほど誤差が小さくなる

```
  suguru@A081003065:~/oreilly_javascript7$ node exercises/ch11/ex11/index.js
  0.000018668900000000834　//console.log(costOfLength(10000));
  2.4047138000000006e-7 //console.log(costOfLength(100000000));
```
