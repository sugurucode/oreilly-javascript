// 関数を引数に受け取り、call相当の動きをするプロパティmyCallを追加する関数
// call相当の動き→「call相当の動き」とは、関数に「this」と任意の引数を指定して呼び出すことです。
const addMyCall = (fn) => {
  // fnにmyCallプロパティを追加する
  fn.myCall = function (thisArg, ...args) {
    // bindを使ってthisArgと引数でfnを呼び出す
    return fn.bind(thisArg, ...args)();
  };
};

module.exports = { addMyCall };
