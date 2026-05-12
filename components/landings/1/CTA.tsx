'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contactCards = [
  {
    type: 'Wagering',
    phone: '866-921-8362',
    href: 'tel:8669218362',
    description: 'Place your bets with our expert lines team.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    accent: 'gold',
    buttonLabel: 'Call Wagering',
  },
  {
    type: 'Customer Service',
    phone: '877-238-3665',
    href: 'tel:8772383665',
    description: 'Account help, deposits, and support 24/7.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    accent: 'blue',
    buttonLabel: 'Contact Support',
  },
]

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#050810' }}
    >
      {/* Spotlight gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0,102,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,162,39,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,102,255,0.4) 50%, transparent 100%)' }}
      />

      {/* Atmospheric rings */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border pointer-events-none"
        style={{ borderColor: 'rgba(0,102,255,0.05)', top: '-450px' }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border pointer-events-none"
        style={{ borderColor: 'rgba(0,102,255,0.08)', top: '-300px' }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="h-px w-8" style={{ background: '#0066ff', opacity: 0.6 }} />
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: '#0066ff', fontFamily: 'var(--font-inter)' }}
          >
            Join Today
          </span>
          <span className="h-px w-8" style={{ background: '#0066ff', opacity: 0.6 }} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-5"
          style={{
            fontFamily: 'var(--font-bebas), Impact, sans-serif',
            letterSpacing: '0.03em',
          }}
        >
          READY TO PLAY?
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-14"
          style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
        >
          Join thousands of players betting live every day. Call now and get started in minutes.
        </motion.p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.type}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: 'linear-gradient(145deg, rgba(13,20,40,0.9) 0%, rgba(7,16,42,0.95) 100%)',
                border: `1px solid rgba(${card.accent === 'gold' ? '201,162,39' : '0,102,255'},0.2)`,
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: card.accent === 'gold'
                    ? 'rgba(201,162,39,0.04)'
                    : 'rgba(0,102,255,0.05)',
                  boxShadow: card.accent === 'gold'
                    ? 'inset 0 0 0 1px rgba(201,162,39,0.4)'
                    : 'inset 0 0 0 1px rgba(0,102,255,0.4)',
                }}
              />

              {/* Top line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: card.accent === 'gold'
                    ? 'linear-gradient(90deg, transparent, #c9a227, transparent)'
                    : 'linear-gradient(90deg, transparent, #0066ff, transparent)',
                  opacity: 0.6,
                }}
              />

              <div className="relative z-10 p-7 text-left">
                {/* Icon + type */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: card.accent === 'gold' ? 'rgba(201,162,39,0.12)' : 'rgba(0,102,255,0.12)',
                      color: card.accent === 'gold' ? '#e8c14a' : '#3385ff',
                    }}
                  >
                    {card.icon}
                  </div>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{
                      color: card.accent === 'gold' ? '#c9a227' : '#0066ff',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {card.type}
                  </span>
                </div>

                {/* Phone */}
                <a
                  href={card.href}
                  className="block text-2xl font-bold mb-2 hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                  }}
                >
                  {card.phone}
                </a>

                {/* Description */}
                <p
                  className="text-sm mb-5"
                  style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
                >
                  {card.description}
                </p>

                {/* Button */}
                <motion.a
                  href={card.href}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: card.accent === 'gold'
                      ? 'linear-gradient(135deg, #c9a227, #e8c14a)'
                      : 'linear-gradient(135deg, #0044cc, #0066ff)',
                    color: card.accent === 'gold' ? '#050810' : '#ffffff',
                    boxShadow: card.accent === 'gold'
                      ? '0 0 20px rgba(201,162,39,0.35)'
                      : '0 0 20px rgba(0,102,255,0.35)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {card.buttonLabel}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {['Secure Payments', '24/7 Support', 'Fast Payouts', 'Licensed & Trusted'].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                className="text-xs"
                style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}
              >
                {badge}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
