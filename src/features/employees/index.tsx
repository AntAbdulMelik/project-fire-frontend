import { useState, useEffect } from "react";

import { Employee } from "src/types";
import { useAppSelector } from "store/hooks";
import { selectCurrentUser } from "store/slices/authSlice";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "store/slices/employeesApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import AlertModal from "components/modals/AlertModal";
import Pagination from "components/pagination";
import Navbar from "components/navigation/NavBar";
import MainLayout from "components/layout";
import EmployeesTable from "features/employees/EmployeesTable";
import ViewEmployee from "features/employees/ViewEmployee";
import AddEmployee from "features/employees/AddEmployee";
import EditEmployee from "features/employees/EditEmployee";
import ResponsiveEmployeesTable from "features/employees/ResponsiveEmployeesTable";

const navLabels = ["All Employees", "Current", "Past"];

const Employees = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isViewEmployeeSideDrawerOpen, setIsViewEmployeeSideDrawerOpen] =
    useState(false);
  const [isAddEmployeeSideDrawerOpen, setIsAddEmployeeSideDrawerOpen] =
    useState(false);
  const [isEditEmployeeSideDrawerOpen, setIsEditEmployeeSideDrawerOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isEmployed, setIsEmployed] = useState("");
  const [orderByField, setOrderByField] = useState("firstName");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowLg, setWindowLg] = useState(windowWidth >= 1024);

  const user = useAppSelector(selectCurrentUser);
  const {
    isLoading,
    isFetching,
    isSuccess: isEmployeesSuccess,
    data,
  } = useGetEmployeesQuery(
    {
      searchTerm,
      isEmployed,
      isStandardDateFilter: "",
      hiringDate: "",
      terminationDate: "",
      orderByField,
      orderDirection,
      employeesPerPage,
      currentPage,
    },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const [deleteEmployee, { isSuccess: isDeleteSuccess }] =
    useDeleteEmployeeMutation();

  const onConfirm = async () => {
    await deleteEmployee({ employeeId });
  };

  useEffect(() => {
    if (activePage === 1) setIsEmployed("");
    else if (activePage === 2) setIsEmployed("true");
    else if (activePage === 3) setIsEmployed("false");
  }, [activePage]);

  useEffect(() => {
    if (isDeleteSuccess) setIsAlertModalOpen(false);
  }, [isDeleteSuccess]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWindowLg(windowWidth >= 1024);
    return () => window.removeEventListener("resize", handleResize);
  });

  const employee =
    isEmployeesSuccess &&
    data.employees.find((employee: Employee) => employee.id === employeeId);

  return (
    <MainLayout activeMenuItem={"employees"}>
      {isAlertModalOpen && (
        <AlertModal
          alertTitle={`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`}
          alertDescription={`This will permanently delete ${employee.firstName} ${employee.lastName} and all associated data. You cannot undo this action.`}
          cancelButtonText="Don't Delete"
          confirmButtonText="Delete"
          confirmButtoncolor="#FF4D4F"
          onCancel={() => setIsAlertModalOpen(false)}
          onConfirm={onConfirm}
        />
      )}
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
      <div className="mx-14 mb-[17px] mt-14 md:mt-[34px]">
        <div className="mb-[30px] flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-0">
          <h1 className="font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest">
            Employees
          </h1>
          {user?.role === "Admin" && (
            <button
              className="rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]"
              onClick={() => setIsAddEmployeeSideDrawerOpen(true)}
            >
              Add New Employee
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <div className="mb-12 flex flex-wrap justify-center gap-4 lg:justify-between">
            <Navbar
              navLabels={navLabels}
              handlePageSelect={(pageNumber) => {
                setActivePage(pageNumber);
                setEmployeesPerPage(10);
                setCurrentPage(1);
                setSearchTerm("");
                setOrderByField("firstName");
                setOrderDirection("asc");
              }}
            />
          </div>
          {isLoading || isFetching ? (
            <LoadingSpinner />
          ) : (
            isEmployeesSuccess &&
            windowLg && (
              <EmployeesTable
                totalNumberOfEmployees={data.pageInfo.total}
                employees={data.employees}
                value={searchTerm}
                orderByField={orderByField}
                orderDirection={orderDirection}
                handleSearch={(input) => setSearchTerm(input)}
                handleSort={(label: string, orderDirection: string) => {
                  setOrderByField(label);
                  setOrderDirection(orderDirection);
                }}
                handleDelete={(employeeId) => {
                  setIsAlertModalOpen(true);
                  setEmployeeId(employeeId);
                }}
                openViewEmployeeSideDrawer={(employeeId: string) => {
                  setIsViewEmployeeSideDrawerOpen(true);
                  setEmployeeId(employeeId);
                }}
                openEditEmployeeSideDrawer={(employeeId: string) => {
                  setIsEditEmployeeSideDrawerOpen(true);
                  setEmployeeId(employeeId);
                }}
              />
            )
          )}
        </div>
      </div>
      <div className="mb-[25px] flex w-full justify-center">
        {isLoading || isFetching ? (
          <LoadingSpinner />
        ) : (
          isEmployeesSuccess &&
          !windowLg && (
            <div className="w-[95%]">
              <ResponsiveEmployeesTable
                totalNumberOfEmployees={data.pageInfo.total}
                employees={data.employees}
                value={searchTerm}
                orderByField={orderByField}
                orderDirection={orderDirection}
                handleSearch={(input) => setSearchTerm(input)}
                handleSort={(label: string, orderDirection: string) => {
                  setOrderByField(label);
                  setOrderDirection(orderDirection);
                }}
              />
            </div>
          )
        )}
      </div>
      <div className="mx-14 mb-[25px]">
        {isEmployeesSuccess && (
          <Pagination
            total={data.pageInfo.total}
            currentPage={data.pageInfo.currentPage}
            lastPage={data.pageInfo.lastPage}
            perPage={employeesPerPage}
            items="Employees"
            handlePerPageSelection={(employeesPerPage) => {
              setEmployeesPerPage(employeesPerPage);
              setCurrentPage(1);
              setSearchTerm("");
            }}
            handlePageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Employees;
