// Pokemon Type Effectiveness Data
// Fetched from PokeAPI and structured for easy use in JavaScript applications

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

export type PokemonTypeName = 
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export const TYPE_EFFECTIVENESS: Record<PokemonTypeName, TypeEffectiveness> = {
  normal: {
    id: 1,
    name: 'normal',
    color: '#A8A878',
    damageRelations: {
      superEffectiveAgainst: [],
      notVeryEffectiveAgainst: ['rock', 'steel'],
      noEffectAgainst: ['ghost'],
      weakTo: ['fighting'],
      resists: [],
      immuneTo: ['ghost']
    }
  },
  fighting: {
    id: 2,
    name: 'fighting',
    color: '#C03028',
    damageRelations: {
      superEffectiveAgainst: ['normal', 'rock', 'steel', 'ice', 'dark'],
      notVeryEffectiveAgainst: ['flying', 'poison', 'bug', 'psychic', 'fairy'],
      noEffectAgainst: ['ghost'],
      weakTo: ['flying', 'psychic', 'fairy'],
      resists: ['rock', 'bug', 'dark'],
      immuneTo: []
    }
  },
  flying: {
    id: 3,
    name: 'flying',
    color: '#A890F0',
    damageRelations: {
      superEffectiveAgainst: ['fighting', 'bug', 'grass'],
      notVeryEffectiveAgainst: ['rock', 'steel', 'electric'],
      noEffectAgainst: [],
      weakTo: ['rock', 'electric', 'ice'],
      resists: ['fighting', 'bug', 'grass'],
      immuneTo: ['ground']
    }
  },
  poison: {
    id: 4,
    name: 'poison',
    color: '#A040A0',
    damageRelations: {
      superEffectiveAgainst: ['grass', 'fairy'],
      notVeryEffectiveAgainst: ['poison', 'ground', 'rock', 'ghost'],
      noEffectAgainst: ['steel'],
      weakTo: ['ground', 'psychic'],
      resists: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
      immuneTo: []
    }
  },
  ground: {
    id: 5,
    name: 'ground',
    color: '#E0C068',
    damageRelations: {
      superEffectiveAgainst: ['poison', 'rock', 'steel', 'fire', 'electric'],
      notVeryEffectiveAgainst: ['bug', 'grass'],
      noEffectAgainst: ['flying'],
      weakTo: ['water', 'grass', 'ice'],
      resists: ['poison', 'rock'],
      immuneTo: ['electric']
    }
  },
  rock: {
    id: 6,
    name: 'rock',
    color: '#B8A038',
    damageRelations: {
      superEffectiveAgainst: ['flying', 'bug', 'fire', 'ice'],
      notVeryEffectiveAgainst: ['fighting', 'ground', 'steel'],
      noEffectAgainst: [],
      weakTo: ['fighting', 'ground', 'steel', 'water', 'grass'],
      resists: ['normal', 'flying', 'poison', 'fire'],
      immuneTo: []
    }
  },
  bug: {
    id: 7,
    name: 'bug',
    color: '#A8B820',
    damageRelations: {
      superEffectiveAgainst: ['grass', 'psychic', 'dark'],
      notVeryEffectiveAgainst: ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
      noEffectAgainst: [],
      weakTo: ['flying', 'rock', 'fire'],
      resists: ['fighting', 'ground', 'grass'],
      immuneTo: []
    }
  },
  ghost: {
    id: 8,
    name: 'ghost',
    color: '#705898',
    damageRelations: {
      superEffectiveAgainst: ['ghost', 'psychic'],
      notVeryEffectiveAgainst: ['dark'],
      noEffectAgainst: ['normal'],
      weakTo: ['ghost', 'dark'],
      resists: ['poison', 'bug'],
      immuneTo: ['normal', 'fighting']
    }
  },
  steel: {
    id: 9,
    name: 'steel',
    color: '#B8B8D0',
    damageRelations: {
      superEffectiveAgainst: ['rock', 'ice', 'fairy'],
      notVeryEffectiveAgainst: ['steel', 'fire', 'water', 'electric'],
      noEffectAgainst: [],
      weakTo: ['fighting', 'ground', 'fire'],
      resists: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
      immuneTo: ['poison']
    }
  },
  fire: {
    id: 10,
    name: 'fire',
    color: '#F08030',
    damageRelations: {
      superEffectiveAgainst: ['bug', 'steel', 'grass', 'ice'],
      notVeryEffectiveAgainst: ['rock', 'fire', 'water', 'dragon'],
      noEffectAgainst: [],
      weakTo: ['ground', 'rock', 'water'],
      resists: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
      immuneTo: []
    }
  },
  water: {
    id: 11,
    name: 'water',
    color: '#6890F0',
    damageRelations: {
      superEffectiveAgainst: ['ground', 'rock', 'fire'],
      notVeryEffectiveAgainst: ['water', 'grass', 'dragon'],
      noEffectAgainst: [],
      weakTo: ['grass', 'electric'],
      resists: ['steel', 'fire', 'water', 'ice'],
      immuneTo: []
    }
  },
  grass: {
    id: 12,
    name: 'grass',
    color: '#78C850',
    damageRelations: {
      superEffectiveAgainst: ['ground', 'rock', 'water'],
      notVeryEffectiveAgainst: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
      noEffectAgainst: [],
      weakTo: ['flying', 'poison', 'bug', 'fire', 'ice'],
      resists: ['ground', 'water', 'grass', 'electric'],
      immuneTo: []
    }
  },
  electric: {
    id: 13,
    name: 'electric',
    color: '#F8D030',
    damageRelations: {
      superEffectiveAgainst: ['flying', 'water'],
      notVeryEffectiveAgainst: ['grass', 'electric', 'dragon'],
      noEffectAgainst: ['ground'],
      weakTo: ['ground'],
      resists: ['flying', 'steel', 'electric'],
      immuneTo: []
    }
  },
  psychic: {
    id: 14,
    name: 'psychic',
    color: '#F85888',
    damageRelations: {
      superEffectiveAgainst: ['fighting', 'poison'],
      notVeryEffectiveAgainst: ['steel', 'psychic'],
      noEffectAgainst: ['dark'],
      weakTo: ['bug', 'ghost', 'dark'],
      resists: ['fighting', 'psychic'],
      immuneTo: []
    }
  },
  ice: {
    id: 15,
    name: 'ice',
    color: '#98D8D8',
    damageRelations: {
      superEffectiveAgainst: ['flying', 'ground', 'grass', 'dragon'],
      notVeryEffectiveAgainst: ['steel', 'fire', 'water', 'ice'],
      noEffectAgainst: [],
      weakTo: ['fighting', 'rock', 'steel', 'fire'],
      resists: ['ice'],
      immuneTo: []
    }
  },
  dragon: {
    id: 16,
    name: 'dragon',
    color: '#7038F8',
    damageRelations: {
      superEffectiveAgainst: ['dragon'],
      notVeryEffectiveAgainst: ['steel'],
      noEffectAgainst: ['fairy'],
      weakTo: ['ice', 'dragon', 'fairy'],
      resists: ['fire', 'water', 'grass', 'electric'],
      immuneTo: []
    }
  },
  dark: {
    id: 17,
    name: 'dark',
    color: '#705848',
    damageRelations: {
      superEffectiveAgainst: ['ghost', 'psychic'],
      notVeryEffectiveAgainst: ['fighting', 'dark', 'fairy'],
      noEffectAgainst: [],
      weakTo: ['fighting', 'bug', 'fairy'],
      resists: ['ghost', 'dark'],
      immuneTo: ['psychic']
    }
  },
  fairy: {
    id: 18,
    name: 'fairy',
    color: '#EE99AC',
    damageRelations: {
      superEffectiveAgainst: ['fighting', 'dragon', 'dark'],
      notVeryEffectiveAgainst: ['poison', 'steel', 'fire'],
      noEffectAgainst: [],
      weakTo: ['poison', 'steel'],
      resists: ['fighting', 'bug', 'dark'],
      immuneTo: ['dragon']
    }
  }
};

