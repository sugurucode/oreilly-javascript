// 1. if-elseバージョン
export const is31DaysIfElse = (month) => {
    if (month === 'Jan' ||
        month === 'Mar' ||
        month === 'May' ||
        month === 'Jul' ||
        month === 'Aug' ||
        month === 'Oct' ||
        month === 'Dec') {
        return true;
    }
    else {
        return false;
    }
};
// 2. switchバージョン
export const is31DaysSwitch = (month) => {
    switch (month) {
        case 'Jan':
        case 'Mar':
        case 'May':
        case 'Jul':
        case 'Aug':
        case 'Oct':
        case 'Dec':
            return true;
        default:
            return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlQSxrQkFBa0I7QUFDbEIsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBWSxFQUFXLEVBQUU7SUFDdEQsSUFDRSxLQUFLLEtBQUssS0FBSztRQUNmLEtBQUssS0FBSyxLQUFLO1FBQ2YsS0FBSyxLQUFLLEtBQUs7UUFDZixLQUFLLEtBQUssS0FBSztRQUNmLEtBQUssS0FBSyxLQUFLO1FBQ2YsS0FBSyxLQUFLLEtBQUs7UUFDZixLQUFLLEtBQUssS0FBSyxFQUNmLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsaUJBQWlCO0FBQ2pCLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQVksRUFBVyxFQUFFO0lBQ3RELFFBQVEsS0FBSyxFQUFFLENBQUM7UUFDZCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUs7WUFDUixPQUFPLElBQUksQ0FBQztRQUNkO1lBQ0UsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUMsQ0FBQyJ9