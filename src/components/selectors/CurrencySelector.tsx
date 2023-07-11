import { useState, useLayoutEffect, useRef } from "react";

import { chevronDown } from "assets/media";

type Props = {
  height: number;
  selectedCurrency: string;
  handleCurrencySelection: (currency: string) => void;
};

const CurrencySelector = ({
  height,
  selectedCurrency,
  handleCurrencySelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [isCurrencySelectorOpen, setIsCurrencySelectorOpen] = useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
  }, [isCurrencySelectorOpen]);

  return (
    <div
      ref={ref}
      className="relative z-10 flex cursor-pointer items-center justify-between gap-2 self-end rounded-md border border-misty-moonstone px-4 py-2"
      style={{ height }}
      onClick={() => setIsCurrencySelectorOpen(!isCurrencySelectorOpen)}
    >
      <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
        {selectedCurrency}
      </span>
      <img
        className={`transition ${isCurrencySelectorOpen ? "rotate-180" : ""}`}
        src={chevronDown}
        alt="Down icon"
      />
      {isCurrencySelectorOpen && (
        <div
          className="absolute left-0 z-10 flex flex-col overflow-hidden rounded-md border border-t-0 border-misty-moonstone bg-white text-center"
          style={{ width, top: height }}
        >
          <div
            className="py-2 font-gilroy-regular text-sm font-normal text-slate-mist hover:bg-misty-moonstone"
            onClick={() => handleCurrencySelection("USD")}
          >
            USD
          </div>
          <div
            className="py-2 font-gilroy-regular text-sm font-normal text-slate-mist hover:bg-misty-moonstone"
            onClick={() => handleCurrencySelection("EUR")}
          >
            EUR
          </div>
          <div
            className="py-2 font-gilroy-regular text-sm font-normal text-slate-mist hover:bg-misty-moonstone"
            onClick={() => handleCurrencySelection("BAM")}
          >
            BAM
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
