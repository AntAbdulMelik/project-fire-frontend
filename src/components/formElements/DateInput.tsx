import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CustomDateInput from "components/formElements/CustomDateInput";

type Props = {
  label: string;
  className?: string;
  selectedDate: Date | null;
  handleDateSelection: (date: Date | null) => void;
};

const DateInput = ({
  label,
  className,
  selectedDate,
  handleDateSelection,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        {label}
      </span>
      <DatePicker
        customInput={<CustomDateInput width={className} />}
        placeholderText={selectedDate?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
        selected={selectedDate}
        onChange={(date) => handleDateSelection(date)}
      />
    </div>
  );
};

export default DateInput;
