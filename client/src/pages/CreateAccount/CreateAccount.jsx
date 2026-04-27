import { useState } from 'react'

import SignUp from '../_components/SignUp'
import { authStyles as auth } from '../_components/authStyles'

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
    <main className={auth.page}>
      <div className={auth.ambient} aria-hidden="true" />
      <div className={auth.topWash} aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-130 flex-col items-center justify-center">
        <header className="mb-8 text-center">
          <p className={auth.brand}>Fintrack AI</p>
          <p className={auth.brandSub}>The Digital Curator</p>
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
