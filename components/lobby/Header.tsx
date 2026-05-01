'use client'

import Image from 'next/image'

type Section = 'lobby' | 'cashier' | 'casino' | 'sportsbook'

const SECTION_LABELS: Record<Exclude<Section, 'lobby'>, string> = {
  cashier:    'CASHIER',
  casino:     'CASINO',
  sportsbook: 'SPORTSBOOK',
}

interface HeaderProps {
  username: string | null
  activeSection: Section
  onBack: () => void
  onLogout: () => void
}

export default function Header({ username, activeSection, onBack, onLogout }: HeaderProps) {
  const inSection = activeSection !== 'lobby'

  return (
    <header
      className="w-full h-16 flex items-center justify-between px-6 lg:px-10 shrink-0"
      style={{
        background: 'rgba(5, 8, 16, 0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Left: Logo + brand + back button when in section */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 shrink-0">
          <Image src="/logo.png" alt="VegasOffshore" fill sizes="32px" className="object-contain" priority />
        </div>
        <span
          className="text-white tracking-widest text-lg hidden sm:block"
          style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.15em' }}
        >
          VEGASOFFSHORE
        </span>

        {inSection && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>›</span>
            <span
              className="text-lg tracking-widest hidden sm:block"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                letterSpacing: '0.15em',
                color: '#e8c14a',
              }}
            >
              {SECTION_LABELS[activeSection as Exclude<Section, 'lobby'>]}
            </span>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {inSection && (
          <button
            onClick={onBack}
            className="h-8 px-4 text-xs font-semibold rounded-md tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5"
            style={{
              background: 'rgba(201,162,39,0.12)',
              border: '1px solid rgba(201,162,39,0.35)',
              color: '#e8c14a',
              fontFamily: 'var(--font-inter)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,162,39,0.22)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(201,162,39,0.12)')}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Lobby
          </button>
        )}

        {username && (
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block" style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}>
              <span className="font-semibold" style={{ color: '#e8c14a' }}>{username}</span>
            </span>
            <button
              onClick={onLogout}
              className="h-8 px-4 text-xs font-semibold rounded-md tracking-wider uppercase transition-all duration-200 hover:opacity-80"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#8892a4',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
