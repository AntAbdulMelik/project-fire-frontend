import { Project } from "src/types";
import { projectsTableColumnsData as columns } from "src/data";
import Table from "components/tableElements/Table";
import ProjectsTableRow from "features/projects/ProjectsTableRow";

type Props = {
  totalNumberOfProjects: number;
  projects: Project[];
  value: string;
  orderByField: string;
  orderDirection: string;
  handleSearch: (input: string) => void;
  handleSort: (label: string, orderDirection: string) => void;
  openViewProjectSideDrawer: (projectId: string) => void;
};

const ProjectsTable = ({
  totalNumberOfProjects,
  projects,
  value,
  orderByField,
  orderDirection,
  handleSearch,
  handleSort,
  openViewProjectSideDrawer,
}: Props) => {
  return (
    <Table
      label="All Projects"
      total={totalNumberOfProjects}
      value={value}
      columns={columns}
      orderByField={orderByField}
      orderDirection={orderDirection}
      handleSearch={handleSearch}
      handleSort={handleSort}
      rows={projects.map((project) => (
        <ProjectsTableRow
          key={project.id}
          project={project}
          openViewProjectSideDrawer={openViewProjectSideDrawer}
        />
      ))}
    />
  );
};

export default ProjectsTable;
