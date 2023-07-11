import { useState, useEffect } from "react";

import { Project } from "src/types";
import { useAppSelector } from "store/hooks";
import { selectCurrentUser } from "store/slices/authSlice";
import { useGetProjectsQuery } from "store/slices/projectsApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import Pagination from "components/pagination";
import Navbar from "components/navigation/NavBar";
import MainLayout from "components/layout";
import FilterSelector from "components/selectors/FilterSelector";
import ProjectsTable from "features/projects/ProjectsTable";
import ResponsiveProjectsTable from "features/projects/ResponsiveProjectsTable";
import ViewProject from "features/projects/ViewProject";
import AddProject from "features/projects/AddProject";
import EditProject from "features/projects/EditProject";

const navLabels = [
  "All Projects",
  "Active",
  "On hold",
  "Inactive",
  "Completed",
];

const Projects = () => {
  const [activePage, setActivePage] = useState(1);
  const [isViewProjectSideDrawerOpen, setIsViewProjectSideDrawerOpen] =
    useState(false);
  const [isAddProjectSideDrawerOpen, setIsAddProjectSideDrawerOpen] =
    useState(false);
  const [isEditProjectSideDrawerOpen, setIsEditProjectSideDrawerOpen] =
    useState(false);
  const [projectId, setProjectId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [orderByField, setOrderByField] = useState("name");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [projectsPerPage, setProjectsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowLg, setWindowLg] = useState(windowWidth >= 1024);

  const user = useAppSelector(selectCurrentUser);
  const { isLoading, isFetching, isSuccess, data } = useGetProjectsQuery(
    {
      searchTerm,
      projectStatus,
      orderByField,
      orderDirection,
      projectsPerPage,
      currentPage,
    },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (activePage === 1) setProjectStatus("");
    else if (activePage === 2) setProjectStatus("Active");
    else if (activePage === 3) setProjectStatus("OnHold");
    else if (activePage === 4) setProjectStatus("Inactive");
    else if (activePage === 5) setProjectStatus("Completed");
  }, [activePage]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWindowLg(windowWidth >= 1024);
    return () => window.removeEventListener("resize", handleResize);
  });

  const project =
    isSuccess &&
    data.projects.find((project: Project) => project.id === projectId);

  return (
    <MainLayout activeMenuItem={"projects"}>
      {isViewProjectSideDrawerOpen && (
        <ViewProject
          project={project}
          closeViewProjectSideDrawer={() =>
            setIsViewProjectSideDrawerOpen(false)
          }
          openEditProjectSideDrawer={() => setIsEditProjectSideDrawerOpen(true)}
        />
      )}
      {isAddProjectSideDrawerOpen && (
        <AddProject
          closeAddProjectSideDrawer={() => setIsAddProjectSideDrawerOpen(false)}
        />
      )}
      {isEditProjectSideDrawerOpen && (
        <EditProject
          project={project}
          closeEditProjectSideDrawer={() =>
            setIsEditProjectSideDrawerOpen(false)
          }
        />
      )}
      <div className="mx-14 mb-[17px] mt-14 md:mt-[34px]">
        <div className="mb-[30px] flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-0">
          <h1 className="font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest">
            Projects
          </h1>
          {user?.role === "Admin" && (
            <button
              className="rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]"
              onClick={() => setIsAddProjectSideDrawerOpen(true)}
            >
              Create new project
            </button>
          )}
        </div>
        <div className="flex w-full justify-center sm:hidden">
          <FilterSelector
            label="Filter"
            options={[
              "All Projects",
              "Active",
              "On Hold",
              "Inactive",
              "Completed",
            ]}
            defaultValue="All Projects"
            handleYearSelect={(status) => {
              status === "All Projects"
                ? setProjectStatus("")
                : status === "On Hold"
                ? setProjectStatus("OnHold")
                : setProjectStatus(status);
            }}
          />
        </div>
        <div className="hidden flex-col sm:flex">
          <div className="mb-[30px]">
            <Navbar
              navLabels={navLabels}
              handlePageSelect={(pageNumber) => {
                setActivePage(pageNumber);
                setProjectsPerPage(10);
                setCurrentPage(1);
                setSearchTerm("");
                setOrderByField("name");
                setOrderDirection("asc");
              }}
            />
          </div>
          {isLoading || isFetching ? (
            <LoadingSpinner />
          ) : (
            isSuccess &&
            windowLg && (
              <ProjectsTable
                totalNumberOfProjects={data.pageInfo.total}
                projects={data.projects}
                value={searchTerm}
                orderByField={orderByField}
                orderDirection={orderDirection}
                handleSearch={(input) => setSearchTerm(input)}
                handleSort={(label: string, orderDirection: string) => {
                  setOrderByField(label);
                  setOrderDirection(orderDirection);
                }}
                openViewProjectSideDrawer={(projectId: string) => {
                  setIsViewProjectSideDrawerOpen(true);
                  setProjectId(projectId);
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
          isSuccess &&
          !windowLg && (
            <div className="w-[95%]">
              <ResponsiveProjectsTable
                totalNumberOfProjects={data.pageInfo.total}
                projects={data.projects}
                value={searchTerm}
                orderByField={orderByField}
                orderDirection={orderDirection}
                handleSearch={(input) => setSearchTerm(input)}
                handleSort={(label: string, orderDirection: string) => {
                  setOrderByField(label);
                  setOrderDirection(orderDirection);
                }}
                project={project}
                closeViewProjectSideDrawer={() =>
                  setIsViewProjectSideDrawerOpen(false)
                }
              />
            </div>
          )
        )}
      </div>
      <div className="mx-14 mb-[25px]">
        {isSuccess && (
          <Pagination
            total={data.pageInfo.total}
            currentPage={data.pageInfo.currentPage}
            lastPage={data.pageInfo.lastPage}
            perPage={projectsPerPage}
            items="Projects"
            handlePerPageSelection={(projectsPerPage) => {
              setProjectsPerPage(projectsPerPage);
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

export default Projects;
