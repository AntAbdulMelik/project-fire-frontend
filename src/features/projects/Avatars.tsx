import { useState, useLayoutEffect, useRef } from "react";

import HoverTooltip from "components/utils/HoverTooltip";
import Avatar from "components/utils/Avatar";

type Props = {
  images?: (string | undefined)[];
  names?: {
    firstName: string;
    lastName: string;
  }[];
  maxVisibleAvatars?: number;
};

const Avatars = ({ images = [], names = [], maxVisibleAvatars }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showNames, setShowNames] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const overflowCount = Math.max(
    0,
    images.length - (maxVisibleAvatars ? maxVisibleAvatars : images.length)
  );
  const formattedNames = names
    ?.map(({ firstName, lastName }) => `${firstName} ${lastName}`)
    .join(", ");

  useLayoutEffect(() => {
    const adjustWidth = 24; // Adjustment in width due to -space-x-3
    setContainerWidth(ref.current ? ref.current.offsetWidth + adjustWidth : 0);
    setContainerHeight(ref.current?.offsetHeight ?? 0);
  }, [ref, images]);

  return (
    <div
      ref={ref}
      className="relative inline-flex -space-x-3"
      onMouseEnter={() => setShowNames(true)}
      onMouseLeave={() => setShowNames(false)}
    >
      {images.slice(0, maxVisibleAvatars).map((image, index) => (
        <Avatar
          key={index}
          className="h-[35px] w-[35px] rounded-full border-2 border-white"
          src={image}
          alt="Employee icon"
          names={names}
        />
      ))}
      {overflowCount > 0 && (
        <div className="h-[35px] w-[35px] rounded-full bg-deep-teal font-gilroy-semi-bold text-sm font-semibold leading-[22px] text-white">
          <div className="flex h-full w-full items-center justify-center">
            {overflowCount}+
          </div>
        </div>
      )}
      {showNames && (
        <HoverTooltip
          content={formattedNames}
          position={{ containerWidth, containerHeight }}
        />
      )}
    </div>
  );
};

export default Avatars;
