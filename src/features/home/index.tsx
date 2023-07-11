import { useState } from "react";

import { useGetProjectsInfoQuery } from "store/slices/projectsApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import YearSelector from "components/selectors/YearSelector";
import Navbar from "components/navigation/NavBar";
import MainLayout from "components/layout";
import Performance from "features/home/Performance";
import DevelopmentRevenueCosts from "features/home/DevelopmentRevenueCosts";
import Plan from "features/home/Plan";

const Home = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [activePage, setActivePage] = useState(1);

  const {
    isLoading,
    isFetching,
    isSuccess,
    data: projectsInfo,
  } = useGetProjectsInfoQuery(
    { year: selectedYear },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const navLabels = [
    `${selectedYear}  Performance`,
    "Development Revenue & Costs",
    `${selectedYear} Plan`,
  ];

  return (
    <MainLayout activeMenuItem={"home"}>
      <div className="mx-4 my-[34px] lg:mx-14">
        <h1 className="mt-24 flex flex-1 justify-center font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest sm:justify-start lg:mt-0">
          Home
        </h1>
        <div className="mt-[30px] flex flex-col">
          <div className="mb-12 flex flex-wrap justify-center gap-4 lg:justify-between">
            <Navbar
              navLabels={navLabels}
              handlePageSelect={(page) => setActivePage(page)}
            />
            <YearSelector
              selectedYear={selectedYear}
              handleYearSelection={(year) => setSelectedYear(year)}
            />
          </div>
          {isLoading || isFetching ? (
            <LoadingSpinner />
          ) : (
            isSuccess && (
              <>
                {activePage === 1 && (
                  <Performance
                    selectedYear={selectedYear}
                    projectsInfo={projectsInfo}
                  />
                )}
                {activePage === 2 && <DevelopmentRevenueCosts />}
                {activePage === 3 && <Plan />}
              </>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
