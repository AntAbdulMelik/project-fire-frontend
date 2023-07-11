import { useState, useLayoutEffect, useRef } from "react";

import { SalesChannel } from "src/types";
import { getProjectSalesChannel } from "src/helpers";
import { chevronDown } from "assets/media";
import RadioButton from "components/formElements/RadioButton";

type Props = {
  selectedSalesChannel: string;
  handleSalesChannelSelection: (salesChannel: string) => void;
};

const SalesChannelSelector = ({
  selectedSalesChannel,
  handleSalesChannelSelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isSalesChannelSelectorOpen, setIsSalesChannelSelectorOpen] =
    useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isSalesChannelSelectorOpen]);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Sales Channel
      </span>
      <div
        ref={ref}
        className="relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none"
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() =>
            setIsSalesChannelSelectorOpen(!isSalesChannelSelectorOpen)
          }
        >
          <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
            {selectedSalesChannel
              ? getProjectSalesChannel(selectedSalesChannel as SalesChannel)
              : "Select sales channel"}
          </span>

          <img
            className={`transition ${
              isSalesChannelSelectorOpen ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt="Down icon"
          />
        </div>
        {isSalesChannelSelectorOpen && (
          <div
            className="absolute left-0 z-20 flex max-h-[128px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2"
            style={{ width, top: height }}
          >
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Online"
              htmlFor="online"
              id="online"
              name="salesChannel"
              checked={selectedSalesChannel === "Online"}
              handleRadioButtonChange={(event) => {
                handleSalesChannelSelection(
                  event.target.checked ? "Online" : ""
                );
                setIsSalesChannelSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="In person"
              htmlFor="inperson"
              id="inperson"
              name="salesChannel"
              checked={selectedSalesChannel === "InPerson"}
              handleRadioButtonChange={(event) => {
                handleSalesChannelSelection(
                  event.target.checked ? "InPerson" : ""
                );
                setIsSalesChannelSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Referral"
              htmlFor="referral"
              id="referral"
              name="salesChannel"
              checked={selectedSalesChannel === "Referral"}
              handleRadioButtonChange={(event) => {
                handleSalesChannelSelection(
                  event.target.checked ? "Referral" : ""
                );
                setIsSalesChannelSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Other"
              htmlFor="other"
              id="other"
              name="salesChannel"
              checked={selectedSalesChannel === "Other"}
              handleRadioButtonChange={(event) => {
                handleSalesChannelSelection(
                  event.target.checked ? "Other" : ""
                );
                setIsSalesChannelSelectorOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChannelSelector;
