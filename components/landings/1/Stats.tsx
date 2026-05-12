'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
  description: string
  delay: number
  accentColor: string
}

function StatCard({ icon, value, label, description, delay, accentColor }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative group rounded-xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(145deg, rgba(13,20,32,0.9) 0%, rgba(7,16,42,0.9) 100%)',
        border: `1px solid rgba(${accentColor === 'blue' ? '0,102,255' : '201,162,39'},0.2)`,
        backdropFilter: 'blur(16px)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: accentColor === 'blue'
            ? 'inset 0 0 0 1px rgba(0,102,255,0.5), 0 0 30px rgba(0,102,255,0.15)'
            : 'inset 0 0 0 1px rgba(201,162,39,0.5), 0 0 30px rgba(201,162,39,0.15)',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: accentColor === 'blue'
            ? 'linear-gradient(90deg, transparent, #0066ff, transparent)'
            : 'linear-gradient(90deg, transparent, #c9a227, transparent)',
        }}
      />

      <div className="relative z-10 p-8">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
          style={{
            background: accentColor === 'blue'
              ? 'rgba(0,102,255,0.12)'
              : 'rgba(201,162,39,0.12)',
          }}
        >
          <div style={{ color: accentColor === 'blue' ? '#3385ff' : '#e8c14a' }}>
            {icon}
          </div>
        </div>

        {/* Value */}
        <div
          className="text-4xl md:text-5xl font-bold mb-1 leading-none"
          style={{
            fontFamily: 'var(--font-bebas), Impact, sans-serif',
            letterSpacing: '0.05em',
            color: accentColor === 'blue' ? '#3385ff' : '#e8c14a',
          }}
        >
          {value}
        </div>

        {/* Label */}
        <div
          className="text-base font-bold tracking-widest uppercase mb-3"
          style={{ color: '#ffffff', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}
        >
          {label}
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

const stats = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    value: '24/7',
    label: 'Live Betting',
    description: 'Round-the-clock live wagering on all major sports and events worldwide.',
    accentColor: 'blue',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    value: 'FAST',
    label: 'Payouts',
    description: 'Quick and reliable withdrawals processed with zero hassle, every time.',
    accentColor: 'gold',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    value: '10K+',
    label: 'Trusted Players',
    description: 'A growing community of serious bettors who trust Cigar City Sports with their action.',
    accentColor: 'blue',
  },
]

export default function Stats() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #07102a 50%, #050810 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,102,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(0,102,255,0.06)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(201,162,39,0.05)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-electric opacity-60" style={{ background: '#0066ff' }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#0066ff', fontFamily: 'var(--font-inter)' }}
            >
              Why Cigar City Sports
            </span>
            <span className="h-px w-8" style={{ background: '#0066ff', opacity: 0.6 }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl text-white"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            THE ACTION NEVER STOPS
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={0.15 * i} />
          ))}
        </div>
      </div>
    </section>
  )
}
