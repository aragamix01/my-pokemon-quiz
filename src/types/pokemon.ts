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
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
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