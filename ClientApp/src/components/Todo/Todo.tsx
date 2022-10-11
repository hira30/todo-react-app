import { useState, useEffect, ChangeEvent } from "react";

type TodoItem = {
  id: number;
  name: string;
  isComplete: boolean;
};

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  // 追加ボタンクリック時
  const handleAdd = () => {
    setTodos([...todos, {id: 5, name:text, isComplete: false}])
    setText("");
  }

  // テキストボックス
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  // Todo名を変更したときのイベント
  const handleEdit = () => {
    console.log(`変更されたID:`);
  }

  // 完了ボタンをクリックされたら削除する
  const handleDelete = () => {
    console.log(`変更されたID:`);
  }

  // ページ表示時にWeb APIからデータを取得する
  useEffect(() => {
    async function fetchTodoData() {
      try {
        const response = await fetch("api/todo");
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodoData();
  }, []);

  const renderTodoTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>完了</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input
                  type="text"
                  value={todo.name}
                  onChange={handleEdit}
                /></td>
              <td>
                <button
                  type="button"
                  onClick={handleDelete}
                >削除</button>
              </td>
              <td>
              <button
                  type="button"
                  onClick={handleEdit}
                >保存</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div>
        <h1 id="tabelLabel">Todoリスト</h1>
        <input type="text" onChange={handleChange} value={text}/>
        <button onClick={handleAdd}>追加</button>
        {loading ? <p>Loading...</p> : renderTodoTable()}
      </div>
    </>
  );
};
