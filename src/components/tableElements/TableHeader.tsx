import { useState } from "react";

import SearchBar from "components/utils/SearchBar";

type Props = {
  label: string;
  total: number;
  value: string;
  handleSearch: (input: string) => void;
};

const TableHeader = ({ label, total, value, handleSearch }: Props) => {
  const [input, setInput] = useState(value);

  return (
    <div className="mb-3 flex flex-col items-center justify-between px-4 sm:flex-row">
      <div className="flex items-center gap-4 py-[23px]">
        <h2 className="leadin-[26px] font-gilroy-medium text-lg font-medium text-midnight-grey">
          {label}
        </h2>
        <div className="flex h-[30px] flex-col items-center justify-center rounded-md bg-aqua-haze px-[10px] py-[2px] font-gilroy-medium text-sm font-medium leading-[18px] text-moss-green">
          {total} total
        </div>
      </div>
      <SearchBar
        placeholder="Search"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onClick={() => setInput("")}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default TableHeader;
