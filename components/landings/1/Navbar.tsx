'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['Sports', 'Live Betting', 'Promotions', 'Support']

const GOLD = 'linear-gradient(135deg, #c9a227, #e8c14a)'
const GOLD_SHADOW = '0 0 20px rgba(201,162,39,0.35)'

const REASON_MESSAGES: Record<string, string> = {
  invalid_credentials:  'Invalid username or password.',
  missing_credentials:  'Please enter your credentials.',
  connection_error:     'Could not reach auth server.',
  service_unavailable:  'Service unavailable. Try again.',
  unauthorized:         'Configuration error.',
}

// Shared login logic — calls our Next.js proxy which forwards to the PHP validator
async function submitLogin(username: string, password: string): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json() as { success?: boolean; reason?: string }

    if (data.success === true) return { ok: true }
    const message = REASON_MESSAGES[data.reason ?? ''] ?? 'Invalid credentials.'
    return { ok: false, message }
  } catch {
    return { ok: false, message: 'Connection error. Try again.' }
  }
}

// ── Login form ────────────────────────────────────────────────────────────────
// `compact`: small inline inputs for the desktop navbar.
// Default (compact=false): comfortable full-width inputs for mobile second row.
function NavLoginForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter()
  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const username = userRef.current?.value.trim() ?? ''
    const password = passRef.current?.value ?? ''
    if (!username || !password) return

    setLoading(true)
    setError(null)

    const result = await submitLogin(username, password)

    if (result.ok) {
      sessionStorage.setItem('lobbyUser', username)
      sessionStorage.setItem('lobbyPass', password)
      router.push('/1/lobby')
    } else {
      setError(result.message ?? 'Invalid credentials')
      passRef.current!.value = ''
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#ffffff',
    fontFamily: 'var(--font-inter)',
  }

  const inputCls = compact
    ? 'h-8 px-3 text-xs w-[110px]'
    : 'h-10 px-3 text-sm flex-1 min-w-0'

  const passCls = compact
    ? 'h-8 px-3 text-xs w-[100px]'
    : 'h-10 px-3 text-sm flex-1 min-w-0'

  const btnCls = compact
    ? 'h-8 px-4 text-xs'
    : 'h-10 px-5 text-sm'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex items-center gap-2 w-full relative">
      <input
        ref={userRef}
        type="text"
        placeholder="Login ID"
        autoComplete="username"
        disabled={loading}
        className={`${inputCls} rounded-md outline-none transition-colors disabled:opacity-50`}
        style={inputStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
      <input
        ref={passRef}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        disabled={loading}
        className={`${passCls} rounded-md outline-none transition-colors disabled:opacity-50`}
        style={inputStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
      <button
        type="submit"
        disabled={loading}
        className={`${btnCls} font-bold rounded-md tracking-wider uppercase transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed shrink-0`}
        style={{ background: GOLD, color: '#050810', boxShadow: GOLD_SHADOW, fontFamily: 'var(--font-inter)', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? '...' : 'Login'}
      </button>
      {error && (
        <span className="absolute top-full right-0 mt-1 text-[10px] whitespace-nowrap px-2 py-1 rounded z-10" style={{ color: '#ff6b6b', background: 'rgba(255,77,77,0.12)', border: '1px solid rgba(255,77,77,0.2)', fontFamily: 'var(--font-inter)' }}>
          {error}
        </span>
      )}
    </form>
  )
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Top row: logo + nav links + (desktop) inline login + hamburger */}
          <div className="h-[72px] flex items-center justify-between gap-4">

            {/* Left: Logo + Brand */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-9 h-9">
                <Image src="/logo.png" alt="Cigar City Sports" fill className="object-contain" priority />
              </div>
              <span
                className="font-display text-xl tracking-widest text-white hidden sm:block"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.15em' }}
              >
                CIGARCITYSPORTS
              </span>
            </div>

            {/* Center: Nav links (desktop only) */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium hover:text-white transition-colors duration-200 relative group"
                  style={{ color: '#8892a4' }}
                >
                  {link}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: '#0066ff' }} />
                </a>
              ))}
            </div>

            {/* Right: (desktop) inline login + hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative hidden lg:block">
                <NavLoginForm compact />
              </div>

              <button
                className="lg:hidden flex flex-col gap-1.5 p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white" />
                <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-white" />
                <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white" />
              </button>
            </div>
          </div>

          {/* Second row: mobile full-width login (hidden on desktop) */}
          <div className="lg:hidden pb-3 pt-1">
            <NavLoginForm />
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[128px] left-0 right-0 z-40 glass-nav border-t border-white/5 px-6 py-6 flex flex-col gap-5 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-base font-medium hover:text-white transition-colors"
                style={{ color: '#8892a4' }}
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
