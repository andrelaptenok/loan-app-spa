import { createBrowserRouter, Navigate } from 'react-router-dom'

import { LoanPage } from '@pages/loan'
import { ROUTES } from '@shared/config/routes'

import { RootLayout } from './ui/RootLayout'

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <RootLayout />,
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
        element: <Navigate to={ROUTES.loanStep(1)} replace />,
      },
    ],
  },
])
