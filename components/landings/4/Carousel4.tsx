'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/landings/4/nba1.jpg', alt: 'NBA' },
  { src: '/landings/4/base1.jpg', alt: 'Baseball' },
  { src: '/landings/4/base2.jpg', alt: 'Baseball 2' },
  { src: '/landings/4/nhl1.jpg', alt: 'NHL' },
  { src: '/landings/4/casino.jpg', alt: 'Casino' },
  { src: '/landings/4/horses.jpg', alt: 'Horse Racing' },
]

const SLIDES_MOBILE = [
  { src: '/landings/4/nba1-m.jpg', alt: 'NBA' },
  { src: '/landings/4/base1-m.jpg', alt: 'Baseball' },
  { src: '/landings/4/base2-m.jpg', alt: 'Baseball 2' },
  { src: '/landings/4/nhl1-m.jpg', alt: 'NHL' },
  { src: '/landings/4/casino.jpg', alt: 'Casino' },
  { src: '/landings/4/horses.jpg', alt: 'Horse Racing' },
]

function CarouselInner({ slides, height }: { slides: typeof SLIDES; height: number }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        borderRadius: '12px',
        border: '1px solid #ff0000',
        overflow: 'hidden',
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="920px"
            style={{ objectFit: 'cover' }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Previous"
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Next"
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              background: i === current ? '#ff0000' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Carousel4() {
  return (
    <>
      {/* Desktop */}
      <div style={{ display: 'none' }} className="carousel4-desktop">
        <CarouselInner slides={SLIDES} height={300} />
      </div>
      {/* Mobile */}
      <div style={{ display: 'none' }} className="carousel4-mobile">
        <CarouselInner slides={SLIDES_MOBILE} height={200} />
      </div>
      <style>{`
        @media (min-width: 768px) {
          .carousel4-desktop { display: block !important; }
          .carousel4-mobile  { display: none   !important; }
        }
        @media (max-width: 767px) {
          .carousel4-desktop { display: none  !important; }
          .carousel4-mobile  { display: block !important; }
        }
      `}</style>
    </>
  )
}
