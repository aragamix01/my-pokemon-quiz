# Pokemon Type Effectiveness System

This comprehensive type effectiveness system provides complete Pokemon type matchup data fetched from PokeAPI and structured for easy use in JavaScript/TypeScript applications.

## 📁 Files Structure

```
src/
├── data/
│   ├── type-effectiveness.ts           # Main TypeScript module with all data
│   └── pokemon-type-effectiveness.json # JSON export for external use
├── lib/
│   └── type-effectiveness.ts           # Utility functions
└── types/
    └── pokemon.ts                      # Updated with type effectiveness interfaces
```

## 📊 Data Overview

- **18 Pokemon Types**: All official types from Normal to Fairy
- **Complete Damage Relations**: Super effective, not very effective, no effect, weaknesses, resistances, immunities
- **Type Colors**: Official Pokemon type colors for UI
- **Effectiveness Matrix**: Pre-calculated lookup table for O(1) access
- **Dual-Type Support**: Full support for Pokemon with two types

## 🚀 Usage Examples

### Basic Type Effectiveness

```typescript
import { getDamageMultiplier, PokemonTypeName } from '@/lib/type-effectiveness';

// Fire vs Grass = 2x damage (super effective)
const multiplier = getDamageMultiplier('fire', 'grass');
console.log(multiplier); // 2

// Water vs Fire = 2x damage (super effective)
const multiplier2 = getDamageMultiplier('water', 'fire');
console.log(multiplier2); // 2

// Normal vs Ghost = 0x damage (no effect)
const multiplier3 = getDamageMultiplier('normal', 'ghost');
console.log(multiplier3); // 0
```

### Dual-Type Pokemon Analysis

```typescript
import { analyzePokemonTypes, Pokemon } from '@/lib/type-effectiveness';

const charizard: Pokemon = {
  // ... pokemon data with types: [fire, flying]
};

const analysis = analyzePokemonTypes(charizard);
console.log(analysis);
/*
{
  types: ['fire', 'flying'],
  weaknesses: {
    fourTimes: ['rock'],      // 4x damage (2x vs fire, 2x vs flying)
    twoTimes: ['electric', 'water']
  },
  resistances: {
    quarterDamage: ['grass'], // 0.25x damage (0.5x vs fire, 0.5x vs flying)
    halfDamage: ['bug', 'steel', 'fairy']
  },
  immunities: ['ground'],     // Flying immunity
  offensiveAdvantages: ['bug', 'steel', 'grass', 'ice', 'fighting']
}
*/
```

### Find Best Counter Types

```typescript
import { getBestOffensiveType } from '@/lib/type-effectiveness';

const dragonite: Pokemon = {
  // ... pokemon data with types: [dragon, flying]
};

const counter = getBestOffensiveType(dragonite);
console.log(counter);
/*
{
  bestTypes: ['ice'],
  multiplier: 4,
  effectiveness: 'Super Effective (4x)'
}
*/
```

### Type Data Access

```typescript
import { TYPE_EFFECTIVENESS, getTypeData } from '@/lib/type-effectiveness';

// Get complete type data
const fireData = getTypeData('fire');
console.log(fireData.color); // '#F08030'
console.log(fireData.damageRelations.superEffectiveAgainst); // ['bug', 'steel', 'grass', 'ice']

// Direct access
const steelType = TYPE_EFFECTIVENESS.steel;
console.log(steelType.damageRelations.resists); // ['normal', 'flying', 'rock', ...]
```

## 🎨 Type Colors

Each type includes its official Pokemon color for UI consistency:

```typescript
const fireColor = TYPE_EFFECTIVENESS.fire.color; // '#F08030'
const waterColor = TYPE_EFFECTIVENESS.water.color; // '#6890F0'
const grassColor = TYPE_EFFECTIVENESS.grass.color; // '#78C850'
```

## 📋 Available Utility Functions

### Core Functions
- `getDamageMultiplier(attacker, defender)` - Get damage multiplier (0, 0.5, 1, 2)
- `calculateDualTypeMultiplier(attacker, [defender1, defender2])` - Calculate vs dual types
- `getTypeData(typeName)` - Get complete type information

### Analysis Functions
- `analyzePokemonTypes(pokemon)` - Complete type analysis
- `getBestOffensiveType(targetPokemon)` - Find best counter type
- `calculateDualTypeWeaknesses(types)` - Get 2x and 4x weaknesses
- `calculateDualTypeResistances(types)` - Get 0.5x and 0.25x resistances
- `calculateDualTypeImmunities(types)` - Get 0x damage types

### Helper Functions
- `extractPokemonTypes(pokemon)` - Extract type names from Pokemon object
- `getEffectivenessText(multiplier)` - Human-readable effectiveness description
- `isMoveEffective(moveType, targetPokemon, threshold)` - Check if move is effective
- `generateTypeChart()` - Generate complete effectiveness chart

## 🔢 Effectiveness Multipliers

```typescript
enum EffectivenessMultiplier {
  NO_EFFECT = 0,           // Ghost immunity, etc.
  NOT_VERY_EFFECTIVE = 0.5, // Resistant types
  NORMAL = 1,              // Normal damage
  SUPER_EFFECTIVE = 2      // Weakness exploitation
}
```

For dual types:
- **4x damage**: Both types weak to the attack (e.g., Rock vs Fire/Flying)
- **2x damage**: One type weak, other neutral (e.g., Water vs Fire/Flying)  
- **1x damage**: Neutral matchup or weakness cancels resistance
- **0.5x damage**: One type resists, other neutral
- **0.25x damage**: Both types resist the attack
- **0x damage**: Any immunity cancels all damage

## 📖 Type Matchup Examples

### Classic Starter Triangle
- Fire > Grass (2x)
- Water > Fire (2x)
- Grass > Water (2x)

### Dual-Type Interactions
- **Charizard (Fire/Flying)**: 4x weak to Rock, immune to Ground
- **Skarmory (Steel/Flying)**: 4x weak to Electric, immune to Ground and Poison
- **Magnezone (Electric/Steel)**: 4x weak to Ground (loses Flying immunity)

## 🎯 Integration with Your Pokemon App

This system is designed to work seamlessly with your existing Pokemon quiz and Pokedex:

```typescript
// In your quiz component
import { analyzePokemonTypes } from '@/lib/type-effectiveness';

// Show type effectiveness hints
const analysis = analyzePokemonTypes(currentPokemon);
const hints = `Weak to: ${analysis.weaknesses.twoTimes.join(', ')}`;

// In your Pokedex component
import { TYPE_EFFECTIVENESS } from '@/lib/type-effectiveness';

// Style type badges with official colors
<span style={{backgroundColor: TYPE_EFFECTIVENESS[typeName].color}}>
  {typeName}
</span>
```

## 📈 Performance

- **O(1) Lookups**: Pre-calculated effectiveness matrix
- **Minimal Bundle Size**: Tree-shakeable imports
- **TypeScript Support**: Full type safety and autocomplete
- **Caching Ready**: Structured for easy caching implementation

## 🌟 Features

✅ Complete 18-type coverage  
✅ Dual-type Pokemon support  
✅ Official type colors  
✅ TypeScript definitions  
✅ Utility functions  
✅ JSON export available  
✅ Performance optimized  
✅ Battle calculation ready  

This comprehensive system provides everything needed for Pokemon type effectiveness calculations in your applications!