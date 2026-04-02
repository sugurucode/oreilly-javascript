// テスト実行
// suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch17$ npm test -- ex02/github.mock.test.js

// import { listIssues, createIssue, closeIssue } from './github';
import { jest } from '@jest/globals';

// ↓のようなテストをするためjest.fn() を使ってモック関数を作成
// expect(mockListForRepo).toHaveBeenCalledWith({ owner: 'sugurucode', ... });
// expect(mockListForRepo).toHaveBeenCalledTimes(1)
const mockListForRepo = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();

// jest.mock()を使うと↓のエラーが出るため、jest.unstable_mockModule()を使用
// ReferenceError: require is not defined
// jest.mock()がcommonjs環境でしか動作しないっぽい
jest.unstable_mockModule('octokit', () => {
  return {
    // new octokit()と呼ばれたらmoclImplementationの中の関数が呼ばれるようにする
    Octokit: jest.fn().mockImplementation(() => {
      return {
        // 実際の呼び出し→octokit.rest.issues.listForRepo(...)
        rest: {
          issues: {
            // listForRepoが呼ばれたら、テストではmockListForRepoが呼ばれるようにする
            listForRepo: mockListForRepo,
            create: mockCreate,
            update: mockUpdate,
          },
        },
      };
    }),
  };
});

// ReferenceError: require is not definedになるため、import()を使ってモジュールを動的にインポートする
// ようはモックを宣言してから、テスト対象を読み込むという順序を守るために、import()を使ってモジュールを動的にインポートする必要がある。
const { listIssues, createIssue, closeIssue } = await import('./github.js');

describe('GitHub Issues API Functions', () => {
  // 各テストの前にモックの呼び出し履歴をクリア
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listIssues', () => {
    test('OpenなIssueの一覧を正しく取得できること', async () => {
      // モック関数の戻り値を設定 (APIのレスポンス { data: ... } の形を模倣)
      const mockIssues = [{ id: 1, title: 'Issue 1' }, { id: 2, title: 'Issue 2' }];
      // 失敗：mockListForRepo.mockResolvedValue(mockIssues);
      // 実際はAPIレスポンスの中のdataプロパティにIssueの配列が入っているため
      // ここではmockListForRepoが呼ばれたときに、{ data: mockIssues } というオブジェクトを返すように設定する。
      mockListForRepo.mockResolvedValue({ data: mockIssues });

      const result = await listIssues();

      // 関数の戻り値が正しいか検証
      expect(result).toEqual(mockIssues);
      // octokit のメソッドが正しい引数で1回呼び出されたか検証
      expect(mockListForRepo).toHaveBeenCalledTimes(1);
      expect(mockListForRepo).toHaveBeenCalledWith({
        owner: 'sugurucode',
        repo: 'oreilly-javascript',
        state: 'open',
      });
    });
  });

  describe('createIssue', () => {
    test('新しいIssueを正しく作成できること', async () => {
      const issueTitle = 'テスト用の新しいIssue';
      const mockCreatedIssue = { id: 3, title: issueTitle };
      mockCreate.mockResolvedValue({ data: mockCreatedIssue });

      const result = await createIssue(issueTitle);

      expect(result).toEqual(mockCreatedIssue);
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith({
        owner: 'sugurucode',
        repo: 'oreilly-javascript',
        title: issueTitle,
      });
    });
  });

  describe('closeIssue', () => {
    test('指定したIssueをクローズ状態に更新できること', async () => {
      const issueNumber = 123;
      const mockClosedIssue = { id: 123, state: 'closed' };
      mockUpdate.mockResolvedValue({ data: mockClosedIssue });
      // issueNumberが数値になっていないとエラーになるはず
      const result = await closeIssue(issueNumber);
      // resultがmockClosedIssueと等しいということは、
      // closeIssue関数がoctokit.rest.issues.updateから返されたデータ
      // を正しく返していることを意味する。
      expect(result).toEqual(mockClosedIssue);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledWith({
        owner: 'sugurucode',
        repo: 'oreilly-javascript',
        issue_number: 123, 
        state: 'closed',
      });
    });
  });
});