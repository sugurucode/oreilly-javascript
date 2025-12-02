export class TypedMap {
    keyType;
    valueType;
    _map; //内部で使うMap
    constructor(keyType, valueType, entries) {
        this.keyType = keyType;
        this.valueType = valueType;
        // entriesがnullでない場合に型チェックを行う
        if (entries) {
            for (const [k, v] of entries) {
                // keyTypeとvalueTypeが指定されている場合に型チェックを行う
                // undefinedの場合はチェックしない
                if (keyType && typeof k !== keyType) {
                    throw new TypeError(`${k} is not of type ${keyType}`);
                }
                // valueTypeが指定されている場合に型チェックを行う
                if (valueType && typeof v !== valueType) {
                    throw new TypeError(`${v} is not of type ${valueType}`);
                }
            }
        }
        // super(entries)
        // entriesがnullの場合はundefinedを渡す
        this._map = new Map(entries ?? undefined);
    }
    set(key, value) {
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }
        this._map.set(key, value);
        return this;
    }
    get(key) {
        return this._map.get(key);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sUUFBUTtJQUNuQixPQUFPLENBQXFCO0lBQzVCLFNBQVMsQ0FBcUI7SUFDOUIsSUFBSSxDQUFnQixDQUFDLFVBQVU7SUFFL0IsWUFDRSxPQUEyQixFQUMzQixTQUE2QixFQUM3QixPQUFvQztRQUVwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUzQiw2QkFBNkI7UUFDN0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsdUNBQXVDO2dCQUN2Qyx1QkFBdUI7Z0JBQ3ZCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDO29CQUNwQyxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDeEQsQ0FBQztnQkFDRCwrQkFBK0I7Z0JBQy9CLElBQUksU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO29CQUN4QyxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsaUJBQWlCO1FBQ2pCLCtCQUErQjtRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsR0FBRyxDQUFDLEdBQVEsRUFBRSxLQUFVO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEQsTUFBTSxJQUFJLFNBQVMsQ0FBQyxHQUFHLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxLQUFLLG1CQUFtQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELEdBQUcsQ0FBQyxHQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBRUYifQ==