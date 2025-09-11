'use client'

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

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

  // Data for total stats comparison
  const totalData = [
    { name: 'Total Stats', value: totalStats, maxValue: 720 }
  ]

  // Get quality indicator
  const getQuality = (total: number) => {
    if (total >= 600) return { label: 'Legendary', color: '#f39c12' }
    if (total >= 534) return { label: 'Excellent', color: '#27ae60' }
    if (total >= 480) return { label: 'Great', color: '#2980b9' }
    if (total >= 420) return { label: 'Good', color: '#8e44ad' }
    if (total >= 360) return { label: 'Average', color: '#95a5a6' }
    return { label: 'Below Average', color: '#e74c3c' }
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
              stroke="#4a90e2" 
              strokeWidth={0.8}
              strokeOpacity={0.3}
            />
            <PolarAngleAxis 
              dataKey="stat" 
              className="text-xs"
              tick={{ fill: 'var(--text-primary)', fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis 
              angle={90}
              domain={[0, chartMax]}
              tick={{ fill: 'var(--text-secondary)', fontSize: 8 }}
              tickCount={4}
            />
            <Radar
              name="Stats"
              dataKey="value"
              stroke="#e74c3c"
              fill="url(#colorGradient)"
              fillOpacity={0.4}
              strokeWidth={3}
              dot={{ fill: '#f39c12', r: 3, strokeWidth: 1, stroke: '#e74c3c' }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3498db" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      {showTotal && (
        <div>
          {/* Total Stats Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Total: {totalStats}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                /720
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalStats / 720) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              <span 
                className="text-xs px-2 py-1 rounded font-semibold"
                style={{ backgroundColor: quality.color, color: 'white' }}
              >
                {quality.label}
              </span>
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