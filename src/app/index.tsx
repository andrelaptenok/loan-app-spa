import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@app/router'

import '../styles/variables.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'

export const bootstrap = () => {
  const rootElement = document.getElementById('root')

  if (!rootElement) return

  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
