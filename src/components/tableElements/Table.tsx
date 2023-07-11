import React from "react";

import TableHead from "components/tableElements/TableHead";
import TableHeader from "components/tableElements/TableHeader";

type Column = {
  name: string;
  label: string;
};

type Props = {
  label: string;
  total: number;
  value: string;
  columns: Column[];
  orderByField: string;
  orderDirection: string;
  handleSearch: (input: string) => void;
  handleSort: (label: string, orderDirection: string) => void;
  rows: React.ReactNode;
};

const Table = ({
  label,
  total,
  value,
  columns,
  orderByField,
  orderDirection,
  handleSearch,
  handleSort,
  rows,
}: Props) => {
  return (
    <div className="w-full rounded-md border border-ashen-grey">
      <TableHeader
        label={label}
        total={total}
        value={value}
        handleSearch={handleSearch}
      />
      <table className="w-full border-t border-ashen-grey bg-ashen-grey">
        <TableHead
          columns={columns}
          orderByField={orderByField}
          orderDirection={orderDirection}
          handleSort={handleSort}
        />
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
