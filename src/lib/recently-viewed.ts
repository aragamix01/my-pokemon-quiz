// Pokemon detail pages opened recently, newest first (Pokedex "Recently viewed" quick pick)

const KEY = 'pokedex-recent-v1'
const MAX = 40

export function loadRecentlyViewed(): number[] {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(list) ? list.filter((id): id is number => typeof id === 'number') : []
  } catch {
    return []
  }
}

export function markViewed(speciesId: number) {
  try {
    const list = [speciesId, ...loadRecentlyViewed().filter(id => id !== speciesId)].slice(0, MAX)
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // storage blocked: nothing to remember
  }
}
