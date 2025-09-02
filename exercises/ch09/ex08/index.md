# GoF Stateパターンとは

Stateパターンは、Gang of Four（GoF）が提唱した行動に関するデザインパターンの一つで、オブジェクトの内部状態が変化した時にその振る舞いを変更することを可能にします。
このパターンの核となる考え方は、状態に関連した振る舞いを個別の状態クラスへ抽出し、元のオブジェクトが作業を自分で行わず、これらのクラスのインスタンスに委任することです。

# 煩雑さとは

これが全状態ごとに繰り返されると、ほぼテストごとにこの「状態を準備するコード」が大量に追加されてしまいます。

```ts
// alarmSet状態テストのための前段階設定
clock.setAlarm(); // normal->alarmSet

// alarmSet状態での動作テストを続ける...
expect(clock.reachedToAlarmTime()).toBe('soundAlarm'); // alarmSoundingへ遷移
```
