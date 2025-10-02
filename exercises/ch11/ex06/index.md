<!-- https://zenn.dev/igz0/articles/email-validation-regex-best-practices -->

### よく使われる正規表現

```
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```

### 理由

HTMLの標準仕様を定めるWHATWGの正規表現をそのまま使っている
各ブラウザのデフォルトの`input type="email"` のバリデーションと一致
