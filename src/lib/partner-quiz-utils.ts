import quizData from '@/data/partner-quiz-questions.json';
import personalitiesData from '@/data/pokemon-personalities.json';
import pokemonMetadata from '@/data/pokemon-metadata.json';

export interface QuizQuestion {
  id: number;
  question: {
    th: string;
    en: string;
  };
  choices: {
    text: {
      th: string;
      en: string;
    };
    traits: string[];
  }[];
}

export interface QuizAnswer {
  questionId: number;
  choiceIndex: number;
  traits: string[];
}

export interface PokemonPersonality {
  pokemon: string;
  personality: {
    th: string;
    en: string;
  } | string;
  traits: string[];
}

export interface QuizResult {
  pokemon: {
    id: number;
    name: string;
    types: string[];
    sprite_url: string;
  };
  personality: PokemonPersonality;
  matchScore: number;
  dominantTraits: string[];
}

// Get all quiz questions
export function getAllQuestions(): QuizQuestion[] {
  return quizData.questions;
}

// Get random 10 questions from the pool of 30
export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const allQuestions = getAllQuestions();
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Calculate trait scores from quiz answers
export function calculateTraitScores(answers: QuizAnswer[]): Record<string, number> {
  const traitScores: Record<string, number> = {};
  
  answers.forEach(answer => {
    answer.traits.forEach(trait => {
      traitScores[trait] = (traitScores[trait] || 0) + 1;
    });
  });
  
  return traitScores;
}

// Get dominant traits (top scoring traits)
export function getDominantTraits(traitScores: Record<string, number>, count: number = 5): string[] {
  return Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([trait]) => trait);
}

// Match traits to Pokemon types and characteristics
export function matchTraitsToPokemon(traitScores: Record<string, number>, answers: QuizAnswer[]): number {
  const dominantTraits = getDominantTraits(traitScores);
  
  // Create a scoring system for each Pokemon based on traits
  const pokemonScores: Record<number, number> = {};
  
  // FILTER FIRST: Only score Pokemon that have personality data
  const pokemonWithPersonalities = pokemonMetadata.filter(pokemon =>
    personalitiesData.personalities[pokemon.id.toString() as keyof typeof personalitiesData.personalities]
  );
  
  pokemonWithPersonalities.forEach(pokemon => {
    let score = 0;
    
    // Score based on types
    pokemon.types.forEach(type => {
      if (dominantTraits.includes(type)) {
        score += 10;
      }
    });
    
    // Score based on characteristics
    if (dominantTraits.includes('calm') || dominantTraits.includes('peaceful')) {
      if (pokemon.base_happiness >= 70) score += 5;
      if (pokemon.types.includes('psychic') || pokemon.types.includes('grass')) score += 3;
    }
    
    if (dominantTraits.includes('energetic') || dominantTraits.includes('active')) {
      if (pokemon.stats.speed >= 80) score += 5;
      if (pokemon.types.includes('electric') || pokemon.types.includes('fire')) score += 3;
    }
    
    if (dominantTraits.includes('strong') || dominantTraits.includes('powerful')) {
      if (pokemon.stats.attack >= 80 || pokemon.stats['special-attack'] >= 80) score += 5;
      if (pokemon.types.includes('fighting') || pokemon.types.includes('rock')) score += 3;
    }
    
    if (dominantTraits.includes('intelligent') || dominantTraits.includes('wise')) {
      if (pokemon.stats['special-attack'] >= 70) score += 5;
      if (pokemon.types.includes('psychic')) score += 3;
    }
    
    if (dominantTraits.includes('social') || dominantTraits.includes('friendly')) {
      if (pokemon.base_happiness >= 70) score += 5;
      if (pokemon.types.includes('normal') || pokemon.types.includes('fairy')) score += 3;
    }
    
    if (dominantTraits.includes('mysterious') || dominantTraits.includes('dark')) {
      if (pokemon.types.includes('dark') || pokemon.types.includes('ghost')) score += 5;
    }
    
    if (dominantTraits.includes('natural') || dominantTraits.includes('peaceful')) {
      if (pokemon.habitat === 'grassland' || pokemon.habitat === 'forest') score += 3;
      if (pokemon.types.includes('grass')) score += 5;
    }
    
    if (dominantTraits.includes('adaptable') || dominantTraits.includes('flexible')) {
      if (pokemon.types.includes('normal') || pokemon.name === 'eevee') score += 5;
    }
    
    // Bonus for starter Pokemon and popular choices
    const starterIds = [1, 4, 7, 25, 155, 158, 179, 255, 258, 280, 390, 393, 448, 495, 498, 501, 650, 653, 656, 722, 725, 728, 810, 813, 816];
    if (starterIds.includes(pokemon.id)) {
      score += 2;
    }
    
    // All Pokemon in this loop already have personality data, so bonus for all
    score += 3;
    
    pokemonScores[pokemon.id] = score;
  });
  
  // Find the Pokemon with the highest score
  const bestMatch = Object.entries(pokemonScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10) // Get top 10 matches
    .map(([id]) => parseInt(id));
  
  // Create deterministic selection based on quiz data (no more randomness!)
  // This ensures same quiz answers always give same result
  const seed = answers.reduce((acc, answer, index) => {
    return acc + answer.questionId + answer.choiceIndex + (index * 7); // Use question ID, choice, and position
  }, 0);
  
  // Add trait score diversity to seed for more variation
  const traitSeed = Object.values(traitScores).reduce((acc, score) => acc + score, 0);
  const finalSeed = seed + traitSeed;
  
  // Deterministic selection from top 3 matches
  const topThree = Math.min(3, bestMatch.length);
  const deterministic = finalSeed % topThree;
  
  return bestMatch[deterministic] || 25; // Default to Pikachu if no good match
}

