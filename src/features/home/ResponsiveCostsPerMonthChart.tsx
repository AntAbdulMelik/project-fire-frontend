import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

import { arrow } from "assets/media";
import { responsiveCostsPerMonthChartData as data } from "src/data";
import ModalSelector from "components/modals/ModalSelector";
import DataCard from "components/cards/DataCard";

const COLORS = ["#7BB99F", "#FF9F5A", "#4C84F2", "#FDCA48"];
type Props = {};

const ResponsiveCostsPerMonthChart = (props: Props) => {
  const [project, setProject] = useState(data[0]);
  const [show, setShow] = useState(false);
  const handleNameClick = (index: number) => {
    setProject(data[index]);
    setShow(false);
  };
  const headerContent = (
    <div className="flex gap-[10px] self-start">
      <h2 className="font-gilroy-semi-bold text-lg font-semibold text-deep-forest">
        Revenues and Costs (per project) - per month
      </h2>
    </div>
  );
  return (
    <DataCard
      header={headerContent}
      className="w-full border border-ashen-grey pb-8 text-center font-gilroy-medium"
    >
      <div className="flex w-full justify-center bg-red-300">
        <h1
          className="absolute z-10 mt-[220px] flex cursor-pointer gap-2 font-gilroy-semi-bold text-2xl"
          onClick={() => {
            setShow(true);
          }}
        >
          {project.name} <img src={arrow} className="mt-1" />
        </h1>
      </div>
      <ModalSelector
        show={show}
        children={data}
        header="Select a project"
        isError={false}
        onCancel={() => {
          setShow(false);
        }}
        selectProject={handleNameClick}
      />
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            cy={110}
            data={project.value}
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            startAngle={360}
            endAngle={0}
            label
          >
            {project.value.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend
            height={80}
            layout="vertical"
            iconType="circle"
            formatter={(value, entry, index) => (
              <span className="leading-8 text-deep-forest">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-14 font-inter-medium text-lg">
        Revenue Gap: {project.value[0].value - project.value[1].value}
      </p>
    </DataCard>
  );
};

export default ResponsiveCostsPerMonthChart;
