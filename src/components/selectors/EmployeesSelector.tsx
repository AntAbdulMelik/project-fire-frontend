import { useState, useEffect, useLayoutEffect, useRef } from "react";

import { Employee, Employees } from "src/types";
import { chevronDown, cancel } from "assets/media";
import { useGetEmployeesQuery } from "store/slices/employeesApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import Checkbox from "components/formElements/Checkbox";

type Props = {
  selectedEmployees: Employees[];
  projectStartDate: Date | null;
  projectEndDate: Date | null;
  handleEmployeesSelection: (employees: Employees[]) => void;
};

const EmployeesSelector = ({
  selectedEmployees,
  projectStartDate,
  projectEndDate,
  handleEmployeesSelection,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isEmployeesSelectorOpen, setIsEmployeesSelectorOpen] = useState(false);
  const [openPartTimeSelectors, setOpenPartTimeSelectors] = useState<string[]>(
    []
  );

  const { isLoading, isFetching, isSuccess, data } = useGetEmployeesQuery(
    {
      searchTerm: "",
      isEmployed: "",
      isStandardDateFilter: "false",
      hiringDate: projectEndDate?.toString() ?? "",
      terminationDate: projectStartDate?.toString() ?? "",
      orderByField: "",
      orderDirection: "",
      employeesPerPage: "",
      currentPage: "",
    },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  useLayoutEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    setHeight(ref.current?.offsetHeight ?? 0);
  }, [isEmployeesSelectorOpen]);

  useEffect(() => {
    if (data) {
      handleEmployeesSelection(
        selectedEmployees.filter(({ employee: selectedEmployee }) =>
          data.employees.some(
            (employee: Employee) => employee.id === selectedEmployee.id
          )
        )
      );
      setOpenPartTimeSelectors(
        openPartTimeSelectors.filter((employeeId) =>
          data.employees.some(
            (employee: Employee) => employee.id === employeeId
          )
        )
      );
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Assign developers
      </span>
      <div
        ref={ref}
        className="relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none"
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsEmployeesSelectorOpen(!isEmployeesSelectorOpen)}
        >
          <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist">
            Select team members working on this project
          </span>
          <img
            className={`transition ${
              isEmployeesSelectorOpen ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt="Down icon"
          />
        </div>
        {isEmployeesSelectorOpen && (
          <div
            className="absolute left-0 z-20 flex max-h-[128px] flex-col overflow-y-auto rounded-md border border-t-0 border-misty-moonstone bg-white py-2 scrollbar-thin scrollbar-track-ashen-grey scrollbar-thumb-misty-moonstone scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
            style={{ width, top: height }}
          >
            {isLoading || isFetching ? (
              <LoadingSpinner size={50} />
            ) : (
              isSuccess &&
              data.employees.map((employee: Employee, index: number) => (
                <Checkbox
                  key={employee.id}
                  containerClassName="gap-2 px-4 py-1"
                  labelClassName="font-gilroy-regular text-sm font-normal text-slate-mist"
                  inputClassName="h-[15px] w-[15px] border-slate-mist text-evergreen"
                  label={employee.firstName + " " + employee.lastName}
                  htmlFor={`employee${index + 1}`}
                  id={`employee${index + 1}`}
                  name={`employee${index + 1}`}
                  checked={selectedEmployees.some(
                    (selectedEmployee) =>
                      selectedEmployee.employee.id === employee.id
                  )}
                  handleCheckboxChange={(event) => {
                    handleEmployeesSelection(
                      event.target.checked
                        ? [...selectedEmployees, { partTime: false, employee }]
                        : selectedEmployees.filter(
                            (selectedEmployee) =>
                              selectedEmployee.employee.id !== employee.id
                          )
                    );
                    setOpenPartTimeSelectors(
                      !event.target.checked
                        ? openPartTimeSelectors.filter(
                            (employeeId) => employeeId !== employee.id
                          )
                        : openPartTimeSelectors
                    );
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
      {!isEmployeesSelectorOpen && selectedEmployees.length > 0 && (
        <div className="flex max-h-[154px] flex-col overflow-y-scroll p-4 scrollbar-thin scrollbar-track-ashen-grey scrollbar-thumb-misty-moonstone scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
          {selectedEmployees.map(({ partTime, employee }, index: number) => (
            <div
              key={employee.id}
              className={`flex items-center justify-between gap-2 ${
                index < selectedEmployees.length - 1
                  ? "border-b border-ashen-grey pb-3"
                  : ""
              } ${index > 0 ? "pt-3" : ""}`}
            >
              <span className="font-gilroy-regular text-sm font-normal leading-[22px] text-inky-twilight">
                {employee.firstName + " " + employee.lastName}
              </span>
              <div className="flex items-center gap-[10px]">
                <div className="relative min-w-[90px] rounded-md border border-misty-moonstone px-2 py-1 focus:outline-none">
                  <div
                    className="flex cursor-pointer items-center justify-between gap-2"
                    onClick={() =>
                      setOpenPartTimeSelectors(
                        openPartTimeSelectors.includes(employee.id)
                          ? openPartTimeSelectors.filter(
                              (employeeId) => employeeId !== employee.id
                            )
                          : [...openPartTimeSelectors, employee.id]
                      )
                    }
                  >
                    {openPartTimeSelectors.includes(employee.id) && (
                      <div className="flex items-center gap-2">
                        <div
                          className="rounded-md px-2 font-gilroy-regular text-xs font-normal text-evergreen hover:bg-misty-moonstone"
                          onClick={() => {
                            setOpenPartTimeSelectors(
                              openPartTimeSelectors.filter(
                                (employeeId) => employeeId !== employee.id
                              )
                            );
                            handleEmployeesSelection(
                              selectedEmployees.map((selectedEmployee) =>
                                selectedEmployee.employee.id === employee.id
                                  ? { partTime: false, employee }
                                  : selectedEmployee
                              )
                            );
                          }}
                        >
                          Full time
                        </div>
                        <div
                          className="rounded-md px-2 font-gilroy-regular text-xs font-normal text-evergreen hover:bg-misty-moonstone"
                          onClick={() => {
                            [...openPartTimeSelectors, employee.id];
                            handleEmployeesSelection(
                              selectedEmployees.map((selectedEmployee) =>
                                selectedEmployee.employee.id === employee.id
                                  ? { partTime: true, employee }
                                  : selectedEmployee
                              )
                            );
                          }}
                        >
                          Part time
                        </div>
                      </div>
                    )}
                    <span className="font-gilroy-regular text-xs font-normal text-evergreen">
                      {!openPartTimeSelectors.includes(employee.id)
                        ? !partTime
                          ? "Full time"
                          : "Part time"
                        : ""}
                    </span>
                    <img
                      className={`transition ${
                        openPartTimeSelectors.find(
                          (employeeId) => employeeId === employee.id
                        )
                          ? "rotate-180"
                          : ""
                      }`}
                      src={chevronDown}
                      alt="Down icon"
                    />
                  </div>
                </div>
                <img
                  className="transition hover:scale-125 hover:cursor-pointer"
                  src={cancel}
                  alt="Cancel icon"
                  onClick={() => {
                    handleEmployeesSelection(
                      selectedEmployees.filter(
                        ({ employee: selectedEmployee }) =>
                          selectedEmployee.id !== employee.id
                      )
                    );
                    setOpenPartTimeSelectors(
                      openPartTimeSelectors.filter(
                        (employeeId) => employeeId !== employee.id
                      )
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeesSelector;
