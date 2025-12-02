import { template } from './index.js';

describe('template関数のテスト', () => {
  test('空文字の場合は空文字を返すこと', () => {
    // strings: [''], values: []
    expect(template``).toBe('');
  });

  test('変数のない通常の文字列はそのまま返すこと', () => {
    // strings: ['test'], values: []
    expect(template`test`).toBe('test');
  });

  test('文字列の変数が型名(string)に置換されること', () => {
    // "Hello, " + typeof "A" + ""
    expect(template`Hello, ${'A'}`).toBe('Hello, string');
  });

  test('複数の異なる型がそれぞれの型名に置換されること', () => {
    // JSの仕様上、typeof null は 'object' になります
    // number + " " + object + " " + function
    expect(template`${1} ${null} ${() => {}}`).toBe('number object function');
  });

  test('文章の途中に変数が含まれていても正しく置換されること', () => {
    // "type of 'A' is " + typeof "A" + ""
    expect(template`type of 'A' is ${'A'}`).toBe("type of 'A' is string");
  });
});
