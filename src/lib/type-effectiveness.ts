/**
 * Pokemon Type Effectiveness System
 * Complete type chart with utilities for damage calculations
 * Data source: PokeAPI v2
 */

import typeEffectivenessData from '../../type-effectiveness.json'

// Type definitions
export type PokemonTypeName = 
  | 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock'
  | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' 
  | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'stellar'

export type EffectivenessMultiplier = 0 | 0.25 | 0.5 | 1 | 2 | 4

export interface TypeEffectiveness {
  id: number
  name: PokemonTypeName
  color: string
  icons?: {
    modern: string
  }
  damageRelations: {
    superEffectiveAgainst: PokemonTypeName[]
    notVeryEffectiveAgainst: PokemonTypeName[]
    noEffectAgainst: PokemonTypeName[]
    weakTo: PokemonTypeName[]
    resists: PokemonTypeName[]
    immuneTo: PokemonTypeName[]
  }
}

export interface TypeAnalysis {
  weaknesses: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }[]
  resistances: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }[]
  immunities: PokemonTypeName[]
  offensiveAdvantages: PokemonTypeName[]
  offensiveDisadvantages: PokemonTypeName[]
}

// Main data export
export const TYPE_EFFECTIVENESS = typeEffectivenessData.types as any as Record<PokemonTypeName, TypeEffectiveness>
export const EFFECTIVENESS_MATRIX = typeEffectivenessData.effectivenessMatrix as Record<PokemonTypeName, Record<PokemonTypeName, EffectivenessMultiplier>>

/**
 * Get damage multiplier between two types
 * @param attackingType - The attacking move's type
 * @param defendingType - The defending Pokemon's type
 * @returns Damage multiplier (0, 0.5, 1, 2)
 */
export function getDamageMultiplier(
  attackingType: PokemonTypeName, 
  defendingType: PokemonTypeName
): EffectivenessMultiplier {
  return EFFECTIVENESS_MATRIX[attackingType][defendingType]
}

/**
 * Calculate damage multiplier for dual-type Pokemon
 * @param attackingType - The attacking move's type  
 * @param defendingTypes - Array of 1-2 defending Pokemon types
 * @returns Combined damage multiplier (0, 0.25, 0.5, 1, 2, 4)
 */
export function calculateDualTypeMultiplier(
  attackingType: PokemonTypeName,
  defendingTypes: PokemonTypeName[]
): EffectivenessMultiplier {
  if (defendingTypes.length === 0) return 1
  if (defendingTypes.length === 1) return getDamageMultiplier(attackingType, defendingTypes[0])
  
  const multiplier1 = getDamageMultiplier(attackingType, defendingTypes[0])
  const multiplier2 = getDamageMultiplier(attackingType, defendingTypes[1])
  
  return (multiplier1 * multiplier2) as EffectivenessMultiplier
}

/**
 * Analyze a Pokemon's type matchups comprehensively
 * @param pokemonTypes - Array of 1-2 Pokemon types
 * @returns Complete type analysis including weaknesses, resistances, etc.
 */
export function analyzePokemonTypes(pokemonTypes: PokemonTypeName[]): TypeAnalysis {
  const weaknesses: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }[] = []
  const resistances: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }[] = []
  const immunities: PokemonTypeName[] = []
  const offensiveAdvantages: PokemonTypeName[] = []
  const offensiveDisadvantages: PokemonTypeName[] = []
  
  // Check defensive matchups for all 18 types
  Object.keys(TYPE_EFFECTIVENESS).forEach(attackingType => {
    const type = attackingType as PokemonTypeName
    const multiplier = calculateDualTypeMultiplier(type, pokemonTypes)
    
    if (multiplier === 0) {
      immunities.push(type)
    } else if (multiplier > 1) {
      weaknesses.push({ type, multiplier })
    } else if (multiplier < 1) {
      resistances.push({ type, multiplier })
    }
  })
  
  // Check offensive advantages (only for single type or shared advantages)
  if (pokemonTypes.length === 1) {
    const typeData = TYPE_EFFECTIVENESS[pokemonTypes[0]]
    offensiveAdvantages.push(...typeData.damageRelations.superEffectiveAgainst)
    offensiveDisadvantages.push(...typeData.damageRelations.notVeryEffectiveAgainst)
  } else {
    // For dual types, find shared offensive advantages
    const type1Data = TYPE_EFFECTIVENESS[pokemonTypes[0]]
    const type2Data = TYPE_EFFECTIVENESS[pokemonTypes[1]]
    
    const sharedAdvantages = type1Data.damageRelations.superEffectiveAgainst
      .filter(type => type2Data.damageRelations.superEffectiveAgainst.includes(type))
    
    offensiveAdvantages.push(...sharedAdvantages)
  }
  
  return {
    weaknesses: weaknesses.sort((a, b) => b.multiplier - a.multiplier),
    resistances: resistances.sort((a, b) => a.multiplier - b.multiplier),
    immunities,
    offensiveAdvantages,
    offensiveDisadvantages
  }
}

/**
 * Get the most effective offensive type against given Pokemon types
 * @param defendingTypes - Array of 1-2 Pokemon types to counter
 * @returns Best offensive type with its effectiveness
 */
