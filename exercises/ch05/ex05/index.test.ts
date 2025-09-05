import { f } from './index.ts';

describe('f', () => {
  it('偶数の値だけを持つ新しいオブジェクトを返す', () => {
    const o = { x: 1, y: 2, z: 3 };
    expect(f(o)).toEqual({ y: 2 });
    expect(o).toEqual({ x: 1, y: 2, z: 3 }); // 元のオブジェクトは変更しない
  });
});
