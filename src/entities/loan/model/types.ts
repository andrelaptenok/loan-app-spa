export type PersonalData = {
  phone: string
  firstName: string
  lastName: string
  gender: string
}

export type AddressWorkData = {
  workplace: string
  address: string
}

export type LoanParams = {
  amount: number
  term: number
}

export type LoanFormState = {
  personalData: PersonalData
  addressWorkData: AddressWorkData
  loanParams: LoanParams
}
