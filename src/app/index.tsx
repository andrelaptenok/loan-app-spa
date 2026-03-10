import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { App } from './ui/App'

export const bootstrap = () => {
  const rootElement = document.getElementById('root')

  if (!rootElement) return

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
