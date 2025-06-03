- Windowsの場合
NFC（Normalization Form Canonical Composition）形式が主に使われます。

WindowsやMicrosoftのアプリケーションでは、通常の入力やファイル名保存時にNFC形式（合成済み文字、例：「パ」＝\u30D1）が使われます。

ファイルシステム自体は正規化を強制しませんが、一般的な文化的慣習としてNFCが好まれます。

- macOSの場合
NFD（Normalization Form Canonical Decomposition）形式が強制的に使われます。

macOS（特にHFS+やAPFSファイルシステム）では、ファイル名は自動的にNFD形式（分解形、例：「ハ」＋「゜」＝\u30CF\u309A）に変換されて保存されます。

FinderなどGUIで作成した場合は必ずNFDになりますが、ターミナルなど一部のコマンドライン環境ではNFCのまま作成されることもあります

参考になった↓
https://zenn.dev/hacobell_dev/articles/68ccc92bffd6cc