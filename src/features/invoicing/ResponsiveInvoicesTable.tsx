import React, { useState } from "react";

import { Invoice } from "src/types";
import { getInvoiceColorAndStatus } from "src/helpers";
import { invoicesResponsiveTableColumnsData as columns } from "src/data";
import TableHeader from "components/tableElements/TableHeader";
import TableHead from "components/tableElements/TableHead";
import TableRow from "components/tableElements/TableRow";
import PlanCardItem from "features/home/PlanCardItem";
import ViewInvoice from "features/invoicing/ViewInvoice";
import EditInvoice from "features/invoicing/EditInvoice";
import AddInvoice from "features/invoicing/AddInvoice";

type Props = {
  totalNumberOfInvoices: number;
  invoices: Invoice[];
  value: string;
  orderByField: string;
  orderDirection: string;
  handleSearch: (input: string) => void;
  handleSort: (label: string, orderDirection: string) => void;
};

const ResponsiveInvoicesTable = ({
  totalNumberOfInvoices,
  invoices,
  value,
  orderByField,
  orderDirection,
  handleSearch,
  handleSort,
}: Props) => {
  const [selectedInvoice, setSelectedInvoice] = useState<string>("");
  const [isViewInvoiceSideDrawerOpen, setIsViewInvoiceSideDrawerOpen] =
    useState(false);
  const [isAddInvoiceSideDrawerOpen, setIsAddInvoiceSideDrawerOpen] =
    useState(false);
  const [isEditInvoiceSideDrawerOpen, setIsEditInvoiceSideDrawerOpen] =
    useState(false);

  const selectEmployee = (projectId: string) => {
    selectedInvoice === projectId
      ? setSelectedInvoice("")
      : setSelectedInvoice(projectId);
  };

  return (
    <div className="w-full rounded-md border border-ashen-grey bg-white">
      <TableHeader
        label="All Invoices"
        total={totalNumberOfInvoices}
        value={value}
        handleSearch={handleSearch}
      />
      <div className="table-responsive">
        <table className="w-full border-t border-ashen-grey">
          <TableHead
            columns={columns}
            orderByField={orderByField}
            orderDirection={orderDirection}
            handleSort={handleSort}
          />
          <tbody>
            {invoices.map((invoice) => {
              const invoiceId = invoice.id;
              return (
                <React.Fragment key={invoiceId}>
                  <TableRow
                    className="hover:cursor-pointer hover:bg-white"
                    onClick={() => selectEmployee(invoiceId)}
                  >
                    <td className="pl-4">
                      <div className="flex w-3/5 items-center justify-between font-gilroy-regular text-[16px] leading-6 text-deep-forest">
                        <p>{invoice.client}</p>
                      </div>
                    </td>
                    <td className="flex h-[60px] items-center gap-2 pl-4">
                      <div
                        className={`h-[6px] w-[6px] rounded-full ${
                          getInvoiceColorAndStatus(invoice.invoiceStatus)?.color
                        }`}
                      />
                      <div className="font-gilroy-semi-bold font-semibold">
                        {
                          getInvoiceColorAndStatus(invoice.invoiceStatus)
                            ?.status
                        }
                      </div>
                    </td>
                  </TableRow>
                  {invoiceId === selectedInvoice && (
                    <tr className="ml-[10%]">
                      <td colSpan={2}>
                        <div className="ml-[5%] mt-[11px] flex w-[90%] flex-col gap-[5px] !text-[15px]">
                          <PlanCardItem
                            text="Industry"
                            amount={invoice.industry}
                          />
                          <PlanCardItem
                            text="Amount Billed"
                            amount={invoice.amountBilledBAM.toString()}
                          />
                          <PlanCardItem
                            text="Hours Billed"
                            amount={invoice.totalHoursBilled.toString()}
                          />
                          {isViewInvoiceSideDrawerOpen && (
                            <ViewInvoice
                              invoice={invoice}
                              closeViewInvoiceSideDrawer={() =>
                                setIsViewInvoiceSideDrawerOpen(false)
                              }
                              openEditInvoiceSideDrawer={() =>
                                setIsEditInvoiceSideDrawerOpen(true)
                              }
                            />
                          )}
                          {isAddInvoiceSideDrawerOpen && (
                            <AddInvoice
                              closeAddInvoiceSideDrawer={() =>
                                setIsAddInvoiceSideDrawerOpen(false)
                              }
                            />
                          )}
                          {isEditInvoiceSideDrawerOpen && (
                            <EditInvoice
                              invoice={invoice}
                              closeEditInvoiceSideDrawer={() =>
                                setIsEditInvoiceSideDrawerOpen(false)
                              }
                            />
                          )}
                          <button
                            className="mb-4 rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]"
                            onClick={() => {
                              setIsViewInvoiceSideDrawerOpen(true);
                            }}
                          >
                            Invoice info
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveInvoicesTable;
