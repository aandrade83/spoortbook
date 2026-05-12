import type { NextRequest } from 'next/server'

const CASINO_BASE = process.env.CASINO_BASE_URL!.replace(/\/$/, '')

export async function POST(request: NextRequest) {
  let username: string
  let password: string
  try {
    const body = await request.json() as { username?: unknown; password?: unknown }
    username = String(body.username ?? '').trim()
    password = String(body.password ?? '')
  } catch {
    return Response.json({ success: false, reason: 'bad_request' }, { status: 400 })
  }

  if (!username || !password) {
    return Response.json({ success: false, reason: 'missing_credentials' }, { status: 400 })
  }

  const params = new URLSearchParams({
    ac:       'l_ext',
    s:        'bitbet.com',
    player:   username,
    password: password,
  })

  const authUrl = `${CASINO_BASE}/control/modules/login/controller.php?${params}`
  const url     = `${CASINO_BASE}/`

  return Response.json({ success: true, authUrl, url })
}
