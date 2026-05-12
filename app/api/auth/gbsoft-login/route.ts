import { NextRequest, NextResponse } from 'next/server'
import CryptoJS from 'crypto-js'

async function serverPost(url: string, body: unknown, sessionCookie?: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': new URL(url).origin,
      'Referer': new URL(url).origin + '/',
...(sessionCookie ? { Cookie: sessionCookie } : {}),
    },
    body: JSON.stringify(body),
  })
  const setCookie = res.headers.get('set-cookie')
  const data = await res.json()
  return { data, setCookie }
}

export async function POST(req: NextRequest) {
  const { customerId, password, site } = await req.json() as {
    customerId: string
    password: string
    site: string
  }

  if (!customerId || !password || !site) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  const mainSite = `https://${site}/sports`

  try {
    // Step 1: get temporal token (server-to-server, captures Set-Cookie)
    const { data: tokenData, setCookie: sessionCookie } = await serverPost(
      `${mainSite}/Api/Login.asmx/TemporalTokenExternal`,
      { customerId }
    )

    if (tokenData?.d?.Code !== 0 || !tokenData?.d?.Message) {
      return NextResponse.json({ ok: false, error: 'token_failed' })
    }

    const key = tokenData.d.Message as string
    // ck is the ASP.NET session ID — needed for the cookieless session URL trick
    const ck = (tokenData.d.Data as { ck?: string })?.ck ?? ''

    // Step 2: AES-CBC encrypt — key == iv, matching autologin.js exactly
    const encrypted = CryptoJS.AES.encrypt(
      password,
      CryptoJS.enc.Utf8.parse(key),
      {
        keySize: 128 / 8,
        iv: CryptoJS.enc.Utf8.parse(key),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    )
    const encryptedPwd = encrypted.ciphertext.toString(CryptoJS.enc.Base64)

    // Step 3: CustomerSignIn — send session cookie so server finds the token
    const cookieHeader = sessionCookie ? sessionCookie.split(';')[0] : undefined
    const { data: signInData, setCookie: signInCookie } = await serverPost(
      `${mainSite}/Api/Login.asmx/CustomerSignIn`,
      { customerId, password: encryptedPwd, encryptedKey: key, agentId: null },
      cookieHeader
    )
    // Extract the t JWT from the CustomerSignIn Set-Cookie header
    const tMatch = signInCookie?.match(/\bt=([^;]+)/)
    const tJwt = tMatch ? tMatch[1] : undefined

    if (!signInData) {
      return NextResponse.json({ ok: false, error: 'signin_failed' })
    }

    // Agent login — secure token path
    if (typeof signInData === 'string' && signInData.startsWith('AgentLogin:')) {
      return NextResponse.json({ ok: true, agent: true, token: signInData, mainSite })
    }

    // Agent login — classic
    if (signInData.d?.Data === 'Agent login' || signInData === 'Agent login') {
      return NextResponse.json({
        ok: true, agent: true, classic: true,
        cid: customerId, password: password, mainSite,
        agentSite: `https://agent.${site}/admin/autologin`,
      })
    }

    if (signInData.d?.Code && signInData.d.Code !== 0) {
      return NextResponse.json({ ok: false, error: 'invalid_credentials', code: signInData.d.Code, msg: signInData.d.Message })
    }

    // Success
    return NextResponse.json({
      ok: true,
      cid: customerId,
      encryptedPwd,
      key,
      ck,
      tJwt,
      mainSite,
    })
  } catch (err) {
    console.error('[gbsoft-login]', err)
    return NextResponse.json({ ok: false, error: 'server_error' })
  }
}
