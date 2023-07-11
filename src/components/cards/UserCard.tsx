import { arrow } from "assets/media";
import { useAppSelector } from "store/hooks";
import { selectCurrentUser } from "store/slices/authSlice";
import Avatar from "components/utils/Avatar";

type Props = {
  className: string;
  isUserMenuOpen: boolean;
  onClick: () => void;
};

const UserCard = ({ className, isUserMenuOpen, onClick }: Props) => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div
      className={`flex items-center justify-between gap-[13px] px-[14px] py-[10px] ${className}`}
    >
      <div className="flex flex-wrap items-center gap-[13px]">
        <Avatar
          className="h-[54px] w-[54px] rounded-lg"
          src={user?.image}
          alt="User image"
        />
        <div className="flex flex-col gap-[3px]">
          <div className="flex flex-wrap gap-[3px]">
            <span className="whitespace-nowrap font-inter-medium text-base font-medium text-steel-blue">
              {user?.firstName}
            </span>
            <span className="whitespace-nowrap font-inter-medium text-base font-medium text-steel-blue">
              {user?.lastName}
            </span>
          </div>
          <span className="font-inter-regular text-[14px] font-normal leading-[18px] text-charcoal-grey">
            {user?.role}
          </span>
        </div>
      </div>
      <img
        src={arrow}
        className={`cursor-pointer transition ${
          isUserMenuOpen ? "rotate-180" : ""
        }`}
        onClick={onClick}
      />
    </div>
  );
};

export default UserCard;
