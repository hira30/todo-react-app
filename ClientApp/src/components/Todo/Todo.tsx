import { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosError } from "axios";

type TodoItem = {
  id: number;
  name: string;
  isComplete: boolean;
};

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Todoの追加ボタンクリック時
  const handleClickAdd = () => {
    const newId = todos.length + 1;
    setTodos([...todos, { id: newId, name: text, isComplete: false }]);
    setText("");
  };

  // Todoの追加テキストボックス変更時
  const handleChangeAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Todo名をクリックすると編集モードに
  const handleClickName = () => {
    setEditMode(true);
  };

  // Todo名を変更時
  const handleChangeName = () => {
    console.log(`変更されたID:`);
  };

  // 保存ボタンクリック時（サーバー側にPOST）
  const handleSave = () => {};

  // 削除ボタンクリック（サーバー側にPOST）
  const handleDelete = () => {
    console.log(`ID:`);
  };

  // ページ表示時にWeb APIからデータを取得する
  useEffect(() => {
    async function fetchTodoData() {
      await axios
        .get("api/todoitems")
        .then((response) => {
          console.log(response);
          // setTodos(...response);
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
            <th>タイトル</th>
            <th>完了</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                {editMode ? (
                  <span onClick={handleClickName}>{todo.name}</span>
                ) : (
                  <input
                    type="text"
                    value={todo.name}
                    onChange={handleChangeName}
                  />
                )}
              </td>
              <td>
                <button type="button" onClick={handleSave}>
                  保存
                </button>
              </td>
              <td>
                <button type="button" onClick={handleDelete}>
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
