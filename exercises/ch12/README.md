# 練習問題: 12 章

## 問題 12.1 💻🖋️

以下のコードに示す関数 `counterIter()` 及び `counterGen()` を利用して、イテレータ及びジェネレータに対して「調査対象の操作」に示す操作をしたときに、どの部分が実行されるのかを調査するコードを作成し、実行結果と動作の説明を記述しなさい

```js
function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}
```

調査対象の操作

- 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の next() を呼び出す
- 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の return() を呼び出す
- 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の throw() を呼び出す
- for-of ループを実行
- for-of ループを実行途中で break
- for-of ループを実行中に例外発生

**出題範囲**: 全体

## 問題 12.2 💻🧪

ジェネレータ関数を使わずに、P.367 の`fibonacciSequence()`が返すジェネレータと同等のイテレータを返す関数を実装しなさい。

**出題範囲**: 12.3.1

## 問題 12.3 💻🧪

P.372 で例示されている、`throw()`を使ってリセットを行うカウンタのようなジェネレータを実装しなさい。

**出題範囲**: 12.4.3

## 問題 12.4 💻🧪

値が必要になるまで実際の計算を行わない評価戦略を遅延評価と呼ぶ。ジェネレータ関数は`next()`が呼ばれるまで評価が遅延される関数と考えることができる。遅延評価を行うことで、例えば素数のような無限に続く値を扱うことができる。

呼び出しごとに素数を順番に返す無限ジェネレータ `primes()` を実装しなさい。

ヒント: P363 の `filter()` 関数と整数列を返すジェネレータを組み合わせることで、素数の倍数をふるい落とす再帰ジェネレータを作成し、内部に配列を保持することなくアルゴリズムを実現できる

**出題範囲**: 12.3

## 問題 12.5 💻🧪

指定されたファイルパスを受け取り、そのファイルを改行コード `\n` の出現ごとに分割して返すジェネレータ関数 `function* readLines(filePath)` を作成しなさい。取得できる文字列からは改行コードが除去されていること。

ファイルの読み込みは一度にすべて読み込むのではなく、`fs.openSync()`, `fs.readSync()` を使って一定バッファサイズごとに読み込むようにし、必ず `fs.closeSync()` でファイルをクローズすること。
また、利用者側のイテレータのループの途中で `break` したり `throw` された場合でも `fs.closeSync()` されるようにすること。

読み込まれるファイルは UTF-8 エンコーディングされたテキストファイルであると想定して良い。

**出題範囲**: 12.3

## 問題 12.6 💻🧪

指定されたディクトリ内のファイル/ディレクトリを再帰的に探索するジェネレータ関数 `function* walk(rootPath)` を作成しなさい。

ファイルとディレクトリのみを考慮すれば良く、シンボリックリンクやブロックデバイスなどは無視して良い。

`fs` モジュールの同期関数 (`fs.xxxSync()`) を利用すること。

取得できるデータは以下のプロパティを持つオブジェクトにすること。

- `path`: ファイル/ディレクトリのパス文字列
- `isDirectory`: ディレクトリであれば `true`, そうでなければ `false`

**出題範囲**: 12.3.2
