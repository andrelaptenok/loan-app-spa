import { Button } from './Button'
import { ROUTES } from '../config'

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
        <Button to={ROUTES.root}>Go to home</Button>
        {reset && (
          <Button variant="outline-primary" onClick={reset}>
            Try again
          </Button>
        )}
      </div>
    </div>
  )
}
