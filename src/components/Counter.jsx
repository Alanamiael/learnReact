import React from "react";
import { useState } from "react";
//компонент всегда должен называться также как и файл и начинаться с большой буквы
const Counter = function () {
  //совершенно неважно что это за ф-ция,но она обязательно должна возвращать jsx
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count - 1);
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
