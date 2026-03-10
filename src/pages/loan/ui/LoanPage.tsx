import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@shared/config/routes'

import { parseStep, STEP_TITLES } from '../model/step'

import type { PropsWithChildren } from 'react'

const LoanLayout = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="container py-4">
      <h1 className="mb-4">{title}</h1>
      <div className="card">
        <div className="card-body">{children}</div>
      </div>
    </div>
  )
}

export const LoanPage = () => {
  const { step: stepParam } = useParams<{ step: string }>()
  const navigate = useNavigate()
  const step = parseStep(stepParam)

  useEffect(() => {
    if (step === null) {
      navigate(ROUTES.loanStep(1), { replace: true })
    }
  }, [step, navigate])

  if (step === null) {
    return null
  }

  const goToStep = (nextStep: number) => {
    navigate(ROUTES.loanStep(nextStep))
  }

  return (
    <LoanLayout title={STEP_TITLES[step]}>
      <p>Step {step}</p>

      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={step === 1}
          onClick={() => goToStep(step - 1)}
        >
          Back
        </button>

        {step < 3 ? (
          <button type="button" className="btn btn-primary" onClick={() => goToStep(step + 1)}>
            Next
          </button>
        ) : (
          <button type="button" className="btn btn-success" disabled>
            Submit application
          </button>
        )}
      </div>
    </LoanLayout>
  )
}
