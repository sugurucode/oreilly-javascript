## モジュールのリファクタ時の名前変更挙動まとめ

- nodeのモジュール

  module.js
  　sumという関数名をsum_newに変更。
  　module.exports = { sum: sum_new, Rectangle };
  main.js
  　特に何も変わらないがそのまま実行できる。

- ES6のモジュール
  module.js
  　sumという関数名をsum_newに変更。
  　export { sum_new as sum, Rectangle };
  main.js
  　特に何も変わらないがそのまま実行できる。

- デフォルトエクスポート

  module.js
  　sumという関数名をsum_newに変更。
  　export default sum_new;
  main.js
  　import 任意の名前 from './module.js';
  　インポート側は任意の名前で受け取れるため、エクスポート元の名前変更はインポート側に影響しない。

- 再エクスポート

  module.js
  　sumという関数名をsum_newに変更。
  export { sum_new as sum, Rectangle };
  reexport.js
  　export { sum } from './module.js';
  main.js
  　import { sum } from './reexport.js';
  　元の名前を変更すると、再エクスポート側・インポート側は特に変えずに実行できる。

- 名前変更を伴うインポート
  module.js
  import { sum as sum_new, Rectangle } from './module.js';
  sumがsum_newに自動変更される。

  他は特に変更することなく実行可能。
