import { jsonParse } from './index.ts';
describe('jsonParse', () => {
    it('jsonの文字列が帰ってくる', () => {
        const jsonString = '{"name": "hatanaka", "hobby": "game"}';
        const result = jsonParse(jsonString);
        expect(result).toEqual({ success: true, data: { name: 'hatanaka', hobby: 'game' } });
    });
    it('jsonに変換できない文字列が来たらエラー。', () => {
        const invalidJsonString = '"name": "hatanaka", "hobby": "game"';
        const result = jsonParse(invalidJsonString);
        expect(result).toEqual({
            success: false,
            error: 'jsonにできません',
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV2QyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUN6QixFQUFFLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQ3hCLE1BQU0sVUFBVSxHQUFHLHVDQUF1QyxDQUFDO1FBQzNELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO1FBQ2hDLE1BQU0saUJBQWlCLEdBQUcscUNBQXFDLENBQUM7UUFDaEUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNyQixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==