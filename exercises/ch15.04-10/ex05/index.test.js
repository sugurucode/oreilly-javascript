/**
 * @jest-environment jsdom
 */
import './index.js';

describe('inline-circle', () => {
  let circle;

  beforeEach(() => {
    // 各テストの前に新しく要素を作成して body に追加
    circle = document.createElement('inline-circle');
    // appendChildで connectedCallback が呼び出される
    document.body.appendChild(circle);
  });

  afterEach(() => {
    document.body.innerHTML = ''; // クリーンアップ
  });

  test('初期状態のスタイルが適用されている', () => {
    expect(circle.style.display).toBe('inline-block');
    expect(circle.style.borderRadius).toBe('50%');
  });

  test('color属性を変更すると背景色が変わる', () => {
    circle.color = 'red';
    expect(circle.style.backgroundColor).toBe('red');
    expect(circle.getAttribute('color')).toBe('red');
  });

  test('border-color属性を変更すると枠線の色が変わる', () => {
    circle.borderColor = 'gold';
    expect(circle.style.borderColor).toBe('gold');
  });

  test('diameter属性を変更するとサイズが変わる', () => {
    circle.diameter = '20';
    expect(circle.style.width).toBe('20px');
    expect(circle.style.height).toBe('20px');
  });
});
