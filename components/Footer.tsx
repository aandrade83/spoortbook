'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const footerLinks = [
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Responsible Gaming', href: '#' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#030609', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-8 h-8 opacity-80">
              <Image src="/logo.png" alt="VegasOffshore" fill className="object-contain" />
            </div>
            <span
              className="text-base tracking-widest text-white/70"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.18em' }}
            >
              VEGASOFFSHORE
            </span>
          </motion.div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Phone */}
          <div className="text-center md:text-right">
            <div className="text-xs mb-1" style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}>
              Wagering Line
            </div>
            <a
              href="tel:8669218362"
              className="text-sm font-semibold hover:text-white transition-colors"
              style={{ color: '#c9a227', fontFamily: 'var(--font-inter)' }}
            >
              866-921-8362
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p
            className="text-xs"
            style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}
          >
            © 2026 VegasOffshore. All rights reserved.
          </p>
          <p
            className="text-xs max-w-lg leading-relaxed"
            style={{ color: '#2d3748', fontFamily: 'var(--font-inter)' }}
          >
            Must be 21+ to wager. Gambling problem? Call 1-800-522-4700. VegasOffshore is for entertainment purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
