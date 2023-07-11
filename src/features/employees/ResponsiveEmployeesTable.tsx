import React, { useState } from "react";

import { Employee } from "src/types";
import { employeesResponsiveTableColumnsData as columns } from "src/data";
import TableHeader from "components/tableElements/TableHeader";
import TableHead from "components/tableElements/TableHead";
import TableRow from "components/tableElements/TableRow";
import PlanCardItem from "features/home/PlanCardItem";
import ViewEmployee from "features/employees/ViewEmployee";
import AddEmployee from "features/employees/AddEmployee";
import EditEmployee from "features/employees/EditEmployee";

type Props = {
  totalNumberOfEmployees: number;
  employees: Employee[];
  value: string;
  orderByField: string;
  orderDirection: string;
  handleSearch: (input: string) => void;
  handleSort: (label: string, orderDirection: string) => void;
};

const ResponsiveEmployeesTable = ({
  totalNumberOfEmployees,
  employees,
  value,
  orderByField,
  orderDirection,
  handleSearch,
  handleSort,
}: Props) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [isViewEmployeeSideDrawerOpen, setIsViewEmployeeSideDrawerOpen] =
    useState(false);
  const [isAddEmployeeSideDrawerOpen, setIsAddEmployeeSideDrawerOpen] =
    useState(false);
  const [isEditEmployeeSideDrawerOpen, setIsEditEmployeeSideDrawerOpen] =
    useState(false);

  const selectEmployee = (employeeId: string) => {
    selectedEmployee === employeeId
      ? setSelectedEmployee("")
      : setSelectedEmployee(employeeId);
  };

  return (
    <div className="w-full rounded-md border border-ashen-grey bg-white">
      <TableHeader
        label="All Employees"
        total={totalNumberOfEmployees}
        value={value}
        handleSearch={handleSearch}
      />
      <div className="table-responsive">
        <table className="w-full border-t border-ashen-grey">
          <TableHead
            columns={columns}
            orderByField={orderByField}
            orderDirection={orderDirection}
            handleSort={handleSort}
          />
          <tbody>
            {employees.map((employee) => {
              const employeeId = employee.id;
              return (
                <React.Fragment key={employeeId}>
                  <TableRow
                    className="hover:cursor-pointer hover:bg-white"
                    onClick={() => selectEmployee(employeeId)}
                  >
                    <td className="pl-4">
                      <div className="flex w-3/5 items-center justify-between font-gilroy-regular text-[16px] leading-6 text-deep-forest">
                        <p>{employee.firstName}</p>
                      </div>
                    </td>
                    <td className="flex h-[60px] items-center gap-2 pl-4">
                      <div className="flex w-3/5 items-center justify-between font-gilroy-regular text-[16px] leading-6 text-deep-forest">
                        <p>{employee.lastName}</p>
                      </div>{" "}
                    </td>
                  </TableRow>
                  {employeeId === selectedEmployee && (
                    <tr className="ml-[10%]">
                      <td colSpan={2}>
                        <div className="ml-[5%] mt-[11px] flex w-[90%] flex-col gap-[5px] !text-[15px]">
                          <PlanCardItem
                            text="Department"
                            amount={employee.department}
                          />
                          <PlanCardItem
                            text="Monthly Salary (BAM)"
                            amount={employee.salary.toString()}
                          />
                          <PlanCardItem
                            text="Tech Stack"
                            amount={employee.techStack.toString()}
                          />
                          {isViewEmployeeSideDrawerOpen && (
                            <ViewEmployee
                              employee={employee}
                              closeViewEmployeeSideDrawer={() =>
                                setIsViewEmployeeSideDrawerOpen(false)
                              }
                              openEditEmployeeSideDrawer={() =>
                                setIsEditEmployeeSideDrawerOpen(true)
                              }
                            />
                          )}
                          {isAddEmployeeSideDrawerOpen && (
                            <AddEmployee
                              closeAddEmployeeSideDrawer={() =>
                                setIsAddEmployeeSideDrawerOpen(false)
                              }
                            />
                          )}
                          {isEditEmployeeSideDrawerOpen && (
                            <EditEmployee
                              employee={employee}
                              closeEditEmployeeSideDrawer={() =>
                                setIsEditEmployeeSideDrawerOpen(false)
                              }
                            />
                          )}
                          <button
                            className="mb-4 rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]"
                            onClick={() => {
                              setIsViewEmployeeSideDrawerOpen(true);
                            }}
                          >
                            Employee info
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveEmployeesTable;
