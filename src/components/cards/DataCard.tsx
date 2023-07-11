type Props = {
  className?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
};

const DataCard = ({ className, header, children }: Props) => {
  return (
    <div className={`flex flex-col px-5 ${className}`}>
      <header className="flex items-center justify-between border-b border-b-ashen-grey py-5">
        {header}
      </header>
      {children}
    </div>
  );
};

export default DataCard;
