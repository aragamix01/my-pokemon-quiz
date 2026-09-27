// Soft, bright card backgrounds per type (for Pokedex cards), tuned so white text stays readable.
// Different from getTypeColor(), which gives the classic saturated badge colors.

const TYPE_CARD_COLORS: Record<string, string> = {
  normal: '#a8a29a',
  fire: '#fb6c6c',
  water: '#58a8ec',
  electric: '#f2c230',
  grass: '#48d0b0',
  ice: '#6cc9d9',
  fighting: '#d0625a',
  poison: '#a56ccb',
  ground: '#d4a456',
  flying: '#8ba3ee',
  psychic: '#f1789f',
  bug: '#94bf40',
  rock: '#b5a064',
  ghost: '#7b6bb4',
  dragon: '#7866e2',
  dark: '#6f6058',
  steel: '#8fa2b5',
  fairy: '#eb8fcd',
}

const FALLBACK = '#a8a29a'

export function getTypeCardColor(type: string): string {
  return TYPE_CARD_COLORS[type] ?? FALLBACK
}
