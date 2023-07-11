import { editIcon, deleteIcon } from "assets/media";

type Props = {
  employeeId: string;
  handleDelete: (employeeId: string) => void;
  openEditEmployeeSideDrawer: (employeeId: string) => void;
};

const EmployeeActions = ({
  employeeId,
  openEditEmployeeSideDrawer,
  handleDelete,
}: Props) => {
  return (
    <div className="flex items-center ">
      <div
        className="flex items-center gap-2 px-2 hover:cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          openEditEmployeeSideDrawer(employeeId);
        }}
      >
        <img className="h-[14px] w-[14px]" src={editIcon} alt="Edit Iicon" />
        <span>Edit</span>
      </div>
      <div className="h-3 border border-ashen-grey" />
      <div
        className="flex items-center gap-2 px-2 hover:cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          handleDelete(employeeId);
        }}
      >
        <img className="h-[14px] w-[14px]" src={deleteIcon} alt="Delete icon" />
        <span>Delete</span>
      </div>
    </div>
  );
};

export default EmployeeActions;
