import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function AutoComplete() {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<string[]>(["Loading...."]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedResult, setSelectedResult] = useState<string>("");

  const debouncedValue = useDebounce(input, 250);

  useEffect(() => {
    (async function () {
      const res = await fetch("./autocomplete.json");
      const items: string[] = await res.json();
      setData(items);
    })();

    return () => {};
  }, []);

  /*  // For type to search   
useEffect(() => {
    const values = data.filter((val) => {
      try {
        const regex = new RegExp(`\\b${debouncedValue.toLowerCase()}`, "i");
        return regex.test(val);
      } catch (error) {
        console.error(error);
        return false;
      }
    });

    if (values.length === 0) {
      setSearchResults(["No Result Found."]);
    } else {
      setSearchResults(values);
    }
  }, [data, debouncedValue]); */

  return (
    <div className="h-[90vh] flex flex-col gap-1 justify-center items-center">
      <input
        id="search-input"
        className="min-w-[25vw] bg-white text-black caret-inherit"
        placeholder="Press Enter To Search..."
        value={input}
        onChange={(e) => {
          const { value } = e.target;
          setInput(value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            setSearchResults([]);
            setInput("");
          } else if (e.key === "Enter") {
            const values = data.filter((val) => {
              try {
                const regex = new RegExp(
                  `\\b${debouncedValue.toLowerCase()}`,
                  "i"
                );
                return regex.test(val);
              } catch (error) {
                console.error(error);
                return false;
              }
            });

            if (values.length === 0) {
              setSearchResults(["No Result Found."]);
            } else {
              setSearchResults(values);
            }
          }
        }}
      />
      <div
        id="autocomplete-list"
        className="bg-white min-w-[25vw] h-[50vh] border-2 border-black overflow-y-scroll"
      >
        {searchResults.length === 0
          ? data.map((el, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1 text-black border-2 items-center border-b-gray-500 cursor-pointer"
              >
                <p
                  onClick={() => {
                    setSelectedResult(el);
                    setInput("");
                    setSearchResults([]);
                  }}
                >
                  {el}
                </p>
              </div>
            ))
          : searchResults.map((val, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1 text-black border-2 items-center border-b-gray-500 cursor-pointer"
              >
                <p
                  onClick={() => {
                    setSelectedResult(val);
                    setInput("");
                    setSearchResults([]);
                  }}
                >
                  {val}
                </p>
              </div>
            ))}
      </div>

      <div>Selected Result: {selectedResult}</div>
    </div>
  );
}
