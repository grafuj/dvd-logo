import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DvdLogo from './mainPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DvdLogo />
  </StrictMode>,
)
