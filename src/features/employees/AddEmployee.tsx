import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";

import { useCreateEmployeeMutation } from "store/slices/employeesApiSlice";
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

type Props = {
  closeAddEmployeeSideDrawer: () => void;
};

const AddEmployee = ({ closeAddEmployeeSideDrawer }: Props) => {
  const salaryRef = useRef<HTMLInputElement | null>(null);
  const [salaryInputFieldHeight, setSalaryInputFieldHeight] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("BAM");
  const [selectedTechStack, setSelectedTechStack] = useState("");

  const [createEmployee, { isSuccess }] = useCreateEmployeeMutation();

  const addEmployee = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (image) formData.append("image", image);
    formData.append("department", selectedDepartment);
    formData.append("salary", salary);
    formData.append("currency", selectedCurrency);
    formData.append("techStack", selectedTechStack);
    await createEmployee(formData);
  };

  useEffect(() => {
    if (isSuccess) closeAddEmployeeSideDrawer();
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
      <Header className="flex flex-col gap-[13px]">
        <BackButton closeSideDrawer={closeAddEmployeeSideDrawer} />
        <h2 className="rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey">
          Add New Employee
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
            handleImageUpload={(file) => setImage(file)}
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
        </form>
      </Main>
      <Footer
        firstButtonClassName="border border-deep-teal text-evergreen"
        secondButtonClassName="bg-deep-teal text-white"
        firstButtonText="Cancel"
        secondButtonText="Add Employee"
        handleFirstButtonClick={closeAddEmployeeSideDrawer}
        handleSecondButtonClick={addEmployee}
      />
    </motion.div>
  );

  return (
    <SideDrawer onClick={closeAddEmployeeSideDrawer}>{children}</SideDrawer>
  );
};

export default AddEmployee;
