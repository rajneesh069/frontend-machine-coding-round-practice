import { useEffect, useRef, useState } from "react";

export default function CustomModal({
  title = "",
  description = "",
}: {
  title: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen]);

  return (
    <div className={`flex justify-center items-center h-[90vh] relative`}>
      <button
        disabled={isOpen}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Click to Open
      </button>

      {isOpen && (
        <div
          /* to blur the bg */
          ref={ref}
          tabIndex={0} // div is not focusable at all even using JS(programatically), so keep it in focus order we need to set tabIndex
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
          onClick={(e) => {
            if (e.target === ref.current) {
              setIsOpen(false);
            }
          }}
        >
          <div className="flex justify-center rounded-md">
            {/* to bring the content in center(focus) */}
            <div className="absolute top-[40%] flex flex-col gap-2 border-2 border-gray-400 p-4 rounded-md">
              {/* to modify the content */}
              {title && <h1 className="text-white text-4xl">{title}</h1>}
              {description && (
                <p className="text-white text-xl">{description}</p>
              )}
              <button
                className="self-end"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
