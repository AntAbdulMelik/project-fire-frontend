import { useState, useLayoutEffect, useRef } from "react";

import { arrow } from "assets/media";

type Props = {
  handleYearSelect: (year: string) => void;
  label: string;
  options: string[];
  defaultValue: string;
};

const FilterSelector = ({
  handleYearSelect,
  label,
  options,
  defaultValue,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useLayoutEffect(() => {
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [ref]);

  return (
    <div className="flex items-center">
      <span className="mr-4 font-gilroy-bold text-[22px] font-bold leading-[30px] text-deep-forest">
        Filter:
      </span>
      <div
        ref={ref}
        className={`relative flex w-auto cursor-pointer items-center justify-between gap-[10px] rounded-md border ${
          isSelectorOpen ? "border-sage-green" : "border-ashen-grey"
        } py-2 pl-[12px] pr-[10px]`}
        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
      >
        <span className="font-gilroy-bold text-base font-bold text-hunter-green">
          {selectedValue}
        </span>

        <img
          className={`transition ${isSelectorOpen ? "rotate-180" : ""}`}
          src={arrow}
          alt="Down icon"
        />
        {isSelectorOpen && (
          <div
            className="absolute right-0 z-10 flex w-[150px] flex-col overflow-hidden rounded-md border border-ashen-grey bg-white"
            style={{ top: height }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={`border-b border-ashen-grey py-2 pl-[12px] pr-[10px] font-gilroy-medium text-base font-medium text-hunter-green ${
                  selectedValue === option
                    ? "bg-frosty-lagoon font-gilroy-semi-bold font-semibold"
                    : "bg-white font-gilroy-medium font-medium"
                }`}
                onClick={() => {
                  setSelectedValue(option);
                  handleYearSelect(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSelector;
