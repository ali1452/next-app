"use client"

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/services/userservices'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { setAuthToken, setUserId } from '@/utils/cookies-function'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/slice/userSlice'

type LoginFormState = {
  email: string
  password: string
}

const initialState: LoginFormState = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const router = useRouter()
  const [formState, setFormState] = useState<LoginFormState>(initialState)
  const [formErrors, setFormErrors] = useState<Partial<LoginFormState>>({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const isFormValid = useMemo(() => {
    return formState.email.trim().length > 0 && formState.password.trim().length > 0
  }, [formState.email, formState.password])

  const handleChange = (field: keyof LoginFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }))
    setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    setServerError('')
  }

  const validate = () => {
    const nextErrors: Partial<LoginFormState> = {}

    if (!formState.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!formState.password.trim()) {
      nextErrors.password = 'Password is required'
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

      const response = await loginUser({
        email: formState.email.trim(),
        password: formState.password,
      })


      if (response && typeof window !== 'undefined') {
        if (response.success) {
            setAuthToken(response.data.token as string)
            setUserId(response.data.user._id as string)
            dispatch(setUser(response.data.user))
            
        }
      }

      router.push('/')
    } catch (error) {
      console.error('Login failed', error)
      setServerError('Unable to log in with those credentials. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to manage your account and orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
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
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-200 hover:shadow-violet-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account? <a href="/signup" className="font-semibold text-violet-600 hover:text-violet-500">Create one</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
