import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { revenuesCostsActualChartData } from "src/data";
import DataSelector from "components/selectors/DataSelector";
import DataCard from "components/cards/DataCard";

const RevenuesCostsActualChart = () => {
  const [firstOption, setFirstOption] = useState(true);
  const [secondOption, setSecondOption] = useState(true);

  const headerContent = (
    <>
      <div className="flex items-center gap-[10px]">
        <h2 className="font-gilroy-semi-bold text-lg font-semibold text-deep-forest">
          Revenues & costs (per project) - actual
        </h2>
        <a
          href="#"
          className="font-inter-medium text-base font-medium leading-[19px] text-sage-green underline"
        >
          See Details
        </a>
      </div>
      <div className="flex gap-4">
        <DataSelector
          label="Grand Total Total Billed"
          htmlFor="revenuesCostsActualFirstOption"
          id="revenuesCostsActualFirstOption"
          name="revenuesCostsActualFirstOption"
          color="#FF9F5A"
          checked={firstOption}
          toggle={() => setFirstOption(!firstOption)}
        />
        <DataSelector
          label="Grand Total Costs"
          htmlFor="revenuesCostsActalSecondOption"
          id="revenuesCostsActalSecondOption"
          name="revenuesCostsActalSecondOption"
          color="#7BB99F"
          checked={secondOption}
          toggle={() => setSecondOption(!secondOption)}
        />
      </div>
    </>
  );

  return (
    <DataCard
      className="h-[392px] rounded-[6px] border border-ashen-grey bg-white"
      header={headerContent}
    >
      <ResponsiveContainer width="100%" height="65%" className="mt-[38px]">
        <BarChart data={revenuesCostsActualChartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="organisation"
            tickLine={false}
            dy={12}
            tick={{
              fontFamily: "GilroyMedium",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.06em",
              fill: "#232F2D",
            }}
          />
          <YAxis
            domain={[0, 600000]}
            axisLine={false}
            tickLine={false}
            tick={{
              fontFamily: "GilroyMedium",
              fontWeight: 500,
              fontSize: 14,
              fill: "#232F2D",
            }}
          />
          <Tooltip />
          {firstOption && (
            <Bar
              dataKey="Grand Total Total Billed"
              fill="#FF9F5A"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          )}
          {secondOption && (
            <Bar
              dataKey="Grand Total Costs"
              fill="#7BB99F"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </DataCard>
  );
};

export default RevenuesCostsActualChart;
