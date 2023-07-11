import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CustomDateInput from "components/formElements/CustomDateInput";

type Props = {
  label: string;
  startDateClassName?: string;
  endDateClassName?: string;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  handleStartDateSelection: (date: Date | null) => void;
  handleEndDateSelection: (date: Date | null) => void;
};

const DateInputs = ({
  label,
  startDateClassName,
  endDateClassName,
  selectedStartDate,
  selectedEndDate,
  handleStartDateSelection,
  handleEndDateSelection,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        {label}
      </span>
      <div className="flex w-full items-center gap-4">
        <div>
          <DatePicker
            required
            customInput={<CustomDateInput width={startDateClassName} />}
            placeholderText={selectedStartDate?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            selected={selectedStartDate}
            onChange={(date) => handleStartDateSelection(date)}
          />
        </div>
        <span className="font-gilroy-regular text-lg font-normal leading-6 text-black">
          to
        </span>
        <div>
          <DatePicker
            required
            customInput={<CustomDateInput width={endDateClassName} />}
            placeholderText={selectedEndDate?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            selected={selectedEndDate}
            onChange={(date) => handleEndDateSelection(date)}
          />
        </div>
      </div>
    </div>
  );
};

export default DateInputs;
