'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatClock } from '@/lib/game-utils'
import { msUntilTomorrow } from '@/lib/daily'
import { Button } from '@/components/ui/Button'

interface DailyFooterProps {
  /** Text copied by the Share button */
  shareText: string
  hubHref: string
}

/** Shown under a finished daily puzzle: share the result and count down to the next one */
export default function DailyFooter({ shareText, hubHref }: DailyFooterProps) {
  const [left, setLeft] = useState(msUntilTomorrow())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setLeft(msUntilTomorrow()), 1000)
    return () => clearInterval(timer)
  }, [])

  const share = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked; nothing else to do
    }
  }

  const hours = Math.floor(left / 3600000)
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Next puzzle in <span className="tabular-nums">{hours}:{formatClock(left % 3600000).padStart(5, '0')}</span>
      </p>
      <div className="flex gap-3">
        <Button onClick={share}>{copied ? 'Copied!' : 'Share result'}</Button>
        <Link href={hubHref} className="btn btn-secondary">Daily Challenge</Link>
      </div>
    </div>
  )
}
