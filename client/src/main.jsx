import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import CreateAccount from './pages/CreateAccount/CreateAccount.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import AddExpense from './pages/AddExpense/AddExpense.jsx'
import Categories from './pages/Categories/Categories.jsx'
import Reports from './pages/Reports/Reports.jsx'
import Settings from './pages/Settings/Settings.jsx'
import { AuthProvider } from './shared/auth/AuthContext.jsx'
import AuthGuard from './shared/auth/AuthGuard.jsx'
import ApiErrorBoundary from './shared/auth/ApiErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/add-expense"
              element={
                <AuthGuard>
                  <AddExpense />
                </AuthGuard>
              }
            />
            <Route
              path="/categories"
              element={
                <AuthGuard>
                  <Categories />
                </AuthGuard>
              }
            />
            <Route
              path="/reports"
              element={
                <AuthGuard>
                  <Reports />
                </AuthGuard>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApiErrorBoundary>
  </StrictMode>,
)
