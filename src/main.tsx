import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.tsx'
import GrammarApp from './components/GrammarApp.tsx'
import Footer from './components/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <GrammarApp />
    <Footer />
  </StrictMode>,
)
