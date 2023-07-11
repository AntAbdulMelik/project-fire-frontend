import { Link } from "react-router-dom";

type Props = {
  to: string;
  src: string;
  isActive?: boolean;
  label: string;
  isHamburgerMenu?: boolean;
  isDisabled?: boolean;
};

const SidebarMenuItem = ({
  to,
  src,
  label,
  isActive,
  isHamburgerMenu,
  isDisabled,
}: Props) => {
  const activeStyle = "bg-winter-mint font-gilroy-bold font-bold";
  const inactiveStyle = "font-gilroy-medium font-medium hover:bg-winter-mint";
  const textSizeClass = isHamburgerMenu ? "text-xl" : "text-sm";
  const imgSizeClass = isHamburgerMenu ? "w-7 h-7" : "h-5 w-5";
  const itemClass = isDisabled
    ? "text-gray-400 cursor-not-allowed opacity-50"
    : "";

  return (
    <Link to={isDisabled ? "#" : to}>
      <div
        className={`flex-start flex items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
          isActive ? activeStyle : inactiveStyle
        } ${itemClass}`}
      >
        <img src={src} className={`${imgSizeClass}`} />
        <span className={`leading-[17px] ${textSizeClass}`}>{label}</span>
      </div>
    </Link>
  );
};

export default SidebarMenuItem;
