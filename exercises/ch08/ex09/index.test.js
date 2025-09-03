const { withResource } = require('./index.js');

describe('withResource', () => {
  it('should do process and call close finally', () => {
    // 予測結果を準備しておく。
    const resource = {
      called: [],
      doA() {
        this.called.push('doA');
      },
      doB() {
        this.called.push('doB');
      },
      close() {
        this.called.push('close');
      },
    };
    // resourceオブジェクトとそれを使う処理を渡す。
    withResource(resource, (res) => {
      res.doA();
      res.doB();
    });
    // finallyでcloseが呼ばれていることを確認する。
    expect(resource.called).toEqual(['doA', 'doB', 'close']);
  });

  it('should call close when an error occurs', () => {
    const resource = {
      called: [],
      doA() {
        this.called.push('doA');
        throw new Error('something wrong');
      },
      close() {
        this.called.push('close');
      },
    };
    expect(() => withResource(resource, (res) => res.doA())).toThrow(Error);
    expect(resource.called).toEqual(['doA', 'close']);
  });
});
