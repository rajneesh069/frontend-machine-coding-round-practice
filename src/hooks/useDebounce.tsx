import { useEffect, useState } from "react";

export default function useDebounce(input: string, delay: number) {
  const [state, setState] = useState("");

  useEffect(() => {
    // if you want a useEffect to stop simply on a condition return it before any other logic runs
    const timeoutId = setTimeout(() => {
      setState(input);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, input]);

  return state;
}
