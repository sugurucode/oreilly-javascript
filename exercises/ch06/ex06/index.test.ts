import { getAllPropertyKeysArry } from './index.ts';

describe('getAllPropertyKeys', () => {
  it('自身のプロパティのみを取得できる', () => {
    const sym = Symbol('s');
    // keyはstringかsymbol。valueはnumberかstring
    const obj: Record<string | symbol, number | string> = { a: 1, b: 2 };
    obj[sym] = 3;
    const keys = getAllPropertyKeysArry(obj);

    expect(keys).toEqual(expect.arrayContaining(['a', 'b', sym]));
  });

  it('継承した列挙可能プロパティも取得できる', () => {
    const proto = { x: 10 };
    const obj = Object.create(proto);
    obj.y = 20;
    console.log(`obj: ${JSON.stringify(obj)}`);

    const keys = getAllPropertyKeysArry(obj);
    expect(keys).toEqual(expect.arrayContaining(['y', 'x']));
  });
});
