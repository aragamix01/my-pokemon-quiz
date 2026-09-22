'use client'

import { use } from 'react'
import RevealGame from '@/components/games/RevealGame'

export default function DailyRevealPage({ params }: { params: Promise<{ generation: string }> }) {
  const { generation } = use(params)
  return <RevealGame genParam={generation} daily />
}
