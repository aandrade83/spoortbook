import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CopyButton from './CopyButton'

const LANDINGS: Record<string, {
  name: string
  title: string
  description: string
}> = {
  '1': {
    name: 'Landing 1',
    title: 'Modern Sportsbook with Video Hero',
    description:
      'Modern Landing with Video Hero Scrolling, Login and Internal Lobby. Just login once and jump between Cashier, Casino, Sportsbooks.',
  },
  '2': {
    name: 'Landing 2',
    title: 'Classic Sportsbook — Cashier Button',
    description:
      'Classic sportsbook landing. Logo auto-loads from site domain, Cashier button opens the partner cashier via API lookup, Login posts directly to the book.',
  },
  '3': {
    name: 'Landing 3',
    title: 'Orange Neon — Carousel + Product Cards',
    description:
      'Dark orange neon theme with auto-carousel, Sportsbook/Casino/Racebook product cards, trust strip, and Cashier API lookup button.',
  },
  '4': {
    name: 'Landing 4',
    title: 'PPH Classic — Local Carousel + Cashier',
    description:
      'Classic black/red sportsbook style with a local image carousel (NBA, Baseball, NHL, Casino, Horses), Cashier API lookup, and direct login to the book.',
  },
}

function buildSnippet(id: string) {
  return `<!-- VRB LANDING EMBED START -->
<style>
  #vrb-landing-wrapper {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999999;
    background: #050810;
  }
  #vrb-landing-wrapper iframe {
    width: 100vw;
    height: 100vh;
    border: 0;
    display: block;
  }
  #vrb-landing-loader {
    position: fixed;
    inset: 0;
    z-index: 999998;
    background: #050810;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }
</style>

<div id="vrb-landing-loader">Loading...</div>
<div id="vrb-landing-wrapper">
  <div id="ccs-embed"></div>
</div>

<script>
  window.VRB_LANDING_READY = false;

  function vrbShowOriginalSite() {
    document.getElementById('vrb-landing-wrapper').style.display = 'none';
    document.getElementById('vrb-landing-loader').style.display = 'none';
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }

  window.vrbLandingLoaded = function () {
    if (window.VRB_LANDING_READY) return;
    window.VRB_LANDING_READY = true;
    document.getElementById('vrb-landing-loader').style.display = 'none';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  setTimeout(function () {
    if (!window.VRB_LANDING_READY) vrbShowOriginalSite();
  }, 8000);
</script>

<script
  src="https://landing.vrbmarketing.com/embed.js"
  data-landing="${id}"
  data-site="YOUR-SITE-DOMAIN-HERE"
  data-height="100%"
  async
  onerror="vrbShowOriginalSite();">
</script>
<!-- VRB LANDING EMBED END -->`
}

export default async function LandingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const landing = LANDINGS[id]
  if (!landing) notFound()

  const snippet = buildSnippet(id)
  const seeLandingHref = `/${id}`

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: '#0a1228' }}
    >
      {/* Background image with stronger dim for readability */}
      <Image
        src="/vrb-landing-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: 'center', opacity: 0.18 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(10,18,40,0.85) 0%, rgba(10,18,40,0.95) 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 md:py-16">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>

          <div className="relative w-10 h-10">
            <Image src="/vrb-landing-logo.png" alt="VRB" fill sizes="40px" className="object-contain" />
          </div>
        </div>

        {/* Title block */}
        <div className="mb-10">
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: '#ff7a30', fontFamily: 'var(--font-inter)' }}
          >
            {landing.name}
          </span>
          <h1
            className="text-4xl md:text-5xl text-white mt-2 mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.04em' }}
          >
            {landing.title.toUpperCase()}
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: '#cbd5e1', fontFamily: 'var(--font-inter)' }}
          >
            {landing.description}
          </p>
        </div>

        {/* See Landing button */}
        <div className="mb-12">
          <a
            href={seeLandingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-md tracking-wider uppercase transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #e85d1c, #ff7a30)',
              color: '#0a1228',
              boxShadow: '0 0 25px rgba(232,93,28,0.45)',
              fontFamily: 'var(--font-inter)',
            }}
          >
            See Landing
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M3.5 12.5l9-9M6 3.5h6.5V10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Embed code snippet */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-2xl text-white"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.06em' }}
            >
              EMBED CODE
            </h2>
            <CopyButton text={snippet} />
          </div>
          <p
            className="text-xs mb-1"
            style={{ color: '#e2e8f0', fontFamily: 'var(--font-inter)', fontWeight: 600 }}
          >
            Do not replace your existing <code style={{ color: '#ff7a30' }}>index.html</code>.
            Add this block right before the closing <code style={{ color: '#ff7a30' }}>&lt;/body&gt;</code> tag in your current file.
          </p>
          <p
            className="text-xs mb-3"
            style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
          >
            Replace <code style={{ color: '#ff7a30' }}>YOUR-SITE-DOMAIN-HERE</code> with your domain (e.g.{' '}
            <code>pph.ag</code>). Your original site stays intact as a fallback — if our landing server is
            unreachable, visitors will see your original site instead of a blank page.
          </p>
          <pre
            className="overflow-x-auto p-5 rounded-lg text-xs leading-relaxed"
            style={{
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#cbd5e1',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }}
          >
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </main>
  )
}
