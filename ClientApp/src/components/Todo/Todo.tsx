import { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

type TodoItem = {
  id?: number;
  name: string;
  isComplete: boolean;
};

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);

  // 追加ボタンクリック
  const handleClickAdd = async () => {
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

  // 追加テキストボックス変更時
  const handleChangeAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 編集モード
  const handleClickName = () => {
    setEditMode(true);
  };

  // アイテム名変更時
  const handleChangeName = (name: string, id?: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.name = name;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // ステータス変更
  const handleChangeStatus = (id?: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // 保存ボタンクリック時
  const handleSave = async (id?: number) => {
    const targetTodo = todos.filter((todo) => todo.id === id)[0];

    await axios
      .put(`api/todoitems/${id}`, targetTodo)
      .then(() => {
        setTodos(todos);
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
          console.log(response);
          const { data } = response;
          setTodos([...todos, ...data]);
        })
        .catch((e: AxiosError) => {
          console.error(e);
        });
      setLoading(false);
    }
    fetchTodoData();
  }, []);

  const renderTodoTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>アイテム</th>
            <th>ステータス</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                {!editMode ? (
                  <span onClick={handleClickName}>{todo.name}</span>
                ) : (
                  <input
                    type="text"
                    value={todo.name}
                    onChange={() => {
                      handleChangeName(todo.name, todo.id);
                    }}
                  />
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={(e) => {
                    handleChangeStatus(todo.id);
                  }}
                />
              </td>
              <td>
                <button type="button" onClick={() => handleSave(todo.id)}>
                  保存
                </button>
              </td>
              <td>
                <button type="button" onClick={() => handleDelete(todo.id)}>
                  削除
                </button>
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
        <input type="text" onChange={handleChangeAdd} value={text} />
        <button onClick={handleClickAdd}>追加</button>
        {loading ? <p>Loading...</p> : renderTodoTable()}
      </div>
    </>
  );
};
