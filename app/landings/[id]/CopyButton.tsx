'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore — older browsers without clipboard API
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all hover:opacity-90"
      style={{
        background: copied ? '#10b981' : 'rgba(255,122,48,0.15)',
        color: copied ? '#0a1228' : '#ff7a30',
        border: '1px solid ' + (copied ? '#10b981' : 'rgba(255,122,48,0.4)'),
        fontFamily: 'var(--font-inter)',
        cursor: 'pointer',
      }}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <rect x="5" y="5" width="9" height="9" rx="1.5" />
            <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H10" strokeLinecap="round" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}
