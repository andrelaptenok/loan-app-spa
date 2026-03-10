export const VALID_STEPS = [1, 2, 3] as const
export type Step = (typeof VALID_STEPS)[number]

export function parseStep(param: string | undefined): Step | null {
  const n = Number(param)
  return VALID_STEPS.includes(n as Step) ? (n as Step) : null
}

export const STEP_TITLES: Record<Step, string> = {
  1: 'Step 1: Personal details',
  2: 'Step 2: Address and employment',
  3: 'Step 3: Loan parameters',
}
