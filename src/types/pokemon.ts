export interface Pokemon {
  id: number
  name: string
  types: Array<{
    slot: number
    type: {
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