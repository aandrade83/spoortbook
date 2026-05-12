import type { NextRequest } from "next/server";

const CASHIER_FRONTEND = process.env.CASHIER_FRONTEND_URL!.replace(/\/$/, "");
const CASHIER_URL = `${CASHIER_FRONTEND}/api/auth/external-login`;
const CASHIER_KEY = process.env.CASHIER_API_KEY!;

export async function POST(request: NextRequest) {
  let username: string;
  let password: string;
  try {
    const body = (await request.json()) as {
      username?: unknown;
      password?: unknown;
    };
    username = String(body.username ?? "").trim();
    password = String(body.password ?? "");
  } catch {
    return Response.json(
      { success: false, reason: "bad_request" },
      { status: 400 },
    );
  }

  if (!username || !password) {
    return Response.json(
      { success: false, reason: "missing_credentials" },
      { status: 400 },
    );
  }

  let upstreamStatus: number;
  let rawText: string;
  try {
    const upstream = await fetch(CASHIER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CASHIER_KEY,
      },
      body: JSON.stringify({
        site: "cigarcitysportshq.com",
        username,
        password,
      }),
    });
    upstreamStatus = upstream.status;
    rawText = await upstream.text();
  } catch (err) {
    console.error("[cashier] fetch failed:", err);
    return Response.json(
      { success: false, reason: "service_unavailable" },
      { status: 503 },
    );
  }

  let data: { url?: string };
  try {
    data = JSON.parse(rawText);
  } catch {
    console.error("[cashier] non-JSON response:", rawText);
    return Response.json(
      { success: false, reason: "bad_upstream_response" },
      { status: 502 },
    );
  }

  if (!data.url) {
    return Response.json(
      { success: false, reason: "no_url", upstream: data },
      { status: 502 },
    );
  }

  let finalUrl: string;
  try {
    const u = new URL(data.url);
    finalUrl = `${CASHIER_FRONTEND}${u.pathname}${u.search}${u.hash}`;
  } catch {
    return Response.json(
      { success: false, reason: "bad_upstream_url", upstream: data },
      { status: 502 },
    );
  }

  return Response.json({ success: true, url: finalUrl });
}
