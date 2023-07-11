import { Invoice } from "src/types";
import { invoicesTableColumnsData as columns } from "src/data";
import Table from "components/tableElements/Table";
import InvoicesTableRow from "features/invoicing/InvoicesTableRow";

type Props = {
  totalNumberOfInvoices: number;
  invoices: Invoice[];
  value: string;
  orderByField: string;
  orderDirection: string;
  handleSearch: (input: string) => void;
  handleSort: (label: string, orderDirection: string) => void;
  handleUpdate: (invoiceId: string, invoiceStatus: string) => void;
  handleDelete: (invoiceId: string) => void;
  openViewInvoiceSideDrawer: (invoiceId: string) => void;
};

const InvoicesTable = ({
  totalNumberOfInvoices,
  invoices,
  value,
  orderByField,
  orderDirection,
  handleSearch,
  handleSort,
  handleUpdate,
  handleDelete,
  openViewInvoiceSideDrawer,
}: Props) => {
  return (
    <Table
      label="All Invoices"
      total={totalNumberOfInvoices}
      value={value}
      columns={columns}
      orderByField={orderByField}
      orderDirection={orderDirection}
      handleSearch={handleSearch}
      handleSort={handleSort}
      rows={invoices.map((invoice) => (
        <InvoicesTableRow
          openViewInvoiceSideDrawer={openViewInvoiceSideDrawer}
          key={invoice.id}
          invoice={invoice}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    />
  );
};

export default InvoicesTable;
