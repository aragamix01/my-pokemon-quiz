import formsData from '@/data/pokemon-forms.json'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { formatPokemonName } from '@/lib/pokemon-names'

export interface PokemonForm {
  id: number
  speciesId: number
  name: string
  types: string[]
}

const FORMS = (formsData as { forms: PokemonForm[] }).forms

// Forms worth listing even when their types match the base form
const NOTABLE = /-(mega|primal|alola|galar|hisui|paldea)/
// Cosmetic or battle-only copies that only clutter type lists
const SKIP = /-(gmax|totem|.*-cap$|cosplay|rock-star|belle|pop-star|phd|libre|starter|battle-bond)/

const REGIONAL: Record<string, string> = { alola: 'Alolan', galar: 'Galarian', hisui: 'Hisuian', paldea: 'Paldean' }

/** "zacian-crowned" -> "Zacian (Crowned)", "charizard-mega-x" -> "Mega Charizard X", "raichu-alola" -> "Alolan Raichu" */
export function formDisplayName(form: PokemonForm, base: PokemonMetadata): string {
  const species = formatPokemonName(base.species_name)
  const suffix = form.name.indexOf(base.species_name + '-') === 0
    ? form.name.slice(base.species_name.length + 1)
    : form.name
  const words = suffix.split('-')
  const prefix = words.indexOf('mega') !== -1 ? 'mega' : words[0] === 'primal' ? 'primal' : null
  if (prefix) {
    // "mega-x" -> "Mega Charizard X", "original-mega" -> "Mega Magearna (Original)"
    const rest = words.filter(w => w !== prefix)
    const letter = rest.length === 1 && rest[0].length === 1 ? ' ' + rest[0].toUpperCase() : ''
    const note = rest.length && !letter ? ` (${formatPokemonName(rest.join('-'))})` : ''
    return `${prefix === 'mega' ? 'Mega' : 'Primal'} ${species}${letter}${note}`
  }
  if (REGIONAL[words[0]]) {
    const rest = formatPokemonName(words.slice(1).join('-'))
    return `${REGIONAL[words[0]]} ${species}${rest ? ` (${rest})` : ''}`
  }
  return `${species} (${formatPokemonName(suffix)})`
}

/** Alternate forms that differ in type from their species, plus Mega, Primal and regional forms */
export function getTypeForms(byId: Record<number, PokemonMetadata>): PokemonForm[] {
  return FORMS.filter(form => {
    const base = byId[form.speciesId]
    if (!base || SKIP.test(form.name)) return false
    return NOTABLE.test(form.name) || form.types.join('/') !== base.types.join('/')
  })
}