// Type effectiveness multipliers
export enum EffectivenessMultiplier {
  NO_EFFECT = 0,
  NOT_VERY_EFFECTIVE = 0.5,
  NORMAL = 1,
  SUPER_EFFECTIVE = 2
}

// Create a lookup matrix for quick type effectiveness calculations
export const TYPE_EFFECTIVENESS_MATRIX: Record<PokemonTypeName, Record<PokemonTypeName, EffectivenessMultiplier>> = {} as any;

// Populate the matrix
Object.keys(TYPE_EFFECTIVENESS).forEach(attackingType => {
  const attacker = attackingType as PokemonTypeName;
  TYPE_EFFECTIVENESS_MATRIX[attacker] = {} as Record<PokemonTypeName, EffectivenessMultiplier>;
  
  Object.keys(TYPE_EFFECTIVENESS).forEach(defendingType => {
    const defender = defendingType as PokemonTypeName;
    const attackerData = TYPE_EFFECTIVENESS[attacker];
    
    if (attackerData.damageRelations.noEffectAgainst.includes(defender)) {
      TYPE_EFFECTIVENESS_MATRIX[attacker][defender] = EffectivenessMultiplier.NO_EFFECT;
    } else if (attackerData.damageRelations.superEffectiveAgainst.includes(defender)) {
      TYPE_EFFECTIVENESS_MATRIX[attacker][defender] = EffectivenessMultiplier.SUPER_EFFECTIVE;
    } else if (attackerData.damageRelations.notVeryEffectiveAgainst.includes(defender)) {
      TYPE_EFFECTIVENESS_MATRIX[attacker][defender] = EffectivenessMultiplier.NOT_VERY_EFFECTIVE;
    } else {
      TYPE_EFFECTIVENESS_MATRIX[attacker][defender] = EffectivenessMultiplier.NORMAL;
    }
  });
});

// Export all type names as an array for easy iteration
export const ALL_TYPES: PokemonTypeName[] = Object.keys(TYPE_EFFECTIVENESS) as PokemonTypeName[];