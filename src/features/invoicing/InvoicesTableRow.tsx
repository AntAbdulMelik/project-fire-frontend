import { Invoice } from "src/types";
import { getInvoiceColorAndStatus } from "src/helpers";
import TableRow from "components/tableElements/TableRow";
import InvoiceActions from "features/invoicing/InvoiceActions";

type Props = {
  invoice: Invoice;
  handleUpdate: (invoiceId: string, invoiceStatus: string) => void;
  handleDelete: (invoiceId: string) => void;
  openViewInvoiceSideDrawer: (invoiceId: string) => void;
};

const InvoicesTableRow = ({
  invoice,
  handleUpdate,
  handleDelete,
  openViewInvoiceSideDrawer,
}: Props) => {
  const invoiceId = invoice.id;

  return (
    <TableRow
      key={invoiceId}
      onClick={() => openViewInvoiceSideDrawer(invoiceId)}
    >
      <td className="p-4">{invoice.client}</td>
      <td className="p-4">{invoice.industry}</td>
      <td className="p-4">{invoice.totalHoursBilled}</td>
      <td className="p-4">{invoice.amountBilledBAM}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div
            className={`h-[6px] w-[6px] rounded-full ${
              getInvoiceColorAndStatus(invoice.invoiceStatus)?.color
            }`}
          />
          <div className="font-gilroy-semi-bold font-semibold">
            {getInvoiceColorAndStatus(invoice.invoiceStatus)?.status}
          </div>
        </div>
      </td>
      <td className="p-3">
        <InvoiceActions
          invoiceId={invoiceId}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </td>
    </TableRow>
  );
};

export default InvoicesTableRow;
