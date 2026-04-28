import { Navigate, useLocation } from 'react-router'
import { useAuth } from './AuthContext'

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dashboard-page text-dashboard-ink">
        Loading session...
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children
}

export default AuthGuard

