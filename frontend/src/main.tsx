import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import MainErrorBoundary from './components/errors/MainErrorBoundary.tsx'
import Router from './router/Router.tsx'
import { MainProvider } from './store/MainProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={() => <MainErrorBoundary />}>
        <MainProvider>
          <Router />
        </MainProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
