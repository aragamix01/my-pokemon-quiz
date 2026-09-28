'use client'

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useTheme } from '@/lib/theme'

// Recharts SVG props don't reliably resolve CSS custom properties, so mirror
// the theme tokens (globals.css) as literal hex here, one set per theme.
const PALETTES = {
  dark: {
    accent: '#ff5a4e',
    accentLight: '#ffc2bc',
    text: '#f2eee6',
    textSecondary: '#a9acba',
    neutral700: '#3a3d4c',
    neutral800: '#2a2d3a',
  },
  light: {
    accent: '#d8261b',
    accentLight: '#fbe1dd',
    text: '#1a1b22',
    textSecondary: '#5d6070',
    neutral700: '#d6ccba',
    neutral800: '#ebe3d4',
  },
}

interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

interface PokemonStatsChartProps {
  stats: PokemonStat[]
  showTotal?: boolean
}

export default function PokemonStatsChart({ stats, showTotal = true }: PokemonStatsChartProps) {
  const [theme] = useTheme()
  const palette = PALETTES[theme]
  // Calculate dynamic scaling based on highest stat (with minimum of 100 for very weak Pokemon)
  const maxStat = Math.max(...stats.map(stat => stat.base_stat))
  const chartMax = Math.max(maxStat + 20, 100) // Add 20 for padding, minimum 100

  // Format data for radar chart
  const radarData = stats.map(stat => ({
    stat: stat.stat.name
      .replace('-', ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace('Special Attack', 'Sp. Atk')
      .replace('Special Defense', 'Sp. Def'),
    value: stat.base_stat,
    fullName: stat.stat.name.replace('-', ' ')
  }))

  const totalStats = stats.reduce((total, stat) => total + stat.base_stat, 0)

  // Get quality indicator — single-accent rule: only the top tier gets the
  // accent, every other tier is a neutral tag.
  const getQuality = (total: number) => {
    if (total >= 600) return { label: 'Legendary', cls: 'tag-accent' }
    if (total >= 534) return { label: 'Excellent', cls: 'tag-neutral' }
    if (total >= 480) return { label: 'Great', cls: 'tag-neutral' }
    if (total >= 420) return { label: 'Good', cls: 'tag-neutral' }
    if (total >= 360) return { label: 'Average', cls: 'tag-neutral' }
    return { label: 'Below Average', cls: 'tag-neutral' }
  }

  const quality = getQuality(totalStats)

  return (
    <div className="space-y-4">
      {/* Radar Chart */}
      <div>
        <div className="text-center mb-3">
          <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Stats Visualization
          </h4>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Scaled to max stat: {maxStat}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <PolarGrid
              stroke={palette.neutral700}
              strokeWidth={0.8}
              strokeOpacity={0.5}
            />
            <PolarAngleAxis
              dataKey="stat"
              className="text-xs"
              tick={{ fill: palette.text, fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, chartMax]}
              tick={{ fill: palette.textSecondary, fontSize: 8 }}
              tickCount={4}
            />
            <Radar
              name="Stats"
              dataKey="value"
              stroke={palette.accent}
              fill={palette.accent}
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{ fill: palette.accentLight, r: 3, strokeWidth: 1, stroke: palette.accent }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      {showTotal && (
        <div>
          {/* Total Stats Progress */}
          <div className="mb-4">
            <ProgressBar
              value={totalStats}
              max={720}
              label={`Total: ${totalStats}`}
              valueLabel="/720"
              className="mb-2.5"
            />
            <div className="text-center mt-2">
              <span className={`tag ${quality.cls}`}>{quality.label}</span>
            </div>
          </div>

          {/* Individual Stats - Consistent mobile spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <table className="w-full text-xs">
                <tbody>
                  {stats.slice(0, 3).map((stat, index) => (
                    <tr key={index}>
                      <td className="py-1 font-semibold capitalize w-20" style={{ color: 'var(--text-secondary)' }}>
                        {stat.stat.name.replace('-', ' ')}:
                      </td>
                      <td className="py-1 font-bold">{stat.base_stat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <table className="w-full text-xs">
                <tbody>
                  {stats.slice(3, 6).map((stat, index) => (
                    <tr key={index}>
                      <td className="py-1 font-semibold capitalize w-20" style={{ color: 'var(--text-secondary)' }}>
                        {stat.stat.name.replace('-', ' ')}:
                      </td>
                      <td className="py-1 font-bold">{stat.base_stat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
