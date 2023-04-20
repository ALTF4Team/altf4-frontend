export interface ApplicationFormValues {
  customerInformation: {
    name: string;
    surname: string;
    countryOfCitizenship: string;
    dateOfBirth: Date;
    mobileNumber: string;
    email: string;
  };
  loanForm: {
    loanPurpose: string;
    totalAmount: number;
    downPayment: number;
    loanTerm: number;
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
    coBorrower: string;
  };
}
