'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['Sports', 'Live Betting', 'Promotions', 'Support']

const GOLD = 'linear-gradient(135deg, #c9a227, #e8c14a)'
const GOLD_SHADOW = '0 0 20px rgba(201,162,39,0.35)'

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

          {/* ── Left: Logo + Brand + Cashier ──────────────────────────────── */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image
                  src="/logo.png"
                  alt="VegasOffshore"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className="font-display text-xl tracking-widest text-white hidden sm:block"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.15em' }}
              >
                VEGASOFFSHORE
              </span>
            </div>

            {/* Cashier button */}
            <motion.a
              href="https://vrb-cashier.vercel.app/bitbet/23C2A58/sign-in"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(201,162,39,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 text-xs font-bold rounded-md tracking-widest uppercase"
              style={{
                background: GOLD,
                color: '#050810',
                boxShadow: GOLD_SHADOW,
                fontFamily: 'var(--font-inter)',
              }}
            >
              Cashier
            </motion.a>
          </div>

          {/* ── Center: Nav links (desktop) ───────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium hover:text-white transition-colors duration-200 relative group"
                style={{ color: '#8892a4' }}
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric group-hover:w-full transition-all duration-300" style={{ background: '#0066ff' }} />
              </a>
            ))}
          </div>

          {/* ── Right: Login form + Join Now + hamburger ──────────────────── */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Login form — desktop only */}
            <form
              data-security="form"
              name="client login"
              id="login"
              action="https://wager.sportsbettingonline.ag/redirectlogin.php"
              method="post"
              className="hidden lg:flex items-center gap-2"
            >
              <input
                type="text"
                name="username"
                data-field="user"
                placeholder="Login ID"
                autoComplete="username"
                className="h-8 px-3 text-xs rounded-md outline-none transition-colors focus:border-[#0066ff]"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-inter)',
                  width: '110px',
                }}
              />
              <input
                type="password"
                name="password"
                data-field="pass"
                placeholder="Password"
                autoComplete="current-password"
                className="h-8 px-3 text-xs rounded-md outline-none transition-colors focus:border-[#0066ff]"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-inter)',
                  width: '100px',
                }}
              />
              <input type="hidden" name="action" value="1" />
              <input type="hidden" name="multiaccount" id="multiaccount" value="1" />
              <button
                type="submit"
                data-action="login"
                className="h-8 px-4 text-xs font-bold rounded-md tracking-wider uppercase transition-all hover:opacity-90"
                style={{
                  background: GOLD,
                  color: '#050810',
                  boxShadow: GOLD_SHADOW,
                  fontFamily: 'var(--font-inter)',
                  cursor: 'pointer',
                }}
              >
                Login
              </button>
            </form>

            {/* Join Now */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200"
              style={{
                background: GOLD,
                color: '#050810',
                boxShadow: GOLD_SHADOW,
                fontFamily: 'var(--font-inter)',
              }}
            >
              Join Now
            </motion.a>

            {/* Hamburger */}
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

      {/* ── Mobile menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-nav border-t border-white/5 px-6 py-6 flex flex-col gap-5 lg:hidden"
          >
            {/* Login form — mobile */}
            <form
              data-security="form"
              name="client login"
              action="https://wager.sportsbettingonline.ag/redirectlogin.php"
              method="post"
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                name="username"
                data-field="user"
                placeholder="Login ID"
                autoComplete="username"
                className="w-full h-10 px-3 text-sm rounded-md outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-inter)',
                }}
              />
              <input
                type="password"
                name="password"
                data-field="pass"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full h-10 px-3 text-sm rounded-md outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-inter)',
                }}
              />
              <input type="hidden" name="action" value="1" />
              <input type="hidden" name="multiaccount" value="1" />
              <button
                type="submit"
                data-action="login"
                className="w-full h-10 text-sm font-bold rounded-md tracking-wider uppercase"
                style={{ background: GOLD, color: '#050810', fontFamily: 'var(--font-inter)', cursor: 'pointer' }}
              >
                Login
              </button>
            </form>

            <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

            {/* Nav links */}
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

            {/* Join Now + Cashier */}
            <a
              href="#"
              className="w-full text-center h-11 flex items-center justify-center text-sm font-bold rounded-md"
              style={{ background: GOLD, color: '#050810', fontFamily: 'var(--font-inter)' }}
              onClick={() => setMobileOpen(false)}
            >
              Join Now
            </a>
            <a
              href="https://vrb-cashier.vercel.app/bitbet/23C2A58/sign-in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center h-11 flex items-center justify-center text-sm font-bold rounded-md border"
              style={{
                borderColor: 'rgba(201,162,39,0.4)',
                color: '#e8c14a',
                fontFamily: 'var(--font-inter)',
              }}
              onClick={() => setMobileOpen(false)}
            >
              Cashier
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
