'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SportCardProps {
  name: string
  icon: React.ReactNode
  description: string
  delay: number
  featured?: boolean
}

function SportCard({ name, icon, description, delay, featured }: SportCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="relative group rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(145deg, rgba(13,20,32,0.85) 0%, rgba(7,16,42,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-xl"
        style={{
          background: featured
            ? 'linear-gradient(145deg, rgba(201,162,39,0.06) 0%, rgba(201,162,39,0.02) 100%)'
            : 'linear-gradient(145deg, rgba(0,102,255,0.08) 0%, rgba(0,102,255,0.02) 100%)',
          boxShadow: featured
            ? 'inset 0 0 0 1px rgba(201,162,39,0.4), 0 20px 50px rgba(201,162,39,0.12)'
            : 'inset 0 0 0 1px rgba(0,102,255,0.4), 0 20px 50px rgba(0,102,255,0.12)',
        }}
      />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: featured
            ? 'linear-gradient(90deg, transparent, #c9a227, transparent)'
            : 'linear-gradient(90deg, transparent, #0066ff, transparent)',
        }}
      />

      <div className="relative z-10 p-7">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{
            background: featured
              ? 'rgba(201,162,39,0.1)'
              : 'rgba(0,102,255,0.1)',
          }}
        >
          <div
            className="group-hover:scale-110 transition-transform duration-300"
            style={{ color: featured ? '#e8c14a' : '#3385ff' }}
          >
            {icon}
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-xl mb-2 tracking-wide"
          style={{
            fontFamily: 'var(--font-bebas), Impact, sans-serif',
            letterSpacing: '0.1em',
            color: '#ffffff',
          }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
        >
          {description}
        </p>

        {/* Bet now link */}
        <div className="flex items-center gap-2 group/link">
          <span
            className="text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
            style={{
              color: featured ? '#c9a227' : '#0066ff',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Bet Now
          </span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={featured ? '#c9a227' : '#0066ff'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  )
}

const sports = [
  {
    name: 'NFL',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="8" ry="5" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <path d="M8 7.5c0 0 2 2 4 2s4-2 4-2" />
        <path d="M8 16.5c0 0 2-2 4-2s4 2 4 2" />
      </svg>
    ),
    description: 'Full spreads, moneylines, totals, and prop bets for every game of the season.',
    featured: false,
  },
  {
    name: 'NBA',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M7 3.5c2.5 3 2.5 13.5 0 17" />
        <path d="M17 3.5c-2.5 3-2.5 13.5 0 17" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    ),
    description: 'Live odds on every quarter and half. Futures, parlays, and same-game parlay.',
    featured: false,
  },
  {
    name: 'MLB',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M7.5 4.5c1.5 2 1.5 13 0 15" />
        <path d="M16.5 4.5c-1.5 2-1.5 13 0 15" />
        <line x1="3.5" y1="9" x2="20.5" y2="9" />
        <line x1="3.5" y1="15" x2="20.5" y2="15" />
      </svg>
    ),
    description: 'Run lines, totals, and futures on every MLB game through the postseason.',
    featured: false,
  },
  {
    name: 'Soccer',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polygon points="12,6 14.5,9.5 12,13 9.5,9.5" />
        <path d="M12 13v5" />
        <path d="M9.5 9.5L5 10.5" />
        <path d="M14.5 9.5L19 10.5" />
      </svg>
    ),
    description: 'Premier League, Champions League, MLS, World Cup — global coverage all year.',
    featured: false,
  },
  {
    name: 'Live Casino',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <circle cx="8.5" cy="10" r="1.5" />
        <circle cx="15.5" cy="14" r="1.5" />
        <circle cx="8.5" cy="14" r="1.5" />
        <circle cx="15.5" cy="10" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
    description: 'Blackjack, roulette, baccarat, and poker with real dealers around the clock.',
    featured: true,
  },
  {
    name: 'Props',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    description: 'Player props, team props, game props — hundreds of markets every single day.',
    featured: false,
  },
]

export default function SportsGrid() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#050810' }}>
      {/* Background radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)' }}
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
            <span className="h-px w-8" style={{ background: '#c9a227', opacity: 0.7 }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#c9a227', fontFamily: 'var(--font-inter)' }}
            >
              All Major Markets
            </span>
            <span className="h-px w-8" style={{ background: '#c9a227', opacity: 0.7 }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl text-white mb-4"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            BET YOUR FAVORITE MARKETS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
          >
            From NFL spreads to live in-game action — hundreds of betting markets available 24/7.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sports.map((sport, i) => (
            <SportCard key={sport.name} {...sport} delay={0.08 * i} />
          ))}
        </div>
      </div>
    </section>
  )
}
