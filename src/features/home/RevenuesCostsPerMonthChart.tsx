import { revenuesCostsPerMonthChartData } from "src/data";
import DataCard from "components/cards/DataCard";
import RevenuesCostsPerMonthChartItem from "features/home/RevenuesCostsPerMonthChartItem";

const RevenuesCostsPerMonthChart = () => {
  const headerContent = (
    <>
      <div className="flex items-center gap-[10px]">
        <h2 className="font-gilroy-semi-bold text-lg font-semibold text-deep-forest">
          Revenues & costs (per project) - per month
        </h2>
        <a
          href="#"
          className="font-inter-medium text-base font-medium leading-[19px] text-sage-green underline"
        >
          See Details
        </a>
      </div>
    </>
  );

  return (
    <DataCard
      className="h-[695px] rounded-[6px] border border-ashen-grey bg-white pb-5"
      header={headerContent}
    >
      <div className="flex h-full justify-around gap-[70px]">
        <RevenuesCostsPerMonthChartItem
          className="h-[330px] w-[328px]"
          wrapperClassName="ml-16"
          item="firstItem"
          data={revenuesCostsPerMonthChartData.data[0]}
          revenueGap={revenuesCostsPerMonthChartData.revenueGap[0]}
          tickNumbers
        />
        <RevenuesCostsPerMonthChartItem
          className="h-[330px] w-[262px]"
          data={revenuesCostsPerMonthChartData.data[1]}
          item="secondItem"
          revenueGap={revenuesCostsPerMonthChartData.revenueGap[1]}
        />
        <RevenuesCostsPerMonthChartItem
          className="h-[330px] w-[262px]"
          data={revenuesCostsPerMonthChartData.data[2]}
          item="thirdItem"
          revenueGap={revenuesCostsPerMonthChartData.revenueGap[2]}
        />
      </div>
    </DataCard>
  );
};

export default RevenuesCostsPerMonthChart;
