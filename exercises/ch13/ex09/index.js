import { log } from 'console';
function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
async function i4() {
    let v = 0;
    const p1 = async () => {
        await wait1();
        for (let i = 0; i < 5; i++) {
            const next = v + 1;
            console.log('p1 read v=', v, ', next=', next);
            await wait2();
            v = next;
            console.log('p1 write v=', v);
        }
    };
    const p2 = async () => {
        for (let i = 0; i < 5; i++) {
            const next = v + 1;
            console.log('p2 read v=', v, ', next=', next);
            await wait2();
            v = next;
            console.log('p2 write v=', v);
        }
    };
    // [修正点]
    // Promise.all で並列実行すると競合状態が発生する
    // await Promise.all([p1(), p2()]);
    // p1() が完全に終わるのを待ってから p2() を実行する（直列実行）
    await p1();
    await p2();
    log(v); // 10 が出力される
}
i4();
// suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ npm run tsrun exercises/ch13/ex09/index.ts
// > preset-ts@1.0.0 tsrun
// > tsx exercises/ch13/ex09/index.ts
// p1 read v= 0 , next= 1
// p1 write v= 1
// p1 read v= 1 , next= 2
// p1 write v= 2
// p1 read v= 2 , next= 3
// p1 write v= 3
// p1 read v= 3 , next= 4
// p1 write v= 4
// p1 read v= 4 , next= 5
// p1 write v= 5
// p2 read v= 5 , next= 6
// p2 write v= 6
// p2 read v= 6 , next= 7
// p2 write v= 7
// p2 read v= 7 , next= 8
// p2 write v= 8
// p2 read v= 8 , next= 9
// p2 write v= 9
// p2 read v= 9 , next= 10
// p2 write v= 10
// 10
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzlCLFNBQVMsSUFBSSxDQUFDLElBQUk7SUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFRCxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRS9CLEtBQUssVUFBVSxFQUFFO0lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsTUFBTSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDcEIsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsTUFBTSxLQUFLLEVBQUUsQ0FBQztZQUNkLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNCLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxNQUFNLEtBQUssRUFBRSxDQUFDO1lBQ2QsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixRQUFRO0lBQ1IsZ0NBQWdDO0lBQ2hDLG1DQUFtQztJQUVuQyx1Q0FBdUM7SUFDdkMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNYLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFFWCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO0FBQ3RCLENBQUM7QUFFRCxFQUFFLEVBQUUsQ0FBQztBQUVMLDJHQUEyRztBQUUzRywwQkFBMEI7QUFDMUIscUNBQXFDO0FBRXJDLHlCQUF5QjtBQUN6QixnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCLGdCQUFnQjtBQUNoQix5QkFBeUI7QUFDekIsZ0JBQWdCO0FBQ2hCLHlCQUF5QjtBQUN6QixnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCLGdCQUFnQjtBQUNoQix5QkFBeUI7QUFDekIsZ0JBQWdCO0FBQ2hCLHlCQUF5QjtBQUN6QixnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCLGdCQUFnQjtBQUNoQix5QkFBeUI7QUFDekIsZ0JBQWdCO0FBQ2hCLDBCQUEwQjtBQUMxQixpQkFBaUI7QUFDakIsS0FBSyJ9