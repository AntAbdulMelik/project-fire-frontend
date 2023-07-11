type Props = {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  children: React.ReactNode;
};

const TableRow = ({ className, onClick, children }: Props) => {
  return (
    <tr
      className={`h-[60px] border-t border-ashen-grey bg-white text-left font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist hover:-translate-x-1.5 hover:-translate-y-1 hover:cursor-pointer hover:shadow-[0px_0px_0px_1px_inset_rgba(0,0,0,0.2)] ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export default TableRow;
