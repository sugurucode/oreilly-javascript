- date-fns
  date-fnsは日付操作ごとにフォルダが分かれている。
  例えば「addDays」「formatDistance」などの機能単位でフォルダにまとめられindexファイルからエクスポートされている。

- Luxon
  Luxonは「dateTime.js」「duration.js」「interval.js」といった型ごとにファイルやクラスが分かれている。ロジックはimpleにまとまっていて、外部からimportして使っている。

- Day.js
  dayjsのフォルダ構成は、日付処理のコア部分（constant.js、index.js、utils.js）がsrc直下にまとめられており、機能追加用のpluginディレクトリ、ローカライズ用のlocaleディレクトリが整理されている。
