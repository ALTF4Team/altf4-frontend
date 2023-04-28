export interface UserApplicationValues {
  id: number;
  applicationStatus: string;
  customer: {
    name: string;
    surname: string;
    countryOfCitizenship: string;
    birthDate: Date;
    mobileNumber: string;
    email: string;
  };
  loan: {
    loanPurpose: string;
    totalAmount: number;
    downPayment: number;
    termYears: number;
  };
  financialInformation: {
    employmentStatus: string;
    sourceOfIncome: string | null;
    yearsSelfEmployment: number | null;
    currentEmployer: string | null;
    employmentContractType: string | null;
    yearsCurrentEmployer: number | null;
    position: string | null;
    industry: string | null;
    education: string;
    maritalStatus: string;
    underageDependentsCount: number;
    monthlyIncome: number;
    coBorrowed: string;
  };
  coBorrower: {
    name: string | null;
    surname: string | null;
    countryOfCitizenship: string | null;
    yearOfBirth: Date | null;
    mobileNumber: string | null;
    email: string | null;
  };
}
