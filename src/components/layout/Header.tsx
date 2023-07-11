type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Header = ({ className, children }: Props) => {
  return <header className={`${className}`}>{children}</header>;
};

export default Header;