// Get quiz result with Pokemon match and personality
export function getQuizResult(answers: QuizAnswer[]): QuizResult {
  const traitScores = calculateTraitScores(answers);
  const dominantTraits = getDominantTraits(traitScores);
  const pokemonId = matchTraitsToPokemon(traitScores, answers);
  
  // Find Pokemon data
  const pokemon = pokemonMetadata.find(p => p.id === pokemonId);
  if (!pokemon) {
    throw new Error(`Pokemon with ID ${pokemonId} not found`);
  }
  
  // Get personality data
  const personalityData = personalitiesData.personalities[pokemonId.toString() as keyof typeof personalitiesData.personalities];
  if (!personalityData) {
    throw new Error(`Personality data for Pokemon ID ${pokemonId} not found`);
  }
  
  // Calculate match score based on trait alignment
  const pokemonTraits = personalityData.traits;
  const matchingTraits = dominantTraits.filter(trait =>
    pokemonTraits.some(pTrait =>
      pTrait.includes(trait) || trait.includes(pTrait)
    )
  );

  // Calculate base match score
  let baseScore = Math.round((matchingTraits.length / Math.max(dominantTraits.length, 1)) * 100);

  // Add bonus points for good matches to make scores more realistic
  if (baseScore > 0) {
    baseScore += 20; // Base bonus for any match

    // Additional bonuses for strong alignment
    if (matchingTraits.length >= 3) baseScore += 15; // Strong match
    if (matchingTraits.length >= 2) baseScore += 10; // Good match

    // Ensure reasonable range (55-95%)
    baseScore = Math.min(baseScore, 95);
    baseScore = Math.max(baseScore, 55);
  } else {
    // If no trait matches, still give a reasonable compatibility
    baseScore = 60 + Math.floor(Math.random() * 20); // 60-79%
  }

  return {
    pokemon: {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      sprite_url: `/sprites/optimized/pokemon-artwork/${pokemon.id}.webp`
    },
    personality: personalityData,
    matchScore: baseScore,
    dominantTraits
  };
}

// Save quiz result to localStorage
export function saveQuizResult(result: QuizResult): void {
  try {
    localStorage.setItem('pokemon-quiz-result', JSON.stringify(result));
  } catch (error) {
    console.error('Failed to save quiz result:', error);
  }
}

// Load quiz result from localStorage
export function loadQuizResult(): QuizResult | null {
  try {
    const saved = localStorage.getItem('pokemon-quiz-result');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load quiz result:', error);
    return null;
  }
}

// Clear saved quiz result
export function clearQuizResult(): void {
  try {
    localStorage.removeItem('pokemon-quiz-result');
  } catch (error) {
    console.error('Failed to clear quiz result:', error);
  }
}