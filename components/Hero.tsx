'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

type Particle = {
  id: number
  size: number
  left: string
  duration: number
  delay: number
  drift: string
  color: string
}

function makeParticles(): Particle[] {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 8,
    drift: `${(Math.random() - 0.5) * 120}px`,
    color: i % 3 === 0 ? 'rgba(201,162,39,0.7)' : 'rgba(0,102,255,0.7)',
  }))
}

const headlineWords = ['BET BIG.', 'WIN FAST.']

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0066ff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])
  // Use ref so the scroll callback never gets a stale closure
  const isMobileRef = useRef(false)
  const outerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // scrollYProgress: 0 when outer div top hits viewport top, 1 when its bottom hits viewport bottom
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Content fades up and disappears through first 25 % of scroll travel
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.35], ['0%', '-18%'])

  // Overlay deepens as darker scenes of the video play
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.42, 0.80])

  // Scroll hint vanishes as soon as the user touches the scroll
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0])

  // ── Scroll-scrub: advance video currentTime on every scroll tick ──────────
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const video = videoRef.current
    if (!video || isMobileRef.current) return
    if (video.readyState < 1 || !isFinite(video.duration)) return
    video.currentTime = progress * video.duration
  })

  useEffect(() => {
    setParticles(makeParticles())

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // After metadata loads: desktop → pause at frame 0; mobile → start autoplay loop
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const setup = () => {
      if (isMobileRef.current) {
        video.loop = true
        video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    }

    if (video.readyState >= 1) {
      setup()
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true })
    }
  }, [])

  return (
    // Outer container — 280 vh of scroll travel drives the full video timeline
    <div ref={outerRef} style={{ height: '280vh' }}>

      {/* Sticky frame — stays pinned while user scrolls through outer container */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: '#050810' }}
      >

        {/* ── Video ─────────────────────────────────────────────────────────── */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center 58%',
            // Subtle scale-in creates an elegant frame; dark background bleeds through edges
            transform: 'scale(0.93)',
            transformOrigin: 'center center',
          }}
          src="/sportsbook-hero-v1.mp4"
        />

        {/* ── Scroll-reactive gradient overlay ─────────────────────────────── */}
        <motion.div className="absolute inset-0" style={{ opacity: overlayOpacity }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,8,16,0.88) 0%, rgba(5,8,16,0.22) 35%, rgba(5,8,16,0.55) 72%, rgba(5,8,16,1) 100%)',
            }}
          />
        </motion.div>

        {/* ── Base readability layer (always on) ───────────────────────────── */}
        <div className="absolute inset-0" style={{ background: 'rgba(5,8,16,0.38)' }} />

        {/* ── Particles ────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                bottom: '-10px',
                background: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                '--drift': p.drift,
                opacity: 0,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* ── Hero content ─────────────────────────────────────────────────── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-10 opacity-70" style={{ background: '#0066ff' }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#c9a227', fontFamily: 'var(--font-inter)' }}
            >
              Trusted Premium Sportsbook
            </span>
            <span className="h-px w-10 opacity-70" style={{ background: '#0066ff' }} />
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            {headlineWords.map((word, i) => (
              <motion.h1
                key={word}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  delay: 0.5 + i * 0.15,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block leading-none text-white"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                  letterSpacing: '0.02em',
                  textShadow: '0 4px 40px rgba(0,0,0,0.85), 0 0 80px rgba(0,0,0,0.5)',
                }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-4 text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
          >
            Live wagering, fast payouts, premium action 24/7.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(201,162,39,0.65)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-md tracking-wider uppercase"
              style={{
                background: 'linear-gradient(135deg, #c9a227, #e8c14a)',
                color: '#050810',
                boxShadow: '0 0 25px rgba(201,162,39,0.42)',
                fontFamily: 'var(--font-inter)',
                minWidth: '160px',
              }}
            >
              Join Now
            </motion.a>

            <motion.a
              href="tel:8669218362"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-md tracking-wider uppercase border transition-colors"
              style={{
                borderColor: 'rgba(255,255,255,0.25)',
                color: '#ffffff',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
                fontFamily: 'var(--font-inter)',
                minWidth: '160px',
              }}
            >
              Call Now
            </motion.a>
          </motion.div>

          {/* Phone number badge cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-5"
          >
            <a
              href="tel:8669218362"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(5,8,16,0.65)',
                border: '1px solid rgba(0,102,255,0.28)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <PhoneIcon />
              <div className="text-left">
                <div
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}
                >
                  Wagering
                </div>
                <div
                  className="text-sm font-bold tabular-nums"
                  style={{ color: '#e8c14a', fontFamily: 'var(--font-inter)' }}
                >
                  866-921-8362
                </div>
              </div>
            </a>

            <a
              href="tel:8772383665"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(5,8,16,0.65)',
                border: '1px solid rgba(0,102,255,0.28)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <PhoneIcon />
              <div className="text-left">
                <div
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}
                >
                  Customer Service
                </div>
                <div
                  className="text-sm font-bold tabular-nums"
                  style={{ color: '#e8c14a', fontFamily: 'var(--font-inter)' }}
                >
                  877-238-3665
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Scroll hint (vanishes as soon as scroll begins) ───────────────── */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: '#4a5568', fontFamily: 'var(--font-inter)' }}
          >
            Scroll
          </span>
          <div
            className="w-6 h-10 rounded-full border flex items-start justify-center pt-2"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#0066ff' }}
            />
          </div>
        </motion.div>

        {/* ── Bottom fade into next section ─────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #050810)' }}
        />
      </div>
    </div>
  )
}
