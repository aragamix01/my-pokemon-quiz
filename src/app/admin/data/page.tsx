'use client'

import { useState, useEffect, useCallback } from 'react'
import manifest from '@/data/data-manifest.json'
import { Card, CardKicker, CardTitle, CardMeta } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import {
  CheckCircle,
  WarningCircle,
  CircleNotch,
  XCircle,
  ArrowSquareOut,
  Question,
} from '@phosphor-icons/react'

const OWNER = 'aragamix01'
const REPO = 'my-pokemon-quiz'
const WORKFLOW = 'data-refresh.yml'
const KEY_STORAGE = 'pokemon-admin-key'
const TARGETS = ['auto', 'all', 'data', 'sprites', 'embeddings']

type DatasetName = 'data' | 'sprites' | 'embeddings'

interface WorkflowRun {
  id: number
  name: string
  status: string
  conclusion: string | null
  created_at: string
  html_url: string
}

function relTime(iso: string | null): string {
  if (!iso) return 'never'
  const then = new Date(iso).getTime()
  const diff = Date.now() - then
  const min = Math.round(diff / 60000)
  if (min < 60) return `${min}m ago`
  const hr = Math.round(min / 60)
  if (hr < 24) return `${hr}h ago`
  return `${Math.round(hr / 24)}d ago`
}

async function fetchSha(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/master`, {
      headers: { Accept: 'application/vnd.github.sha' },
    })
    if (!res.ok) return null
    return (await res.text()).trim()
  } catch {
    return null
  }
}

export default function AdminDataPage() {
  const datasets = manifest.datasets as Record<DatasetName, any>
  const [liveShas, setLiveShas] = useState<Record<string, string | null>>({})
  const [runs, setRuns] = useState<WorkflowRun[]>([])
  const [key, setKey] = useState('')
  const [target, setTarget] = useState('auto')
  const [force, setForce] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)

  useEffect(() => {
    setKey(localStorage.getItem(KEY_STORAGE) || '')
  }, [])

  const loadRuns = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=8`
      )
      if (!res.ok) return
      const data = await res.json()
      setRuns(data.workflow_runs || [])
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const repos = Array.from(
      new Set(Object.values(datasets).map((d: any) => d.upstream.repo))
    ) as string[]
    Promise.all(repos.map(async r => [r, await fetchSha(r)] as const)).then(pairs =>
      setLiveShas(Object.fromEntries(pairs))
    )
    loadRuns()
  }, [datasets, loadRuns])

  const triggerRefresh = async () => {
    setBusy(true)
    setMsg(null)
    try {
      const res = await fetch('/api/refresh-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, force, key }),
      })
      if (res.status === 202) {
        localStorage.setItem(KEY_STORAGE, key)
        setMsg({ text: 'Refresh dispatched. Watch the runs below.', ok: true })
        setTimeout(loadRuns, 5000)
      } else if (res.status === 401) {
        localStorage.removeItem(KEY_STORAGE)
        setMsg({ text: 'Invalid admin key.', ok: false })
      } else {
        const body = await res.json().catch(() => ({}))
        setMsg({ text: `Failed (${res.status}): ${body.error || 'unknown'}`, ok: false })
      }
    } catch (e: any) {
      setMsg({ text: `Request error: ${e.message}`, ok: false })
    } finally {
      setBusy(false)
    }
  }

  const cardDefs: { name: DatasetName; title: string; count: string }[] = [
    {
      name: 'data',
      title: 'Game Data',
      count: `${datasets.data.counts.pokemon} pokemon · ${datasets.data.counts.moves} moves · ${datasets.data.counts.abilities} abilities`,
    },
    {
      name: 'sprites',
      title: 'Sprites',
      count: `${datasets.sprites.file_count} WebP files`,
    },
    {
      name: 'embeddings',
      title: 'AI Embeddings',
      count: `${datasets.embeddings.count} vectors · ${datasets.embeddings.model}`,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1
          className="text-2xl md:text-3xl"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}
        >
          Data Status
        </h1>
        <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
          Upstream freshness and manual refresh for local Pokemon datasets.
        </p>
      </div>

      {/* Dataset freshness cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cardDefs.map(({ name, title, count }) => {
          const ds = datasets[name]
          const stored: string | null = ds.upstream.sha
          const live = liveShas[ds.upstream.repo]
          const known = stored != null && live != null
          const fresh = known && stored === live
          return (
            <Card key={name}>
              <div className="flex items-center justify-between">
                <CardKicker>Dataset</CardKicker>
                {!known ? (
                  <Question size={18} color="var(--color-neutral-500)" />
                ) : fresh ? (
                  <CheckCircle size={18} weight="fill" color="var(--color-accent)" />
                ) : (
                  <WarningCircle size={18} weight="fill" color="var(--error-gradient)" />
                )}
              </div>
              <CardTitle>{title}</CardTitle>
              <div className="text-xs mb-2" style={{ color: 'var(--color-neutral-400)' }}>{count}</div>
              <CardMeta>
                <span>{fresh ? 'Up to date' : known ? 'Update available' : 'Never tracked'}</span>
              </CardMeta>
              <div className="text-[11px] mt-1" style={{ color: 'var(--color-neutral-500)' }}>
                <div>generated {relTime(ds.generated_at)}</div>
                <div>
                  stored {stored ? stored.slice(0, 7) : 'none'} · live {live ? live.slice(0, 7) : '…'}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Refresh panel */}
      <Card className="mb-8">
        <CardTitle>Refresh now</CardTitle>
        <div className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
          Dispatches the GitHub Actions pipeline. Requires the admin key.
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <Input
              type="password"
              placeholder="Admin key"
              value={key}
              onChange={e => setKey(e.target.value)}
            />
          </div>
          <Select value={target} onChange={e => setTarget(e.target.value)} className="sm:w-40">
            {TARGETS.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
          <label className="flex items-center gap-2 text-sm h-11" style={{ color: 'var(--color-neutral-200)' }}>
            <input type="checkbox" checked={force} onChange={e => setForce(e.target.checked)} />
            force
          </label>
          <Button onClick={triggerRefresh} disabled={busy || !key}>
            {busy ? 'Dispatching…' : 'Refresh'}
          </Button>
        </div>
        {msg && (
          <div className="text-xs mt-3" style={{ color: msg.ok ? 'var(--color-accent-300)' : 'var(--error-gradient)' }}>
            {msg.text}
          </div>
        )}
      </Card>

      {/* Recent runs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base" style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}>
            Recent runs
          </h2>
          <a
            href={`https://github.com/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs inline-flex items-center gap-1"
            style={{ color: 'var(--color-accent-300)' }}
          >
            View on GitHub <ArrowSquareOut size={12} />
          </a>
        </div>
        {runs.length === 0 ? (
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>No runs yet.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {runs.map(run => {
              const running = run.status !== 'completed'
              const ok = run.conclusion === 'success'
              return (
                <a
                  key={run.id}
                  href={run.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-md"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-neutral-800)' }}
                >
                  {running ? (
                    <CircleNotch size={16} color="var(--color-accent)" className="animate-spin" />
                  ) : ok ? (
                    <CheckCircle size={16} weight="fill" color="var(--color-accent)" />
                  ) : (
                    <XCircle size={16} weight="fill" color="var(--error-gradient)" />
                  )}
                  <span className="text-sm flex-1" style={{ color: 'var(--color-text)' }}>{run.name}</span>
                  <span className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>
                    {running ? run.status : run.conclusion} · {relTime(run.created_at)}
                  </span>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
