import { Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent } from "react";

type Props = {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
};

// インプットボックスとボタンのコンポーネント
export const TodoInput = ({ text, onChange, onClick }: Props) => {
  return (
    <>
      <TextField
        sx={{ width: "100%", maxWidth: 270, marginRight: 2, marginBottom: 2 }}
        size="small"
        variant="outlined"
        onChange={onChange}
        value={text}
      />
      <Fab size="small" color="primary" onClick={onClick}>
        <AddIcon />
      </Fab>
    </>
  );
};
