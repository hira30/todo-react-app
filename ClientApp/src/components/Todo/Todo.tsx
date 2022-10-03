import { useCallback, useEffect, useState } from "react";

export const Todo = () => {
  const [text, setText] = useState<string>("");
  const [todoItems, setTodoItems] = useState<string[]>([]);
  const todos = [
    {
      id: 1,
      name: "筋トレ",
    },
    {
      id: 2,
      name: "勉強",
    },
  ];

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickRegister = () => {
    setTodoItems((prevItems) => {
      return [...prevItems, text];
    });
    setText("");
  };

  // const onClickDelete = useCallback(async () => {
  //   const res = await fetch("https://example.com/api/users/XXX");
  //   if (!res.ok) {
  //     throw new Error(`unexpected status: ${res.status}`);
  //   }
  //   const data = await res.body();
  //   // アンマウントされた後に setName するとメモリ開放の妨げになるため、デバッガーに警告が出る
  //   if (!unmountRef.current) {
  //     setName(data.name);
  //   }
  // }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch("TodoApi");
  //     const data = await response.json();
  //     useState({ todos: data, loading: false });
  //   };
  //   getData();
  // }, []);

  return (
    <>
      <div>
        <input value={text} onChange={onChangeInput} />
        <button onClick={onClickRegister}>登録</button>
      </div>
      <div>
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>タイトル</th>
              <th>メモ</th>
              <th>完了</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.name}</td>
                <td>{todo.name}</td>
                <td>
                  <button>完了</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
