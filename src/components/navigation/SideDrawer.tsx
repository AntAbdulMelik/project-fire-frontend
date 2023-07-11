import Backdrop from "components/utils/Backdrop";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const SideDrawer = ({ children, onClick }: Props) => {
  return (
    <>
      <Backdrop
        className="bg-evergreen bg-opacity-50 backdrop-blur-[2px]"
        onClick={onClick}
      />
      {children}
    </>
  );
};

export default SideDrawer;
