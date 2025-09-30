- date-fns
  date-fnsは日付操作ごとにフォルダが分かれている。
  例えば「addDays」「format」などの機能単位でフォルダにまとめられindexファイルからエクスポートされている。

- Luxon
  Luxonは「DateTime」「Duration」「Interval」といった型ごとにコードがまとまる。
  それぞれの型がクラスとして機能し、日時の操作や期間の計算がわかりやすい。
  国際化やタイムゾーンもサポート

- Day.js
  index.jsにDayjsクラスのメソッドとして操作（diff,add,format）
  プラグインごとに別々のフォルダに分かれている。
  共通処理はutilsにまとめられ、ロケール（言語）対応はlocaleフォルダで管理されています。
