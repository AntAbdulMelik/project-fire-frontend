import { Employee } from "src/types";
import { getEmployeeSalaryInBAM, getEmployeeTechStack } from "src/helpers";
import { useAppSelector } from "store/hooks";
import { selectUserRole } from "store/slices/authSlice";
import TableRow from "components/tableElements/TableRow";
import EmployeeActions from "features/employees/EmployeeActions";

type Props = {
  employee: Employee;
  handleDelete: (employeeId: string) => void;
  openViewEmployeeSideDrawer: (employeeId: string) => void;
  openEditEmployeeSideDrawer: (employeeId: string) => void;
};

const EmployeesTableRow = ({
  employee,
  handleDelete,
  openViewEmployeeSideDrawer,
  openEditEmployeeSideDrawer,
}: Props) => {
  const employeeId = employee.id;

  const userRole = useAppSelector(selectUserRole);

  return (
    <TableRow
      key={employeeId}
      className="cursor-pointer"
      onClick={() => openViewEmployeeSideDrawer(employeeId)}
    >
      <td className="p-4">{employee.firstName}</td>
      <td className="p-4">{employee.lastName}</td>
      <td className="p-4">{employee.department}</td>
      <td className="p-4">
        {getEmployeeSalaryInBAM(employee.salary, employee.currency)}
      </td>
      <td className="p-4">{getEmployeeTechStack(employee.techStack)}</td>
      {userRole === "Admin" && (
        <td className="p-4">
          <EmployeeActions
            employeeId={employeeId}
            openEditEmployeeSideDrawer={openEditEmployeeSideDrawer}
            handleDelete={handleDelete}
          />
        </td>
      )}
    </TableRow>
  );
};

export default EmployeesTableRow;
