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
        }
        catch (e) {
            // .throw() で再開された場合、ここが実行される
            if (e === 'reset') {
                // "reset" というシグナル（例外）を受け取った場合
                count = 1; // カウンタを初期化
            }
            else {
                // "reset" 以外の予期せぬエラーの場合、それを再スロー
                throw e;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUNILE1BQU0sU0FBUyxDQUFDLENBQUMsaUJBQWlCO0lBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVc7SUFFMUIsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQztZQUNILDJCQUEyQjtZQUMzQixNQUFNLEtBQUssQ0FBQztZQUVaLDRCQUE0QjtZQUM1QixLQUFLLEVBQUUsQ0FBQztRQUNWLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsNkJBQTZCO1lBRTdCLElBQUksQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUNsQiw4QkFBOEI7Z0JBQzlCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXO1lBQ3hCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixnQ0FBZ0M7Z0JBQ2hDLE1BQU0sQ0FBQyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyJ9