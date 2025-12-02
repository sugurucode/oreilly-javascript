import { fibonacciSequence, fibonacciIterator } from './index.ts';
describe('Fibonacci Functions Comparison', () => {
    let gen;
    let iter;
    beforeEach(() => {
        gen = fibonacciSequence();
        iter = fibonacciIterator();
    });
    /**
     * テスト1: next() による逐次比較
     * 両方のイテレータを同時に実行し、
     * 最初の20ステップの値が完全に一致することを確認します。
     */
    test('next() を20回呼び出して同一の数列が生成されること', () => {
        for (let i = 0; i < 20; i++) {
            const genResult = gen.next().value;
            const iterResult = iter.next().value;
            expect(iterResult).toBe(genResult);
        }
    });
    // 反復可能であることは、symbol.iterator メソッドが存在すること。
    test('fibonacciIterator が for-of で反復可能であること', () => {
        const iterForOf = fibonacciIterator(); // 新しいインスタンスを使用
        const results = [];
        const iterations = 10; // 最初の10個を取得
        for (const n of iterForOf) {
            if (results.length >= iterations) {
                break; // 無限ループを停止
            }
            results.push(n);
        }
        // 期待されるフィボナッチ数列（最初の10個）
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        expect(results).toEqual(expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRWxFLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsSUFBSSxHQUFHLENBQUM7SUFDUixJQUFJLElBQUksQ0FBQztJQUVULFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxHQUFHLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUVIOzs7O09BSUc7SUFDSCxJQUFJLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25DLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDckMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCwwQ0FBMEM7SUFDMUMsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtRQUNqRCxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsZUFBZTtRQUN0RCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUMsWUFBWTtRQUVuQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzFCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxDQUFDLFdBQVc7WUFDcEIsQ0FBQztZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVELHdCQUF3QjtRQUN4QixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9