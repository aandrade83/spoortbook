'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: 'Fast Withdrawals',
    description: 'Get your winnings fast. We process payouts with zero delays and no hidden fees.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Mobile Friendly',
    description: 'Bet anywhere, anytime. Our platform is fully optimized for every device.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Live Odds',
    description: 'Real-time lines that move with the action. In-game wagering on all major sports.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Secure Platform',
    description: 'Military-grade encryption and full security protocols protecting every bet.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: 'VIP Support',
    description: 'Dedicated agents available 24/7 by phone and live chat. Real people, real help.',
  },
]

function OddsMockup() {
  const odds = [
    { team: 'Kansas City Chiefs', spread: '-3.5', ml: '-175', total: 'O 48.5' },
    { team: 'San Francisco 49ers', spread: '+3.5', ml: '+150', total: 'U 48.5' },
  ]

  const liveGames = [
    { sport: 'NBA', match: 'Lakers vs Celtics', score: '98 - 92', time: 'Q4 4:22', trend: 'up' },
    { sport: 'NFL', match: 'Cowboys vs Eagles', score: '21 - 17', time: '3Q 8:45', trend: 'down' },
  ]

  return (
    <div className="relative">
      {/* Main odds card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(13,20,40,0.95) 0%, rgba(7,16,42,0.98) 100%)',
          border: '1px solid rgba(0,102,255,0.25)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,102,255,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#00ff88', fontFamily: 'var(--font-inter)' }}
            >
              Live
            </span>
          </div>
          <span
            className="text-xs"
            style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}
          >
            NFL · Week 14
          </span>
        </div>

        {/* Odds rows */}
        <div className="p-5">
          {odds.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: '#ffffff', fontFamily: 'var(--font-inter)', flex: 1 }}
              >
                {row.team}
              </span>
              <div className="flex gap-3">
                {[row.spread, row.ml, row.total].map((val, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all"
                    style={{
                      background: 'rgba(0,102,255,0.12)',
                      border: '1px solid rgba(0,102,255,0.2)',
                      color: '#3385ff',
                      fontFamily: 'var(--font-inter)',
                      minWidth: '54px',
                      textAlign: 'center',
                    }}
                  >
                    {val}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating live games card */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-8 -right-6 w-64 rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(7,16,42,0.98) 0%, rgba(5,8,16,0.98) 100%)',
          border: '1px solid rgba(201,162,39,0.25)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(201,162,39,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#c9a227', fontFamily: 'var(--font-inter)' }}
          >
            Live Games
          </span>
          <span className="text-xs" style={{ color: '#4a5568' }}>2 live</span>
        </div>
        {liveGames.map((game, i) => (
          <div
            key={i}
            className="px-4 py-3"
            style={{ borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold tracking-widest" style={{ color: '#0066ff', fontFamily: 'var(--font-inter)' }}>
                {game.sport}
              </span>
              <span className="text-[10px]" style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}>{game.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: '#e8eaf0', fontFamily: 'var(--font-inter)' }}>{game.match}</span>
              <span
                className="text-xs font-bold"
                style={{ color: game.trend === 'up' ? '#00ff88' : '#ff4455', fontFamily: 'var(--font-inter)' }}
              >
                {game.score}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating mini stat */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-5 -left-6 w-36 rounded-xl px-4 py-3"
        style={{
          background: 'rgba(0,102,255,0.12)',
          border: '1px solid rgba(0,102,255,0.3)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 30px rgba(0,102,255,0.15)',
        }}
      >
        <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#0066ff', fontFamily: 'var(--font-inter)' }}>
          Today&apos;s Volume
        </div>
        <div
          className="text-lg font-bold"
          style={{
            fontFamily: 'var(--font-bebas), Impact, sans-serif',
            color: '#ffffff',
            letterSpacing: '0.05em',
          }}
        >
          $2.4M
        </div>
      </motion.div>
    </div>
  )
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const leftY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px'])
  const rightY = useTransform(scrollYProgress, [0, 1], ['-40px', '40px'])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #07102a 60%, #050810 100%)' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'rgba(0,102,255,0.07)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <motion.div ref={contentRef} style={{ y: leftY }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8" style={{ background: '#c9a227', opacity: 0.7 }} />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: '#c9a227', fontFamily: 'var(--font-inter)' }}
              >
                The VegasOffshore Advantage
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-none"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                letterSpacing: '0.03em',
              }}
            >
              WHY PLAY WITH
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #0066ff, #3385ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                VEGASOFFSHORE
              </span>
            </motion.h2>

            {/* Feature list */}
            <div className="space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                  className="flex gap-4 group cursor-default"
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(0,102,255,0.12)',
                      border: '1px solid rgba(0,102,255,0.2)',
                      color: '#3385ff',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold mb-0.5"
                      style={{ color: '#ffffff', fontFamily: 'var(--font-inter)' }}
                    >
                      {feature.title}
                    </div>
                    <div
                      className="text-sm leading-relaxed"
                      style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
                    >
                      {feature.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: mockup */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative pt-10 pb-16 lg:pb-0"
          >
            <OddsMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
