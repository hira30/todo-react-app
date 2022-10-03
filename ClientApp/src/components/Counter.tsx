import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h1>Counter</h1>

      <p>シンプルカウンター</p>

      <p aria-live="polite">
        現在の値: <strong>{count}</strong>
      </p>

      <button className="btn btn-primary" onClick={increment}>
        +
      </button>
    </div>
  );
};
