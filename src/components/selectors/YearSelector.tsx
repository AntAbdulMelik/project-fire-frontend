import { useState, useLayoutEffect, useRef } from "react";

import { chevronDown } from "assets/media";

type Props = {
  selectedYear: string;
  handleYearSelection: (year: string) => void;
};

const YearSelector = ({ selectedYear, handleYearSelection }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);

  useLayoutEffect(() => {
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [ref]);

  return (
    <div className="flex items-center">
      <span className="mr-4 font-gilroy-bold text-[22px] font-bold leading-[30px] text-deep-forest">
        Year:
      </span>
      <div
        ref={ref}
        className={`relative flex w-[110px] cursor-pointer items-center justify-between gap-[10px] rounded-md border ${
          isYearSelectorOpen ? "border-sage-green" : "border-ashen-grey"
        } py-2 pl-[12px] pr-[10px]`}
        onClick={() => setIsYearSelectorOpen(!isYearSelectorOpen)}
      >
        <span className="font-gilroy-bold text-base font-bold text-hunter-green">
          {selectedYear}
        </span>
        <img
          className={`transition ${isYearSelectorOpen ? "rotate-180" : ""}`}
          src={chevronDown}
          alt="Down icon"
        />
        {isYearSelectorOpen && (
          <div
            className="absolute right-0 z-10 flex w-[150px] flex-col overflow-hidden rounded-md border border-ashen-grey bg-white"
            style={{ top: height }}
          >
            <div
              className={`border-b border-ashen-grey py-2 pl-[12px] pr-[10px] font-gilroy-medium text-base font-medium text-hunter-green ${
                selectedYear === "2021"
                  ? "bg-frosty-lagoon font-gilroy-semi-bold font-semibold"
                  : "bg-white font-gilroy-medium font-medium"
              }`}
              onClick={() => handleYearSelection("2021")}
            >
              2021
            </div>
            <div
              className={`border-b border-ashen-grey py-2 pl-[12px] pr-[10px] font-gilroy-medium text-base font-medium text-hunter-green ${
                selectedYear === "2022"
                  ? "bg-frosty-lagoon font-gilroy-semi-bold font-semibold"
                  : "bg-white font-gilroy-medium font-medium"
              }`}
              onClick={() => handleYearSelection("2022")}
            >
              2022
            </div>
            <div
              className={`py-2 pl-[12px] pr-[10px] font-gilroy-medium text-base font-medium text-hunter-green ${
                selectedYear === "2023"
                  ? "bg-frosty-lagoon font-gilroy-semi-bold font-semibold"
                  : "bg-white font-gilroy-medium font-medium"
              }`}
              onClick={() => handleYearSelection("2023")}
            >
              2023
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearSelector;
