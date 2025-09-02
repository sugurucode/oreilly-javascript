# 末尾再帰最適化（Tail Call Optimization）とは？

## 1. 末尾再帰最適化が可能な理由

### 末尾再帰とは？

関数が自分自身を呼び出す再帰処理のうち、**呼び出しが関数の最後の処理（末尾）にあるもの**を「末尾再帰」と呼びます。

例えば、階乗を計算する普通の再帰関数は以下のように書きます：

```typescript
// 末尾再帰ではない例
function factorial(n: number): number {
  if (n === 0) return 1;
  return n * factorial(n - 1); // 呼び出し後に掛け算をしているため末尾再帰ではない
}
```

一方で、末尾再帰の形に書き換えるとこうなります：

```typescript
// 末尾再帰の例
function factorial(n: number): number {
  function iter(product: number, counter: number): number {
    if (counter > n) {
      return product;
    }
    return iter(product * counter, counter + 1); // 自分自身の呼び出しが最後の処理（末尾呼び出し）
  }
  return iter(1, 1);
}
```

### 末尾再帰最適化の原理

**通常の再帰では**：

- 関数を呼ぶたびに新しいスタックフレーム（記憶領域）が積み上がる
- 各スタックフレームには、関数の引数、ローカル変数、戻りアドレスが保存される
- 再帰が深いと「スタックオーバーフロー」が発生する

**末尾再帰の場合**：

- 再帰呼び出しが関数の最後の処理なので、現在の関数の処理結果を待つ必要がない
- 現在のスタックフレームを**再利用**できる
- スタックの成長を抑えることができる

**最適化の仕組み**：

1. 末尾呼び出しの場合、呼び出し元に戻る必要がない
2. 現在のスタックフレームを破棄して、新しい関数の引数で置き換える
3. 実質的にジャンプ命令（goto）のように動作する
4. スタックの使用量がO(1)の定数に抑えられる

---

## 2. JavaScriptで末尾再帰最適化を実装している処理系

### 現在の実装状況（2025年時点）

| JavaScript処理系               | 末尾再帰最適化の対応状況 | 詳細                                                |
| :----------------------------- | :----------------------- | :-------------------------------------------------- |
| **Safari (JavaScriptCore)**    | ✅ **実装済み**          | ES6仕様に準拠して実装されている唯一のメジャー処理系 |
| **Chrome (V8)**                | ❌ **未実装**            | 一度実装したが2016年に削除。現在も未対応            |
| **Firefox (SpiderMonkey)**     | ❌ **未実装**            | TC39での議論後、実装を見送り                        |
| **Microsoft Edge (Chakra/V8)** | ❌ **未実装**            | Windows ABIでの実装困難さを理由に未対応             |
| **Node.js (V8ベース)**         | ❌ **未実装**            | V8と同じく未対応                                    |

### TypeScript Playgroundでの動作確認

**重要な注意点**：TypeScript PlaygroundはV8エンジン（Chrome）ベースで動作しているため、**末尾再帰最適化は動作しません**。

提供されたURL: [https://www.typescriptlang.org/play?#code=GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA](https://www.typescriptlang.org/play?#code=GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA)

このコードをTypeScript Playgroundで実行すると、大きな数値（例：100000）でスタックオーバーフローが発生します。

**Safariでのテスト**：
上記のコードをSafariで実行すると、末尾再帰最適化により正常に動作します：

```typescript
function factorial(n: number): number {
  function iter(product: number, counter: number): number {
    if (counter > n) {
      return product;
    }
    return iter(product * counter, counter + 1);
  }
  return iter(1, 1);
}

// Safariでは正常動作、他のブラウザではスタックオーバーフロー
console.log(factorial(100000)); // Safari: Infinity, 他: RangeError
```

---

## まとめ

### 末尾再帰最適化の原理

末尾再帰最適化が可能な理由は、**スタックフレームの再利用**にあります：

1. **通常の再帰**：各呼び出しで新しいスタックフレームを作成
2. **末尾再帰**：呼び出し元に戻る必要がないため、現在のフレームを再利用
3. **最適化後**：実質的にループ処理と同等の動作（ジャンプ命令）

### JavaScript処理系の現状

- **実装済み**：Safari (JavaScriptCore)のみ
- **未実装**：Chrome、Firefox、Edge、Node.js
- **標準仕様**：ES6で義務化されているが、実装は困難な状況
