'use client'

import { useState } from 'react'

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

// Replicates security.js authenticate_normal redirect logic
function handleLoginSuccess(data: Record<string, unknown>, site: string) {
  const accountInfo = data.accountInfo as Record<string, string> | undefined
  if (!accountInfo) {
    window.location.href = `https://${site}/sports.html`
    return
  }
  const agentType = accountInfo.AgentType || ''
  if (agentType === 'M' || agentType === 'A') {
    window.location.href = `https://${site}/manager.html?v=${Date.now()}`
  } else {
    window.location.href = `https://${site}/sports.html?v=${Date.now()}`
  }
}

export default function Navbar4({ site }: { site: string }) {
  const [cashierLoading, setCashierLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  async function handleCashier() {
    setCashierLoading(true)
    await goCashier(site)
    setCashierLoading(false)
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    const form = e.currentTarget
    const username = (form.elements.namedItem('customerID') as HTMLInputElement).value.trim().toUpperCase()
    const password = (form.elements.namedItem('Password') as HTMLInputElement).value.trim().toUpperCase()

    if (!username || !password) {
      setLoginError('Enter username and password.')
      setLoginLoading(false)
      return
    }

    // Same payload as security.js authenticate()
    const payload = new URLSearchParams({
      customerID: username,
      state: 'true',
      password: password,
      sufix: '',
      prefix: '',
      multiaccount: '1',
      response_type: 'code',
      client_id: username,
      domain: site,
      redirect_uri: site,
      token: '',
      operation: 'authenticateCustomer',
      RRO: '1',
    })

    try {
      // Uses absolute URL to the partner site — same call as security.js but cross-origin
      // Works when the partner serves this landing from their own domain or allows CORS
      const res = await fetch(`https://${site}/cloud/api/System/authenticateCustomer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      })

      if (!res.ok) {
        setLoginError('Wrong User or Password')
        setLoginLoading(false)
        return
      }

      const data = await res.json() as Record<string, unknown>

      if (data.tokenauth === 1) {
        // OTP flow — redirect to site for full 2FA handling
        window.location.href = `https://${site}/?otp=1`
        return
      }

      handleLoginSuccess(data, site)
    } catch {
      setLoginError('Wrong User or Password')
      setLoginLoading(false)
    }
  }

  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #000000 50%, #da292c 50%, #da292c 100%)',
        borderBottom: '1px solid #ff0000',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          minHeight: '70px',
        }}
      >
        {/* Logo — relative path resolves against the visible domain (pph.ag when embedded) */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', padding: '8px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/sites/${site}/images/logo1.png`}
            alt={site}
            style={{ maxWidth: '180px', maxHeight: '54px', objectFit: 'contain' }}
          />
        </div>

        {/* Contact info */}
        <div
          style={{
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: '"Play", sans-serif',
            fontSize: '13px',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Wagering: 866-921-8362&nbsp;&nbsp;/&nbsp;&nbsp;Agents: 866-968-7946
        </div>

        {/* Cashier + Login */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>

          <button
            onClick={handleCashier}
            disabled={cashierLoading}
            style={{
              background: cashierLoading ? '#cc0000' : '#ff0000',
              color: '#fff',
              border: '1px solid #ff0000',
              borderRadius: '8px',
              padding: '8px 18px',
              fontFamily: '"Play", sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: cashierLoading ? 'not-allowed' : 'pointer',
              minWidth: '100px',
            }}
          >
            {cashierLoading ? '...' : 'Cashier'}
          </button>

          {/* Login form — same data attributes as security.js expects */}
          <form
            data-security="form"
            onSubmit={handleLogin}
            style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <input
                name="customerID"
                data-field="user"
                type="text"
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect="off"
                style={{
                  height: '34px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  color: '#060d26',
                  background: '#fff',
                  border: '1px solid #116c9b',
                  borderRadius: '8px',
                  width: '120px',
                }}
              />
              <input
                name="Password"
                data-field="pass"
                type="password"
                placeholder="Password"
                style={{
                  height: '34px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  color: '#060d26',
                  background: '#fff',
                  border: '1px solid #116c9b',
                  borderRadius: '8px',
                  width: '110px',
                }}
              />
              <input type="hidden" name="multiaccount" id="multiaccount" value="1" />
              {/* domain override for security.js compatibility */}
              <input type="hidden" data-field="domain" value={site} />
              <button
                type="submit"
                data-action="login"
                disabled={loginLoading}
                style={{
                  background: loginLoading ? '#cc0000' : '#ff0000',
                  color: '#fff',
                  border: '1px solid #ff0000',
                  borderRadius: '8px',
                  padding: '6px 16px',
                  fontSize: '13px',
                  fontFamily: '"Play", sans-serif',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: loginLoading ? 'not-allowed' : 'pointer',
                  height: '34px',
                }}
              >
                {loginLoading ? '...' : 'Login'}
              </button>
            </div>
            {loginError && (
              <span style={{ color: '#ffcccc', fontSize: '11px', textAlign: 'right' }}>
                {loginError}
              </span>
            )}
          </form>
        </div>
      </div>
    </header>
  )
}
