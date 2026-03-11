import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@shared'

import { useLoanFormStore } from '@entities/loan'
import { AddressWorkForm } from '@features/address-work-form'
import { LoanParamsForm } from '@features/loan-params-form'
import { PersonalDataForm } from '@features/personal-data-form'
import { parseStep, STEP_TITLES } from '@pages/loan/model/step.ts'

import { LoanLayout } from './LoanLayout'
import { LoanSuccessModal } from './LoanSuccessModal'

export const LoanPage = () => {
  const { step: stepParam } = useParams<{ step: string }>()
  const navigate = useNavigate()
  const step = parseStep(stepParam)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { personalData, addressWorkData, loanParams, reset } = useLoanFormStore()

  useEffect(() => {
    if (step === null) {
      navigate(ROUTES.loanStep(1), { replace: true })
    }
  }, [step, navigate])

  useEffect(() => {
    if (!step) return

    const isPersonalCompleted =
      !!personalData.phone &&
      !!personalData.firstName &&
      !!personalData.lastName &&
      !!personalData.gender

    const isAddressCompleted = !!addressWorkData.address && !!addressWorkData.workplace

    if (step === 2 && !isPersonalCompleted) {
      navigate(ROUTES.loanStep(1), { replace: true })
      return
    }

    if (step === 3) {
      if (!isPersonalCompleted) {
        navigate(ROUTES.loanStep(1), { replace: true })
        return
      }
      if (!isAddressCompleted) {
        navigate(ROUTES.loanStep(2), { replace: true })
      }
    }
  }, [step, navigate, personalData, addressWorkData])

  if (!step) return null

  const goToStep = (nextStep: number) => {
    navigate(ROUTES.loanStep(nextStep))
  }

  const handleSubmitSuccess = () => {
    setShowSuccessModal(true)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    reset()
    navigate(ROUTES.loanStep(1), { replace: true })
  }

  const fullName = `${personalData.lastName} ${personalData.firstName}`.trim()

  const stepContent =
    step === 1 ? (
      <PersonalDataForm onSuccess={() => goToStep(2)} />
    ) : step === 2 ? (
      <AddressWorkForm onSuccess={() => goToStep(3)} onBack={() => goToStep(1)} />
    ) : (
      <LoanParamsForm onSuccess={handleSubmitSuccess} onBack={() => goToStep(2)} />
    )

  return (
    <>
      <LoanLayout title={STEP_TITLES[step]}>{stepContent}</LoanLayout>
      <LoanSuccessModal
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        fullName={fullName}
        amount={loanParams.amount}
        term={loanParams.term}
      />
    </>
  )
}
