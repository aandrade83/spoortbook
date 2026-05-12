'use client'

type Section = 'cashier' | 'casino' | 'sportsbook'

const LOBBY_BUTTONS = [
  {
    id: 'cashier' as Section,
    label: 'CASHIER',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M7 15h2M15 15h2" />
      </svg>
    ),
    description: 'Deposits & Withdrawals',
    accent: '#c9a227',
    accentLight: '#e8c14a',
    glow: 'rgba(201,162,39,0.3)',
  },
  {
    id: 'casino' as Section,
    label: 'CASINO',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    description: 'Slots, Table Games & Live',
    accent: '#0066ff',
    accentLight: '#3385ff',
    glow: 'rgba(0,102,255,0.3)',
  },
  {
    id: 'sportsbook' as Section,
    label: 'SPORTSBOOK',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
    description: 'Live Odds & Sports Wagering',
    accent: '#10b981',
    accentLight: '#34d399',
    glow: 'rgba(16,185,129,0.3)',
  },
] as const

interface LobbyProps {
  username: string
  loadingSection: Section | null
  onNavigate: (section: Section) => void
}

export default function Lobby({ username, loadingSection, onNavigate }: LobbyProps) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-10 px-4">
      {/* Greeting */}
      <div className="text-center">
        <h1
          className="text-4xl sm:text-5xl text-white mb-2"
          style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.08em' }}
        >
          WELCOME BACK,{' '}
          <span style={{ color: '#e8c14a' }}>{username.toUpperCase()}</span>
        </h1>
        <p className="text-sm" style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}>
          Select a destination to continue
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-4">
        {LOBBY_BUTTONS.map((btn) => {
          const isLoading = loadingSection === btn.id
          return (
            <button
              key={btn.id}
              disabled={loadingSection !== null}
              onClick={() => onNavigate(btn.id)}
              className="flex-1 group flex flex-col items-center gap-4 py-8 px-6 rounded-2xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: 'rgba(13, 20, 32, 0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                if (loadingSection !== null) return
                const el = e.currentTarget
                el.style.borderColor = btn.accent
                el.style.boxShadow = `0 0 30px ${btn.glow}, 0 8px 32px rgba(0,0,0,0.4)`
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ color: btn.accentLight }}>{btn.icon}</span>

              <span
                className="text-2xl font-bold tracking-widest"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  letterSpacing: '0.15em',
                  color: '#ffffff',
                }}
              >
                {btn.label}
              </span>

              <span
                className="text-xs text-center"
                style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
              >
                {btn.description}
              </span>

              {isLoading ? (
                <span className="flex items-center gap-1.5" style={{ color: btn.accentLight, fontFamily: 'var(--font-inter)' }}>
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span className="text-xs font-semibold tracking-wider uppercase">Loading...</span>
                </span>
              ) : (
                <span
                  className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  style={{ color: btn.accentLight, fontFamily: 'var(--font-inter)' }}
                >
                  Enter
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
