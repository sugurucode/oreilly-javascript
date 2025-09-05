class TypedMap extends Map {
  constructor(keyType, valueType, entries) {
    // entries が指定されている場合、型をチェックする。
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }
    // （型チェックされた）entries を使って、スーパークラスを初期化する。
    super(entries);
    // 次に、型を保存して、サブクラスを初期化する。
    this.keyType = keyType;
    this.valueType = valueType;
  }
  // set() メソッドを再定義して、マップに追加されるキーと値のペアに対して
  // 型チェックを行うようにする。
  set(key, value) {
    // key やvalue の型が異なっている場合は、エラーをスローする。
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    // 型が正しい場合、スーパークラスのset() メソッドを呼び出し、
    // エントリをマップに追加する。スーパークラスから返されたものを
    // そのまま返す。
    return super.set(key, value);
  }
}
