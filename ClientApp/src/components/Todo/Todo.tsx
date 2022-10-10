import { useState, useEffect } from "react";

type TodoItem = {
  id: number;
  name: string;
  isComplete: boolean;
};

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);

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
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>完了</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>{todo.isComplete}</td>
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
        <p>サーバーからデータを取得するコンポーネントのサンプル</p>
        {loading ? <p>Loading...</p> : renderTodoTable()}
      </div>
    </>
  );
};
