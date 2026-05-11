'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Returns the partner site domain (e.g. "cigarcitysportshq.com") that was passed
// via embed.js `data-site` → URL `?site=...`. Persists in sessionStorage so it
// survives client-side route changes. Returns null when not embedded.
export function useEmbedSite(): string | null {
  const sp = useSearchParams()
  const [site, setSite] = useState<string | null>(null)

  useEffect(() => {
    const fromQuery = sp.get('site')
    if (fromQuery) sessionStorage.setItem('ccs_site', fromQuery)
    setSite(sessionStorage.getItem('ccs_site'))
  }, [sp])

  return site
}
