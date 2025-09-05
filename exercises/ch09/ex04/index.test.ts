import { warrior, magicWarrior, Warrior, MagicWarrior } from './index.ts';

describe('class warrior', () => {
  it('attack()はatk×2を返す', () => {
    const w = new warrior(10);
    expect(w.attack()).toBe(20);
  });
});

describe('class magicWarrior', () => {
  it('attack()は(atk×2)+mgcを返す', () => {
    const mw = new magicWarrior(10, 5);
    expect(mw.attack()).toBe(25);
  });
});

describe('関数 Warrior', () => {
  it('attack()はatk×2を返す', () => {
    const w = new Warrior(10);
    expect(w.attack()).toBe(20);
  });
});

describe('関数 MagicWarrior', () => {
  it('attack()は(atk×2)+mgcを返す', () => {
    const mw = new MagicWarrior(10, 5);
    expect(mw.attack()).toBe(25);
  });
  it('constructorはMagicWarriorである', () => {
    const mw = new MagicWarrior(10, 5);
    expect(mw.constructor).toBe(MagicWarrior);
  });
});

describe('warrior関数/クラスのオブジェクト構造', () => {
  // クラス記法
  it('warriorクラスは関数である', () => {
    expect(typeof warrior).toBe('function');
  });
  it('warriorクラスのprototypeにattackがある', () => {
    expect(Object.getOwnPropertyNames(warrior.prototype)).toContain('attack');
  });
  it('warriorクラスのprototype.constructorはwarriorである', () => {
    expect(warrior.prototype.constructor).toBe(warrior);
  });

  // prototype記法
  it('Warrior関数は関数である', () => {
    expect(typeof Warrior).toBe('function');
  });
  it('Warriorのprototypeにattackがある', () => {
    expect(Object.getOwnPropertyNames(Warrior.prototype)).toContain('attack');
  });
  it('Warriorのprototype.constructorはWarriorである', () => {
    expect(Warrior.prototype.constructor).toBe(Warrior);
  });
});

describe('magicWarrior関数/クラスのオブジェクト構造', () => {
  // クラス記法
  it('magicWarriorクラスは関数である', () => {
    expect(typeof magicWarrior).toBe('function');
  });
  it('magicWarriorクラスのprototypeにattackがある', () => {
    expect(Object.getOwnPropertyNames(magicWarrior.prototype)).toContain('attack');
  });
  it('magicWarriorクラスのprototype.constructorはmagicWarriorである', () => {
    expect(magicWarrior.prototype.constructor).toBe(magicWarrior);
  });

  // prototype記法
  it('MagicWarrior関数は関数である', () => {
    expect(typeof MagicWarrior).toBe('function');
  });
  it('MagicWarriorのprototypeにattackがある', () => {
    expect(Object.getOwnPropertyNames(MagicWarrior.prototype)).toContain('attack');
  });
  it('MagicWarriorのprototype.constructorはMagicWarriorである', () => {
    expect(MagicWarrior.prototype.constructor).toBe(MagicWarrior);
  });
});
