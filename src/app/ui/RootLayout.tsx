import { Outlet } from 'react-router-dom'

import { ErrorBoundary } from '@shared/ui'

import './App.css'

export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  )
}
