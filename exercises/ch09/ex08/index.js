export class AlarmClock {
    state; // 初期状態を外部から受け取れるように（デフォルトは NormalState）
    constructor(initialState) {
        this.state = initialState ?? new NormalState();
    }
    setState(state) {
        this.state = state;
    }
    setAlarm() {
        return this.state.setAlarm(this);
    }
    cancelAlarm() {
        return this.state.cancelAlarm(this);
    }
    reachedToAlarmTime() {
        return this.state.reachedToAlarmTime(this);
    }
    snooze() {
        return this.state.snooze(this);
    }
    elapseSnoozeTime() {
        return this.state.elapseSnoozeTime(this);
    }
}
class NormalState {
    setAlarm(clock) {
        clock.setState(new AlarmSetState());
        return 'none';
    }
    cancelAlarm() {
        return 'none';
    }
    reachedToAlarmTime() {
        return 'none';
    }
    snooze() {
        return 'none';
    }
    elapseSnoozeTime() {
        return 'none';
    }
}
// アラームセット中に
class AlarmSetState {
    setAlarm() {
        return 'none';
    }
    // アラーム解除
    cancelAlarm(clock) {
        clock.setState(new NormalState());
        return 'none';
    }
    // アラーム設定時刻到達
    reachedToAlarmTime(clock) {
        clock.setState(new AlarmSoundingState());
        return 'soundAlarm';
    }
    // スヌーズ
    snooze() {
        return 'none';
    }
    //
    elapseSnoozeTime() {
        return 'none';
    }
}
class AlarmSoundingState {
    setAlarm() {
        return 'none';
    }
    cancelAlarm(clock) {
        clock.setState(new NormalState());
        return 'stopAlarm';
    }
    reachedToAlarmTime() {
        return 'none';
    }
    snooze(clock) {
        clock.setState(new SnoozingState());
        return 'stopAlarm';
    }
    elapseSnoozeTime() {
        return 'none';
    }
}
class SnoozingState {
    setAlarm() {
        return 'none';
    }
    cancelAlarm(clock) {
        clock.setState(new NormalState());
        return 'none';
    }
    reachedToAlarmTime() {
        return 'none';
    }
    snooze() {
        return 'none';
    }
    elapseSnoozeTime(clock) {
        clock.setState(new AlarmSoundingState());
        return 'soundAlarm';
    }
}
// テストで便利なので状態クラスをエクスポートする場合はここでexportを追加しても良いです。
export { NormalState, AlarmSetState, AlarmSoundingState, SnoozingState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxNQUFNLE9BQU8sVUFBVTtJQUNiLEtBQUssQ0FBUSxDQUFDLHdDQUF3QztJQUU5RCxZQUFZLFlBQW9CO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBRUQsTUFBTSxXQUFXO0lBQ2YsUUFBUSxDQUFDLEtBQWlCO1FBQ3hCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxXQUFXO1FBQ1QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsTUFBTTtRQUNKLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxnQkFBZ0I7UUFDZCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFDRCxZQUFZO0FBQ1osTUFBTSxhQUFhO0lBQ2pCLFFBQVE7UUFDTixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsU0FBUztJQUNULFdBQVcsQ0FBQyxLQUFpQjtRQUMzQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNsQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsYUFBYTtJQUNiLGtCQUFrQixDQUFDLEtBQWlCO1FBQ2xDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDekMsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUNELE9BQU87SUFDUCxNQUFNO1FBQ0osT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELEVBQUU7SUFDRixnQkFBZ0I7UUFDZCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLGtCQUFrQjtJQUN0QixRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELFdBQVcsQ0FBQyxLQUFpQjtRQUMzQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNsQyxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0Qsa0JBQWtCO1FBQ2hCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBaUI7UUFDdEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDcEMsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNELGdCQUFnQjtRQUNkLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQUVELE1BQU0sYUFBYTtJQUNqQixRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELFdBQVcsQ0FBQyxLQUFpQjtRQUMzQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNsQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWtCO1FBQ2hCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNO1FBQ0osT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGdCQUFnQixDQUFDLEtBQWlCO1FBQ2hDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDekMsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBRUQsaURBQWlEO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxDQUFDIn0=