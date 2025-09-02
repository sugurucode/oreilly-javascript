// ...existing code...
import { AlarmClock } from './index.ts';

describe('AlarmClock アラームセット中の状態遷移', () => {
  let clock: AlarmClock;

  beforeEach(() => {
    clock = new AlarmClock();
    clock.setAlarm(); // 通常 → アラームセット中
  });

  test('cancelAlarmで通常に戻る', () => {
    expect(clock.cancelAlarm()).toBe('none');
    // 状態がnormalに戻ることも確認
    expect(clock.setAlarm()).toBe('none'); // 再度セットできる
  });

  test('reachedToAlarmTimeでアラーム鳴動中へ', () => {
    expect(clock.reachedToAlarmTime()).toBe('soundAlarm');
  });

  test('snoozeは何も起こらない', () => {
    expect(clock.snooze()).toBe('none');
  });

  test('elapseSnoozeTimeは何も起こらない', () => {
    expect(clock.elapseSnoozeTime()).toBe('none');
  });
});
