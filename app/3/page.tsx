import Image from 'next/image'
import Header3 from '@/components/landings/3/Header3'
import Carousel3 from '@/components/landings/3/Carousel3'
import ProductCards3 from '@/components/landings/3/ProductCards3'

const DEFAULT_TESTING_SITE = 'playlt365.com'

const TRUST = [
  { icon: '🛡️', title: 'Trusted & Secure', desc: 'Your data is safe with us' },
  { icon: '🎧', title: '24/7 Support', desc: "We're here to help" },
  { icon: '🏆', title: 'Agent Powered', desc: 'Built for players. Backed by pros.' },
]

export default async function Landing3({
  searchParams,
}: {
  searchParams: Promise<{ site?: string; embed?: string }>
}) {
  const { site: rawSite } = await searchParams
  const site = rawSite || DEFAULT_TESTING_SITE

  return (
    <main
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: 'radial-gradient(ellipse at top, #1a0f05 0%, #0a0604 60%) fixed',
        color: '#f5f1ea',
        minHeight: '100vh',
      }}
    >
      <Header3 site={site} />

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 16px' }}>

        {/* Leagues logos strip */}
        <section style={{ padding: '24px 0' }}>
          <div
            style={{
              background: 'rgba(20,16,8,0.55)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,122,24,0.15)',
              borderRadius: '12px',
              padding: '12px 24px',
              display: 'flex',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/landings/3/logos.png"
              alt="Leagues"
              width={900}
              height={60}
              style={{ maxWidth: '100%', height: '60px', objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* Carousel */}
        <section style={{ paddingBottom: '24px' }}>
          <Carousel3 />
        </section>

        {/* Three ways to play */}
        <section style={{ padding: '32px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                color: '#ff7a18',
                textTransform: 'uppercase',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.4em',
              }}
            >
              — Products —
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                fontWeight: 900,
                marginTop: '8px',
                color: '#f5f1ea',
              }}
            >
              THREE WAYS TO PLAY
            </h3>
          </div>
          <ProductCards3 />
        </section>

        {/* Trust strip */}
        <section style={{ paddingBottom: '40px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {TRUST.map((t) => (
              <div
                key={t.title}
                style={{
                  background: 'rgba(20,16,8,0.55)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,122,24,0.15)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255,122,24,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  {t.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '13px' }}>{t.title}</div>
                  <div style={{ color: '#9a8d7a', fontSize: '12px', marginTop: '2px' }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: '16px',
          padding: '20px 16px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#9a8d7a',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        © {new Date().getFullYear()} {site.toUpperCase()} — All rights reserved.
      </footer>
    </main>
  )
}
