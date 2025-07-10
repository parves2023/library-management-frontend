import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/mode-toggle";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/features/counter/counterSlice";
import type { RootState } from "./app/store";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div className="m-20">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={()=>{
          dispatch(increment())
        }}>Click me to increment</Button>
        <ModeToggle />
      </div>
      <h1 className="text-2xl font-bold">Welcome to the App</h1>
      <p>This is a simple application demonstrating routing and theming.</p>

      <br />
      <hr />
      <div>
        <button
          className="mr-2 p-2 bg-blue-500 text-white rounded"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="text-lg font-semibold">{count}</span>
        <button
          className="ml-2 p-2 bg-red-500 text-white rounded"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
