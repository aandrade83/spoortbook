'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/landings/3/carousel-1.jpg', alt: 'Promo 1' },
  { src: '/landings/3/carousel-2.jpg', alt: 'Promo 2' },
  { src: '/landings/3/carousel-3.jpg', alt: 'Promo 3' },
  { src: '/landings/3/carousel-4.jpg', alt: 'Promo 4' },
]

export default function Carousel3() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,122,24,0.15)',
        boxShadow: '0 0 40px rgba(255,122,24,0.35), 0 0 80px rgba(255,122,24,0.15)',
        aspectRatio: '16/5',
      }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <Image src={slide.src} alt={slide.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      ))}

      {/* Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: i === current ? '#ff7a18' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Prev/Next */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}
        style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff',
          borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer',
          fontSize: '18px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >‹</button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
        style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff',
          borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer',
          fontSize: '18px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >›</button>
    </div>
  )
}
