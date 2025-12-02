# ex14: Product List Filter with Playwright E2E Tests

## 実装内容

### HTML (index.html)

ドロップダウンリストで選択したカテゴリに応じて商品リストをフィルタリングする機能を実装しました。

**フィルタリングロジック:**

```javascript
const productCategory = product.dataset.category;
if (selectedCategory === 'all' || selectedCategory === productCategory) {
  product.style.display = '';
} else {
  product.style.display = 'none';
}
```

- `data-category` 属性で各商品のカテゴリを判定
- 選択されたカテゴリが "all" または商品のカテゴリと一致する場合に表示
- それ以外は `display: none` で非表示

### Playwright E2E Tests (index.spec.js)

以下の5つのテストケースを作成しました:

1. **初期状態では全ての商品が表示される**

   - ページ読み込み直後の状態を確認

2. **「すべて」を選択すると全ての商品が表示される**

   - 他のカテゴリから「すべて」に戻した時の動作を確認

3. **「食品」を選択すると食品カテゴリのみ表示される**

   - 食品カテゴリのフィルタリングを確認

4. **「文房具」を選択すると文房具カテゴリのみ表示される**

   - 文房具カテゴリのフィルタリングを確認

5. **カテゴリを切り替えると表示が正しく更新される**
   - 複数のカテゴリを切り替えた時の動作を確認

## テスト実行方法

```bash
# E2Eテスト実行（headlessモード）
npm run test:browser -- exercises/ch15.01-03/ex14/index.spec.js

# デモ実行（ブラウザウィンドウが開いて自動遷移）
npm run test:demo -- exercises/ch15.01-03/ex14/demo.spec.js

# 全てのテストを実行
npm run test:browser

# 全てのテストをheadedモードで実行
npm run test:demo
```

## テスト結果

```
✓ 5 passed (3.8s)
```

全てのテストが正常に通過しました。
