# 🔥 Type Effectiveness System Usage Guide

Complete Pokemon type effectiveness system with JSON data and TypeScript utilities.

---

## 📁 Files

- **`type-effectiveness.json`** - Complete type data in JSON format
- **`src/lib/type-effectiveness.ts`** - TypeScript utilities and functions
- **`poke-information.md`** - Complete PokeAPI documentation

---

## 🚀 Quick Start

### Basic Usage
```typescript
import { getDamageMultiplier, getTypeColor } from '@/lib/type-effectiveness'

// Check type effectiveness
const multiplier = getDamageMultiplier('fire', 'grass') // Returns 2 (super effective)
const color = getTypeColor('fire') // Returns '#F08030'
```

### Dual-Type Pokemon
```typescript
import { calculateDualTypeMultiplier, analyzePokemonTypes } from '@/lib/type-effectiveness'

// Charizard (Fire/Flying) vs Rock attack
const damage = calculateDualTypeMultiplier('rock', ['fire', 'flying']) // Returns 4 (quadruple damage!)

// Complete type analysis
const analysis = analyzePokemonTypes(['fire', 'flying'])
console.log(analysis.weaknesses) // [{ type: 'rock', multiplier: 4 }, ...]
```

---

## 🔧 Available Functions

### Core Functions

#### `getDamageMultiplier(attackingType, defendingType)`
Get basic type effectiveness multiplier.
```typescript
getDamageMultiplier('water', 'fire')     // 2 (super effective)
getDamageMultiplier('fire', 'water')     // 0.5 (not very effective)
getDamageMultiplier('electric', 'ground') // 0 (no effect)
```

#### `calculateDualTypeMultiplier(attackingType, defendingTypes)`
Calculate effectiveness against dual-type Pokemon.
```typescript
// Skarmory (Steel/Flying) vs Electric
calculateDualTypeMultiplier('electric', ['steel', 'flying']) // 2
// Steel: 1x, Flying: 2x → 1 × 2 = 2

// Charizard (Fire/Flying) vs Rock  
calculateDualTypeMultiplier('rock', ['fire', 'flying']) // 4
// Fire: 2x, Flying: 2x → 2 × 2 = 4
```

#### `analyzePokemonTypes(pokemonTypes)`
Comprehensive type analysis for a Pokemon.
```typescript
const analysis = analyzePokemonTypes(['electric'])

// Returns:
{
  weaknesses: [{ type: 'ground', multiplier: 2 }],
  resistances: [
    { type: 'flying', multiplier: 0.5 },
    { type: 'steel', multiplier: 0.5 },
    { type: 'electric', multiplier: 0.5 }
  ],
  immunities: [],
  offensiveAdvantages: ['flying', 'water'],
  offensiveDisadvantages: ['grass', 'electric', 'dragon']
}
```

### Utility Functions

#### `getBestOffensiveType(defendingTypes)`
Find the most effective attacking type.
```typescript
getBestOffensiveType(['dragon', 'flying'])
// Returns: { type: 'ice', multiplier: 4 }
```

#### `extractPokemonTypes(pokemon)`
Extract types from Pokemon API object.
```typescript
const types = extractPokemonTypes(pikachu)
// Returns: ['electric']
```

#### `getTypeColor(type)`
Get official Pokemon type color.
```typescript
getTypeColor('fire')     // '#F08030'
getTypeColor('water')    // '#6890F0'
getTypeColor('grass')    // '#78C850'
```

---

## 🎨 UI Integration Examples

### Type Badges with Colors
```tsx
import { getTypeColor, extractPokemonTypes } from '@/lib/type-effectiveness'

function TypeBadge({ type }: { type: PokemonTypeName }) {
  return (
    <span 
      className="px-2 py-1 rounded text-white text-xs font-bold uppercase"
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </span>
  )
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const types = extractPokemonTypes(pokemon)
  
  return (
    <div>
      <h3>{pokemon.name}</h3>
      <div className="flex gap-1">
        {types.map(type => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  )
}
```

### Effectiveness Display
```tsx
import { analyzePokemonTypes, formatMultiplier } from '@/lib/type-effectiveness'

function TypeEffectivenessCard({ pokemon }: { pokemon: Pokemon }) {
  const types = extractPokemonTypes(pokemon)
  const analysis = analyzePokemonTypes(types)
  
  return (
    <div className="type-analysis">
      <h4>Type Effectiveness</h4>
      
      {analysis.weaknesses.length > 0 && (
        <div className="weaknesses">
          <h5>Weak To:</h5>
          {analysis.weaknesses.map(({ type, multiplier }) => (
            <span key={type} className="weakness-badge">
              {type} {formatMultiplier(multiplier)}
            </span>
          ))}
        </div>
      )}
      
      {analysis.resistances.length > 0 && (
        <div className="resistances">
          <h5>Resists:</h5>
          {analysis.resistances.map(({ type, multiplier }) => (
            <span key={type} className="resistance-badge">
              {type} {formatMultiplier(multiplier)}
            </span>
          ))}
        </div>
      )}
      
      {analysis.immunities.length > 0 && (
        <div className="immunities">
          <h5>Immune To:</h5>
          {analysis.immunities.map(type => (
            <span key={type} className="immunity-badge">
              {type}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 🎮 Quiz Integration

### Type Effectiveness Hints
```tsx
import { getDamageMultiplier, getEffectivenessDescription } from '@/lib/type-effectiveness'