export function getBestOffensiveType(
  defendingTypes: PokemonTypeName[]
): { type: PokemonTypeName; multiplier: EffectivenessMultiplier } | null {
  let bestType: PokemonTypeName | null = null
  let bestMultiplier: EffectivenessMultiplier = 0
  
  Object.keys(TYPE_EFFECTIVENESS).forEach(attackingType => {
    const type = attackingType as PokemonTypeName
    const multiplier = calculateDualTypeMultiplier(type, defendingTypes)
    
    if (multiplier > bestMultiplier) {
      bestType = type
      bestMultiplier = multiplier
    }
  })
  
  return bestType ? { type: bestType, multiplier: bestMultiplier } : null
}

/**
 * Get type color for UI styling
 * @param type - Pokemon type name
 * @returns Hex color string
 */
export function getTypeColor(type: PokemonTypeName): string {
  return TYPE_EFFECTIVENESS[type].color
}

/**
 * Get type icon URL (local-first approach)
 * @param type - Pokemon type name
 * @returns Modern icon URL string
 */
export function getTypeIcon(type: PokemonTypeName): string {
  const typeData = TYPE_EFFECTIVENESS[type]
  if (!typeData) return ''
  
  // Try local first, then fallback to GitHub
  return `/sprites/types/${typeData.id}.png`
}

/**
 * Get type icon fallback URLs
 * @param type - Pokemon type name
 * @returns Array of fallback URLs
 */
export function getTypeIconFallbacks(type: PokemonTypeName): string[] {
  const typeData = TYPE_EFFECTIVENESS[type]
  if (!typeData) return []
  
  const fallbacks = [
    `/sprites/types/${typeData.id}.png`, // Local first
    typeData.icons?.modern || '', // GitHub fallback
    '' // Empty fallback
  ].filter(Boolean)
  
  return fallbacks
}

/**
 * Check if type icon is available
 * @param type - Pokemon type name
 * @returns Boolean indicating if icons are available
 */
export function hasTypeIcon(type: PokemonTypeName): boolean {
  return !!TYPE_EFFECTIVENESS[type].icons
}

/**
 * Check if a type combination has any immunities
 * @param pokemonTypes - Array of Pokemon types
 * @returns Array of types this Pokemon is immune to
 */
export function getImmunities(pokemonTypes: PokemonTypeName[]): PokemonTypeName[] {
  const immunities: PokemonTypeName[] = []
  
  Object.keys(TYPE_EFFECTIVENESS).forEach(attackingType => {
    const type = attackingType as PokemonTypeName
    const multiplier = calculateDualTypeMultiplier(type, pokemonTypes)
    
    if (multiplier === 0) {
      immunities.push(type)
    }
  })
  
  return immunities
}

/**
 * Format effectiveness multiplier for display
 * @param multiplier - Damage multiplier value
 * @returns Formatted string representation
 */
export function formatMultiplier(multiplier: EffectivenessMultiplier): string {
  switch (multiplier) {
    case 0: return 'No Effect'
    case 0.25: return '¼× (0.25×)'
    case 0.5: return '½× (0.5×)'
    case 1: return '1×'
    case 2: return '2×'
    case 4: return '4×'
    default: return `${multiplier}×`
  }
}

/**
 * Get effectiveness description for UI
 * @param multiplier - Damage multiplier value
 * @returns Human-readable effectiveness description
 */
export function getEffectivenessDescription(multiplier: EffectivenessMultiplier): string {
  switch (multiplier) {
    case 0: return 'No Effect'
    case 0.25: return 'Barely Effective'
    case 0.5: return 'Not Very Effective'
    case 1: return 'Normal Damage'
    case 2: return 'Super Effective'
    case 4: return 'Extremely Effective'
    default: return 'Unknown'
  }
}

/**
 * Extract Pokemon types from a Pokemon object
 * @param pokemon - Pokemon object with types array
 * @returns Array of type names
 */
export function extractPokemonTypes(pokemon: any): PokemonTypeName[] {
  if (!pokemon?.types) return []
  
  return pokemon.types
    .sort((a: any, b: any) => a.slot - b.slot) // Sort by slot (primary first)
    .map((typeInfo: any) => typeInfo.type.name as PokemonTypeName)
}

// Export commonly used type sets (based on classic physical/special split, but stellar is special)
export const PHYSICAL_TYPES: PokemonTypeName[] = ['normal', 'fighting', 'rock', 'ground', 'flying', 'poison', 'bug', 'ghost', 'steel']
export const SPECIAL_TYPES: PokemonTypeName[] = ['fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'stellar']

// Export generation data
export const TYPE_GENERATIONS = typeEffectivenessData.typesByGeneration

// Export common type combinations
export const COMMON_DUAL_TYPES = [
  ['normal', 'flying'],
  ['water', 'ground'], 
  ['grass', 'poison'],
  ['fire', 'flying'],
  ['electric', 'flying'],
  ['water', 'ice'],
  ['bug', 'flying'],
  ['rock', 'ground']
] as [PokemonTypeName, PokemonTypeName][]