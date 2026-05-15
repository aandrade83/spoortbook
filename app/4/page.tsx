import Image from 'next/image'
import Navbar4 from '@/components/landings/4/Navbar4'
import Carousel4 from '@/components/landings/4/Carousel4'

const DEFAULT_TESTING_SITE = 'pph.ag'

export default async function Landing4({
  searchParams,
}: {
  searchParams: Promise<{ site?: string; embed?: string }>
}) {
  const { site: rawSite } = await searchParams
  const site = rawSite || DEFAULT_TESTING_SITE

  return (
    <main
      style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        fontFamily: '"Play", sans-serif',
        fontSize: '13px',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&family=Russo+One&display=swap');
      `}</style>

      <Navbar4 site={site} />

      <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '0 15px' }}>

        {/* Payment logos strip (desktop only) */}
        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <Image
            src="/landings/4/logos.png"
            alt="Payment methods"
            width={920}
            height={60}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Carousel */}
        <div style={{ marginTop: '10px' }}>
          <Carousel4 />
        </div>

        {/* Promo images */}
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
              src="/landings/4/01.jpg"
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
              src="/landings/4/02.jpg"
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
              src="/landings/4/04.jpg"
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
