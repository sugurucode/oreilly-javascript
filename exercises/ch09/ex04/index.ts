// --- class記法 ---
export class warrior {
  atk: number;
  constructor(atk: number) {
    this.atk = atk;
  }
  attack() {
    return this.atk * 2;
  }
}

export class magicWarrior extends warrior {
  mgc: number;
  constructor(atk: number, mgc: number) {
    super(atk);
    this.mgc = mgc;
  }
  attack() {
    return super.attack() + this.mgc;
  }
}

// --- prototype記法 ---
export function Warrior(atk: number) {
  this.atk = atk;
}
Warrior.prototype.attack = function () {
  return this.atk * 2;
};

export function MagicWarrior(atk: number, mgc: number) {
  Warrior.call(this, atk);
  this.mgc = mgc;
}
MagicWarrior.prototype = Object.create(Warrior.prototype);
console.log(new MagicWarrior(10, 5).constructor === Warrior); // true
MagicWarrior.prototype.constructor = MagicWarrior;
MagicWarrior.prototype.attack = function () {
  return Warrior.prototype.attack.call(this) + this.mgc;
};
