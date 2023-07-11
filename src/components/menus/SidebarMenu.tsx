import {
  home,
  clipboard,
  employees,
  coins,
  document,
  invoice,
} from "assets/media";
import SidebarMenuItem from "components/menus/SidebarMenuItem";

type Props = {
  activeMenuItem: string;
  isHamburgerMenu?: boolean;
};

const SidebarMenu = ({ activeMenuItem, isHamburgerMenu }: Props) => {
  const isSideBarItemDisabled = true;

  return (
    <div className="flex flex-col gap-[8px] px-[14px] py-[10px]">
      <SidebarMenuItem
        to="/home"
        src={home}
        label="Home"
        isActive={activeMenuItem === "home"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to="/projects"
        src={clipboard}
        label="Projects"
        isActive={activeMenuItem === "projects"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to="/employees"
        src={employees}
        label="Employees"
        isActive={activeMenuItem === "employees"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to="/financial-overview"
        src={coins}
        label="Financial Overview"
        isActive={activeMenuItem === "financial-overview"}
        isHamburgerMenu={isHamburgerMenu}
        isDisabled={isSideBarItemDisabled}
      />
      <SidebarMenuItem
        to="/project-reporting"
        src={document}
        label="Project Reporting"
        isActive={activeMenuItem === "project-reporting"}
        isHamburgerMenu={isHamburgerMenu}
        isDisabled={isSideBarItemDisabled}
      />
      <SidebarMenuItem
        to="/invoicing"
        src={invoice}
        label="Invoicing"
        isActive={activeMenuItem === "invoicing"}
        isHamburgerMenu={isHamburgerMenu}
      />
    </div>
  );
};

export default SidebarMenu;
