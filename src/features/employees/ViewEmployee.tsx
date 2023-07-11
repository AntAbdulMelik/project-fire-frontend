import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Employee } from "src/types";
import { useAppSelector } from "store/hooks";
import { selectUserRole } from "store/slices/authSlice";
import { useDeleteEmployeeMutation } from "store/slices/employeesApiSlice";
import BackButton from "components/utils/BackButton";
import AlertModal from "components/modals/AlertModal";
import EmployeeCard from "components/cards/EmployeeCard";
import SideDrawer from "components/navigation/SideDrawer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import Footer from "components/layout/Footer";
import EmployeeInfo from "features/employees/EmployeeInfo";
import AssignedToProjects from "features/employees/AssignedToProjects";

type Props = {
  employee: Employee;
  closeViewEmployeeSideDrawer: () => void;
  openEditEmployeeSideDrawer: () => void;
};

const ViewEmployee = ({
  employee,
  closeViewEmployeeSideDrawer,
  openEditEmployeeSideDrawer,
}: Props) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const userRole = useAppSelector(selectUserRole);
  const [deleteEmployee, { isSuccess }] = useDeleteEmployeeMutation();

  const onConfirm = async () => {
    await deleteEmployee({ employeeId: employee.id });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsAlertModalOpen(false);
      closeViewEmployeeSideDrawer();
    }
  }, [isSuccess]);

  const children = (
    <>
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
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed right-0 top-0 z-20 flex h-full w-full flex-col bg-frosty-mint px-6 pt-[27px] md:w-[496px]"
      >
        <BackButton closeSideDrawer={closeViewEmployeeSideDrawer} />
        {employee && (
          <>
            <Header className="mt-[13px]">
              <EmployeeCard employee={employee} />
            </Header>
            <Main className="flex flex-col gap-5">
              <EmployeeInfo employee={employee} />
              <AssignedToProjects employee={employee} />
            </Main>
            {userRole === "Admin" && (
              <Footer
                firstButtonClassName="border border-crimson-blaze text-crimson-blaze"
                secondButtonClassName="bg-deep-teal text-white"
                firstButtonText="Delete Employee"
                secondButtonText="Edit Employee"
                handleFirstButtonClick={() => setIsAlertModalOpen(true)}
                handleSecondButtonClick={() => {
                  closeViewEmployeeSideDrawer();
                  openEditEmployeeSideDrawer();
                }}
              />
            )}
          </>
        )}
      </motion.div>
    </>
  );

  return (
    <SideDrawer onClick={closeViewEmployeeSideDrawer}>{children}</SideDrawer>
  );
};

export default ViewEmployee;
