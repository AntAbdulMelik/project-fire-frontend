import { editIcon, deleteIcon } from 'assets/media';
import EmployeesTableHead from 'src/features/employees/EmployeesTableHead';
import TableHeader from 'components/table-elements/TableHeader';
import TableRow from 'components/table-elements/TableRow';

type Department = 'Administration' | 'Management' | 'Development' | 'Design';

type TechStack = 'AdminNA' | 'MgmtNA' | 'FullStack' | 'Frontend' | 'Backend' | 'UXUI';

type Projects = {
	project: {
		id: string;
		name: string;
	};
	partTime: boolean;
};

type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
	department: Department;
	salary: number;
	techStack: TechStack;
	projects: Projects[];
};

type Props = {
	employees: Employee[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
	onClick: (employeeId: string) => void;
};

const getEmployeeTechStack = (employee: Employee) => {
	const techStack = employee.techStack;
	if (techStack === 'AdminNA' || techStack === 'MgmtNA') return 'N/A';
	else if (techStack === 'FullStack') return 'Full stack';
	else if (techStack === 'Frontend') return 'Front end';
	else if (techStack === 'Backend') return 'Back end';
	else if (techStack === 'UXUI') return 'UX/UI';
};

const columns = [
	{ name: 'First Name', label: 'firstName' },
	{ name: 'Last Name', label: 'lastName' },
	{ name: 'Department', label: 'department' },
	{ name: 'Monthly Salary (BAM)', label: 'salary' },
	{ name: 'Tech Stack', label: 'techStack' },
	{ name: 'Actions', label: 'actions' },
];

const EmployeesTable = ({
	employees,
	value,
	orderByField,
	orderDirection,
	handleSearch,
	handleSort,
	onClick,
}: Props) => {
	return (
		<div className='h-[400px] w-full overflow-y-scroll rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='All Employees' total={employees.length} value={value} handleSearch={handleSearch} />
			<table className='w-full border-t border-ashen-grey'>
				<EmployeesTableHead
					columns={columns}
					orderByField={orderByField}
					orderDirection={orderDirection}
					handleSort={handleSort}
				/>
				<tbody>
					{employees.map(employee => {
						const employeeId = employee.id;
						return (
							<TableRow key={employeeId} onClick={() => onClick(employeeId)}>
								<td className='w-[175px] p-4'>{employee.firstName}</td>
								<td className='w-[175px] p-4'>{employee.lastName}</td>
								<td className='w-[175px] p-4'>{employee.department}</td>
								<td className='w-[175px] p-4'>{employee.salary.toFixed(2)}</td>
								<td className='w-[175px] p-4'>{getEmployeeTechStack(employee)}</td>
								<td className='flex w-[175px] items-center p-4'>
									<div className='flex items-center gap-2 px-2 hover:cursor-pointer'>
										<img className='h-[14px] w-[14px]' src={editIcon} alt='Edit Icon' />
										<span>Edit</span>
									</div>
									<div className='h-3 border border-ashen-grey' />
									<div className='flex items-center gap-2 px-2 hover:cursor-pointer'>
										<img className='h-[14px] w-[14px]' src={deleteIcon} alt='Delete Icon' />
										<span>Delete</span>
									</div>
								</td>
							</TableRow>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default EmployeesTable;
