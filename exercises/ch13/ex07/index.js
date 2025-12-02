import { log } from 'console';
// async function h4() {
//   // NOTE: 2つの例外は両方 catch できるか？
//   try {
//     const p1 = wait2().then(() => {
//       errX();
//     });
//     const p2 = wait1().then(() => {
//       errY();
//     });
//     await p1;
//     await p2;
//   } catch (e) {
//     log(e.message);
//   }
// }
function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}
// const wait1 = () => wait(1000);
// const wait2 = () => wait(2000);
// // 例外
const errX = () => {
    throw new Error('X');
};
// const errY = () => {
//   throw new Error('Y');
// };
// h4();
function h3() {
    // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
    new Promise(async () => {
        errX();
    }).catch((e) => log(e.message));
}
h3();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTlCLHdCQUF3QjtBQUN4QixrQ0FBa0M7QUFDbEMsVUFBVTtBQUNWLHNDQUFzQztBQUN0QyxnQkFBZ0I7QUFDaEIsVUFBVTtBQUNWLHNDQUFzQztBQUN0QyxnQkFBZ0I7QUFDaEIsVUFBVTtBQUNWLGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFDaEIsa0JBQWtCO0FBQ2xCLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sSUFBSTtBQUVKLFNBQVMsSUFBSSxDQUFDLElBQUk7SUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFRCxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBRWxDLFFBQVE7QUFDUixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7SUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUM7QUFDRix1QkFBdUI7QUFDdkIsMEJBQTBCO0FBQzFCLEtBQUs7QUFFTCxRQUFRO0FBRVIsU0FBUyxFQUFFO0lBQ1QseURBQXlEO0lBQ3pELElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELEVBQUUsRUFBRSxDQUFDIn0=