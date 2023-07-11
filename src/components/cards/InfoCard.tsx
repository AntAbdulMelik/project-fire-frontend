type Props = {
  className?: string;
  description: string;
  amount: string;
  iconSrc: string;
  iconAlt: string;
};

const InfoCard = ({
  className,
  description,
  amount,
  iconSrc,
  iconAlt,
}: Props) => {
  return (
    <div
      className={`flex justify-between gap-[19px] px-4 py-[10px] ${className}}`}
    >
      <div className="flex flex-col items-start gap-[2px]">
        <p className="font-gilroy-regular text-[14px] font-normal leading-[22px] text-hunter-green">
          {description}
        </p>
        <span className="font-gilroy-bold text-[18px] font-bold leading-[26px] text-deep-forest">
          {amount}
        </span>
      </div>
      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-winter-mint">
        <img src={iconSrc} alt={iconAlt} />
      </div>
    </div>
  );
};

export default InfoCard;
