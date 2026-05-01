'use client'

import { useState, useRef } from 'react'

interface LoginFormProps {
  onSuccess: (username: string, password: string) => void
}

interface LoginResult {
  success: boolean
  reason?: string
}

const REASON_MESSAGES: Record<string, string> = {
  invalid_credentials: 'Invalid username or password.',
  missing_credentials: 'Please enter your username and password.',
  connection_error:    'Could not reach the auth server. Try again.',
  service_unavailable: 'Service temporarily unavailable.',
  unauthorized:        'API configuration error. Contact support.',
}

async function callLogin(username: string, password: string): Promise<LoginResult> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  return res.json() as Promise<LoginResult>
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const username = usernameRef.current?.value.trim() ?? ''
    const password = passwordRef.current?.value ?? ''

    if (!username || !password) {
      setError('Please enter your username and password.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await callLogin(username, password)

      if (result.success) {
        onSuccess(username, password)
      } else {
        const msg = REASON_MESSAGES[result.reason ?? ''] ?? 'Invalid credentials. Please try again.'
        setError(msg)
        passwordRef.current!.value = ''
        passwordRef.current?.focus()
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Card */}
      <div
        className="rounded-2xl p-8"
        style={{
          background: 'rgba(13, 20, 32, 0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <h2
          className="text-center text-3xl mb-1"
          style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.12em', color: '#ffffff' }}
        >
          MEMBER LOGIN
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}>
          Sign in to access your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lobby-username"
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
            >
              Username
            </label>
            <input
              id="lobby-username"
              ref={usernameRef}
              type="text"
              autoComplete="username"
              disabled={loading}
              placeholder="Enter your username"
              className="w-full h-11 px-4 text-sm rounded-lg outline-none transition-all duration-200 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff',
                fontFamily: 'var(--font-inter)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lobby-password"
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
            >
              Password
            </label>
            <input
              id="lobby-password"
              ref={passwordRef}
              type="password"
              autoComplete="current-password"
              disabled={loading}
              placeholder="Enter your password"
              className="w-full h-11 px-4 text-sm rounded-lg outline-none transition-all duration-200 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff',
                fontFamily: 'var(--font-inter)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              className="text-sm text-center px-3 py-2 rounded-lg"
              style={{
                color: '#ff4d4d',
                background: 'rgba(255,77,77,0.1)',
                border: '1px solid rgba(255,77,77,0.2)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 font-bold text-sm uppercase tracking-widest rounded-lg mt-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: loading
                ? 'rgba(201,162,39,0.5)'
                : 'linear-gradient(135deg, #c9a227, #e8c14a)',
              color: '#050810',
              fontFamily: 'var(--font-inter)',
              boxShadow: loading ? 'none' : '0 0 20px rgba(201,162,39,0.35)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
