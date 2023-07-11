import { Employee } from "src/types";
import { avatar } from "assets/media";

type Props = {
  employee: Employee;
};

const EmployeeCard = ({ employee }: Props) => {
  return (
    <div className="flex gap-4 rounded-lg bg-white p-6">
      <img
        className="h-20 w-20 rounded-[4.61538px] object-cover opacity-80"
        src={employee.image ? employee.image : avatar}
        alt="Employee image"
      />
      <div className="flex flex-1 flex-col justify-center">
        <span className="font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey">
          {employee.firstName} {employee.lastName}
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {employee.department}
        </span>
      </div>
    </div>
  );
};

export default EmployeeCard;
