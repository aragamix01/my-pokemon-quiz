import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const OWNER = 'aragamix01'
const REPO = 'my-pokemon-quiz'
const WORKFLOW = 'data-refresh.yml'
const VALID_TARGETS = ['auto', 'all', 'data', 'sprites', 'embeddings']

/** Constant-time compare that never throws on length mismatch. */
function keyMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  const adminKey = process.env.ADMIN_KEY
  const pat = process.env.GITHUB_PAT
  if (!adminKey || !pat) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  let body: { target?: string; force?: boolean; key?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { target = 'auto', force = false, key = '' } = body

  if (!keyMatches(key, adminKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!VALID_TARGETS.includes(target)) {
    return NextResponse.json({ error: `Invalid target: ${target}` }, { status: 400 })
  }

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({ ref: 'main', inputs: { target, force: String(force) } }),
    }
  )

  if (res.status === 204) {
    return NextResponse.json({ ok: true }, { status: 202 })
  }

  const detail = await res.text()
  return NextResponse.json(
    { error: 'Workflow dispatch failed', status: res.status, detail },
    { status: 502 }
  )
}
