import { useState, useLayoutEffect, useRef } from "react";

type Props = {
  content: string;
  position: {
    containerWidth: number;
    containerHeight: number;
  };
};

const HoverTooltip = ({ content, position }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  const { containerWidth, containerHeight } = position;

  useLayoutEffect(() => {
    setTooltipWidth(ref.current?.offsetWidth ?? 0);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute z-10 flex items-center justify-center"
      style={{
        bottom: containerHeight * 1.1,
        left: (containerWidth - tooltipWidth) / 2,
      }}
    >
      <div className="h-[23px] whitespace-nowrap rounded bg-black p-2 font-sans text-[11px] font-semibold text-white">
        <div className="flex h-full items-center">
          <p className="z-10 flex-shrink-0 flex-grow text-center">{content}</p>
        </div>
      </div>
      <div className="absolute bottom-0">
        <div className="z-10 h-4 w-4 rotate-45 bg-black" />
      </div>
    </div>
  );
};

export default HoverTooltip;
