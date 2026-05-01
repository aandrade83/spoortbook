import type { NextRequest } from 'next/server'

const VALIDATOR_URL = process.env.SPORTSBOOK_VALIDATOR_URL!
const VALIDATOR_KEY = process.env.SPORTSBOOK_VALIDATOR_API_KEY!

export async function POST(request: NextRequest) {
  // Parse incoming body
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

  // Forward to PHP validator
  // PHP expects: POST JSON body + X-Api-Key header
  try {
    const upstream = await fetch(VALIDATOR_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': VALIDATOR_KEY,
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await upstream.json() as { success?: boolean; reason?: string }

    // PHP returns { success: true } or { success: false, reason: '...' }
    if (data.success === true) {
      return Response.json({ success: true })
    }

    // Surface the reason so the UI can show a meaningful message
    return Response.json({
      success: false,
      reason: data.reason ?? 'invalid_credentials',
    })
  } catch {
    return Response.json(
      { success: false, reason: 'service_unavailable' },
      { status: 503 }
    )
  }
}
