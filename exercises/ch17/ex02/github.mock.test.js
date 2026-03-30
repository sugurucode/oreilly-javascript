import {jest} from '@jest/globals';

// 1. ESM環境用のモック関数を使用する
jest.unstable_mockModule('octokit', () => {
  return {
    Octokit: jest.fn().mockImplementation(() => {
      return {
        rest: {
          issues: {
            listForRepo: jest
              .fn()
              .mockResolvedValue({data: [{number: 1, title: 'Mock Issue'}]}),
            create: jest
              .fn()
              .mockResolvedValue({data: {number: 2, title: 'New Mock Issue'}}),
            update: jest
              .fn()
              .mockResolvedValue({data: {number: 1, state: 'closed'}}),
          },
        },
      };
    }),
  };
});

// 2. モックの設定が終わった【後】に、テスト対象のファイルを動的インポートする
const {listIssues, createIssue, closeIssue} = await import('./github.js');

describe('Jestのモック関数を利用したテスト', () => {
  test('listIssues: Issue一覧を取得できる', async () => {
    const issues = await listIssues();
    expect(issues).toEqual([{number: 1, title: 'Mock Issue'}]);
  });

  test('createIssue: Issueを作成できる', async () => {
    const issue = await createIssue('New Mock Issue');
    expect(issue).toEqual({number: 2, title: 'New Mock Issue'});
  });

  test('closeIssue: Issueをクローズできる', async () => {
    const issue = await closeIssue(1);
    expect(issue).toEqual({number: 1, state: 'closed'});
  });
});
