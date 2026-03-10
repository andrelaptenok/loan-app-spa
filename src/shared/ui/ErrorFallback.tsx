import { Link } from 'react-router-dom'

import { ROUTES } from '@shared/config/routes'

type ErrorFallbackProps = {
  error: Error
  reset?: () => void
}

export const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  return (
    <div className="container py-5 text-center" role="alert">
      <h2 className="text-danger mb-3">Something went wrong</h2>
      <pre className="bg-light p-3 rounded text-start small mb-4">{error.message}</pre>
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        <Link to={ROUTES.root} className="btn btn-primary">
          Go to home
        </Link>
        {reset && (
          <button type="button" className="btn btn-outline-primary" onClick={reset}>
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
