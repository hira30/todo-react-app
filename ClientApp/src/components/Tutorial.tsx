import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// TodoItemの型宣言
type TodoItem = {
  id?: number;
  name: string;
  isComplete: boolean;
};

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // ページ初期表示時の処理
  useEffect(() => {
    // APIからデータを取得してstateにセットする
    async function fetchTodoData() {
      await axios
        .get("api/todoitems")
        .then((response: AxiosResponse<TodoItem[]>) => {
          const { data } = response;
          setTodos([...data]);
        })
        .catch((e: AxiosError) => {
          console.error(e);
        });
    }
    fetchTodoData();
  }, []);

  return (
    <div>
      <h1>Todoリスト</h1>
      <input type="text" />
      <button>追加</button>
      <ul>
        {/* todoアイテムの配列を展開 */}
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" />
            {/* 完了フラグがtrueの場合は取り消し線を表示 */}
            {todo.isComplete ? (
              <span style={{ textDecorationLine: "line-through" }}>
                {todo.name}
              </span>
            ) : (
              <span>{todo.name}</span>
            )}
            <button>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
