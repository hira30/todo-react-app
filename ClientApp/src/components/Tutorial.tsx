import { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { TodoList } from "./Tutorial_List";
import { TodoInput } from "./Tutorial_Input";

export type TodoItem = {
  id?: number;
  name: string;
  isComplete: boolean;
};

// Todoコンポーネント
export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState("");

  // テキストボックス入力時の処理
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 追加ボタンクリック時の処理
  const handleAdd = async () => {
    // 新しいTodoアイテムオブジェクトを作成（idはDB側で自動採番するため省略）
    const newTodo = { name: text, isComplete: false };

    await axios
      .post("api/todoitems", newTodo)
      .then((response: AxiosResponse<TodoItem>) => {
        const { data } = response;
        setTodos([...todos, data]);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
    setText("");
  };

  // 完了ステータス変更時の処理
  const handleChangeStatus = async (id?: number) => {
    // 対象のTodoアイテムの完了フラグを反転する
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    // 更新対象のTodoアイテムを取得
    const targetTodo = newTodos.filter((todo) => todo.id === id)[0];

    await axios
      .put(`api/todoitems/${id}`, targetTodo)
      .then(() => {
        setTodos(newTodos);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  // 削除ボタンクリック時の処理
  const handleDelete = async (id?: number) => {
    await axios
      .delete(`api/todoitems/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  // ページ初期表示時の処理
  useEffect(() => {
    // APIからTodoデータを取得してstateに格納する
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
      <TodoInput text={text} onChange={handleChangeInput} onClick={handleAdd} />
      <TodoList
        todos={todos}
        onChange={handleChangeStatus}
        onClick={handleDelete}
      />
    </div>
  );
};
