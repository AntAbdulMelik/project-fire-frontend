import { Invoice } from "src/types";
import { getInvoiceColorAndStatus } from "src/helpers";

type Props = {
  invoice: Invoice;
};

const InvoiceInfo = ({ invoice }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-6">
      <div className="flex flex-col border-b border-ashen-grey pb-4">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          Industry
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {invoice.industry}
        </span>
      </div>
      <div className="flex flex-col border-b border-ashen-grey pb-4">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          Total Hours Billed
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {invoice.totalHoursBilled}
        </span>
      </div>
      <div className="flex flex-col border-b border-ashen-grey pb-4">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          Amount Billed
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {invoice.amountBilledBAM}
        </span>
      </div>
      <div className="flex flex-col border-ashen-grey">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          Status
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          <div className="flex items-center gap-2">
            <div
              className={`h-[6px] w-[6px] rounded-full ${
                getInvoiceColorAndStatus(invoice.invoiceStatus)?.color
              }`}
            ></div>
            {getInvoiceColorAndStatus(invoice.invoiceStatus)?.status}
          </div>
        </span>
      </div>
    </div>
  );
};

export default InvoiceInfo;
