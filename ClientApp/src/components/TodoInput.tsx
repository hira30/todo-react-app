import { Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent } from "react";

type Props = {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
};

export const TodoInput = ({ text, onChange, onClick }: Props) => {
  return (
    <>
      <TextField
        sx={{ width: "100%", maxWidth: 280, marginRight: 1 }}
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
