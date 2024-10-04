import { useState } from "react";

export default function Calculator({
  calculatorButtons,
}: {
  calculatorButtons: string[][];
}) {
  const [expression, setExpression] = useState<string>("");

  const handleClick = (calcButton: string) => {
    switch (calcButton) {
      case "<-":
        setExpression((prev) =>
          prev === "Invalid SYNTAX" ? "0" : prev.substring(0, prev.length - 1)
        );
        break;
      case "=":
        setExpression(() => {
          try {
            return String(eval(expression));
          } catch (error) {
            console.error(error);
            return "Invalid SYNTAX";
          }
        });
        break;
      case "C":
        setExpression("0");
        break;
      default:
        setExpression((prev) =>
          prev === "0" ? calcButton : prev.concat(calcButton)
        );
        break;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-2">
      <div
        id="calc-screen"
        className="bg-black w-[18vw] min-h-[8vh] rounded-md p-3 flex items-center"
      >
        <h1 className="text-4xl text-white overflow-x-scroll overflow-y-hidden">
          {expression}
        </h1>
      </div>
      <div id="calc-buttons">
        {calculatorButtons.map((calcButtons, idx) => (
          <div key={idx} className="flex flex-row">
            {calcButtons.map((calcButton) => (
              <button
                key={calcButton}
                className="m-0.5 w-[50px] flex justify-center px-1"
                onClick={() => {
                  handleClick(calcButton);
                }}
              >
                {calcButton}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
