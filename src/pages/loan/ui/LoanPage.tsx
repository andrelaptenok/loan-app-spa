import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, ROUTES } from '@shared'

import { PersonalDataForm } from '@features/personal-data-form'
import { parseStep, STEP_TITLES } from '@pages/loan/model/step.ts'

import { LoanLayout } from './LoanLayout'

export const LoanPage = () => {
  const { step: stepParam } = useParams<{ step: string }>()
  const navigate = useNavigate()
  const step = parseStep(stepParam)

  useEffect(() => {
    if (step === null) {
      navigate(ROUTES.loanStep(1), { replace: true })
    }
  }, [step, navigate])

  if (!step) return null

  const goToStep = (nextStep: number) => {
    navigate(ROUTES.loanStep(nextStep))
  }

  const stepContent =
    step === 1 ? (
      <PersonalDataForm onSuccess={() => goToStep(2)} />
    ) : (
      <>
        <p className="mb-4">Step {step} content will go here.</p>
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={() => goToStep(step - 1)}>
            Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => goToStep(step + 1)}>Next</Button>
          ) : (
            <Button variant="success" disabled>
              Submit application
            </Button>
          )}
        </div>
      </>
    )

  return <LoanLayout title={STEP_TITLES[step]}>{stepContent}</LoanLayout>
}
