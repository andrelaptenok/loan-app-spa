import { z } from 'zod'

const AMOUNT_MIN = 200
const AMOUNT_MAX = 1000
const AMOUNT_STEP = 100
const TERM_MIN = 10
const TERM_MAX = 30
const TERM_STEP = 1

export const loanParamsSchema = z.object({
  amount: z
    .number()
    .min(AMOUNT_MIN, `Min amount is $${AMOUNT_MIN}`)
    .max(AMOUNT_MAX, `Max amount is $${AMOUNT_MAX}`),
  term: z
    .number()
    .min(TERM_MIN, `Min term is ${TERM_MIN} days`)
    .max(TERM_MAX, `Max term is ${TERM_MAX} days`),
})

export type LoanParamsFormValues = z.infer<typeof loanParamsSchema>

export const LOAN_PARAMS = {
  amountMin: AMOUNT_MIN,
  amountMax: AMOUNT_MAX,
  amountStep: AMOUNT_STEP,
  termMin: TERM_MIN,
  termMax: TERM_MAX,
  termStep: TERM_STEP,
} as const
