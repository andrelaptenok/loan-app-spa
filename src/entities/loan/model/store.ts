import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AddressWorkData, LoanFormState, LoanParams, PersonalData } from './types'

const initialState: LoanFormState = {
  personalData: {
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
  },
  addressWorkData: {
    workplace: '',
    address: '',
  },
  loanParams: {
    amount: 200,
    term: 10,
  },
}

export const useLoanFormStore = create<
  LoanFormState & {
    setPersonalData: (data: Partial<PersonalData>) => void
    setAddressWorkData: (data: Partial<AddressWorkData>) => void
    setLoanParams: (data: Partial<LoanParams>) => void
    reset: () => void
  }
>()(
  persist(
    (set) => ({
      ...initialState,
      setPersonalData: (data) =>
        set((state) => ({
          personalData: { ...state.personalData, ...data },
        })),
      setAddressWorkData: (data) =>
        set((state) => ({
          addressWorkData: { ...state.addressWorkData, ...data },
        })),
      setLoanParams: (data) =>
        set((state) => ({
          loanParams: { ...state.loanParams, ...data },
        })),
      reset: () => set(initialState),
    }),
    {
      name: 'loan-form-storage',
      partialize: (state) => ({
        personalData: state.personalData,
        addressWorkData: state.addressWorkData,
        loanParams: state.loanParams,
      }),
    },
  ),
)
