- マッピング:キーと値のペア

# リンクリストの仕組み

```js
const node3 = { key: 'c', value: 3, next: undefined };
const node2 = { key: 'b', value: 2, next: node3 };
const node1 = { key: 'a', value: 1, next: node2 };
```

## 順番

node1 → node2 → node3

## アクセス方法

```js
entries[1] = {
  key: 'keyA',
  value: 'valueA',
  next: {
    key: 'keyB',
    value: 'valueB',
    next: {
      key: 'keyC',
      value: 'valueC',
      next: undefined,
    },
  },
};
```

- `entries[1]` はリンクリストの「先頭ノード」（keyA, valueA）
- `entries[1].next` で2番目のノード（keyB, valueB）
- `entries[1].next.next` で3番目のノード（keyC, valueC）

というように、`next` をたどることで全てのノードにアクセスできる。
つまり、`this.entries[index]` は先頭ノードを指している。
