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
