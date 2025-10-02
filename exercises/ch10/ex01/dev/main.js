/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./exercises/ch10/ex01/index.cjs":
/*!***************************************!*\
  !*** ./exercises/ch10/ex01/index.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{// 必要なモジュールへの参照を取得する。\nconst stats = __webpack_require__(/*! ./stats.cjs */ \"./exercises/ch10/ex01/stats.cjs\");\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./exercises/ch10/ex01/sets.cjs\").BitSet);\n// モジュールを使ってコードを記述する。\nlet s = new BitSet(100);\ns.insert(10);\ns.insert(20);\ns.insert(30);\nlet average = stats.mean([...s]); // average は20。\n\n\n//# sourceURL=webpack://preset-ts/./exercises/ch10/ex01/index.cjs?\n}");

/***/ }),

/***/ "./exercises/ch10/ex01/sets.cjs":
/*!**************************************!*\
  !*** ./exercises/ch10/ex01/sets.cjs ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{/**\n * AbstractSet クラスでは、has() 抽象メソッドのみを定義する。\n */\nclass AbstractSet {\n  // このメソッドではエラーをスローする。このようにすることで、\n  // サブクラスでこのメソッドを定義しなければならないようにする。\n  has(x) {\n    throw new Error('Abstract method');\n  }\n}\n/**\n * NotSet は、AbstractSet の具象サブクラス。\n * このセットは、あるほかのセットのメンバーではない値すべてがメンバーとなる。\n * このセットは、ほかのセットの状態によって定義されるセットなので、書き込む\n * ことはできない。また、メンバーは無限に存在するので、列挙もできない。\n * このセットを使ってできることは、メンバーに含まれるかどうかを調べることと、\n * 数学的な表記方法を使って文字列に変換することだけ。\n */\nclass NotSet extends AbstractSet {\n  constructor(set) {\n    super();\n    this.set = set;\n  }\n  // 継承した抽象メソッドに対する実装。\n  has(x) {\n    return !this.set.has(x);\n  }\n  // また、Object のtoString() メソッドもオーバーライドする。\n  toString() {\n    return `{ x| x ∉ ${this.set.toString()} }`;\n  }\n}\n/**\n * RangeSet は、AbstractSet の具象サブクラス。このセットは、\n * from からto まで（from とto も含む）のすべての値がメンバーとなる。\n * メンバーは浮動小数点値になりうるので、列挙できない。\n * また、意味のある大きさも持たない。\n */\nclass RangeSet extends AbstractSet {\n  constructor(from, to) {\n    super();\n    this.from = from;\n    this.to = to;\n  }\n  has(x) {\n    return x >= this.from && x <= this.to;\n  }\n  toString() {\n    return `{ x| ${this.from} ≤ x ≤ ${this.to} }`;\n  }\n}\n/*\n * AbstractEnumerableSet は、AbstractSet の抽象サブクラス。\n * セットの大きさを返す抽象ゲッターメソッドと、抽象イテレータを定義する。\n * また、この2 つの抽象メソッドを使って、isEmpty()、toString()、\n * equals() メソッドを実装する。サブクラスでは、イテレータと\n * 大きさを返すゲッターメソッド、has() メソッドを実装するだけで、\n * この3 つのメソッドも使えるようになる。\n */\nclass AbstractEnumerableSet extends AbstractSet {\n  get size() {\n    throw new Error('Abstract method');\n  }\n  [Symbol.iterator]() {\n    throw new Error('Abstract method');\n  }\n  isEmpty() {\n    return this.size === 0;\n  }\n  toString() {\n    return `{${Array.from(this).join(', ')}}`;\n  }\n  equals(set) {\n    // 比較対象のセットがAbstractEnumerableSet でなければ、等しくない。\n    if (!(set instanceof AbstractEnumerableSet)) return false;\n    // 大きさが同じでなければ、等しくない。\n    if (this.size !== set.size) return false;\n    // このセットの要素を巡回する。\n    for (let element of this) {\n      // 要素が比較対象のセットのメンバーでなければ、等しくない。\n      if (!set.has(element)) return false;\n    }\n    // 要素が一致したので、2 つのセットは等しい。\n    return true;\n  }\n}\n/*\n * SingletonSet は、AbstractEnumerableSet の具象サブクラス。\n * シングルトンセットは、メンバーが1 つしかない読み出し専用のセット。\n */\nclass SingletonSet extends AbstractEnumerableSet {\n  constructor(member) {\n    super();\n    this.member = member;\n  }\n  // このサブクラスでは以下の3 つのメソッドを実装する。この3 つのメソッドを使って\n  // 動作するisEmpty()、equals()、toString() メソッドの実装は継承する。\n  has(x) {\n    return x === this.member;\n  }\n  get size() {\n    return 1;\n  }\n  *[Symbol.iterator]() {\n    yield this.member;\n  }\n}\n/*\n * AbstractWritableSet は、AbstractEnumerableSet の抽象サブクラス。\n * セットから個々のメンバーを挿入したり削除したりするために、\n * それぞれinsert() とremove() 抽象メソッドを定義する。\n * また、この2 つのメソッドを使って、add()、subtract()、intersect()\n * 具象メソッドを実装する。このAPI 群は、JavaScript 標準のSet クラスと\n * 異なっているので注意。\n * 9.5 サブクラス269\n */\nclass AbstractWritableSet extends AbstractEnumerableSet {\n  insert(x) {\n    throw new Error('Abstract method');\n  }\n  remove(x) {\n    throw new Error('Abstract method');\n  }\n  add(set) {\n    for (let element of set) {\n      this.insert(element);\n    }\n  }\n  subtract(set) {\n    for (let element of set) {\n      this.remove(element);\n    }\n  }\n  intersect(set) {\n    for (let element of this) {\n      if (!set.has(element)) {\n        this.remove(element);\n      }\n    }\n  }\n}\n/**\n * BitSet はAbstractWritableSet の具象サブクラス。ある最大値よりも\n * 小さい非負の整数がメンバーとなるセットに対して、非常に効率的な\n * 固定サイズのセットを実装する。\n */\nclass BitSet extends AbstractWritableSet {\n  constructor(max) {\n    super();\n    this.max = max; // 保存可能な最大整数。\n    this.n = 0; // セット中に含まれる整数の数。\n    this.numBytes = Math.floor(max / 8) + 1; // 必要となるバイト数。\n    this.data = new Uint8Array(this.numBytes); // バイトの配列。\n  }\n  // このセットに保存可能な値かどうかを確認する内部メソッド。\n  _valid(x) {\n    return Number.isInteger(x) && x >= 0 && x <= this.max;\n  }\n  // data 配列のあるバイトのあるビットが立っているかどうかを調べる。\n  // true またはfalse を返す。\n  _has(byte, bit) {\n    return (this.data[byte] & BitSet.bits[bit]) !== 0;\n  }\n  // 値x がBitSet に含まれるかどうか。\n  has(x) {\n    if (this._valid(x)) {\n      let byte = Math.floor(x / 8);\n      let bit = x % 8;\n      return this._has(byte, bit);\n    } else {\n      return false;\n    }\n  }\n  // 値x をBitSet に挿入する。\n  insert(x) {\n    if (this._valid(x)) {\n      let byte = Math.floor(x / 8);\n      let bit = x % 8;\n      if (!this._has(byte, bit)) {\n        this.data[byte] |= BitSet.bits[bit];\n        this.n++;\n      }\n    } else {\n      throw new TypeError('Invalid set element: ' + x);\n    }\n  }\n  remove(x) {\n    if (this._valid(x)) {\n      let byte = Math.floor(x / 8);\n      let bit = x % 8;\n      if (this._has(byte, bit)) {\n        this.data[byte] &= BitSet.masks[bit];\n        this.n--;\n      }\n    } else {\n      throw new TypeError('Invalid set element: ' + x);\n    }\n  }\n  // セットの大きさを返すゲッターメソッド。\n  get size() {\n    return this.n;\n  }\n  // 単にビットが立っているかどうかをチェックすることで巡回する。\n  // （このコードはあまり賢くなく、大幅に最適化できる。）\n  *[Symbol.iterator]() {\n    for (let i = 0; i <= this.max; i++) {\n      if (this.has(i)) {\n        yield i;\n      }\n    }\n  }\n}\n// has()、insert()、remove() メソッドで使うために事前に計算しておく。\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\n\nexports.BitSet = BitSet;\n\n\n//# sourceURL=webpack://preset-ts/./exercises/ch10/ex01/sets.cjs?\n}");

/***/ }),

/***/ "./exercises/ch10/ex01/stats.cjs":
/*!***************************************!*\
  !*** ./exercises/ch10/ex01/stats.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{// 必要なモジュールへの参照を取得する。\nconst stats = __webpack_require__(/*! ./stats.cjs */ \"./exercises/ch10/ex01/stats.cjs\");\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./exercises/ch10/ex01/sets.cjs\").BitSet);\n// モジュールを使ってコードを記述する。\nlet s = new BitSet(100);\ns.insert(10);\ns.insert(20);\ns.insert(30);\nlet average = stats.mean([...s]); // average は20。\n\n\n//# sourceURL=webpack://preset-ts/./exercises/ch10/ex01/stats.cjs?\n}");

/***/ })

/******/ 	});
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./exercises/ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;