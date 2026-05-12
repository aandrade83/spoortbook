import Image from 'next/image'
import Navbar2 from '@/components/landings/2/Navbar2'

const DEFAULT_TESTING_SITE = 'cigarcitysportshq.com'

export default async function Landing2({
  searchParams,
}: {
  searchParams: Promise<{ site?: string; embed?: string }>
}) {
  const { site: rawSite } = await searchParams
  const site = rawSite || DEFAULT_TESTING_SITE

  return (
    <main
      style={{
        backgroundImage: 'url(/landings/2/bg.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000000',
        minHeight: '100vh',
        fontFamily: '"Play", sans-serif',
        fontSize: '13px',
        overflowX: 'hidden',
      }}
    >
      {/* Google Fonts for Play + Russo One */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&family=Russo+One&display=swap');
      `}</style>

      <Navbar2 site={site} />

      <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '0 15px' }}>

        {/* Phone numbers */}
        <div style={{ textAlign: 'center', marginTop: '18px' }}>
          <p
            style={{
              fontFamily: '"Russo One", sans-serif',
              color: '#fff',
              fontSize: '11px',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Wagering: 866-921-8362<br />
            Customer Service: 877-238-3665
          </p>
        </div>

        {/* Desktop banner strip (hidden on mobile) */}
        <div className="hidden-xs hidden-sm" style={{ textAlign: 'center', marginTop: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/landings/2/logos.png"
              alt="Payment methods"
              width={920}
              height={60}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ marginTop: '8px' }}>
            <iframe
              width="920"
              height="300"
              style={{ borderRadius: '12px', border: '1px solid #ff0000', maxWidth: '100%' }}
              src="//assets.becoms.co/banner.html"
              scrolling="no"
              frameBorder="0"
            />
          </div>
        </div>

        {/* Mobile banner (hidden on desktop) */}
        <div
          style={{ textAlign: 'center', marginTop: '10px' }}
          className="hidden-lg hidden-md"
        >
          <div style={{ padding: '0 8px' }}>
            <iframe
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                border: '1px solid #ff0000',
              }}
              src="//assets.becoms.co/dailybanners/bannermobile.html"
              scrolling="no"
              frameBorder="0"
            />
          </div>
        </div>

        {/* Promo images row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            marginTop: '15px',
          }}
        >
          <div style={{ width: '50%', padding: '0 7px 15px', boxSizing: 'border-box' }}>
            <Image
              src="/landings/2/01.jpg"
              alt="Promo 1"
              width={560}
              height={320}
              style={{
                borderRadius: '15px',
                border: '1px solid #ff0000',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div style={{ width: '50%', padding: '0 7px 15px', boxSizing: 'border-box' }}>
            <Image
              src="/landings/2/02.jpg"
              alt="Promo 2"
              width={560}
              height={320}
              style={{
                borderRadius: '15px',
                border: '1px solid #ff0000',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div style={{ width: '100%', padding: '0 7px 15px', boxSizing: 'border-box' }}>
            <Image
              src="/landings/2/04.jpg"
              alt="Promo 3"
              width={1140}
              height={300}
              style={{
                borderRadius: '15px',
                border: '1px solid #ff0000',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ marginTop: '10px' }}>
        <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '0 15px' }}>
          <div style={{ textAlign: 'center', padding: '15px 0' }}>
            <p
              style={{
                color: '#fff',
                borderRadius: '10px',
                padding: '7px',
                margin: 0,
                fontFamily: '"Play", sans-serif',
              }}
            >
              All rights reserved © Copyright www.{site} ©{' '}
              <span suppressHydrationWarning>{new Date().getFullYear()}</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
