import { useState, useEffect } from "react";

import { Project } from "src/types";
import {
  getEmployeeNamesAndImages,
  getProjectDuration,
  getProjectValueBAM,
  getProjectColorAndStatus,
} from "src/helpers";
import TableRow from "components/tableElements/TableRow";
import Avatars from "features/projects/Avatars";

type Props = {
  project: Project;
  openViewProjectSideDrawer: (projectId: string) => void;
};

const ProjectsTableRow = ({ project, openViewProjectSideDrawer }: Props) => {
  const projectId = project.id;
  const { names, images } = getEmployeeNamesAndImages(project.employees);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let maxVisibleAvatars;
  windowWidth < 1228
    ? (maxVisibleAvatars = 1)
    : windowWidth < 1450
    ? (maxVisibleAvatars = 2)
    : (maxVisibleAvatars = 3);

  return (
    <TableRow
      key={projectId}
      onClick={() => openViewProjectSideDrawer(projectId)}
    >
      <td className="p-4">{project.name}</td>
      <td className="p-4">
        <div className="max-w-[100px] truncate">{project.description}</div>
      </td>
      <td className="p-4">
        {getProjectDuration(project.startDate, project.endDate)}
      </td>
      <td className="py-1 pl-4 pr-2">
        <Avatars
          names={names}
          images={images}
          maxVisibleAvatars={maxVisibleAvatars}
        />{" "}
      </td>
      <td className="p-4">${project.hourlyRate}</td>
      <td className="p-4">{getProjectValueBAM(project.projectValueBAM)} KM</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div
            className={`h-[6px] w-[6px] rounded-full ${
              getProjectColorAndStatus(project.projectStatus)?.color
            }`}
          />
          <div className="font-gilroy-semi-bold font-semibold">
            {getProjectColorAndStatus(project.projectStatus)?.status}
          </div>
        </div>
      </td>
    </TableRow>
  );
};

export default ProjectsTableRow;
