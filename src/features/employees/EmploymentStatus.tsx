import Toggle from "components/formElements/Toggle";

type Props = {
  isEmployed: boolean;
  handleEmploymentStatusChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const EmploymentStatus = ({
  isEmployed,
  handleEmploymentStatusChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Employment Status
      </span>
      <Toggle
        label={isEmployed ? "Current" : "Past"}
        htmlFor="employmentStatus"
        id="employmentStatus"
        name="employmentStatus"
        checked={isEmployed}
        handleCheckboxChange={handleEmploymentStatusChange}
      />
    </div>
  );
};

export default EmploymentStatus;
