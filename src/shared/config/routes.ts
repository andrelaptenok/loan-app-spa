export const ROUTES = {
  root: '/',
  loan: '/loan',
  loanStep: (step: number) => `/loan/${step}`,
} as const
