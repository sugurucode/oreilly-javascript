// @flow

export type User = { id: number, name: string };
export type Task = { title: string, completed: boolean, user: User };
export type Priority = "low" | "middle" | "high";
export type PriorityTask = Task & { priority: Priority };

// Userオブジェクトであることを判定する（%checks でFlowに型推論を指示）
export function isUserObject(obj: any): boolean %checks {
  return (
    typeof obj === 'object' &&
    typeof obj['id'] === 'number' &&
    typeof obj['name'] === 'string'
  );
}

export class TaskManager {
  _tasks: Array<PriorityTask> = [];

  // タスクを追加する
  add(task: PriorityTask): void {
    this._tasks.push(task);
  }

  // タスクを完了にする
  completeTask(target: User | string): void {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  getTasks(predicate?: (task: PriorityTask) => boolean): Array<PriorityTask> {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
  return priorityTask.priority === 'low' || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg: T) => !f(arg);
}