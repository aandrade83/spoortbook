'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function useIsEmbedded(): boolean {
  const sp = useSearchParams()
  const [embedded, setEmbedded] = useState(false)

  useEffect(() => {
    const fromQuery   = sp.get('embed') === '1'
    const fromStorage = sessionStorage.getItem('ccs_embed') === '1'
    if (fromQuery) sessionStorage.setItem('ccs_embed', '1')
    setEmbedded(fromQuery || fromStorage)
  }, [sp])

  return embedded
}
