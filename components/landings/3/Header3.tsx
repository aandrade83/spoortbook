'use client'

import { useState } from 'react'
import Image from 'next/image'
async function goCashier(site: string) {
  try {
    const res = await fetch(
      'https://cashier.vrbmarketing.com/api/cashier-lookup?domain=' + encodeURIComponent(site)
    )
    if (!res.ok) {
      alert('There is no Cashier active for this site.')
      return
    }
    const data = await res.json() as { url: string }
    window.open(data.url, '_blank')
  } catch {
    alert('There is no Cashier active for this site.')
  }
}

function submitForm(action: string, method: 'POST' | 'GET', fields: Record<string, string>) {
  const form = document.createElement('form')
  form.method = method
  form.action = action
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input')
    input.name = name
    input.value = value
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
}

export default function Header3({ site }: { site: string }) {
  const [cashierLoading, setCashierLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const mainSite = `https://${site}/sports`
  const agentSite = `https://agent.${site}/admin/autologin`

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const cid = (form.elements.namedItem('username') as HTMLInputElement).value.trim()
    const plainPassword = (form.elements.namedItem('password') as HTMLInputElement).value
    if (!cid || !plainPassword) return

    setLoginLoading(true)
    setLoginError(null)

    try {
      const res = await fetch('/api/auth/gbsoft-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: cid, password: plainPassword, site }),
      })
      const result = await res.json() as {
        ok: boolean
        error?: string
        agent?: boolean
        token?: string
        classic?: boolean
        cid?: string
        password?: string
        encryptedPwd?: string
        key?: string
        ck?: string
        tJwt?: string
        mainSite?: string
        agentSite?: string
      }

      if (!result.ok) {
        setLoginError('Wrong username or password.')
        setLoginLoading(false)
        return
      }

      if (result.agent && result.token) {
        submitForm(agentSite, 'POST', { token: result.token })
        return
      }

      if (result.agent && result.classic) {
        submitForm(result.agentSite!, 'GET', {
          customerID1: result.cid!,
          password1: result.password!,
          key: '',
        })
        return
      }

      const mainSite = `https://${site}/sports`
      if (result.tJwt) {
        // Try GBSoft player autologin endpoint with JWT token (mirrors agent autologin)
        submitForm(`${mainSite}/autologin`, 'POST', { token: result.tJwt })
      } else {
        window.location.href = mainSite
      }
    } catch {
      setLoginError('Login failed. Please try again.')
      setLoginLoading(false)
    }
  }

  async function handleCashier() {
    setCashierLoading(true)
    await goCashier(site)
    setCashierLoading(false)
  }

  return (
    <header style={{ background: 'rgba(10,6,4,0.95)', borderBottom: '1px solid rgba(255,122,24,0.15)' }}>
      {/* Top contact strip */}
      <div
        style={{
          background: 'rgba(10,6,4,0.6)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,122,24,0.15)',
          color: '#9a8d7a',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 600,
        }}
      >
        <div
          style={{
            maxWidth: '1140px',
            margin: '0 auto',
            padding: '8px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '12px',
          }}
        >
          <span>📞 WAGERING: <strong style={{ color: '#f5f1ea' }}>1-800-380-3836</strong></span>
          <span>🎧 CUSTOMER SERVICE: <strong style={{ color: '#f5f1ea' }}>1-800-380-3836</strong></span>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '20px 16px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <div style={{ position: 'relative', width: '200px', height: '56px', flexShrink: 0 }}>
            <Image
              src={`/logos/${site}.png`}
              alt={site}
              fill
              sizes="200px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>

          {/* Login form with Cashier */}
          <form
            onSubmit={handleLogin}
            style={{
              background: 'rgba(20,16,8,0.55)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,122,24,0.15)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              position: 'relative',
            }}
          >
            {/* Cashier button */}
            <button
              type="button"
              onClick={handleCashier}
              disabled={cashierLoading}
              style={{
                color: '#ff7a18',
                border: '1px solid rgba(255,122,24,0.45)',
                background: 'rgba(255,122,24,0.08)',
                borderRadius: '6px',
                padding: '6px 18px',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                cursor: cashierLoading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              {cashierLoading ? '...' : 'Cashier'}
            </button>

            <input
              type="text"
              name="username"
              placeholder="Login ID"
              required
              disabled={loginLoading}
              style={{
                background: 'rgba(20,16,8,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f5f1ea',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '14px',
                width: '130px',
                outline: 'none',
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              disabled={loginLoading}
              style={{
                background: 'rgba(20,16,8,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f5f1ea',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '14px',
                width: '120px',
                outline: 'none',
              }}
            />

            <button
              type="submit"
              disabled={loginLoading}
              style={{
                background: 'linear-gradient(135deg, #ff5e00, #ffb347)',
                border: '1px solid #ff7a18',
                color: '#000',
                borderRadius: '6px',
                padding: '6px 24px',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                cursor: loginLoading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em',
                opacity: loginLoading ? 0.7 : 1,
              }}
            >
              {loginLoading ? '...' : 'Login'}
            </button>

            {loginError && (
              <span
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  fontSize: '11px',
                  color: '#ff6b6b',
                  background: 'rgba(255,77,77,0.12)',
                  border: '1px solid rgba(255,77,77,0.2)',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  whiteSpace: 'nowrap',
                }}
              >
                {loginError}
              </span>
            )}
          </form>
        </div>
      </div>
    </header>
  )
}
