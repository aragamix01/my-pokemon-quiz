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
  }>
  habitat: {
    name: string
    url: string
  } | null
  capture_rate: number
  base_happiness: number
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
}

export interface EvolutionChainLink {
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