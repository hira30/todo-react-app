// import { Todo } from "./components/Todo";
// import { Todo } from "./components/Tutorial";
import { Todo } from "./components/TodoWithMui";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<Todo />);
