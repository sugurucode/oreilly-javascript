import { polarPoint } from './index.ts';

describe('polarPoint (object literal)', () => {
  beforeEach(() => {
    polarPoint.r = 1;
    polarPoint.theta = 0;
  });

  it('x, y の getter でデカルト座標が取得できる', () => {
    polarPoint.r = 2;
    polarPoint.theta = Math.PI / 2;
    expect(polarPoint.x).toBeCloseTo(0);
    expect(polarPoint.y).toBeCloseTo(2);
  });

  it('x, y の setter で値を更新できる', () => {
    polarPoint.x = 0;
    polarPoint.y = 2;
    expect(polarPoint.r).toBeCloseTo(2);
    expect(polarPoint.theta).toBeCloseTo(Math.PI / 2);
    expect(polarPoint.x).toBeCloseTo(0);
    expect(polarPoint.y).toBeCloseTo(2);
  });

  it('x, y の setter でNaNを設定するとエラー', () => {
    expect(() => {
      polarPoint.x = NaN;
    }).toThrow('xにNaNは設定できません');
    expect(() => {
      polarPoint.y = NaN;
    }).toThrow('yにNaNは設定できません');
  });
});
