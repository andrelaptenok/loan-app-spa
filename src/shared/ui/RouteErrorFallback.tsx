import { useRouteError } from 'react-router-dom'

import { ErrorFallback } from './ErrorFallback'

export const RouteErrorFallback = () => {
  const error = useRouteError()

  if (error instanceof Error) {
    return <ErrorFallback error={error} />
  }

  return (
    <div className="container py-5 text-center" role="alert">
      <h2 className="text-danger mb-3">Something went wrong</h2>
      <p className="text-muted">{String(error)}</p>
    </div>
  )
}
