import { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Checkbox,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

type TodoItem = {
  id?: number;
  name: string;
  isComplete: boolean;
};

// MUI適用＆コンポーネント分割前
export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState("");

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

  // テキストボックス変更
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
      <TextField
        sx={{ width: "100%", maxWidth: 280, marginRight: 1 }}
        size="small"
        variant="outlined"
        onChange={handleChangeInput}
        value={text}
      />
      <Fab size="small" color="primary" onClick={handleAdd}>
        <AddIcon />
      </Fab>

      <List sx={{ width: "100%", maxWidth: 300 }}>
        {todos.map((todo) => {
          return (
            <ListItem key={todo.id} disablePadding>
              <ListItemButton>
                <Checkbox
                  checked={todo.isComplete}
                  onChange={() => {
                    handleChangeStatus(todo.id);
                  }}
                />
                <ListItemText>
                  {todo.isComplete ? (
                    <span style={{ textDecorationLine: "line-through" }}>
                      {todo.name}
                    </span>
                  ) : (
                    <span>{todo.name}</span>
                  )}
                </ListItemText>
                <Fab
                  size="small"
                  color="error"
                  onClick={() => handleDelete(todo.id)}
                >
                  <DeleteIcon />
                </Fab>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
