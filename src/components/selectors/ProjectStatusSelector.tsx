import { useState, useLayoutEffect, useRef } from "react";

import { ProjectStatus } from "src/types";
import { getProjectColorAndStatus } from "src/helpers";
import { chevronDown } from "assets/media";
import RadioButton from "components/formElements/RadioButton";

type Props = {
  selectedProjectStatus: string;
  handleProjectStatusSelection: (projectStatus: string) => void;
};

const ProjectStatusSelector = ({
  selectedProjectStatus,
  handleProjectStatusSelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isProjectStatusSelectorOpen, setIsProjectStatusSelectorOpen] =
    useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isProjectStatusSelectorOpen]);

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
            setIsProjectStatusSelectorOpen(!isProjectStatusSelectorOpen)
          }
        >
          <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
            {selectedProjectStatus
              ? getProjectColorAndStatus(selectedProjectStatus as ProjectStatus)
                  ?.status
              : "Select project status"}
          </span>
          <img
            className={`transition ${
              isProjectStatusSelectorOpen ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt="Down icon"
          />
        </div>
        {isProjectStatusSelectorOpen && (
          <div
            className="absolute left-0 z-20 flex max-h-[128px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2"
            style={{ width, top: height }}
          >
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Active"
              htmlFor="active"
              id="active"
              name="projectStatus"
              checked={selectedProjectStatus === "Active"}
              handleRadioButtonChange={(event) => {
                handleProjectStatusSelection(
                  event.target.checked ? "Active" : ""
                );
                setIsProjectStatusSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="On hold"
              htmlFor="onHold"
              id="onHold"
              name="projectStatus"
              checked={selectedProjectStatus === "OnHold"}
              handleRadioButtonChange={(event) => {
                handleProjectStatusSelection(
                  event.target.checked ? "OnHold" : ""
                );
                setIsProjectStatusSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Inactive"
              htmlFor="inactive"
              id="inactive"
              name="projectStatus"
              checked={selectedProjectStatus === "Inactive"}
              handleRadioButtonChange={(event) => {
                handleProjectStatusSelection(
                  event.target.checked ? "Inactive" : ""
                );
                setIsProjectStatusSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Completed"
              htmlFor="completed"
              id="completed"
              name="projectStatus"
              checked={selectedProjectStatus === "Completed"}
              handleRadioButtonChange={(event) => {
                handleProjectStatusSelection(
                  event.target.checked ? "Completed" : ""
                );
                setIsProjectStatusSelectorOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectStatusSelector;
