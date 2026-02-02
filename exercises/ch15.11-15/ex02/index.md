以下の挙動

- ステータスコードが 500 のエラーレスポンス

```
response: 500 { message: 'internal server error' }
```

ブラウザはalertで`internal server error`

- レスポンスは正常だが、レスポンスを返すまでに 60 秒かかる

```
drew the slow response
response: 200 {
  items: [
    { id: 1, name: 'aa', status: 'active' },
    { id: 2, name: 'aa', status: 'active' }
  ]
}
```
