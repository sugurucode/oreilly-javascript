# 実行結果

1: newNumber1
3: newNumber3
str: newString
newStr: newString2
2: number2

## 考察

- `newObj` の内容が優先。
- プロパティ名が被っているところは後からcreateしている値に書き変わる（string→newStringなど）
- enumも同様に被っているので列挙不可に書き変わり出力されない。
