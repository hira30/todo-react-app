import { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export type TodoItem = {
  id?: number;
  name: string;
  isComplete: boolean;
};

// MUI適用＆コンポーネント分割後
export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState("");

  // テキストボックス変更
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 追加ボタンクリック
  const handleAdd = async () => {
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

  // ステータス変更
  const handleChangeStatus = async (id?: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

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

  // 削除ボタンクリック
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

  // ページ表示時にAPIからデータを取得する
  useEffect(() => {
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
