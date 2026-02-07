import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { preloadPortfolioData } from './hooks/usePortfolioData'
import ErrorBoundary from './components/common/ErrorBoundary'
import { ToastProvider } from './context/ToastContext'

// Preload portfolio data for better performance
preloadPortfolioData()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
