import {
  TechStack,
  ProjectStatus,
  InvoiceStatus,
  Employees,
  Employee,
} from "src/types";

export const getEmployeeSalaryInBAM = (salary: number, currency: string) => {
  let conversionFactor = 1;
  if (currency === "USD") conversionFactor = 1.78;
  else if (currency === "EUR") conversionFactor = 1.95;
  return (salary * conversionFactor).toFixed(2);
};

export const getEmployeeTechStack = (techStack: TechStack) => {
  if (techStack === "AdminNA" || techStack === "MgmtNA") return "N/A";
  if (techStack === "FullStack") return "Full Stack";
  if (techStack === "Backend") return "Back End";
  if (techStack === "Frontend") return "Front End";
  if (techStack === "UXUI") return "UX/UI";
  return null;
};

export const getEmployeeNamesAndImages = (employees: Employees[]) => {
  let names:
    | {
        firstName: string;
        lastName: string;
      }[]
    | undefined;
  let images: (string | undefined)[] | undefined;
  if (employees) {
    names = employees.map(({ employee }: { employee: Employee }) => ({
      firstName: employee.firstName,
      lastName: employee.lastName,
    }));
    images = employees.map(
      ({ employee }: { employee: Employee }) => employee.image
    );
  } else {
    names = [];
    images = [];
  }
  return { names, images };
};

export const getEmploymentDate = (employmentDateString: string) => {
  const employmentDate = new Date(employmentDateString);
  const employmentDateFormattedString = employmentDate.toLocaleDateString(
    "en-US",
    {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }
  );
  return employmentDateFormattedString;
};

export const getProjectType = (projectType: string) => {
  if (projectType === "Fixed") return "Fixed";
  if (projectType === "OnGoing") return "On-going";
  return null;
};

export const getProjectSalesChannel = (salesChannel: string) => {
  if (salesChannel === "Online") return "Online";
  if (salesChannel === "InPerson") return "In person";
  if (salesChannel === "Referral") return "Referral";
  if (salesChannel === "Other") return "Other";
  return null;
};

export const getProjectDuration = (
  startDateString: string,
  endDateString: string
) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const startDateFormattedString = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  const endDateFormattedString = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  return startDateFormattedString + " - " + endDateFormattedString;
};

export const getProjectActualEndDate = (actualEndDateString: string) => {
  const actualEndDate = new Date(actualEndDateString);
  const actualEndDateFormattedString = actualEndDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
  return actualEndDateFormattedString;
};

export const getProjectValueBAM = (projectValueBAM: number) => {
  return projectValueBAM.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getProjectColorAndStatus = (projectStatus: ProjectStatus) => {
  if (projectStatus === "Active")
    return { color: "bg-spring-fern", status: "Active" };
  if (projectStatus === "OnHold")
    return { color: "bg-golden-tangerine", status: "On hold" };
  if (projectStatus === "Inactive")
    return { color: "bg-silver-mist", status: "Inactive" };
  if (projectStatus === "Completed")
    return { color: "bg-cerulean-breeze", status: "Completed" };
  return null;
};

export const getInvoiceColorAndStatus = (invoiceStatus: InvoiceStatus) => {
  if (invoiceStatus === "Paid")
    return { color: "bg-spring-fern", status: "Paid" };
  if (invoiceStatus === "Sent")
    return { color: "bg-golden-tangerine", status: "Sent" };
  if (invoiceStatus === "NotSent")
    return { color: "bg-silver-mist", status: "Not sent" };
  return null;
};
