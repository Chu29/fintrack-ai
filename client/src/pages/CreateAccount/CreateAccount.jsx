import { useState } from 'react'

import SignUp from '../_components/SignUp'

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Create account payload:', formData)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#091321] px-4 py-10 text-slate-100 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(49,214,201,0.10),transparent_28%),radial-gradient(circle_at_bottom,rgba(12,24,46,0.72),transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-[#10233b] to-transparent opacity-70"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-130 flex-col items-center justify-center">
        <header className="mb-8 text-center">
          <p className="text-[1.7rem] font-black uppercase tracking-[0.06em] text-slate-50">
            Fintrack AI
          </p>
          <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-slate-500">
            The Digital Curator
          </p>
        </header>
        <SignUp
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          setShowPassword={setShowPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      </div>
    </main>
  )
}

export default CreateAccount
