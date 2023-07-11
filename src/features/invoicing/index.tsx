import { useState, useEffect } from "react";

import { Invoice } from "src/types";
import { useAppSelector } from "store/hooks";
import { selectCurrentUser } from "store/slices/authSlice";
import {
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} from "store/slices/invoicingApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import AlertModal from "components/modals/AlertModal";
import Pagination from "components/pagination";
import Navbar from "components/navigation/NavBar";
import MainLayout from "components/layout";
import InvoicesTable from "features/invoicing/InvoicesTable";
import ResponsiveInvoicesTable from "features/invoicing/ResponsiveInvoicesTable";
import ViewInvoice from "features/invoicing/ViewInvoice";
import AddInvoice from "features/invoicing/AddInvoice";
import EditInvoice from "features/invoicing/EditInvoice";

const navLabels = ["All Invoices", "Not sent", "Sent", "Paid"];

const Invoicing = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [invoiceId, setInvoiceId] = useState("");
  const [client, setClient] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [orderByField, setOrderByField] = useState("client");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage, setInvoicesPerPage] = useState(10);
  const [windowLg, setWindowLg] = useState(window.innerWidth >= 1024);
  const [isViewInvoiceSideDrawerOpen, setIsViewInvoiceSideDrawerOpen] =
    useState(false);
  const [isAddInvoiceSideDrawerOpen, setIsAddInvoiceSideDrawerOpen] =
    useState(false);
  const [isEditInvoiceSideDrawerOpen, setIsEditInvoiceSideDrawerOpen] =
    useState(false);

  const user = useAppSelector(selectCurrentUser);
  const {
    isLoading,
    isFetching,
    isSuccess: isInvoicesSuccess,
    data,
  } = useGetInvoicesQuery(
    {
      client,
      invoiceStatus,
      orderByField,
      orderDirection,
      invoicesPerPage,
      currentPage,
    },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const [updateInvoice, { isSuccess: isUpdateSuccess }] =
    useUpdateInvoiceMutation();
  const [deleteInvoice, { isSuccess: isDeleteSuccess }] =
    useDeleteInvoiceMutation();

  useEffect(() => {
    if (activePage === 1) setInvoiceStatus("");
    else if (activePage === 2) setInvoiceStatus("NotSent");
    else if (activePage === 3) setInvoiceStatus("Sent");
    else if (activePage === 4) setInvoiceStatus("Paid");
  }, [activePage]);

  const updateInvoiceStatus = async (
    invoiceId: string,
    invoiceStatus: string
  ) => {
    await updateInvoice({ invoiceId, data: { invoiceStatus } });
  };

  const onConfirm = async () => {
    await deleteInvoice({ invoiceId });
  };

  useEffect(() => {
    if (isDeleteSuccess) setIsAlertModalOpen(false);
  }, [isDeleteSuccess]);

  useEffect(() => {
    const handleResize = () => {
      setWindowLg(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const invoice =
    isInvoicesSuccess &&
    data.invoices.find((invoice: Invoice) => invoice.id === invoiceId);

  return (
    <MainLayout activeMenuItem={"invoicing"}>
      {isAlertModalOpen && (
        <AlertModal
          alertTitle={`Are you sure you want to delete ${invoice.client}?`}
          alertDescription={`This will permanently delete ${invoice.client} and all associated data. You cannot undo this action.`}
          cancelButtonText="Don't Delete"
          confirmButtonText="Delete"
          confirmButtoncolor="#FF4D4F"
          onCancel={() => setIsAlertModalOpen(false)}
          onConfirm={onConfirm}
        />
      )}
      <div className="mx-14 mb-[17px] mt-14 md:mt-[34px]">
        <div className="mb-[30px] flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-0">
          <h1 className="font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest">
            Invoicing
          </h1>
          {user?.role === "Admin" && (
            <button
              className="rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]"
              onClick={() => {
                setIsAddInvoiceSideDrawerOpen(true);
              }}
            >
              Create New Invoice
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <div className="mb-12 flex flex-wrap justify-center gap-4 lg:justify-between">
            <Navbar
              navLabels={navLabels}
              handlePageSelect={(pageNumber) => {
                setActivePage(pageNumber);
                setInvoicesPerPage(10);
                setCurrentPage(1);
                setClient("");
                setOrderByField("client");
                setOrderDirection("asc");
              }}
            />
          </div>
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
          {isLoading || isFetching ? (
            <LoadingSpinner />
          ) : (
            (isInvoicesSuccess || isUpdateSuccess) &&
            windowLg && (
              <InvoicesTable
                totalNumberOfInvoices={data.pageInfo.total}
                invoices={data.invoices}
                value={client}
                orderByField={orderByField}
                orderDirection={orderDirection}
                handleSearch={(input) => setClient(input)}
                handleSort={(label: string, orderDirection: string) => {
                  setOrderByField(label);
                  setOrderDirection(orderDirection);
                }}
                handleUpdate={(invoiceId, invoiceStatus) => {
                  updateInvoiceStatus(invoiceId, invoiceStatus);
                }}
                handleDelete={(invoiceId) => {
                  setIsAlertModalOpen(true);
                  setInvoiceId(invoiceId);
                }}
                openViewInvoiceSideDrawer={(invoiceId) => {
                  setIsViewInvoiceSideDrawerOpen(true);
                  setInvoiceId(invoiceId);
                }}
              />
            )
          )}
        </div>
      </div>
      <div className="mb-[25px] flex w-full justify-center">
        {isLoading || isFetching ? (
          <LoadingSpinner />
        ) : (
          (isInvoicesSuccess || isUpdateSuccess) &&
          !windowLg && (
            <div className="w-[95%]">
              <ResponsiveInvoicesTable
                totalNumberOfInvoices={data.pageInfo.total}
                invoices={data.invoices}
                value={client}
                orderByField={orderByField}
                orderDirection={orderDirection}
                handleSearch={(input) => setClient(input)}
                handleSort={(label: string, orderDirection: string) => {
                  setOrderByField(label);
                  setOrderDirection(orderDirection);
                }}
              />
            </div>
          )
        )}
      </div>
      <div className="mx-14 mb-[25px]">
        {isInvoicesSuccess && (
          <Pagination
            total={data.pageInfo.total}
            currentPage={data.pageInfo.currentPage}
            lastPage={data.pageInfo.lastPage}
            perPage={invoicesPerPage}
            items="Invoices"
            handlePerPageSelection={(invoicesPerPage) => {
              setInvoicesPerPage(invoicesPerPage);
              setCurrentPage(1);
              setClient("");
            }}
            handlePageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Invoicing;
