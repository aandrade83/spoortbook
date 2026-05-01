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

// ── Desktop login form ────────────────────────────────────────────────────────
function DesktopLoginForm() {
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
      router.push('/lobby')
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

  return (
    <form onSubmit={handleSubmit} noValidate className="hidden lg:flex items-center gap-2">
      <div className="flex flex-col gap-1 relative">
        <input
          ref={userRef}
          type="text"
          placeholder="Login ID"
          autoComplete="username"
          disabled={loading}
          className="h-8 px-3 text-xs rounded-md outline-none transition-colors disabled:opacity-50"
          style={{ ...inputStyle, width: '110px' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
        />
      </div>
      <input
        ref={passRef}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        disabled={loading}
        className="h-8 px-3 text-xs rounded-md outline-none transition-colors disabled:opacity-50"
        style={{ ...inputStyle, width: '100px' }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
      <div className="flex flex-col gap-1">
        <button
          type="submit"
          disabled={loading}
          className="h-8 px-4 text-xs font-bold rounded-md tracking-wider uppercase transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: GOLD, color: '#050810', boxShadow: GOLD_SHADOW, fontFamily: 'var(--font-inter)', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? '...' : 'Login'}
        </button>
        {/* Error shown below the button row */}
        {error && (
          <span className="absolute top-full mt-1 right-0 text-[10px] whitespace-nowrap px-2 py-1 rounded" style={{ color: '#ff6b6b', background: 'rgba(255,77,77,0.12)', border: '1px solid rgba(255,77,77,0.2)', fontFamily: 'var(--font-inter)' }}>
            {error}
          </span>
        )}
      </div>
    </form>
  )
}

// ── Mobile login form ─────────────────────────────────────────────────────────
function MobileLoginForm({ onSuccess }: { onSuccess: () => void }) {
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
      onSuccess()
      router.push('/lobby')
    } else {
      setError(result.message ?? 'Invalid credentials')
      passRef.current!.value = ''
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.14)',
    color: '#ffffff',
    fontFamily: 'var(--font-inter)',
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <input
        ref={userRef}
        type="text"
        placeholder="Login ID"
        autoComplete="username"
        disabled={loading}
        className="w-full h-10 px-3 text-sm rounded-md outline-none disabled:opacity-50"
        style={inputStyle}
      />
      <input
        ref={passRef}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        disabled={loading}
        className="w-full h-10 px-3 text-sm rounded-md outline-none disabled:opacity-50"
        style={inputStyle}
      />
      {error && (
        <p className="text-xs text-center px-2 py-1.5 rounded" style={{ color: '#ff6b6b', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.2)', fontFamily: 'var(--font-inter)' }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 text-sm font-bold rounded-md tracking-wider uppercase disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: GOLD, color: '#050810', fontFamily: 'var(--font-inter)', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Signing in...' : 'Login'}
      </button>
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
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between gap-4">

          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-9 h-9">
              <Image src="/logo.png" alt="VegasOffshore" fill className="object-contain" priority />
            </div>
            <span
              className="font-display text-xl tracking-widest text-white hidden sm:block"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.15em' }}
            >
              VEGASOFFSHORE
            </span>
          </div>

          {/* Center: Nav links */}
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

          {/* Right: Login form + Join Now + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop login — React controlled, validates via /api/auth/login */}
            <div className="relative">
              <DesktopLoginForm />
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200"
              style={{ background: GOLD, color: '#050810', boxShadow: GOLD_SHADOW, fontFamily: 'var(--font-inter)' }}
            >
              Join Now
            </motion.a>

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
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-nav border-t border-white/5 px-6 py-6 flex flex-col gap-5 lg:hidden"
          >
            <MobileLoginForm onSuccess={() => setMobileOpen(false)} />

            <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

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

            <a
              href="#"
              className="w-full text-center h-11 flex items-center justify-center text-sm font-bold rounded-md"
              style={{ background: GOLD, color: '#050810', fontFamily: 'var(--font-inter)' }}
              onClick={() => setMobileOpen(false)}
            >
              Join Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
