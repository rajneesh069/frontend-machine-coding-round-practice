import { useEffect, useState } from "react";

export default function Counter({ delay = 1000 }: { delay: number }) {
  const [count, setCount] = useState<number>(0);
  const [input, setInput] = useState("");
  const [state, setState] = useState<
    "start" | "stop" | "reset" | "pause" | "resume" | "initial"
  >("initial");
  useEffect(() => {
    let timeoutId: number = -1;
    if (count === parseInt(input)) {
      setState("stop");
    }
    if (state === "start" || state === "resume") {
      timeoutId = setTimeout(() => {
        setCount((prev) => prev + 1);
      }, delay);
    } else if (state === "stop") {
      if (timeoutId !== -1) clearTimeout(timeoutId);
      setInput("");
      setState("initial");
    } else if (state === "pause" && timeoutId !== -1) {
      clearTimeout(timeoutId);
    } else if (state === "reset") {
      setCount(0);
      if (timeoutId !== -1) clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, setCount, state, count, setState, input]);
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-[90vh]">
      <h1 className="text-4xl">{count}</h1>
      <input
        className="border border-gray-300 w-[200px]"
        value={input}
        id="counter"
        placeholder="Enter Time (in seconds)"
        disabled={state === "start"}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-col md:flex-row gap-1 border border-gray-300 rounded-md p-1">
        <button
          onClick={() => {
            setState("start");
          }}
        >
          Start
        </button>
        <button onClick={() => setState("stop")}>Stop</button>
        <button
          onClick={() =>
            setState((prev) => (prev === "pause" ? "resume" : "pause"))
          }
        >
          {state === "pause" ? "Resume" : "Pause"}
        </button>
        <button onClick={() => setState("reset")}>Reset</button>
      </div>
    </div>
  );
}
