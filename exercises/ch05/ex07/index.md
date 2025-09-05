# プログラムの出力予想

- true
- false

# 結果

- false

# なんで？

`try`の`return`の後、関数を抜ける直前に`finally`が必ず実行され、`finally`で`return`があればそれが最優先される。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/try...catch#finally_%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF
