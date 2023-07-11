import { useState, useLayoutEffect, useRef } from "react";

import { chevronDown } from "assets/media";

type Props = {
  perPage: number;
  handlePerPageSelection: (perPage: number) => void;
};

const PerPageSelector = ({ perPage, handlePerPageSelection }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isPerPageSelectorOpen, setIsPerPageSelectorOpen] = useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isPerPageSelectorOpen]);

  return (
    <div
      ref={ref}
      className="relative flex h-8 w-[54px] cursor-pointer items-center justify-center gap-2 rounded-md border border-misty-moonstone text-center"
      onClick={() => setIsPerPageSelectorOpen(!isPerPageSelectorOpen)}
    >
      {isPerPageSelectorOpen && (
        <div
          className="absolute bottom-[31px] left-0 flex w-[54px] flex-col overflow-hidden rounded-md border border-b-0 border-misty-moonstone bg-white"
          style={{ width, bottom: height }}
        >
          {(() => {
            const arr = [];
            for (let i = 1; i <= 10; i++) {
              arr.push(
                <div
                  key={i}
                  className="py-1 font-opensans-semi-bold text-sm font-semibold text-midnight-steel hover:bg-misty-moonstone"
                  onClick={() => handlePerPageSelection(i)}
                >
                  {i}
                </div>
              );
            }
            return arr;
          })()}
        </div>
      )}
      <span className="font-opensans-semi-bold text-sm font-semibold text-midnight-steel">
        {perPage}
      </span>
      <img
        className={`transition ${isPerPageSelectorOpen ? "rotate-180" : ""}`}
        src={chevronDown}
        alt="Down icon"
      />
    </div>
  );
};

export default PerPageSelector;
