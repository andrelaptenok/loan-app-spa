import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@app/router'

import '../styles/variables.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'

export const startApp = () => {
  const rootElement = document.getElementById('root')

  if (!rootElement) return

  createRoot(rootElement).render(<RouterProvider router={router} />)
}
