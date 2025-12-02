import { Hiragana } from './index.js';

describe('Hiraganaクラスのテスト', () => {
  // テスト用のインスタンス作成
  const h_a = new Hiragana('あ'); // コード: 12354
  const h_i = new Hiragana('い'); // コード: 12356
  const h_u = new Hiragana('う'); // コード: 12358

  test('プロパティが正しくセットされていること', () => {
    expect(h_a.char).toBe('あ');
    expect(h_a.code).toBe(12354); // 'あ'のUTF-16コード
  });

  test('文字列が期待される場合(String)はひらがなを返すこと', () => {
    // String() で囲むと hint は 'string' になります
    expect(String(h_a)).toBe('あ');
    expect(`${h_a}`).toBe('あ'); // テンプレートリテラルも同様
  });

  test('数字が期待される場合(Number)はUTF-16コードを返すこと', () => {
    // Number() で囲むと hint は 'number' になります
    expect(Number(h_a)).toBe(12354);
    // 単項プラス演算子も number を期待します
    expect(+h_a).toBe(12354);
  });

  test('デフォルト(default)の場合はひらがなを返すこと', () => {
    // 文字列との結合(+)は default が呼ばれることが多いです
    expect(h_a + '').toBe('あ');
  });

  test('大小比較(<, >)ができること', () => {
    // < や > 演算子は、互いがオブジェクトの場合 hint: 'number' として比較しようとします
    // 12354 < 12356 なので true になるはずです
    expect(h_a < h_i).toBe(true);
    expect(h_u > h_a).toBe(true);
  });

  test('配列のソート(sort)が正しく動くこと', () => {
    // バラバラの順番で配列に入れます
    const list = [h_u, h_a, h_i]; // う, あ, い

    // ソートを実行
    // (a - b) をすることで、強制的に 'number' として扱わせ、コード順に並べます
    list.sort((a, b) => a - b);

    // 期待する順番: あ(h_a) -> い(h_i) -> う(h_u)
    expect(list[0]).toBe(h_a);
    expect(list[1]).toBe(h_i);
    expect(list[2]).toBe(h_u);

    // 確認のため文字列に変換してみる
    expect(String(list[0])).toBe('あ');
    expect(String(list[1])).toBe('い');
    expect(String(list[2])).toBe('う');
  });
});