function QuizHint({ correctPokemon }: { correctPokemon: Pokemon }) {
  const types = extractPokemonTypes(correctPokemon)
  const hintType = 'water' // Example hint type
  const multiplier = calculateDualTypeMultiplier(hintType, types)
  
  return (
    <div className="quiz-hint">
      <p>
        💡 Hint: {hintType.toUpperCase()} moves are{' '}
        <strong>{getEffectivenessDescription(multiplier).toLowerCase()}</strong>{' '}
        against this Pokemon!
      </p>
    </div>
  )
}
```

### Battle Simulator
```tsx
import { calculateDualTypeMultiplier } from '@/lib/type-effectiveness'

function calculateDamage(
  basePower: number,
  attackerType: PokemonTypeName,
  defenderTypes: PokemonTypeName[]
) {
  const typeMultiplier = calculateDualTypeMultiplier(attackerType, defenderTypes)
  return Math.floor(basePower * typeMultiplier)
}

// Example usage
const damage = calculateDamage(90, 'electric', ['flying', 'water'])
// Electric Thunderbolt (90 BP) vs Gyarados (Flying/Water)
// 90 × (2 × 2) = 360 damage!
```

---

## 📊 Data Structure

### JSON Format
```json
{
  "metadata": {
    "version": "1.0",
    "source": "PokeAPI v2",
    "totalTypes": 18
  },
  "types": {
    "fire": {
      "id": 10,
      "name": "fire", 
      "color": "#F08030",
      "damageRelations": {
        "superEffectiveAgainst": ["bug", "steel", "grass", "ice"],
        "notVeryEffectiveAgainst": ["rock", "fire", "water", "dragon"],
        "noEffectAgainst": [],
        "weakTo": ["ground", "rock", "water"],
        "resists": ["bug", "steel", "fire", "grass", "ice", "fairy"],
        "immuneTo": []
      }
    }
  },
  "effectivenessMatrix": {
    "fire": {
      "grass": 2,
      "water": 0.5,
      "rock": 0.5
    }
  }
}
```

### TypeScript Types
```typescript
type PokemonTypeName = 'normal' | 'fighting' | 'flying' | ... // All 18 types
type EffectivenessMultiplier = 0 | 0.25 | 0.5 | 1 | 2 | 4

interface TypeAnalysis {
  weaknesses: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }[]
  resistances: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }[]
  immunities: PokemonTypeName[]
  offensiveAdvantages: PokemonTypeName[]
  offensiveDisadvantages: PokemonTypeName[]
}
```

---

## ⚡ Performance Tips

### Use the Matrix for Speed
```typescript
// Faster - direct matrix lookup
const multiplier = EFFECTIVENESS_MATRIX['fire']['grass'] // 2

// Slower - function call overhead
const multiplier = getDamageMultiplier('fire', 'grass') // 2
```

### Cache Type Analysis
```typescript
// Cache expensive analysis results
const typeAnalysisCache = new Map<string, TypeAnalysis>()

function getCachedAnalysis(types: PokemonTypeName[]): TypeAnalysis {
  const key = types.sort().join(',')
  if (!typeAnalysisCache.has(key)) {
    typeAnalysisCache.set(key, analyzePokemonTypes(types))
  }
  return typeAnalysisCache.get(key)!
}
```

---

## 🏷️ Common Type Combinations

The system includes common dual-type combinations:
```typescript
import { COMMON_DUAL_TYPES } from '@/lib/type-effectiveness'

COMMON_DUAL_TYPES.forEach(([type1, type2]) => {
  console.log(`${type1}/${type2}`)
})
// normal/flying (Pidgey line)
// water/ground (Marshtomp, Swampert)
// grass/poison (Bulbasaur line)
```

---

## 📈 Advanced Usage

### Type Coverage Analysis
```typescript
function analyzeTeamCoverage(team: PokemonTypeName[][]) {
  const coverage = new Set<string>()
  
  team.forEach(pokemonTypes => {
    const analysis = analyzePokemonTypes(pokemonTypes)
    analysis.offensiveAdvantages.forEach(type => coverage.add(type))
  })
  
  return Array.from(coverage)
}

const team = [['fire'], ['water'], ['grass']]
const coverage = analyzeTeamCoverage(team)
// Returns types your team can effectively hit
```

### Weakness Patching
```typescript
function findWeaknessPatch(weakTypes: PokemonTypeName[]): PokemonTypeName[] {
  const resistantTypes: PokemonTypeName[] = []
  
  Object.keys(TYPE_EFFECTIVENESS).forEach(typeName => {
    const type = typeName as PokemonTypeName
    const resists = weakTypes.every(weakType => 
      getDamageMultiplier(weakType, type) <= 1
    )
    
    if (resists) resistantTypes.push(type)
  })
  
  return resistantTypes
}

// Find types that resist your team's weaknesses
const patches = findWeaknessPatch(['rock', 'electric'])
```

This system provides everything needed for comprehensive Pokemon type effectiveness in your applications! 🎮