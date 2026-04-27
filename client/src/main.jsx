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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
