type Role = "Admin" | "Guest";

type Department = "Administration" | "Management" | "Development" | "Design";

type Currency = "USD" | "EUR" | "BAM";

type TechStack =
  | "AdminNA"
  | "MgmtNA"
  | "FullStack"
  | "Frontend"
  | "Backend"
  | "UXUI";

type ProjectType = "Fixed" | "OnGoing";

type SalesChannel = "Online" | "InPerson" | "Referral" | "Other";

type ProjectStatus = "Active" | "OnHold" | "Inactive" | "Completed";

type InvoiceStatus = "Paid" | "Sent" | "NotSent";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  image?: string;
  department: Department;
  salary: number;
  currency: Currency;
  techStack: TechStack;
  isEmployed: boolean;
  hiringDate: string;
  terminationDate?: string;
  projects: Projects[];
};

type Employees = {
  partTime: boolean;
  employee: Employee;
};

type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  actualEndDate?: string;
  projectType: ProjectType;
  hourlyRate: number;
  projectValueBAM: number;
  projectVelocity: number;
  salesChannel: SalesChannel;
  projectStatus: ProjectStatus;
  employees: Employees[];
};

type Projects = {
  partTime: boolean;
  project: {
    id: string;
    name: string;
  };
};

type ProjectInfo = {
  name: string;
  startDate: string;
  endDate: string;
  actualEndDate?: string;
  hourlyRate: number;
  projectVelocity: number;
  numberOfEmployees: number;
  revenue: number;
  cost: number;
  profit: number;
};

type ProjectsInfo = {
  totalProjects: number;
  totalValue: number;
  averageValue: number;
  averageTeamSize: number;
  averageRate: number;
  averageVelocity: number;
  weeksOverDeadline: number;
  salesChannelPercentage: { [key in SalesChannel]?: number };
  projectTypeCount: { [key in ProjectType]?: number };
  projects: ProjectInfo[];
};

type Invoice = {
  id: string;
  client: string;
  industry: string;
  totalHoursBilled: number;
  amountBilledBAM: number;
  invoiceStatus: InvoiceStatus;
};

export type {
  Role,
  Department,
  Currency,
  TechStack,
  ProjectType,
  SalesChannel,
  ProjectStatus,
  InvoiceStatus,
  Employee,
  Employees,
  Project,
  Projects,
  ProjectInfo,
  ProjectsInfo,
  Invoice,
};
