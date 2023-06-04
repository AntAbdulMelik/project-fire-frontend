import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from 'recharts';
import { ContentType } from 'recharts/types/component/Label';

import { ChartData, ProjectScopeCustomLabel, ProjectScopeChartValues } from 'src/types';
import DataCard from 'src/shared/components/cards/DataCard';

const CustomLabel = ({ x, y, value }: ProjectScopeCustomLabel) => {
	return (
		<text
			x={x}
			y={y - 10}
			fill='#232F2D'
			textAnchor='start'
			fontFamily='Gilroy-SemiBold'
			fontWeight={600}
			fontSize={14}
		>
			{value}
		</text>
	);
};

const barColors = ['#DFE3E1', '#7BB99F'];

const ProjectScope = ({ chartValues }: ProjectScopeChartValues) => {
	const chartData: ChartData[] = [
		{
			name: 'Fixed',
			value: chartValues['Fixed'] ?? 0,
		},
		{
			name: 'On-going',
			value: chartValues['OnGoing'] ?? 0,
		},
	];

	const maxValue = Math.max(...chartData.map(item => item.value));
	const renderChart = maxValue !== 0;

	const headerContent = (
		<div className='flex items-center gap-[10px]'>
			<h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>Project scope</h2>
		</div>
	);

	return (
		<DataCard className='h-[342px] flex-1 rounded-[6px] border border-ashen-grey bg-white' header={headerContent}>
			{renderChart ? (
				<ResponsiveContainer width='100%' height='100%' className='mt-[38px]'>
					<BarChart data={chartData} layout='vertical' barSize={40}>
						<CartesianGrid
							strokeDasharray='6 8'
							strokeLinecap='round'
							strokeWidth={1.5}
							stroke='#DFE3E1'
							horizontal={false}
						/>
						<XAxis
							type='number'
							axisLine={false}
							tickLine={false}
							domain={[0, maxValue]}
							ticks={[0, maxValue / 4, maxValue / 2, (3 * maxValue) / 4, maxValue]}
							stroke='#232F2D'
							fontFamily='Gilroy-Regular'
							fontWeight={400}
							fontSize={14}
						/>
						<YAxis type='category' dataKey='name' axisLine={false} hide />
						<Tooltip />
						<Bar dataKey='value' label='none' barSize={32} radius={[6, 6, 6, 6]}>
							{chartData.map((entry, index) => {
								const color = entry.name === 'Fixed' ? barColors[1] : barColors[0];
								return <Cell key={index} fill={color} />;
							})}
							<LabelList dataKey='name' content={CustomLabel as ContentType} />
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			) : (
				<div className='mt-[38px] font-gilroy-medium font-medium text-deep-forest'>No data to display.</div>
			)}
		</DataCard>
	);
};

export default ProjectScope;
