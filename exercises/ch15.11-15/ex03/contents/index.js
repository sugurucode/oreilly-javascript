const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

// ページの読み込みが完了したら実行される
document.addEventListener('DOMContentLoaded', async () => {
  // document.cookieプロパティをconsole.logで出力
  console.log(document.cookie);

  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  try {
    // fetchはデフォルトでGETメソッドを使用する
    const res = await fetch('http://localhost:3001/api/tasks', {
      mode: 'cors',
      credentials: 'include',
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const data = await res.json();
    // 取得したタスクを appendToDoItem で ToDo リストの要素として追加
    data.items.forEach((task) => {
      appendToDoItem(task);
    });
  } catch (error) {
    // エラー時は alert で表示
    alert(error.message);
  }
});

// new-todo-form が送信された際に実行される
form.addEventListener('submit', (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // // 理由: フォーム送信によるページの再読み込みを防ぐため
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === '') {
    return;
  }

  // new-todo の中身は空にする
  input.value = '';

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  const createTask = async (name) => {
    try {
      // fetchはデフォルトでGETメソッドを使用するため、POSTメソッドを指定
      const res = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        //content-typeで「今から送る Body（中身）はこういう形式（JSONなど）ですよ」とサーバーに伝える
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      console.log(res);
      console.log(res.status); // 201

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const task = await res.json();
      appendToDoItem(task);
    } catch (error) {
      alert(error.message);
    }
  };

  createTask(todo);
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement('li');

  const label = document.createElement('label');
  label.textContent = task.name;
  // label.style.textDecorationLine = 'none';
  label.style.textDecorationLine = task.status === 'completed' ? 'line-through' : 'none';

  const toggle = document.createElement('input');
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = 'checkbox';
  // task.status が 'completed' ならチェックを入れる
  toggle.checked = task.status === 'completed';
  toggle.addEventListener('change', async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: toggle.checked ? 'completed' : 'active',
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      // 成功したら label の装飾を変更
      label.style.textDecorationLine = toggle.checked ? 'line-through' : 'none';
    } catch (error) {
      alert(error.message);
      // 課題要件：エラー時はTODOリストの表示を更新させない
      toggle.checked = !toggle.checked;
    }
  });

  const destroy = document.createElement('button');
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  // textContentにDeleteを設定することでボタンに「Delete」と表示される
  destroy.textContent = 'Delete';
  destroy.addEventListener('click', async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      // 成功したら elem を削除
      elem.remove();
    } catch (error) {
      alert(error.message);
    }
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);

  // #todo-list の先頭に elem を追加
  list.prepend(elem);
}
