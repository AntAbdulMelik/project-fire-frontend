import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Project } from "src/types";
import { useAppSelector } from "store/hooks";
import { selectUserRole } from "store/slices/authSlice";
import { useDeleteProjectMutation } from "store/slices/projectsApiSlice";
import BackButton from "components/utils/BackButton";
import AlertModal from "components/modals/AlertModal";
import SideDrawer from "components/navigation/SideDrawer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import Footer from "components/layout/Footer";
import ProjectInfo from "features/projects/ProjectInfo";

type Props = {
  project: Project;
  closeViewProjectSideDrawer: () => void;
  openEditProjectSideDrawer: () => void;
};

const ViewProject = ({
  project,
  closeViewProjectSideDrawer,
  openEditProjectSideDrawer,
}: Props) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const userRole = useAppSelector(selectUserRole);
  const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

  const onConfirm = async () => {
    await deleteProject({ projectId: project.id });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsAlertModalOpen(false);
      closeViewProjectSideDrawer();
    }
  }, [isSuccess]);

  const children = (
    <>
      {isAlertModalOpen && (
        <AlertModal
          alertTitle={`Are you sure you want to delete ${project.name}?`}
          alertDescription={`This will permanently delete ${project.name} and all associated data. You cannot undo this action.`}
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
        <BackButton closeSideDrawer={closeViewProjectSideDrawer} />
        {project && (
          <>
            <Header className="mt-[13px]">
              <h2 className="rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey">
                {project.name}
              </h2>
            </Header>
            <Main className="flex flex-col gap-5">
              <ProjectInfo project={project} />
            </Main>
            {userRole === "Admin" && (
              <Footer
                firstButtonClassName="border border-crimson-blaze text-crimson-blaze"
                secondButtonClassName="bg-deep-teal text-white"
                firstButtonText="Delete Project"
                secondButtonText="Edit Project"
                handleFirstButtonClick={() => setIsAlertModalOpen(true)}
                handleSecondButtonClick={() => {
                  closeViewProjectSideDrawer();
                  openEditProjectSideDrawer();
                }}
              />
            )}
          </>
        )}
      </motion.div>
    </>
  );

  return (
    <SideDrawer onClick={closeViewProjectSideDrawer}>{children}</SideDrawer>
  );
};

export default ViewProject;
