import { useState, useLayoutEffect, useRef } from "react";

import { TechStack } from "src/types";
import { getEmployeeTechStack } from "src/helpers";
import { chevronDown } from "assets/media";
import Checkbox from "components/formElements/Checkbox";

type Props = {
  selectedDepartment: string;
  selectedTechStack: string;
  handleTechStackSelection: (techStack: string) => void;
};

const TechStackSelector = ({
  selectedDepartment,
  selectedTechStack,
  handleTechStackSelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isTechStackSelectorOpen, setIsTechStackSelectorOpen] = useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isTechStackSelectorOpen]);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Tech Stack
      </span>
      <div
        ref={ref}
        className="relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none"
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsTechStackSelectorOpen(!isTechStackSelectorOpen)}
        >
          <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
            {!selectedTechStack
              ? "Select stack"
              : getEmployeeTechStack(selectedTechStack as TechStack)}
          </span>
          <img
            className={`transition ${
              isTechStackSelectorOpen ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt="Down icon"
          />
        </div>
        {isTechStackSelectorOpen && (
          <div
            className="absolute left-0 flex flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2"
            style={{ width, top: height }}
          >
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="N/A"
              htmlFor="na"
              id="na"
              name="na"
              checked={
                selectedTechStack === "AdminNA" ||
                selectedTechStack === "MgmtNA"
              }
              handleCheckboxChange={(event) => {
                handleTechStackSelection(
                  event.target.checked
                    ? selectedDepartment === "Administration"
                      ? "AdminNA"
                      : "MgmtNA"
                    : ""
                );
                setIsTechStackSelectorOpen(false);
              }}
            />
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Full Stack"
              htmlFor="fullstack"
              id="fullstack"
              name="fullstack"
              checked={selectedTechStack === "FullStack"}
              handleCheckboxChange={(event) => {
                handleTechStackSelection(
                  event.target.checked ? "FullStack" : ""
                );
                setIsTechStackSelectorOpen(false);
              }}
            />
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Back End"
              htmlFor="backend"
              id="backend"
              name="backend"
              checked={selectedTechStack === "Backend"}
              handleCheckboxChange={(event) => {
                handleTechStackSelection(event.target.checked ? "Backend" : "");
                setIsTechStackSelectorOpen(false);
              }}
            />
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Front End"
              htmlFor="frontend"
              id="frontend"
              name="frontend"
              checked={selectedTechStack === "Frontend"}
              handleCheckboxChange={(event) => {
                handleTechStackSelection(
                  event.target.checked ? "Frontend" : ""
                );
                setIsTechStackSelectorOpen(false);
              }}
            />
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="UX/UI"
              htmlFor="uxui"
              id="uxui"
              name="uxui"
              checked={selectedTechStack === "UXUI"}
              handleCheckboxChange={(event) => {
                handleTechStackSelection(event.target.checked ? "UXUI" : "");
                setIsTechStackSelectorOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStackSelector;
