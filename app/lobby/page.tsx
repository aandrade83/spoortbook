'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/lobby/Header'
import LoginForm from '@/components/lobby/LoginForm'
import Lobby from '@/components/lobby/Lobby'
import IframeViewer from '@/components/lobby/IframeViewer'

type Section = 'lobby' | 'cashier' | 'casino' | 'sportsbook'

interface AuthState {
  username: string
  password: string
}

type SectionData =
  | { type: 'url';  url: string }
  | { type: 'form'; action: string; fields: Record<string, string> }


export default function LobbyPage() {
  const [auth, setAuth]                   = useState<AuthState | null>(null)
  const [ready, setReady]                 = useState(false)
  const [activeSection, setActiveSection] = useState<Section>('lobby')
  const [sections, setSections]           = useState<Partial<Record<'cashier'|'casino'|'sportsbook', SectionData>>>({})
  const [loadingSection, setLoadingSection] = useState<'cashier'|'casino'|'sportsbook' | null>(null)
  const [sectionError, setSectionError]   = useState<string | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('lobbyUser')
    const pass  = sessionStorage.getItem('lobbyPass')
    if (saved) {
      setAuth({ username: saved, password: pass ?? '' })
      sessionStorage.removeItem('lobbyUser')
      sessionStorage.removeItem('lobbyPass')
    }
    setReady(true)
  }, [])

  function handleLoginSuccess(username: string, password: string) {
    setAuth({ username, password })
  }

  function handleLogout() {
    setAuth(null)
    setActiveSection('lobby')
    setSections({})
  }

  function handleBack() {
    setActiveSection('lobby')
    setSectionError(null)
  }

  async function handleNavigate(section: 'cashier' | 'casino' | 'sportsbook') {
    if (!auth) return

    // If already loaded, just switch to it
    if (sections[section]) {
      setActiveSection(section)
      return
    }

    setSectionError(null)
    setLoadingSection(section)

    try {
      let data: SectionData

      if (section === 'cashier') {
        const res  = await fetch('/api/cashier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: auth.username, password: auth.password }),
        })
        const json = await res.json() as { success: boolean; url?: string; reason?: string }
        if (!json.success || !json.url) throw new Error(json.reason ?? 'cashier_error')
        data = { type: 'url', url: json.url }

      } else if (section === 'casino') {
        const res  = await fetch('/api/casino', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: auth.username, password: auth.password }),
        })
        const json = await res.json() as { success: boolean; url?: string }
        if (!json.success || !json.url) throw new Error('casino_error')
        data = { type: 'url', url: json.url }

      } else {
        data = {
          type:   'form',
          action: 'https://wager.bitbet.com/redirectlogin.php',
          fields: {
            username:     auth.username,
            password:     auth.password,
            multiaccount: '1',
          },
        }
      }

      setSections(prev => ({ ...prev, [section]: data }))
      setActiveSection(section)
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown'
      setSectionError(
        reason === 'invalid_credentials'
          ? 'Session expired. Please log in again.'
          : 'Could not load section. Please try again.'
      )
    } finally {
      setLoadingSection(null)
    }
  }

  if (!ready) return null

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(0,102,255,0.12) 0%, transparent 70%), #050810',
      }}
    >
      <Header
        username={auth?.username ?? null}
        activeSection={activeSection}
        onBack={handleBack}
        onLogout={handleLogout}
      />

      {/* Login */}
      {auth === null && (
        <main className="flex-1 flex items-center justify-center py-16 px-4 overflow-y-auto">
          <LoginForm onSuccess={handleLoginSuccess} />
        </main>
      )}

      {/* Authenticated shell */}
      {auth !== null && (
        <div className="flex-1 relative overflow-hidden">

          {/* Lobby grid */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center py-16 px-4 overflow-y-auto transition-opacity duration-300"
            style={{
              opacity:       activeSection === 'lobby' ? 1 : 0,
              pointerEvents: activeSection === 'lobby' ? 'auto' : 'none',
            }}
          >
            {sectionError && (
              <p
                className="text-sm text-center px-3 py-2 rounded-lg mb-6"
                style={{
                  color:      '#ff4d4d',
                  background: 'rgba(255,77,77,0.1)',
                  border:     '1px solid rgba(255,77,77,0.2)',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {sectionError}
              </p>
            )}
            <Lobby
              username={auth.username}
              loadingSection={loadingSection}
              onNavigate={handleNavigate}
            />
          </div>

          {/* Section iframes — persist in DOM once loaded, toggled via CSS */}
          {(['cashier', 'casino', 'sportsbook'] as const).map(section => {
            const data = sections[section]
            if (!data) return null
            return (
              <div
                key={section}
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity:       activeSection === section ? 1 : 0,
                  pointerEvents: activeSection === section ? 'auto' : 'none',
                }}
              >
                {data.type === 'url'
                  ? <IframeViewer url={data.url} title={section.toUpperCase()} />
                  : <IframeViewer form={{ action: data.action, fields: data.fields }} title={section.toUpperCase()} />
                }
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
