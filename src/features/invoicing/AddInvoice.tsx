import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useCreateInvoiceMutation } from "store/slices/invoicingApiSlice";
import BackButton from "components/utils/BackButton";
import InputField from "components/formElements/InputField";
import InvoiceStatusSelector from "components/selectors/InvoiceStatusSelector";
import SideDrawer from "components/navigation/SideDrawer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import Footer from "components/layout/Footer";

type Props = {
  closeAddInvoiceSideDrawer: () => void;
};

const AddInvoice = ({ closeAddInvoiceSideDrawer }: Props) => {
  const [client, setClient] = useState("");
  const [industry, setIndustry] = useState("");
  const [totalHoursBilled, setTotalHoursBilled] = useState("");
  const [amountBilledBAM, setAmountBilledBAM] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("NotSent");

  const [createInvoice, { isSuccess }] = useCreateInvoiceMutation();

  const addInvoice = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await createInvoice({
      client: client,
      industry: industry,
      totalHoursBilled: Number(totalHoursBilled),
      amountBilledBAM: Number(amountBilledBAM),
      invoiceStatus: invoiceStatus,
    });
  };

  useEffect(() => {
    if (isSuccess) closeAddInvoiceSideDrawer();
  }, [isSuccess]);

  const children = (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed right-0 top-0 z-20 flex h-full w-full flex-col bg-frosty-mint px-6 pt-[27px] md:w-[496px]"
    >
      <Header className="flex flex-col gap-[13px]">
        <BackButton closeSideDrawer={closeAddInvoiceSideDrawer} />
        <h2 className="rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey">
          Add New Invoice
        </h2>
      </Header>
      <Main className="rounded-lg bg-white p-6">
        <form className="flex flex-col gap-4">
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="text"
            label="Client"
            htmlFor="client"
            id="client"
            name="client"
            placeholder="Client name"
            value={client}
            handleInput={(client) => setClient(client)}
          />
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="text"
            label="Industry"
            htmlFor="industry"
            id="industry"
            name="industry"
            placeholder="Industry"
            value={industry}
            handleInput={(industry) => setIndustry(industry)}
          />
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputContainerClassName="flex gap-2 w-full"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="number"
            label="Total Hours Billed"
            htmlFor="totalHoursBilled"
            id="totalHoursBilled"
            name="totalHoursBilled"
            min={0}
            step={0.01}
            placeholder="Total hours billed"
            value={totalHoursBilled}
            handleInput={(totalHoursBilled) =>
              setTotalHoursBilled(totalHoursBilled)
            }
          />
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputContainerClassName="flex gap-2 w-full"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="number"
            label="Amount Billed (BAM)"
            htmlFor="amountBilledBAM"
            id="amountBilledBAM"
            name="amountBilledBAM"
            min={0}
            step={0.01}
            placeholder="Enter the amount billed in BAM"
            value={amountBilledBAM}
            handleInput={(amountBilledBAM) =>
              setAmountBilledBAM(amountBilledBAM)
            }
          />
          <InvoiceStatusSelector
            selectedInvoiceStatus={invoiceStatus}
            handleInvoiceStatusSelection={(invoiceStatus) =>
              setInvoiceStatus(invoiceStatus)
            }
          />
        </form>
      </Main>
      <Footer
        firstButtonClassName="border border-deep-teal text-evergreen"
        secondButtonClassName="bg-deep-teal text-white"
        firstButtonText="Cancel"
        secondButtonText="Add Invoice"
        handleFirstButtonClick={closeAddInvoiceSideDrawer}
        handleSecondButtonClick={addInvoice}
      />
    </motion.div>
  );

  return (
    <SideDrawer onClick={closeAddInvoiceSideDrawer}>{children}</SideDrawer>
  );
};

export default AddInvoice;
