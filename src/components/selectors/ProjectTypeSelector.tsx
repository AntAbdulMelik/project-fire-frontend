import { useState, useLayoutEffect, useRef } from "react";

import { ProjectType } from "src/types";
import { getProjectType } from "src/helpers";
import { chevronDown } from "assets/media";
import RadioButton from "components/formElements/RadioButton";

type Props = {
  selectedProjectType: string;
  handleProjectTypeSelection: (projectType: string) => void;
};

const ProjectTypeSelector = ({
  selectedProjectType,
  handleProjectTypeSelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isProjectTypeSelectorOpen, setIsProjectTypeSelectorOpen] =
    useState(false);

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isProjectTypeSelectorOpen]);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Project Type
      </span>
      <div
        ref={ref}
        className="relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none"
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() =>
            setIsProjectTypeSelectorOpen(!isProjectTypeSelectorOpen)
          }
        >
          <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
            {selectedProjectType
              ? getProjectType(selectedProjectType as ProjectType)
              : "Select project type"}
          </span>

          <img
            className={`transition ${
              isProjectTypeSelectorOpen ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt="Down icon"
          />
        </div>
        {isProjectTypeSelectorOpen && (
          <div
            className="absolute left-0 z-20 flex max-h-[128px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2"
            style={{ width, top: height }}
          >
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="Fixed"
              htmlFor="fixed"
              id="fixed"
              name="projectType"
              checked={selectedProjectType === "Fixed"}
              handleRadioButtonChange={(event) => {
                handleProjectTypeSelection(event.target.checked ? "Fixed" : "");
                setIsProjectTypeSelectorOpen(false);
              }}
            />
            <RadioButton
              containerClassName="gap-2 px-4 py-1"
              labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
              inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
              label="On-going"
              htmlFor="ongoing"
              id="ongoing"
              name="projectType"
              checked={selectedProjectType === "OnGoing"}
              handleRadioButtonChange={(event) => {
                handleProjectTypeSelection(
                  event.target.checked ? "OnGoing" : ""
                );
                setIsProjectTypeSelectorOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTypeSelector;
