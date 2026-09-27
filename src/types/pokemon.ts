export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
  moves: Array<{
    move: {
      name: string
      url: string
    }
  }>
  sprites: {
    front_default: string | null
    front_shiny: string | null
    other: {
      'official-artwork': {
        front_default: string | null
        front_shiny: string | null
      }
    }
  }
  cries: {
    latest: string | null
    legacy: string | null
  }
  species: {
    name: string
    url: string
  }
}

export interface PokemonSpecies {
  id: number
  name: string
  generation: {
    name: string
    url: string
  }
  evolution_chain: {
    url: string
  }
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
      url: string
    }
    // Game the entry comes from, e.g. "red", "sword"
    version?: {
      name: string
      url: string
    }
  }>
  // Category, e.g. "Flame Pokémon"
  genera?: Array<{
    genus: string
    language: {
      name: string
      url: string
    }
  }>
  habitat: {
    name: string
    url: string
  } | null
  capture_rate: number
  base_happiness: number | null
  varieties: Array<{
    is_default: boolean
    pokemon: {
      name: string
      url: string
    }
  }>
}

export interface QuizQuestion {
  correctPokemon: Pokemon
  options: Pokemon[]
  questionNumber: number
}

export interface Generation {
  id: number
  name: string
  pokemon_species: Array<{
    name: string
    url: string
  }>
}

export type GenerationNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// Type effectiveness related types
export type PokemonTypeName = 
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export interface TypeEffectiveness {
  id: number;
  name: string;
  color: string;
  damageRelations: {
    superEffectiveAgainst: string[];
    notVeryEffectiveAgainst: string[];
    noEffectAgainst: string[];
    weakTo: string[];
    resists: string[];
    immuneTo: string[];
  };
}

export enum EffectivenessMultiplier {
  NO_EFFECT = 0,
  NOT_VERY_EFFECTIVE = 0.5,
  NORMAL = 1,
  SUPER_EFFECTIVE = 2
}

export interface EvolutionDetail {
  trigger: {
    name: string
    url: string
  }
  min_level: number | null
  min_happiness: number | null
  time_of_day: string
  item: {
    name: string
    url: string
  } | null
  known_move: {
    name: string
    url: string
  } | null
  location: {
    name: string
    url: string
  } | null
  // Extra conditions PokeAPI sends; optional because older cached data may lack them
  gender?: number | null
  held_item?: NamedRef | null
  known_move_type?: NamedRef | null
  min_beauty?: number | null
  min_affection?: number | null
  near_special_rock?: boolean
  needs_multiplayer?: boolean
  needs_overworld_rain?: boolean
  party_species?: NamedRef | null
  party_type?: NamedRef | null
  relative_physical_stats?: number | null
  trade_species?: NamedRef | null
  turn_upside_down?: boolean
  region?: NamedRef | null
  /** Form that evolves, e.g. meowth-galar (default form when it is the plain species) */
  required_pokemon_form?: NamedRef | null
  /** Form it evolves into, e.g. raichu-alola; null for the default form */
  evolved_pokemon_form?: NamedRef | null
  used_move?: NamedRef | null
  min_move_count?: number | null
  min_steps?: number | null
  min_damage_taken?: number | null
}

interface NamedRef {
  name: string
  url: string
}

export interface EvolutionChainLink {
  is_baby?: boolean
  species: {
    name: string
    url: string
  }
  evolution_details: EvolutionDetail[]
  evolves_to: EvolutionChainLink[]
}

export interface EvolutionChain {
  id: number
  chain: EvolutionChainLink
}