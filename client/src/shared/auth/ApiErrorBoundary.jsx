import { Component } from 'react'

class ApiErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'Unexpected application error',
    }
  }

  componentDidCatch(error) {
    console.error('UI error boundary caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-dashboard-page px-6 text-dashboard-ink">
          <div className="max-w-lg rounded-3xl border border-dashboard-border bg-white p-8 text-center shadow-dashboard-card">
            <h1 className="text-2xl font-black tracking-tight text-dashboard-ink">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-slate-600">{this.state.message}</p>
            <button
              type="button"
              className="mt-6 rounded-full bg-dashboard-accent px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => window.location.reload()}
            >
              Reload app
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ApiErrorBoundary

