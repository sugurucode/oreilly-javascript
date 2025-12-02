import { C } from './index.ts';
test(`直接取得できる`, () => {
    const c = new C();
    // アクセスできないテスト書けないっぽい？
    // expect(c.x).toBeUndefined(); // 'x' is private and cannot be accessed directly
    expect(c.x).toBe(42);
});
test('ClosureC: getXで値が取得できる', () => {
    const c = new ClosureC();
    expect(c.getX()).toBe(42);
});
// 外部からxにアクセスできないことのテスト（型エラーになるためコメントで説明）
// expect(c.x).toBeUndefined(); // TypeScriptの型チェックでエラー
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBWSxNQUFNLFlBQVksQ0FBQztBQUV6QyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtJQUNuQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2xCLHNCQUFzQjtJQUN0QixpRkFBaUY7SUFDakYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLE1BQU0sQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQztBQUVILHlDQUF5QztBQUN6Qyx1REFBdUQifQ==