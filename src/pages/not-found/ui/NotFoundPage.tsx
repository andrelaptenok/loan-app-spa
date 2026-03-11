import { Button, ROUTES } from '@shared'

export const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-3 fw-bold mb-3">404</h1>
        <p className="fs-4 mb-2">Page not found</p>
        <p className="text-muted mb-4">The page you are looking for does not exist.</p>
        <Button to={ROUTES.loanStep(1)}>Back to loan application</Button>
      </div>
    </div>
  )
}
