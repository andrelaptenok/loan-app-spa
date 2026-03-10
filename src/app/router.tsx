import { createBrowserRouter, Navigate } from 'react-router-dom'

import { LoanPage } from '@pages/loan'
import { NotFoundPage } from '@pages/not-found'
import { ROUTES } from '@shared/config/routes'
import { RouteErrorFallback } from '@shared/ui'

import { RootLayout } from './ui/RootLayout'

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <RootLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.loanStep(1)} replace />,
      },
      {
        path: 'loan',
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.loanStep(1)} replace />,
          },
          {
            path: ':step',
            element: <LoanPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
