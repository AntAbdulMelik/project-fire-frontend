import { useState } from "react";
import { motion } from "framer-motion";

import { logo, close, hamburger } from "assets/media";
import UserCard from "components/cards/UserCard";
import UserMenu from "components/menus/UserMenu";
import SidebarMenu from "components/menus/SidebarMenu";

type HamburgerMenuProps = {
  activeMenuItem: string;
};

const HamburgerMenu = ({ activeMenuItem }: HamburgerMenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-[15] w-full bg-frost-white md:hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <motion.button
            className="text-3xl text-deep-forest"
            onClick={() => {
              setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
              setMenuOpen(!isMenuOpen);
            }}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
          >
            {isMenuOpen ? (
              <img className="h-8 w-8" src={close} alt="Close icon" />
            ) : (
              <img src={hamburger} alt="Hamburger menu icon" />
            )}
          </motion.button>
        </div>
        <div>
          <img
            src={logo}
            className="absolute left-0 right-0 top-0 ml-auto mr-auto w-[150px] py-[20px]"
          />
        </div>
      </div>
      {isHamburgerMenuOpen && (
        <div className="h-screen border-b border-ashen-grey bg-gradient-to-b from-frost-white to-seafoam-green px-4 py-2">
          <UserCard
            className="mx-[14px] my-[10px] rounded-md border border-ashen-grey"
            isUserMenuOpen={isUserMenuOpen}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          />
          {isUserMenuOpen && (
            <div className="relative">
              <UserMenu className="right-0 top-0 w-[200px] overflow-hidden rounded-md border border-ashen-grey bg-seafoam-green shadow-[3px_3px_3px_rgba(0,0,0,0.3)]" />
            </div>
          )}
          <div>
            <SidebarMenu
              activeMenuItem={activeMenuItem}
              isHamburgerMenu={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
