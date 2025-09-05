type Action = 'none' | 'soundAlarm' | 'stopAlarm';

interface State {
  setAlarm(clock: AlarmClock): Action;
  cancelAlarm(clock: AlarmClock): Action;
  reachedToAlarmTime(clock: AlarmClock): Action;
  snooze(clock: AlarmClock): Action;
  elapseSnoozeTime(clock: AlarmClock): Action;
}

export class AlarmClock {
  private state: State; // 初期状態を外部から受け取れるように（デフォルトは NormalState）

  constructor(initialState?: State) {
    this.state = initialState ?? new NormalState();
  }

  setState(state: State) {
    this.state = state;
  }

  setAlarm(): Action {
    return this.state.setAlarm(this);
  }

  cancelAlarm(): Action {
    return this.state.cancelAlarm(this);
  }

  reachedToAlarmTime(): Action {
    return this.state.reachedToAlarmTime(this);
  }

  snooze(): Action {
    return this.state.snooze(this);
  }

  elapseSnoozeTime(): Action {
    return this.state.elapseSnoozeTime(this);
  }
}

class NormalState implements State {
  setAlarm(clock: AlarmClock): Action {
    clock.setState(new AlarmSetState());
    return 'none';
  }
  cancelAlarm(): Action {
    return 'none';
  }
  reachedToAlarmTime(): Action {
    return 'none';
  }
  snooze(): Action {
    return 'none';
  }
  elapseSnoozeTime(): Action {
    return 'none';
  }
}
// アラームセット中に
class AlarmSetState implements State {
  setAlarm(): Action {
    return 'none';
  }
  // アラーム解除
  cancelAlarm(clock: AlarmClock): Action {
    clock.setState(new NormalState());
    return 'none';
  }
  // アラーム設定時刻到達
  reachedToAlarmTime(clock: AlarmClock): Action {
    clock.setState(new AlarmSoundingState());
    return 'soundAlarm';
  }
  // スヌーズ
  snooze(): Action {
    return 'none';
  }

  //
  elapseSnoozeTime(): Action {
    return 'none';
  }
}

class AlarmSoundingState implements State {
  setAlarm(): Action {
    return 'none';
  }
  cancelAlarm(clock: AlarmClock): Action {
    clock.setState(new NormalState());
    return 'stopAlarm';
  }
  reachedToAlarmTime(): Action {
    return 'none';
  }
  snooze(clock: AlarmClock): Action {
    clock.setState(new SnoozingState());
    return 'stopAlarm';
  }
  elapseSnoozeTime(): Action {
    return 'none';
  }
}

class SnoozingState implements State {
  setAlarm(): Action {
    return 'none';
  }
  cancelAlarm(clock: AlarmClock): Action {
    clock.setState(new NormalState());
    return 'none';
  }
  reachedToAlarmTime(): Action {
    return 'none';
  }
  snooze(): Action {
    return 'none';
  }
  elapseSnoozeTime(clock: AlarmClock): Action {
    clock.setState(new AlarmSoundingState());
    return 'soundAlarm';
  }
}

// テストで便利なので状態クラスをエクスポートする場合はここでexportを追加しても良いです。
export { NormalState, AlarmSetState, AlarmSoundingState, SnoozingState };
