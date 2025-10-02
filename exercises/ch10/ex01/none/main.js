/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 必要なモジュールへの参照を取得する。
const stats = __webpack_require__(1);
const BitSet = (__webpack_require__(2).BitSet);
// モジュールを使ってコードを記述する。
let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]); // average は20。


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

/**
 * AbstractSet クラスでは、has() 抽象メソッドのみを定義する。
 */
class AbstractSet {
  // このメソッドではエラーをスローする。このようにすることで、
  // サブクラスでこのメソッドを定義しなければならないようにする。
  has(x) {
    throw new Error('Abstract method');
  }
}
/**
 * NotSet は、AbstractSet の具象サブクラス。
 * このセットは、あるほかのセットのメンバーではない値すべてがメンバーとなる。
 * このセットは、ほかのセットの状態によって定義されるセットなので、書き込む
 * ことはできない。また、メンバーは無限に存在するので、列挙もできない。
 * このセットを使ってできることは、メンバーに含まれるかどうかを調べることと、
 * 数学的な表記方法を使って文字列に変換することだけ。
 */
class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }
  // 継承した抽象メソッドに対する実装。
  has(x) {
    return !this.set.has(x);
  }
  // また、Object のtoString() メソッドもオーバーライドする。
  toString() {
    return `{ x| x ∉ ${this.set.toString()} }`;
  }
}
/**
 * RangeSet は、AbstractSet の具象サブクラス。このセットは、
 * from からto まで（from とto も含む）のすべての値がメンバーとなる。
 * メンバーは浮動小数点値になりうるので、列挙できない。
 * また、意味のある大きさも持たない。
 */
class RangeSet extends AbstractSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }
  has(x) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{ x| ${this.from} ≤ x ≤ ${this.to} }`;
  }
}
/*
 * AbstractEnumerableSet は、AbstractSet の抽象サブクラス。
 * セットの大きさを返す抽象ゲッターメソッドと、抽象イテレータを定義する。
 * また、この2 つの抽象メソッドを使って、isEmpty()、toString()、
 * equals() メソッドを実装する。サブクラスでは、イテレータと
 * 大きさを返すゲッターメソッド、has() メソッドを実装するだけで、
 * この3 つのメソッドも使えるようになる。
 */
class AbstractEnumerableSet extends AbstractSet {
  get size() {
    throw new Error('Abstract method');
  }
  [Symbol.iterator]() {
    throw new Error('Abstract method');
  }
  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(', ')}}`;
  }
  equals(set) {
    // 比較対象のセットがAbstractEnumerableSet でなければ、等しくない。
    if (!(set instanceof AbstractEnumerableSet)) return false;
    // 大きさが同じでなければ、等しくない。
    if (this.size !== set.size) return false;
    // このセットの要素を巡回する。
    for (let element of this) {
      // 要素が比較対象のセットのメンバーでなければ、等しくない。
      if (!set.has(element)) return false;
    }
    // 要素が一致したので、2 つのセットは等しい。
    return true;
  }
}
/*
 * SingletonSet は、AbstractEnumerableSet の具象サブクラス。
 * シングルトンセットは、メンバーが1 つしかない読み出し専用のセット。
 */
class SingletonSet extends AbstractEnumerableSet {
  constructor(member) {
    super();
    this.member = member;
  }
  // このサブクラスでは以下の3 つのメソッドを実装する。この3 つのメソッドを使って
  // 動作するisEmpty()、equals()、toString() メソッドの実装は継承する。
  has(x) {
    return x === this.member;
  }
  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}
/*
 * AbstractWritableSet は、AbstractEnumerableSet の抽象サブクラス。
 * セットから個々のメンバーを挿入したり削除したりするために、
 * それぞれinsert() とremove() 抽象メソッドを定義する。
 * また、この2 つのメソッドを使って、add()、subtract()、intersect()
 * 具象メソッドを実装する。このAPI 群は、JavaScript 標準のSet クラスと
 * 異なっているので注意。
 * 9.5 サブクラス269
 */
class AbstractWritableSet extends AbstractEnumerableSet {
  insert(x) {
    throw new Error('Abstract method');
  }
  remove(x) {
    throw new Error('Abstract method');
  }
  add(set) {
    for (let element of set) {
      this.insert(element);
    }
  }
  subtract(set) {
    for (let element of set) {
      this.remove(element);
    }
  }
  intersect(set) {
    for (let element of this) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}
/**
 * BitSet はAbstractWritableSet の具象サブクラス。ある最大値よりも
 * 小さい非負の整数がメンバーとなるセットに対して、非常に効率的な
 * 固定サイズのセットを実装する。
 */
class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max; // 保存可能な最大整数。
    this.n = 0; // セット中に含まれる整数の数。
    this.numBytes = Math.floor(max / 8) + 1; // 必要となるバイト数。
    this.data = new Uint8Array(this.numBytes); // バイトの配列。
  }
  // このセットに保存可能な値かどうかを確認する内部メソッド。
  _valid(x) {
    return Number.isInteger(x) && x >= 0 && x <= this.max;
  }
  // data 配列のあるバイトのあるビットが立っているかどうかを調べる。
  // true またはfalse を返す。
  _has(byte, bit) {
    return (this.data[byte] & BitSet.bits[bit]) !== 0;
  }
  // 値x がBitSet に含まれるかどうか。
  has(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      return this._has(byte, bit);
    } else {
      return false;
    }
  }
  // 値x をBitSet に挿入する。
  insert(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] |= BitSet.bits[bit];
        this.n++;
      }
    } else {
      throw new TypeError('Invalid set element: ' + x);
    }
  }
  remove(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      if (this._has(byte, bit)) {
        this.data[byte] &= BitSet.masks[bit];
        this.n--;
      }
    } else {
      throw new TypeError('Invalid set element: ' + x);
    }
  }
  // セットの大きさを返すゲッターメソッド。
  get size() {
    return this.n;
  }
  // 単にビットが立っているかどうかをチェックすることで巡回する。
  // （このコードはあまり賢くなく、大幅に最適化できる。）
  *[Symbol.iterator]() {
    for (let i = 0; i <= this.max; i++) {
      if (this.has(i)) {
        yield i;
      }
    }
  }
}
// has()、insert()、remove() メソッドで使うために事前に計算しておく。
BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);

exports.BitSet = BitSet;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
// 必要なモジュールへの参照を取得する。
const stats = __webpack_require__(1);
const BitSet = (__webpack_require__(2).BitSet);
// モジュールを使ってコードを記述する。
let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]); // average は20。

})();

/******/ })()
;