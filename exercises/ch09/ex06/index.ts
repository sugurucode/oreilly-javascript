export class TypedMap {
  keyType: string | undefined;
  valueType: string | undefined;
  _map: Map<any, any>;

  constructor(
    keyType: string | undefined,
    valueType: string | undefined,
    entries: Iterable<[any, any]> | null,
  ) {
    this.keyType = keyType;
    this.valueType = valueType;
    if (entries) {
      for (const [k, v] of entries) {
        if (keyType && typeof k !== keyType) {
          throw new TypeError(`${k} is not of type ${keyType}`);
        }
        if (valueType && typeof v !== valueType) {
          throw new TypeError(`${v} is not of type ${valueType}`);
        }
      }
    }
    this._map = new Map(entries ?? undefined);
  }
  set(key: any, value: any) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    this._map.set(key, value);
    return this;
  }
  get(key: any) {
    return this._map.get(key);
  }
  // Map の他のメソッドは必要に応じて委譲可能
}
