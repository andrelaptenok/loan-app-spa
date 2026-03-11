export interface PersonalData {
  phone: string
  firstName: string
  lastName: string
  gender: string
}

export interface AddressWorkData {
  address: string
  workplace: string
}

export interface LoanParams {
  amount: number
  term: number
}

export interface LoanFormState {
  personalData: PersonalData
  addressWorkData: AddressWorkData
  loanParams: LoanParams
}
