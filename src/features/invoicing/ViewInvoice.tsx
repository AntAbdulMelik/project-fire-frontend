import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Invoice } from "src/types";
import { useAppSelector } from "store/hooks";
import { selectUserRole } from "store/slices/authSlice";
import { useDeleteInvoiceMutation } from "src/store/slices/invoicingApiSlice";
import BackButton from "components/utils/BackButton";
import AlertModal from "components/modals/AlertModal";
import SideDrawer from "components/navigation/SideDrawer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import Footer from "components/layout/Footer";
import InvoiceInfo from "features/invoicing/InvoiceInfo";

type Props = {
  invoice: Invoice;
  closeViewInvoiceSideDrawer: () => void;
  openEditInvoiceSideDrawer: () => void;
};

const ViewInvoice = ({
  invoice,
  closeViewInvoiceSideDrawer,
  openEditInvoiceSideDrawer,
}: Props) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const userRole = useAppSelector(selectUserRole);
  const [deleteInvoice, { isSuccess }] = useDeleteInvoiceMutation();

  const onConfirm = async () => {
    await deleteInvoice({ invoiceId: invoice.id });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsAlertModalOpen(false);
      closeViewInvoiceSideDrawer();
    }
  }, [isSuccess]);

  const children = (
    <>
      {isAlertModalOpen && (
        <AlertModal
          alertTitle={`Are you sure you want to delete invoice to ${invoice.client}?`}
          alertDescription={`This will permanently delete this invoice to ${invoice.client} and all associated data. You cannot undo this action.`}
          cancelButtonText="Don't Delete"
          confirmButtonText="Delete"
          confirmButtoncolor="#FF4D4F"
          onCancel={() => setIsAlertModalOpen(false)}
          onConfirm={onConfirm}
        />
      )}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed right-0 top-0 z-20 flex min-h-full w-full flex-col bg-frosty-mint px-6 pt-[27px] md:w-[496px]"
      >
        <BackButton closeSideDrawer={closeViewInvoiceSideDrawer} />
        {invoice && (
          <>
            <Header className="mt-[13px]">
              <h1 className="rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey">
                {invoice.client}
              </h1>
            </Header>
            <Main className="flex flex-col gap-5">
              <InvoiceInfo invoice={invoice} />
            </Main>
            {userRole === "Admin" && (
              <Footer
                firstButtonClassName="border border-crimson-blaze text-crimson-blaze"
                secondButtonClassName="bg-deep-teal text-white"
                firstButtonText="Delete Invoice"
                secondButtonText="Edit Invoice"
                handleFirstButtonClick={() => setIsAlertModalOpen(true)}
                handleSecondButtonClick={() => {
                  closeViewInvoiceSideDrawer();
                  openEditInvoiceSideDrawer();
                }}
              />
            )}
          </>
        )}
      </motion.div>
    </>
  );

  return (
    <SideDrawer onClick={closeViewInvoiceSideDrawer}>{children}</SideDrawer>
  );
};

export default ViewInvoice;
