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

export default function Navbar2({ site }: { site: string }) {
  const [loading, setLoading] = useState(false)
  const loginAction = `https://wager.${site}/redirectlogin.php`

  async function handleCashier() {
    setLoading(true)
    await goCashier(site)
    setLoading(false)
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
        {/* Logo */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
          <div style={{ position: 'relative', width: '180px', height: '54px' }}>
            <Image
              src={`/logos/${site}.png`}
              alt={site}
              fill
              sizes="180px"
              className="object-contain"
              style={{ objectPosition: 'left center' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        </div>

        {/* Cashier Button */}
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '13px 0',
            gap: '10px',
          }}
        >
          <button
            onClick={handleCashier}
            disabled={loading}
            style={{
              background: loading ? '#cc0000' : '#ff0000',
              color: '#fff',
              border: '1px solid #ff0000',
              borderRadius: '8px',
              padding: '8px 22px',
              fontFamily: '"Play", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.05em',
              minWidth: '120px',
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? '...' : 'Cashier'}
          </button>
        </div>

        {/* Login Form */}
        <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'flex-end' }}>
          <form
            action={loginAction}
            method="post"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}
          >
            <input
              name="username"
              type="text"
              placeholder="Username"
              style={{
                height: '34px',
                padding: '6px 12px',
                fontSize: '14px',
                color: '#060d26',
                background: '#fff',
                border: '1px solid #116c9b',
                borderRadius: '8px',
                width: '130px',
              }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              style={{
                height: '34px',
                padding: '6px 12px',
                fontSize: '14px',
                color: '#060d26',
                background: '#fff',
                border: '1px solid #116c9b',
                borderRadius: '8px',
                width: '120px',
              }}
            />
            <input type="hidden" name="multiaccount" value="1" />
            <button
              type="submit"
              style={{
                background: '#ff0000',
                color: '#fff',
                border: '1px solid #ff0000',
                borderRadius: '8px',
                padding: '6px 16px',
                fontSize: '14px',
                fontFamily: '"Play", sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer',
                height: '34px',
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
