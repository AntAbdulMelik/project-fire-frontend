import { useState } from "react";

import NavLink from "components/navigation/NavLink";

type Props = {
  navLabels: string[];
  handlePageSelect: (page: number) => void;
};

const Navbar = ({ navLabels, handlePageSelect }: Props) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const activeLink =
    "bg-aqua-haze text-moss-green font-inter-semi-bold font-semibold";
  const inactiveLink = "text-blue-grey font-inter-regular font-normal";

  return (
    <div className="flex items-center">
      <div className="sm:flex-start flex flex-col sm:flex-row">
        {navLabels.map((label, index) => (
          <NavLink
            key={index}
            className={`${
              selectedPage === index + 1 ? activeLink : inactiveLink
            } 
						${index === 0 ? "!rounded-l !border-l" : ""} ${
              index === navLabels.length - 1 ? "!rounded-r !border-r" : ""
            } rounded border-l border-r sm:rounded-none sm:border-l-0`}
            label={label}
            onClick={() => {
              handlePageSelect(index + 1);
              setSelectedPage(index + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
