import { useState, useLayoutEffect, useRef } from "react";

import { chevronDown } from "assets/media";
import Checkbox from "components/formElements/Checkbox";

type Props = {
  selectedDepartment: string;
  handleDepartmentSelection: (department: string) => void;
};

const DepartmentSelector = ({
  selectedDepartment,
  handleDepartmentSelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isDepartmentSelectorOpen, setIsDepartmentSelectorOpen] =
    useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isDepartmentSelectorOpen]);

  return (
    <div className="z-20 flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Department
      </span>
      <div
        ref={ref}
        className="relative rounded-md border border-misty-moonstone px-4 py-2"
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsDepartmentSelectorOpen(!isDepartmentSelectorOpen)}
        >
          <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
            {!selectedDepartment
              ? "Select employee department"
              : selectedDepartment}
          </span>
          <img
            className={`transition ${
              isDepartmentSelectorOpen ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt="Down icon"
          />
        </div>
        {isDepartmentSelectorOpen && (
          <div
            className="absolute left-0 z-20 flex flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2"
            style={{ width, top: height }}
          >
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Administration"
              htmlFor="administration"
              id="administration"
              name="administration"
              checked={selectedDepartment === "Administration"}
              handleCheckboxChange={(event) => {
                handleDepartmentSelection(
                  event.target.checked ? "Administration" : ""
                );
                setIsDepartmentSelectorOpen(false);
              }}
            />
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Management"
              htmlFor="management"
              id="management"
              name="management"
              checked={selectedDepartment === "Management"}
              handleCheckboxChange={(event) => {
                handleDepartmentSelection(
                  event.target.checked ? "Management" : ""
                );
                setIsDepartmentSelectorOpen(false);
              }}
            />
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Development"
              htmlFor="development"
              id="development"
              name="development"
              checked={selectedDepartment === "Development"}
              handleCheckboxChange={(event) => {
                handleDepartmentSelection(
                  event.target.checked ? "Development" : ""
                );
                setIsDepartmentSelectorOpen(false);
              }}
            />
            <Checkbox
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Design"
              htmlFor="design"
              id="design"
              name="design"
              checked={selectedDepartment === "Design"}
              handleCheckboxChange={(event) => {
                handleDepartmentSelection(event.target.checked ? "Design" : "");
                setIsDepartmentSelectorOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentSelector;
