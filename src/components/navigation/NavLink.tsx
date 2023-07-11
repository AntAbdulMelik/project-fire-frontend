type Props = {
  className: string;
  label: string;
  onClick: () => void;
};

const NavLink = ({ className, label, onClick }: Props) => {
  return (
    <div
      className={`cursor-pointer border border-pale-jade px-4 py-[9px] text-sm leading-[22px] ${className}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default NavLink;
