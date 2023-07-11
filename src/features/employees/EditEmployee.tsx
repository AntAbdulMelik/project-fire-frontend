import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import { motion } from "framer-motion";

import { Employee } from "src/types";
import { useUpdateEmployeeMutation } from "store/slices/employeesApiSlice";
import BackButton from "components/utils/BackButton";
import InputField from "components/formElements/InputField";
import ImageUpload from "components/formElements/ImageUpload";
import DepartmentSelector from "components/selectors/DepartmentSelector";
import CurrencySelector from "components/selectors/CurrencySelector";
import TechStackSelector from "components/selectors/TechStackSelector";
import SideDrawer from "components/navigation/SideDrawer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import Footer from "components/layout/Footer";
import EmploymentStatus from "features/employees/EmploymentStatus";

type Props = {
  employee: Employee;
  closeEditEmployeeSideDrawer: () => void;
};

const EditEmployee = ({ employee, closeEditEmployeeSideDrawer }: Props) => {
  const salaryRef = useRef<HTMLInputElement | null>(null);
  const [salaryInputFieldHeight, setSalaryInputFieldHeight] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [newImageUploaded, setNewImageUploaded] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState("");
  const [isEmployed, setIsEmployed] = useState(true);

  const [updateEmployee, { isSuccess }] = useUpdateEmployeeMutation();

  const fetchImage = useCallback(async () => {
    if (employee?.image) {
      const response = await fetch(employee.image);
      const blob = await response.blob();
      const imageFile = new File([blob], "profile-image.jpg", {
        type: "image/jpeg",
      });
      setImage(imageFile);
    }
  }, [employee]);

  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setSelectedDepartment(employee.department);
      setSalary(employee.salary.toString());
      setSelectedCurrency(employee.currency);
      setSelectedTechStack(employee.techStack);
      setIsEmployed(employee.isEmployed);
      fetchImage();
    }
  }, [employee]);

  const editEmployee = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (newImageUploaded && image) formData.append("image", image);
    formData.append("department", selectedDepartment);
    formData.append("salary", salary);
    formData.append("currency", selectedCurrency);
    formData.append("techStack", selectedTechStack);
    formData.append("isEmployed", isEmployed.toString());
    await updateEmployee({ employeeId: employee.id, data: formData });
  };

  useEffect(() => {
    if (isSuccess) closeEditEmployeeSideDrawer();
  }, [isSuccess]);

  useEffect(() => {
    if (!isSuccess) {
      if (
        selectedDepartment === "Administration" &&
        selectedTechStack === "MgmtNA"
      )
        setSelectedTechStack("AdminNA");
      else if (
        selectedDepartment === "Management" &&
        selectedTechStack === "AdminNA"
      )
        setSelectedTechStack("MgmtNA");
    }
  }, [selectedDepartment]);

  useLayoutEffect(() => {
    setSalaryInputFieldHeight(salaryRef.current?.offsetHeight ?? 0);
  }, []);

  const children = (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed right-0 top-0 z-20 flex h-full w-full flex-col bg-frosty-mint px-6 pt-[27px] md:w-[496px]"
    >
      <BackButton closeSideDrawer={closeEditEmployeeSideDrawer} />
      {employee && (
        <>
          <Header className="mt-[13px]">
            <h2 className="rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey">
              Edit Employee
            </h2>
          </Header>
          <Main className="rounded-lg bg-white p-6">
            <form className="flex flex-col gap-4">
              <InputField
                containerClassName="gap-1"
                labelClassName="leading-[22px]"
                inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
                required
                type="text"
                label="First Name"
                htmlFor="firstName"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                handleInput={(firstName) => setFirstName(firstName)}
              />
              <InputField
                containerClassName="gap-1"
                labelClassName="leading-[22px]"
                inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
                required
                type="text"
                label="Last Name"
                htmlFor="lastName"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                handleInput={(lastName) => setLastName(lastName)}
              />
              <ImageUpload
                containerClassName="gap-1"
                labelClassName="leading-[22px]"
                inputClassName="h-[104px] w-[104px] border-ashen-grey bg-frosty-mint"
                label="Profile Image"
                image={image}
                handleImageUpload={(file) => {
                  setImage(file);
                  setNewImageUploaded(true);
                }}
              />
              <DepartmentSelector
                selectedDepartment={selectedDepartment}
                handleDepartmentSelection={(department) =>
                  setSelectedDepartment(department)
                }
              />
              <div className="flex gap-2">
                <InputField
                  ref={salaryRef}
                  containerClassName="gap-1"
                  labelClassName="leading-[22px]"
                  inputContainerClassName="flex gap-2 w-full"
                  inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
                  required
                  type="number"
                  label="Monthly Salary"
                  htmlFor="salary"
                  id="salary"
                  name="salary"
                  min={0}
                  step={0.01}
                  placeholder="Enter the amount"
                  value={salary}
                  handleInput={(salary) => setSalary(salary)}
                />
                <CurrencySelector
                  height={salaryInputFieldHeight}
                  selectedCurrency={selectedCurrency}
                  handleCurrencySelection={(currency) =>
                    setSelectedCurrency(currency)
                  }
                />
              </div>
              <TechStackSelector
                selectedDepartment={selectedDepartment}
                selectedTechStack={selectedTechStack}
                handleTechStackSelection={(techStack) =>
                  setSelectedTechStack(techStack)
                }
              />
              <EmploymentStatus
                isEmployed={isEmployed}
                handleEmploymentStatusChange={(event) =>
                  setIsEmployed(event.target.checked)
                }
              />
            </form>
          </Main>
          <Footer
            firstButtonClassName="border border-deep-teal text-evergreen"
            secondButtonClassName="bg-deep-teal text-white"
            firstButtonText="Cancel"
            secondButtonText="Edit Employee"
            handleFirstButtonClick={closeEditEmployeeSideDrawer}
            handleSecondButtonClick={editEmployee}
          />
        </>
      )}
    </motion.div>
  );

  return (
    <SideDrawer onClick={closeEditEmployeeSideDrawer}>{children}</SideDrawer>
  );
};

export default EditEmployee;
