// 以下をブラウザのコンソールで実行

// document.querySelector(selector): セレクタに一致する最初の要素（Element）を返す。
// document.querySelectorAll(selector): セレクタに一致するすべての要素を含む NodeList を返す。

// nav 要素内のリンク (<a>)
const navLinks = document.querySelectorAll('nav a');
console.log('--- nav 要素内のリンク (<a>) ---');
console.log(navLinks);

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
// :first-child は、親要素の最初の子要素である要素を選択する。:last-child,:nth-child(2) などもある。
const firstProduct = document.querySelector('.product-list .product-item:first-child');
console.log('--- 最初の商品 (.product-item) ---');
console.log(firstProduct);

// カートアイコンの画像 (<img>)
// .cart 内の img 要素
const cartImage = document.querySelector('.cart img');
console.log('--- カートアイコンの画像 (<img>) ---');
console.log(cartImage);

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const productPrices = document.querySelectorAll('.product-list .price');
console.log('--- 商品リスト内の価格 (.price) 要素 ---');
console.log(productPrices);

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const productImages = document.querySelectorAll('.product-list .product-item img');
console.log('--- 全ての商品 (.product-item) の画像 (<img>) ---');
console.log(productImages);

// 検索バー (.search-bar) 内の検索ボタン (<button>)
const searchButton = document.querySelector('.search-bar button');
console.log('--- 検索ボタン (<button>) ---');
console.log(searchButton);

// フッター (footer) 内のパラグラフ (<p>) 要素
const footerParagraph = document.querySelector('footer p');
console.log('--- フッター (footer) 内のパラグラフ (<p>) 要素 ---');
console.log(footerParagraph);

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
// :nth-child(n) は、親要素のn番目の子要素である要素を選択する。
// 'even' や 'odd'、あるいは 'An+B' の数式（例: 2n+1）を指定できる。
const evenProducts = document.querySelectorAll('.product-list .product-item:nth-child(even)');
console.log('--- 偶数番目の商品 (.product-item) ---');
console.log(evenProducts);

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const accountImage = document.querySelector('header .account img');
console.log('--- アカウントリンクの画像 (<img>) ---');
console.log(accountImage);

// ナビゲーションリンクのうち、"会社情報" のリンク
// :last-child は、親要素の最後の子要素である要素を選択する。
const aboutLink = document.querySelector('nav a:last-child');
console.log('--- "会社情報" のリンク ---');
console.log(aboutLink);
