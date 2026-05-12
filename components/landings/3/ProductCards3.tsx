'use client'

import Image from 'next/image'

const PRODUCTS = [
  { img: '/landings/3/card-sports.jpg', title: 'Sportsbook', desc: 'Bet on all your favorite sports with the best odds' },
  { img: '/landings/3/card-casino.jpg', title: 'Casino', desc: 'Hundreds of casino games & live dealer action' },
  { img: '/landings/3/card-racebook.jpg', title: 'Racebook', desc: 'Bet on live horse racing from around the world' },
]

export default function ProductCards3() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
      }}
    >
      {PRODUCTS.map((p) => (
        <article
          key={p.title}
          style={{
            background: 'rgba(20,16,8,0.55)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,122,24,0.15)',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'transform 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,122,24,0.45)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,122,24,0.15)'
          }}
        >
          <div style={{ position: 'relative', height: '192px', overflow: 'hidden' }}>
            <Image src={p.img} alt={p.title} fill sizes="400px" style={{ objectFit: 'cover' }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #0a0604 0%, rgba(10,6,4,0.4) 50%, transparent 100%)',
              }}
            />
          </div>
          <div style={{ padding: '16px' }}>
            <h4 style={{ fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              <span
                style={{
                  background: 'linear-gradient(135deg, #ff5e00, #ffb347)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {p.title}
              </span>
            </h4>
            <p style={{ color: '#9a8d7a', fontSize: '13px', marginTop: '6px', marginBottom: 0 }}>
              {p.desc}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
