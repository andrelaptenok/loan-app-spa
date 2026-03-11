import { Outlet } from 'react-router-dom'

import { ErrorBoundary } from '@shared'

export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <main className="container py-4">
        <Outlet />
      </main>
    </ErrorBoundary>
  )
}
