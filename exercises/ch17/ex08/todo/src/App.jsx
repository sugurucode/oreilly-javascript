import React, { useState } from 'react';

export default function App() {
  // ToDoリストの状態管理（要素は { id, text, completed } のオブジェクト）
  const [todos, setTodos] = useState([]);
  // 入力フォームの状態管理
  const [inputText, setInputText] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // ページリロードを防ぐ
    
    const trimmedText = inputText.trim();
    if (trimmedText === '') {
      return;
    }

    // 新しいToDoを作成
    const newTodo = {
      id: crypto.randomUUID(), // 一意のIDを生成 (Date.now()などでも可)
      text: trimmedText,
      completed: false,
    };

    // 元の prepend() の挙動に合わせるため、新しい要素を配列の「先頭」に追加する
    setTodos([newTodo, ...todos]);
    
    // 入力欄をクリア
    setInputText('');
  };

  // チェックボックス切り替え時の処理
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        // 全てのtodoを走査。クリックしたtodoのidと一致したら、...todoで既存のプロパティを展開し、completedだけ反転させる。
        // そうでないtodoはそのまま返す。
        // 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // {id:1, text:'...', completed:true} => {id:1, text:'...', completed:false}
      )
    );
  };

  // 削除ボタン押下時の処理
  // destroy.addEventListener('click', () => {...}
  // に相当する処理。クリックされたtodoのidと一致しないものだけを残す。
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      
      <ul id="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* htmlのtoggleに相当する */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {/* htmlのラベルに相当する */}
            <label
              style={{
                // if (toggle.checked) {
                //   label.style.textDecorationLine = 'line-through';
                // } else {
                //   label.style.textDecorationLine = 'none';
                // }
                // 上記の条件式を三項演算子で表現
                textDecorationLine: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </label>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}