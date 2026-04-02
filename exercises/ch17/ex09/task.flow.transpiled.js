//      

// # 1. task.flow.jsをトランスパイル（型アノテーションを削除）
// npx flow-remove-types ex09/task.flow.js -o ex09/task.flow.transpiled.js

// # 2. caller.jsをトランスパイル
// npx flow-remove-types ex09/caller.js -o ex09/caller.transpiled.js

// # 3. 実行
// node ex09/caller.transpiled.js


                                                
                                                                     
                                                 
                                                         

// Userオブジェクトであることを判定する
export function isUserObject(obj     )          {
  return (
    typeof obj === 'object' &&
    typeof obj['id'] === 'number' &&
    typeof obj['name'] === 'string'
  );
}



export class TaskManager {
  _tasks                      = [];

  // タスクを追加する
  add(task              )       {
    this._tasks.push(task);
  }

  // タスクを完了にする
  completeTask(target               )       {
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
  getTasks(predicate                                  )                      {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask              )          {
  return priorityTask.priority === 'low' || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
export function not(f                                )                                 {
  return (arg) => !f(arg);
}
