import { Employee, Projects } from "src/types";

type Props = {
  employee: Employee;
};

const AssignedToProjects = ({ employee }: Props) => {
  return (
    <div
      className={`flex flex-col ${
        employee.projects.length > 0
          ? "min-h-[200px] overflow-y-auto scrollbar-thin scrollbar-track-ashen-grey scrollbar-thumb-misty-moonstone scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
          : ""
      } rounded-lg bg-white p-6`}
    >
      <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
        Assigned to projects
      </span>
      <div className="mt-2 flex flex-col gap-1">
        {employee.projects.length > 0 ? (
          employee.projects.map(
            ({ project, partTime }: Projects, index: number) => (
              <div
                key={project.id}
                className={`flex items-center justify-between gap-4 p-2 ${
                  index < employee.projects.length - 1
                    ? "border-b border-ashen-grey"
                    : ""
                }`}
              >
                <span className="font-gilroy-regular text-base font-normal text-slate-mist">
                  {project.name}
                </span>
                <span
                  className={`h-5 w-[68px] rounded-xl px-2 py-[2px] text-center font-gilroy-regular text-xs font-normal tracking-[0.16px] text-white ${
                    partTime ? "bg-blue-ash" : "bg-sage-green"
                  }`}
                >
                  {partTime ? "Part time" : "Full time"}
                </span>
              </div>
            )
          )
        ) : (
          <span className="font-gilroy-regular text-base font-normal text-slate-mist">
            Currently unassigned to any projects.
          </span>
        )}
      </div>
    </div>
  );
};

export default AssignedToProjects;
