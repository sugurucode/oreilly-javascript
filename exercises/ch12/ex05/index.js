import * as fs from 'fs';
export function* readLines(filePath) {
    let fd; // ファイルディスクリプタ
    try {
        // 1. ファイルを同期的に 'r' (読み取り) モードで開く
        fd = fs.openSync(filePath, 'r');
        const bufferSize = 65536; // 64*1024=64KB (一度に読み込むバッファサイズ)
        const buffer = Buffer.alloc(bufferSize); //alloc: 指定バイト数のバッファを確保
        let remainder = ''; // \nの手前で64KBで区切られた場合の残り部分を保存
        let bytesRead = 0; // 実際に読み込んだバイト数
        // 2. readSync でファイルからチャンクを読み込む
        //    bytesRead > 0 の間（ファイル終端に達するまで）ループ
        // readSync(どのファイルから読み込むか？,読み込んだデータをどこに入れるか？,bufferのどこから書き込むか？
        // ,最大何バイト読むか？,ファイルの何バイト目からよむか？)
        while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) > 0) {
            // 3. 前回の残り + 今回のチャンクをUTF-8文字列に変換
            //    (buffer.toString() には読み込んだバイト数 (bytesRead) を指定する)
            let chunk = remainder + buffer.toString('utf8', 0, bytesRead);
            // 4. 改行コードで分割
            let lines = chunk.split('\n');
            // 5. 最後の要素は「次の残り」として保持する
            // (理由: チャンクの最後が不完全な行である可能性 or ちょうど \n で終わった場合は空文字列 '' が入る)
            remainder = lines.pop();
            // 6. 完成した行（lines.pop() 以外）を yield で返す
            for (const line of lines) {
                yield line;
            }
        }
        // 7. ループ終了後、最後の残り (ファイルの最終行) があれば
        //    それを yield する
        if (remainder.length > 0) {
            yield remainder;
        }
    }
    finally {
        // 8. (最重要) クローズ処理
        //    try ブロックが正常終了しても、
        //    途中で break/return されても、
        //    例外(throw)が発生しても、
        //    finally ブロックは必ず実行される。
        if (fd !== undefined) {
            console.log(`ジェネレータ終了: ファイル ${filePath} をクローズ`);
            fs.closeSync(fd);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUV6QixNQUFNLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRO0lBQ2pDLElBQUksRUFBRSxDQUFDLENBQUMsY0FBYztJQUV0QixJQUFJLENBQUM7UUFDSCxpQ0FBaUM7UUFDakMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWhDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLGdDQUFnQztRQUMxRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1FBQ2hFLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtRQUNqRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlO1FBRWxDLCtCQUErQjtRQUMvQix1Q0FBdUM7UUFDdkMsOERBQThEO1FBQzlELGdDQUFnQztRQUNoQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDdEUsaUNBQWlDO1lBQ2pDLHVEQUF1RDtZQUN2RCxJQUFJLEtBQUssR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTlELGNBQWM7WUFDZCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlCLHlCQUF5QjtZQUN6QiwyREFBMkQ7WUFDM0QsU0FBUyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUV4QixzQ0FBc0M7WUFDdEMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxJQUFJLENBQUM7WUFDYixDQUFDO1FBQ0gsQ0FBQztRQUVELGtDQUFrQztRQUNsQyxrQkFBa0I7UUFDbEIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sU0FBUyxDQUFDO1FBQ2xCLENBQUM7SUFDSCxDQUFDO1lBQVMsQ0FBQztRQUNULGtCQUFrQjtRQUNsQix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLHNCQUFzQjtRQUN0QiwyQkFBMkI7UUFDM0IsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsUUFBUSxRQUFRLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyJ9