"use client"

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signupUser } from '@/services/userservices'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Cookies from 'js-cookie'

type SignupFormState = {
  first_name: string
  last_name: string
  email: string
  password: string
}

const initialState: SignupFormState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
}

const SignupPage = () => {
  const router = useRouter()
  const [formState, setFormState] = useState<SignupFormState>(initialState)
  const [formErrors, setFormErrors] = useState<Partial<SignupFormState>>({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isFormValid = useMemo(() => {
    return (
      formState.first_name.trim().length > 0 &&
      formState.last_name.trim().length > 0 &&
      formState.email.trim().length > 0 &&
      formState.password.trim().length >= 6
    )
  }, [formState.first_name, formState.last_name, formState.email, formState.password])

  const handleChange = (field: keyof SignupFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }))
    setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    setServerError('')
  }

  const validate = () => {
    const nextErrors: Partial<SignupFormState> = {}

    if (!formState.first_name.trim()) {
      nextErrors.first_name = 'First name is required'
    } else if (formState.first_name.trim().length < 2) {
      nextErrors.first_name = 'First name must be at least 2 characters'
    }

    if (!formState.last_name.trim()) {
      nextErrors.last_name = 'Last name is required'
    } else if (formState.last_name.trim().length < 2) {
      nextErrors.last_name = 'Last name must be at least 2 characters'
    }

    if (!formState.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!formState.password.trim()) {
      nextErrors.password = 'Password is required'
    } else if (formState.password.trim().length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }

    setFormErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setIsSubmitting(true)
      setServerError('')

      const response = await signupUser({
        first_name: formState.first_name.trim(),
        last_name: formState.last_name.trim(),
        email: formState.email.trim(),
        password: formState.password,
      })

      if (response && typeof window !== 'undefined') {
        if (response.token) {
          Cookies.set('authToken', response.token as string, {
            expires: 7,
            secure: window.location.protocol === 'https:',
          })
        }
        if (response.user) {
          window.localStorage.setItem('authUser', JSON.stringify(response.user))
        }
      }

      router.push('/login')
    } catch (error) {
      console.error('Signup failed', error)
      setServerError('Unable to create your account right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-sm text-gray-500">Join us to manage your orders and enjoy a personalized experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={formState.first_name}
              onChange={handleChange('first_name')}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              placeholder="John"
              disabled={isSubmitting}
            />
            {formErrors.first_name && <p className="mt-2 text-sm text-red-500">{formErrors.first_name}</p>}
          </div>

          <div className="md:col-span-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={formState.last_name}
              onChange={handleChange('last_name')}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              placeholder="Doe"
              disabled={isSubmitting}
            />
            {formErrors.last_name && <p className="mt-2 text-sm text-red-500">{formErrors.last_name}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleChange('email')}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
            {formErrors.email && <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formState.password}
                onChange={handleChange('password')}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                placeholder="********"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </button>
            </div>
            {formErrors.password && <p className="mt-2 text-sm text-red-500">{formErrors.password}</p>}
          </div>

          {serverError && (
            <div className="md:col-span-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-200 hover:shadow-violet-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="font-semibold text-violet-600 hover:text-violet-500">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
