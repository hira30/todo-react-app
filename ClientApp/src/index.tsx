// import { Todo } from "./components/Todo/Todo";
import { Todo } from "./components/Todo/TodoWithMui";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<Todo />);
