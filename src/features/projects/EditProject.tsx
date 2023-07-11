import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Employees, Project } from "src/types";
import { useUpdateProjectMutation } from "store/slices/projectsApiSlice";
import BackButton from "components/utils/BackButton";
import InputField from "components/formElements/InputField";
import DateInputs from "components/formElements/DateInputs";
import DateInput from "components/formElements/DateInput";
import EmployeesSelector from "components/selectors/EmployeesSelector";
import ProjectTypeSelector from "components/selectors/ProjectTypeSelector";
import SalesChannelSelector from "components/selectors/SalesChannelSelector";
import ProjectStatusSelector from "components/selectors/ProjectStatusSelector";
import SideDrawer from "components/navigation/SideDrawer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import Footer from "components/layout/Footer";

type Props = {
  project: Project;
  closeEditProjectSideDrawer: () => void;
};

const EditProject = ({ project, closeEditProjectSideDrawer }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(new Date().getFullYear(), 11, 31)
  );
  const [actualEndDate, setActualEndDate] = useState<Date | null>(null);
  const [hourlyRate, setHourlyRate] = useState("");
  const [projectValueBAM, setProjectValueBAM] = useState("");
  const [projectVelocity, setProjectVelocity] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [selectedSalesChannel, setSelectedSalesChannel] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<Employees[]>([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("");

  const [updateProject, { isSuccess }] = useUpdateProjectMutation();

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStartDate(new Date(project.startDate));
      setEndDate(new Date(project.endDate));
      setActualEndDate(
        project.actualEndDate ? new Date(project.actualEndDate) : null
      );
      setHourlyRate(project.hourlyRate.toString());
      setProjectValueBAM(project.projectValueBAM.toString());
      setProjectVelocity(project.projectVelocity.toString());
      setSelectedProjectType(project.projectType);
      setSelectedSalesChannel(project.salesChannel);
      setSelectedEmployees(project.employees);
      setSelectedProjectStatus(project.projectStatus);
    }
  }, [project]);

  const editProject = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const employees = selectedEmployees.map(({ partTime, employee }) => ({
      partTime,
      employeeId: employee.id,
    }));
    const data = {
      name,
      description,
      startDate,
      endDate,
      actualEndDate,
      projectType: selectedProjectType,
      hourlyRate: Number(hourlyRate),
      projectValueBAM: Number(projectValueBAM),
      projectVelocity: Number(projectVelocity),
      salesChannel: selectedSalesChannel,
      projectStatus: selectedProjectStatus,
      employees,
    };
    await updateProject({ projectId: project.id, data });
  };

  useEffect(() => {
    if (isSuccess) closeEditProjectSideDrawer();
  }, [isSuccess]);

  const children = (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed right-0 top-0 z-20 flex h-full w-full flex-col bg-frosty-mint px-6 pt-[27px] md:w-[496px]"
    >
      <Header className="flex flex-col gap-[13px]">
        <BackButton closeSideDrawer={closeEditProjectSideDrawer} />
        <h2 className="rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey">
          Edit Project
        </h2>
      </Header>
      <Main className="rounded-lg bg-white p-6 ">
        <form className="flex flex-col gap-4">
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="text"
            label="Name"
            htmlFor="name"
            id="name"
            name="name"
            placeholder="Project name"
            value={name}
            handleInput={(name) => setName(name)}
          />
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="text"
            label="Description"
            htmlFor="description"
            id="description"
            name="description"
            placeholder="Project description"
            value={description}
            handleInput={(description) => setDescription(description)}
          />
          <ProjectTypeSelector
            selectedProjectType={selectedProjectType}
            handleProjectTypeSelection={(projectType) =>
              setSelectedProjectType(projectType)
            }
          />
          <SalesChannelSelector
            selectedSalesChannel={selectedSalesChannel}
            handleSalesChannelSelection={(salesChannel) =>
              setSelectedSalesChannel(salesChannel)
            }
          />
          <DateInputs
            label="Duration"
            startDateClassName="w-[175px]"
            endDateClassName="w-[175px]"
            selectedStartDate={startDate}
            selectedEndDate={endDate}
            handleStartDateSelection={(startDate) => setStartDate(startDate)}
            handleEndDateSelection={(endDate) => setEndDate(endDate)}
          />
          {selectedProjectStatus === "Completed" && (
            <DateInput
              label="Actual end date"
              selectedDate={actualEndDate}
              className="w-full"
              handleDateSelection={(actualEndDate) =>
                setActualEndDate(actualEndDate)
              }
            />
          )}
          <EmployeesSelector
            selectedEmployees={selectedEmployees}
            projectStartDate={startDate}
            projectEndDate={endDate}
            handleEmployeesSelection={(employees) => {
              setSelectedEmployees(employees);
            }}
          />
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputContainerClassName="flex gap-2 w-full"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="number"
            label="Hourly Rate"
            htmlFor="hourlyRate"
            id="hourlyRate"
            name="hourlyRate"
            min={0}
            step={0.01}
            placeholder="Enter the amount"
            value={hourlyRate}
            handleInput={(hourlyRate) => setHourlyRate(hourlyRate)}
          />
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputContainerClassName="flex gap-2 w-full"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="number"
            label="Project Value (BAM)"
            htmlFor="projectValueBAM"
            id="projectValueBAM"
            name="projectValueBAM"
            min={0}
            step={0.01}
            placeholder="Enter the amount in BAM"
            value={projectValueBAM}
            handleInput={(projectValueBAM) =>
              setProjectValueBAM(projectValueBAM)
            }
          />
          <InputField
            containerClassName="gap-1"
            labelClassName="leading-[22px]"
            inputContainerClassName="flex gap-2 w-full"
            inputClassName="border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone"
            required
            type="number"
            label="Project Velocity"
            htmlFor="projectVelocity"
            id="projectVelocity"
            name="projectVelocity"
            min={0}
            step={0.01}
            placeholder="Enter the amount"
            value={projectVelocity}
            handleInput={(projectVelocity) =>
              setProjectVelocity(projectVelocity)
            }
          />
          <ProjectStatusSelector
            selectedProjectStatus={selectedProjectStatus}
            handleProjectStatusSelection={(projectStatus) => {
              setSelectedProjectStatus(projectStatus);
              if (projectStatus !== "Completed") setActualEndDate(null);
            }}
          />
        </form>
      </Main>
      <Footer
        firstButtonClassName="border border-deep-teal text-evergreen"
        secondButtonClassName="bg-deep-teal text-white"
        firstButtonText="Cancel"
        secondButtonText="Edit Project"
        handleFirstButtonClick={closeEditProjectSideDrawer}
        handleSecondButtonClick={editProject}
      />
    </motion.div>
  );

  return (
    <SideDrawer onClick={closeEditProjectSideDrawer}>{children}</SideDrawer>
  );
};

export default EditProject;
