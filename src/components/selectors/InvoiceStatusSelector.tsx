import { useState, useLayoutEffect, useRef } from "react";

import { InvoiceStatus } from "src/types";
import { getInvoiceColorAndStatus } from "src/helpers";
import { chevronDown } from "assets/media";
import RadioButton from "components/formElements/RadioButton";

type Props = {
  selectedInvoiceStatus: string;
  handleInvoiceStatusSelection: (projectStatus: string) => void;
};

const InvoiceStatusSelector = ({
  selectedInvoiceStatus,
  handleInvoiceStatusSelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isInvoiceStatusSelectorOpen, setIsInvoiceStatusSelectorOpen] =
    useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isInvoiceStatusSelectorOpen]);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Status
      </span>
      <div
        ref={ref}
        className="relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none"
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() =>
            setIsInvoiceStatusSelectorOpen(!isInvoiceStatusSelectorOpen)
          }
        >
          <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
            {selectedInvoiceStatus
              ? getInvoiceColorAndStatus(selectedInvoiceStatus as InvoiceStatus)
                  ?.status
              : "Select project status"}
          </span>
          <img
            className={`transition ${
              isInvoiceStatusSelectorOpen ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt="Down icon"
          />
        </div>
        {isInvoiceStatusSelectorOpen && (
          <div
            className="absolute left-0 z-20 flex max-h-[128px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2"
            style={{ width, top: height }}
          >
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Not sent"
              htmlFor="notSent"
              id="notSent"
              name="invoiceStatus"
              checked={selectedInvoiceStatus === "NotSent"}
              handleRadioButtonChange={(event) => {
                handleInvoiceStatusSelection(
                  event.target.checked ? "NotSent" : ""
                );
                setIsInvoiceStatusSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Sent"
              htmlFor="sent"
              id="sent"
              name="invoiceStatus"
              checked={selectedInvoiceStatus === "Sent"}
              handleRadioButtonChange={(event) => {
                handleInvoiceStatusSelection(
                  event.target.checked ? "Sent" : ""
                );
                setIsInvoiceStatusSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Paid"
              htmlFor="paid"
              id="paid"
              name="invoiceStatus"
              checked={selectedInvoiceStatus === "Paid"}
              handleRadioButtonChange={(event) => {
                handleInvoiceStatusSelection(
                  event.target.checked ? "Paid" : ""
                );
                setIsInvoiceStatusSelectorOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceStatusSelector;
