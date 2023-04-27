export interface ApplicationFormValues {
  customer: {
    name: string;
    surname: string;
    countryOfCitizenship: string;
    yearOfBirth: Date;
    mobileNumber: string;
    email: string;
  };
  loan: {
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
    coBorrowed: string;
  };
  coBorrower: {
    coName: string | null;
    coSurname: string | null;
    coCountryOfCitizenship: string | null;
    coYearOfBirth: Date | null;
    coMobileNumber: string | null;
    coEmail: string | null;
  };
}
