import { Employee } from "src/types";
import { employeesTableColumnsData as columns } from "src/data";
import { useAppSelector } from "store/hooks";
import { selectUserRole } from "store/slices/authSlice";
import Table from "components/tableElements/Table";
import EmployeesTableRow from "features/employees/EmployeesTableRow";

type Props = {
  totalNumberOfEmployees: number;
  employees: Employee[];
  value: string;
  orderByField: string;
  orderDirection: string;
  handleSearch: (input: string) => void;
  handleSort: (label: string, orderDirection: string) => void;
  handleDelete: (employeeId: string) => void;
  openViewEmployeeSideDrawer: (employeeId: string) => void;
  openEditEmployeeSideDrawer: (employeeId: string) => void;
};

const EmployeesTable = ({
  totalNumberOfEmployees,
  employees,
  value,
  orderByField,
  orderDirection,
  handleSearch,
  handleSort,
  handleDelete,
  openViewEmployeeSideDrawer,
  openEditEmployeeSideDrawer,
}: Props) => {
  const userRole = useAppSelector(selectUserRole);

  return (
    <Table
      label="All Employees"
      total={totalNumberOfEmployees}
      value={value}
      columns={
        userRole === "Admin"
          ? columns
          : columns.filter((column) => column.label !== "actions")
      }
      orderByField={orderByField}
      orderDirection={orderDirection}
      handleSearch={handleSearch}
      handleSort={handleSort}
      rows={employees.map((employee) => (
        <EmployeesTableRow
          key={employee.id}
          employee={employee}
          handleDelete={handleDelete}
          openViewEmployeeSideDrawer={openViewEmployeeSideDrawer}
          openEditEmployeeSideDrawer={openEditEmployeeSideDrawer}
        />
      ))}
    />
  );
};

export default EmployeesTable;
