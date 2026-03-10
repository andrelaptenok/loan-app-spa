import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@app/ui/App.tsx'
import '../index.css'

export const bootstrap = () => {
  const rootElement = document.getElementById('root')

  if (!rootElement) return

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
