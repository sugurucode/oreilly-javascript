import { escapeStringIf, escapeStringSwitch } from './index.ts';

describe('Ifのテスト', () => {
  it('制御文字を正しくエスケープする', () => {
    expect(escapeStringIf('\0\b\t\n\v\f\r\\"\'')).toBe('\\0\\b\\t\\n\\v\\f\\r\\\\\\"\\\'');
  });

  it('通常の文字はそのまま', () => {
    expect(escapeStringIf('abc123')).toBe('abc123');
  });

  it('混在した文字列も正しくエスケープ', () => {
    expect(escapeStringIf('a\nb\tc')).toBe('a\\nb\\tc');
  });

  it('バックスラッシュのエスケープ', () => {
    expect(escapeStringIf('test\\path')).toBe('test\\\\path');
  });

  it('クォートのエスケープ', () => {
    expect(escapeStringIf('say "hello"')).toBe('say \\"hello\\"');
    expect(escapeStringIf("it's ok")).toBe("it\\'s ok");
  });
});

describe('Switchのテスト', () => {
  it('制御文字を正しくエスケープする', () => {
    expect(escapeStringSwitch('\0\b\t\n\v\f\r\\"\'')).toBe('\\0\\b\\t\\n\\v\\f\\r\\\\\\"\\\'');
  });

  it('通常の文字はそのまま', () => {
    expect(escapeStringSwitch('abc123')).toBe('abc123');
  });

  it('混在した文字列も正しくエスケープ', () => {
    expect(escapeStringSwitch('a\nb\tc')).toBe('a\\nb\\tc');
  });

  it('バックスラッシュのエスケープ', () => {
    expect(escapeStringSwitch('test\\path')).toBe('test\\\\path');
  });

  it('クォートのエスケープ', () => {
    expect(escapeStringSwitch('say "hello"')).toBe('say \\"hello\\"');
    expect(escapeStringSwitch("it's ok")).toBe("it\\'s ok");
  });
});
