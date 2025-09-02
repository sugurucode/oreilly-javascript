import {
  AlarmClock,
  NormalState,
  AlarmSetState,
  AlarmSoundingState,
  SnoozingState,
} from './index.ts';

describe('AlarmClock State Transitions Improved - refined', () => {
  test('NormalState - setAlarm', () => {
    const clock = new AlarmClock(new NormalState());
    expect(clock.setAlarm()).toBe('none');
  });

  test('NormalState - cancelAlarm', () => {
    const clock = new AlarmClock(new NormalState());
    expect(clock.cancelAlarm()).toBe('none');
  });

  test('AlarmSetState - reachedToAlarmTime', () => {
    const clock = new AlarmClock(new AlarmSetState());
    expect(clock.reachedToAlarmTime()).toBe('soundAlarm');
  });

  test('AlarmSetState - cancelAlarm', () => {
    const clock = new AlarmClock(new AlarmSetState());
    expect(clock.cancelAlarm()).toBe('none');
  });

  test('AlarmSoundingState - snooze', () => {
    const clock = new AlarmClock(new AlarmSoundingState());
    expect(clock.snooze()).toBe('stopAlarm');
  });

  test('AlarmSoundingState - cancelAlarm', () => {
    const clock = new AlarmClock(new AlarmSoundingState());
    expect(clock.cancelAlarm()).toBe('stopAlarm');
  });

  test('SnoozingState - elapseSnoozeTime', () => {
    const clock = new AlarmClock(new SnoozingState());
    expect(clock.elapseSnoozeTime()).toBe('soundAlarm');
  });

  test('SnoozingState - cancelAlarm', () => {
    const clock = new AlarmClock(new SnoozingState());
    expect(clock.cancelAlarm()).toBe('none');
  });
});
