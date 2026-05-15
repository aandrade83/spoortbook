'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// Persists embed flags client-side so they survive in-app navigation.
// We deliberately do NOT auto-resize the iframe from here: the Hero uses
// viewport-based heights (280vh) that would feed back into an unbounded
// resize loop. The iframe stays at its fixed height (set by the partner via
// embed.js `data-height`) and scrolls internally — like any standard embed.
function Bridge() {
  const sp = useSearchParams()

  useEffect(() => {
    const fromQuery = sp.get('embed') === '1'
    if (fromQuery) {
      sessionStorage.setItem('ccs_embed', '1')
      // Signal the parent frame that the landing has mounted and rendered
      window.parent.postMessage({ type: 'ccs:ready' }, '*')
    }

    const site = sp.get('site')
    if (site) sessionStorage.setItem('ccs_site', site)
  }, [sp])

  return null
}

export default function EmbedBridge() {
  return (
    <Suspense fallback={null}>
      <Bridge />
    </Suspense>
  )
}
