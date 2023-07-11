import { chevronLeft } from "assets/media";

type Props = {
  closeSideDrawer: () => void;
};

const BackButton = ({ closeSideDrawer }: Props) => {
  return (
    <button
      className="flex cursor-pointer items-center gap-[3px]"
      onClick={closeSideDrawer}
    >
      <img className="h-4 w-4" src={chevronLeft} alt="Back icon" />
      <span className="font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen">
        Back
      </span>
    </button>
  );
};

export default BackButton;
