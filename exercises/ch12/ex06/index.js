import * as fs from 'fs';
import * as path from 'path';
// 指定されたパス以下のファイルとディレクトリを再帰的に表示するジェネレータ関数
// walkの出力例:
export function* walk(rootPath) {
    let stats;
    try {
        // lstatSyncを使い、シンボリックリンク(ショートカット)をたどらない
        stats = fs.lstatSync(rootPath);
    }
    catch (e) {
        // 存在しないパスや権限エラーの場合は何もしない
        console.error(`Error stating path ${rootPath}: ${e.message}`);
        return;
    }
    // 1. ディレクトリの場合
    if (stats.isDirectory()) {
        // まず自分自身（ディレクトリ）を yield する
        yield { path: rootPath, isDirectory: true };
        // 呼び出し元がforなどの場合２回目以降はここから再開
        let entries;
        try {
            // readDirSyncでディレクトリ内のエントリ名一覧を取得
            entries = fs.readdirSync(rootPath);
        }
        catch (e) {
            // ディレクトリが読み取れない場合は何もしない
            console.error(`Error reading directory ${rootPath}: ${e.message}`);
            return;
        }
        // 各エントリに対して再帰的に walk を呼び出す
        for (const entry of entries) {
            const fullPath = path.join(rootPath, entry);
            // yield* を使って、再帰呼び出し先のジェネレータが返す値を
            // すべてこのジェネレータから yield する
            // ＊がないと、ジェネレータオブジェクト自体を yield してしまう
            // 出力例:
            yield* walk(fullPath);
        }
    }
    // 2. ファイルの場合
    else if (stats.isFile()) {
        // ファイルを yield する
        yield { path: rootPath, isDirectory: false };
    }
    // 3. シンボリックリンクやその他の場合は無視する
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3Qix5Q0FBeUM7QUFDekMsWUFBWTtBQUNaLE1BQU0sU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVE7SUFDNUIsSUFBSSxLQUFLLENBQUM7SUFDVixJQUFJLENBQUM7UUFDSCx3Q0FBd0M7UUFDeEMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCx5QkFBeUI7UUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsUUFBUSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQU87SUFDVCxDQUFDO0lBRUQsZUFBZTtJQUNmLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7UUFDeEIsMkJBQTJCO1FBQzNCLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUU1Qyw2QkFBNkI7UUFDN0IsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLENBQUM7WUFDSCxpQ0FBaUM7WUFDakMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCx3QkFBd0I7WUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsUUFBUSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLE9BQU87UUFDVCxDQUFDO1FBRUQsMkJBQTJCO1FBQzNCLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxFQUFFLENBQUM7WUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsa0NBQWtDO1lBQ2xDLHlCQUF5QjtZQUN6QixvQ0FBb0M7WUFDcEMsT0FBTztZQUNQLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUNELGFBQWE7U0FDUixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBQ3hCLGlCQUFpQjtRQUNqQixNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUNELDJCQUEyQjtBQUM3QixDQUFDIn0=