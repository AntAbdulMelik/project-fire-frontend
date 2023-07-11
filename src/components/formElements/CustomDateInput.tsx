import { forwardRef } from "react";

import { date } from "assets/media";

type Props = {
  value?: any;
  onClick?: any;
  width?: string;
};

const CustomDateInput = forwardRef<HTMLDivElement, Props>(
  ({ value, onClick, width }, ref) => (
    <div
      ref={ref}
      className={`flex ${width} items-center rounded-md border border-misty-moonstone px-3 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist hover:cursor-pointer focus:border-misty-moonstone focus:ring-transparent`}
      onClick={onClick}
    >
      <span className="flex-1">{value}</span>
      <img src={date} alt="Date icon" />
    </div>
  )
);

export default CustomDateInput;
