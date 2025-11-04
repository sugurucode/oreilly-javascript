/**
 * リセット可能なカウンタを生成するジェネレータ。
 * 1から始まり、無限にカウントアップする。
 * イテレータの .throw("reset") が呼ばれると、
 * カウンタを 1 にリセットする。
 */
export function* resettableCounter() {
  let count = 1; // カウンタの初期値

  while (true) {
    try {
      // yieldで現在のカウントを返し、実行を一時停止
      yield count;

      // .next() で再開された場合、ここが実行される
      count++;
    } catch (e) {
      // .throw() で再開された場合、ここが実行される

      if (e === 'reset') {
        // "reset" というシグナル（例外）を受け取った場合
        count = 1; // カウンタを初期化
      } else {
        // "reset" 以外の予期せぬエラーの場合、それを再スロー
        throw e;
      }
    }
  }
}
