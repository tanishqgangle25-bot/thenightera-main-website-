import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.jsx'

// The prerenderer supplies crawler-ready metadata; remove it before Helmet takes ownership.
// This prevents duplicate titles, descriptions, canonicals, and JSON-LD after hydration.
document.head.querySelectorAll('title, [data-rh="true"]').forEach((tag) => tag.remove())

window.dataLayer = window.dataLayer || []
window.gtag = window.gtag || ((...args) => window.dataLayer.push(args))
window.gtag('js', new Date())
window.gtag('config', 'G-X38LJPNK4P', {
  send_page_view: false,
  allow_google_signals: false,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
