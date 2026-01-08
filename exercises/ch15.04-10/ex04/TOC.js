/* ブックマークレットとしてブラウザに登録する場合は以下のコードの先頭に javascript: を追加 */
/* // から始まるコメントはブックマークレット内で正しく動作しないことがあるため注意 */
(() => {
  /* NOTE: ブックマークレットによって実行する想定のため DOMContentLoaded のイベントで実行しない */
  let toc = document.querySelector('#TOC');
  if (!toc) {
    toc = document.createElement('div');
    toc.id = 'TOC';
    document.body.prepend(toc);
  }

  /* NOTE: スタイルを設定 */
  let style = document.querySelector('#TOC-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'TOC-style';
    document.body.prepend(style);
  }
  style.textContent = `
  #TOC {
    border: solid black 1px;
    margin: 10px;
    padding: 10px;

    /* 追加 (右上に固定表示) */
    position: fixed;
    top: 20px;
    right: 20px;
    width: 250px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    overflow-y: auto;
    max-height: calc(100vh - 40px);
    z-index: 9999;
  }
  .TOCEntry { margin: 5px 0px; }
  .TOCEntry a { text-decoration: none; }
  .TOCLevel1 { font-weight: bold; }
  .TOCLevel2 { margin-left: .25in; }
  .TOCLevel3 { margin-left: .5in; }
  .TOCSectNum:after { content: ": "; }
      `;

  /* NOTE: 以下は書籍のサンプルと同じ */
  let headings = document.querySelectorAll('h2,h3,h4,h5,h6');
  let sectionNumbers = [0, 0, 0, 0, 0];
  // 1.2.3 のようにセクション番号を付与しつつTOCを作成
  for (let heading of headings) {
    if (heading.parentNode === toc) {
      // TOC内の見出しは無視
      continue;
    }
    // tagNameは大文字で返ってくる（H2）.charAt(1)で数字部分を取得
    let level = parseInt(heading.tagName.charAt(1)) - 1; // h2 -> 1, h3 -> 2, ...
    sectionNumbers[level - 1]++;
    // 下位レベルのセクション番号をリセット
    for (let i = level; i < sectionNumbers.length; i++) {
      sectionNumbers[i] = 0;
    }
    // // 例: [1, 2, 0, 0] の level 2 なら "1.2" になる
    let sectionNumber = sectionNumbers.slice(0, level).join('.');
    let span = document.createElement('span');
    span.className = 'TOCSectNum';
    span.textContent = sectionNumber;
    heading.prepend(span);
    // anchorを作成してheadingの前に挿入することでeventListenerがなくても動作する
    let anchor = document.createElement('a');
    // TOC+セクション番号をフラグメント名にする
    let fragmentName = `TOC${sectionNumber}`; // 例: TOC1.2
    anchor.name = fragmentName;
    // ブラウザは自動的にページ移動するためのリンクとして認識する
    heading.before(anchor);
    anchor.append(heading);

    let link = document.createElement('a');
    link.href = `#${fragmentName}`;
    link.innerHTML = heading.innerHTML;

    /* 追加分 */
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // [name="fragmentName"] で対象要素を取得
      // id属性でも良い
      const target = document.querySelector(`a[name="${fragmentName}"]`);
      if (!target) {
        return;
      }
      // scrollIntoView を使ってスムーズにスクロール()
      /* NOTE: scrollTo または scrollIntoView でスムーズにスクロールしなさい  */
      target.scrollIntoView({
        behavior: 'smooth', // アニメーションを滑らかにする
        block: 'start', // 要素の先頭までスクロール
      });
    });
    // TOCエントリを作成して、ユーザーがクリックできるようにする
    let entry = document.createElement('div');
    entry.classList.add('TOCEntry', `TOCLevel${level}`);
    entry.append(link);
    toc.append(entry);
  }
})();
