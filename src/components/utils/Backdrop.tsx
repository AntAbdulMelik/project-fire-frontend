type Props = {
  className?: string;
  onClick: () => void;
};

const Backdrop = ({ className, onClick }: Props) => {
  return (
    <div
      className={`fixed left-0 top-0 z-10 min-h-full w-full ${className}`}
      onClick={() => onClick()}
    />
  );
};

export default Backdrop;
