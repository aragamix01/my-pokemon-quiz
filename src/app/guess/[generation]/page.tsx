'use client'

import { use } from 'react'
import PokedleGame from '@/components/games/PokedleGame'

export default function GuessPage({ params }: { params: Promise<{ generation: string }> }) {
  const { generation } = use(params)
  return <PokedleGame genParam={generation} />
}
