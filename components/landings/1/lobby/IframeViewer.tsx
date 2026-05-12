'use client'

import { useEffect, useRef, useState } from 'react'

interface UrlMode {
  url: string
  authUrl?: string
  form?: never
}

interface FormMode {
  url?: never
  authUrl?: never
  form: {
    action: string
    fields: Record<string, string>
  }
}

type IframeViewerProps = (UrlMode | FormMode) & { title: string }

const FRAME_ID = (title: string) => `iframe-${title.toLowerCase()}`

export default function IframeViewer({ title, url, authUrl, form }: IframeViewerProps) {
  const formRef             = useRef<HTMLFormElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [authed, setAuthed] = useState(!authUrl)
  const frameName           = FRAME_ID(title)

  useEffect(() => {
    if (form && formRef.current) {
      formRef.current.submit()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const showSpinner = !authed || !loaded

  return (
    <div className="relative w-full h-full">
      {/* Hidden auth iframe — loads controller.php so the browser stores the casino session cookie */}
      {authUrl && !authed && (
        <iframe
          src={authUrl}
          title={`${title} auth`}
          onLoad={() => setAuthed(true)}
          style={{ display: 'none' }}
        />
      )}

      {/* Hidden form for POST-based login */}
      {form && (
        <form
          ref={formRef}
          action={form.action}
          method="post"
          target={frameName}
          style={{ display: 'none' }}
        >
          {Object.entries(form.fields).map(([name, value]) => (
            <input key={name} name={name} defaultValue={value} readOnly />
          ))}
        </form>
      )}

      {/* Loading spinner — visible while we auth and while the main iframe loads */}
      {showSpinner && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
          style={{ background: '#050810' }}
        >
          <svg className="animate-spin h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#c9a227" strokeWidth="3" />
            <path className="opacity-80" fill="#c9a227" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span
            className="text-sm tracking-widest uppercase"
            style={{ color: '#8892a4', fontFamily: 'var(--font-inter)' }}
          >
            Loading {title}...
          </span>
        </div>
      )}

      {/* Main iframe — mounted only after auth completes (or immediately if no authUrl) */}
      {authed && (
        <iframe
          name={frameName}
          src={url}
          title={title}
          onLoad={() => setLoaded(true)}
          className="w-full h-full border-0"
          allow="payment *; fullscreen *"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}

      {loaded && (
        <a
          href={url ?? form?.action}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-md opacity-40 hover:opacity-80 transition-opacity"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: '#8892a4',
            fontFamily: 'var(--font-inter)',
            backdropFilter: 'blur(8px)',
          }}
        >
          ↗ Open in new tab
        </a>
      )}
    </div>
  )
}
