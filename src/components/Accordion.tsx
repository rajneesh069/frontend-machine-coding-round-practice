import { useState } from "react";

export interface ItemsProp {
  title: string;
  description: string;
}

export default function Accordion({ items }: { items: ItemsProp[] }) {
  const [active, setActive] = useState<number>(-1);
  return (
    <div className="flex flex-col gap-2 h-[90vh] justify-center items-center">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border border-white flex flex-col flex-wrap gap-1 p-2 w-[80vw] md:w-[70vw]"
        >
          <div className="flex justify-between items-center gap-2">
            <h4 className="text-lg">{item.title}</h4>
            <button
              onClick={() => {
                setActive((prev) => (prev === idx ? -1 : idx));
              }}
            >
              {active === idx ? "-" : "+"}
            </button>
          </div>
          <p className={`${active === idx ? "" : "hidden"} w-full text-sm`}>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
