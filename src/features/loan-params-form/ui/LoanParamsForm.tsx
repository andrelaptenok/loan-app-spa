import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, createFocusFirstError } from '@shared'

import { useLoanFormStore } from '@entities/loan'
import {
  LOAN_PARAMS,
  type LoanParamsFormValues,
  loanParamsSchema,
} from '@features/loan-params-form/model/schema.ts'
import { submitApplication } from '@features/loan-params-form/model/submitApplication.ts'

interface LoanParamsFormProps {
  onSuccess: () => void
  onBack?: () => void
}

export const LoanParamsForm = ({ onSuccess, onBack }: LoanParamsFormProps) => {
  const { personalData, loanParams, setLoanParams } = useLoanFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    watch,
  } = useForm<LoanParamsFormValues>({
    resolver: zodResolver(loanParamsSchema),
    shouldFocusError: false,
    defaultValues: {
      amount: loanParams.amount,
      term: loanParams.term,
    },
  })

  const amount = watch('amount') ?? loanParams.amount
  const term = watch('term') ?? loanParams.term

  const onSubmit = async (data: LoanParamsFormValues) => {
    setLoanParams(data)
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      await submitApplication({
        title: `${personalData.firstName} ${personalData.lastName}`.trim(),
      })
      onSuccess()
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const focusFirstError = createFocusFirstError(['amount', 'term'], setFocus)

  return (
    <form
      onSubmit={handleSubmit(onSubmit, focusFirstError)}
      className="needs-validation"
      noValidate
    >
      <div className="mb-4">
        <label htmlFor="amount" className="form-label">
          Loan amount: ${amount}
        </label>
        <input
          id="amount"
          type="range"
          min={LOAN_PARAMS.amountMin}
          max={LOAN_PARAMS.amountMax}
          step={LOAN_PARAMS.amountStep}
          className={errors.amount ? 'form-range is-invalid' : 'form-range'}
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && <div className="invalid-feedback d-block">{errors.amount.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="term" className="form-label">
          Loan term: {term} days
        </label>
        <input
          id="term"
          type="range"
          min={LOAN_PARAMS.termMin}
          max={LOAN_PARAMS.termMax}
          step={LOAN_PARAMS.termStep}
          className={errors.term ? 'form-range is-invalid' : 'form-range'}
          {...register('term', { valueAsNumber: true })}
        />
        {errors.term && <div className="invalid-feedback d-block">{errors.term.message}</div>}
      </div>

      {submitError && (
        <div className="alert alert-danger mb-3" role="alert">
          {submitError}
        </div>
      )}

      <div className="d-flex justify-content-between">
        {onBack ? (
          <Button variant="outline-secondary" type="button" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" variant="success" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit application'}
        </Button>
      </div>
    </form>
  )
}
