## また、複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい。

### 実験方法

コマンドをAIで生成しました
これにより、最大 10000 個の同時 TCP 接続ができる。

```
for i in {1..10000}; do sleep 0.1 && (exec tail -f /dev/null <>/dev/tcp/localhost/3000 &) && echo "接続 $i"; done
```

## 結果

```
接続 2514
接続 2515
接続 2516
接続 2517
接続 2518
bash: fork: retry: Resource temporarily unavailable
bash: fork: retry: Resource temporarily unavailable
bash: fork: retry: Resource temporarily unavailable
bash: fork: retry: Resource temporarily unavailable
bash: fork: Resource temporarily unavailable
```

- 何接続で確立できなくなったか
  約 2518 接続

- 確立できなかった理由
  システムのリソース上に達したため。

最大ファイルディスクリプタ数はかなり余裕ある。

```
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ ulimit -n
1048576
```

メモリの限界？
