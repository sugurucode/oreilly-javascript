export class C {
    x = 42;
}
// プライべート使ってアクセスできなくしている。
export class privateC {
    // #はprivateと同じ
    #x = 42;
    getX() {
        return this.#x;
    }
}
// クロージャを使ったCのバージョン
export function createC() {
    let x = 42;
    return {
        getX: function () {
            return x;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sQ0FBQztJQUNaLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDUjtBQUVELHlCQUF5QjtBQUN6QixNQUFNLE9BQU8sUUFBUTtJQUNuQixlQUFlO0lBQ2YsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNSLElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBRUQsbUJBQW1CO0FBQ25CLE1BQU0sVUFBVSxPQUFPO0lBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNYLE9BQU87UUFDTCxJQUFJLEVBQUU7WUFDSixPQUFPLENBQUMsQ0FBQztRQUNYLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9