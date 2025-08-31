/**
 * Complete Pokemon Abilities Database
 * Auto-generated from PokeAPI v2
 * Contains all 367 Pokemon abilities with comprehensive data
 */

export interface AbilityPokemon {
  name: string
  url: string
  isHidden: boolean
  slot: number
}

export interface AbilityData {
  id: number
  name: string
  isMainSeries: boolean
  generation: string
  effect: string
  shortEffect: string
  flavorText: string
  pokemon: AbilityPokemon[]
}

// Complete Pokemon abilities database - 367 abilities
export const ABILITIES_DATABASE: Record<string, AbilityData> = {
  "stench": {
    "id": 1,
    "name": "stench",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's damaging moves have a 10% chance to make the target flinch with each hit if they do not already cause flinching as a secondary effect.\n\nThis ability does not stack with a held item.\n\nOverworld: The wild encounter rate is halved while this Pokémon is first in the party.",
    "shortEffect": "Has a 10% chance of making target Pokémon flinch with each hit.",
    "flavorText": "Helps repel wild POKéMON.",
    "pokemon": [
      {
        "name": "gloom",
        "url": "https://pokeapi.co/api/v2/pokemon/44/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grimer",
        "url": "https://pokeapi.co/api/v2/pokemon/88/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "muk",
        "url": "https://pokeapi.co/api/v2/pokemon/89/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "koffing",
        "url": "https://pokeapi.co/api/v2/pokemon/109/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "weezing",
        "url": "https://pokeapi.co/api/v2/pokemon/110/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "stunky",
        "url": "https://pokeapi.co/api/v2/pokemon/434/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skuntank",
        "url": "https://pokeapi.co/api/v2/pokemon/435/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "trubbish",
        "url": "https://pokeapi.co/api/v2/pokemon/568/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "garbodor",
        "url": "https://pokeapi.co/api/v2/pokemon/569/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "garbodor-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10207/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "inner-focus": {
    "id": 39,
    "name": "inner-focus",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot flinch.",
    "shortEffect": "Prevents flinching.",
    "flavorText": "Prevents flinching.",
    "pokemon": [
      {
        "name": "zubat",
        "url": "https://pokeapi.co/api/v2/pokemon/41/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "golbat",
        "url": "https://pokeapi.co/api/v2/pokemon/42/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "abra",
        "url": "https://pokeapi.co/api/v2/pokemon/63/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kadabra",
        "url": "https://pokeapi.co/api/v2/pokemon/64/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "alakazam",
        "url": "https://pokeapi.co/api/v2/pokemon/65/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "farfetchd",
        "url": "https://pokeapi.co/api/v2/pokemon/83/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drowzee",
        "url": "https://pokeapi.co/api/v2/pokemon/96/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hypno",
        "url": "https://pokeapi.co/api/v2/pokemon/97/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hitmonchan",
        "url": "https://pokeapi.co/api/v2/pokemon/107/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kangaskhan",
        "url": "https://pokeapi.co/api/v2/pokemon/115/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dragonite",
        "url": "https://pokeapi.co/api/v2/pokemon/149/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "crobat",
        "url": "https://pokeapi.co/api/v2/pokemon/169/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "umbreon",
        "url": "https://pokeapi.co/api/v2/pokemon/197/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "girafarig",
        "url": "https://pokeapi.co/api/v2/pokemon/203/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sneasel",
        "url": "https://pokeapi.co/api/v2/pokemon/215/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raikou",
        "url": "https://pokeapi.co/api/v2/pokemon/243/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "entei",
        "url": "https://pokeapi.co/api/v2/pokemon/244/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "suicune",
        "url": "https://pokeapi.co/api/v2/pokemon/245/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "snorunt",
        "url": "https://pokeapi.co/api/v2/pokemon/361/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "glalie",
        "url": "https://pokeapi.co/api/v2/pokemon/362/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "riolu",
        "url": "https://pokeapi.co/api/v2/pokemon/447/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lucario",
        "url": "https://pokeapi.co/api/v2/pokemon/448/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "throh",
        "url": "https://pokeapi.co/api/v2/pokemon/538/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sawk",
        "url": "https://pokeapi.co/api/v2/pokemon/539/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "darumaka",
        "url": "https://pokeapi.co/api/v2/pokemon/554/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mienfoo",
        "url": "https://pokeapi.co/api/v2/pokemon/619/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mienshao",
        "url": "https://pokeapi.co/api/v2/pokemon/620/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pawniard",
        "url": "https://pokeapi.co/api/v2/pokemon/624/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bisharp",
        "url": "https://pokeapi.co/api/v2/pokemon/625/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mudbray",
        "url": "https://pokeapi.co/api/v2/pokemon/749/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mudsdale",
        "url": "https://pokeapi.co/api/v2/pokemon/750/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oranguru",
        "url": "https://pokeapi.co/api/v2/pokemon/765/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "indeedee-male",
        "url": "https://pokeapi.co/api/v2/pokemon/876/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kubfu",
        "url": "https://pokeapi.co/api/v2/pokemon/891/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "annihilape",
        "url": "https://pokeapi.co/api/v2/pokemon/979/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gallade-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10068/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "darumaka-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10176/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sneasel-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10235/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "effect-spore": {
    "id": 27,
    "name": "effect-spore",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being paralyzed, poisoned, or put to sleep, chosen at random.\n\nNothing is done to compensate if the move's user is immune to one of these ailments; there is simply a lower chance that the move's user will be affected.",
    "shortEffect": "Has a 30% chance of inflcting either paralysis, poison, or sleep on attacking Pokémon on contact.",
    "flavorText": "Leaves spores on contact.",
    "pokemon": [
      {
        "name": "vileplume",
        "url": "https://pokeapi.co/api/v2/pokemon/45/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "paras",
        "url": "https://pokeapi.co/api/v2/pokemon/46/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "parasect",
        "url": "https://pokeapi.co/api/v2/pokemon/47/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shroomish",
        "url": "https://pokeapi.co/api/v2/pokemon/285/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "breloom",
        "url": "https://pokeapi.co/api/v2/pokemon/286/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "foongus",
        "url": "https://pokeapi.co/api/v2/pokemon/590/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "amoonguss",
        "url": "https://pokeapi.co/api/v2/pokemon/591/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "morelull",
        "url": "https://pokeapi.co/api/v2/pokemon/755/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shiinotic",
        "url": "https://pokeapi.co/api/v2/pokemon/756/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gossifleur",
        "url": "https://pokeapi.co/api/v2/pokemon/829/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "eldegoss",
        "url": "https://pokeapi.co/api/v2/pokemon/830/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "speed-boost": {
    "id": 3,
    "name": "speed-boost",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's Speed rises one stage after each turn.",
    "shortEffect": "Raises Speed one stage after each turn.",
    "flavorText": "Gradually boosts SPEED.",
    "pokemon": [
      {
        "name": "yanma",
        "url": "https://pokeapi.co/api/v2/pokemon/193/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "torchic",
        "url": "https://pokeapi.co/api/v2/pokemon/255/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "combusken",
        "url": "https://pokeapi.co/api/v2/pokemon/256/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "blaziken",
        "url": "https://pokeapi.co/api/v2/pokemon/257/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ninjask",
        "url": "https://pokeapi.co/api/v2/pokemon/291/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "carvanha",
        "url": "https://pokeapi.co/api/v2/pokemon/318/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sharpedo",
        "url": "https://pokeapi.co/api/v2/pokemon/319/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "yanmega",
        "url": "https://pokeapi.co/api/v2/pokemon/469/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venipede",
        "url": "https://pokeapi.co/api/v2/pokemon/543/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "whirlipede",
        "url": "https://pokeapi.co/api/v2/pokemon/544/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "scolipede",
        "url": "https://pokeapi.co/api/v2/pokemon/545/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "flittle",
        "url": "https://pokeapi.co/api/v2/pokemon/955/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "espathra",
        "url": "https://pokeapi.co/api/v2/pokemon/956/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "blaziken-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10050/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "flame-body": {
    "id": 49,
    "name": "flame-body",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being burned.\n\nOverworld: If any Pokémon in the party has this ability, each egg in the party has its hatch counter decreased by 2 (rather than 1) each step cycle, making eggs hatch roughly twice as quickly.  This effect does not stack if multiple Pokémon have this ability or magma armor.",
    "shortEffect": "Has a 30% chance of burning attacking Pokémon on contact.",
    "flavorText": "Burns the foe on contact.",
    "pokemon": [
      {
        "name": "ponyta",
        "url": "https://pokeapi.co/api/v2/pokemon/77/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rapidash",
        "url": "https://pokeapi.co/api/v2/pokemon/78/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "magmar",
        "url": "https://pokeapi.co/api/v2/pokemon/126/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "moltres",
        "url": "https://pokeapi.co/api/v2/pokemon/146/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "slugma",
        "url": "https://pokeapi.co/api/v2/pokemon/218/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "magcargo",
        "url": "https://pokeapi.co/api/v2/pokemon/219/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "magby",
        "url": "https://pokeapi.co/api/v2/pokemon/240/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "magmortar",
        "url": "https://pokeapi.co/api/v2/pokemon/467/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "heatran",
        "url": "https://pokeapi.co/api/v2/pokemon/485/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "litwick",
        "url": "https://pokeapi.co/api/v2/pokemon/607/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lampent",
        "url": "https://pokeapi.co/api/v2/pokemon/608/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "chandelure",
        "url": "https://pokeapi.co/api/v2/pokemon/609/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "larvesta",
        "url": "https://pokeapi.co/api/v2/pokemon/636/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "volcarona",
        "url": "https://pokeapi.co/api/v2/pokemon/637/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fletchinder",
        "url": "https://pokeapi.co/api/v2/pokemon/662/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "talonflame",
        "url": "https://pokeapi.co/api/v2/pokemon/663/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "carkol",
        "url": "https://pokeapi.co/api/v2/pokemon/838/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "coalossal",
        "url": "https://pokeapi.co/api/v2/pokemon/839/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sizzlipede",
        "url": "https://pokeapi.co/api/v2/pokemon/850/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "centiskorch",
        "url": "https://pokeapi.co/api/v2/pokemon/851/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "charcadet",
        "url": "https://pokeapi.co/api/v2/pokemon/935/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "coalossal-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10215/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "centiskorch-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10220/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "water-veil": {
    "id": 41,
    "name": "water-veil",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be burned.\n\nIf a Pokémon is burned and acquires this ability, its burn is healed; this includes when regaining a lost ability upon leaving battle.",
    "shortEffect": "Prevents burns.",
    "flavorText": "Prevents burns.",
    "pokemon": [
      {
        "name": "goldeen",
        "url": "https://pokeapi.co/api/v2/pokemon/118/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "seaking",
        "url": "https://pokeapi.co/api/v2/pokemon/119/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mantine",
        "url": "https://pokeapi.co/api/v2/pokemon/226/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wailmer",
        "url": "https://pokeapi.co/api/v2/pokemon/320/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wailord",
        "url": "https://pokeapi.co/api/v2/pokemon/321/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "huntail",
        "url": "https://pokeapi.co/api/v2/pokemon/367/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "buizel",
        "url": "https://pokeapi.co/api/v2/pokemon/418/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "floatzel",
        "url": "https://pokeapi.co/api/v2/pokemon/419/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "finneon",
        "url": "https://pokeapi.co/api/v2/pokemon/456/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lumineon",
        "url": "https://pokeapi.co/api/v2/pokemon/457/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mantyke",
        "url": "https://pokeapi.co/api/v2/pokemon/458/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "finizen",
        "url": "https://pokeapi.co/api/v2/pokemon/963/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "finizen",
        "url": "https://pokeapi.co/api/v2/pokemon/963/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dondozo",
        "url": "https://pokeapi.co/api/v2/pokemon/977/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "static": {
    "id": 9,
    "name": "static",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being paralyzed.\n\nPokémon that are immune to electric-type moves can still be paralyzed by this ability.\n\nOverworld: If the lead Pokémon has this ability, there is a 50% chance that encounters will be with an electric Pokémon, if applicable.",
    "shortEffect": "Has a 30% chance of paralyzing attacking Pokémon on contact.",
    "flavorText": "Paralyzes on contact.",
    "pokemon": [
      {
        "name": "pikachu",
        "url": "https://pokeapi.co/api/v2/pokemon/25/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raichu",
        "url": "https://pokeapi.co/api/v2/pokemon/26/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "voltorb",
        "url": "https://pokeapi.co/api/v2/pokemon/100/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "electrode",
        "url": "https://pokeapi.co/api/v2/pokemon/101/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "electabuzz",
        "url": "https://pokeapi.co/api/v2/pokemon/125/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zapdos",
        "url": "https://pokeapi.co/api/v2/pokemon/145/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pichu",
        "url": "https://pokeapi.co/api/v2/pokemon/172/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mareep",
        "url": "https://pokeapi.co/api/v2/pokemon/179/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flaaffy",
        "url": "https://pokeapi.co/api/v2/pokemon/180/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ampharos",
        "url": "https://pokeapi.co/api/v2/pokemon/181/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "elekid",
        "url": "https://pokeapi.co/api/v2/pokemon/239/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "electrike",
        "url": "https://pokeapi.co/api/v2/pokemon/309/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "manectric",
        "url": "https://pokeapi.co/api/v2/pokemon/310/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "emolga",
        "url": "https://pokeapi.co/api/v2/pokemon/587/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "stunfisk",
        "url": "https://pokeapi.co/api/v2/pokemon/618/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toxel",
        "url": "https://pokeapi.co/api/v2/pokemon/848/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "arctozolt",
        "url": "https://pokeapi.co/api/v2/pokemon/881/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pawmi",
        "url": "https://pokeapi.co/api/v2/pokemon/921/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tadbulb",
        "url": "https://pokeapi.co/api/v2/pokemon/938/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bellibolt",
        "url": "https://pokeapi.co/api/v2/pokemon/939/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pikachu-rock-star",
        "url": "https://pokeapi.co/api/v2/pokemon/10080/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-belle",
        "url": "https://pokeapi.co/api/v2/pokemon/10081/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-pop-star",
        "url": "https://pokeapi.co/api/v2/pokemon/10082/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-phd",
        "url": "https://pokeapi.co/api/v2/pokemon/10083/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-libre",
        "url": "https://pokeapi.co/api/v2/pokemon/10084/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-cosplay",
        "url": "https://pokeapi.co/api/v2/pokemon/10085/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-original-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10094/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-hoenn-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10095/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-sinnoh-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10096/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-unova-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10097/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-kalos-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10098/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-alola-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10099/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-partner-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10148/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-starter",
        "url": "https://pokeapi.co/api/v2/pokemon/10158/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-world-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10160/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10199/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "voltorb-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10231/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "electrode-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10232/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "limber": {
    "id": 7,
    "name": "limber",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be paralyzed.\n\nIf a Pokémon is paralyzed and acquires this ability, its paralysis is healed; this includes when regaining a lost ability upon leaving battle.",
    "shortEffect": "Prevents paralysis.",
    "flavorText": "Prevents paralysis.",
    "pokemon": [
      {
        "name": "persian",
        "url": "https://pokeapi.co/api/v2/pokemon/53/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hitmonlee",
        "url": "https://pokeapi.co/api/v2/pokemon/106/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ditto",
        "url": "https://pokeapi.co/api/v2/pokemon/132/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "buneary",
        "url": "https://pokeapi.co/api/v2/pokemon/427/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lopunny",
        "url": "https://pokeapi.co/api/v2/pokemon/428/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "glameow",
        "url": "https://pokeapi.co/api/v2/pokemon/431/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "purrloin",
        "url": "https://pokeapi.co/api/v2/pokemon/509/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "liepard",
        "url": "https://pokeapi.co/api/v2/pokemon/510/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "stunfisk",
        "url": "https://pokeapi.co/api/v2/pokemon/618/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hawlucha",
        "url": "https://pokeapi.co/api/v2/pokemon/701/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mareanie",
        "url": "https://pokeapi.co/api/v2/pokemon/747/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxapex",
        "url": "https://pokeapi.co/api/v2/pokemon/748/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "clobbopus",
        "url": "https://pokeapi.co/api/v2/pokemon/852/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grapploct",
        "url": "https://pokeapi.co/api/v2/pokemon/853/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "swift-swim": {
    "id": 33,
    "name": "swift-swim",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's Speed is doubled during rain.\n\nThis bonus does not count as a stat modifier.",
    "shortEffect": "Doubles Speed during rain.",
    "flavorText": "Raises SPEED in rain.",
    "pokemon": [
      {
        "name": "psyduck",
        "url": "https://pokeapi.co/api/v2/pokemon/54/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golduck",
        "url": "https://pokeapi.co/api/v2/pokemon/55/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "poliwag",
        "url": "https://pokeapi.co/api/v2/pokemon/60/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "poliwhirl",
        "url": "https://pokeapi.co/api/v2/pokemon/61/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "poliwrath",
        "url": "https://pokeapi.co/api/v2/pokemon/62/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "horsea",
        "url": "https://pokeapi.co/api/v2/pokemon/116/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "goldeen",
        "url": "https://pokeapi.co/api/v2/pokemon/118/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "seaking",
        "url": "https://pokeapi.co/api/v2/pokemon/119/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "magikarp",
        "url": "https://pokeapi.co/api/v2/pokemon/129/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "omanyte",
        "url": "https://pokeapi.co/api/v2/pokemon/138/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "omastar",
        "url": "https://pokeapi.co/api/v2/pokemon/139/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kabuto",
        "url": "https://pokeapi.co/api/v2/pokemon/140/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kabutops",
        "url": "https://pokeapi.co/api/v2/pokemon/141/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "qwilfish",
        "url": "https://pokeapi.co/api/v2/pokemon/211/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mantine",
        "url": "https://pokeapi.co/api/v2/pokemon/226/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kingdra",
        "url": "https://pokeapi.co/api/v2/pokemon/230/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lotad",
        "url": "https://pokeapi.co/api/v2/pokemon/270/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lombre",
        "url": "https://pokeapi.co/api/v2/pokemon/271/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ludicolo",
        "url": "https://pokeapi.co/api/v2/pokemon/272/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "surskit",
        "url": "https://pokeapi.co/api/v2/pokemon/283/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "anorith",
        "url": "https://pokeapi.co/api/v2/pokemon/347/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "armaldo",
        "url": "https://pokeapi.co/api/v2/pokemon/348/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "feebas",
        "url": "https://pokeapi.co/api/v2/pokemon/349/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "huntail",
        "url": "https://pokeapi.co/api/v2/pokemon/367/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gorebyss",
        "url": "https://pokeapi.co/api/v2/pokemon/368/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "relicanth",
        "url": "https://pokeapi.co/api/v2/pokemon/369/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "luvdisc",
        "url": "https://pokeapi.co/api/v2/pokemon/370/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "buizel",
        "url": "https://pokeapi.co/api/v2/pokemon/418/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "floatzel",
        "url": "https://pokeapi.co/api/v2/pokemon/419/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "finneon",
        "url": "https://pokeapi.co/api/v2/pokemon/456/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lumineon",
        "url": "https://pokeapi.co/api/v2/pokemon/457/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mantyke",
        "url": "https://pokeapi.co/api/v2/pokemon/458/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tympole",
        "url": "https://pokeapi.co/api/v2/pokemon/535/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "palpitoad",
        "url": "https://pokeapi.co/api/v2/pokemon/536/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "seismitoad",
        "url": "https://pokeapi.co/api/v2/pokemon/537/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tirtouga",
        "url": "https://pokeapi.co/api/v2/pokemon/564/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "carracosta",
        "url": "https://pokeapi.co/api/v2/pokemon/565/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "beartic",
        "url": "https://pokeapi.co/api/v2/pokemon/614/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "chewtle",
        "url": "https://pokeapi.co/api/v2/pokemon/833/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drednaw",
        "url": "https://pokeapi.co/api/v2/pokemon/834/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arrokuda",
        "url": "https://pokeapi.co/api/v2/pokemon/846/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "barraskewda",
        "url": "https://pokeapi.co/api/v2/pokemon/847/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "basculegion-male",
        "url": "https://pokeapi.co/api/v2/pokemon/902/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "overqwil",
        "url": "https://pokeapi.co/api/v2/pokemon/904/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "swampert-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10064/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drednaw-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10214/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "qwilfish-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10234/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "basculegion-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10248/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "insomnia": {
    "id": 15,
    "name": "insomnia",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be asleep.\n\nThis causes rest to fail altogether.  If a Pokémon is asleep and acquires this ability, it will immediately wake up; this includes when regaining a lost ability upon leaving battle.\n\nThis ability functions identically to vital spirit in battle.",
    "shortEffect": "Prevents sleep.",
    "flavorText": "Prevents sleep.",
    "pokemon": [
      {
        "name": "drowzee",
        "url": "https://pokeapi.co/api/v2/pokemon/96/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hypno",
        "url": "https://pokeapi.co/api/v2/pokemon/97/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hoothoot",
        "url": "https://pokeapi.co/api/v2/pokemon/163/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "noctowl",
        "url": "https://pokeapi.co/api/v2/pokemon/164/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spinarak",
        "url": "https://pokeapi.co/api/v2/pokemon/167/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ariados",
        "url": "https://pokeapi.co/api/v2/pokemon/168/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "murkrow",
        "url": "https://pokeapi.co/api/v2/pokemon/198/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "delibird",
        "url": "https://pokeapi.co/api/v2/pokemon/225/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shuppet",
        "url": "https://pokeapi.co/api/v2/pokemon/353/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "banette",
        "url": "https://pokeapi.co/api/v2/pokemon/354/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "honchkrow",
        "url": "https://pokeapi.co/api/v2/pokemon/430/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pumpkaboo-average",
        "url": "https://pokeapi.co/api/v2/pokemon/710/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gourgeist-average",
        "url": "https://pokeapi.co/api/v2/pokemon/711/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tarountula",
        "url": "https://pokeapi.co/api/v2/pokemon/917/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spidops",
        "url": "https://pokeapi.co/api/v2/pokemon/918/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "capsakid",
        "url": "https://pokeapi.co/api/v2/pokemon/951/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "scovillain",
        "url": "https://pokeapi.co/api/v2/pokemon/952/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pumpkaboo-small",
        "url": "https://pokeapi.co/api/v2/pokemon/10027/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pumpkaboo-large",
        "url": "https://pokeapi.co/api/v2/pokemon/10028/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pumpkaboo-super",
        "url": "https://pokeapi.co/api/v2/pokemon/10029/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gourgeist-small",
        "url": "https://pokeapi.co/api/v2/pokemon/10030/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gourgeist-large",
        "url": "https://pokeapi.co/api/v2/pokemon/10031/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gourgeist-super",
        "url": "https://pokeapi.co/api/v2/pokemon/10032/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mewtwo-mega-y",
        "url": "https://pokeapi.co/api/v2/pokemon/10044/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "serene-grace": {
    "id": 32,
    "name": "serene-grace",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's moves have twice their usual effect chance.\n\nAn effect chance is a move's chance to inflict a status ailment, cause a stat change, or make the target flinch in addition to the move's main effect.  For example, flamethrower's chance of burning the target is doubled, but protect's chance of success and air cutter's increased critical hit rate are unaffected.\n\nsecret power is unaffected.",
    "shortEffect": "Doubles the chance of moves' extra effects occurring.",
    "flavorText": "Promotes added effects.",
    "pokemon": [
      {
        "name": "chansey",
        "url": "https://pokeapi.co/api/v2/pokemon/113/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "togepi",
        "url": "https://pokeapi.co/api/v2/pokemon/175/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "togetic",
        "url": "https://pokeapi.co/api/v2/pokemon/176/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dunsparce",
        "url": "https://pokeapi.co/api/v2/pokemon/206/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blissey",
        "url": "https://pokeapi.co/api/v2/pokemon/242/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "jirachi",
        "url": "https://pokeapi.co/api/v2/pokemon/385/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "happiny",
        "url": "https://pokeapi.co/api/v2/pokemon/440/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "togekiss",
        "url": "https://pokeapi.co/api/v2/pokemon/468/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "deerling",
        "url": "https://pokeapi.co/api/v2/pokemon/585/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sawsbuck",
        "url": "https://pokeapi.co/api/v2/pokemon/586/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meloetta-aria",
        "url": "https://pokeapi.co/api/v2/pokemon/648/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dudunsparce-two-segment",
        "url": "https://pokeapi.co/api/v2/pokemon/982/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shaymin-sky",
        "url": "https://pokeapi.co/api/v2/pokemon/10006/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meloetta-pirouette",
        "url": "https://pokeapi.co/api/v2/pokemon/10018/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dudunsparce-three-segment",
        "url": "https://pokeapi.co/api/v2/pokemon/10255/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "cloud-nine": {
    "id": 13,
    "name": "cloud-nine",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "While this Pokémon is in battle, weather can still be in play, but will not have any of its effects.\n\nThis ability functions identically to air lock.",
    "shortEffect": "Negates all effects of weather, but does not prevent the weather itself.",
    "flavorText": "Negates weather effects.",
    "pokemon": [
      {
        "name": "psyduck",
        "url": "https://pokeapi.co/api/v2/pokemon/54/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "golduck",
        "url": "https://pokeapi.co/api/v2/pokemon/55/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lickitung",
        "url": "https://pokeapi.co/api/v2/pokemon/108/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swablu",
        "url": "https://pokeapi.co/api/v2/pokemon/333/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "altaria",
        "url": "https://pokeapi.co/api/v2/pokemon/334/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lickilicky",
        "url": "https://pokeapi.co/api/v2/pokemon/463/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drampa",
        "url": "https://pokeapi.co/api/v2/pokemon/780/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "water-absorb": {
    "id": 11,
    "name": "water-absorb",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a water-type move hits this Pokémon, it heals for 1/4 of its maximum HP, negating any other effect on it.\n\nWater moves will ignore this Pokémon's substitute.",
    "shortEffect": "Absorbs water moves, healing for 1/4 max HP.",
    "flavorText": "Restores HP if hit by a\nWater-type move.",
    "pokemon": [
      {
        "name": "poliwag",
        "url": "https://pokeapi.co/api/v2/pokemon/60/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "poliwhirl",
        "url": "https://pokeapi.co/api/v2/pokemon/61/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "poliwrath",
        "url": "https://pokeapi.co/api/v2/pokemon/62/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lapras",
        "url": "https://pokeapi.co/api/v2/pokemon/131/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vaporeon",
        "url": "https://pokeapi.co/api/v2/pokemon/134/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chinchou",
        "url": "https://pokeapi.co/api/v2/pokemon/170/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lanturn",
        "url": "https://pokeapi.co/api/v2/pokemon/171/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "politoed",
        "url": "https://pokeapi.co/api/v2/pokemon/186/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wooper",
        "url": "https://pokeapi.co/api/v2/pokemon/194/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "quagsire",
        "url": "https://pokeapi.co/api/v2/pokemon/195/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mantine",
        "url": "https://pokeapi.co/api/v2/pokemon/226/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "cacnea",
        "url": "https://pokeapi.co/api/v2/pokemon/331/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cacturne",
        "url": "https://pokeapi.co/api/v2/pokemon/332/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mantyke",
        "url": "https://pokeapi.co/api/v2/pokemon/458/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tympole",
        "url": "https://pokeapi.co/api/v2/pokemon/535/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "palpitoad",
        "url": "https://pokeapi.co/api/v2/pokemon/536/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "seismitoad",
        "url": "https://pokeapi.co/api/v2/pokemon/537/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "maractus",
        "url": "https://pokeapi.co/api/v2/pokemon/556/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "frillish",
        "url": "https://pokeapi.co/api/v2/pokemon/592/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "jellicent",
        "url": "https://pokeapi.co/api/v2/pokemon/593/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "volcanion",
        "url": "https://pokeapi.co/api/v2/pokemon/721/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dewpider",
        "url": "https://pokeapi.co/api/v2/pokemon/751/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "araquanid",
        "url": "https://pokeapi.co/api/v2/pokemon/752/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dracovish",
        "url": "https://pokeapi.co/api/v2/pokemon/882/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "arctovish",
        "url": "https://pokeapi.co/api/v2/pokemon/883/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "clodsire",
        "url": "https://pokeapi.co/api/v2/pokemon/980/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "araquanid-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10153/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lapras-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10204/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wooper-paldea",
        "url": "https://pokeapi.co/api/v2/pokemon/10253/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ogerpon-wellspring-mask",
        "url": "https://pokeapi.co/api/v2/pokemon/10273/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "volt-absorb": {
    "id": 10,
    "name": "volt-absorb",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever an electric-type move hits this Pokémon, it heals for 1/4 of its maximum HP, negating any other effect on it.\n\nThis ability will not take effect if this Pokémon is ground-type and thus immune to Electric moves.  Electric moves will ignore this Pokémon's substitute.\n\nThis effect includes non-damaging moves, i.e. thunder wave.",
    "shortEffect": "Absorbs electric moves, healing for 1/4 max HP.",
    "flavorText": "Turns electricity into HP.",
    "pokemon": [
      {
        "name": "jolteon",
        "url": "https://pokeapi.co/api/v2/pokemon/135/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chinchou",
        "url": "https://pokeapi.co/api/v2/pokemon/170/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lanturn",
        "url": "https://pokeapi.co/api/v2/pokemon/171/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minun",
        "url": "https://pokeapi.co/api/v2/pokemon/312/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pachirisu",
        "url": "https://pokeapi.co/api/v2/pokemon/417/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "zeraora",
        "url": "https://pokeapi.co/api/v2/pokemon/807/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dracozolt",
        "url": "https://pokeapi.co/api/v2/pokemon/880/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "arctozolt",
        "url": "https://pokeapi.co/api/v2/pokemon/881/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pawmo",
        "url": "https://pokeapi.co/api/v2/pokemon/922/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pawmot",
        "url": "https://pokeapi.co/api/v2/pokemon/923/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wattrel",
        "url": "https://pokeapi.co/api/v2/pokemon/940/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kilowattrel",
        "url": "https://pokeapi.co/api/v2/pokemon/941/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "thundurus-therian",
        "url": "https://pokeapi.co/api/v2/pokemon/10020/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "drizzle": {
    "id": 2,
    "name": "drizzle",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "The weather changes to rain when this Pokémon enters battle and does not end unless replaced by another weather condition.\n\nIf multiple Pokémon with this ability, drought, sand stream, or snow warning are sent out at the same time, the abilities will activate in order of Speed, respecting trick room.  Each ability's weather will cancel the previous weather, and only the weather summoned by the slowest of the Pokémon will stay.",
    "shortEffect": "Summons rain that lasts indefinitely upon entering battle.",
    "flavorText": "Summons rain in battle.",
    "pokemon": [
      {
        "name": "politoed",
        "url": "https://pokeapi.co/api/v2/pokemon/186/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pelipper",
        "url": "https://pokeapi.co/api/v2/pokemon/279/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kyogre",
        "url": "https://pokeapi.co/api/v2/pokemon/382/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sand-veil": {
    "id": 8,
    "name": "sand-veil",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "During a sandstorm, this Pokémon has 1.25× its evasion, and it does not take sandstorm damage regardless of type.\n\nThe evasion bonus does not count as a stat modifier.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is halved in a sandstorm.",
    "shortEffect": "Increases evasion to 1.25× during a sandstorm.  Protects against sandstorm damage.",
    "flavorText": "Ups evasion in a sandstorm.",
    "pokemon": [
      {
        "name": "sandshrew",
        "url": "https://pokeapi.co/api/v2/pokemon/27/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandslash",
        "url": "https://pokeapi.co/api/v2/pokemon/28/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "diglett",
        "url": "https://pokeapi.co/api/v2/pokemon/50/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dugtrio",
        "url": "https://pokeapi.co/api/v2/pokemon/51/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "geodude",
        "url": "https://pokeapi.co/api/v2/pokemon/74/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "graveler",
        "url": "https://pokeapi.co/api/v2/pokemon/75/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golem",
        "url": "https://pokeapi.co/api/v2/pokemon/76/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gligar",
        "url": "https://pokeapi.co/api/v2/pokemon/207/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "phanpy",
        "url": "https://pokeapi.co/api/v2/pokemon/231/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "donphan",
        "url": "https://pokeapi.co/api/v2/pokemon/232/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "larvitar",
        "url": "https://pokeapi.co/api/v2/pokemon/246/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cacnea",
        "url": "https://pokeapi.co/api/v2/pokemon/331/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cacturne",
        "url": "https://pokeapi.co/api/v2/pokemon/332/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gible",
        "url": "https://pokeapi.co/api/v2/pokemon/443/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gabite",
        "url": "https://pokeapi.co/api/v2/pokemon/444/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "garchomp",
        "url": "https://pokeapi.co/api/v2/pokemon/445/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gliscor",
        "url": "https://pokeapi.co/api/v2/pokemon/472/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "stunfisk",
        "url": "https://pokeapi.co/api/v2/pokemon/618/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "helioptile",
        "url": "https://pokeapi.co/api/v2/pokemon/694/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "heliolisk",
        "url": "https://pokeapi.co/api/v2/pokemon/695/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sandygast",
        "url": "https://pokeapi.co/api/v2/pokemon/769/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "palossand",
        "url": "https://pokeapi.co/api/v2/pokemon/770/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "silicobra",
        "url": "https://pokeapi.co/api/v2/pokemon/843/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sandaconda",
        "url": "https://pokeapi.co/api/v2/pokemon/844/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wiglett",
        "url": "https://pokeapi.co/api/v2/pokemon/960/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wugtrio",
        "url": "https://pokeapi.co/api/v2/pokemon/961/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "orthworm",
        "url": "https://pokeapi.co/api/v2/pokemon/968/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "diglett-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10105/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dugtrio-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10106/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandaconda-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10218/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "battle-armor": {
    "id": 4,
    "name": "battle-armor",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Moves cannot score critical hits against this Pokémon.\n\nThis ability functions identically to shell armor.",
    "shortEffect": "Protects against critical hits.",
    "flavorText": "Blocks critical hits.",
    "pokemon": [
      {
        "name": "cubone",
        "url": "https://pokeapi.co/api/v2/pokemon/104/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "marowak",
        "url": "https://pokeapi.co/api/v2/pokemon/105/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kabuto",
        "url": "https://pokeapi.co/api/v2/pokemon/140/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kabutops",
        "url": "https://pokeapi.co/api/v2/pokemon/141/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "anorith",
        "url": "https://pokeapi.co/api/v2/pokemon/347/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "armaldo",
        "url": "https://pokeapi.co/api/v2/pokemon/348/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skorupi",
        "url": "https://pokeapi.co/api/v2/pokemon/451/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drapion",
        "url": "https://pokeapi.co/api/v2/pokemon/452/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "type-null",
        "url": "https://pokeapi.co/api/v2/pokemon/772/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "perrserker",
        "url": "https://pokeapi.co/api/v2/pokemon/863/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "falinks",
        "url": "https://pokeapi.co/api/v2/pokemon/870/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "soundproof": {
    "id": 43,
    "name": "soundproof",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon is immune to moves flagged as being sound-based.\n\nheal bell is unaffected.  uproar still prevents this Pokémon from sleeping.  This Pokémon can still receive a Perish Song counter through baton pass, and will retain a Perish Song counter if it acquires this ability after Perish Song is used.\n\nhowl, roar of time, sonic boom, and yawn are not flagged as sound-based.",
    "shortEffect": "Protects against sound-based moves.",
    "flavorText": "Avoids sound-based moves.",
    "pokemon": [
      {
        "name": "voltorb",
        "url": "https://pokeapi.co/api/v2/pokemon/100/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "electrode",
        "url": "https://pokeapi.co/api/v2/pokemon/101/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mr-mime",
        "url": "https://pokeapi.co/api/v2/pokemon/122/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "whismur",
        "url": "https://pokeapi.co/api/v2/pokemon/293/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "loudred",
        "url": "https://pokeapi.co/api/v2/pokemon/294/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "exploud",
        "url": "https://pokeapi.co/api/v2/pokemon/295/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shieldon",
        "url": "https://pokeapi.co/api/v2/pokemon/410/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bastiodon",
        "url": "https://pokeapi.co/api/v2/pokemon/411/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mime-jr",
        "url": "https://pokeapi.co/api/v2/pokemon/439/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "snover",
        "url": "https://pokeapi.co/api/v2/pokemon/459/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "abomasnow",
        "url": "https://pokeapi.co/api/v2/pokemon/460/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bouffalant",
        "url": "https://pokeapi.co/api/v2/pokemon/626/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "jangmo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/782/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hakamo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/783/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kommo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/784/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kommo-o-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10146/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "voltorb-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10231/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "electrode-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10232/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "shield-dust": {
    "id": 19,
    "name": "shield-dust",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon is immune to the extra effects of moves used against it.\n\nAn extra effect is a move's chance, listed as an \"effect chance\", to inflict a status ailment, cause a stat change, or make the target flinch in addition to the move's main effect.  For example, thunder shock's paralysis is an extra effect, but thunder wave's is not, nor are knock off's item removal and air cutter's increased critical hit rate.",
    "shortEffect": "Protects against incoming moves' extra effects.",
    "flavorText": "Prevents added effects.",
    "pokemon": [
      {
        "name": "caterpie",
        "url": "https://pokeapi.co/api/v2/pokemon/10/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "weedle",
        "url": "https://pokeapi.co/api/v2/pokemon/13/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venomoth",
        "url": "https://pokeapi.co/api/v2/pokemon/49/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wurmple",
        "url": "https://pokeapi.co/api/v2/pokemon/265/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dustox",
        "url": "https://pokeapi.co/api/v2/pokemon/269/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scatterbug",
        "url": "https://pokeapi.co/api/v2/pokemon/664/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vivillon",
        "url": "https://pokeapi.co/api/v2/pokemon/666/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cutiefly",
        "url": "https://pokeapi.co/api/v2/pokemon/742/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ribombee",
        "url": "https://pokeapi.co/api/v2/pokemon/743/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "snom",
        "url": "https://pokeapi.co/api/v2/pokemon/872/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "frosmoth",
        "url": "https://pokeapi.co/api/v2/pokemon/873/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ribombee-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10150/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "wonder-guard": {
    "id": 25,
    "name": "wonder-guard",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon is immune to damaging moves that are not super effective against it.\n\nMoves that inflict fixed damage, such as night shade or seismic toss, are considered super effective if their types are.  Damage not directly dealt by moves, such as damage from weather, a status ailment, or spikes, is not prevented.\n\nThis ability cannot be copied with role play or traded away with skill swap, but it can be copied with trace, disabled with gastro acid, or changed with worry seed.  This Pokémon can still use Role Play itself to lose this ability, but not Skill Swap.\n\nIf this Pokémon has a substitute, this ability will block moves as usual and any moves not blocked will react to the Substitute as usual.",
    "shortEffect": "Protects against damaging moves that are not super effective.",
    "flavorText": "“Super effective” hits.",
    "pokemon": [
      {
        "name": "shedinja",
        "url": "https://pokeapi.co/api/v2/pokemon/292/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "poison-point": {
    "id": 38,
    "name": "poison-point",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being poisoned.",
    "shortEffect": "Has a 30% chance of poisoning attacking Pokémon on contact.",
    "flavorText": "Poisons foe on contact.",
    "pokemon": [
      {
        "name": "nidoran-f",
        "url": "https://pokeapi.co/api/v2/pokemon/29/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nidorina",
        "url": "https://pokeapi.co/api/v2/pokemon/30/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nidoqueen",
        "url": "https://pokeapi.co/api/v2/pokemon/31/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nidoran-m",
        "url": "https://pokeapi.co/api/v2/pokemon/32/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nidorino",
        "url": "https://pokeapi.co/api/v2/pokemon/33/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nidoking",
        "url": "https://pokeapi.co/api/v2/pokemon/34/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "seadra",
        "url": "https://pokeapi.co/api/v2/pokemon/117/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "qwilfish",
        "url": "https://pokeapi.co/api/v2/pokemon/211/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "roselia",
        "url": "https://pokeapi.co/api/v2/pokemon/315/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "budew",
        "url": "https://pokeapi.co/api/v2/pokemon/406/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "roserade",
        "url": "https://pokeapi.co/api/v2/pokemon/407/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "venipede",
        "url": "https://pokeapi.co/api/v2/pokemon/543/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "whirlipede",
        "url": "https://pokeapi.co/api/v2/pokemon/544/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scolipede",
        "url": "https://pokeapi.co/api/v2/pokemon/545/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skrelp",
        "url": "https://pokeapi.co/api/v2/pokemon/690/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dragalge",
        "url": "https://pokeapi.co/api/v2/pokemon/691/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "overqwil",
        "url": "https://pokeapi.co/api/v2/pokemon/904/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "clodsire",
        "url": "https://pokeapi.co/api/v2/pokemon/980/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "qwilfish-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10234/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wooper-paldea",
        "url": "https://pokeapi.co/api/v2/pokemon/10253/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "color-change": {
    "id": 16,
    "name": "color-change",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever this Pokémon takes damage from a move, the Pokémon's type changes to match the move.\n\nIf the Pokémon has two types, both are overridden.  The Pokémon must directly take damage; for example, moves blocked by a substitute will not trigger this ability, nor will moves that deal damage indirectly, such as spikes.\n\nThis ability takes effect on only the last hit of a multiple-hit attack.\n\nIn Pokémon Colosseum and XD: Gale of Darkness, this ability does not take effect on Shadow-type moves.",
    "shortEffect": "Changes type to match when hit by a damaging move.",
    "flavorText": "Changes type to foe’s move.",
    "pokemon": [
      {
        "name": "kecleon",
        "url": "https://pokeapi.co/api/v2/pokemon/352/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "huge-power": {
    "id": 37,
    "name": "huge-power",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's Attack is doubled while in battle.\n\nThis bonus does not count as a stat modifier.\n\nThis ability functions identically to pure power.",
    "shortEffect": "Doubles Attack in battle.",
    "flavorText": "Raises ATTACK.",
    "pokemon": [
      {
        "name": "marill",
        "url": "https://pokeapi.co/api/v2/pokemon/183/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "azumarill",
        "url": "https://pokeapi.co/api/v2/pokemon/184/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "azurill",
        "url": "https://pokeapi.co/api/v2/pokemon/298/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bunnelby",
        "url": "https://pokeapi.co/api/v2/pokemon/659/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "diggersby",
        "url": "https://pokeapi.co/api/v2/pokemon/660/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mawile-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10052/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "chlorophyll": {
    "id": 34,
    "name": "chlorophyll",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
    "shortEffect": "Doubles Speed during strong sunlight.",
    "flavorText": "Raises SPEED in sunshine.",
    "pokemon": [
      {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon/3/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oddish",
        "url": "https://pokeapi.co/api/v2/pokemon/43/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gloom",
        "url": "https://pokeapi.co/api/v2/pokemon/44/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vileplume",
        "url": "https://pokeapi.co/api/v2/pokemon/45/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bellsprout",
        "url": "https://pokeapi.co/api/v2/pokemon/69/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "weepinbell",
        "url": "https://pokeapi.co/api/v2/pokemon/70/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "victreebel",
        "url": "https://pokeapi.co/api/v2/pokemon/71/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "exeggcute",
        "url": "https://pokeapi.co/api/v2/pokemon/102/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "exeggutor",
        "url": "https://pokeapi.co/api/v2/pokemon/103/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tangela",
        "url": "https://pokeapi.co/api/v2/pokemon/114/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bellossom",
        "url": "https://pokeapi.co/api/v2/pokemon/182/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hoppip",
        "url": "https://pokeapi.co/api/v2/pokemon/187/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skiploom",
        "url": "https://pokeapi.co/api/v2/pokemon/188/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "jumpluff",
        "url": "https://pokeapi.co/api/v2/pokemon/189/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sunkern",
        "url": "https://pokeapi.co/api/v2/pokemon/191/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sunflora",
        "url": "https://pokeapi.co/api/v2/pokemon/192/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "seedot",
        "url": "https://pokeapi.co/api/v2/pokemon/273/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nuzleaf",
        "url": "https://pokeapi.co/api/v2/pokemon/274/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shiftry",
        "url": "https://pokeapi.co/api/v2/pokemon/275/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tropius",
        "url": "https://pokeapi.co/api/v2/pokemon/357/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cherubi",
        "url": "https://pokeapi.co/api/v2/pokemon/420/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tangrowth",
        "url": "https://pokeapi.co/api/v2/pokemon/465/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "leafeon",
        "url": "https://pokeapi.co/api/v2/pokemon/470/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sewaddle",
        "url": "https://pokeapi.co/api/v2/pokemon/540/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "swadloon",
        "url": "https://pokeapi.co/api/v2/pokemon/541/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "leavanny",
        "url": "https://pokeapi.co/api/v2/pokemon/542/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "cottonee",
        "url": "https://pokeapi.co/api/v2/pokemon/546/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "whimsicott",
        "url": "https://pokeapi.co/api/v2/pokemon/547/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "petilil",
        "url": "https://pokeapi.co/api/v2/pokemon/548/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lilligant",
        "url": "https://pokeapi.co/api/v2/pokemon/549/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "maractus",
        "url": "https://pokeapi.co/api/v2/pokemon/556/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "deerling",
        "url": "https://pokeapi.co/api/v2/pokemon/585/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sawsbuck",
        "url": "https://pokeapi.co/api/v2/pokemon/586/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "capsakid",
        "url": "https://pokeapi.co/api/v2/pokemon/951/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scovillain",
        "url": "https://pokeapi.co/api/v2/pokemon/952/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venusaur-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10195/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lilligant-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10237/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "clear-body": {
    "id": 29,
    "name": "clear-body",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot have its stats lowered by other Pokémon.\n\nThis ability does not prevent any stat losses other than stat modifiers, such as the Speed cut from paralysis.  This Pokémon can still be passed negative stat modifiers through guard swap, heart swap, or power swap.\n\nThis ability functions identically to white smoke in battle.",
    "shortEffect": "Prevents stats from being lowered by other Pokémon.",
    "flavorText": "Prevents ability reduction.",
    "pokemon": [
      {
        "name": "tentacool",
        "url": "https://pokeapi.co/api/v2/pokemon/72/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tentacruel",
        "url": "https://pokeapi.co/api/v2/pokemon/73/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "beldum",
        "url": "https://pokeapi.co/api/v2/pokemon/374/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "metang",
        "url": "https://pokeapi.co/api/v2/pokemon/375/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "metagross",
        "url": "https://pokeapi.co/api/v2/pokemon/376/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "regirock",
        "url": "https://pokeapi.co/api/v2/pokemon/377/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "regice",
        "url": "https://pokeapi.co/api/v2/pokemon/378/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "registeel",
        "url": "https://pokeapi.co/api/v2/pokemon/379/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "klink",
        "url": "https://pokeapi.co/api/v2/pokemon/599/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "klang",
        "url": "https://pokeapi.co/api/v2/pokemon/600/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "klinklang",
        "url": "https://pokeapi.co/api/v2/pokemon/601/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "carbink",
        "url": "https://pokeapi.co/api/v2/pokemon/703/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "diancie",
        "url": "https://pokeapi.co/api/v2/pokemon/719/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dreepy",
        "url": "https://pokeapi.co/api/v2/pokemon/885/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drakloak",
        "url": "https://pokeapi.co/api/v2/pokemon/886/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dragapult",
        "url": "https://pokeapi.co/api/v2/pokemon/887/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nacli",
        "url": "https://pokeapi.co/api/v2/pokemon/932/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "naclstack",
        "url": "https://pokeapi.co/api/v2/pokemon/933/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "garganacl",
        "url": "https://pokeapi.co/api/v2/pokemon/934/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "compound-eyes": {
    "id": 14,
    "name": "compound-eyes",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's moves have 1.3× their accuracy.\n\nThis ability has no effect on the one-hit KO moves (fissure, guillotine, horn drill, and sheer cold).\n\nOverworld: If the first Pokémon in the party has this ability, the chance of a wild Pokémon holding a particular item is raised from 50%, 5%, or 1% to 60%, 20%, or 5%, respectively.",
    "shortEffect": "Increases moves' accuracy to 1.3×.",
    "flavorText": "Raises accuracy.",
    "pokemon": [
      {
        "name": "butterfree",
        "url": "https://pokeapi.co/api/v2/pokemon/12/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venonat",
        "url": "https://pokeapi.co/api/v2/pokemon/48/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "yanma",
        "url": "https://pokeapi.co/api/v2/pokemon/193/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dustox",
        "url": "https://pokeapi.co/api/v2/pokemon/269/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nincada",
        "url": "https://pokeapi.co/api/v2/pokemon/290/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "joltik",
        "url": "https://pokeapi.co/api/v2/pokemon/595/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "galvantula",
        "url": "https://pokeapi.co/api/v2/pokemon/596/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scatterbug",
        "url": "https://pokeapi.co/api/v2/pokemon/664/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "vivillon",
        "url": "https://pokeapi.co/api/v2/pokemon/666/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "blipbug",
        "url": "https://pokeapi.co/api/v2/pokemon/824/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dottler",
        "url": "https://pokeapi.co/api/v2/pokemon/825/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rellor",
        "url": "https://pokeapi.co/api/v2/pokemon/953/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "butterfree-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10198/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "levitate": {
    "id": 26,
    "name": "levitate",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon is immune to ground-type moves, spikes, toxic spikes, and arena trap.\n\nThis ability is disabled during gravity or ingrain, or while holding an iron ball.  This ability is not disabled during roost.",
    "shortEffect": "Evades ground moves.",
    "flavorText": "Gives full immunity to all\nGround-type moves.",
    "pokemon": [
      {
        "name": "gastly",
        "url": "https://pokeapi.co/api/v2/pokemon/92/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "haunter",
        "url": "https://pokeapi.co/api/v2/pokemon/93/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "koffing",
        "url": "https://pokeapi.co/api/v2/pokemon/109/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "weezing",
        "url": "https://pokeapi.co/api/v2/pokemon/110/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "misdreavus",
        "url": "https://pokeapi.co/api/v2/pokemon/200/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "unown",
        "url": "https://pokeapi.co/api/v2/pokemon/201/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vibrava",
        "url": "https://pokeapi.co/api/v2/pokemon/329/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flygon",
        "url": "https://pokeapi.co/api/v2/pokemon/330/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lunatone",
        "url": "https://pokeapi.co/api/v2/pokemon/337/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "solrock",
        "url": "https://pokeapi.co/api/v2/pokemon/338/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "baltoy",
        "url": "https://pokeapi.co/api/v2/pokemon/343/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "claydol",
        "url": "https://pokeapi.co/api/v2/pokemon/344/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "duskull",
        "url": "https://pokeapi.co/api/v2/pokemon/355/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chimecho",
        "url": "https://pokeapi.co/api/v2/pokemon/358/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "latias",
        "url": "https://pokeapi.co/api/v2/pokemon/380/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "latios",
        "url": "https://pokeapi.co/api/v2/pokemon/381/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mismagius",
        "url": "https://pokeapi.co/api/v2/pokemon/429/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chingling",
        "url": "https://pokeapi.co/api/v2/pokemon/433/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bronzor",
        "url": "https://pokeapi.co/api/v2/pokemon/436/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bronzong",
        "url": "https://pokeapi.co/api/v2/pokemon/437/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "carnivine",
        "url": "https://pokeapi.co/api/v2/pokemon/455/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rotom",
        "url": "https://pokeapi.co/api/v2/pokemon/479/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "uxie",
        "url": "https://pokeapi.co/api/v2/pokemon/480/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mesprit",
        "url": "https://pokeapi.co/api/v2/pokemon/481/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "azelf",
        "url": "https://pokeapi.co/api/v2/pokemon/482/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cresselia",
        "url": "https://pokeapi.co/api/v2/pokemon/488/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tynamo",
        "url": "https://pokeapi.co/api/v2/pokemon/602/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eelektrik",
        "url": "https://pokeapi.co/api/v2/pokemon/603/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eelektross",
        "url": "https://pokeapi.co/api/v2/pokemon/604/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cryogonal",
        "url": "https://pokeapi.co/api/v2/pokemon/615/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hydreigon",
        "url": "https://pokeapi.co/api/v2/pokemon/635/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vikavolt",
        "url": "https://pokeapi.co/api/v2/pokemon/738/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "giratina-origin",
        "url": "https://pokeapi.co/api/v2/pokemon/10007/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rotom-heat",
        "url": "https://pokeapi.co/api/v2/pokemon/10008/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rotom-wash",
        "url": "https://pokeapi.co/api/v2/pokemon/10009/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rotom-frost",
        "url": "https://pokeapi.co/api/v2/pokemon/10010/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rotom-fan",
        "url": "https://pokeapi.co/api/v2/pokemon/10011/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rotom-mow",
        "url": "https://pokeapi.co/api/v2/pokemon/10012/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "latias-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10062/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "latios-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10063/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vikavolt-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10122/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "weezing-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10167/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "own-tempo": {
    "id": 20,
    "name": "own-tempo",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be confused.\n\nIf a Pokémon is confused and acquires this ability, its confusion will immediately be healed.",
    "shortEffect": "Prevents confusion.",
    "flavorText": "Prevents confusion.",
    "pokemon": [
      {
        "name": "slowpoke",
        "url": "https://pokeapi.co/api/v2/pokemon/79/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "slowbro",
        "url": "https://pokeapi.co/api/v2/pokemon/80/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lickitung",
        "url": "https://pokeapi.co/api/v2/pokemon/108/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slowking",
        "url": "https://pokeapi.co/api/v2/pokemon/199/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "smeargle",
        "url": "https://pokeapi.co/api/v2/pokemon/235/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lotad",
        "url": "https://pokeapi.co/api/v2/pokemon/270/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lombre",
        "url": "https://pokeapi.co/api/v2/pokemon/271/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ludicolo",
        "url": "https://pokeapi.co/api/v2/pokemon/272/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "numel",
        "url": "https://pokeapi.co/api/v2/pokemon/322/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spoink",
        "url": "https://pokeapi.co/api/v2/pokemon/325/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "grumpig",
        "url": "https://pokeapi.co/api/v2/pokemon/326/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "spinda",
        "url": "https://pokeapi.co/api/v2/pokemon/327/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "glameow",
        "url": "https://pokeapi.co/api/v2/pokemon/431/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "purugly",
        "url": "https://pokeapi.co/api/v2/pokemon/432/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lickilicky",
        "url": "https://pokeapi.co/api/v2/pokemon/463/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "petilil",
        "url": "https://pokeapi.co/api/v2/pokemon/548/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lilligant",
        "url": "https://pokeapi.co/api/v2/pokemon/549/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "espurr",
        "url": "https://pokeapi.co/api/v2/pokemon/677/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bergmite",
        "url": "https://pokeapi.co/api/v2/pokemon/712/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "avalugg",
        "url": "https://pokeapi.co/api/v2/pokemon/713/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mudbray",
        "url": "https://pokeapi.co/api/v2/pokemon/749/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mudsdale",
        "url": "https://pokeapi.co/api/v2/pokemon/750/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tandemaus",
        "url": "https://pokeapi.co/api/v2/pokemon/924/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fidough",
        "url": "https://pokeapi.co/api/v2/pokemon/926/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tadbulb",
        "url": "https://pokeapi.co/api/v2/pokemon/938/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tinkatink",
        "url": "https://pokeapi.co/api/v2/pokemon/957/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tinkatuff",
        "url": "https://pokeapi.co/api/v2/pokemon/958/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tinkaton",
        "url": "https://pokeapi.co/api/v2/pokemon/959/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rockruff-own-tempo",
        "url": "https://pokeapi.co/api/v2/pokemon/10151/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slowpoke-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10164/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "slowbro-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10165/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "slowking-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10172/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "indeedee-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10186/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "rain-dish": {
    "id": 44,
    "name": "rain-dish",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon heals for 1/16 of its maximum HP after each turn during rain.",
    "shortEffect": "Heals for 1/16 max HP after each turn during rain.",
    "flavorText": "Slight HP recovery in rain.",
    "pokemon": [
      {
        "name": "squirtle",
        "url": "https://pokeapi.co/api/v2/pokemon/7/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wartortle",
        "url": "https://pokeapi.co/api/v2/pokemon/8/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "blastoise",
        "url": "https://pokeapi.co/api/v2/pokemon/9/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tentacool",
        "url": "https://pokeapi.co/api/v2/pokemon/72/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tentacruel",
        "url": "https://pokeapi.co/api/v2/pokemon/73/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lotad",
        "url": "https://pokeapi.co/api/v2/pokemon/270/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lombre",
        "url": "https://pokeapi.co/api/v2/pokemon/271/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ludicolo",
        "url": "https://pokeapi.co/api/v2/pokemon/272/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wingull",
        "url": "https://pokeapi.co/api/v2/pokemon/278/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pelipper",
        "url": "https://pokeapi.co/api/v2/pokemon/279/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "surskit",
        "url": "https://pokeapi.co/api/v2/pokemon/283/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "morelull",
        "url": "https://pokeapi.co/api/v2/pokemon/755/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shiinotic",
        "url": "https://pokeapi.co/api/v2/pokemon/756/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "blastoise-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10197/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "trace": {
    "id": 36,
    "name": "trace",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "When this Pokémon enters battle, it copies a random opponent's ability.\n\nThis ability cannot copy flower gift, forecast, illusion, imposter, multitype, trace, wonder guard, or zen mode.",
    "shortEffect": "Copies an opponent's ability upon entering battle.",
    "flavorText": "Copies special ability.",
    "pokemon": [
      {
        "name": "porygon",
        "url": "https://pokeapi.co/api/v2/pokemon/137/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "porygon2",
        "url": "https://pokeapi.co/api/v2/pokemon/233/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ralts",
        "url": "https://pokeapi.co/api/v2/pokemon/280/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kirlia",
        "url": "https://pokeapi.co/api/v2/pokemon/281/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gardevoir",
        "url": "https://pokeapi.co/api/v2/pokemon/282/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "alakazam-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10037/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "magma-armor": {
    "id": 40,
    "name": "magma-armor",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be frozen.\n\nIf a Pokémon is frozen and acquires this ability, it will immediately thaw out; this includes when regaining a lost ability upon leaving battle.\n\nOverworld: If any Pokémon in the party has this ability, each egg in the party has its hatch counter decreased by 2 (rather than 1) each step cycle, making eggs hatch roughly twice as quickly.  This effect does not stack if multiple Pokémon have this ability or flame body.",
    "shortEffect": "Prevents freezing.",
    "flavorText": "Prevents freezing.",
    "pokemon": [
      {
        "name": "slugma",
        "url": "https://pokeapi.co/api/v2/pokemon/218/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "magcargo",
        "url": "https://pokeapi.co/api/v2/pokemon/219/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "camerupt",
        "url": "https://pokeapi.co/api/v2/pokemon/323/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "immunity": {
    "id": 17,
    "name": "immunity",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be poisoned.  This includes bad poison.\n\nIf a Pokémon is poisoned and acquires this ability, its poison is healed; this includes when regaining a lost ability upon leaving battle.",
    "shortEffect": "Prevents poison.",
    "flavorText": "Prevents poisoning.",
    "pokemon": [
      {
        "name": "snorlax",
        "url": "https://pokeapi.co/api/v2/pokemon/143/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gligar",
        "url": "https://pokeapi.co/api/v2/pokemon/207/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "zangoose",
        "url": "https://pokeapi.co/api/v2/pokemon/335/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "snorlax-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10206/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sand-stream": {
    "id": 45,
    "name": "sand-stream",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "The weather changes to a sandstorm when this Pokémon enters battle and does not end unless cancelled by another weather condition.\n\nIf multiple Pokémon with this ability, drizzle, drought, or snow warning are sent out at the same time, the abilities will activate in order of Speed, respecting trick room.  Each ability's weather will cancel the previous weather, and only the weather summoned by the slowest of the Pokémon will stay.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is halved in a sandstorm.",
    "shortEffect": "Summons a sandstorm that lasts indefinitely upon entering battle.",
    "flavorText": "Summons a sandstorm.",
    "pokemon": [
      {
        "name": "tyranitar",
        "url": "https://pokeapi.co/api/v2/pokemon/248/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hippopotas",
        "url": "https://pokeapi.co/api/v2/pokemon/449/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hippowdon",
        "url": "https://pokeapi.co/api/v2/pokemon/450/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gigalith",
        "url": "https://pokeapi.co/api/v2/pokemon/526/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tyranitar-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10049/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "run-away": {
    "id": 50,
    "name": "run-away",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon is always successful fleeing from wild battles, even if trapped by a move or ability.",
    "shortEffect": "Ensures success fleeing from wild battles.",
    "flavorText": "Makes escaping easier.",
    "pokemon": [
      {
        "name": "caterpie",
        "url": "https://pokeapi.co/api/v2/pokemon/10/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "weedle",
        "url": "https://pokeapi.co/api/v2/pokemon/13/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rattata",
        "url": "https://pokeapi.co/api/v2/pokemon/19/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raticate",
        "url": "https://pokeapi.co/api/v2/pokemon/20/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "oddish",
        "url": "https://pokeapi.co/api/v2/pokemon/43/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "venonat",
        "url": "https://pokeapi.co/api/v2/pokemon/48/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ponyta",
        "url": "https://pokeapi.co/api/v2/pokemon/77/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rapidash",
        "url": "https://pokeapi.co/api/v2/pokemon/78/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "doduo",
        "url": "https://pokeapi.co/api/v2/pokemon/84/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dodrio",
        "url": "https://pokeapi.co/api/v2/pokemon/85/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eevee",
        "url": "https://pokeapi.co/api/v2/pokemon/133/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sentret",
        "url": "https://pokeapi.co/api/v2/pokemon/161/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "furret",
        "url": "https://pokeapi.co/api/v2/pokemon/162/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aipom",
        "url": "https://pokeapi.co/api/v2/pokemon/190/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dunsparce",
        "url": "https://pokeapi.co/api/v2/pokemon/206/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "snubbull",
        "url": "https://pokeapi.co/api/v2/pokemon/209/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "poochyena",
        "url": "https://pokeapi.co/api/v2/pokemon/261/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wurmple",
        "url": "https://pokeapi.co/api/v2/pokemon/265/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nincada",
        "url": "https://pokeapi.co/api/v2/pokemon/290/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kricketot",
        "url": "https://pokeapi.co/api/v2/pokemon/401/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pachirisu",
        "url": "https://pokeapi.co/api/v2/pokemon/417/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "buneary",
        "url": "https://pokeapi.co/api/v2/pokemon/427/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "patrat",
        "url": "https://pokeapi.co/api/v2/pokemon/504/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lillipup",
        "url": "https://pokeapi.co/api/v2/pokemon/506/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nickit",
        "url": "https://pokeapi.co/api/v2/pokemon/827/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "thievul",
        "url": "https://pokeapi.co/api/v2/pokemon/828/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wooloo",
        "url": "https://pokeapi.co/api/v2/pokemon/831/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tandemaus",
        "url": "https://pokeapi.co/api/v2/pokemon/924/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "maschiff",
        "url": "https://pokeapi.co/api/v2/pokemon/942/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dudunsparce-two-segment",
        "url": "https://pokeapi.co/api/v2/pokemon/982/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "eevee-starter",
        "url": "https://pokeapi.co/api/v2/pokemon/10159/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ponyta-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10162/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rapidash-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10163/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eevee-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10205/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dudunsparce-three-segment",
        "url": "https://pokeapi.co/api/v2/pokemon/10255/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gimmighoul-roaming",
        "url": "https://pokeapi.co/api/v2/pokemon/10263/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gimmighoul-roaming",
        "url": "https://pokeapi.co/api/v2/pokemon/10263/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "early-bird": {
    "id": 48,
    "name": "early-bird",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's remaining sleep turn count falls by 2 rather than 1.\n\nIf this Pokémon's sleep counter is at 1, it will fall to 0 and then the Pokémon will wake up.",
    "shortEffect": "Makes sleep pass twice as quickly.",
    "flavorText": "Awakens quickly from sleep.",
    "pokemon": [
      {
        "name": "doduo",
        "url": "https://pokeapi.co/api/v2/pokemon/84/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dodrio",
        "url": "https://pokeapi.co/api/v2/pokemon/85/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kangaskhan",
        "url": "https://pokeapi.co/api/v2/pokemon/115/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ledyba",
        "url": "https://pokeapi.co/api/v2/pokemon/165/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ledian",
        "url": "https://pokeapi.co/api/v2/pokemon/166/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "natu",
        "url": "https://pokeapi.co/api/v2/pokemon/177/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "xatu",
        "url": "https://pokeapi.co/api/v2/pokemon/178/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sunkern",
        "url": "https://pokeapi.co/api/v2/pokemon/191/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sunflora",
        "url": "https://pokeapi.co/api/v2/pokemon/192/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "girafarig",
        "url": "https://pokeapi.co/api/v2/pokemon/203/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "houndour",
        "url": "https://pokeapi.co/api/v2/pokemon/228/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "houndoom",
        "url": "https://pokeapi.co/api/v2/pokemon/229/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "seedot",
        "url": "https://pokeapi.co/api/v2/pokemon/273/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "nuzleaf",
        "url": "https://pokeapi.co/api/v2/pokemon/274/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "smoliv",
        "url": "https://pokeapi.co/api/v2/pokemon/928/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dolliv",
        "url": "https://pokeapi.co/api/v2/pokemon/929/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "suction-cups": {
    "id": 21,
    "name": "suction-cups",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be forced out of battle by moves such as whirlwind.\n\ndragon tail and circle throw still inflict damage against this Pokémon.\n\nOverworld: If the lead Pokémon has this ability, the success rate while fishing is increased.",
    "shortEffect": "Prevents being forced out of battle by other Pokémon's moves.",
    "flavorText": "Firmly anchors the body.",
    "pokemon": [
      {
        "name": "octillery",
        "url": "https://pokeapi.co/api/v2/pokemon/224/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lileep",
        "url": "https://pokeapi.co/api/v2/pokemon/345/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cradily",
        "url": "https://pokeapi.co/api/v2/pokemon/346/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "inkay",
        "url": "https://pokeapi.co/api/v2/pokemon/686/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "malamar",
        "url": "https://pokeapi.co/api/v2/pokemon/687/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "flash-fire": {
    "id": 18,
    "name": "flash-fire",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon is immune to fire-type moves.  Once this Pokémon has been hit by a Fire move, its own Fire moves will inflict 1.5× as much damage until it leaves battle.\n\nThis ability has no effect while the Pokémon is frozen.  The Fire damage bonus is retained even if the Pokémon is frozen and thawed or the ability is lost or disabled.  Fire moves will ignore this Pokémon's substitute.  This ability takes effect even on non-damaging moves, i.e. will o wisp.",
    "shortEffect": "Protects against fire moves.  Once one has been blocked, the Pokémon's own Fire moves inflict 1.5× damage until it leaves battle.",
    "flavorText": "Powers up if hit by fire.",
    "pokemon": [
      {
        "name": "vulpix",
        "url": "https://pokeapi.co/api/v2/pokemon/37/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ninetales",
        "url": "https://pokeapi.co/api/v2/pokemon/38/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "growlithe",
        "url": "https://pokeapi.co/api/v2/pokemon/58/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "arcanine",
        "url": "https://pokeapi.co/api/v2/pokemon/59/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ponyta",
        "url": "https://pokeapi.co/api/v2/pokemon/77/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rapidash",
        "url": "https://pokeapi.co/api/v2/pokemon/78/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "flareon",
        "url": "https://pokeapi.co/api/v2/pokemon/136/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cyndaquil",
        "url": "https://pokeapi.co/api/v2/pokemon/155/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "quilava",
        "url": "https://pokeapi.co/api/v2/pokemon/156/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "typhlosion",
        "url": "https://pokeapi.co/api/v2/pokemon/157/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "houndour",
        "url": "https://pokeapi.co/api/v2/pokemon/228/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "houndoom",
        "url": "https://pokeapi.co/api/v2/pokemon/229/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "heatran",
        "url": "https://pokeapi.co/api/v2/pokemon/485/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "litwick",
        "url": "https://pokeapi.co/api/v2/pokemon/607/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lampent",
        "url": "https://pokeapi.co/api/v2/pokemon/608/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chandelure",
        "url": "https://pokeapi.co/api/v2/pokemon/609/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "heatmor",
        "url": "https://pokeapi.co/api/v2/pokemon/631/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rolycoly",
        "url": "https://pokeapi.co/api/v2/pokemon/837/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "carkol",
        "url": "https://pokeapi.co/api/v2/pokemon/838/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "coalossal",
        "url": "https://pokeapi.co/api/v2/pokemon/839/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sizzlipede",
        "url": "https://pokeapi.co/api/v2/pokemon/850/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "centiskorch",
        "url": "https://pokeapi.co/api/v2/pokemon/851/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "charcadet",
        "url": "https://pokeapi.co/api/v2/pokemon/935/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "armarouge",
        "url": "https://pokeapi.co/api/v2/pokemon/936/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ceruledge",
        "url": "https://pokeapi.co/api/v2/pokemon/937/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "coalossal-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10215/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "centiskorch-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10220/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "growlithe-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10229/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "arcanine-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10230/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "sturdy": {
    "id": 5,
    "name": "sturdy",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "When this Pokémon is at full HP, any hit that would knock it out will instead leave it with 1 HP.  Regardless of its current HP, it is also immune to the one-hit KO moves: fissure, guillotine, horn drill, and sheer cold.\n\nIf this Pokémon is holding a focus sash, this ability takes precedence and the item will not be consumed.",
    "shortEffect": "Prevents being KOed from full HP, leaving 1 HP instead.  Protects against the one-hit KO moves regardless of HP.",
    "flavorText": "Negates 1-hit KO attacks.",
    "pokemon": [
      {
        "name": "geodude",
        "url": "https://pokeapi.co/api/v2/pokemon/74/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "graveler",
        "url": "https://pokeapi.co/api/v2/pokemon/75/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "golem",
        "url": "https://pokeapi.co/api/v2/pokemon/76/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "magnemite",
        "url": "https://pokeapi.co/api/v2/pokemon/81/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "magneton",
        "url": "https://pokeapi.co/api/v2/pokemon/82/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "onix",
        "url": "https://pokeapi.co/api/v2/pokemon/95/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sudowoodo",
        "url": "https://pokeapi.co/api/v2/pokemon/185/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pineco",
        "url": "https://pokeapi.co/api/v2/pokemon/204/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "forretress",
        "url": "https://pokeapi.co/api/v2/pokemon/205/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "steelix",
        "url": "https://pokeapi.co/api/v2/pokemon/208/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shuckle",
        "url": "https://pokeapi.co/api/v2/pokemon/213/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skarmory",
        "url": "https://pokeapi.co/api/v2/pokemon/227/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "donphan",
        "url": "https://pokeapi.co/api/v2/pokemon/232/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nosepass",
        "url": "https://pokeapi.co/api/v2/pokemon/299/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aron",
        "url": "https://pokeapi.co/api/v2/pokemon/304/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lairon",
        "url": "https://pokeapi.co/api/v2/pokemon/305/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aggron",
        "url": "https://pokeapi.co/api/v2/pokemon/306/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "relicanth",
        "url": "https://pokeapi.co/api/v2/pokemon/369/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "regirock",
        "url": "https://pokeapi.co/api/v2/pokemon/377/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shieldon",
        "url": "https://pokeapi.co/api/v2/pokemon/410/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bastiodon",
        "url": "https://pokeapi.co/api/v2/pokemon/411/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bonsly",
        "url": "https://pokeapi.co/api/v2/pokemon/438/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "magnezone",
        "url": "https://pokeapi.co/api/v2/pokemon/462/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "probopass",
        "url": "https://pokeapi.co/api/v2/pokemon/476/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "roggenrola",
        "url": "https://pokeapi.co/api/v2/pokemon/524/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "boldore",
        "url": "https://pokeapi.co/api/v2/pokemon/525/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gigalith",
        "url": "https://pokeapi.co/api/v2/pokemon/526/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sawk",
        "url": "https://pokeapi.co/api/v2/pokemon/539/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dwebble",
        "url": "https://pokeapi.co/api/v2/pokemon/557/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "crustle",
        "url": "https://pokeapi.co/api/v2/pokemon/558/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tirtouga",
        "url": "https://pokeapi.co/api/v2/pokemon/564/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "carracosta",
        "url": "https://pokeapi.co/api/v2/pokemon/565/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tyrunt",
        "url": "https://pokeapi.co/api/v2/pokemon/696/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "carbink",
        "url": "https://pokeapi.co/api/v2/pokemon/703/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bergmite",
        "url": "https://pokeapi.co/api/v2/pokemon/712/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "avalugg",
        "url": "https://pokeapi.co/api/v2/pokemon/713/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "togedemaru",
        "url": "https://pokeapi.co/api/v2/pokemon/777/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cosmoem",
        "url": "https://pokeapi.co/api/v2/pokemon/790/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nacli",
        "url": "https://pokeapi.co/api/v2/pokemon/932/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "naclstack",
        "url": "https://pokeapi.co/api/v2/pokemon/933/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "garganacl",
        "url": "https://pokeapi.co/api/v2/pokemon/934/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "archaludon",
        "url": "https://pokeapi.co/api/v2/pokemon/1018/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "geodude-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10109/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "graveler-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10110/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "golem-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10111/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "togedemaru-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10154/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "avalugg-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10243/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ogerpon-cornerstone-mask",
        "url": "https://pokeapi.co/api/v2/pokemon/10275/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "intimidate": {
    "id": 22,
    "name": "intimidate",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "When this Pokémon enters battle, the opponent's Attack is lowered by one stage.  In a double battle, both opponents are affected.\n\nThis ability also takes effect when acquired during a battle, but will not take effect again if lost and reobtained without leaving battle.\n\nThis ability has no effect on an opponent that has a substitute.\n\nOverworld: If the first Pokémon in the party has this ability, any random encounter with a Pokémon five or more levels lower than it has a 50% chance of being skipped.",
    "shortEffect": "Lowers opponents' Attack one stage upon entering battle.",
    "flavorText": "Lowers the foe’s ATTACK.",
    "pokemon": [
      {
        "name": "ekans",
        "url": "https://pokeapi.co/api/v2/pokemon/23/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "arbok",
        "url": "https://pokeapi.co/api/v2/pokemon/24/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "growlithe",
        "url": "https://pokeapi.co/api/v2/pokemon/58/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "arcanine",
        "url": "https://pokeapi.co/api/v2/pokemon/59/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tauros",
        "url": "https://pokeapi.co/api/v2/pokemon/128/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gyarados",
        "url": "https://pokeapi.co/api/v2/pokemon/130/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "snubbull",
        "url": "https://pokeapi.co/api/v2/pokemon/209/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "granbull",
        "url": "https://pokeapi.co/api/v2/pokemon/210/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "qwilfish",
        "url": "https://pokeapi.co/api/v2/pokemon/211/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "stantler",
        "url": "https://pokeapi.co/api/v2/pokemon/234/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hitmontop",
        "url": "https://pokeapi.co/api/v2/pokemon/237/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mightyena",
        "url": "https://pokeapi.co/api/v2/pokemon/262/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "masquerain",
        "url": "https://pokeapi.co/api/v2/pokemon/284/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mawile",
        "url": "https://pokeapi.co/api/v2/pokemon/303/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "salamence",
        "url": "https://pokeapi.co/api/v2/pokemon/373/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "staravia",
        "url": "https://pokeapi.co/api/v2/pokemon/397/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "staraptor",
        "url": "https://pokeapi.co/api/v2/pokemon/398/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shinx",
        "url": "https://pokeapi.co/api/v2/pokemon/403/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "luxio",
        "url": "https://pokeapi.co/api/v2/pokemon/404/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "luxray",
        "url": "https://pokeapi.co/api/v2/pokemon/405/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "herdier",
        "url": "https://pokeapi.co/api/v2/pokemon/507/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "stoutland",
        "url": "https://pokeapi.co/api/v2/pokemon/508/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandile",
        "url": "https://pokeapi.co/api/v2/pokemon/551/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "krokorok",
        "url": "https://pokeapi.co/api/v2/pokemon/552/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "krookodile",
        "url": "https://pokeapi.co/api/v2/pokemon/553/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scraggy",
        "url": "https://pokeapi.co/api/v2/pokemon/559/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "scrafty",
        "url": "https://pokeapi.co/api/v2/pokemon/560/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "litten",
        "url": "https://pokeapi.co/api/v2/pokemon/725/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "torracat",
        "url": "https://pokeapi.co/api/v2/pokemon/726/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "incineroar",
        "url": "https://pokeapi.co/api/v2/pokemon/727/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wyrdeer",
        "url": "https://pokeapi.co/api/v2/pokemon/899/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "overqwil",
        "url": "https://pokeapi.co/api/v2/pokemon/904/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "squawkabilly-green-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/931/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "maschiff",
        "url": "https://pokeapi.co/api/v2/pokemon/942/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mabosstiff",
        "url": "https://pokeapi.co/api/v2/pokemon/943/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "landorus-therian",
        "url": "https://pokeapi.co/api/v2/pokemon/10021/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "manectric-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10055/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "growlithe-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10229/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "arcanine-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10230/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "qwilfish-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10234/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tauros-paldea-combat-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10250/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tauros-paldea-blaze-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10251/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tauros-paldea-aqua-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10252/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "squawkabilly-blue-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10260/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "squawkabilly-yellow-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10261/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "squawkabilly-white-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10262/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "damp": {
    "id": 6,
    "name": "damp",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "While this Pokémon is in battle, self destruct and explosion will fail and aftermath will not take effect.",
    "shortEffect": "Prevents self destruct, explosion, and aftermath from working while the Pokémon is in battle.",
    "flavorText": "Prevents self-destruction.",
    "pokemon": [
      {
        "name": "paras",
        "url": "https://pokeapi.co/api/v2/pokemon/46/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "parasect",
        "url": "https://pokeapi.co/api/v2/pokemon/47/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "psyduck",
        "url": "https://pokeapi.co/api/v2/pokemon/54/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "golduck",
        "url": "https://pokeapi.co/api/v2/pokemon/55/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "poliwag",
        "url": "https://pokeapi.co/api/v2/pokemon/60/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "poliwhirl",
        "url": "https://pokeapi.co/api/v2/pokemon/61/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "poliwrath",
        "url": "https://pokeapi.co/api/v2/pokemon/62/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "horsea",
        "url": "https://pokeapi.co/api/v2/pokemon/116/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "seadra",
        "url": "https://pokeapi.co/api/v2/pokemon/117/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "politoed",
        "url": "https://pokeapi.co/api/v2/pokemon/186/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wooper",
        "url": "https://pokeapi.co/api/v2/pokemon/194/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "quagsire",
        "url": "https://pokeapi.co/api/v2/pokemon/195/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kingdra",
        "url": "https://pokeapi.co/api/v2/pokemon/230/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mudkip",
        "url": "https://pokeapi.co/api/v2/pokemon/258/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "marshtomp",
        "url": "https://pokeapi.co/api/v2/pokemon/259/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swampert",
        "url": "https://pokeapi.co/api/v2/pokemon/260/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "frillish",
        "url": "https://pokeapi.co/api/v2/pokemon/592/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "jellicent",
        "url": "https://pokeapi.co/api/v2/pokemon/593/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tadbulb",
        "url": "https://pokeapi.co/api/v2/pokemon/938/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bellibolt",
        "url": "https://pokeapi.co/api/v2/pokemon/939/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "thick-fat": {
    "id": 47,
    "name": "thick-fat",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon takes half as much damage from fire- and ice-type moves.",
    "shortEffect": "Halves damage from fire and ice moves.",
    "flavorText": "Heat-and-cold protection.",
    "pokemon": [
      {
        "name": "seel",
        "url": "https://pokeapi.co/api/v2/pokemon/86/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dewgong",
        "url": "https://pokeapi.co/api/v2/pokemon/87/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "snorlax",
        "url": "https://pokeapi.co/api/v2/pokemon/143/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "marill",
        "url": "https://pokeapi.co/api/v2/pokemon/183/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "azumarill",
        "url": "https://pokeapi.co/api/v2/pokemon/184/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swinub",
        "url": "https://pokeapi.co/api/v2/pokemon/220/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "piloswine",
        "url": "https://pokeapi.co/api/v2/pokemon/221/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "miltank",
        "url": "https://pokeapi.co/api/v2/pokemon/241/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "makuhita",
        "url": "https://pokeapi.co/api/v2/pokemon/296/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hariyama",
        "url": "https://pokeapi.co/api/v2/pokemon/297/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "azurill",
        "url": "https://pokeapi.co/api/v2/pokemon/298/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spoink",
        "url": "https://pokeapi.co/api/v2/pokemon/325/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grumpig",
        "url": "https://pokeapi.co/api/v2/pokemon/326/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spheal",
        "url": "https://pokeapi.co/api/v2/pokemon/363/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sealeo",
        "url": "https://pokeapi.co/api/v2/pokemon/364/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "walrein",
        "url": "https://pokeapi.co/api/v2/pokemon/365/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "purugly",
        "url": "https://pokeapi.co/api/v2/pokemon/432/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "munchlax",
        "url": "https://pokeapi.co/api/v2/pokemon/446/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mamoswine",
        "url": "https://pokeapi.co/api/v2/pokemon/473/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tepig",
        "url": "https://pokeapi.co/api/v2/pokemon/498/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pignite",
        "url": "https://pokeapi.co/api/v2/pokemon/499/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "appletun",
        "url": "https://pokeapi.co/api/v2/pokemon/842/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lechonk",
        "url": "https://pokeapi.co/api/v2/pokemon/915/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oinkologne-male",
        "url": "https://pokeapi.co/api/v2/pokemon/916/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cetoddle",
        "url": "https://pokeapi.co/api/v2/pokemon/974/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cetitan",
        "url": "https://pokeapi.co/api/v2/pokemon/975/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venusaur-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10033/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rattata-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10091/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "raticate-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10092/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "raticate-totem-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10093/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "snorlax-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10206/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "appletun-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10217/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oinkologne-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10254/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "rough-skin": {
    "id": 24,
    "name": "rough-skin",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a move makes contact with this Pokémon, the move's user takes 1/8 of its maximum HP in damage.\n\nThis ability functions identically to iron barbs.",
    "shortEffect": "Damages attacking Pokémon for 1/8 their max HP on contact.",
    "flavorText": "Hurts to touch.",
    "pokemon": [
      {
        "name": "carvanha",
        "url": "https://pokeapi.co/api/v2/pokemon/318/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sharpedo",
        "url": "https://pokeapi.co/api/v2/pokemon/319/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gible",
        "url": "https://pokeapi.co/api/v2/pokemon/443/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gabite",
        "url": "https://pokeapi.co/api/v2/pokemon/444/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "garchomp",
        "url": "https://pokeapi.co/api/v2/pokemon/445/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "druddigon",
        "url": "https://pokeapi.co/api/v2/pokemon/621/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "shadow-tag": {
    "id": 23,
    "name": "shadow-tag",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "While this Pokémon is in battle, opposing Pokémon cannot flee or switch out.\n\nOther Pokémon with this ability are unaffected.  Pokémon with run away can still flee.  Pokémon can still switch out with the use of a move or item.",
    "shortEffect": "Prevents opponents from fleeing or switching out.",
    "flavorText": "Prevents the foe’s escape.",
    "pokemon": [
      {
        "name": "wobbuffet",
        "url": "https://pokeapi.co/api/v2/pokemon/202/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wynaut",
        "url": "https://pokeapi.co/api/v2/pokemon/360/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gothita",
        "url": "https://pokeapi.co/api/v2/pokemon/574/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gothorita",
        "url": "https://pokeapi.co/api/v2/pokemon/575/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gothitelle",
        "url": "https://pokeapi.co/api/v2/pokemon/576/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gengar-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10038/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "illuminate": {
    "id": 35,
    "name": "illuminate",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Overworld: If the lead Pokémon has this ability, the wild encounter rate is doubled.\n\nThis ability has no effect in battle.",
    "shortEffect": "Doubles the wild encounter rate.",
    "flavorText": "Encounter rate increases.",
    "pokemon": [
      {
        "name": "staryu",
        "url": "https://pokeapi.co/api/v2/pokemon/120/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "starmie",
        "url": "https://pokeapi.co/api/v2/pokemon/121/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chinchou",
        "url": "https://pokeapi.co/api/v2/pokemon/170/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lanturn",
        "url": "https://pokeapi.co/api/v2/pokemon/171/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "volbeat",
        "url": "https://pokeapi.co/api/v2/pokemon/313/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "watchog",
        "url": "https://pokeapi.co/api/v2/pokemon/505/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "morelull",
        "url": "https://pokeapi.co/api/v2/pokemon/755/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shiinotic",
        "url": "https://pokeapi.co/api/v2/pokemon/756/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "lightning-rod": {
    "id": 31,
    "name": "lightning-rod",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "All other Pokémon's single-target electric-type moves are redirected to this Pokémon if it is an eligible target.  Other Pokémon's Electric moves raise this Pokémon's Special Attack one stage, negating any other effect on it, and cannot miss it.\n\nIf the move's intended target also has this ability, the move is not redirected.  When multiple Pokémon with this ability are possible targets for redirection, the move is redirected to the one with the highest Speed stat, or, in the case of a tie, to a random tied Pokémon.  follow me takes precedence over this ability.\n\nIf the Pokémon is a ground-type and thus immune to Electric moves, its immunity prevents the Special Attack boost.",
    "shortEffect": "Redirects single-target electric moves to this Pokémon where possible.  Absorbs Electric moves, raising Special Attack one stage.",
    "flavorText": "Draws electrical moves.",
    "pokemon": [
      {
        "name": "pikachu",
        "url": "https://pokeapi.co/api/v2/pokemon/25/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "raichu",
        "url": "https://pokeapi.co/api/v2/pokemon/26/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cubone",
        "url": "https://pokeapi.co/api/v2/pokemon/104/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "marowak",
        "url": "https://pokeapi.co/api/v2/pokemon/105/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rhyhorn",
        "url": "https://pokeapi.co/api/v2/pokemon/111/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rhydon",
        "url": "https://pokeapi.co/api/v2/pokemon/112/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "goldeen",
        "url": "https://pokeapi.co/api/v2/pokemon/118/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "seaking",
        "url": "https://pokeapi.co/api/v2/pokemon/119/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pichu",
        "url": "https://pokeapi.co/api/v2/pokemon/172/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "electrike",
        "url": "https://pokeapi.co/api/v2/pokemon/309/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "manectric",
        "url": "https://pokeapi.co/api/v2/pokemon/310/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "plusle",
        "url": "https://pokeapi.co/api/v2/pokemon/311/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rhyperior",
        "url": "https://pokeapi.co/api/v2/pokemon/464/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blitzle",
        "url": "https://pokeapi.co/api/v2/pokemon/522/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zebstrika",
        "url": "https://pokeapi.co/api/v2/pokemon/523/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "togedemaru",
        "url": "https://pokeapi.co/api/v2/pokemon/777/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pincurchin",
        "url": "https://pokeapi.co/api/v2/pokemon/871/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sceptile-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10065/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikachu-rock-star",
        "url": "https://pokeapi.co/api/v2/pokemon/10080/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-belle",
        "url": "https://pokeapi.co/api/v2/pokemon/10081/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-pop-star",
        "url": "https://pokeapi.co/api/v2/pokemon/10082/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-phd",
        "url": "https://pokeapi.co/api/v2/pokemon/10083/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-libre",
        "url": "https://pokeapi.co/api/v2/pokemon/10084/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-cosplay",
        "url": "https://pokeapi.co/api/v2/pokemon/10085/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-original-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10094/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-hoenn-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10095/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-sinnoh-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10096/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-unova-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10097/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-kalos-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10098/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-alola-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10099/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "marowak-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10115/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pikachu-partner-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10148/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "marowak-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10149/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "togedemaru-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10154/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pikachu-starter",
        "url": "https://pokeapi.co/api/v2/pokemon/10158/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-world-cap",
        "url": "https://pokeapi.co/api/v2/pokemon/10160/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikachu-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10199/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "natural-cure": {
    "id": 30,
    "name": "natural-cure",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon is cured of any major status ailment when it is switched out for another Pokémon.\n\nIf this ability is acquired during battle, the Pokémon is cured upon leaving battle before losing the temporary ability.",
    "shortEffect": "Cures any major status ailment upon switching out.",
    "flavorText": "Heals upon switching out.",
    "pokemon": [
      {
        "name": "chansey",
        "url": "https://pokeapi.co/api/v2/pokemon/113/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "staryu",
        "url": "https://pokeapi.co/api/v2/pokemon/120/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "starmie",
        "url": "https://pokeapi.co/api/v2/pokemon/121/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "corsola",
        "url": "https://pokeapi.co/api/v2/pokemon/222/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "blissey",
        "url": "https://pokeapi.co/api/v2/pokemon/242/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "celebi",
        "url": "https://pokeapi.co/api/v2/pokemon/251/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "roselia",
        "url": "https://pokeapi.co/api/v2/pokemon/315/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swablu",
        "url": "https://pokeapi.co/api/v2/pokemon/333/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "altaria",
        "url": "https://pokeapi.co/api/v2/pokemon/334/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "budew",
        "url": "https://pokeapi.co/api/v2/pokemon/406/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "roserade",
        "url": "https://pokeapi.co/api/v2/pokemon/407/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "happiny",
        "url": "https://pokeapi.co/api/v2/pokemon/440/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shaymin-land",
        "url": "https://pokeapi.co/api/v2/pokemon/492/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "phantump",
        "url": "https://pokeapi.co/api/v2/pokemon/708/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "trevenant",
        "url": "https://pokeapi.co/api/v2/pokemon/709/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "comfey",
        "url": "https://pokeapi.co/api/v2/pokemon/764/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pawmi",
        "url": "https://pokeapi.co/api/v2/pokemon/921/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pawmo",
        "url": "https://pokeapi.co/api/v2/pokemon/922/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pawmot",
        "url": "https://pokeapi.co/api/v2/pokemon/923/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "pressure": {
    "id": 46,
    "name": "pressure",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Moves targetting this Pokémon use one extra PP.\n\nThis ability stacks if multiple targets have it.  This ability still affects moves that fail or miss.  This ability does not affect ally moves that target either the entire field or just its side, nor this Pokémon's self-targetted moves; it does, however, affect single-targetted ally moves aimed at this Pokémon, ally moves that target all other Pokémon, and opponents' moves that target the entire field.  If this ability raises a move's PP cost above its remaining PP, it will use all remaining PP.\n\nWhen this Pokémon enters battle, all participating trainers are notified that it has this ability.\n\nOverworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
    "shortEffect": "Increases the PP cost of moves targetting the Pokémon by one.",
    "flavorText": "Raises foe’s PP usage.",
    "pokemon": [
      {
        "name": "aerodactyl",
        "url": "https://pokeapi.co/api/v2/pokemon/142/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "articuno",
        "url": "https://pokeapi.co/api/v2/pokemon/144/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zapdos",
        "url": "https://pokeapi.co/api/v2/pokemon/145/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "moltres",
        "url": "https://pokeapi.co/api/v2/pokemon/146/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mewtwo",
        "url": "https://pokeapi.co/api/v2/pokemon/150/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raikou",
        "url": "https://pokeapi.co/api/v2/pokemon/243/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "entei",
        "url": "https://pokeapi.co/api/v2/pokemon/244/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "suicune",
        "url": "https://pokeapi.co/api/v2/pokemon/245/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lugia",
        "url": "https://pokeapi.co/api/v2/pokemon/249/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ho-oh",
        "url": "https://pokeapi.co/api/v2/pokemon/250/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wailmer",
        "url": "https://pokeapi.co/api/v2/pokemon/320/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wailord",
        "url": "https://pokeapi.co/api/v2/pokemon/321/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dusclops",
        "url": "https://pokeapi.co/api/v2/pokemon/356/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "absol",
        "url": "https://pokeapi.co/api/v2/pokemon/359/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "deoxys-normal",
        "url": "https://pokeapi.co/api/v2/pokemon/386/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vespiquen",
        "url": "https://pokeapi.co/api/v2/pokemon/416/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spiritomb",
        "url": "https://pokeapi.co/api/v2/pokemon/442/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "weavile",
        "url": "https://pokeapi.co/api/v2/pokemon/461/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dusknoir",
        "url": "https://pokeapi.co/api/v2/pokemon/477/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dialga",
        "url": "https://pokeapi.co/api/v2/pokemon/483/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "palkia",
        "url": "https://pokeapi.co/api/v2/pokemon/484/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "giratina-altered",
        "url": "https://pokeapi.co/api/v2/pokemon/487/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pawniard",
        "url": "https://pokeapi.co/api/v2/pokemon/624/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bisharp",
        "url": "https://pokeapi.co/api/v2/pokemon/625/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kyurem",
        "url": "https://pokeapi.co/api/v2/pokemon/646/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "corviknight",
        "url": "https://pokeapi.co/api/v2/pokemon/823/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eternatus",
        "url": "https://pokeapi.co/api/v2/pokemon/890/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sneasler",
        "url": "https://pokeapi.co/api/v2/pokemon/903/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kingambit",
        "url": "https://pokeapi.co/api/v2/pokemon/983/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "deoxys-attack",
        "url": "https://pokeapi.co/api/v2/pokemon/10001/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "deoxys-defense",
        "url": "https://pokeapi.co/api/v2/pokemon/10002/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "deoxys-speed",
        "url": "https://pokeapi.co/api/v2/pokemon/10003/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eternatus-eternamax",
        "url": "https://pokeapi.co/api/v2/pokemon/10190/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "corviknight-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10212/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dialga-origin",
        "url": "https://pokeapi.co/api/v2/pokemon/10245/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "palkia-origin",
        "url": "https://pokeapi.co/api/v2/pokemon/10246/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "magnet-pull": {
    "id": 42,
    "name": "magnet-pull",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "While this Pokémon is in battle, opposing steel-type Pokémon cannot flee or switch out.\n\nPokémon with run away can still flee.  Pokémon can still switch out with the use of a move or item.\n\nOverworld: If the lead Pokémon has this ability, Steel-type Pokémon have a higher encounter rate.",
    "shortEffect": "Prevents steel opponents from fleeing or switching out.",
    "flavorText": "Traps STEEL-type POKéMON.",
    "pokemon": [
      {
        "name": "magnemite",
        "url": "https://pokeapi.co/api/v2/pokemon/81/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "magneton",
        "url": "https://pokeapi.co/api/v2/pokemon/82/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nosepass",
        "url": "https://pokeapi.co/api/v2/pokemon/299/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "magnezone",
        "url": "https://pokeapi.co/api/v2/pokemon/462/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "probopass",
        "url": "https://pokeapi.co/api/v2/pokemon/476/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "meltan",
        "url": "https://pokeapi.co/api/v2/pokemon/808/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "geodude-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10109/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "graveler-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10110/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "golem-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10111/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "oblivious": {
    "id": 12,
    "name": "oblivious",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be infatuated and is immune to captivate.\n\nIf a Pokémon is infatuated and acquires this ability, its infatuation is cleared.",
    "shortEffect": "Prevents infatuation and protects against captivate.",
    "flavorText": "Prevents attraction.",
    "pokemon": [
      {
        "name": "slowpoke",
        "url": "https://pokeapi.co/api/v2/pokemon/79/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slowbro",
        "url": "https://pokeapi.co/api/v2/pokemon/80/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lickitung",
        "url": "https://pokeapi.co/api/v2/pokemon/108/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "jynx",
        "url": "https://pokeapi.co/api/v2/pokemon/124/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slowking",
        "url": "https://pokeapi.co/api/v2/pokemon/199/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swinub",
        "url": "https://pokeapi.co/api/v2/pokemon/220/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "piloswine",
        "url": "https://pokeapi.co/api/v2/pokemon/221/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "smoochum",
        "url": "https://pokeapi.co/api/v2/pokemon/238/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "illumise",
        "url": "https://pokeapi.co/api/v2/pokemon/314/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wailmer",
        "url": "https://pokeapi.co/api/v2/pokemon/320/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wailord",
        "url": "https://pokeapi.co/api/v2/pokemon/321/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "numel",
        "url": "https://pokeapi.co/api/v2/pokemon/322/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "barboach",
        "url": "https://pokeapi.co/api/v2/pokemon/339/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "whiscash",
        "url": "https://pokeapi.co/api/v2/pokemon/340/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "feebas",
        "url": "https://pokeapi.co/api/v2/pokemon/349/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "spheal",
        "url": "https://pokeapi.co/api/v2/pokemon/363/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sealeo",
        "url": "https://pokeapi.co/api/v2/pokemon/364/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "walrein",
        "url": "https://pokeapi.co/api/v2/pokemon/365/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lickilicky",
        "url": "https://pokeapi.co/api/v2/pokemon/463/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mamoswine",
        "url": "https://pokeapi.co/api/v2/pokemon/473/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "salandit",
        "url": "https://pokeapi.co/api/v2/pokemon/757/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "salazzle",
        "url": "https://pokeapi.co/api/v2/pokemon/758/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bounsweet",
        "url": "https://pokeapi.co/api/v2/pokemon/761/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "steenee",
        "url": "https://pokeapi.co/api/v2/pokemon/762/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dondozo",
        "url": "https://pokeapi.co/api/v2/pokemon/977/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "salazzle-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10129/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "synchronize": {
    "id": 28,
    "name": "synchronize",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever this Pokémon is burned, paralyzed, or poisoned, the Pokémon who gave this Pokémon that ailment is also given the ailment.\n\nThis ability passes back bad poison when this Pokémon is badly poisoned.  This ability cannot pass on a status ailment that the Pokémon did not directly receive from another Pokémon, such as the poison from toxic spikes or the burn from a flame orb.\n\nOverworld: If the lead Pokémon has this ability, wild Pokémon have a 50% chance of having the lead Pokémon's nature, and a 50% chance of being given a random nature as usual, including the lead Pokémon's nature.  This does not work on Pokémon received outside of battle or roaming legendaries.",
    "shortEffect": "Copies burns, paralysis, and poison received onto the Pokémon that inflicted them.",
    "flavorText": "Passes on status problems.",
    "pokemon": [
      {
        "name": "abra",
        "url": "https://pokeapi.co/api/v2/pokemon/63/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kadabra",
        "url": "https://pokeapi.co/api/v2/pokemon/64/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "alakazam",
        "url": "https://pokeapi.co/api/v2/pokemon/65/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mew",
        "url": "https://pokeapi.co/api/v2/pokemon/151/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "natu",
        "url": "https://pokeapi.co/api/v2/pokemon/177/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "xatu",
        "url": "https://pokeapi.co/api/v2/pokemon/178/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "espeon",
        "url": "https://pokeapi.co/api/v2/pokemon/196/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "umbreon",
        "url": "https://pokeapi.co/api/v2/pokemon/197/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ralts",
        "url": "https://pokeapi.co/api/v2/pokemon/280/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kirlia",
        "url": "https://pokeapi.co/api/v2/pokemon/281/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gardevoir",
        "url": "https://pokeapi.co/api/v2/pokemon/282/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "munna",
        "url": "https://pokeapi.co/api/v2/pokemon/517/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "musharna",
        "url": "https://pokeapi.co/api/v2/pokemon/518/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "elgyem",
        "url": "https://pokeapi.co/api/v2/pokemon/605/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "beheeyem",
        "url": "https://pokeapi.co/api/v2/pokemon/606/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "indeedee-male",
        "url": "https://pokeapi.co/api/v2/pokemon/876/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rabsca",
        "url": "https://pokeapi.co/api/v2/pokemon/954/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "indeedee-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10186/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "pickup": {
    "id": 53,
    "name": "pickup",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "At the end of each turn, if another Pokémon consumed or Flung a held item that turn, this Pokémon picks up the item if it is not already holding one.  After each battle, this Pokémon has a 10% chance of picking up an item if it is not already holding one.\n\nThe air balloon and eject button cannot be picked up.\n\nThe items that may be found vary by game, and, since Pokémon Emerald, by the Pokémon's level.  This ability is checked after the battle ends, at which point any temporary ability changes have worn off.",
    "shortEffect": "Picks up other Pokémon's used and Flung held items.  May also pick up an item after battle.",
    "flavorText": "May pick up items.",
    "pokemon": [
      {
        "name": "meowth",
        "url": "https://pokeapi.co/api/v2/pokemon/52/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aipom",
        "url": "https://pokeapi.co/api/v2/pokemon/190/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "teddiursa",
        "url": "https://pokeapi.co/api/v2/pokemon/216/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "phanpy",
        "url": "https://pokeapi.co/api/v2/pokemon/231/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zigzagoon",
        "url": "https://pokeapi.co/api/v2/pokemon/263/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "linoone",
        "url": "https://pokeapi.co/api/v2/pokemon/264/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pachirisu",
        "url": "https://pokeapi.co/api/v2/pokemon/417/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ambipom",
        "url": "https://pokeapi.co/api/v2/pokemon/424/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "munchlax",
        "url": "https://pokeapi.co/api/v2/pokemon/446/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lillipup",
        "url": "https://pokeapi.co/api/v2/pokemon/506/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bunnelby",
        "url": "https://pokeapi.co/api/v2/pokemon/659/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "diggersby",
        "url": "https://pokeapi.co/api/v2/pokemon/660/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dedenne",
        "url": "https://pokeapi.co/api/v2/pokemon/702/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pumpkaboo-average",
        "url": "https://pokeapi.co/api/v2/pokemon/710/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gourgeist-average",
        "url": "https://pokeapi.co/api/v2/pokemon/711/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikipek",
        "url": "https://pokeapi.co/api/v2/pokemon/731/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "trumbeak",
        "url": "https://pokeapi.co/api/v2/pokemon/732/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tandemaus",
        "url": "https://pokeapi.co/api/v2/pokemon/924/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "greavard",
        "url": "https://pokeapi.co/api/v2/pokemon/971/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pumpkaboo-small",
        "url": "https://pokeapi.co/api/v2/pokemon/10027/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pumpkaboo-large",
        "url": "https://pokeapi.co/api/v2/pokemon/10028/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pumpkaboo-super",
        "url": "https://pokeapi.co/api/v2/pokemon/10029/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gourgeist-small",
        "url": "https://pokeapi.co/api/v2/pokemon/10030/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gourgeist-large",
        "url": "https://pokeapi.co/api/v2/pokemon/10031/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gourgeist-super",
        "url": "https://pokeapi.co/api/v2/pokemon/10032/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowth-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10107/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowth-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10161/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zigzagoon-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10174/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "linoone-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10175/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowth-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10200/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "tangled-feet": {
    "id": 77,
    "name": "tangled-feet",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "When this Pokémon is confused, it has twice its evasion.",
    "shortEffect": "Doubles evasion when confused.",
    "flavorText": "Raises evasion if the\nPokémon is confused.",
    "pokemon": [
      {
        "name": "pidgey",
        "url": "https://pokeapi.co/api/v2/pokemon/16/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pidgeotto",
        "url": "https://pokeapi.co/api/v2/pokemon/17/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pidgeot",
        "url": "https://pokeapi.co/api/v2/pokemon/18/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "doduo",
        "url": "https://pokeapi.co/api/v2/pokemon/84/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dodrio",
        "url": "https://pokeapi.co/api/v2/pokemon/85/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spinda",
        "url": "https://pokeapi.co/api/v2/pokemon/327/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "chatot",
        "url": "https://pokeapi.co/api/v2/pokemon/441/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mr-rime",
        "url": "https://pokeapi.co/api/v2/pokemon/866/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flamigo",
        "url": "https://pokeapi.co/api/v2/pokemon/973/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "adaptability": {
    "id": 91,
    "name": "adaptability",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon inflicts twice as much damage with moves whose types match its own, rather than the usual same-type attack bonus of 1.5×.",
    "shortEffect": "Increases the same-type attack bonus from 1.5× to 2×.",
    "flavorText": "Powers up moves of the\nsame type.",
    "pokemon": [
      {
        "name": "eevee",
        "url": "https://pokeapi.co/api/v2/pokemon/133/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "corphish",
        "url": "https://pokeapi.co/api/v2/pokemon/341/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "crawdaunt",
        "url": "https://pokeapi.co/api/v2/pokemon/342/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "feebas",
        "url": "https://pokeapi.co/api/v2/pokemon/349/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "porygon-z",
        "url": "https://pokeapi.co/api/v2/pokemon/474/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "basculin-red-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/550/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "skrelp",
        "url": "https://pokeapi.co/api/v2/pokemon/690/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dragalge",
        "url": "https://pokeapi.co/api/v2/pokemon/691/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "yungoos",
        "url": "https://pokeapi.co/api/v2/pokemon/734/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gumshoos",
        "url": "https://pokeapi.co/api/v2/pokemon/735/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "basculegion-male",
        "url": "https://pokeapi.co/api/v2/pokemon/902/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "basculin-blue-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/10016/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lucario-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10059/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "beedrill-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10090/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gumshoos-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10121/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "eevee-starter",
        "url": "https://pokeapi.co/api/v2/pokemon/10159/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "eevee-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10205/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "basculin-white-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/10247/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "basculegion-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10248/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "iron-fist": {
    "id": 89,
    "name": "iron-fist",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Moves flagged as being punch-based have 1.2× their base power for this Pokémon.\n\nsucker punch is not flagged as punch-based; its original, Japanese name only means \"surprise attack\".",
    "shortEffect": "Strengthens punch-based moves to 1.2× their power.",
    "flavorText": "Boosts the power of\npunching moves.",
    "pokemon": [
      {
        "name": "hitmonchan",
        "url": "https://pokeapi.co/api/v2/pokemon/107/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ledian",
        "url": "https://pokeapi.co/api/v2/pokemon/166/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "chimchar",
        "url": "https://pokeapi.co/api/v2/pokemon/390/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "monferno",
        "url": "https://pokeapi.co/api/v2/pokemon/391/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "infernape",
        "url": "https://pokeapi.co/api/v2/pokemon/392/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "timburr",
        "url": "https://pokeapi.co/api/v2/pokemon/532/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gurdurr",
        "url": "https://pokeapi.co/api/v2/pokemon/533/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "conkeldurr",
        "url": "https://pokeapi.co/api/v2/pokemon/534/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golett",
        "url": "https://pokeapi.co/api/v2/pokemon/622/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "golurk",
        "url": "https://pokeapi.co/api/v2/pokemon/623/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pancham",
        "url": "https://pokeapi.co/api/v2/pokemon/674/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pangoro",
        "url": "https://pokeapi.co/api/v2/pokemon/675/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "crabrawler",
        "url": "https://pokeapi.co/api/v2/pokemon/739/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "crabominable",
        "url": "https://pokeapi.co/api/v2/pokemon/740/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "melmetal",
        "url": "https://pokeapi.co/api/v2/pokemon/809/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pawmi",
        "url": "https://pokeapi.co/api/v2/pokemon/921/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pawmo",
        "url": "https://pokeapi.co/api/v2/pokemon/922/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pawmot",
        "url": "https://pokeapi.co/api/v2/pokemon/923/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "melmetal-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10208/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "no-guard": {
    "id": 99,
    "name": "no-guard",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Moves used by or against this Pokémon never miss.\n\nOne-hit KO moves are unaffected.  Moves affected by this ability can hit Pokémon during the preparation turn of moves like dig or fly.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is doubled.",
    "shortEffect": "Ensures all moves used by and against the Pokémon hit.",
    "flavorText": "Ensures the Pokémon and\nits foe’s attacks land.",
    "pokemon": [
      {
        "name": "machop",
        "url": "https://pokeapi.co/api/v2/pokemon/66/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "machoke",
        "url": "https://pokeapi.co/api/v2/pokemon/67/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "machamp",
        "url": "https://pokeapi.co/api/v2/pokemon/68/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "karrablast",
        "url": "https://pokeapi.co/api/v2/pokemon/588/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golett",
        "url": "https://pokeapi.co/api/v2/pokemon/622/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golurk",
        "url": "https://pokeapi.co/api/v2/pokemon/623/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "honedge",
        "url": "https://pokeapi.co/api/v2/pokemon/679/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "doublade",
        "url": "https://pokeapi.co/api/v2/pokemon/680/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pidgeot-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10073/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lycanroc-midnight",
        "url": "https://pokeapi.co/api/v2/pokemon/10126/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "machamp-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10201/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "pure-power": {
    "id": 74,
    "name": "pure-power",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's Attack is doubled in battle.\n\nThis bonus does not count as a stat modifier.\n\nThis ability functions identically to huge power.",
    "shortEffect": "Doubles Attack in battle.",
    "flavorText": "Raises ATTACK.",
    "pokemon": [
      {
        "name": "meditite",
        "url": "https://pokeapi.co/api/v2/pokemon/307/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "medicham",
        "url": "https://pokeapi.co/api/v2/pokemon/308/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "medicham-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10054/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "cute-charm": {
    "id": 56,
    "name": "cute-charm",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being infatuated.\n\nOverworld: If the first Pokémon in the party has this ability, any wild Pokémon whose species can be either gender has a 2/3 chance of being set to the opposite gender, and a 1/3 chance of having a random gender as usual.",
    "shortEffect": "Has a 30% chance of infatuating attacking Pokémon on contact.",
    "flavorText": "Infatuates on contact.",
    "pokemon": [
      {
        "name": "clefairy",
        "url": "https://pokeapi.co/api/v2/pokemon/35/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "clefable",
        "url": "https://pokeapi.co/api/v2/pokemon/36/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "jigglypuff",
        "url": "https://pokeapi.co/api/v2/pokemon/39/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wigglytuff",
        "url": "https://pokeapi.co/api/v2/pokemon/40/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cleffa",
        "url": "https://pokeapi.co/api/v2/pokemon/173/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "igglybuff",
        "url": "https://pokeapi.co/api/v2/pokemon/174/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skitty",
        "url": "https://pokeapi.co/api/v2/pokemon/300/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "delcatty",
        "url": "https://pokeapi.co/api/v2/pokemon/301/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "milotic",
        "url": "https://pokeapi.co/api/v2/pokemon/350/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lopunny",
        "url": "https://pokeapi.co/api/v2/pokemon/428/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minccino",
        "url": "https://pokeapi.co/api/v2/pokemon/572/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cinccino",
        "url": "https://pokeapi.co/api/v2/pokemon/573/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sylveon",
        "url": "https://pokeapi.co/api/v2/pokemon/700/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "stufful",
        "url": "https://pokeapi.co/api/v2/pokemon/759/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "enamorus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/905/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "white-smoke": {
    "id": 73,
    "name": "white-smoke",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot have its stats lowered by other Pokémon.\n\nThis ability does not prevent any stat losses other than stat modifiers, such as the Speed cut from paralysis; nor self-inflicted stat drops, such as the Special Attack drop from overheat; nor opponent-triggered stat boosts, such as the Attack boost from swagger.  This Pokémon can still be passed negative stat modifiers through guard swap, heart swap, or power swap.\n\nThis ability functions identically to clear body in battle.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is halved.",
    "shortEffect": "Prevents stats from being lowered by other Pokémon.",
    "flavorText": "Prevents ability reduction.",
    "pokemon": [
      {
        "name": "torkoal",
        "url": "https://pokeapi.co/api/v2/pokemon/324/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "heatmor",
        "url": "https://pokeapi.co/api/v2/pokemon/631/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sizzlipede",
        "url": "https://pokeapi.co/api/v2/pokemon/850/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "centiskorch",
        "url": "https://pokeapi.co/api/v2/pokemon/851/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "centiskorch-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10220/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "sniper": {
    "id": 97,
    "name": "sniper",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon inflicts triple damage with critical hits, rather than the usual double damage.",
    "shortEffect": "Strengthens critical hits to inflict 3× damage rather than 2×.",
    "flavorText": "Powers up moves if they\nbecome critical hits.",
    "pokemon": [
      {
        "name": "beedrill",
        "url": "https://pokeapi.co/api/v2/pokemon/15/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spearow",
        "url": "https://pokeapi.co/api/v2/pokemon/21/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fearow",
        "url": "https://pokeapi.co/api/v2/pokemon/22/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "horsea",
        "url": "https://pokeapi.co/api/v2/pokemon/116/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "seadra",
        "url": "https://pokeapi.co/api/v2/pokemon/117/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "spinarak",
        "url": "https://pokeapi.co/api/v2/pokemon/167/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ariados",
        "url": "https://pokeapi.co/api/v2/pokemon/168/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "remoraid",
        "url": "https://pokeapi.co/api/v2/pokemon/223/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "octillery",
        "url": "https://pokeapi.co/api/v2/pokemon/224/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kingdra",
        "url": "https://pokeapi.co/api/v2/pokemon/230/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "skorupi",
        "url": "https://pokeapi.co/api/v2/pokemon/451/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drapion",
        "url": "https://pokeapi.co/api/v2/pokemon/452/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "binacle",
        "url": "https://pokeapi.co/api/v2/pokemon/688/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "barbaracle",
        "url": "https://pokeapi.co/api/v2/pokemon/689/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sobble",
        "url": "https://pokeapi.co/api/v2/pokemon/816/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drizzile",
        "url": "https://pokeapi.co/api/v2/pokemon/817/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "inteleon",
        "url": "https://pokeapi.co/api/v2/pokemon/818/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "inteleon-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10211/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "heatproof": {
    "id": 85,
    "name": "heatproof",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon takes half as much damage from fire-type moves and burns.",
    "shortEffect": "Halves damage from fire moves and burns.",
    "flavorText": "Weakens the power of\nFire-type moves.",
    "pokemon": [
      {
        "name": "bronzor",
        "url": "https://pokeapi.co/api/v2/pokemon/436/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bronzong",
        "url": "https://pokeapi.co/api/v2/pokemon/437/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rolycoly",
        "url": "https://pokeapi.co/api/v2/pokemon/837/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "poltchageist",
        "url": "https://pokeapi.co/api/v2/pokemon/1012/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sinistcha",
        "url": "https://pokeapi.co/api/v2/pokemon/1013/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "guts": {
    "id": 62,
    "name": "guts",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever this Pokémon is asleep, burned, paralyzed, or poisoned, it has 1.5× its Attack.  This Pokémon is not affected by the usual Attack cut from a burn.\n\nThis bonus does not count as a stat modifier.",
    "shortEffect": "Increases Attack to 1.5× with a major status ailment.",
    "flavorText": "Ups ATTACK if suffering.",
    "pokemon": [
      {
        "name": "rattata",
        "url": "https://pokeapi.co/api/v2/pokemon/19/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "raticate",
        "url": "https://pokeapi.co/api/v2/pokemon/20/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "machop",
        "url": "https://pokeapi.co/api/v2/pokemon/66/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "machoke",
        "url": "https://pokeapi.co/api/v2/pokemon/67/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "machamp",
        "url": "https://pokeapi.co/api/v2/pokemon/68/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flareon",
        "url": "https://pokeapi.co/api/v2/pokemon/136/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "heracross",
        "url": "https://pokeapi.co/api/v2/pokemon/214/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ursaring",
        "url": "https://pokeapi.co/api/v2/pokemon/217/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tyrogue",
        "url": "https://pokeapi.co/api/v2/pokemon/236/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "larvitar",
        "url": "https://pokeapi.co/api/v2/pokemon/246/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "taillow",
        "url": "https://pokeapi.co/api/v2/pokemon/276/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swellow",
        "url": "https://pokeapi.co/api/v2/pokemon/277/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "makuhita",
        "url": "https://pokeapi.co/api/v2/pokemon/296/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hariyama",
        "url": "https://pokeapi.co/api/v2/pokemon/297/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shinx",
        "url": "https://pokeapi.co/api/v2/pokemon/403/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "luxio",
        "url": "https://pokeapi.co/api/v2/pokemon/404/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "luxray",
        "url": "https://pokeapi.co/api/v2/pokemon/405/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "timburr",
        "url": "https://pokeapi.co/api/v2/pokemon/532/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gurdurr",
        "url": "https://pokeapi.co/api/v2/pokemon/533/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "conkeldurr",
        "url": "https://pokeapi.co/api/v2/pokemon/534/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "throh",
        "url": "https://pokeapi.co/api/v2/pokemon/538/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "obstagoon",
        "url": "https://pokeapi.co/api/v2/pokemon/862/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ursaluna",
        "url": "https://pokeapi.co/api/v2/pokemon/901/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "squawkabilly-green-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/931/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "machamp-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10201/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "squawkabilly-blue-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10260/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "steadfast": {
    "id": 80,
    "name": "steadfast",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Whenever this Pokémon flinches, its Speed rises one stage.",
    "shortEffect": "Raises Speed one stage upon flinching.",
    "flavorText": "Raises Speed each time\nthe Pokémon flinches.",
    "pokemon": [
      {
        "name": "machop",
        "url": "https://pokeapi.co/api/v2/pokemon/66/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "machoke",
        "url": "https://pokeapi.co/api/v2/pokemon/67/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "machamp",
        "url": "https://pokeapi.co/api/v2/pokemon/68/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "scyther",
        "url": "https://pokeapi.co/api/v2/pokemon/123/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tyrogue",
        "url": "https://pokeapi.co/api/v2/pokemon/236/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hitmontop",
        "url": "https://pokeapi.co/api/v2/pokemon/237/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "riolu",
        "url": "https://pokeapi.co/api/v2/pokemon/447/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lucario",
        "url": "https://pokeapi.co/api/v2/pokemon/448/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gallade",
        "url": "https://pokeapi.co/api/v2/pokemon/475/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rockruff",
        "url": "https://pokeapi.co/api/v2/pokemon/744/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lycanroc-midday",
        "url": "https://pokeapi.co/api/v2/pokemon/745/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dubwool",
        "url": "https://pokeapi.co/api/v2/pokemon/832/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sirfetchd",
        "url": "https://pokeapi.co/api/v2/pokemon/865/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mewtwo-mega-x",
        "url": "https://pokeapi.co/api/v2/pokemon/10043/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "farfetchd-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10166/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "machamp-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10201/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "normalize": {
    "id": 96,
    "name": "normalize",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon's moves all act as if they were normal-type.\n\nMoves that inflict typeless damage do so as usual.  Moves of variable type, such as hidden power, are affected.  They otherwise work as usual, however; weather ball, for example, is always forced to be Normal, but it still has doubled power and looks different during weather.\n\nAs thunder wave is prevented by immunities, unlike most non-damaging moves, it does not affect ghost-type Pokémon under the effect of this ability.",
    "shortEffect": "Makes the Pokémon's moves all act normal-type.",
    "flavorText": "All the Pokémon’s moves\nbecome the Normal type.",
    "pokemon": [
      {
        "name": "skitty",
        "url": "https://pokeapi.co/api/v2/pokemon/300/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "delcatty",
        "url": "https://pokeapi.co/api/v2/pokemon/301/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "snow-cloak": {
    "id": 81,
    "name": "snow-cloak",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "During hail, this Pokémon has 1.25× its evasion, and it does not take hail damage regardless of type.\n\nThe evasion bonus does not count as a stat modifier.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is halved in snow.",
    "shortEffect": "Increases evasion to 1.25× during hail.  Protects against hail damage.",
    "flavorText": "Raises evasion in a\nhailstorm.",
    "pokemon": [
      {
        "name": "articuno",
        "url": "https://pokeapi.co/api/v2/pokemon/144/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swinub",
        "url": "https://pokeapi.co/api/v2/pokemon/220/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "piloswine",
        "url": "https://pokeapi.co/api/v2/pokemon/221/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "glaceon",
        "url": "https://pokeapi.co/api/v2/pokemon/471/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mamoswine",
        "url": "https://pokeapi.co/api/v2/pokemon/473/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "froslass",
        "url": "https://pokeapi.co/api/v2/pokemon/478/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vanillite",
        "url": "https://pokeapi.co/api/v2/pokemon/582/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "vanillish",
        "url": "https://pokeapi.co/api/v2/pokemon/583/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "cubchoo",
        "url": "https://pokeapi.co/api/v2/pokemon/613/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "beartic",
        "url": "https://pokeapi.co/api/v2/pokemon/614/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cetoddle",
        "url": "https://pokeapi.co/api/v2/pokemon/974/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sandshrew-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10101/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandslash-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10102/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vulpix-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10103/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ninetales-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10104/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "motor-drive": {
    "id": 78,
    "name": "motor-drive",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Whenever an electric-type move hits this Pokémon, its Speed rises one stage, negating any other effect on it.\n\nThis ability will not take effect if this Pokémon is immune to Electric moves.  Electric moves will ignore this Pokémon's substitute.\n\nThis effect includes non-damaging moves, i.e. thunder wave.",
    "shortEffect": "Absorbs electric moves, raising Speed one stage.",
    "flavorText": "Raises Speed if hit by an\nElectric-type move.",
    "pokemon": [
      {
        "name": "electivire",
        "url": "https://pokeapi.co/api/v2/pokemon/466/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blitzle",
        "url": "https://pokeapi.co/api/v2/pokemon/522/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "zebstrika",
        "url": "https://pokeapi.co/api/v2/pokemon/523/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "emolga",
        "url": "https://pokeapi.co/api/v2/pokemon/587/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "plus": {
    "id": 57,
    "name": "plus",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon has 1.5× its Special Attack if any friendly Pokémon has plus or minus.\n\nThis bonus does not count as a stat modifier.  If either ability is disabled by gastro acid, both lose their effect.",
    "shortEffect": "Increases Special Attack to 1.5× when a friendly Pokémon has plus or minus.",
    "flavorText": "Powers up with MINUS.",
    "pokemon": [
      {
        "name": "mareep",
        "url": "https://pokeapi.co/api/v2/pokemon/179/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "flaaffy",
        "url": "https://pokeapi.co/api/v2/pokemon/180/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ampharos",
        "url": "https://pokeapi.co/api/v2/pokemon/181/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "plusle",
        "url": "https://pokeapi.co/api/v2/pokemon/311/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "klink",
        "url": "https://pokeapi.co/api/v2/pokemon/599/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "klang",
        "url": "https://pokeapi.co/api/v2/pokemon/600/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "klinklang",
        "url": "https://pokeapi.co/api/v2/pokemon/601/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dedenne",
        "url": "https://pokeapi.co/api/v2/pokemon/702/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "toxtricity-amped",
        "url": "https://pokeapi.co/api/v2/pokemon/849/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxtricity-amped-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10219/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "liquid-ooze": {
    "id": 64,
    "name": "liquid-ooze",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever a Pokémon would heal after hitting this Pokémon with a leeching move like absorb, it instead loses as many HP as it would usually gain.\n\ndream eater is unaffected.",
    "shortEffect": "Damages opponents using leeching moves for as much as they would heal.",
    "flavorText": "Draining causes injury.",
    "pokemon": [
      {
        "name": "tentacool",
        "url": "https://pokeapi.co/api/v2/pokemon/72/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tentacruel",
        "url": "https://pokeapi.co/api/v2/pokemon/73/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gulpin",
        "url": "https://pokeapi.co/api/v2/pokemon/316/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swalot",
        "url": "https://pokeapi.co/api/v2/pokemon/317/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "minus": {
    "id": 58,
    "name": "minus",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon has 1.5× its Special Attack if any friendly Pokémon has plus or minus.\n\nThis bonus does not count as a stat modifier.  If either ability is disabled by gastro acid, both lose their effect.",
    "shortEffect": "Increases Special Attack to 1.5× when a friendly Pokémon has plus or minus.",
    "flavorText": "Powers up with PLUS.",
    "pokemon": [
      {
        "name": "electrike",
        "url": "https://pokeapi.co/api/v2/pokemon/309/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "manectric",
        "url": "https://pokeapi.co/api/v2/pokemon/310/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "minun",
        "url": "https://pokeapi.co/api/v2/pokemon/312/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "klink",
        "url": "https://pokeapi.co/api/v2/pokemon/599/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "klang",
        "url": "https://pokeapi.co/api/v2/pokemon/600/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "klinklang",
        "url": "https://pokeapi.co/api/v2/pokemon/601/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxtricity-low-key",
        "url": "https://pokeapi.co/api/v2/pokemon/10184/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxtricity-low-key-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10228/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "torrent": {
    "id": 67,
    "name": "torrent",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "When this Pokémon has 1/3 or less of its HP remaining, its water-type moves inflict 1.5× as much regular damage.",
    "shortEffect": "Strengthens water moves to inflict 1.5× damage at 1/3 max HP or less.",
    "flavorText": "Ups WATER moves in a pinch.",
    "pokemon": [
      {
        "name": "squirtle",
        "url": "https://pokeapi.co/api/v2/pokemon/7/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wartortle",
        "url": "https://pokeapi.co/api/v2/pokemon/8/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blastoise",
        "url": "https://pokeapi.co/api/v2/pokemon/9/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "totodile",
        "url": "https://pokeapi.co/api/v2/pokemon/158/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "croconaw",
        "url": "https://pokeapi.co/api/v2/pokemon/159/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "feraligatr",
        "url": "https://pokeapi.co/api/v2/pokemon/160/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mudkip",
        "url": "https://pokeapi.co/api/v2/pokemon/258/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "marshtomp",
        "url": "https://pokeapi.co/api/v2/pokemon/259/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swampert",
        "url": "https://pokeapi.co/api/v2/pokemon/260/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "piplup",
        "url": "https://pokeapi.co/api/v2/pokemon/393/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "prinplup",
        "url": "https://pokeapi.co/api/v2/pokemon/394/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "empoleon",
        "url": "https://pokeapi.co/api/v2/pokemon/395/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "oshawott",
        "url": "https://pokeapi.co/api/v2/pokemon/501/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dewott",
        "url": "https://pokeapi.co/api/v2/pokemon/502/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "samurott",
        "url": "https://pokeapi.co/api/v2/pokemon/503/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "panpour",
        "url": "https://pokeapi.co/api/v2/pokemon/515/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "simipour",
        "url": "https://pokeapi.co/api/v2/pokemon/516/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "froakie",
        "url": "https://pokeapi.co/api/v2/pokemon/656/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "frogadier",
        "url": "https://pokeapi.co/api/v2/pokemon/657/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "greninja",
        "url": "https://pokeapi.co/api/v2/pokemon/658/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "popplio",
        "url": "https://pokeapi.co/api/v2/pokemon/728/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "brionne",
        "url": "https://pokeapi.co/api/v2/pokemon/729/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "primarina",
        "url": "https://pokeapi.co/api/v2/pokemon/730/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sobble",
        "url": "https://pokeapi.co/api/v2/pokemon/816/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drizzile",
        "url": "https://pokeapi.co/api/v2/pokemon/817/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "inteleon",
        "url": "https://pokeapi.co/api/v2/pokemon/818/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "quaxly",
        "url": "https://pokeapi.co/api/v2/pokemon/912/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "quaxwell",
        "url": "https://pokeapi.co/api/v2/pokemon/913/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "quaquaval",
        "url": "https://pokeapi.co/api/v2/pokemon/914/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blastoise-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10197/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "inteleon-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10211/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "samurott-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10236/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "hyper-cutter": {
    "id": 52,
    "name": "hyper-cutter",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's Attack cannot be lowered by other Pokémon.\n\nThis ability does not prevent any Attack losses other than stat modifiers, such as the Attack cut from a burn.  This Pokémon can still be passed negative Attack modifiers through heart swap or power swap.",
    "shortEffect": "Prevents Attack from being lowered by other Pokémon.",
    "flavorText": "Prevents ATTACK reduction.",
    "pokemon": [
      {
        "name": "krabby",
        "url": "https://pokeapi.co/api/v2/pokemon/98/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kingler",
        "url": "https://pokeapi.co/api/v2/pokemon/99/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pinsir",
        "url": "https://pokeapi.co/api/v2/pokemon/127/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gligar",
        "url": "https://pokeapi.co/api/v2/pokemon/207/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mawile",
        "url": "https://pokeapi.co/api/v2/pokemon/303/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "trapinch",
        "url": "https://pokeapi.co/api/v2/pokemon/328/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "corphish",
        "url": "https://pokeapi.co/api/v2/pokemon/341/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "crawdaunt",
        "url": "https://pokeapi.co/api/v2/pokemon/342/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gliscor",
        "url": "https://pokeapi.co/api/v2/pokemon/472/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "crabrawler",
        "url": "https://pokeapi.co/api/v2/pokemon/739/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "crabominable",
        "url": "https://pokeapi.co/api/v2/pokemon/740/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kingler-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10203/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "shell-armor": {
    "id": 75,
    "name": "shell-armor",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Moves cannot score critical hits against this Pokémon.\n\nThis ability functions identically to battle armor.",
    "shortEffect": "Protects against critical hits.",
    "flavorText": "Blocks critical hits.",
    "pokemon": [
      {
        "name": "shellder",
        "url": "https://pokeapi.co/api/v2/pokemon/90/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cloyster",
        "url": "https://pokeapi.co/api/v2/pokemon/91/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "krabby",
        "url": "https://pokeapi.co/api/v2/pokemon/98/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kingler",
        "url": "https://pokeapi.co/api/v2/pokemon/99/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lapras",
        "url": "https://pokeapi.co/api/v2/pokemon/131/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "omanyte",
        "url": "https://pokeapi.co/api/v2/pokemon/138/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "omastar",
        "url": "https://pokeapi.co/api/v2/pokemon/139/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "torkoal",
        "url": "https://pokeapi.co/api/v2/pokemon/324/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "corphish",
        "url": "https://pokeapi.co/api/v2/pokemon/341/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "crawdaunt",
        "url": "https://pokeapi.co/api/v2/pokemon/342/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "clamperl",
        "url": "https://pokeapi.co/api/v2/pokemon/366/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "turtwig",
        "url": "https://pokeapi.co/api/v2/pokemon/387/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grotle",
        "url": "https://pokeapi.co/api/v2/pokemon/388/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "torterra",
        "url": "https://pokeapi.co/api/v2/pokemon/389/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oshawott",
        "url": "https://pokeapi.co/api/v2/pokemon/501/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dewott",
        "url": "https://pokeapi.co/api/v2/pokemon/502/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "samurott",
        "url": "https://pokeapi.co/api/v2/pokemon/503/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dwebble",
        "url": "https://pokeapi.co/api/v2/pokemon/557/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "crustle",
        "url": "https://pokeapi.co/api/v2/pokemon/558/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "escavalier",
        "url": "https://pokeapi.co/api/v2/pokemon/589/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shelmet",
        "url": "https://pokeapi.co/api/v2/pokemon/616/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "turtonator",
        "url": "https://pokeapi.co/api/v2/pokemon/776/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chewtle",
        "url": "https://pokeapi.co/api/v2/pokemon/833/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drednaw",
        "url": "https://pokeapi.co/api/v2/pokemon/834/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "klawf",
        "url": "https://pokeapi.co/api/v2/pokemon/950/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "slowbro-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10071/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kingler-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10203/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lapras-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10204/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drednaw-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10214/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sliggoo-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10241/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "goodra-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10242/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "skill-link": {
    "id": 92,
    "name": "skill-link",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon always hits five times with two-to-five-hit moves, such as icicle spear.  It also bypasses the accuracy checks on triple kick's second and third hits.",
    "shortEffect": "Extends two-to-five-hit moves and triple kick to their full length every time.",
    "flavorText": "Increases the frequency\nof multi-strike moves.",
    "pokemon": [
      {
        "name": "shellder",
        "url": "https://pokeapi.co/api/v2/pokemon/90/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "cloyster",
        "url": "https://pokeapi.co/api/v2/pokemon/91/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "aipom",
        "url": "https://pokeapi.co/api/v2/pokemon/190/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ambipom",
        "url": "https://pokeapi.co/api/v2/pokemon/424/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "minccino",
        "url": "https://pokeapi.co/api/v2/pokemon/572/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cinccino",
        "url": "https://pokeapi.co/api/v2/pokemon/573/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pikipek",
        "url": "https://pokeapi.co/api/v2/pokemon/731/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "trumbeak",
        "url": "https://pokeapi.co/api/v2/pokemon/732/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toucannon",
        "url": "https://pokeapi.co/api/v2/pokemon/733/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "heracross-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10047/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "swarm": {
    "id": 68,
    "name": "swarm",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "When this Pokémon has 1/3 or less of its HP remaining, its bug-type moves inflict 1.5× as much regular damage.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is increased.",
    "shortEffect": "Strengthens bug moves to inflict 1.5× damage at 1/3 max HP or less.",
    "flavorText": "Ups BUG moves in a pinch.",
    "pokemon": [
      {
        "name": "beedrill",
        "url": "https://pokeapi.co/api/v2/pokemon/15/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scyther",
        "url": "https://pokeapi.co/api/v2/pokemon/123/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ledyba",
        "url": "https://pokeapi.co/api/v2/pokemon/165/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ledian",
        "url": "https://pokeapi.co/api/v2/pokemon/166/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spinarak",
        "url": "https://pokeapi.co/api/v2/pokemon/167/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ariados",
        "url": "https://pokeapi.co/api/v2/pokemon/168/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scizor",
        "url": "https://pokeapi.co/api/v2/pokemon/212/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "heracross",
        "url": "https://pokeapi.co/api/v2/pokemon/214/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "beautifly",
        "url": "https://pokeapi.co/api/v2/pokemon/267/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "volbeat",
        "url": "https://pokeapi.co/api/v2/pokemon/313/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kricketune",
        "url": "https://pokeapi.co/api/v2/pokemon/402/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mothim",
        "url": "https://pokeapi.co/api/v2/pokemon/414/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sewaddle",
        "url": "https://pokeapi.co/api/v2/pokemon/540/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "leavanny",
        "url": "https://pokeapi.co/api/v2/pokemon/542/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venipede",
        "url": "https://pokeapi.co/api/v2/pokemon/543/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "whirlipede",
        "url": "https://pokeapi.co/api/v2/pokemon/544/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "scolipede",
        "url": "https://pokeapi.co/api/v2/pokemon/545/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "karrablast",
        "url": "https://pokeapi.co/api/v2/pokemon/588/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "escavalier",
        "url": "https://pokeapi.co/api/v2/pokemon/589/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "joltik",
        "url": "https://pokeapi.co/api/v2/pokemon/595/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "galvantula",
        "url": "https://pokeapi.co/api/v2/pokemon/596/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "durant",
        "url": "https://pokeapi.co/api/v2/pokemon/632/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "larvesta",
        "url": "https://pokeapi.co/api/v2/pokemon/636/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "volcarona",
        "url": "https://pokeapi.co/api/v2/pokemon/637/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grubbin",
        "url": "https://pokeapi.co/api/v2/pokemon/736/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blipbug",
        "url": "https://pokeapi.co/api/v2/pokemon/824/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dottler",
        "url": "https://pokeapi.co/api/v2/pokemon/825/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "orbeetle",
        "url": "https://pokeapi.co/api/v2/pokemon/826/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kleavor",
        "url": "https://pokeapi.co/api/v2/pokemon/900/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nymble",
        "url": "https://pokeapi.co/api/v2/pokemon/919/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lokix",
        "url": "https://pokeapi.co/api/v2/pokemon/920/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "orbeetle-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10213/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "forecast": {
    "id": 59,
    "name": "forecast",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "During rain, strong sunlight, or hail, this Pokémon's type changes to water, fire, or ice, respectively, and its form changes to match.\n\nThis ability has no effect for any Pokémon other than castform.\n\nIf the weather ends or becomes anything that does not trigger this ability, or a Pokémon with air lock or cloud nine enters battle, this Pokémon's type and form revert to their default.  If this ability is lost or disabled, this Pokémon cannot change its current type and form until it regains its ability.",
    "shortEffect": "Changes castform's type and form to match the weather.",
    "flavorText": "Changes with the weather.",
    "pokemon": [
      {
        "name": "castform",
        "url": "https://pokeapi.co/api/v2/pokemon/351/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "castform-sunny",
        "url": "https://pokeapi.co/api/v2/pokemon/10013/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "castform-rainy",
        "url": "https://pokeapi.co/api/v2/pokemon/10014/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "castform-snowy",
        "url": "https://pokeapi.co/api/v2/pokemon/10015/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "gluttony": {
    "id": 82,
    "name": "gluttony",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon eats any held Berry triggered by low HP when it falls below 50% of its HP, regardless of the Berry's usual threshold.",
    "shortEffect": "Makes the Pokémon eat any held Berry triggered by low HP below 1/2 its max HP.",
    "flavorText": "Encourages the early use\nof a held Berry.",
    "pokemon": [
      {
        "name": "bellsprout",
        "url": "https://pokeapi.co/api/v2/pokemon/69/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "weepinbell",
        "url": "https://pokeapi.co/api/v2/pokemon/70/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "victreebel",
        "url": "https://pokeapi.co/api/v2/pokemon/71/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "snorlax",
        "url": "https://pokeapi.co/api/v2/pokemon/143/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shuckle",
        "url": "https://pokeapi.co/api/v2/pokemon/213/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "zigzagoon",
        "url": "https://pokeapi.co/api/v2/pokemon/263/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "linoone",
        "url": "https://pokeapi.co/api/v2/pokemon/264/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gulpin",
        "url": "https://pokeapi.co/api/v2/pokemon/316/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swalot",
        "url": "https://pokeapi.co/api/v2/pokemon/317/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spoink",
        "url": "https://pokeapi.co/api/v2/pokemon/325/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grumpig",
        "url": "https://pokeapi.co/api/v2/pokemon/326/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "munchlax",
        "url": "https://pokeapi.co/api/v2/pokemon/446/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pansage",
        "url": "https://pokeapi.co/api/v2/pokemon/511/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "simisage",
        "url": "https://pokeapi.co/api/v2/pokemon/512/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pansear",
        "url": "https://pokeapi.co/api/v2/pokemon/513/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "simisear",
        "url": "https://pokeapi.co/api/v2/pokemon/514/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "panpour",
        "url": "https://pokeapi.co/api/v2/pokemon/515/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "simipour",
        "url": "https://pokeapi.co/api/v2/pokemon/516/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "heatmor",
        "url": "https://pokeapi.co/api/v2/pokemon/631/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skwovet",
        "url": "https://pokeapi.co/api/v2/pokemon/819/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "greedent",
        "url": "https://pokeapi.co/api/v2/pokemon/820/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "applin",
        "url": "https://pokeapi.co/api/v2/pokemon/840/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "flapple",
        "url": "https://pokeapi.co/api/v2/pokemon/841/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "appletun",
        "url": "https://pokeapi.co/api/v2/pokemon/842/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lechonk",
        "url": "https://pokeapi.co/api/v2/pokemon/915/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "oinkologne-male",
        "url": "https://pokeapi.co/api/v2/pokemon/916/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dipplin",
        "url": "https://pokeapi.co/api/v2/pokemon/1011/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rattata-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10091/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raticate-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10092/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raticate-totem-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10093/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grimer-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10112/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "muk-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10113/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "slowpoke-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10164/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zigzagoon-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10174/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "linoone-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10175/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "snorlax-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10206/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "flapple-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10216/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "appletun-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10217/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "oinkologne-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10254/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "dry-skin": {
    "id": 87,
    "name": "dry-skin",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon takes 1/8 of its maximum HP in damage after each turn during strong sunlight, but it heals for 1/8 of its HP each turn during rain.  This Pokémon takes 1.25× as much damage from fire-type moves, but whenever a water move hits it, it heals for 1/4 its maximum HP instead.",
    "shortEffect": "Causes 1/8 max HP in damage each turn during strong sunlight, but heals for 1/8 max HP during rain.  Increases damage from fire moves to 1.25×, but absorbs water moves, healing for 1/4 max HP.",
    "flavorText": "Reduces HP if it is hot.\nWater restores HP.",
    "pokemon": [
      {
        "name": "paras",
        "url": "https://pokeapi.co/api/v2/pokemon/46/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "parasect",
        "url": "https://pokeapi.co/api/v2/pokemon/47/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "jynx",
        "url": "https://pokeapi.co/api/v2/pokemon/124/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "croagunk",
        "url": "https://pokeapi.co/api/v2/pokemon/453/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxicroak",
        "url": "https://pokeapi.co/api/v2/pokemon/454/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "helioptile",
        "url": "https://pokeapi.co/api/v2/pokemon/694/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "heliolisk",
        "url": "https://pokeapi.co/api/v2/pokemon/695/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "marvel-scale": {
    "id": 63,
    "name": "marvel-scale",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Whenever this Pokémon has a major status ailment, it has 1.5× its Defense.\n\nThis bonus does not count as a stat modifier.",
    "shortEffect": "Increases Defense to 1.5× with a major status ailment.",
    "flavorText": "Ups DEFENSE if suffering.",
    "pokemon": [
      {
        "name": "dratini",
        "url": "https://pokeapi.co/api/v2/pokemon/147/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dragonair",
        "url": "https://pokeapi.co/api/v2/pokemon/148/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "milotic",
        "url": "https://pokeapi.co/api/v2/pokemon/350/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "hustle": {
    "id": 55,
    "name": "hustle",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's physical moves do 1.5× as much regular damage, but have 0.8× their usual accuracy.\n\nSpecial moves are unaffected.  Moves that do set damage, such as seismic toss, have their accuracy affected, but not their damage.\n\nOverworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
    "shortEffect": "Strengthens physical moves to inflict 1.5× damage, but decreases their accuracy to 0.8×.",
    "flavorText": "Trades accuracy for power.",
    "pokemon": [
      {
        "name": "rattata",
        "url": "https://pokeapi.co/api/v2/pokemon/19/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "raticate",
        "url": "https://pokeapi.co/api/v2/pokemon/20/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nidoran-f",
        "url": "https://pokeapi.co/api/v2/pokemon/29/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nidorina",
        "url": "https://pokeapi.co/api/v2/pokemon/30/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nidoran-m",
        "url": "https://pokeapi.co/api/v2/pokemon/32/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nidorino",
        "url": "https://pokeapi.co/api/v2/pokemon/33/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "togepi",
        "url": "https://pokeapi.co/api/v2/pokemon/175/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "togetic",
        "url": "https://pokeapi.co/api/v2/pokemon/176/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "corsola",
        "url": "https://pokeapi.co/api/v2/pokemon/222/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "remoraid",
        "url": "https://pokeapi.co/api/v2/pokemon/223/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "delibird",
        "url": "https://pokeapi.co/api/v2/pokemon/225/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "combee",
        "url": "https://pokeapi.co/api/v2/pokemon/415/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "togekiss",
        "url": "https://pokeapi.co/api/v2/pokemon/468/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "darumaka",
        "url": "https://pokeapi.co/api/v2/pokemon/554/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rufflet",
        "url": "https://pokeapi.co/api/v2/pokemon/627/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "durant",
        "url": "https://pokeapi.co/api/v2/pokemon/632/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "deino",
        "url": "https://pokeapi.co/api/v2/pokemon/633/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zweilous",
        "url": "https://pokeapi.co/api/v2/pokemon/634/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flapple",
        "url": "https://pokeapi.co/api/v2/pokemon/841/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dracozolt",
        "url": "https://pokeapi.co/api/v2/pokemon/880/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "squawkabilly-green-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/931/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rattata-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10091/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "raticate-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10092/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "raticate-totem-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10093/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "darumaka-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10176/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flapple-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10216/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lilligant-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10237/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "squawkabilly-blue-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10260/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "squawkabilly-yellow-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10261/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "squawkabilly-white-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10262/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "sticky-hold": {
    "id": 60,
    "name": "sticky-hold",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon's hold item cannot be removed by other Pokémon.\n\nDamaging moves that would remove this Pokémon's item can still inflict damage against this Pokémon, e.g. knock off or pluck.  This Pokémon can still use moves that involve the loss of its own item, e.g. fling or trick.\n\nOverworld: If the lead Pokémon has this ability, the encounter rate while fishing is increased.",
    "shortEffect": "Prevents a held item from being removed by other Pokémon.",
    "flavorText": "Prevents item theft.",
    "pokemon": [
      {
        "name": "grimer",
        "url": "https://pokeapi.co/api/v2/pokemon/88/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "muk",
        "url": "https://pokeapi.co/api/v2/pokemon/89/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gulpin",
        "url": "https://pokeapi.co/api/v2/pokemon/316/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "swalot",
        "url": "https://pokeapi.co/api/v2/pokemon/317/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shellos",
        "url": "https://pokeapi.co/api/v2/pokemon/422/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gastrodon",
        "url": "https://pokeapi.co/api/v2/pokemon/423/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "trubbish",
        "url": "https://pokeapi.co/api/v2/pokemon/568/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "accelgor",
        "url": "https://pokeapi.co/api/v2/pokemon/617/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dipplin",
        "url": "https://pokeapi.co/api/v2/pokemon/1011/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hydrapple",
        "url": "https://pokeapi.co/api/v2/pokemon/1019/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "magic-guard": {
    "id": 98,
    "name": "magic-guard",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon is immune to damage not directly caused by a move.\n\nFor example, this Pokémon takes no damage from from weather, recoil, status ailments, or spikes, but it still suffers from the Attack cut when burned, and a life orb will still power up this Pokémon's moves without damaging it.  Anything that directly depends on such damage will also not happen; for example, leech seed will neither hurt this Pokémon nor heal the opponent, and Pokémon with a jaboca berry or rowap berry will not consume the berry when hit by this Pokémon.\n\nThe following are unaffected: struggle, pain split (whether used by or against this Pokémon), belly drum, substitute, curse, moves that knock the user out, and damage from confusion.\n\nThis Pokémon will neither lose nor regain HP if it drains HP from a Pokémon with liquid ooze.\n\nIf this Pokémon is badly poisoned, the poison counter is still increased each turn; if the Pokémon loses this ability, it will begin taking as much damage as it would be if it had been taking increasing damage each turn.",
    "shortEffect": "Protects against damage not directly caused by a move.",
    "flavorText": "The Pokémon only takes\ndamage from attacks.",
    "pokemon": [
      {
        "name": "clefairy",
        "url": "https://pokeapi.co/api/v2/pokemon/35/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "clefable",
        "url": "https://pokeapi.co/api/v2/pokemon/36/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "abra",
        "url": "https://pokeapi.co/api/v2/pokemon/63/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kadabra",
        "url": "https://pokeapi.co/api/v2/pokemon/64/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "alakazam",
        "url": "https://pokeapi.co/api/v2/pokemon/65/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cleffa",
        "url": "https://pokeapi.co/api/v2/pokemon/173/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sigilyph",
        "url": "https://pokeapi.co/api/v2/pokemon/561/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "solosis",
        "url": "https://pokeapi.co/api/v2/pokemon/577/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "duosion",
        "url": "https://pokeapi.co/api/v2/pokemon/578/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "reuniclus",
        "url": "https://pokeapi.co/api/v2/pokemon/579/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "download": {
    "id": 88,
    "name": "download",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "When this Pokémon enters battle, its Attack or Special Attack, whichever corresponds to its opponents' weaker total defensive stat, rises one stage.  In the event of a tie, Special Attack is raised.\n\nThis ability also takes effect when acquired during a battle.",
    "shortEffect": "Raises the attack stat corresponding to the opponents' weaker defense one stage upon entering battle.",
    "flavorText": "Adjusts power according\nto the foe’s ability.",
    "pokemon": [
      {
        "name": "porygon",
        "url": "https://pokeapi.co/api/v2/pokemon/137/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "porygon2",
        "url": "https://pokeapi.co/api/v2/pokemon/233/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "porygon-z",
        "url": "https://pokeapi.co/api/v2/pokemon/474/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "genesect",
        "url": "https://pokeapi.co/api/v2/pokemon/649/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "vital-spirit": {
    "id": 72,
    "name": "vital-spirit",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot be asleep.\n\nThis causes rest to fail altogether.  If a Pokémon is asleep and acquires this ability, it will immediately wake up; this includes when regaining a lost ability upon leaving battle.\n\nThis ability functions identically to insomnia in battle.\n\nOverworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
    "shortEffect": "Prevents sleep.",
    "flavorText": "Prevents sleep.",
    "pokemon": [
      {
        "name": "mankey",
        "url": "https://pokeapi.co/api/v2/pokemon/56/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "primeape",
        "url": "https://pokeapi.co/api/v2/pokemon/57/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "electabuzz",
        "url": "https://pokeapi.co/api/v2/pokemon/125/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "magmar",
        "url": "https://pokeapi.co/api/v2/pokemon/126/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "delibird",
        "url": "https://pokeapi.co/api/v2/pokemon/225/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tyrogue",
        "url": "https://pokeapi.co/api/v2/pokemon/236/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "elekid",
        "url": "https://pokeapi.co/api/v2/pokemon/239/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "magby",
        "url": "https://pokeapi.co/api/v2/pokemon/240/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vigoroth",
        "url": "https://pokeapi.co/api/v2/pokemon/288/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "electivire",
        "url": "https://pokeapi.co/api/v2/pokemon/466/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "magmortar",
        "url": "https://pokeapi.co/api/v2/pokemon/467/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lillipup",
        "url": "https://pokeapi.co/api/v2/pokemon/506/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rockruff",
        "url": "https://pokeapi.co/api/v2/pokemon/744/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "annihilape",
        "url": "https://pokeapi.co/api/v2/pokemon/979/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lycanroc-midnight",
        "url": "https://pokeapi.co/api/v2/pokemon/10126/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mr-mime-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10168/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "shed-skin": {
    "id": 61,
    "name": "shed-skin",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "After each turn, this Pokémon has a 33% of being cured of any major status ailment.",
    "shortEffect": "Has a 33% chance of curing any major status ailment after each turn.",
    "flavorText": "Heals the body by shedding.",
    "pokemon": [
      {
        "name": "metapod",
        "url": "https://pokeapi.co/api/v2/pokemon/11/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kakuna",
        "url": "https://pokeapi.co/api/v2/pokemon/14/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ekans",
        "url": "https://pokeapi.co/api/v2/pokemon/23/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "arbok",
        "url": "https://pokeapi.co/api/v2/pokemon/24/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dratini",
        "url": "https://pokeapi.co/api/v2/pokemon/147/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dragonair",
        "url": "https://pokeapi.co/api/v2/pokemon/148/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pupitar",
        "url": "https://pokeapi.co/api/v2/pokemon/247/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "silcoon",
        "url": "https://pokeapi.co/api/v2/pokemon/266/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cascoon",
        "url": "https://pokeapi.co/api/v2/pokemon/268/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "seviper",
        "url": "https://pokeapi.co/api/v2/pokemon/336/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kricketot",
        "url": "https://pokeapi.co/api/v2/pokemon/401/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "burmy",
        "url": "https://pokeapi.co/api/v2/pokemon/412/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scraggy",
        "url": "https://pokeapi.co/api/v2/pokemon/559/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scrafty",
        "url": "https://pokeapi.co/api/v2/pokemon/560/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "karrablast",
        "url": "https://pokeapi.co/api/v2/pokemon/588/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "spewpa",
        "url": "https://pokeapi.co/api/v2/pokemon/665/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "silicobra",
        "url": "https://pokeapi.co/api/v2/pokemon/843/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sandaconda",
        "url": "https://pokeapi.co/api/v2/pokemon/844/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rellor",
        "url": "https://pokeapi.co/api/v2/pokemon/953/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cyclizar",
        "url": "https://pokeapi.co/api/v2/pokemon/967/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandaconda-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10218/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "drought": {
    "id": 70,
    "name": "drought",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "The weather changes to strong sunlight when this Pokémon enters battle and does not end unless cancelled by another weather condition.\n\nIf multiple Pokémon with this ability, drizzle, sand stream, or snow warning are sent out at the same time, the abilities will activate in order of Speed, respecting trick room.  Each ability's weather will cancel the previous weather, and only the weather summoned by the slowest of the Pokémon will stay.",
    "shortEffect": "Summons strong sunlight that lasts indefinitely upon entering battle.",
    "flavorText": "Summons sunlight in battle.",
    "pokemon": [
      {
        "name": "vulpix",
        "url": "https://pokeapi.co/api/v2/pokemon/37/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ninetales",
        "url": "https://pokeapi.co/api/v2/pokemon/38/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "torkoal",
        "url": "https://pokeapi.co/api/v2/pokemon/324/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "groudon",
        "url": "https://pokeapi.co/api/v2/pokemon/383/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "charizard-mega-y",
        "url": "https://pokeapi.co/api/v2/pokemon/10035/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "air-lock": {
    "id": 76,
    "name": "air-lock",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "While this Pokémon is in battle, weather can still be in play, but will not have any of its effects.\n\nThis ability functions identically to cloud nine.",
    "shortEffect": "Negates all effects of weather, but does not prevent the weather itself.",
    "flavorText": "Negates weather effects.",
    "pokemon": [
      {
        "name": "rayquaza",
        "url": "https://pokeapi.co/api/v2/pokemon/384/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "quick-feet": {
    "id": 95,
    "name": "quick-feet",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Whenever this Pokémon has a major status ailment, it has 1.5× its Speed.  This Pokémon is not affected by the usual Speed cut from paralysis.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is halved.",
    "shortEffect": "Increases Speed to 1.5× with a major status ailment.",
    "flavorText": "Boosts Speed if there is a\nstatus problem.",
    "pokemon": [
      {
        "name": "jolteon",
        "url": "https://pokeapi.co/api/v2/pokemon/135/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "granbull",
        "url": "https://pokeapi.co/api/v2/pokemon/210/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "teddiursa",
        "url": "https://pokeapi.co/api/v2/pokemon/216/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ursaring",
        "url": "https://pokeapi.co/api/v2/pokemon/217/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "poochyena",
        "url": "https://pokeapi.co/api/v2/pokemon/261/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mightyena",
        "url": "https://pokeapi.co/api/v2/pokemon/262/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "zigzagoon",
        "url": "https://pokeapi.co/api/v2/pokemon/263/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "linoone",
        "url": "https://pokeapi.co/api/v2/pokemon/264/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shroomish",
        "url": "https://pokeapi.co/api/v2/pokemon/285/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "zigzagoon-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10174/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "linoone-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10175/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "overgrow": {
    "id": 65,
    "name": "overgrow",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.",
    "shortEffect": "Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less.",
    "flavorText": "Powers up Grass-type\nmoves in a pinch.",
    "pokemon": [
      {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon/3/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chikorita",
        "url": "https://pokeapi.co/api/v2/pokemon/152/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bayleef",
        "url": "https://pokeapi.co/api/v2/pokemon/153/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meganium",
        "url": "https://pokeapi.co/api/v2/pokemon/154/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "treecko",
        "url": "https://pokeapi.co/api/v2/pokemon/252/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grovyle",
        "url": "https://pokeapi.co/api/v2/pokemon/253/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sceptile",
        "url": "https://pokeapi.co/api/v2/pokemon/254/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "turtwig",
        "url": "https://pokeapi.co/api/v2/pokemon/387/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grotle",
        "url": "https://pokeapi.co/api/v2/pokemon/388/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "torterra",
        "url": "https://pokeapi.co/api/v2/pokemon/389/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "snivy",
        "url": "https://pokeapi.co/api/v2/pokemon/495/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "servine",
        "url": "https://pokeapi.co/api/v2/pokemon/496/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "serperior",
        "url": "https://pokeapi.co/api/v2/pokemon/497/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pansage",
        "url": "https://pokeapi.co/api/v2/pokemon/511/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "simisage",
        "url": "https://pokeapi.co/api/v2/pokemon/512/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "chespin",
        "url": "https://pokeapi.co/api/v2/pokemon/650/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "quilladin",
        "url": "https://pokeapi.co/api/v2/pokemon/651/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chesnaught",
        "url": "https://pokeapi.co/api/v2/pokemon/652/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rowlet",
        "url": "https://pokeapi.co/api/v2/pokemon/722/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dartrix",
        "url": "https://pokeapi.co/api/v2/pokemon/723/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "decidueye",
        "url": "https://pokeapi.co/api/v2/pokemon/724/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grookey",
        "url": "https://pokeapi.co/api/v2/pokemon/810/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "thwackey",
        "url": "https://pokeapi.co/api/v2/pokemon/811/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rillaboom",
        "url": "https://pokeapi.co/api/v2/pokemon/812/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sprigatito",
        "url": "https://pokeapi.co/api/v2/pokemon/906/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "floragato",
        "url": "https://pokeapi.co/api/v2/pokemon/907/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowscarada",
        "url": "https://pokeapi.co/api/v2/pokemon/908/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "venusaur-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10195/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rillaboom-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10209/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "decidueye-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10244/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "simple": {
    "id": 86,
    "name": "simple",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Each stage of this Pokémon's stat modifiers acts as two stages.  These doubled stages are still limited to a minimum of -6 and a maximum of 6.\n\nThis Pokémon can still accumulate less than -3 or more than 3 stages of stat modifiers, even though the extra ones have no effect after doubling.",
    "shortEffect": "Doubles the Pokémon's stat modifiers.  These doubled modifiers are still capped at -6 or 6 stages.",
    "flavorText": "The Pokémon is prone to\nwild stat changes.",
    "pokemon": [
      {
        "name": "numel",
        "url": "https://pokeapi.co/api/v2/pokemon/322/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bidoof",
        "url": "https://pokeapi.co/api/v2/pokemon/399/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bibarel",
        "url": "https://pokeapi.co/api/v2/pokemon/400/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "woobat",
        "url": "https://pokeapi.co/api/v2/pokemon/527/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swoobat",
        "url": "https://pokeapi.co/api/v2/pokemon/528/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "hydration": {
    "id": 93,
    "name": "hydration",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon is cured of any major status ailment after each turn during rain.",
    "shortEffect": "Cures any major status ailment after each turn during rain.",
    "flavorText": "Heals status problems if\nit is raining.",
    "pokemon": [
      {
        "name": "seel",
        "url": "https://pokeapi.co/api/v2/pokemon/86/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dewgong",
        "url": "https://pokeapi.co/api/v2/pokemon/87/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lapras",
        "url": "https://pokeapi.co/api/v2/pokemon/131/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vaporeon",
        "url": "https://pokeapi.co/api/v2/pokemon/134/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "smoochum",
        "url": "https://pokeapi.co/api/v2/pokemon/238/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wingull",
        "url": "https://pokeapi.co/api/v2/pokemon/278/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "barboach",
        "url": "https://pokeapi.co/api/v2/pokemon/339/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "whiscash",
        "url": "https://pokeapi.co/api/v2/pokemon/340/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gorebyss",
        "url": "https://pokeapi.co/api/v2/pokemon/368/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "luvdisc",
        "url": "https://pokeapi.co/api/v2/pokemon/370/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "phione",
        "url": "https://pokeapi.co/api/v2/pokemon/489/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "manaphy",
        "url": "https://pokeapi.co/api/v2/pokemon/490/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tympole",
        "url": "https://pokeapi.co/api/v2/pokemon/535/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "palpitoad",
        "url": "https://pokeapi.co/api/v2/pokemon/536/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ducklett",
        "url": "https://pokeapi.co/api/v2/pokemon/580/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swanna",
        "url": "https://pokeapi.co/api/v2/pokemon/581/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "alomomola",
        "url": "https://pokeapi.co/api/v2/pokemon/594/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shelmet",
        "url": "https://pokeapi.co/api/v2/pokemon/616/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "accelgor",
        "url": "https://pokeapi.co/api/v2/pokemon/617/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "goomy",
        "url": "https://pokeapi.co/api/v2/pokemon/704/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sliggoo",
        "url": "https://pokeapi.co/api/v2/pokemon/705/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "goodra",
        "url": "https://pokeapi.co/api/v2/pokemon/706/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lapras-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10204/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "anger-point": {
    "id": 83,
    "name": "anger-point",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Whenever this Pokémon receives a critical hit, its Attack rises to the maximum of 6 stages.\n\nThis ability will still take effect if the critical hit is received by a substitute.",
    "shortEffect": "Raises Attack to the maximum of six stages upon receiving a critical hit.",
    "flavorText": "Raises Attack upon taking\na critical hit.",
    "pokemon": [
      {
        "name": "mankey",
        "url": "https://pokeapi.co/api/v2/pokemon/56/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "primeape",
        "url": "https://pokeapi.co/api/v2/pokemon/57/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tauros",
        "url": "https://pokeapi.co/api/v2/pokemon/128/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "camerupt",
        "url": "https://pokeapi.co/api/v2/pokemon/323/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sandile",
        "url": "https://pokeapi.co/api/v2/pokemon/551/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "krokorok",
        "url": "https://pokeapi.co/api/v2/pokemon/552/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "krookodile",
        "url": "https://pokeapi.co/api/v2/pokemon/553/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "crabrawler",
        "url": "https://pokeapi.co/api/v2/pokemon/739/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "crabominable",
        "url": "https://pokeapi.co/api/v2/pokemon/740/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tauros-paldea-combat-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10250/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tauros-paldea-blaze-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10251/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tauros-paldea-aqua-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10252/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "arena-trap": {
    "id": 71,
    "name": "arena-trap",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "While this Pokémon is in battle, opposing Pokémon cannot flee or switch out.  flying-type Pokémon and Pokémon in the air, e.g. due to levitate or magnet rise, are unaffected.\n\nPokémon with run away can still flee.  Pokémon can still switch out with the use of a move or item.\n\nOverworld: If the lead Pokémon has this ability, the wild encounter rate is doubled.",
    "shortEffect": "Prevents opponents from fleeing or switching out.  Eluded by flying-types and Pokémon in the air.",
    "flavorText": "Prevents fleeing.",
    "pokemon": [
      {
        "name": "diglett",
        "url": "https://pokeapi.co/api/v2/pokemon/50/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dugtrio",
        "url": "https://pokeapi.co/api/v2/pokemon/51/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "trapinch",
        "url": "https://pokeapi.co/api/v2/pokemon/328/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "poison-heal": {
    "id": 90,
    "name": "poison-heal",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "If this Pokémon is poisoned, it will heal for 1/8 of its maximum HP after each turn rather than taking damage.  This includes bad poison.",
    "shortEffect": "Heals for 1/8 max HP after each turn when poisoned in place of damage.",
    "flavorText": "Restores HP if the\nPokémon is poisoned.",
    "pokemon": [
      {
        "name": "shroomish",
        "url": "https://pokeapi.co/api/v2/pokemon/285/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "breloom",
        "url": "https://pokeapi.co/api/v2/pokemon/286/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gliscor",
        "url": "https://pokeapi.co/api/v2/pokemon/472/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "rivalry": {
    "id": 79,
    "name": "rivalry",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon inflicts 1.25× as much regular damage against Pokémon of the same gender and 0.75× as much regular damage against Pokémon of the opposite gender.\n\nIf either Pokémon is genderless, damage is unaffected.",
    "shortEffect": "Increases damage inflicted to 1.25× against Pokémon of the same gender, but decreases damage to 0.75× against the opposite gender.",
    "flavorText": "Raises Attack if the foe\nis of the same gender.",
    "pokemon": [
      {
        "name": "nidoran-f",
        "url": "https://pokeapi.co/api/v2/pokemon/29/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "nidorina",
        "url": "https://pokeapi.co/api/v2/pokemon/30/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "nidoqueen",
        "url": "https://pokeapi.co/api/v2/pokemon/31/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "nidoran-m",
        "url": "https://pokeapi.co/api/v2/pokemon/32/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "nidorino",
        "url": "https://pokeapi.co/api/v2/pokemon/33/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "nidoking",
        "url": "https://pokeapi.co/api/v2/pokemon/34/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "beautifly",
        "url": "https://pokeapi.co/api/v2/pokemon/267/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shinx",
        "url": "https://pokeapi.co/api/v2/pokemon/403/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "luxio",
        "url": "https://pokeapi.co/api/v2/pokemon/404/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "luxray",
        "url": "https://pokeapi.co/api/v2/pokemon/405/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pidove",
        "url": "https://pokeapi.co/api/v2/pokemon/519/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tranquill",
        "url": "https://pokeapi.co/api/v2/pokemon/520/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "unfezant",
        "url": "https://pokeapi.co/api/v2/pokemon/521/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "axew",
        "url": "https://pokeapi.co/api/v2/pokemon/610/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fraxure",
        "url": "https://pokeapi.co/api/v2/pokemon/611/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "haxorus",
        "url": "https://pokeapi.co/api/v2/pokemon/612/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "litleo",
        "url": "https://pokeapi.co/api/v2/pokemon/667/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pyroar",
        "url": "https://pokeapi.co/api/v2/pokemon/668/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "rock-head": {
    "id": 69,
    "name": "rock-head",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon does not receive recoil damage from its recoil moves.\n\nstruggle's recoil is unaffected.  This ability does not prevent crash damage from missing with jump kick or high jump kick.",
    "shortEffect": "Protects against recoil damage.",
    "flavorText": "Protects the Pokémon from recoil damage.",
    "pokemon": [
      {
        "name": "geodude",
        "url": "https://pokeapi.co/api/v2/pokemon/74/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "graveler",
        "url": "https://pokeapi.co/api/v2/pokemon/75/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "golem",
        "url": "https://pokeapi.co/api/v2/pokemon/76/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "onix",
        "url": "https://pokeapi.co/api/v2/pokemon/95/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cubone",
        "url": "https://pokeapi.co/api/v2/pokemon/104/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "marowak",
        "url": "https://pokeapi.co/api/v2/pokemon/105/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rhyhorn",
        "url": "https://pokeapi.co/api/v2/pokemon/111/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rhydon",
        "url": "https://pokeapi.co/api/v2/pokemon/112/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "aerodactyl",
        "url": "https://pokeapi.co/api/v2/pokemon/142/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sudowoodo",
        "url": "https://pokeapi.co/api/v2/pokemon/185/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "steelix",
        "url": "https://pokeapi.co/api/v2/pokemon/208/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aron",
        "url": "https://pokeapi.co/api/v2/pokemon/304/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lairon",
        "url": "https://pokeapi.co/api/v2/pokemon/305/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "aggron",
        "url": "https://pokeapi.co/api/v2/pokemon/306/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "relicanth",
        "url": "https://pokeapi.co/api/v2/pokemon/369/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bagon",
        "url": "https://pokeapi.co/api/v2/pokemon/371/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shelgon",
        "url": "https://pokeapi.co/api/v2/pokemon/372/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bonsly",
        "url": "https://pokeapi.co/api/v2/pokemon/438/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tyrantrum",
        "url": "https://pokeapi.co/api/v2/pokemon/697/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "basculin-blue-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/10016/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "marowak-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10115/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "marowak-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10149/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "growlithe-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10229/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arcanine-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10230/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "keen-eye": {
    "id": 51,
    "name": "keen-eye",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "This Pokémon cannot have its accuracy lowered.\n\nThis ability does not prevent any accuracy losses other than stat modifiers, such as the accuracy cut from fog; nor does it prevent other Pokémon's evasion from making this Pokémon's moves less accurate.  This Pokémon can still be passed negative accuracy modifiers through heart swap.\n\nOverworld: If the first Pokémon in the party has this ability, any random encounter with a Pokémon five or more levels lower than it has a 50% chance of being skipped.",
    "shortEffect": "Prevents accuracy from being lowered.",
    "flavorText": "Prevents loss of accuracy.",
    "pokemon": [
      {
        "name": "pidgey",
        "url": "https://pokeapi.co/api/v2/pokemon/16/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pidgeotto",
        "url": "https://pokeapi.co/api/v2/pokemon/17/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pidgeot",
        "url": "https://pokeapi.co/api/v2/pokemon/18/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spearow",
        "url": "https://pokeapi.co/api/v2/pokemon/21/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fearow",
        "url": "https://pokeapi.co/api/v2/pokemon/22/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "farfetchd",
        "url": "https://pokeapi.co/api/v2/pokemon/83/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hitmonchan",
        "url": "https://pokeapi.co/api/v2/pokemon/107/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sentret",
        "url": "https://pokeapi.co/api/v2/pokemon/161/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "furret",
        "url": "https://pokeapi.co/api/v2/pokemon/162/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hoothoot",
        "url": "https://pokeapi.co/api/v2/pokemon/163/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "noctowl",
        "url": "https://pokeapi.co/api/v2/pokemon/164/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sneasel",
        "url": "https://pokeapi.co/api/v2/pokemon/215/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "skarmory",
        "url": "https://pokeapi.co/api/v2/pokemon/227/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wingull",
        "url": "https://pokeapi.co/api/v2/pokemon/278/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pelipper",
        "url": "https://pokeapi.co/api/v2/pokemon/279/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sableye",
        "url": "https://pokeapi.co/api/v2/pokemon/302/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "starly",
        "url": "https://pokeapi.co/api/v2/pokemon/396/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "glameow",
        "url": "https://pokeapi.co/api/v2/pokemon/431/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "stunky",
        "url": "https://pokeapi.co/api/v2/pokemon/434/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "skuntank",
        "url": "https://pokeapi.co/api/v2/pokemon/435/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "chatot",
        "url": "https://pokeapi.co/api/v2/pokemon/441/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skorupi",
        "url": "https://pokeapi.co/api/v2/pokemon/451/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drapion",
        "url": "https://pokeapi.co/api/v2/pokemon/452/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "patrat",
        "url": "https://pokeapi.co/api/v2/pokemon/504/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "watchog",
        "url": "https://pokeapi.co/api/v2/pokemon/505/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "ducklett",
        "url": "https://pokeapi.co/api/v2/pokemon/580/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swanna",
        "url": "https://pokeapi.co/api/v2/pokemon/581/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rufflet",
        "url": "https://pokeapi.co/api/v2/pokemon/627/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "braviary",
        "url": "https://pokeapi.co/api/v2/pokemon/628/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "espurr",
        "url": "https://pokeapi.co/api/v2/pokemon/677/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowstic-male",
        "url": "https://pokeapi.co/api/v2/pokemon/678/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pikipek",
        "url": "https://pokeapi.co/api/v2/pokemon/731/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "trumbeak",
        "url": "https://pokeapi.co/api/v2/pokemon/732/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toucannon",
        "url": "https://pokeapi.co/api/v2/pokemon/733/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rockruff",
        "url": "https://pokeapi.co/api/v2/pokemon/744/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lycanroc-midday",
        "url": "https://pokeapi.co/api/v2/pokemon/745/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rookidee",
        "url": "https://pokeapi.co/api/v2/pokemon/821/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "corvisquire",
        "url": "https://pokeapi.co/api/v2/pokemon/822/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bombirdier",
        "url": "https://pokeapi.co/api/v2/pokemon/962/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "meowstic-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10025/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lycanroc-midnight",
        "url": "https://pokeapi.co/api/v2/pokemon/10126/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sneasel-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10235/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "braviary-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10240/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "truant": {
    "id": 54,
    "name": "truant",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "Every second turn on which this Pokémon should attempt to use a move, it will instead do nothing (\"loaf around\").\n\nLoafing around interrupts moves that take multiple turns the same way paralysis, flinching, etc do.  Most such moves, for example bide or rollout, are simply cut off upon loafing around.  Attacks with a recharge turn, such as hyper beam, do not have to recharge; attacks with a preparation turn, such as fly, do not end up being used.  Moves that are forced over multiple turns and keep going through failure, such as outrage, uproar, or any move forced by encore, keep going as usual.\n\nIf this Pokémon is confused, its confusion is not checked when loafing around; the Pokémon cannot hurt itself, and its confusion does not end or come closer to ending.\n\nIf this Pokémon attempts to move but fails, e.g. because of paralysis or gravity, it still counts as having moved and will loaf around the next turn.  If it does not attempt to move, e.g. because it is asleep or frozen, whatever it would have done will be postponed until its next attempt; that is, it will either loaf around or move as usual, depending on what it last did.\n\nThis ability cannot be changed with worry seed, but it can be disabled with gastro acid, changed with role play, or traded away with skill swap.",
    "shortEffect": "Skips every second turn.",
    "flavorText": "Moves only every two turns.",
    "pokemon": [
      {
        "name": "slakoth",
        "url": "https://pokeapi.co/api/v2/pokemon/287/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slaking",
        "url": "https://pokeapi.co/api/v2/pokemon/289/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "durant",
        "url": "https://pokeapi.co/api/v2/pokemon/632/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "unburden": {
    "id": 84,
    "name": "unburden",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "When this Pokémon uses or loses its held item, its Speed is doubled.  If it gains another item or leaves battle, this bonus is lost.\n\nThis includes when the Pokémon drops its item because of knock off.  This bonus does not count as a stat modifier.  There is no notification when this ability takes effect.",
    "shortEffect": "Doubles Speed upon using or losing a held item.",
    "flavorText": "Raises Speed if a held\nitem is used.",
    "pokemon": [
      {
        "name": "hitmonlee",
        "url": "https://pokeapi.co/api/v2/pokemon/106/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "treecko",
        "url": "https://pokeapi.co/api/v2/pokemon/252/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grovyle",
        "url": "https://pokeapi.co/api/v2/pokemon/253/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sceptile",
        "url": "https://pokeapi.co/api/v2/pokemon/254/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drifloon",
        "url": "https://pokeapi.co/api/v2/pokemon/425/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drifblim",
        "url": "https://pokeapi.co/api/v2/pokemon/426/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "purrloin",
        "url": "https://pokeapi.co/api/v2/pokemon/509/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "liepard",
        "url": "https://pokeapi.co/api/v2/pokemon/510/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "accelgor",
        "url": "https://pokeapi.co/api/v2/pokemon/617/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swirlix",
        "url": "https://pokeapi.co/api/v2/pokemon/684/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "slurpuff",
        "url": "https://pokeapi.co/api/v2/pokemon/685/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hawlucha",
        "url": "https://pokeapi.co/api/v2/pokemon/701/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "nickit",
        "url": "https://pokeapi.co/api/v2/pokemon/827/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "thievul",
        "url": "https://pokeapi.co/api/v2/pokemon/828/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sneasler",
        "url": "https://pokeapi.co/api/v2/pokemon/903/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shroodle",
        "url": "https://pokeapi.co/api/v2/pokemon/944/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grafaiai",
        "url": "https://pokeapi.co/api/v2/pokemon/945/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "blaze": {
    "id": 66,
    "name": "blaze",
    "isMainSeries": true,
    "generation": "generation-iii",
    "effect": "When this Pokémon has 1/3 or less of its HP remaining, its fire-type moves inflict 1.5× as much regular damage.",
    "shortEffect": "Strengthens fire moves to inflict 1.5× damage at 1/3 max HP or less.",
    "flavorText": "Ups FIRE moves in a pinch.",
    "pokemon": [
      {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon/5/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon/6/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cyndaquil",
        "url": "https://pokeapi.co/api/v2/pokemon/155/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "quilava",
        "url": "https://pokeapi.co/api/v2/pokemon/156/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "typhlosion",
        "url": "https://pokeapi.co/api/v2/pokemon/157/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "torchic",
        "url": "https://pokeapi.co/api/v2/pokemon/255/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "combusken",
        "url": "https://pokeapi.co/api/v2/pokemon/256/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blaziken",
        "url": "https://pokeapi.co/api/v2/pokemon/257/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "chimchar",
        "url": "https://pokeapi.co/api/v2/pokemon/390/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "monferno",
        "url": "https://pokeapi.co/api/v2/pokemon/391/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "infernape",
        "url": "https://pokeapi.co/api/v2/pokemon/392/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tepig",
        "url": "https://pokeapi.co/api/v2/pokemon/498/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pignite",
        "url": "https://pokeapi.co/api/v2/pokemon/499/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "emboar",
        "url": "https://pokeapi.co/api/v2/pokemon/500/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pansear",
        "url": "https://pokeapi.co/api/v2/pokemon/513/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "simisear",
        "url": "https://pokeapi.co/api/v2/pokemon/514/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fennekin",
        "url": "https://pokeapi.co/api/v2/pokemon/653/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "braixen",
        "url": "https://pokeapi.co/api/v2/pokemon/654/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "delphox",
        "url": "https://pokeapi.co/api/v2/pokemon/655/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "litten",
        "url": "https://pokeapi.co/api/v2/pokemon/725/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "torracat",
        "url": "https://pokeapi.co/api/v2/pokemon/726/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "incineroar",
        "url": "https://pokeapi.co/api/v2/pokemon/727/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scorbunny",
        "url": "https://pokeapi.co/api/v2/pokemon/813/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raboot",
        "url": "https://pokeapi.co/api/v2/pokemon/814/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cinderace",
        "url": "https://pokeapi.co/api/v2/pokemon/815/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fuecoco",
        "url": "https://pokeapi.co/api/v2/pokemon/909/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "crocalor",
        "url": "https://pokeapi.co/api/v2/pokemon/910/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skeledirge",
        "url": "https://pokeapi.co/api/v2/pokemon/911/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "charizard-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10196/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cinderace-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10210/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "typhlosion-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10233/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "solar-power": {
    "id": 94,
    "name": "solar-power",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "During strong sunlight, this Pokémon has 1.5× its Special Attack but takes 1/8 of its maximum HP in damage after each turn.",
    "shortEffect": "Increases Special Attack to 1.5× but costs 1/8 max HP after each turn during strong sunlight.",
    "flavorText": "Boosts Sp. Atk, but\nlowers HP in sunshine.",
    "pokemon": [
      {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon/5/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon/6/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sunkern",
        "url": "https://pokeapi.co/api/v2/pokemon/191/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sunflora",
        "url": "https://pokeapi.co/api/v2/pokemon/192/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tropius",
        "url": "https://pokeapi.co/api/v2/pokemon/357/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "helioptile",
        "url": "https://pokeapi.co/api/v2/pokemon/694/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "heliolisk",
        "url": "https://pokeapi.co/api/v2/pokemon/695/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "houndoom-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10048/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "charizard-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10196/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "stall": {
    "id": 100,
    "name": "stall",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon moves last within its priority bracket.\n\nMultiple Pokémon with this ability move in order of Speed amongst themselves.\n\nThe full incense and lagging tail take precedence over this ability; that is, Pokémon with these items move after Pokémon with this ability.  Pokémon with both this ability and one of these items are delayed as much as if they had only the item.\n\nThis ability works as usual during trick room: Pokémon with this ability will move in reverse order of Speed after Pokémon without it.",
    "shortEffect": "Makes the Pokémon move last within its move's priority bracket.",
    "flavorText": "The Pokémon moves after\neven slower foes.",
    "pokemon": [
      {
        "name": "sableye",
        "url": "https://pokeapi.co/api/v2/pokemon/302/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "klutz": {
    "id": 103,
    "name": "klutz",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "In battle, this Pokémon cannot use its held item, nor will the item have any passive effect on the battle, positive or negative.  This Pokémon also cannot use fling.\n\nThe Speed cut from the iron ball and the effort items (the macho brace, power weight, power bracer, power belt, power lens, power band, and power anklet) is unaffected.  Items that do not directly affect the battle, such as the exp share, the amulet coin, or the soothe bell, work as usual.  All held items work as usual out of battle.\n\nOther moves that use the held item, such as natural gift and switcheroo, work as usual.",
    "shortEffect": "Prevents the Pokémon from using its held item in battle.",
    "flavorText": "The Pokémon can’t use\nany held items.",
    "pokemon": [
      {
        "name": "buneary",
        "url": "https://pokeapi.co/api/v2/pokemon/427/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lopunny",
        "url": "https://pokeapi.co/api/v2/pokemon/428/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "woobat",
        "url": "https://pokeapi.co/api/v2/pokemon/527/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "swoobat",
        "url": "https://pokeapi.co/api/v2/pokemon/528/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "audino",
        "url": "https://pokeapi.co/api/v2/pokemon/531/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golett",
        "url": "https://pokeapi.co/api/v2/pokemon/622/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "golurk",
        "url": "https://pokeapi.co/api/v2/pokemon/623/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "stufful",
        "url": "https://pokeapi.co/api/v2/pokemon/759/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bewear",
        "url": "https://pokeapi.co/api/v2/pokemon/760/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxel",
        "url": "https://pokeapi.co/api/v2/pokemon/848/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fidough",
        "url": "https://pokeapi.co/api/v2/pokemon/926/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "capsakid",
        "url": "https://pokeapi.co/api/v2/pokemon/951/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "unnerve": {
    "id": 127,
    "name": "unnerve",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Opposing Pokémon cannot eat held Berries while this Pokémon is in battle.\n\nAffected Pokémon can still use bug bite or pluck to eat a target's Berry.",
    "shortEffect": "Prevents opposing Pokémon from eating held Berries.",
    "flavorText": "Makes the foe nervous and\nunable to eat Berries.",
    "pokemon": [
      {
        "name": "ekans",
        "url": "https://pokeapi.co/api/v2/pokemon/23/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arbok",
        "url": "https://pokeapi.co/api/v2/pokemon/24/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meowth",
        "url": "https://pokeapi.co/api/v2/pokemon/52/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "persian",
        "url": "https://pokeapi.co/api/v2/pokemon/53/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "aerodactyl",
        "url": "https://pokeapi.co/api/v2/pokemon/142/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mewtwo",
        "url": "https://pokeapi.co/api/v2/pokemon/150/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ursaring",
        "url": "https://pokeapi.co/api/v2/pokemon/217/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "houndour",
        "url": "https://pokeapi.co/api/v2/pokemon/228/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "houndoom",
        "url": "https://pokeapi.co/api/v2/pokemon/229/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tyranitar",
        "url": "https://pokeapi.co/api/v2/pokemon/248/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "masquerain",
        "url": "https://pokeapi.co/api/v2/pokemon/284/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vespiquen",
        "url": "https://pokeapi.co/api/v2/pokemon/416/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "joltik",
        "url": "https://pokeapi.co/api/v2/pokemon/595/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "galvantula",
        "url": "https://pokeapi.co/api/v2/pokemon/596/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "axew",
        "url": "https://pokeapi.co/api/v2/pokemon/610/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fraxure",
        "url": "https://pokeapi.co/api/v2/pokemon/611/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "haxorus",
        "url": "https://pokeapi.co/api/v2/pokemon/612/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "litleo",
        "url": "https://pokeapi.co/api/v2/pokemon/667/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pyroar",
        "url": "https://pokeapi.co/api/v2/pokemon/668/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bewear",
        "url": "https://pokeapi.co/api/v2/pokemon/760/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rookidee",
        "url": "https://pokeapi.co/api/v2/pokemon/821/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "corvisquire",
        "url": "https://pokeapi.co/api/v2/pokemon/822/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "corviknight",
        "url": "https://pokeapi.co/api/v2/pokemon/823/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "calyrex",
        "url": "https://pokeapi.co/api/v2/pokemon/898/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ursaluna",
        "url": "https://pokeapi.co/api/v2/pokemon/901/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meowth-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10161/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meowth-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10200/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "corviknight-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10212/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "moody": {
    "id": 141,
    "name": "moody",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "After each turn, one of this Pokémon's stats at random rises two stages, and another falls one stage.\n\nIf a stat is already at 6 or -6 stages, it will not be chosen to be increased or decreased, respectively.",
    "shortEffect": "Raises a random stat two stages and lowers another one stage after each turn.",
    "flavorText": "Raises one stat and\nlowers another.",
    "pokemon": [
      {
        "name": "remoraid",
        "url": "https://pokeapi.co/api/v2/pokemon/223/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "octillery",
        "url": "https://pokeapi.co/api/v2/pokemon/224/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "smeargle",
        "url": "https://pokeapi.co/api/v2/pokemon/235/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "snorunt",
        "url": "https://pokeapi.co/api/v2/pokemon/361/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "glalie",
        "url": "https://pokeapi.co/api/v2/pokemon/362/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bidoof",
        "url": "https://pokeapi.co/api/v2/pokemon/399/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bibarel",
        "url": "https://pokeapi.co/api/v2/pokemon/400/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "scovillain",
        "url": "https://pokeapi.co/api/v2/pokemon/952/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "harvest": {
    "id": 139,
    "name": "harvest",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "After each turn, if the last item this Pokémon consumed was a Berry and it is not currently holding an item, it has a 50% chance of regaining that Berry, or a 100% chance during strong sunlight.",
    "shortEffect": "Has a 50% chance of restoring a used Berry after each turn if the Pokémon has held no items in the meantime.",
    "flavorText": "May create another\nBerry after one is used.",
    "pokemon": [
      {
        "name": "exeggcute",
        "url": "https://pokeapi.co/api/v2/pokemon/102/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "exeggutor",
        "url": "https://pokeapi.co/api/v2/pokemon/103/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tropius",
        "url": "https://pokeapi.co/api/v2/pokemon/357/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "phantump",
        "url": "https://pokeapi.co/api/v2/pokemon/708/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "trevenant",
        "url": "https://pokeapi.co/api/v2/pokemon/709/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "smoliv",
        "url": "https://pokeapi.co/api/v2/pokemon/928/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dolliv",
        "url": "https://pokeapi.co/api/v2/pokemon/929/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arboliva",
        "url": "https://pokeapi.co/api/v2/pokemon/930/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "exeggutor-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10114/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "illusion": {
    "id": 149,
    "name": "illusion",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon, upon being sent out, appears to have the species, nickname, and Poké Ball of the last Pokémon in the party that is able to battle.  This illusion breaks upon being hit by a damaging move.\n\nOther damage, e.g. from weather or spikes, does not break the illusion, nor does damage done to a substitute.\n\nIf the party order becomes temporarily shuffled around as Pokémon are switched out in battle, this ability chooses the last Pokémon according to that shuffled order.",
    "shortEffect": "Takes the appearance of the last conscious party Pokémon upon being sent out until hit by a damaging move.",
    "flavorText": "Comes out disguised as\nthe Pokémon in back.",
    "pokemon": [
      {
        "name": "zorua",
        "url": "https://pokeapi.co/api/v2/pokemon/570/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zoroark",
        "url": "https://pokeapi.co/api/v2/pokemon/571/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zorua-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10238/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zoroark-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10239/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "aftermath": {
    "id": 106,
    "name": "aftermath",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "When this Pokémon is knocked out by a move that makes contact, the move's user takes 1/4 its maximum HP in damage.",
    "shortEffect": "Damages the attacker for 1/4 its max HP when knocked out by a contact move.",
    "flavorText": "Damages the foe landing\nthe finishing hit.",
    "pokemon": [
      {
        "name": "voltorb",
        "url": "https://pokeapi.co/api/v2/pokemon/100/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "electrode",
        "url": "https://pokeapi.co/api/v2/pokemon/101/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drifloon",
        "url": "https://pokeapi.co/api/v2/pokemon/425/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drifblim",
        "url": "https://pokeapi.co/api/v2/pokemon/426/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "stunky",
        "url": "https://pokeapi.co/api/v2/pokemon/434/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "skuntank",
        "url": "https://pokeapi.co/api/v2/pokemon/435/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "trubbish",
        "url": "https://pokeapi.co/api/v2/pokemon/568/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "garbodor",
        "url": "https://pokeapi.co/api/v2/pokemon/569/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "garbodor-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10207/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "voltorb-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10231/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "electrode-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10232/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "healer": {
    "id": 131,
    "name": "healer",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Friendly Pokémon next to this Pokémon in double and triple battles each have a 30% chance of being cured of any major status ailment after each turn.",
    "shortEffect": "Has a 30% chance of curing each adjacent ally of any major status ailment after each turn.",
    "flavorText": "May heal an ally’s status\nconditions.",
    "pokemon": [
      {
        "name": "chansey",
        "url": "https://pokeapi.co/api/v2/pokemon/113/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bellossom",
        "url": "https://pokeapi.co/api/v2/pokemon/182/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "blissey",
        "url": "https://pokeapi.co/api/v2/pokemon/242/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "audino",
        "url": "https://pokeapi.co/api/v2/pokemon/531/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "alomomola",
        "url": "https://pokeapi.co/api/v2/pokemon/594/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "spritzee",
        "url": "https://pokeapi.co/api/v2/pokemon/682/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aromatisse",
        "url": "https://pokeapi.co/api/v2/pokemon/683/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hatenna",
        "url": "https://pokeapi.co/api/v2/pokemon/856/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hattrem",
        "url": "https://pokeapi.co/api/v2/pokemon/857/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hatterene",
        "url": "https://pokeapi.co/api/v2/pokemon/858/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "audino-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10069/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hatterene-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10221/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "pickpocket": {
    "id": 124,
    "name": "pickpocket",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Whenever a move makes contact with this Pokémon, if it does not have a held item, it steals the attacker's held item.\n\nThis Pokémon cannot steal upon being knocked out.  It can steal if the attacker has a substitute, but cannot steal when its own Substitute is hit.  If a move hits multiple times, only the last hit triggers this ability.  If this Pokémon is wild, it cannot steal from a trained Pokémon.",
    "shortEffect": "Steals attacking Pokémon's held items on contact.",
    "flavorText": "Steals an item when hit\nby another Pokémon.",
    "pokemon": [
      {
        "name": "sneasel",
        "url": "https://pokeapi.co/api/v2/pokemon/215/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "seedot",
        "url": "https://pokeapi.co/api/v2/pokemon/273/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nuzleaf",
        "url": "https://pokeapi.co/api/v2/pokemon/274/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shiftry",
        "url": "https://pokeapi.co/api/v2/pokemon/275/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "weavile",
        "url": "https://pokeapi.co/api/v2/pokemon/461/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "binacle",
        "url": "https://pokeapi.co/api/v2/pokemon/688/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "barbaracle",
        "url": "https://pokeapi.co/api/v2/pokemon/689/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "impidimp",
        "url": "https://pokeapi.co/api/v2/pokemon/859/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "morgrem",
        "url": "https://pokeapi.co/api/v2/pokemon/860/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grimmsnarl",
        "url": "https://pokeapi.co/api/v2/pokemon/861/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shroodle",
        "url": "https://pokeapi.co/api/v2/pokemon/944/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tinkatink",
        "url": "https://pokeapi.co/api/v2/pokemon/957/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tinkatuff",
        "url": "https://pokeapi.co/api/v2/pokemon/958/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tinkaton",
        "url": "https://pokeapi.co/api/v2/pokemon/959/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grimmsnarl-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10222/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sneasel-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10235/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "cursed-body": {
    "id": 130,
    "name": "cursed-body",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Moves that hit this Pokémon have a 30% chance of being Disabled afterward.",
    "shortEffect": "Has a 30% chance of Disabling any move that hits the Pokémon.",
    "flavorText": "May disable a move used\non the Pokémon.",
    "pokemon": [
      {
        "name": "gengar",
        "url": "https://pokeapi.co/api/v2/pokemon/94/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shuppet",
        "url": "https://pokeapi.co/api/v2/pokemon/353/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "banette",
        "url": "https://pokeapi.co/api/v2/pokemon/354/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "froslass",
        "url": "https://pokeapi.co/api/v2/pokemon/478/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "frillish",
        "url": "https://pokeapi.co/api/v2/pokemon/592/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "jellicent",
        "url": "https://pokeapi.co/api/v2/pokemon/593/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sinistea",
        "url": "https://pokeapi.co/api/v2/pokemon/854/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "polteageist",
        "url": "https://pokeapi.co/api/v2/pokemon/855/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dreepy",
        "url": "https://pokeapi.co/api/v2/pokemon/885/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drakloak",
        "url": "https://pokeapi.co/api/v2/pokemon/886/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dragapult",
        "url": "https://pokeapi.co/api/v2/pokemon/887/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "marowak-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10115/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "marowak-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10149/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "corsola-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10173/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gengar-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10202/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "bad-dreams": {
    "id": 123,
    "name": "bad-dreams",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Opposing Pokémon take 1/8 of their maximum HP in damage after each turn while they are asleep.",
    "shortEffect": "Damages sleeping opponents for 1/8 their max HP after each turn.",
    "flavorText": "Reduces a sleeping foe’s\nHP.",
    "pokemon": [
      {
        "name": "darkrai",
        "url": "https://pokeapi.co/api/v2/pokemon/491/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "wonder-skin": {
    "id": 147,
    "name": "wonder-skin",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Non-damaging moves have exactly 50% base accuracy against this Pokémon.",
    "shortEffect": "Lowers incoming non-damaging moves' base accuracy to exactly 50%.",
    "flavorText": "Makes status-changing\nmoves more likely to miss.",
    "pokemon": [
      {
        "name": "venomoth",
        "url": "https://pokeapi.co/api/v2/pokemon/49/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "skitty",
        "url": "https://pokeapi.co/api/v2/pokemon/300/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "delcatty",
        "url": "https://pokeapi.co/api/v2/pokemon/301/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sigilyph",
        "url": "https://pokeapi.co/api/v2/pokemon/561/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bruxish",
        "url": "https://pokeapi.co/api/v2/pokemon/779/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "slow-start": {
    "id": 112,
    "name": "slow-start",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon's Attack and Speed are halved for five turns upon entering battle.\n\nThis ability also takes effect when acquired during battle.  If this Pokémon loses its ability before the five turns are up, its Attack and Speed return to normal; if it then regains this ability without leaving battle, its Attack and Speed are halved again, but the counter keeps counting from where it was.",
    "shortEffect": "Halves Attack and Speed for five turns upon entering battle.",
    "flavorText": "Temporarily halves Attack\nand Speed.",
    "pokemon": [
      {
        "name": "regigigas",
        "url": "https://pokeapi.co/api/v2/pokemon/486/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "varoom",
        "url": "https://pokeapi.co/api/v2/pokemon/965/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "light-metal": {
    "id": 135,
    "name": "light-metal",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon has half the usual weight for its species.",
    "shortEffect": "Halves the Pokémon's weight.",
    "flavorText": "Halves the Pokémon’s\nweight.",
    "pokemon": [
      {
        "name": "scizor",
        "url": "https://pokeapi.co/api/v2/pokemon/212/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "beldum",
        "url": "https://pokeapi.co/api/v2/pokemon/374/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "metang",
        "url": "https://pokeapi.co/api/v2/pokemon/375/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "metagross",
        "url": "https://pokeapi.co/api/v2/pokemon/376/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "registeel",
        "url": "https://pokeapi.co/api/v2/pokemon/379/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "duraludon",
        "url": "https://pokeapi.co/api/v2/pokemon/884/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "duraludon-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10225/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "anticipation": {
    "id": 107,
    "name": "anticipation",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "When this Pokémon enters battle, if one of its opponents has a move that is super effective against it, self destruct, explosion, or a one-hit knockout move, all participating trainers are notified.\n\nThe move itself is not revealed; only that there is such a move.  Moves that inflict typeless damage, such as future sight, and moves of variable type, such as hidden power, count as their listed types.  counter, metal burst, mirror coat, and one-hit KO moves to which this Pokémon is immune do not trigger this ability.",
    "shortEffect": "Notifies all trainers upon entering battle if an opponent has a super-effective move, self destruct, explosion, or a one-hit KO move.",
    "flavorText": "Senses the foe’s\ndangerous moves.",
    "pokemon": [
      {
        "name": "eevee",
        "url": "https://pokeapi.co/api/v2/pokemon/133/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "barboach",
        "url": "https://pokeapi.co/api/v2/pokemon/339/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "whiscash",
        "url": "https://pokeapi.co/api/v2/pokemon/340/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wormadam-plant",
        "url": "https://pokeapi.co/api/v2/pokemon/413/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "croagunk",
        "url": "https://pokeapi.co/api/v2/pokemon/453/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toxicroak",
        "url": "https://pokeapi.co/api/v2/pokemon/454/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ferrothorn",
        "url": "https://pokeapi.co/api/v2/pokemon/598/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hatenna",
        "url": "https://pokeapi.co/api/v2/pokemon/856/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hattrem",
        "url": "https://pokeapi.co/api/v2/pokemon/857/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hatterene",
        "url": "https://pokeapi.co/api/v2/pokemon/858/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "flittle",
        "url": "https://pokeapi.co/api/v2/pokemon/955/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wormadam-sandy",
        "url": "https://pokeapi.co/api/v2/pokemon/10004/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wormadam-trash",
        "url": "https://pokeapi.co/api/v2/pokemon/10005/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eevee-starter",
        "url": "https://pokeapi.co/api/v2/pokemon/10159/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ponyta-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10162/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rapidash-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10163/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "eevee-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10205/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hatterene-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10221/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "sand-rush": {
    "id": 146,
    "name": "sand-rush",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's Speed is doubled during a sandstorm, and it does not take sandstorm damage, regardless of type.",
    "shortEffect": "Doubles Speed during a sandstorm.  Protects against sandstorm damage.",
    "flavorText": "Boosts the Pokémon’s\nSpeed in a sandstorm.",
    "pokemon": [
      {
        "name": "sandshrew",
        "url": "https://pokeapi.co/api/v2/pokemon/27/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sandslash",
        "url": "https://pokeapi.co/api/v2/pokemon/28/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "herdier",
        "url": "https://pokeapi.co/api/v2/pokemon/507/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "stoutland",
        "url": "https://pokeapi.co/api/v2/pokemon/508/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drilbur",
        "url": "https://pokeapi.co/api/v2/pokemon/529/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "excadrill",
        "url": "https://pokeapi.co/api/v2/pokemon/530/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lycanroc-midday",
        "url": "https://pokeapi.co/api/v2/pokemon/745/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dracozolt",
        "url": "https://pokeapi.co/api/v2/pokemon/880/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dracovish",
        "url": "https://pokeapi.co/api/v2/pokemon/882/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "houndstone",
        "url": "https://pokeapi.co/api/v2/pokemon/972/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "unaware": {
    "id": 109,
    "name": "unaware",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon ignores other Pokémon's stat modifiers for the purposes of damage and accuracy calculation.\n\nEffectively, this affects modifiers of every stat except Speed.\n\nThe power of punishment and stored power is calculated as usual.  When this Pokémon hurts itself in confusion, its stat modifiers affect damage as usual.",
    "shortEffect": "Ignores other Pokémon's stat modifiers for damage and accuracy calculation.",
    "flavorText": "Ignores any change in\nability by the foe.",
    "pokemon": [
      {
        "name": "clefable",
        "url": "https://pokeapi.co/api/v2/pokemon/36/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wooper",
        "url": "https://pokeapi.co/api/v2/pokemon/194/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "quagsire",
        "url": "https://pokeapi.co/api/v2/pokemon/195/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bidoof",
        "url": "https://pokeapi.co/api/v2/pokemon/399/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bibarel",
        "url": "https://pokeapi.co/api/v2/pokemon/400/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "woobat",
        "url": "https://pokeapi.co/api/v2/pokemon/527/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swoobat",
        "url": "https://pokeapi.co/api/v2/pokemon/528/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pyukumuku",
        "url": "https://pokeapi.co/api/v2/pokemon/771/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cosmog",
        "url": "https://pokeapi.co/api/v2/pokemon/789/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fuecoco",
        "url": "https://pokeapi.co/api/v2/pokemon/909/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "crocalor",
        "url": "https://pokeapi.co/api/v2/pokemon/910/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "skeledirge",
        "url": "https://pokeapi.co/api/v2/pokemon/911/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dondozo",
        "url": "https://pokeapi.co/api/v2/pokemon/977/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "clodsire",
        "url": "https://pokeapi.co/api/v2/pokemon/980/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wooper-paldea",
        "url": "https://pokeapi.co/api/v2/pokemon/10253/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "ice-body": {
    "id": 115,
    "name": "ice-body",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon heals for 1/16 of its maximum HP after each turn during hail, and it does not take hail damage regardless of type.",
    "shortEffect": "Heals for 1/16 max HP after each turn during hail.  Protects against hail damage.",
    "flavorText": "The Pokémon regains HP in\na hailstorm.",
    "pokemon": [
      {
        "name": "seel",
        "url": "https://pokeapi.co/api/v2/pokemon/86/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dewgong",
        "url": "https://pokeapi.co/api/v2/pokemon/87/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "snorunt",
        "url": "https://pokeapi.co/api/v2/pokemon/361/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "glalie",
        "url": "https://pokeapi.co/api/v2/pokemon/362/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "spheal",
        "url": "https://pokeapi.co/api/v2/pokemon/363/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sealeo",
        "url": "https://pokeapi.co/api/v2/pokemon/364/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "walrein",
        "url": "https://pokeapi.co/api/v2/pokemon/365/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "regice",
        "url": "https://pokeapi.co/api/v2/pokemon/378/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "glaceon",
        "url": "https://pokeapi.co/api/v2/pokemon/471/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vanillite",
        "url": "https://pokeapi.co/api/v2/pokemon/582/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vanillish",
        "url": "https://pokeapi.co/api/v2/pokemon/583/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vanilluxe",
        "url": "https://pokeapi.co/api/v2/pokemon/584/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bergmite",
        "url": "https://pokeapi.co/api/v2/pokemon/712/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "avalugg",
        "url": "https://pokeapi.co/api/v2/pokemon/713/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mr-rime",
        "url": "https://pokeapi.co/api/v2/pokemon/866/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arctovish",
        "url": "https://pokeapi.co/api/v2/pokemon/883/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "frigibax",
        "url": "https://pokeapi.co/api/v2/pokemon/996/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arctibax",
        "url": "https://pokeapi.co/api/v2/pokemon/997/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "baxcalibur",
        "url": "https://pokeapi.co/api/v2/pokemon/998/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mr-mime-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10168/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "avalugg-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10243/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "technician": {
    "id": 101,
    "name": "technician",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon's moves have 1.5× their power if their base power is 60 or less.\n\nThis includes moves of variable power, such as hidden power and magnitude, when their power is 60 or less.  helping hand's power boost is taken into account for any move, as is defense curl's power boost for rollout.",
    "shortEffect": "Strengthens moves of 60 base power or less to 1.5× their power.",
    "flavorText": "Powers up the Pokémon’s\nweaker moves.",
    "pokemon": [
      {
        "name": "meowth",
        "url": "https://pokeapi.co/api/v2/pokemon/52/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "persian",
        "url": "https://pokeapi.co/api/v2/pokemon/53/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mr-mime",
        "url": "https://pokeapi.co/api/v2/pokemon/122/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "scyther",
        "url": "https://pokeapi.co/api/v2/pokemon/123/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "scizor",
        "url": "https://pokeapi.co/api/v2/pokemon/212/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "smeargle",
        "url": "https://pokeapi.co/api/v2/pokemon/235/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hitmontop",
        "url": "https://pokeapi.co/api/v2/pokemon/237/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "breloom",
        "url": "https://pokeapi.co/api/v2/pokemon/286/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kricketune",
        "url": "https://pokeapi.co/api/v2/pokemon/402/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "roserade",
        "url": "https://pokeapi.co/api/v2/pokemon/407/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ambipom",
        "url": "https://pokeapi.co/api/v2/pokemon/424/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mime-jr",
        "url": "https://pokeapi.co/api/v2/pokemon/439/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "minccino",
        "url": "https://pokeapi.co/api/v2/pokemon/572/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "cinccino",
        "url": "https://pokeapi.co/api/v2/pokemon/573/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "marshadow",
        "url": "https://pokeapi.co/api/v2/pokemon/802/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toxtricity-amped",
        "url": "https://pokeapi.co/api/v2/pokemon/849/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "clobbopus",
        "url": "https://pokeapi.co/api/v2/pokemon/852/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grapploct",
        "url": "https://pokeapi.co/api/v2/pokemon/853/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "maushold-family-of-four",
        "url": "https://pokeapi.co/api/v2/pokemon/925/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fezandipiti",
        "url": "https://pokeapi.co/api/v2/pokemon/1016/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "scizor-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10046/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowth-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10107/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "persian-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10108/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxtricity-low-key",
        "url": "https://pokeapi.co/api/v2/pokemon/10184/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meowth-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10200/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "toxtricity-amped-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10219/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "toxtricity-low-key-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10228/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "maushold-family-of-three",
        "url": "https://pokeapi.co/api/v2/pokemon/10257/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "heavy-metal": {
    "id": 134,
    "name": "heavy-metal",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon has double the usual weight for its species.",
    "shortEffect": "Doubles the Pokémon's weight.",
    "flavorText": "Doubles the Pokémon’s\nweight.",
    "pokemon": [
      {
        "name": "aron",
        "url": "https://pokeapi.co/api/v2/pokemon/304/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lairon",
        "url": "https://pokeapi.co/api/v2/pokemon/305/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "aggron",
        "url": "https://pokeapi.co/api/v2/pokemon/306/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bronzor",
        "url": "https://pokeapi.co/api/v2/pokemon/436/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bronzong",
        "url": "https://pokeapi.co/api/v2/pokemon/437/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cufant",
        "url": "https://pokeapi.co/api/v2/pokemon/878/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "copperajah",
        "url": "https://pokeapi.co/api/v2/pokemon/879/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "duraludon",
        "url": "https://pokeapi.co/api/v2/pokemon/884/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "copperajah-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10224/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "duraludon-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10225/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "overcoat": {
    "id": 142,
    "name": "overcoat",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon does not take damage from weather.",
    "shortEffect": "Protects against damage from weather.",
    "flavorText": "Protects the Pokémon from\ndamage from weather.",
    "pokemon": [
      {
        "name": "shellder",
        "url": "https://pokeapi.co/api/v2/pokemon/90/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cloyster",
        "url": "https://pokeapi.co/api/v2/pokemon/91/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pineco",
        "url": "https://pokeapi.co/api/v2/pokemon/204/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "forretress",
        "url": "https://pokeapi.co/api/v2/pokemon/205/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shelgon",
        "url": "https://pokeapi.co/api/v2/pokemon/372/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "burmy",
        "url": "https://pokeapi.co/api/v2/pokemon/412/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wormadam-plant",
        "url": "https://pokeapi.co/api/v2/pokemon/413/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sewaddle",
        "url": "https://pokeapi.co/api/v2/pokemon/540/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swadloon",
        "url": "https://pokeapi.co/api/v2/pokemon/541/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "leavanny",
        "url": "https://pokeapi.co/api/v2/pokemon/542/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "solosis",
        "url": "https://pokeapi.co/api/v2/pokemon/577/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "duosion",
        "url": "https://pokeapi.co/api/v2/pokemon/578/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "reuniclus",
        "url": "https://pokeapi.co/api/v2/pokemon/579/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "escavalier",
        "url": "https://pokeapi.co/api/v2/pokemon/589/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shelmet",
        "url": "https://pokeapi.co/api/v2/pokemon/616/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vullaby",
        "url": "https://pokeapi.co/api/v2/pokemon/629/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mandibuzz",
        "url": "https://pokeapi.co/api/v2/pokemon/630/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "jangmo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/782/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hakamo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/783/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kommo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/784/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "varoom",
        "url": "https://pokeapi.co/api/v2/pokemon/965/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "revavroom",
        "url": "https://pokeapi.co/api/v2/pokemon/966/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wormadam-sandy",
        "url": "https://pokeapi.co/api/v2/pokemon/10004/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wormadam-trash",
        "url": "https://pokeapi.co/api/v2/pokemon/10005/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kommo-o-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10146/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "enamorus-therian",
        "url": "https://pokeapi.co/api/v2/pokemon/10249/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "forewarn": {
    "id": 108,
    "name": "forewarn",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "When this Pokémon enters battle, it reveals the move with the highest base power known by any opposing Pokémon to all participating trainers.\n\nIn the event of a tie, one is chosen at random.\n\nMoves without a listed base power are assigned one as follows:\n\nPower | Moves\n----: | -----\n  160 | One-hit KO moves: fissure, guillotine, horn drill, and sheer cold\n  120 | Counter moves: counter, metal burst, and mirror coat\n   80 | Variable power or set damage: crush grip, dragon rage, electro ball, endeavor, final gambit, flail, frustration, grass knot, gyro ball, heat crash, heavy slam, hidden power, low kick, natural gift, night shade, psywave, return, reversal, seismic toss, sonic boom, trump card, and wring out\n    0 | Any such move not listed\n",
    "shortEffect": "Reveals the opponents' strongest move upon entering battle.",
    "flavorText": "Determines what moves\nthe foe has.",
    "pokemon": [
      {
        "name": "drowzee",
        "url": "https://pokeapi.co/api/v2/pokemon/96/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hypno",
        "url": "https://pokeapi.co/api/v2/pokemon/97/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "jynx",
        "url": "https://pokeapi.co/api/v2/pokemon/124/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "smoochum",
        "url": "https://pokeapi.co/api/v2/pokemon/238/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "munna",
        "url": "https://pokeapi.co/api/v2/pokemon/517/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "musharna",
        "url": "https://pokeapi.co/api/v2/pokemon/518/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "flower-gift": {
    "id": 122,
    "name": "flower-gift",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "Friendly Pokémon have 1.5× their Attack and Special Defense during strong sunlight if any friendly Pokémon has this ability.\n\nUnlike forecast, multitype, and zen mode, this ability is not tied to its Pokémon's form change; cherrim will switch between its forms even if it loses this ability.  As such, this ability also works if obtained by a Pokémon other than Cherrim.",
    "shortEffect": "Increases friendly Pokémon's Attack and Special Defense to 1.5× during strong sunlight.",
    "flavorText": "Powers up party Pokémon\nwhen it is sunny.",
    "pokemon": [
      {
        "name": "cherrim",
        "url": "https://pokeapi.co/api/v2/pokemon/421/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "scrappy": {
    "id": 113,
    "name": "scrappy",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon ignores ghost-type Pokémon's immunity to normal- and fighting-type moves.\n\nGhost Pokémon's other types affect damage as usual.",
    "shortEffect": "Lets the Pokémon's normal and fighting moves hit ghost Pokémon.",
    "flavorText": "Enables moves to hit\nGhost-type foes.",
    "pokemon": [
      {
        "name": "kangaskhan",
        "url": "https://pokeapi.co/api/v2/pokemon/115/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "miltank",
        "url": "https://pokeapi.co/api/v2/pokemon/241/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "taillow",
        "url": "https://pokeapi.co/api/v2/pokemon/276/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "swellow",
        "url": "https://pokeapi.co/api/v2/pokemon/277/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "loudred",
        "url": "https://pokeapi.co/api/v2/pokemon/294/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "exploud",
        "url": "https://pokeapi.co/api/v2/pokemon/295/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "herdier",
        "url": "https://pokeapi.co/api/v2/pokemon/507/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "stoutland",
        "url": "https://pokeapi.co/api/v2/pokemon/508/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pancham",
        "url": "https://pokeapi.co/api/v2/pokemon/674/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pangoro",
        "url": "https://pokeapi.co/api/v2/pokemon/675/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sirfetchd",
        "url": "https://pokeapi.co/api/v2/pokemon/865/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "flamigo",
        "url": "https://pokeapi.co/api/v2/pokemon/973/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lopunny-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10088/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "farfetchd-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10166/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "decidueye-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10244/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "defiant": {
    "id": 128,
    "name": "defiant",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "When any of this Pokémon's stats are lowered, its Attack rises by two stages.\n\nIf multiple stats are lowered at once, this ability takes effect with each stat lowered.",
    "shortEffect": "Raises Attack two stages upon having any stat lowered.",
    "flavorText": "When its stats are lowered\nits Attack increases.",
    "pokemon": [
      {
        "name": "mankey",
        "url": "https://pokeapi.co/api/v2/pokemon/56/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "primeape",
        "url": "https://pokeapi.co/api/v2/pokemon/57/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "farfetchd",
        "url": "https://pokeapi.co/api/v2/pokemon/83/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "purugly",
        "url": "https://pokeapi.co/api/v2/pokemon/432/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pawniard",
        "url": "https://pokeapi.co/api/v2/pokemon/624/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bisharp",
        "url": "https://pokeapi.co/api/v2/pokemon/625/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "braviary",
        "url": "https://pokeapi.co/api/v2/pokemon/628/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tornadus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/641/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "thundurus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/642/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "passimian",
        "url": "https://pokeapi.co/api/v2/pokemon/766/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "obstagoon",
        "url": "https://pokeapi.co/api/v2/pokemon/862/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "falinks",
        "url": "https://pokeapi.co/api/v2/pokemon/870/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "annihilape",
        "url": "https://pokeapi.co/api/v2/pokemon/979/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kingambit",
        "url": "https://pokeapi.co/api/v2/pokemon/983/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ogerpon",
        "url": "https://pokeapi.co/api/v2/pokemon/1017/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zapdos-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10170/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "tinted-lens": {
    "id": 110,
    "name": "tinted-lens",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon deals twice as much damage with moves that are not very effective against the target.",
    "shortEffect": "Doubles damage inflicted with not-very-effective moves.",
    "flavorText": "Powers up “not very\neffective” moves.",
    "pokemon": [
      {
        "name": "butterfree",
        "url": "https://pokeapi.co/api/v2/pokemon/12/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "venonat",
        "url": "https://pokeapi.co/api/v2/pokemon/48/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "venomoth",
        "url": "https://pokeapi.co/api/v2/pokemon/49/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hoothoot",
        "url": "https://pokeapi.co/api/v2/pokemon/163/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "noctowl",
        "url": "https://pokeapi.co/api/v2/pokemon/164/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "illumise",
        "url": "https://pokeapi.co/api/v2/pokemon/314/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mothim",
        "url": "https://pokeapi.co/api/v2/pokemon/414/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "yanmega",
        "url": "https://pokeapi.co/api/v2/pokemon/469/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sigilyph",
        "url": "https://pokeapi.co/api/v2/pokemon/561/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nymble",
        "url": "https://pokeapi.co/api/v2/pokemon/919/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lokix",
        "url": "https://pokeapi.co/api/v2/pokemon/920/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "butterfree-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10198/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "braviary-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10240/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "storm-drain": {
    "id": 114,
    "name": "storm-drain",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "All other Pokémon's single-target water-type moves are redirected to this Pokémon, if it is an eligible target.  Other Pokémon's Water moves raise this Pokémon's Special Attack one stage, negating any other effect on it, and cannot miss it.\n\nIf the move's intended target also has this ability, the move is not redirected.  When multiple Pokémon with this ability are possible targets for redirection, the move is redirected to the one with the highest Speed stat, or, in the case of a tie, to a random tied Pokémon.  follow me takes precedence over this ability.",
    "shortEffect": "Redirects single-target water moves to this Pokémon where possible.  Absorbs Water moves, raising Special Attack one stage.",
    "flavorText": "The Pokémon draws in all\nWater-type moves.",
    "pokemon": [
      {
        "name": "lileep",
        "url": "https://pokeapi.co/api/v2/pokemon/345/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cradily",
        "url": "https://pokeapi.co/api/v2/pokemon/346/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shellos",
        "url": "https://pokeapi.co/api/v2/pokemon/422/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gastrodon",
        "url": "https://pokeapi.co/api/v2/pokemon/423/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "finneon",
        "url": "https://pokeapi.co/api/v2/pokemon/456/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "lumineon",
        "url": "https://pokeapi.co/api/v2/pokemon/457/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "maractus",
        "url": "https://pokeapi.co/api/v2/pokemon/556/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tatsugiri-curly",
        "url": "https://pokeapi.co/api/v2/pokemon/978/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tatsugiri-droopy",
        "url": "https://pokeapi.co/api/v2/pokemon/10258/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tatsugiri-stretchy",
        "url": "https://pokeapi.co/api/v2/pokemon/10259/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "super-luck": {
    "id": 105,
    "name": "super-luck",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon's moves have critical hit rates one stage higher than normal.",
    "shortEffect": "Raises moves' critical hit rates one stage.",
    "flavorText": "Heightens the critical-hit\nratios of moves.",
    "pokemon": [
      {
        "name": "togepi",
        "url": "https://pokeapi.co/api/v2/pokemon/175/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "togetic",
        "url": "https://pokeapi.co/api/v2/pokemon/176/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "murkrow",
        "url": "https://pokeapi.co/api/v2/pokemon/198/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "absol",
        "url": "https://pokeapi.co/api/v2/pokemon/359/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "honchkrow",
        "url": "https://pokeapi.co/api/v2/pokemon/430/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "togekiss",
        "url": "https://pokeapi.co/api/v2/pokemon/468/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pidove",
        "url": "https://pokeapi.co/api/v2/pokemon/519/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tranquill",
        "url": "https://pokeapi.co/api/v2/pokemon/520/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "unfezant",
        "url": "https://pokeapi.co/api/v2/pokemon/521/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "honey-gather": {
    "id": 118,
    "name": "honey-gather",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon has a chance of picking up honey after each battle.  This chance starts at 5% and rises another 5% after every tenth level: 5% from level 1–10, 10% from 11–20, and so on, up to 50% from 91–100.\n\nThis ability is checked after the battle ends, at which point any temporary ability changes have worn off.",
    "shortEffect": "The Pokémon may pick up honey after battle.",
    "flavorText": "The Pokémon may gather\nHoney from somewhere.",
    "pokemon": [
      {
        "name": "teddiursa",
        "url": "https://pokeapi.co/api/v2/pokemon/216/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "combee",
        "url": "https://pokeapi.co/api/v2/pokemon/415/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cutiefly",
        "url": "https://pokeapi.co/api/v2/pokemon/742/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ribombee",
        "url": "https://pokeapi.co/api/v2/pokemon/743/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ribombee-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10150/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "reckless": {
    "id": 120,
    "name": "reckless",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon's recoil moves and crash moves have 1.2× their base power.\n\nstruggle is unaffected.\n\nThe \"crash moves\" are the moves that damage the user upon missing: jump kick and high jump kick.",
    "shortEffect": "Strengthens recoil moves to 1.2× their power.",
    "flavorText": "Powers up moves that\nhave recoil damage.",
    "pokemon": [
      {
        "name": "hitmonlee",
        "url": "https://pokeapi.co/api/v2/pokemon/106/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rhyhorn",
        "url": "https://pokeapi.co/api/v2/pokemon/111/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rhydon",
        "url": "https://pokeapi.co/api/v2/pokemon/112/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "starly",
        "url": "https://pokeapi.co/api/v2/pokemon/396/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "staravia",
        "url": "https://pokeapi.co/api/v2/pokemon/397/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "staraptor",
        "url": "https://pokeapi.co/api/v2/pokemon/398/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rhyperior",
        "url": "https://pokeapi.co/api/v2/pokemon/464/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "emboar",
        "url": "https://pokeapi.co/api/v2/pokemon/500/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "basculin-red-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/550/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mienfoo",
        "url": "https://pokeapi.co/api/v2/pokemon/619/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mienshao",
        "url": "https://pokeapi.co/api/v2/pokemon/620/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bouffalant",
        "url": "https://pokeapi.co/api/v2/pokemon/626/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "obstagoon",
        "url": "https://pokeapi.co/api/v2/pokemon/862/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "friend-guard": {
    "id": 132,
    "name": "friend-guard",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "All friendly Pokémon take 0.75× as much direct damage from moves while this Pokémon is in battle.\n\nThis effect stacks if multiple allied Pokémon have it.",
    "shortEffect": "Decreases all direct damage taken by friendly Pokémon to 0.75×.",
    "flavorText": "Reduces damage done\nto allies.",
    "pokemon": [
      {
        "name": "clefairy",
        "url": "https://pokeapi.co/api/v2/pokemon/35/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "jigglypuff",
        "url": "https://pokeapi.co/api/v2/pokemon/39/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cleffa",
        "url": "https://pokeapi.co/api/v2/pokemon/173/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "igglybuff",
        "url": "https://pokeapi.co/api/v2/pokemon/174/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "happiny",
        "url": "https://pokeapi.co/api/v2/pokemon/440/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "scatterbug",
        "url": "https://pokeapi.co/api/v2/pokemon/664/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spewpa",
        "url": "https://pokeapi.co/api/v2/pokemon/665/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vivillon",
        "url": "https://pokeapi.co/api/v2/pokemon/666/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "maushold-family-of-four",
        "url": "https://pokeapi.co/api/v2/pokemon/925/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "maushold-family-of-three",
        "url": "https://pokeapi.co/api/v2/pokemon/10257/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "contrary": {
    "id": 126,
    "name": "contrary",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Whenever this Pokémon's stats would be raised, they are instead lowered by the same amount, and vice versa.",
    "shortEffect": "Inverts stat changes.",
    "flavorText": "Makes stat changes have\nan opposite effect.",
    "pokemon": [
      {
        "name": "shuckle",
        "url": "https://pokeapi.co/api/v2/pokemon/213/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spinda",
        "url": "https://pokeapi.co/api/v2/pokemon/327/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "snivy",
        "url": "https://pokeapi.co/api/v2/pokemon/495/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "servine",
        "url": "https://pokeapi.co/api/v2/pokemon/496/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "serperior",
        "url": "https://pokeapi.co/api/v2/pokemon/497/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "inkay",
        "url": "https://pokeapi.co/api/v2/pokemon/686/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "malamar",
        "url": "https://pokeapi.co/api/v2/pokemon/687/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fomantis",
        "url": "https://pokeapi.co/api/v2/pokemon/753/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lurantis",
        "url": "https://pokeapi.co/api/v2/pokemon/754/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "enamorus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/905/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lurantis-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10128/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "leaf-guard": {
    "id": 102,
    "name": "leaf-guard",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon cannot be given a major status ailment during strong sunlight.\n\nThis ability does not heal prior status ailments.  rest will fail altogether with this ability in effect.  yawn will immediately fail if used on this Pokémon during strong sunlight, and an already-used Yawn will fail if the weather turns to strong sunlight in the meantime.",
    "shortEffect": "Protects against major status ailments during strong sunlight.",
    "flavorText": "Prevents status problems\nin sunny weather.",
    "pokemon": [
      {
        "name": "tangela",
        "url": "https://pokeapi.co/api/v2/pokemon/114/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "chikorita",
        "url": "https://pokeapi.co/api/v2/pokemon/152/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bayleef",
        "url": "https://pokeapi.co/api/v2/pokemon/153/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meganium",
        "url": "https://pokeapi.co/api/v2/pokemon/154/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hoppip",
        "url": "https://pokeapi.co/api/v2/pokemon/187/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "skiploom",
        "url": "https://pokeapi.co/api/v2/pokemon/188/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "jumpluff",
        "url": "https://pokeapi.co/api/v2/pokemon/189/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "roselia",
        "url": "https://pokeapi.co/api/v2/pokemon/315/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "budew",
        "url": "https://pokeapi.co/api/v2/pokemon/406/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tangrowth",
        "url": "https://pokeapi.co/api/v2/pokemon/465/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "leafeon",
        "url": "https://pokeapi.co/api/v2/pokemon/470/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "swadloon",
        "url": "https://pokeapi.co/api/v2/pokemon/541/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "petilil",
        "url": "https://pokeapi.co/api/v2/pokemon/548/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lilligant",
        "url": "https://pokeapi.co/api/v2/pokemon/549/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fomantis",
        "url": "https://pokeapi.co/api/v2/pokemon/753/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lurantis",
        "url": "https://pokeapi.co/api/v2/pokemon/754/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bounsweet",
        "url": "https://pokeapi.co/api/v2/pokemon/761/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "steenee",
        "url": "https://pokeapi.co/api/v2/pokemon/762/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tsareena",
        "url": "https://pokeapi.co/api/v2/pokemon/763/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zarude",
        "url": "https://pokeapi.co/api/v2/pokemon/893/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lurantis-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10128/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zarude-dada",
        "url": "https://pokeapi.co/api/v2/pokemon/10192/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lilligant-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10237/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "imposter": {
    "id": 150,
    "name": "imposter",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon transforms into a random opponent upon entering battle.  This effect is identical to the move transform.",
    "shortEffect": "Transforms upon entering battle.",
    "flavorText": "It transforms itself into\nthe Pokémon it is facing.",
    "pokemon": [
      {
        "name": "ditto",
        "url": "https://pokeapi.co/api/v2/pokemon/132/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "analytic": {
    "id": 148,
    "name": "analytic",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's moves have 1.3× their power when it moves last in a turn.\n\nfuture sight and doom desire are unaffected.",
    "shortEffect": "Strengthens moves to 1.3× their power when moving last.",
    "flavorText": "Boosts move power when\nthe Pokémon moves last.",
    "pokemon": [
      {
        "name": "magnemite",
        "url": "https://pokeapi.co/api/v2/pokemon/81/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "magneton",
        "url": "https://pokeapi.co/api/v2/pokemon/82/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "staryu",
        "url": "https://pokeapi.co/api/v2/pokemon/120/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "starmie",
        "url": "https://pokeapi.co/api/v2/pokemon/121/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "porygon",
        "url": "https://pokeapi.co/api/v2/pokemon/137/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "porygon2",
        "url": "https://pokeapi.co/api/v2/pokemon/233/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "magnezone",
        "url": "https://pokeapi.co/api/v2/pokemon/462/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "porygon-z",
        "url": "https://pokeapi.co/api/v2/pokemon/474/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "patrat",
        "url": "https://pokeapi.co/api/v2/pokemon/504/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "watchog",
        "url": "https://pokeapi.co/api/v2/pokemon/505/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "elgyem",
        "url": "https://pokeapi.co/api/v2/pokemon/605/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "beheeyem",
        "url": "https://pokeapi.co/api/v2/pokemon/606/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "telepathy": {
    "id": 140,
    "name": "telepathy",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon does not take damage from friendly Pokémon's moves, including single-target moves aimed at it.",
    "shortEffect": "Protects against friendly Pokémon's damaging moves.",
    "flavorText": "Anticipates an ally’s\nattack and dodges it.",
    "pokemon": [
      {
        "name": "wobbuffet",
        "url": "https://pokeapi.co/api/v2/pokemon/202/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ralts",
        "url": "https://pokeapi.co/api/v2/pokemon/280/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kirlia",
        "url": "https://pokeapi.co/api/v2/pokemon/281/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gardevoir",
        "url": "https://pokeapi.co/api/v2/pokemon/282/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meditite",
        "url": "https://pokeapi.co/api/v2/pokemon/307/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "medicham",
        "url": "https://pokeapi.co/api/v2/pokemon/308/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wynaut",
        "url": "https://pokeapi.co/api/v2/pokemon/360/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dialga",
        "url": "https://pokeapi.co/api/v2/pokemon/483/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "palkia",
        "url": "https://pokeapi.co/api/v2/pokemon/484/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "giratina-altered",
        "url": "https://pokeapi.co/api/v2/pokemon/487/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "munna",
        "url": "https://pokeapi.co/api/v2/pokemon/517/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "musharna",
        "url": "https://pokeapi.co/api/v2/pokemon/518/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "elgyem",
        "url": "https://pokeapi.co/api/v2/pokemon/605/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "beheeyem",
        "url": "https://pokeapi.co/api/v2/pokemon/606/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "noibat",
        "url": "https://pokeapi.co/api/v2/pokemon/714/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "noivern",
        "url": "https://pokeapi.co/api/v2/pokemon/715/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oranguru",
        "url": "https://pokeapi.co/api/v2/pokemon/765/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tapu-koko",
        "url": "https://pokeapi.co/api/v2/pokemon/785/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tapu-lele",
        "url": "https://pokeapi.co/api/v2/pokemon/786/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tapu-bulu",
        "url": "https://pokeapi.co/api/v2/pokemon/787/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tapu-fini",
        "url": "https://pokeapi.co/api/v2/pokemon/788/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "blipbug",
        "url": "https://pokeapi.co/api/v2/pokemon/824/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dottler",
        "url": "https://pokeapi.co/api/v2/pokemon/825/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "orbeetle",
        "url": "https://pokeapi.co/api/v2/pokemon/826/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rabsca",
        "url": "https://pokeapi.co/api/v2/pokemon/954/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "orbeetle-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10213/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dialga-origin",
        "url": "https://pokeapi.co/api/v2/pokemon/10245/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "palkia-origin",
        "url": "https://pokeapi.co/api/v2/pokemon/10246/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "snow-warning": {
    "id": 117,
    "name": "snow-warning",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "The weather changes to hail when this Pokémon enters battle and does not end unless cancelled by another weather condition.\n\nIf multiple Pokémon with this ability, drizzle, drought, or sand stream are sent out at the same time, the abilities will activate in order of Speed, respecting trick room.  Each ability's weather will cancel the previous weather, and only the weather summoned by the slowest of the Pokémon will stay.",
    "shortEffect": "Summons hail that lasts indefinitely upon entering battle.",
    "flavorText": "The Pokémon summons a\nhailstorm in battle.",
    "pokemon": [
      {
        "name": "snover",
        "url": "https://pokeapi.co/api/v2/pokemon/459/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "abomasnow",
        "url": "https://pokeapi.co/api/v2/pokemon/460/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vanilluxe",
        "url": "https://pokeapi.co/api/v2/pokemon/584/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "amaura",
        "url": "https://pokeapi.co/api/v2/pokemon/698/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "aurorus",
        "url": "https://pokeapi.co/api/v2/pokemon/699/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "abomasnow-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10060/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "vulpix-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10103/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ninetales-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10104/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "filter": {
    "id": 111,
    "name": "filter",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon takes 0.75× as much damage from moves that are super effective against it.\n\nThis ability functions identically to solid rock.",
    "shortEffect": "Decreases damage taken from super-effective moves by 1/4.",
    "flavorText": "Powers down super­\neffective moves.",
    "pokemon": [
      {
        "name": "mr-mime",
        "url": "https://pokeapi.co/api/v2/pokemon/122/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mime-jr",
        "url": "https://pokeapi.co/api/v2/pokemon/439/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "revavroom",
        "url": "https://pokeapi.co/api/v2/pokemon/966/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "aggron-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10053/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "solid-rock": {
    "id": 116,
    "name": "solid-rock",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon takes 0.75× as much damage from moves that are super effective against it.\n\nThis ability functions identically to filter.",
    "shortEffect": "Decreases damage taken from super-effective moves by 1/4.",
    "flavorText": "Powers down super­\neffective moves.",
    "pokemon": [
      {
        "name": "camerupt",
        "url": "https://pokeapi.co/api/v2/pokemon/323/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rhyperior",
        "url": "https://pokeapi.co/api/v2/pokemon/464/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tirtouga",
        "url": "https://pokeapi.co/api/v2/pokemon/564/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "carracosta",
        "url": "https://pokeapi.co/api/v2/pokemon/565/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "weak-armor": {
    "id": 133,
    "name": "weak-armor",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Whenever a physical move hits this Pokémon, its Speed rises one stage and its Defense falls one stage.\n\nThis ability triggers on every hit of a multiple-hit move.",
    "shortEffect": "Raises Speed and lowers Defense by one stage each upon being hit by a physical move.",
    "flavorText": "Physical attacks lower\nDefense and raise Speed.",
    "pokemon": [
      {
        "name": "onix",
        "url": "https://pokeapi.co/api/v2/pokemon/95/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "omanyte",
        "url": "https://pokeapi.co/api/v2/pokemon/138/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "omastar",
        "url": "https://pokeapi.co/api/v2/pokemon/139/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kabuto",
        "url": "https://pokeapi.co/api/v2/pokemon/140/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kabutops",
        "url": "https://pokeapi.co/api/v2/pokemon/141/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "slugma",
        "url": "https://pokeapi.co/api/v2/pokemon/218/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "magcargo",
        "url": "https://pokeapi.co/api/v2/pokemon/219/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "skarmory",
        "url": "https://pokeapi.co/api/v2/pokemon/227/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "roggenrola",
        "url": "https://pokeapi.co/api/v2/pokemon/524/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "boldore",
        "url": "https://pokeapi.co/api/v2/pokemon/525/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dwebble",
        "url": "https://pokeapi.co/api/v2/pokemon/557/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "crustle",
        "url": "https://pokeapi.co/api/v2/pokemon/558/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "garbodor",
        "url": "https://pokeapi.co/api/v2/pokemon/569/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "vanillite",
        "url": "https://pokeapi.co/api/v2/pokemon/582/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vanillish",
        "url": "https://pokeapi.co/api/v2/pokemon/583/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vanilluxe",
        "url": "https://pokeapi.co/api/v2/pokemon/584/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "vullaby",
        "url": "https://pokeapi.co/api/v2/pokemon/629/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mandibuzz",
        "url": "https://pokeapi.co/api/v2/pokemon/630/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sinistea",
        "url": "https://pokeapi.co/api/v2/pokemon/854/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "polteageist",
        "url": "https://pokeapi.co/api/v2/pokemon/855/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cursola",
        "url": "https://pokeapi.co/api/v2/pokemon/864/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "armarouge",
        "url": "https://pokeapi.co/api/v2/pokemon/936/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ceruledge",
        "url": "https://pokeapi.co/api/v2/pokemon/937/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "corsola-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10173/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "garbodor-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10207/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "sheer-force": {
    "id": 125,
    "name": "sheer-force",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's moves with extra effects have 1.3× their power, but lose their extra effects.\n\nAn effect chance is a move's chance to inflict a status ailment, cause a stat change, or make the target flinch in addition to the move's main effect. For example, thunder shock's paralysis is an extra effect, but thunder wave's is not, nor are knock off's item removal and air cutter's increased critical hit rate.\n\nMoves that lower the user's stats are unaffected.",
    "shortEffect": "Strengthens moves with extra effects to 1.3× their power, but prevents their extra effects.",
    "flavorText": "Removes added effects to\nincrease move damage.",
    "pokemon": [
      {
        "name": "nidoqueen",
        "url": "https://pokeapi.co/api/v2/pokemon/31/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nidoking",
        "url": "https://pokeapi.co/api/v2/pokemon/34/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "krabby",
        "url": "https://pokeapi.co/api/v2/pokemon/98/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kingler",
        "url": "https://pokeapi.co/api/v2/pokemon/99/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tauros",
        "url": "https://pokeapi.co/api/v2/pokemon/128/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "totodile",
        "url": "https://pokeapi.co/api/v2/pokemon/158/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "croconaw",
        "url": "https://pokeapi.co/api/v2/pokemon/159/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "feraligatr",
        "url": "https://pokeapi.co/api/v2/pokemon/160/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "steelix",
        "url": "https://pokeapi.co/api/v2/pokemon/208/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "makuhita",
        "url": "https://pokeapi.co/api/v2/pokemon/296/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hariyama",
        "url": "https://pokeapi.co/api/v2/pokemon/297/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mawile",
        "url": "https://pokeapi.co/api/v2/pokemon/303/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "trapinch",
        "url": "https://pokeapi.co/api/v2/pokemon/328/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bagon",
        "url": "https://pokeapi.co/api/v2/pokemon/371/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cranidos",
        "url": "https://pokeapi.co/api/v2/pokemon/408/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rampardos",
        "url": "https://pokeapi.co/api/v2/pokemon/409/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "timburr",
        "url": "https://pokeapi.co/api/v2/pokemon/532/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gurdurr",
        "url": "https://pokeapi.co/api/v2/pokemon/533/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "conkeldurr",
        "url": "https://pokeapi.co/api/v2/pokemon/534/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "darmanitan-standard",
        "url": "https://pokeapi.co/api/v2/pokemon/555/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "druddigon",
        "url": "https://pokeapi.co/api/v2/pokemon/621/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rufflet",
        "url": "https://pokeapi.co/api/v2/pokemon/627/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "braviary",
        "url": "https://pokeapi.co/api/v2/pokemon/628/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "landorus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/645/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "toucannon",
        "url": "https://pokeapi.co/api/v2/pokemon/733/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cufant",
        "url": "https://pokeapi.co/api/v2/pokemon/878/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "copperajah",
        "url": "https://pokeapi.co/api/v2/pokemon/879/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kleavor",
        "url": "https://pokeapi.co/api/v2/pokemon/900/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "cetoddle",
        "url": "https://pokeapi.co/api/v2/pokemon/974/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cetitan",
        "url": "https://pokeapi.co/api/v2/pokemon/975/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "darmanitan-zen",
        "url": "https://pokeapi.co/api/v2/pokemon/10017/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "camerupt-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10087/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kingler-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10203/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "copperajah-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10224/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "braviary-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10240/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "squawkabilly-yellow-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10261/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "squawkabilly-white-plumage",
        "url": "https://pokeapi.co/api/v2/pokemon/10262/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "defeatist": {
    "id": 129,
    "name": "defeatist",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's Attack and Special Attack are halved when it has half its HP or less.",
    "shortEffect": "Halves Attack and Special Attack at 50% max HP or less.",
    "flavorText": "Lowers stats when HP\nbecomes half or less.",
    "pokemon": [
      {
        "name": "archen",
        "url": "https://pokeapi.co/api/v2/pokemon/566/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "archeops",
        "url": "https://pokeapi.co/api/v2/pokemon/567/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "toxic-boost": {
    "id": 137,
    "name": "toxic-boost",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon has 1.5× its Attack when poisoned.",
    "shortEffect": "Increases Attack to 1.5× when poisoned.",
    "flavorText": "Powers up physical\nattacks when poisoned.",
    "pokemon": [
      {
        "name": "zangoose",
        "url": "https://pokeapi.co/api/v2/pokemon/335/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "frisk": {
    "id": 119,
    "name": "frisk",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "When this Pokémon enters battle, it reveals an opposing Pokémon's held item to all participating trainers.\n\nIn a double battle, if one opponent has an item, this Pokémon will Frisk that Pokémon; if both have an item, it will Frisk one at random.",
    "shortEffect": "Reveals an opponent's held item upon entering battle.",
    "flavorText": "The Pokémon can check\nthe foe’s held item.",
    "pokemon": [
      {
        "name": "wigglytuff",
        "url": "https://pokeapi.co/api/v2/pokemon/40/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sentret",
        "url": "https://pokeapi.co/api/v2/pokemon/161/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "furret",
        "url": "https://pokeapi.co/api/v2/pokemon/162/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "yanma",
        "url": "https://pokeapi.co/api/v2/pokemon/193/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "stantler",
        "url": "https://pokeapi.co/api/v2/pokemon/234/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "shuppet",
        "url": "https://pokeapi.co/api/v2/pokemon/353/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "banette",
        "url": "https://pokeapi.co/api/v2/pokemon/354/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "duskull",
        "url": "https://pokeapi.co/api/v2/pokemon/355/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dusclops",
        "url": "https://pokeapi.co/api/v2/pokemon/356/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "yanmega",
        "url": "https://pokeapi.co/api/v2/pokemon/469/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dusknoir",
        "url": "https://pokeapi.co/api/v2/pokemon/477/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gothita",
        "url": "https://pokeapi.co/api/v2/pokemon/574/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gothorita",
        "url": "https://pokeapi.co/api/v2/pokemon/575/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gothitelle",
        "url": "https://pokeapi.co/api/v2/pokemon/576/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "phantump",
        "url": "https://pokeapi.co/api/v2/pokemon/708/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "trevenant",
        "url": "https://pokeapi.co/api/v2/pokemon/709/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pumpkaboo-average",
        "url": "https://pokeapi.co/api/v2/pokemon/710/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gourgeist-average",
        "url": "https://pokeapi.co/api/v2/pokemon/711/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "noibat",
        "url": "https://pokeapi.co/api/v2/pokemon/714/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "noivern",
        "url": "https://pokeapi.co/api/v2/pokemon/715/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "orbeetle",
        "url": "https://pokeapi.co/api/v2/pokemon/826/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "impidimp",
        "url": "https://pokeapi.co/api/v2/pokemon/859/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "morgrem",
        "url": "https://pokeapi.co/api/v2/pokemon/860/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "grimmsnarl",
        "url": "https://pokeapi.co/api/v2/pokemon/861/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wyrdeer",
        "url": "https://pokeapi.co/api/v2/pokemon/899/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "flittle",
        "url": "https://pokeapi.co/api/v2/pokemon/955/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "espathra",
        "url": "https://pokeapi.co/api/v2/pokemon/956/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "munkidori",
        "url": "https://pokeapi.co/api/v2/pokemon/1015/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pumpkaboo-small",
        "url": "https://pokeapi.co/api/v2/pokemon/10027/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pumpkaboo-large",
        "url": "https://pokeapi.co/api/v2/pokemon/10028/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pumpkaboo-super",
        "url": "https://pokeapi.co/api/v2/pokemon/10029/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gourgeist-small",
        "url": "https://pokeapi.co/api/v2/pokemon/10030/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gourgeist-large",
        "url": "https://pokeapi.co/api/v2/pokemon/10031/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gourgeist-super",
        "url": "https://pokeapi.co/api/v2/pokemon/10032/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "exeggutor-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10114/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "orbeetle-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10213/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "grimmsnarl-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10222/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "typhlosion-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10233/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "flare-boost": {
    "id": 138,
    "name": "flare-boost",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon has 1.5× its Special Attack when burned.",
    "shortEffect": "Increases Special Attack to 1.5× when burned.",
    "flavorText": "Powers up special attacks\nwhen burned.",
    "pokemon": [
      {
        "name": "drifloon",
        "url": "https://pokeapi.co/api/v2/pokemon/425/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drifblim",
        "url": "https://pokeapi.co/api/v2/pokemon/426/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "mold-breaker": {
    "id": 104,
    "name": "mold-breaker",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "This Pokémon's moves completely ignore abilities that could hinder or prevent their effect on the target.\n\nFor example, this Pokémon's moves ignore abilities that would fully negate them, such as water absorb; abilities that would prevent any of their effects, such as clear body, shell armor, or sticky hold; and abilities that grant any general protective benefit, such as simple, snow cloak, or thick fat.  If an ability could either hinder or help this Pokémon's moves, e.g. dry skin or unaware, the ability is ignored either way.\n\nAbilities that do not fit this description, even if they could hinder moves in some other way, are not affected.  For example, cursed body only affects potential future uses of the move, while liquid ooze and shadow tag can only hinder a move's effect on the user.  This ablity cannot ignore type or form changes granted by abilities, for example color change or forecast; nor effects that were caused by abilities but are no longer tied to an ability, such as the rain from drizzle.  This ability cannot ignore multitype at all.\n\nAn ability ignored by this ability is only nullified while the move is being used.  For example, this Pokémon's moves can paralyze a Pokémon with limber, but Limber will activate and heal the paralysis immediately thereafter, and this Pokémon's spikes are not affected by this ability after they have been placed.\n\nWhen this Pokémon enters battle, all participating trainers are notified that it has this ability.\n\nThis ability functions identically to teravolt and turboblaze.",
    "shortEffect": "Bypasses targets' abilities if they could hinder or prevent a move.",
    "flavorText": "Moves can be used\nregardless of abilities.",
    "pokemon": [
      {
        "name": "pinsir",
        "url": "https://pokeapi.co/api/v2/pokemon/127/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "cranidos",
        "url": "https://pokeapi.co/api/v2/pokemon/408/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rampardos",
        "url": "https://pokeapi.co/api/v2/pokemon/409/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drilbur",
        "url": "https://pokeapi.co/api/v2/pokemon/529/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "excadrill",
        "url": "https://pokeapi.co/api/v2/pokemon/530/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "throh",
        "url": "https://pokeapi.co/api/v2/pokemon/538/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sawk",
        "url": "https://pokeapi.co/api/v2/pokemon/539/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "basculin-red-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/550/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "axew",
        "url": "https://pokeapi.co/api/v2/pokemon/610/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "fraxure",
        "url": "https://pokeapi.co/api/v2/pokemon/611/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "haxorus",
        "url": "https://pokeapi.co/api/v2/pokemon/612/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "druddigon",
        "url": "https://pokeapi.co/api/v2/pokemon/621/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pancham",
        "url": "https://pokeapi.co/api/v2/pokemon/674/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "pangoro",
        "url": "https://pokeapi.co/api/v2/pokemon/675/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "hawlucha",
        "url": "https://pokeapi.co/api/v2/pokemon/701/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "basculegion-male",
        "url": "https://pokeapi.co/api/v2/pokemon/902/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tinkatink",
        "url": "https://pokeapi.co/api/v2/pokemon/957/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tinkatuff",
        "url": "https://pokeapi.co/api/v2/pokemon/958/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tinkaton",
        "url": "https://pokeapi.co/api/v2/pokemon/959/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "veluza",
        "url": "https://pokeapi.co/api/v2/pokemon/976/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "basculin-blue-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/10016/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gyarados-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10041/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ampharos-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10045/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "basculin-white-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/10247/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "basculegion-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10248/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ogerpon-hearthflame-mask",
        "url": "https://pokeapi.co/api/v2/pokemon/10274/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "regenerator": {
    "id": 144,
    "name": "regenerator",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon regains 1/3 of its maximum HP when it is switched out for another Pokémon under any circumstances other than having fainted.\n\nThis ability does not take effect when a battle ends.",
    "shortEffect": "Heals for 1/3 max HP upon switching out.",
    "flavorText": "Restores a little HP when\nwithdrawn from battle.",
    "pokemon": [
      {
        "name": "slowpoke",
        "url": "https://pokeapi.co/api/v2/pokemon/79/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "slowbro",
        "url": "https://pokeapi.co/api/v2/pokemon/80/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tangela",
        "url": "https://pokeapi.co/api/v2/pokemon/114/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "slowking",
        "url": "https://pokeapi.co/api/v2/pokemon/199/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "corsola",
        "url": "https://pokeapi.co/api/v2/pokemon/222/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ho-oh",
        "url": "https://pokeapi.co/api/v2/pokemon/250/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tangrowth",
        "url": "https://pokeapi.co/api/v2/pokemon/465/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "audino",
        "url": "https://pokeapi.co/api/v2/pokemon/531/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "solosis",
        "url": "https://pokeapi.co/api/v2/pokemon/577/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "duosion",
        "url": "https://pokeapi.co/api/v2/pokemon/578/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "reuniclus",
        "url": "https://pokeapi.co/api/v2/pokemon/579/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "foongus",
        "url": "https://pokeapi.co/api/v2/pokemon/590/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "amoonguss",
        "url": "https://pokeapi.co/api/v2/pokemon/591/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "alomomola",
        "url": "https://pokeapi.co/api/v2/pokemon/594/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mienfoo",
        "url": "https://pokeapi.co/api/v2/pokemon/619/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mienshao",
        "url": "https://pokeapi.co/api/v2/pokemon/620/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mareanie",
        "url": "https://pokeapi.co/api/v2/pokemon/747/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "toxapex",
        "url": "https://pokeapi.co/api/v2/pokemon/748/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gossifleur",
        "url": "https://pokeapi.co/api/v2/pokemon/829/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "eldegoss",
        "url": "https://pokeapi.co/api/v2/pokemon/830/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "klawf",
        "url": "https://pokeapi.co/api/v2/pokemon/950/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cyclizar",
        "url": "https://pokeapi.co/api/v2/pokemon/967/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hydrapple",
        "url": "https://pokeapi.co/api/v2/pokemon/1019/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "tornadus-therian",
        "url": "https://pokeapi.co/api/v2/pokemon/10019/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slowpoke-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10164/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "slowbro-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10165/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "slowking-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10172/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "big-pecks": {
    "id": 145,
    "name": "big-pecks",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's Defense cannot be lowered by other Pokémon.\n\nThis Pokémon can still be passed negative Defense modifiers through heart swap or guard swap.",
    "shortEffect": "Protects against Defense drops.",
    "flavorText": "Protects the Pokémon from\nDefense-lowering attacks.",
    "pokemon": [
      {
        "name": "pidgey",
        "url": "https://pokeapi.co/api/v2/pokemon/16/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pidgeotto",
        "url": "https://pokeapi.co/api/v2/pokemon/17/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pidgeot",
        "url": "https://pokeapi.co/api/v2/pokemon/18/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "chatot",
        "url": "https://pokeapi.co/api/v2/pokemon/441/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pidove",
        "url": "https://pokeapi.co/api/v2/pokemon/519/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tranquill",
        "url": "https://pokeapi.co/api/v2/pokemon/520/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "unfezant",
        "url": "https://pokeapi.co/api/v2/pokemon/521/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ducklett",
        "url": "https://pokeapi.co/api/v2/pokemon/580/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "swanna",
        "url": "https://pokeapi.co/api/v2/pokemon/581/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "vullaby",
        "url": "https://pokeapi.co/api/v2/pokemon/629/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mandibuzz",
        "url": "https://pokeapi.co/api/v2/pokemon/630/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fletchling",
        "url": "https://pokeapi.co/api/v2/pokemon/661/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "rookidee",
        "url": "https://pokeapi.co/api/v2/pokemon/821/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "corvisquire",
        "url": "https://pokeapi.co/api/v2/pokemon/822/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bombirdier",
        "url": "https://pokeapi.co/api/v2/pokemon/962/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "multitype": {
    "id": 121,
    "name": "multitype",
    "isMainSeries": true,
    "generation": "generation-iv",
    "effect": "If this Pokémon is holding an elemental Plate, its type and form change to match the Plate.\n\nThis Pokémon's held item, whether or not it is a Plate, cannot be taken by covet or thief, nor removed by knock off, nor traded by switcheroo or trick.  Covet, Thief, and Knock Off still inflict damage against this Pokémon.  Unlike with sticky hold, this Pokémon cannot use fling, Switcheroo, or Trick to lose its item itself, nor gain an item through Switcheroo or Trick if it does not have one.\n\nThis ability has no effect for any Pokémon other than arceus.  This ability cannot be traded with skill swap, nor copied with role play or trace, nor disabled with gastro acid, nor changed with worry seed.  This Pokémon cannot use Skill Swap or Role Play to lose its ability itself.  mold breaker cannot ignore this ability.\n\nIf a Pokémon Transforms into an Arceus with this ability, it will Transform into Arceus's default, normal-type form.  If the Transforming Pokémon is holding a Plate, this ability will then activate and change the Pokémon into the corresponding form.",
    "shortEffect": "Changes arceus's type and form to match its held Plate.",
    "flavorText": "Changes type to match\nthe held Plate.",
    "pokemon": [
      {
        "name": "arceus",
        "url": "https://pokeapi.co/api/v2/pokemon/493/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "poison-touch": {
    "id": 143,
    "name": "poison-touch",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's contact moves have a 30% chance of poisoning the target with each hit.\n\nThis counts as an extra effect for the purposes of shield dust.  This ability takes effect before mummy.",
    "shortEffect": "Has a 30% chance of poisoning target Pokémon upon contact.",
    "flavorText": "May poison targets when a\nPokémon makes contact.",
    "pokemon": [
      {
        "name": "grimer",
        "url": "https://pokeapi.co/api/v2/pokemon/88/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "muk",
        "url": "https://pokeapi.co/api/v2/pokemon/89/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "croagunk",
        "url": "https://pokeapi.co/api/v2/pokemon/453/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "toxicroak",
        "url": "https://pokeapi.co/api/v2/pokemon/454/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "seismitoad",
        "url": "https://pokeapi.co/api/v2/pokemon/537/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "skrelp",
        "url": "https://pokeapi.co/api/v2/pokemon/690/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dragalge",
        "url": "https://pokeapi.co/api/v2/pokemon/691/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sneasler",
        "url": "https://pokeapi.co/api/v2/pokemon/903/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grafaiai",
        "url": "https://pokeapi.co/api/v2/pokemon/945/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "grimer-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10112/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "muk-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10113/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "multiscale": {
    "id": 136,
    "name": "multiscale",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon takes half as much damage when it is hit having full HP.",
    "shortEffect": "Halves damage taken from full HP.",
    "flavorText": "Reduces damage when HP\nis full.",
    "pokemon": [
      {
        "name": "dragonite",
        "url": "https://pokeapi.co/api/v2/pokemon/149/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lugia",
        "url": "https://pokeapi.co/api/v2/pokemon/249/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "gale-wings": {
    "id": 177,
    "name": "gale-wings",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Raises flying moves' priority by one stage.",
    "shortEffect": "Raises flying moves' priority by one stage.",
    "flavorText": "Gives priority to Flying-type\nmoves.",
    "pokemon": [
      {
        "name": "fletchling",
        "url": "https://pokeapi.co/api/v2/pokemon/661/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "fletchinder",
        "url": "https://pokeapi.co/api/v2/pokemon/662/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "talonflame",
        "url": "https://pokeapi.co/api/v2/pokemon/663/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "water-bubble": {
    "id": 199,
    "name": "water-bubble",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon is hit by a Fire move, the damage is halved.  When this Pokémon uses a Water move, the power is doubled. This Pokémon cannot be burned, and if it becomes burned, the burn is immediately cured.",
    "shortEffect": "Halves damage from Fire moves, doubles damage of Water moves, and prevents burns.",
    "flavorText": "Lowers the power of Fire-type moves done to the\nPokémon and prevents the Pokémon from getting\na burn.",
    "pokemon": [
      {
        "name": "dewpider",
        "url": "https://pokeapi.co/api/v2/pokemon/751/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "araquanid",
        "url": "https://pokeapi.co/api/v2/pokemon/752/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "araquanid-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10153/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "delta-stream": {
    "id": 191,
    "name": "delta-stream",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "When this Pokémon enters battle or gains this ability, the weather becomes a mysterious air current.  A mysterious air current causes moves to not be super effective against Flying; they do neutral damage instead.  anticipation and stealth rock are not affected.\n\nThe mysterious air current ends when this Pokémon leaves battle or loses this ability, or when this ability is nullified.  The weather cannot otherwise be changed except by the effects of desolate land and primordial sea.\n\nair lock and cloud nine will prevent the effect of a mysterious air current, but will not allow the weather to be changed.",
    "shortEffect": "Creates a mysterious air current, which cannot be replaced and causes moves to never be super effective against Flying Pokémon.",
    "flavorText": "Affects weather and eliminates all\nof the Flying type’s weaknesses.",
    "pokemon": [
      {
        "name": "rayquaza-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10079/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "primordial-sea": {
    "id": 189,
    "name": "primordial-sea",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "When this Pokémon enters battle or gains this ability, the weather becomes heavy rain.  Heavy rain has all the properties of rain dance and also causes damaging Fire moves to fail.\n\nHeavy rain ends when this Pokémon leaves battle or loses this ability, or when this ability is nullified.  The weather cannot otherwise be changed except by the effects of delta stream and desolate land.\n\nair lock and cloud nine will prevent the effects of heavy rain, including allowing Fire moves to work, but will not allow the weather to be changed.",
    "shortEffect": "Creates heavy rain, which has all the properties of Rain Dance, cannot be replaced, and causes damaging Fire moves to fail.",
    "flavorText": "Affects weather and nullifies any\nFire-type attacks.",
    "pokemon": [
      {
        "name": "kyogre-primal",
        "url": "https://pokeapi.co/api/v2/pokemon/10077/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "moxie": {
    "id": 153,
    "name": "moxie",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's Attack rises one stage upon knocking out another Pokémon, even a friendly Pokémon.\n\nThis ability does not take effect when the Pokémon indirectly causes another Pokémon to faint, e.g. through poison or spikes.\n\nIf this Pokémon knocks out a Pokémon with mummy, the former's ability will change without taking effect.",
    "shortEffect": "Raises Attack one stage upon KOing a Pokémon.",
    "flavorText": "Boosts Attack after\nknocking out any Pokémon.",
    "pokemon": [
      {
        "name": "pinsir",
        "url": "https://pokeapi.co/api/v2/pokemon/127/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gyarados",
        "url": "https://pokeapi.co/api/v2/pokemon/130/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "heracross",
        "url": "https://pokeapi.co/api/v2/pokemon/214/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mightyena",
        "url": "https://pokeapi.co/api/v2/pokemon/262/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "salamence",
        "url": "https://pokeapi.co/api/v2/pokemon/373/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "honchkrow",
        "url": "https://pokeapi.co/api/v2/pokemon/430/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sandile",
        "url": "https://pokeapi.co/api/v2/pokemon/551/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "krokorok",
        "url": "https://pokeapi.co/api/v2/pokemon/552/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "krookodile",
        "url": "https://pokeapi.co/api/v2/pokemon/553/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "scraggy",
        "url": "https://pokeapi.co/api/v2/pokemon/559/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "scrafty",
        "url": "https://pokeapi.co/api/v2/pokemon/560/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "litleo",
        "url": "https://pokeapi.co/api/v2/pokemon/667/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "pyroar",
        "url": "https://pokeapi.co/api/v2/pokemon/668/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "quaxly",
        "url": "https://pokeapi.co/api/v2/pokemon/912/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "quaxwell",
        "url": "https://pokeapi.co/api/v2/pokemon/913/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "quaquaval",
        "url": "https://pokeapi.co/api/v2/pokemon/914/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "merciless": {
    "id": 196,
    "name": "merciless",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon's moves critical hit against poisoned targets.",
    "shortEffect": "This Pokémon's moves critical hit against poisoned targets.",
    "flavorText": "The Pokémon’s attacks become critical hits if the\ntarget is poisoned.",
    "pokemon": [
      {
        "name": "mareanie",
        "url": "https://pokeapi.co/api/v2/pokemon/747/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toxapex",
        "url": "https://pokeapi.co/api/v2/pokemon/748/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "parental-bond": {
    "id": 185,
    "name": "parental-bond",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Lets the bearer hit twice with damaging moves.  The second hit has half power.",
    "shortEffect": "Lets the bearer hit twice with damaging moves.  The second hit has half power.",
    "flavorText": "Parent and child\nattack together.",
    "pokemon": [
      {
        "name": "kangaskhan-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10039/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "tough-claws": {
    "id": 181,
    "name": "tough-claws",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Strengthens moves that make contact to 1.33× their power.",
    "shortEffect": "Strengthens moves that make contact to 1.33× their power.",
    "flavorText": "Powers up moves that\nmake direct contact.",
    "pokemon": [
      {
        "name": "binacle",
        "url": "https://pokeapi.co/api/v2/pokemon/688/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "barbaracle",
        "url": "https://pokeapi.co/api/v2/pokemon/689/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "perrserker",
        "url": "https://pokeapi.co/api/v2/pokemon/863/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "charizard-mega-x",
        "url": "https://pokeapi.co/api/v2/pokemon/10034/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aerodactyl-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10042/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "metagross-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10076/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "lycanroc-dusk",
        "url": "https://pokeapi.co/api/v2/pokemon/10152/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowth-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10161/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "shields-down": {
    "id": 197,
    "name": "shields-down",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon enters battle and at the end of each turn, if its HP is 50% or above, it changes into Meteor Form; otherwise, it changes into Core Form.  In Meteor Form, it cannot be given a major status ailment (though existing ones are not cured), cannot become drowsy from yawn, and cannot use rest (which will simply fail).\n\nThis ability cannot be copied, replaced, or nullified.  This ability only takes effect for Minior.",
    "shortEffect": "Transforms this Minior between Core Form and Meteor Form.  Prevents major status ailments and drowsiness while in Meteor Form.",
    "flavorText": "When its HP becomes half or less, the Pokémon’s\nshell breaks and it becomes aggressive.",
    "pokemon": [
      {
        "name": "minior-red-meteor",
        "url": "https://pokeapi.co/api/v2/pokemon/774/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-orange-meteor",
        "url": "https://pokeapi.co/api/v2/pokemon/10130/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-yellow-meteor",
        "url": "https://pokeapi.co/api/v2/pokemon/10131/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-green-meteor",
        "url": "https://pokeapi.co/api/v2/pokemon/10132/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-blue-meteor",
        "url": "https://pokeapi.co/api/v2/pokemon/10133/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-indigo-meteor",
        "url": "https://pokeapi.co/api/v2/pokemon/10134/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-violet-meteor",
        "url": "https://pokeapi.co/api/v2/pokemon/10135/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-red",
        "url": "https://pokeapi.co/api/v2/pokemon/10136/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-orange",
        "url": "https://pokeapi.co/api/v2/pokemon/10137/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-yellow",
        "url": "https://pokeapi.co/api/v2/pokemon/10138/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-green",
        "url": "https://pokeapi.co/api/v2/pokemon/10139/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-blue",
        "url": "https://pokeapi.co/api/v2/pokemon/10140/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-indigo",
        "url": "https://pokeapi.co/api/v2/pokemon/10141/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "minior-violet",
        "url": "https://pokeapi.co/api/v2/pokemon/10142/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "victory-star": {
    "id": 162,
    "name": "victory-star",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "All friendly Pokémon's moves, including this Pokémon's own moves, have 1.1× their usual accuracy while this Pokémon is in battle.",
    "shortEffect": "Increases moves' accuracy to 1.1× for friendly Pokémon.",
    "flavorText": "Boosts the accuracy of its\nallies and itself.",
    "pokemon": [
      {
        "name": "victini",
        "url": "https://pokeapi.co/api/v2/pokemon/494/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "water-compaction": {
    "id": 195,
    "name": "water-compaction",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Raises this Pokémon's Defense by two stages when it's hit by a Water move.",
    "shortEffect": "Raises this Pokémon's Defense by two stages when it's hit by a Water move.",
    "flavorText": "Boosts the Pokémon’s Defense stat sharply when hit\nby a Water-type move.",
    "pokemon": [
      {
        "name": "sandygast",
        "url": "https://pokeapi.co/api/v2/pokemon/769/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "palossand",
        "url": "https://pokeapi.co/api/v2/pokemon/770/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "wimp-out": {
    "id": 193,
    "name": "wimp-out",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "After this Pokémon is hit by a move, if that move caused this Pokémon's HP to drop below half, it switches out.",
    "shortEffect": "This Pokémon automatically switches out when its HP drops below half.",
    "flavorText": "The Pokémon cowardly switches out when its HP\nbecomes half or less.",
    "pokemon": [
      {
        "name": "wimpod",
        "url": "https://pokeapi.co/api/v2/pokemon/767/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "grass-pelt": {
    "id": 179,
    "name": "grass-pelt",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Boosts Defense while grassy terrain is in effect.",
    "shortEffect": "Boosts Defense while grassy terrain is in effect.",
    "flavorText": "Boosts the Defense stat\nin Grassy Terrain.",
    "pokemon": [
      {
        "name": "skiddo",
        "url": "https://pokeapi.co/api/v2/pokemon/672/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gogoat",
        "url": "https://pokeapi.co/api/v2/pokemon/673/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "mega-launcher": {
    "id": 178,
    "name": "mega-launcher",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Strengthens aura and pulse moves to 1.5× their power.",
    "shortEffect": "Strengthens aura and pulse moves to 1.5× their power.",
    "flavorText": "Powers up aura and pulse moves.",
    "pokemon": [
      {
        "name": "clauncher",
        "url": "https://pokeapi.co/api/v2/pokemon/692/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "clawitzer",
        "url": "https://pokeapi.co/api/v2/pokemon/693/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blastoise-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10036/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "strong-jaw": {
    "id": 173,
    "name": "strong-jaw",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Strengthens biting moves to 1.5× their power.",
    "shortEffect": "Strengthens biting moves to 1.5× their power.",
    "flavorText": "The Pokémon’s strong jaw gives\nit tremendous biting power.",
    "pokemon": [
      {
        "name": "tyrunt",
        "url": "https://pokeapi.co/api/v2/pokemon/696/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tyrantrum",
        "url": "https://pokeapi.co/api/v2/pokemon/697/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "yungoos",
        "url": "https://pokeapi.co/api/v2/pokemon/734/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gumshoos",
        "url": "https://pokeapi.co/api/v2/pokemon/735/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bruxish",
        "url": "https://pokeapi.co/api/v2/pokemon/779/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "chewtle",
        "url": "https://pokeapi.co/api/v2/pokemon/833/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drednaw",
        "url": "https://pokeapi.co/api/v2/pokemon/834/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "boltund",
        "url": "https://pokeapi.co/api/v2/pokemon/836/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dracovish",
        "url": "https://pokeapi.co/api/v2/pokemon/882/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sharpedo-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10070/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gumshoos-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10121/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drednaw-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10214/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "avalugg-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10243/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "symbiosis": {
    "id": 180,
    "name": "symbiosis",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Passes the bearer's held item to an ally when the ally uses up its item.",
    "shortEffect": "Passes the bearer's held item to an ally when the ally uses up its item.",
    "flavorText": "The Pokémon can pass\nan item to an ally.",
    "pokemon": [
      {
        "name": "flabebe",
        "url": "https://pokeapi.co/api/v2/pokemon/669/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "floette",
        "url": "https://pokeapi.co/api/v2/pokemon/670/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "florges",
        "url": "https://pokeapi.co/api/v2/pokemon/671/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oranguru",
        "url": "https://pokeapi.co/api/v2/pokemon/765/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "floette-eternal",
        "url": "https://pokeapi.co/api/v2/pokemon/10061/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "magic-bounce": {
    "id": 156,
    "name": "magic-bounce",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "When this Pokémon is targeted by a move flagged as being reflectable, the move is redirected to its user.\n\nAll reflectable moves are non-damaging, and most non-damaging moves that target other Pokémon are reflectable.\n\nA move reflected by this ability or magic coat cannot be reflected back.",
    "shortEffect": "Reflects most non-damaging moves back at their user.",
    "flavorText": "Reflects status-\nchanging moves.",
    "pokemon": [
      {
        "name": "natu",
        "url": "https://pokeapi.co/api/v2/pokemon/177/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "xatu",
        "url": "https://pokeapi.co/api/v2/pokemon/178/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "espeon",
        "url": "https://pokeapi.co/api/v2/pokemon/196/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hatenna",
        "url": "https://pokeapi.co/api/v2/pokemon/856/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hattrem",
        "url": "https://pokeapi.co/api/v2/pokemon/857/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hatterene",
        "url": "https://pokeapi.co/api/v2/pokemon/858/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "absol-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10057/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sableye-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10066/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "diancie-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10075/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hatterene-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10221/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "dark-aura": {
    "id": 186,
    "name": "dark-aura",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Strengthens dark moves for all friendly and opposing Pokémon.",
    "shortEffect": "Strengthens dark moves to 1.33× their power for all friendly and opposing Pokémon.",
    "flavorText": "Powers up each Pokémon’s\nDark-type moves.",
    "pokemon": [
      {
        "name": "yveltal",
        "url": "https://pokeapi.co/api/v2/pokemon/717/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "stamina": {
    "id": 192,
    "name": "stamina",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Raises this Pokémon's Defense by one stage when it takes damage from a move.",
    "shortEffect": "Raises this Pokémon's Defense by one stage when it takes damage from a move.",
    "flavorText": "Boosts the Defense stat when hit by an attack.",
    "pokemon": [
      {
        "name": "mudbray",
        "url": "https://pokeapi.co/api/v2/pokemon/749/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mudsdale",
        "url": "https://pokeapi.co/api/v2/pokemon/750/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "archaludon",
        "url": "https://pokeapi.co/api/v2/pokemon/1018/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "emergency-exit": {
    "id": 194,
    "name": "emergency-exit",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "After this Pokémon is hit by a move, if that move caused this Pokémon's HP to drop below half, it switches out.",
    "shortEffect": "This Pokémon automatically switches out when its HP drops below half.",
    "flavorText": "The Pokémon, sensing danger, switches out when its\nHP becomes half or less.",
    "pokemon": [
      {
        "name": "golisopod",
        "url": "https://pokeapi.co/api/v2/pokemon/768/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "refrigerate": {
    "id": 174,
    "name": "refrigerate",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Turns the bearer's normal-type moves into ice-type moves.  Moves changed by this ability have 1.3× their power.",
    "shortEffect": "Turns the bearer's normal moves into ice moves and strengthens them to 1.3× their power.",
    "flavorText": "Normal-type moves become\nIce-type moves.",
    "pokemon": [
      {
        "name": "amaura",
        "url": "https://pokeapi.co/api/v2/pokemon/698/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aurorus",
        "url": "https://pokeapi.co/api/v2/pokemon/699/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "glalie-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10074/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "infiltrator": {
    "id": 151,
    "name": "infiltrator",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's moves ignore light screen, reflect, and safeguard.",
    "shortEffect": "Bypasses light screen, reflect, and safeguard.",
    "flavorText": "Passes through the foe’s\nbarrier and strikes.",
    "pokemon": [
      {
        "name": "zubat",
        "url": "https://pokeapi.co/api/v2/pokemon/41/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golbat",
        "url": "https://pokeapi.co/api/v2/pokemon/42/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "crobat",
        "url": "https://pokeapi.co/api/v2/pokemon/169/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hoppip",
        "url": "https://pokeapi.co/api/v2/pokemon/187/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "skiploom",
        "url": "https://pokeapi.co/api/v2/pokemon/188/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "jumpluff",
        "url": "https://pokeapi.co/api/v2/pokemon/189/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ninjask",
        "url": "https://pokeapi.co/api/v2/pokemon/291/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "seviper",
        "url": "https://pokeapi.co/api/v2/pokemon/336/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spiritomb",
        "url": "https://pokeapi.co/api/v2/pokemon/442/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cottonee",
        "url": "https://pokeapi.co/api/v2/pokemon/546/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "whimsicott",
        "url": "https://pokeapi.co/api/v2/pokemon/547/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "litwick",
        "url": "https://pokeapi.co/api/v2/pokemon/607/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lampent",
        "url": "https://pokeapi.co/api/v2/pokemon/608/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "chandelure",
        "url": "https://pokeapi.co/api/v2/pokemon/609/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "espurr",
        "url": "https://pokeapi.co/api/v2/pokemon/677/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "meowstic-male",
        "url": "https://pokeapi.co/api/v2/pokemon/678/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "inkay",
        "url": "https://pokeapi.co/api/v2/pokemon/686/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "malamar",
        "url": "https://pokeapi.co/api/v2/pokemon/687/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "noibat",
        "url": "https://pokeapi.co/api/v2/pokemon/714/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "noivern",
        "url": "https://pokeapi.co/api/v2/pokemon/715/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dreepy",
        "url": "https://pokeapi.co/api/v2/pokemon/885/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "drakloak",
        "url": "https://pokeapi.co/api/v2/pokemon/886/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dragapult",
        "url": "https://pokeapi.co/api/v2/pokemon/887/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bramblin",
        "url": "https://pokeapi.co/api/v2/pokemon/946/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "brambleghast",
        "url": "https://pokeapi.co/api/v2/pokemon/947/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meowstic-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10025/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "flower-veil": {
    "id": 166,
    "name": "flower-veil",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Protects friendly grass Pokémon from having their stats lowered by other Pokémon.",
    "shortEffect": "Protects friendly grass Pokémon from having their stats lowered by other Pokémon.",
    "flavorText": "Prevents lowering of ally\nGrass-type Pokémon’s stats.",
    "pokemon": [
      {
        "name": "flabebe",
        "url": "https://pokeapi.co/api/v2/pokemon/669/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "floette",
        "url": "https://pokeapi.co/api/v2/pokemon/670/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "florges",
        "url": "https://pokeapi.co/api/v2/pokemon/671/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "comfey",
        "url": "https://pokeapi.co/api/v2/pokemon/764/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "floette-eternal",
        "url": "https://pokeapi.co/api/v2/pokemon/10061/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "iron-barbs": {
    "id": 160,
    "name": "iron-barbs",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Whenever a move makes contact with this Pokémon, the move's user takes 1/8 of its maximum HP in damage.\n\nThis ability functions identically to rough skin.",
    "shortEffect": "Damages attacking Pokémon for 1/8 their max HP on contact.",
    "flavorText": "Inflicts damage to the\nPokémon on contact.",
    "pokemon": [
      {
        "name": "ferroseed",
        "url": "https://pokeapi.co/api/v2/pokemon/597/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ferrothorn",
        "url": "https://pokeapi.co/api/v2/pokemon/598/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "togedemaru",
        "url": "https://pokeapi.co/api/v2/pokemon/777/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "togedemaru-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10154/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sand-force": {
    "id": 159,
    "name": "sand-force",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "During a sandstorm, this Pokémon's rock-, ground-, and steel-type moves have 1.3× their base power.  This Pokémon does not take sandstorm damage, regardless of type.",
    "shortEffect": "Strengthens rock, ground, and steel moves to 1.3× their power during a sandstorm.  Protects against sandstorm damage.",
    "flavorText": "Boosts certain moves’\npower in a sandstorm.",
    "pokemon": [
      {
        "name": "diglett",
        "url": "https://pokeapi.co/api/v2/pokemon/50/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dugtrio",
        "url": "https://pokeapi.co/api/v2/pokemon/51/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "nosepass",
        "url": "https://pokeapi.co/api/v2/pokemon/299/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "shellos",
        "url": "https://pokeapi.co/api/v2/pokemon/422/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gastrodon",
        "url": "https://pokeapi.co/api/v2/pokemon/423/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hippopotas",
        "url": "https://pokeapi.co/api/v2/pokemon/449/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hippowdon",
        "url": "https://pokeapi.co/api/v2/pokemon/450/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "probopass",
        "url": "https://pokeapi.co/api/v2/pokemon/476/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "roggenrola",
        "url": "https://pokeapi.co/api/v2/pokemon/524/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "boldore",
        "url": "https://pokeapi.co/api/v2/pokemon/525/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gigalith",
        "url": "https://pokeapi.co/api/v2/pokemon/526/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "drilbur",
        "url": "https://pokeapi.co/api/v2/pokemon/529/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "excadrill",
        "url": "https://pokeapi.co/api/v2/pokemon/530/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "landorus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/645/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "garchomp-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10058/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "steelix-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10072/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "diglett-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10105/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dugtrio-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10106/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "protean": {
    "id": 168,
    "name": "protean",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Changes the bearer's type to match each move it uses.\n\nThe type change takes place just before the move is used.",
    "shortEffect": "Changes the bearer's type to match each move it uses.",
    "flavorText": "Changes the Pokémon’s type to\nthe type of the move it’s using.",
    "pokemon": [
      {
        "name": "kecleon",
        "url": "https://pokeapi.co/api/v2/pokemon/352/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "froakie",
        "url": "https://pokeapi.co/api/v2/pokemon/656/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "frogadier",
        "url": "https://pokeapi.co/api/v2/pokemon/657/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "greninja",
        "url": "https://pokeapi.co/api/v2/pokemon/658/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sprigatito",
        "url": "https://pokeapi.co/api/v2/pokemon/906/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "floragato",
        "url": "https://pokeapi.co/api/v2/pokemon/907/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meowscarada",
        "url": "https://pokeapi.co/api/v2/pokemon/908/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "competitive": {
    "id": 172,
    "name": "competitive",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Raises Special Attack by two stages upon having any stat lowered.",
    "shortEffect": "Raises Special Attack by two stages upon having any stat lowered.",
    "flavorText": "Boosts the Sp. Atk stat when\na stat is lowered.",
    "pokemon": [
      {
        "name": "jigglypuff",
        "url": "https://pokeapi.co/api/v2/pokemon/39/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wigglytuff",
        "url": "https://pokeapi.co/api/v2/pokemon/40/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "igglybuff",
        "url": "https://pokeapi.co/api/v2/pokemon/174/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "milotic",
        "url": "https://pokeapi.co/api/v2/pokemon/350/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "piplup",
        "url": "https://pokeapi.co/api/v2/pokemon/393/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "prinplup",
        "url": "https://pokeapi.co/api/v2/pokemon/394/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "empoleon",
        "url": "https://pokeapi.co/api/v2/pokemon/395/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gothita",
        "url": "https://pokeapi.co/api/v2/pokemon/574/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gothorita",
        "url": "https://pokeapi.co/api/v2/pokemon/575/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "gothitelle",
        "url": "https://pokeapi.co/api/v2/pokemon/576/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "boltund",
        "url": "https://pokeapi.co/api/v2/pokemon/836/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wattrel",
        "url": "https://pokeapi.co/api/v2/pokemon/940/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "kilowattrel",
        "url": "https://pokeapi.co/api/v2/pokemon/941/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "meowstic-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10025/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "articuno-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10169/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "stance-change": {
    "id": 176,
    "name": "stance-change",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Changes aegislash to Blade Forme before using a damaging move, or Shield Forme before using kings shield.",
    "shortEffect": "Changes aegislash to Blade Forme before using a damaging move, or Shield Forme before using kings shield.",
    "flavorText": "The Pokémon changes form\ndepending on how it battles.",
    "pokemon": [
      {
        "name": "aegislash-shield",
        "url": "https://pokeapi.co/api/v2/pokemon/681/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "aegislash-blade",
        "url": "https://pokeapi.co/api/v2/pokemon/10026/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "rattled": {
    "id": 155,
    "name": "rattled",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's Speed rises one stage with each hit from a damaging dark-, ghost-, or bug-type move.",
    "shortEffect": "Raises Speed one stage upon being hit by a dark, ghost, or bug move.",
    "flavorText": "Some move types scare\nit and boost its Speed.",
    "pokemon": [
      {
        "name": "magikarp",
        "url": "https://pokeapi.co/api/v2/pokemon/129/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ledyba",
        "url": "https://pokeapi.co/api/v2/pokemon/165/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sudowoodo",
        "url": "https://pokeapi.co/api/v2/pokemon/185/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dunsparce",
        "url": "https://pokeapi.co/api/v2/pokemon/206/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "snubbull",
        "url": "https://pokeapi.co/api/v2/pokemon/209/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "granbull",
        "url": "https://pokeapi.co/api/v2/pokemon/210/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "poochyena",
        "url": "https://pokeapi.co/api/v2/pokemon/261/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "whismur",
        "url": "https://pokeapi.co/api/v2/pokemon/293/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "clamperl",
        "url": "https://pokeapi.co/api/v2/pokemon/366/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bonsly",
        "url": "https://pokeapi.co/api/v2/pokemon/438/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cubchoo",
        "url": "https://pokeapi.co/api/v2/pokemon/613/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "yamper",
        "url": "https://pokeapi.co/api/v2/pokemon/835/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "toxel",
        "url": "https://pokeapi.co/api/v2/pokemon/848/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wiglett",
        "url": "https://pokeapi.co/api/v2/pokemon/960/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wugtrio",
        "url": "https://pokeapi.co/api/v2/pokemon/961/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dudunsparce-two-segment",
        "url": "https://pokeapi.co/api/v2/pokemon/982/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gimmighoul",
        "url": "https://pokeapi.co/api/v2/pokemon/999/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowth-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10107/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "persian-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10108/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "basculin-white-striped",
        "url": "https://pokeapi.co/api/v2/pokemon/10247/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dudunsparce-three-segment",
        "url": "https://pokeapi.co/api/v2/pokemon/10255/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "pixilate": {
    "id": 182,
    "name": "pixilate",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Turns the bearer's normal-type moves into fairy moves.  Moves changed by this ability have 1.3× their power.",
    "shortEffect": "Turns the bearer's normal moves into fairy moves and strengthens them to 1.3× their power.",
    "flavorText": "Normal-type moves become\nFairy-type moves.",
    "pokemon": [
      {
        "name": "sylveon",
        "url": "https://pokeapi.co/api/v2/pokemon/700/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gardevoir-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10051/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "altaria-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10067/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "bulletproof": {
    "id": 171,
    "name": "bulletproof",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Protects against bullet, ball, and bomb-based moves.",
    "shortEffect": "Protects against bullet, ball, and bomb-based moves.",
    "flavorText": "Protects the Pokémon from\nsome ball and bomb moves.",
    "pokemon": [
      {
        "name": "chespin",
        "url": "https://pokeapi.co/api/v2/pokemon/650/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "quilladin",
        "url": "https://pokeapi.co/api/v2/pokemon/651/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "chesnaught",
        "url": "https://pokeapi.co/api/v2/pokemon/652/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "jangmo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/782/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hakamo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/783/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kommo-o",
        "url": "https://pokeapi.co/api/v2/pokemon/784/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wooloo",
        "url": "https://pokeapi.co/api/v2/pokemon/831/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dubwool",
        "url": "https://pokeapi.co/api/v2/pokemon/832/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "applin",
        "url": "https://pokeapi.co/api/v2/pokemon/840/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ursaluna",
        "url": "https://pokeapi.co/api/v2/pokemon/901/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kommo-o-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10146/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "aroma-veil": {
    "id": 165,
    "name": "aroma-veil",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Protects allies against moves that affect their mental state.",
    "shortEffect": "Protects allies against moves that affect their mental state.",
    "flavorText": "Protects allies from attacks that\nlimit their move choices.",
    "pokemon": [
      {
        "name": "spritzee",
        "url": "https://pokeapi.co/api/v2/pokemon/682/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "aromatisse",
        "url": "https://pokeapi.co/api/v2/pokemon/683/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "milcery",
        "url": "https://pokeapi.co/api/v2/pokemon/868/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "alcremie",
        "url": "https://pokeapi.co/api/v2/pokemon/869/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lechonk",
        "url": "https://pokeapi.co/api/v2/pokemon/915/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dachsbun",
        "url": "https://pokeapi.co/api/v2/pokemon/927/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "alcremie-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10223/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "oinkologne-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10254/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "aerilate": {
    "id": 184,
    "name": "aerilate",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Turns the bearer's normal-type moves into flying-type moves.  Moves changed by this ability have 1.3× their power.",
    "shortEffect": "Turns the bearer's normal moves into flying moves and strengthens them to 1.3× their power.",
    "flavorText": "Normal-type moves become\nFlying-type moves.",
    "pokemon": [
      {
        "name": "pinsir-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10040/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "salamence-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10089/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "cheek-pouch": {
    "id": 167,
    "name": "cheek-pouch",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Restores HP upon eating a Berry, in addition to the Berry's effect.",
    "shortEffect": "Restores HP upon eating a Berry, in addition to the Berry's effect.",
    "flavorText": "Restores HP as well when\nthe Pokémon eats a Berry.",
    "pokemon": [
      {
        "name": "bunnelby",
        "url": "https://pokeapi.co/api/v2/pokemon/659/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "diggersby",
        "url": "https://pokeapi.co/api/v2/pokemon/660/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dedenne",
        "url": "https://pokeapi.co/api/v2/pokemon/702/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "skwovet",
        "url": "https://pokeapi.co/api/v2/pokemon/819/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "greedent",
        "url": "https://pokeapi.co/api/v2/pokemon/820/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "maushold-family-of-four",
        "url": "https://pokeapi.co/api/v2/pokemon/925/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "maushold-family-of-three",
        "url": "https://pokeapi.co/api/v2/pokemon/10257/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "fur-coat": {
    "id": 169,
    "name": "fur-coat",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Halves damage from physical attacks.",
    "shortEffect": "Halves damage from physical attacks.",
    "flavorText": "Halves damage from\nphysical moves.",
    "pokemon": [
      {
        "name": "furfrou",
        "url": "https://pokeapi.co/api/v2/pokemon/676/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "persian-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10108/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "fairy-aura": {
    "id": 187,
    "name": "fairy-aura",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Strengthens fairy moves for all friendly and opposing Pokémon.",
    "shortEffect": "Strengthens fairy moves to 1.33× their power for all friendly and opposing Pokémon.",
    "flavorText": "Powers up each Pokémon’s\nFairy-type moves.",
    "pokemon": [
      {
        "name": "xerneas",
        "url": "https://pokeapi.co/api/v2/pokemon/716/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "steelworker": {
    "id": 200,
    "name": "steelworker",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon's Steel moves have 1.5× power.",
    "shortEffect": "This Pokémon's Steel moves have 1.5× power.",
    "flavorText": "Powers up Steel-type moves.",
    "pokemon": [
      {
        "name": "dhelmise",
        "url": "https://pokeapi.co/api/v2/pokemon/781/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "turboblaze": {
    "id": 163,
    "name": "turboblaze",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's moves completely ignore abilities that could hinder or prevent their effect on the target.\n\nFor example, this Pokémon's moves ignore abilities that would fully negate them, such as water absorb; abilities that would prevent any of their effects, such as clear body, shell armor, or sticky hold; and abilities that grant any general protective benefit, such as simple, snow cloak, or thick fat.  If an ability could either hinder or help this Pokémon's moves, e.g. dry skin or unaware, the ability is ignored either way.\n\nAbilities that do not fit this description, even if they could hinder moves in some other way, are not affected.  For example, cursed body only affects potential future uses of the move, while liquid ooze and shadow tag can only hinder a move's effect on the user.  This ablity cannot ignore type or form changes granted by abilities, for example color change or forecast; nor effects that were caused by abilities but are no longer tied to an ability, such as the rain from drizzle.  This ability cannot ignore multitype at all.\n\nAn ability ignored by this ability is only nullified while the move is being used.  For example, this Pokémon's moves can paralyze a Pokémon with limber, but Limber will activate and heal the paralysis immediately thereafter, and this Pokémon's spikes are not affected by this ability after they have been placed.\n\nWhen this Pokémon enters battle, all participating trainers are notified that it has this ability.\n\nThis ability functions identically to mold breaker and teravolt.",
    "shortEffect": "Bypasses targets' abilities if they could hinder or prevent moves.",
    "flavorText": "Moves can be used\nregardless of Abilities.",
    "pokemon": [
      {
        "name": "reshiram",
        "url": "https://pokeapi.co/api/v2/pokemon/643/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kyurem-white",
        "url": "https://pokeapi.co/api/v2/pokemon/10023/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "magician": {
    "id": 170,
    "name": "magician",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Steals the target's held item when the bearer uses a damaging move.",
    "shortEffect": "Steals the target's held item when the bearer uses a damaging move.",
    "flavorText": "The Pokémon steals the held item\nof a Pokémon it hits with a move.",
    "pokemon": [
      {
        "name": "fennekin",
        "url": "https://pokeapi.co/api/v2/pokemon/653/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "braixen",
        "url": "https://pokeapi.co/api/v2/pokemon/654/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "delphox",
        "url": "https://pokeapi.co/api/v2/pokemon/655/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "klefki",
        "url": "https://pokeapi.co/api/v2/pokemon/707/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "hoopa",
        "url": "https://pokeapi.co/api/v2/pokemon/720/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hoopa-unbound",
        "url": "https://pokeapi.co/api/v2/pokemon/10086/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "mummy": {
    "id": 152,
    "name": "mummy",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Whenever a contact move hits this Pokémon, the attacking Pokémon's ability changes to Mummy.\n\nmultitype is unaffected.  If a Pokémon with moxie knocks this Pokémon out, the former's ability will change without taking effect.",
    "shortEffect": "Changes attacking Pokémon's abilities to Mummy on contact.",
    "flavorText": "Contact with this Pokémon\nspreads this Ability.",
    "pokemon": [
      {
        "name": "yamask",
        "url": "https://pokeapi.co/api/v2/pokemon/562/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cofagrigus",
        "url": "https://pokeapi.co/api/v2/pokemon/563/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "prankster": {
    "id": 158,
    "name": "prankster",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's non-damaging moves have their priority increased by one stage.",
    "shortEffect": "Raises non-damaging moves' priority by one stage.",
    "flavorText": "Gives priority to a\nstatus move.",
    "pokemon": [
      {
        "name": "murkrow",
        "url": "https://pokeapi.co/api/v2/pokemon/198/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sableye",
        "url": "https://pokeapi.co/api/v2/pokemon/302/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "volbeat",
        "url": "https://pokeapi.co/api/v2/pokemon/313/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "illumise",
        "url": "https://pokeapi.co/api/v2/pokemon/314/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "riolu",
        "url": "https://pokeapi.co/api/v2/pokemon/447/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "purrloin",
        "url": "https://pokeapi.co/api/v2/pokemon/509/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "liepard",
        "url": "https://pokeapi.co/api/v2/pokemon/510/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cottonee",
        "url": "https://pokeapi.co/api/v2/pokemon/546/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "whimsicott",
        "url": "https://pokeapi.co/api/v2/pokemon/547/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tornadus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/641/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "thundurus-incarnate",
        "url": "https://pokeapi.co/api/v2/pokemon/642/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "meowstic-male",
        "url": "https://pokeapi.co/api/v2/pokemon/678/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "klefki",
        "url": "https://pokeapi.co/api/v2/pokemon/707/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "impidimp",
        "url": "https://pokeapi.co/api/v2/pokemon/859/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "morgrem",
        "url": "https://pokeapi.co/api/v2/pokemon/860/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grimmsnarl",
        "url": "https://pokeapi.co/api/v2/pokemon/861/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "shroodle",
        "url": "https://pokeapi.co/api/v2/pokemon/944/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "grafaiai",
        "url": "https://pokeapi.co/api/v2/pokemon/945/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "banette-mega",
        "url": "https://pokeapi.co/api/v2/pokemon/10056/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grimmsnarl-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10222/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sweet-veil": {
    "id": 175,
    "name": "sweet-veil",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Prevents friendly Pokémon from sleeping.",
    "shortEffect": "Prevents friendly Pokémon from sleeping.",
    "flavorText": "Prevents itself and ally Pokémon\nfrom falling asleep.",
    "pokemon": [
      {
        "name": "swirlix",
        "url": "https://pokeapi.co/api/v2/pokemon/684/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slurpuff",
        "url": "https://pokeapi.co/api/v2/pokemon/685/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cutiefly",
        "url": "https://pokeapi.co/api/v2/pokemon/742/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "ribombee",
        "url": "https://pokeapi.co/api/v2/pokemon/743/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "bounsweet",
        "url": "https://pokeapi.co/api/v2/pokemon/761/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "steenee",
        "url": "https://pokeapi.co/api/v2/pokemon/762/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tsareena",
        "url": "https://pokeapi.co/api/v2/pokemon/763/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "milcery",
        "url": "https://pokeapi.co/api/v2/pokemon/868/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "alcremie",
        "url": "https://pokeapi.co/api/v2/pokemon/869/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "ribombee-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10150/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "alcremie-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10223/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "stakeout": {
    "id": 198,
    "name": "stakeout",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon's moves have double power against Pokémon that switched in this turn.",
    "shortEffect": "This Pokémon's moves have double power against Pokémon that switched in this turn.",
    "flavorText": "Doubles the damage dealt to the target’s\nreplacement if the target switches out.",
    "pokemon": [
      {
        "name": "yungoos",
        "url": "https://pokeapi.co/api/v2/pokemon/734/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gumshoos",
        "url": "https://pokeapi.co/api/v2/pokemon/735/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "nickit",
        "url": "https://pokeapi.co/api/v2/pokemon/827/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "thievul",
        "url": "https://pokeapi.co/api/v2/pokemon/828/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tarountula",
        "url": "https://pokeapi.co/api/v2/pokemon/917/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "spidops",
        "url": "https://pokeapi.co/api/v2/pokemon/918/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "maschiff",
        "url": "https://pokeapi.co/api/v2/pokemon/942/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "mabosstiff",
        "url": "https://pokeapi.co/api/v2/pokemon/943/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gumshoos-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10121/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "desolate-land": {
    "id": 190,
    "name": "desolate-land",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "When this Pokémon enters battle or gains this ability, the weather becomes extremely harsh sunlight.  Extremely harsh sunlight has all the properties of sunny day and also causes damaging Water moves to fail.\n\nExtremely harsh sunlight ends when this Pokémon leaves battle or loses this ability, or when this ability is nullified.  The weather cannot otherwise be changed except by the effects of delta stream and primordial sea.\n\nair lock and cloud nine will prevent the effects of extremely harsh sunlight, including allowing Water moves to work, but will not allow the weather to be changed.",
    "shortEffect": "Creates extremely harsh sunlight, which has all the properties of Sunny Day, cannot be replaced, and causes damaging Water moves to fail.",
    "flavorText": "Affects weather and nullifies any\nWater-type attacks.",
    "pokemon": [
      {
        "name": "groudon-primal",
        "url": "https://pokeapi.co/api/v2/pokemon/10078/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "teravolt": {
    "id": 164,
    "name": "teravolt",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon's moves completely ignore abilities that could hinder or prevent their effect on the target.\n\nFor example, this Pokémon's moves ignore abilities that would fully negate them, such as water absorb; abilities that would prevent any of their effects, such as clear body, shell armor, or sticky hold; and abilities that grant any general protective benefit, such as simple, snow cloak, or thick fat.  If an ability could either hinder or help this Pokémon's moves, e.g. dry skin or unaware, the ability is ignored either way.\n\nAbilities that do not fit this description, even if they could hinder moves in some other way, are not affected.  For example, cursed body only affects potential future uses of the move, while liquid ooze and shadow tag can only hinder a move's effect on the user.  This ablity cannot ignore type or form changes granted by abilities, for example color change or forecast; nor effects that were caused by abilities but are no longer tied to an ability, such as the rain from drizzle.  This ability cannot ignore multitype at all.\n\nAn ability ignored by this ability is only nullified while the move is being used.  For example, this Pokémon's moves can paralyze a Pokémon with limber, but Limber will activate and heal the paralysis immediately thereafter, and this Pokémon's spikes are not affected by this ability after they have been placed.\n\nWhen this Pokémon enters battle, all participating trainers are notified that it has this ability.\n\nThis ability functions identically to mold breaker and turboblaze.",
    "shortEffect": "Bypasses targets' abilities if they could hinder or prevent moves.",
    "flavorText": "Moves can be used\nregardless of Abilities.",
    "pokemon": [
      {
        "name": "zekrom",
        "url": "https://pokeapi.co/api/v2/pokemon/644/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kyurem-black",
        "url": "https://pokeapi.co/api/v2/pokemon/10022/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "justified": {
    "id": 154,
    "name": "justified",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Whenever a dark-type move hits this Pokémon, its Attack rises one stage.\n\nThe move is not negated in any way.",
    "shortEffect": "Raises Attack one stage upon taking damage from a dark move.",
    "flavorText": "Raises Attack when hit by\na Dark-type move.",
    "pokemon": [
      {
        "name": "growlithe",
        "url": "https://pokeapi.co/api/v2/pokemon/58/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arcanine",
        "url": "https://pokeapi.co/api/v2/pokemon/59/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "absol",
        "url": "https://pokeapi.co/api/v2/pokemon/359/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "lucario",
        "url": "https://pokeapi.co/api/v2/pokemon/448/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "gallade",
        "url": "https://pokeapi.co/api/v2/pokemon/475/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cobalion",
        "url": "https://pokeapi.co/api/v2/pokemon/638/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "terrakion",
        "url": "https://pokeapi.co/api/v2/pokemon/639/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "virizion",
        "url": "https://pokeapi.co/api/v2/pokemon/640/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "keldeo-ordinary",
        "url": "https://pokeapi.co/api/v2/pokemon/647/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "keldeo-resolute",
        "url": "https://pokeapi.co/api/v2/pokemon/10024/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "gooey": {
    "id": 183,
    "name": "gooey",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "Lowers attacking Pokémon's Speed by one stage on contact.",
    "shortEffect": "Lowers attacking Pokémon's Speed by one stage on contact.",
    "flavorText": "Contact with the Pokémon\nlowers the attacker’s Speed stat.",
    "pokemon": [
      {
        "name": "goomy",
        "url": "https://pokeapi.co/api/v2/pokemon/704/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sliggoo",
        "url": "https://pokeapi.co/api/v2/pokemon/705/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "goodra",
        "url": "https://pokeapi.co/api/v2/pokemon/706/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "wiglett",
        "url": "https://pokeapi.co/api/v2/pokemon/960/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wugtrio",
        "url": "https://pokeapi.co/api/v2/pokemon/961/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sliggoo-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10241/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "goodra-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10242/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "zen-mode": {
    "id": 161,
    "name": "zen-mode",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "This Pokémon switches between Standard Mode and Zen Mode after each turn depending on its HP.  Below 50% of its maximum HP, it switches to Zen Mode, and at 50% or above, it switches to Standard Mode.\n\nThis Pokémon returns to Standard Mode upon leaving battle or losing this ability.  This ability has no effect if this Pokémon is not a darmanitan.",
    "shortEffect": "Changes darmanitan's form after each turn depending on its HP: Zen Mode below 50% max HP, and Standard Mode otherwise.",
    "flavorText": "Changes the Pokémon’s\nshape when HP is halved.",
    "pokemon": [
      {
        "name": "darmanitan-standard",
        "url": "https://pokeapi.co/api/v2/pokemon/555/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "darmanitan-zen",
        "url": "https://pokeapi.co/api/v2/pokemon/10017/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "darmanitan-galar-standard",
        "url": "https://pokeapi.co/api/v2/pokemon/10177/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "darmanitan-galar-zen",
        "url": "https://pokeapi.co/api/v2/pokemon/10178/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "aura-break": {
    "id": 188,
    "name": "aura-break",
    "isMainSeries": true,
    "generation": "generation-vi",
    "effect": "While this Pokémon is on the field, dark aura and fairy aura weaken moves of their respective types to 2/3 their power, rather than strengthening them.",
    "shortEffect": "Makes dark aura and fairy aura weaken moves of their respective types.",
    "flavorText": "The effects of “Aura” Abilities\nare reversed.",
    "pokemon": [
      {
        "name": "zygarde-50",
        "url": "https://pokeapi.co/api/v2/pokemon/718/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zygarde-10",
        "url": "https://pokeapi.co/api/v2/pokemon/10181/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sap-sipper": {
    "id": 157,
    "name": "sap-sipper",
    "isMainSeries": true,
    "generation": "generation-v",
    "effect": "Whenever a grass-type move hits this Pokémon, its Attack rises one stage, negating any other effect on it.",
    "shortEffect": "Absorbs grass moves, raising Attack one stage.",
    "flavorText": "Boosts Attack when hit by\na Grass-type move.",
    "pokemon": [
      {
        "name": "marill",
        "url": "https://pokeapi.co/api/v2/pokemon/183/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "azumarill",
        "url": "https://pokeapi.co/api/v2/pokemon/184/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "girafarig",
        "url": "https://pokeapi.co/api/v2/pokemon/203/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "stantler",
        "url": "https://pokeapi.co/api/v2/pokemon/234/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "miltank",
        "url": "https://pokeapi.co/api/v2/pokemon/241/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "azurill",
        "url": "https://pokeapi.co/api/v2/pokemon/298/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "blitzle",
        "url": "https://pokeapi.co/api/v2/pokemon/522/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "zebstrika",
        "url": "https://pokeapi.co/api/v2/pokemon/523/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "deerling",
        "url": "https://pokeapi.co/api/v2/pokemon/585/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sawsbuck",
        "url": "https://pokeapi.co/api/v2/pokemon/586/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bouffalant",
        "url": "https://pokeapi.co/api/v2/pokemon/626/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "skiddo",
        "url": "https://pokeapi.co/api/v2/pokemon/672/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gogoat",
        "url": "https://pokeapi.co/api/v2/pokemon/673/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "goomy",
        "url": "https://pokeapi.co/api/v2/pokemon/704/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sliggoo",
        "url": "https://pokeapi.co/api/v2/pokemon/705/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "goodra",
        "url": "https://pokeapi.co/api/v2/pokemon/706/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "drampa",
        "url": "https://pokeapi.co/api/v2/pokemon/780/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "wyrdeer",
        "url": "https://pokeapi.co/api/v2/pokemon/899/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "farigiraf",
        "url": "https://pokeapi.co/api/v2/pokemon/981/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sliggoo-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10241/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "goodra-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10242/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "psychic-surge": {
    "id": 227,
    "name": "psychic-surge",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon enters battle, it changes the terrain to psychic terrain.",
    "shortEffect": "When this Pokémon enters battle, it changes the terrain to Psychic Terrain.",
    "flavorText": "Turns the ground into Psychic Terrain when\nthe Pokémon enters a battle.",
    "pokemon": [
      {
        "name": "tapu-lele",
        "url": "https://pokeapi.co/api/v2/pokemon/786/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "indeedee-male",
        "url": "https://pokeapi.co/api/v2/pokemon/876/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "indeedee-female",
        "url": "https://pokeapi.co/api/v2/pokemon/10186/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "gulp-missile": {
    "id": 241,
    "name": "gulp-missile",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When the Pokémon uses Surf or Dive, it will come back with prey. When it takes damage, it will spit out the prey to attack.",
    "shortEffect": "If a Cramorant with Gulp Missile uses Surf or Dive, it catches prey and changes its form depending on its remaining HP.",
    "flavorText": "When the Pokémon uses Surf or Dive, it will come back\nwith prey. When it takes damage, it will spit out the prey\nto attack.",
    "pokemon": [
      {
        "name": "cramorant",
        "url": "https://pokeapi.co/api/v2/pokemon/845/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cramorant-gulping",
        "url": "https://pokeapi.co/api/v2/pokemon/10182/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "cramorant-gorging",
        "url": "https://pokeapi.co/api/v2/pokemon/10183/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "propeller-tail": {
    "id": 239,
    "name": "propeller-tail",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Ignores the effects of opposing Pokémon’s Abilities and moves that draw in moves.",
    "shortEffect": "Ignores moves and abilities that draw in moves.",
    "flavorText": "Ignores the effects of opposing Pokémon’s Abilities and\nmoves that draw in moves.",
    "pokemon": [
      {
        "name": "arrokuda",
        "url": "https://pokeapi.co/api/v2/pokemon/846/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "barraskewda",
        "url": "https://pokeapi.co/api/v2/pokemon/847/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "power-spot": {
    "id": 249,
    "name": "power-spot",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": " \"The power of moves used by the allies of the Pokémon with Power Spot is increased by 30%.\"",
    "shortEffect": "Just being next to the Pokémon powers up moves.",
    "flavorText": "Just being next to the Pokémon powers up moves.",
    "pokemon": [
      {
        "name": "stonjourner",
        "url": "https://pokeapi.co/api/v2/pokemon/874/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "long-reach": {
    "id": 203,
    "name": "long-reach",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "A move used by this Pokémon will not make contact.",
    "shortEffect": "This Pokémon's moves do not make contact.",
    "flavorText": "The Pokémon uses its moves without making contact\nwith the target.",
    "pokemon": [
      {
        "name": "rowlet",
        "url": "https://pokeapi.co/api/v2/pokemon/722/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "dartrix",
        "url": "https://pokeapi.co/api/v2/pokemon/723/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "decidueye",
        "url": "https://pokeapi.co/api/v2/pokemon/724/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "galvanize": {
    "id": 206,
    "name": "galvanize",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon uses a Normal moves, that move is Electric its power is 1.2×.",
    "shortEffect": "This Pokémon's Normal moves are Electric and have their power increased to 1.2×.",
    "flavorText": "Normal-type moves become Electric-type moves.\nThe power of those moves is boosted a little.",
    "pokemon": [
      {
        "name": "geodude-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10109/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "graveler-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10110/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "golem-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10111/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "full-metal-body": {
    "id": 230,
    "name": "full-metal-body",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon's stats cannot be lowered by other Pokémon's moves or abilities.  This effect only applies to normal stat modifications and not more exotic effects such as topsy turvy or power swap.\n\nThis Ability is not bypassed by mold breaker, teravolt, or turboblaze.",
    "shortEffect": "Other Pokémon cannot lower this Pokémon's stats.",
    "flavorText": "Prevents other Pokémon’s moves or Abilities from\nlowering the Pokémon’s stats.",
    "pokemon": [
      {
        "name": "solgaleo",
        "url": "https://pokeapi.co/api/v2/pokemon/791/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "beast-boost": {
    "id": 224,
    "name": "beast-boost",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Raises this Pokémon's highest stat by one stage when it faints another Pokémon.",
    "shortEffect": "Raises this Pokémon's highest stat by one stage when it faints another Pokémon.",
    "flavorText": "The Pokémon boosts its most proficient stat each\ntime it knocks out a Pokémon.",
    "pokemon": [
      {
        "name": "nihilego",
        "url": "https://pokeapi.co/api/v2/pokemon/793/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "buzzwole",
        "url": "https://pokeapi.co/api/v2/pokemon/794/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pheromosa",
        "url": "https://pokeapi.co/api/v2/pokemon/795/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "xurkitree",
        "url": "https://pokeapi.co/api/v2/pokemon/796/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "celesteela",
        "url": "https://pokeapi.co/api/v2/pokemon/797/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kartana",
        "url": "https://pokeapi.co/api/v2/pokemon/798/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "guzzlord",
        "url": "https://pokeapi.co/api/v2/pokemon/799/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "poipole",
        "url": "https://pokeapi.co/api/v2/pokemon/803/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "naganadel",
        "url": "https://pokeapi.co/api/v2/pokemon/804/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "stakataka",
        "url": "https://pokeapi.co/api/v2/pokemon/805/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "blacephalon",
        "url": "https://pokeapi.co/api/v2/pokemon/806/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "ripen": {
    "id": 247,
    "name": "ripen",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Ripens Berries and doubles their effect.",
    "shortEffect": "Doubles the effect of berries.",
    "flavorText": "Ripens Berries and doubles their effect.",
    "pokemon": [
      {
        "name": "applin",
        "url": "https://pokeapi.co/api/v2/pokemon/840/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flapple",
        "url": "https://pokeapi.co/api/v2/pokemon/841/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "appletun",
        "url": "https://pokeapi.co/api/v2/pokemon/842/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flapple-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10216/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "appletun-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10217/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "corrosion": {
    "id": 212,
    "name": "corrosion",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon's moves and item ignore the usual immunity of Poison and Steel Pokémon when attempting to inflict poison.",
    "shortEffect": "This Pokémon can inflict poison on Poison and Steel Pokémon.",
    "flavorText": "The Pokémon can poison the target even if it’s\na Steel or Poison type.",
    "pokemon": [
      {
        "name": "salandit",
        "url": "https://pokeapi.co/api/v2/pokemon/757/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "salazzle",
        "url": "https://pokeapi.co/api/v2/pokemon/758/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "glimmet",
        "url": "https://pokeapi.co/api/v2/pokemon/969/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "glimmora",
        "url": "https://pokeapi.co/api/v2/pokemon/970/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "salazzle-totem",
        "url": "https://pokeapi.co/api/v2/pokemon/10129/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "power-of-alchemy": {
    "id": 223,
    "name": "power-of-alchemy",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When an ally faints, this Pokémon gains its Ability.",
    "shortEffect": "When an ally faints, this Pokémon gains its Ability.",
    "flavorText": "The Pokémon copies the Ability of a defeated ally.",
    "pokemon": [
      {
        "name": "grimer-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10112/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "muk-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10113/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "dauntless-shield": {
    "id": 235,
    "name": "dauntless-shield",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Boosts the Pokémon’s Defense stat the first time the Pokémon enters a battle.",
    "shortEffect": "Boosts Defense in battle.",
    "flavorText": "Boosts the Pokémon’s Defense stat when the Pokémon\nenters a battle.",
    "pokemon": [
      {
        "name": "zamazenta",
        "url": "https://pokeapi.co/api/v2/pokemon/889/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zamazenta-crowned",
        "url": "https://pokeapi.co/api/v2/pokemon/10189/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "shadow-shield": {
    "id": 231,
    "name": "shadow-shield",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon has full HP, regular damage (not fixed damage!) from moves is halved.\n\nThis ability cannot be nullified.",
    "shortEffect": "When this Pokémon has full HP, regular damage from moves is halved.",
    "flavorText": "Reduces the amount of damage the Pokémon takes\nwhile its HP is full.",
    "pokemon": [
      {
        "name": "lunala",
        "url": "https://pokeapi.co/api/v2/pokemon/792/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "battle-bond": {
    "id": 210,
    "name": "battle-bond",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Transforms this Pokémon into Ash-Greninja after fainting an opponent.  Water Shuriken's power is 20 and always hits three times.\n\nThis ability cannot be copied or replaced.  This ability only takes effect for Greninja.",
    "shortEffect": "Transforms this Pokémon into Ash-Greninja after fainting an opponent.  Water Shuriken's power is 20 and always hits three times.",
    "flavorText": "Defeating an opposing Pokémon strengthens the\nPokémon’s bond with its Trainer, and it becomes\nAsh-Greninja. Water Shuriken gets more powerful.",
    "pokemon": [
      {
        "name": "greninja-battle-bond",
        "url": "https://pokeapi.co/api/v2/pokemon/10116/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "greninja-ash",
        "url": "https://pokeapi.co/api/v2/pokemon/10117/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "misty-surge": {
    "id": 228,
    "name": "misty-surge",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon enters battle, it changes the terrain to misty terrain.",
    "shortEffect": "When this Pokémon enters battle, it changes the terrain to Misty Terrain.",
    "flavorText": "Turns the ground into Misty Terrain when\nthe Pokémon enters a battle.",
    "pokemon": [
      {
        "name": "tapu-fini",
        "url": "https://pokeapi.co/api/v2/pokemon/788/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "weezing-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10167/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "ice-scales": {
    "id": 246,
    "name": "ice-scales",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "The Pokémon is protected by ice scales, which halve the damage taken from special moves.",
    "shortEffect": "Halves damage from Special moves.",
    "flavorText": "The Pokémon is protected by ice scales, which halve\nthe damage taken from special moves.",
    "pokemon": [
      {
        "name": "snom",
        "url": "https://pokeapi.co/api/v2/pokemon/872/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "frosmoth",
        "url": "https://pokeapi.co/api/v2/pokemon/873/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "liquid-voice": {
    "id": 204,
    "name": "liquid-voice",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon uses a move that is sound-based, that move's type is Water.",
    "shortEffect": "Sound-based moves become Water-type.",
    "flavorText": "All sound-based moves become Water-type moves.",
    "pokemon": [
      {
        "name": "popplio",
        "url": "https://pokeapi.co/api/v2/pokemon/728/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "brionne",
        "url": "https://pokeapi.co/api/v2/pokemon/729/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "primarina",
        "url": "https://pokeapi.co/api/v2/pokemon/730/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "dazzling": {
    "id": 219,
    "name": "dazzling",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When an opposing Pokémon attempts to use a move that targets this Pokémon or an ally, and that move has priority, it will fail.",
    "shortEffect": "Opposing Pokémon cannot use priority attacks.",
    "flavorText": "Surprises the opposing Pokémon, making it unable\nto attack using priority moves.",
    "pokemon": [
      {
        "name": "bruxish",
        "url": "https://pokeapi.co/api/v2/pokemon/779/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sand-spit": {
    "id": 245,
    "name": "sand-spit",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "The Pokémon creates a sandstorm when it’s hit by an attack.",
    "shortEffect": "Creates a sandstorm when hit by an attack.",
    "flavorText": "The Pokémon creates a sandstorm when it’s hit by\nan attack.",
    "pokemon": [
      {
        "name": "silicobra",
        "url": "https://pokeapi.co/api/v2/pokemon/843/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandaconda",
        "url": "https://pokeapi.co/api/v2/pokemon/844/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandaconda-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10218/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "slush-rush": {
    "id": 202,
    "name": "slush-rush",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "During Hail, this Pokémon has double Speed.",
    "shortEffect": "During Hail, this Pokémon has double Speed.",
    "flavorText": "Boosts the Pokémon’s Speed stat in a hailstorm.",
    "pokemon": [
      {
        "name": "cubchoo",
        "url": "https://pokeapi.co/api/v2/pokemon/613/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "beartic",
        "url": "https://pokeapi.co/api/v2/pokemon/614/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "arctozolt",
        "url": "https://pokeapi.co/api/v2/pokemon/881/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "arctovish",
        "url": "https://pokeapi.co/api/v2/pokemon/883/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cetitan",
        "url": "https://pokeapi.co/api/v2/pokemon/975/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "sandshrew-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10101/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "sandslash-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10102/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "disguise": {
    "id": 209,
    "name": "disguise",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "If this Pokémon is in its Disguised Form and takes damage from a move, it switches to its Busted Form and the damage is prevented.  Other effects are not prevented.\n\nThis ability cannot be copied or replaced.  This ability only takes effect for Mimikyu.",
    "shortEffect": "Prevents the first instance of battle damage.",
    "flavorText": "Once per battle, the shroud that covers the\nPokémon can protect it from an attack.",
    "pokemon": [
      {
        "name": "mimikyu-disguised",
        "url": "https://pokeapi.co/api/v2/pokemon/778/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mimikyu-busted",
        "url": "https://pokeapi.co/api/v2/pokemon/10143/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mimikyu-totem-disguised",
        "url": "https://pokeapi.co/api/v2/pokemon/10144/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "mimikyu-totem-busted",
        "url": "https://pokeapi.co/api/v2/pokemon/10145/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "neuroforce": {
    "id": 233,
    "name": "neuroforce",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Increases super-effective damage dealt to 1.25×.",
    "shortEffect": "Increases super-effective damage dealt to 1.25×.",
    "flavorText": "Powers up moves that are super effective.",
    "pokemon": [
      {
        "name": "necrozma-ultra",
        "url": "https://pokeapi.co/api/v2/pokemon/10157/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "prism-armor": {
    "id": 232,
    "name": "prism-armor",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Super-effective damage this Pokémon takes is reduced to 0.75×.\n\nThis Ability is not bypassed by mold breaker, teravolt, or turboblaze.",
    "shortEffect": "Reduces super-effective damage to 0.75×.",
    "flavorText": "Reduces the power of supereffective attacks taken.",
    "pokemon": [
      {
        "name": "necrozma",
        "url": "https://pokeapi.co/api/v2/pokemon/800/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "necrozma-dusk",
        "url": "https://pokeapi.co/api/v2/pokemon/10155/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "necrozma-dawn",
        "url": "https://pokeapi.co/api/v2/pokemon/10156/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "stalwart": {
    "id": 242,
    "name": "stalwart",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Ignores the effects of opposing Pokémon’s Abilities and moves that draw in moves.",
    "shortEffect": "Ignores moves and abilities that draw in moves.",
    "flavorText": "Ignores the effects of opposing Pokémon’s Abilities and\nmoves that draw in moves.",
    "pokemon": [
      {
        "name": "duraludon",
        "url": "https://pokeapi.co/api/v2/pokemon/884/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "archaludon",
        "url": "https://pokeapi.co/api/v2/pokemon/1018/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "duraludon-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10225/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "power-construct": {
    "id": 211,
    "name": "power-construct",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Transforms 10% or 50% Zygarde into Complete Forme when its HP is below 50%.\n\nThis ability cannot be copied or replaced.  This ability only takes effect for Zygarde.",
    "shortEffect": "Transforms 10% or 50% Zygarde into Complete Forme when its HP is below 50%.",
    "flavorText": "Other Cells gather to aid when its HP becomes\nhalf or less. Then the Pokémon changes\nits form to Complete Forme.",
    "pokemon": [
      {
        "name": "zygarde-10-power-construct",
        "url": "https://pokeapi.co/api/v2/pokemon/10118/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zygarde-50-power-construct",
        "url": "https://pokeapi.co/api/v2/pokemon/10119/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zygarde-complete",
        "url": "https://pokeapi.co/api/v2/pokemon/10120/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "fluffy": {
    "id": 218,
    "name": "fluffy",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Damage from contact moves is halved.  Damage from Fire moves is doubled.",
    "shortEffect": "Damage from contact moves is halved.  Damage from Fire moves is doubled.",
    "flavorText": "Halves the damage taken from moves that make\ndirect contact, but doubles that of Fire-type moves.",
    "pokemon": [
      {
        "name": "stufful",
        "url": "https://pokeapi.co/api/v2/pokemon/759/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "bewear",
        "url": "https://pokeapi.co/api/v2/pokemon/760/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wooloo",
        "url": "https://pokeapi.co/api/v2/pokemon/831/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "dubwool",
        "url": "https://pokeapi.co/api/v2/pokemon/832/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "greavard",
        "url": "https://pokeapi.co/api/v2/pokemon/971/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "houndstone",
        "url": "https://pokeapi.co/api/v2/pokemon/972/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "mirror-armor": {
    "id": 240,
    "name": "mirror-armor",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Bounces back only the stat-lowering effects that the Pokémon receives.",
    "shortEffect": "Reflects any stat-lowering effects.",
    "flavorText": "Bounces back only the stat-lowering effects that\nthe Pokémon receives.",
    "pokemon": [
      {
        "name": "corviknight",
        "url": "https://pokeapi.co/api/v2/pokemon/823/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "corviknight-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10212/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "triage": {
    "id": 205,
    "name": "triage",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon's healing moves have their priority increased by 3.",
    "shortEffect": "This Pokémon's healing moves have their priority increased by 3.",
    "flavorText": "Gives priority to a healing move.",
    "pokemon": [
      {
        "name": "comfey",
        "url": "https://pokeapi.co/api/v2/pokemon/764/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "surge-surfer": {
    "id": 207,
    "name": "surge-surfer",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Doubles this Pokémon's Speed on Electric Terrain.",
    "shortEffect": "Doubles this Pokémon's Speed on Electric Terrain.",
    "flavorText": "Doubles the Pokémon’s Speed stat on\nElectric Terrain.",
    "pokemon": [
      {
        "name": "raichu-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10100/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "soul-heart": {
    "id": 220,
    "name": "soul-heart",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon's Special Attack rises by one stage every time any Pokémon faints.",
    "shortEffect": "This Pokémon's Special Attack rises by one stage every time any Pokémon faints.",
    "flavorText": "Boosts its Sp. Atk stat every time a Pokémon faints.",
    "pokemon": [
      {
        "name": "magearna",
        "url": "https://pokeapi.co/api/v2/pokemon/801/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "magearna-original",
        "url": "https://pokeapi.co/api/v2/pokemon/10147/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "electric-surge": {
    "id": 226,
    "name": "electric-surge",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon enters battle, it changes the terrain to electric terrain.",
    "shortEffect": "When this Pokémon enters battle, it changes the terrain to Electric Terrain.",
    "flavorText": "Turns the ground into Electric Terrain when the\nPokémon enters a battle.",
    "pokemon": [
      {
        "name": "tapu-koko",
        "url": "https://pokeapi.co/api/v2/pokemon/785/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "pincurchin",
        "url": "https://pokeapi.co/api/v2/pokemon/871/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "dancer": {
    "id": 216,
    "name": "dancer",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Whenever another Pokémon uses a dance move, this Pokémon will use the same move immediately afterwards.",
    "shortEffect": "Whenever another Pokémon uses a dance move, this Pokémon will use the same move immediately afterwards.",
    "flavorText": "When another Pokémon uses a dance move,\nit can use a dance move following it regardless\nof its Speed.",
    "pokemon": [
      {
        "name": "oricorio-baile",
        "url": "https://pokeapi.co/api/v2/pokemon/741/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "oricorio-pom-pom",
        "url": "https://pokeapi.co/api/v2/pokemon/10123/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "oricorio-pau",
        "url": "https://pokeapi.co/api/v2/pokemon/10124/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "oricorio-sensu",
        "url": "https://pokeapi.co/api/v2/pokemon/10125/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "receiver": {
    "id": 222,
    "name": "receiver",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When an ally faints, this Pokémon gains its Ability.",
    "shortEffect": "When an ally faints, this Pokémon gains its Ability.",
    "flavorText": "The Pokémon copies the Ability of a defeated ally.",
    "pokemon": [
      {
        "name": "passimian",
        "url": "https://pokeapi.co/api/v2/pokemon/766/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "mimicry": {
    "id": 250,
    "name": "mimicry",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Changes the Pokémon’s type depending on the terrain.",
    "shortEffect": "Changes type depending on the terrain.",
    "flavorText": "Changes the Pokémon’s type depending on the terrain.",
    "pokemon": [
      {
        "name": "stunfisk-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10180/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "ball-fetch": {
    "id": 237,
    "name": "ball-fetch",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "At any time after the first Poké Ball is thrown and fails to catch a Pokémon, at the end of a turn, if a Pokémon with Ball Fetch is on the field and not holding another item, it will pick up the same type of ball as the first one thrown.",
    "shortEffect": "If the Pokémon is not holding an item, it will fetch the Poké Ball from the first failed throw of the battle.",
    "flavorText": "If the Pokémon is not holding an item, it will fetch\nthe Poké Ball from the first failed throw\nof the battle.",
    "pokemon": [
      {
        "name": "yamper",
        "url": "https://pokeapi.co/api/v2/pokemon/835/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "comatose": {
    "id": 213,
    "name": "comatose",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "This Pokémon always acts as though it were Asleep.  It cannot be given another status ailment; it's unaffected by yawn; it can use sleep talk; and so on.",
    "shortEffect": "This Pokémon always  acts as though it were Asleep.",
    "flavorText": "It’s always drowsing and will never wake up.\nIt can attack without waking up.",
    "pokemon": [
      {
        "name": "komala",
        "url": "https://pokeapi.co/api/v2/pokemon/775/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "ice-face": {
    "id": 248,
    "name": "ice-face",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When an Eiscue that's in its Ice Face form is hit by a physical move, it takes no damage and changes into its Noice Face form. If a hailstorm or snowstorm begins while Eiscue is in its Noice Face form, or if it is sent out in its Noice Face form during hail, it will immediately revert to its Ice Face form.",
    "shortEffect": "The Pokémon’s ice head can take a physical attack as a substitute, but the attack also changes the Pokémon’s appearance. The ice will be restored when it snows.",
    "flavorText": "The Pokémon’s ice head can take a physical attack as\na substitute, but the attack also changes the Pokémon’s\nappearance. The ice will be restored when it hails.",
    "pokemon": [
      {
        "name": "eiscue-ice",
        "url": "https://pokeapi.co/api/v2/pokemon/875/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eiscue-noice",
        "url": "https://pokeapi.co/api/v2/pokemon/10185/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "steam-engine": {
    "id": 243,
    "name": "steam-engine",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Raises the user's Speed by three stages when it is hit by a Fire- or Water-type attack. The attack still deals damage.",
    "shortEffect": "Boosts the Speed stat drastically when the Pokémon is hit by a Fire- or Water-type move.",
    "flavorText": "Boosts the Pokémon’s Speed stat drastically if hit by a\nFire- or Water-type move.",
    "pokemon": [
      {
        "name": "rolycoly",
        "url": "https://pokeapi.co/api/v2/pokemon/837/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "carkol",
        "url": "https://pokeapi.co/api/v2/pokemon/838/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "coalossal",
        "url": "https://pokeapi.co/api/v2/pokemon/839/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "coalossal-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10215/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "innards-out": {
    "id": 215,
    "name": "innards-out",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon faints from an opponent's move, that opponent takes damage equal to the HP this Pokémon had remaining.",
    "shortEffect": "When this Pokémon faints from an opponent's move, that opponent takes damage equal to the HP this Pokémon had remaining.",
    "flavorText": "Damages the attacker landing the finishing hit\nby the amount equal to its last HP.",
    "pokemon": [
      {
        "name": "pyukumuku",
        "url": "https://pokeapi.co/api/v2/pokemon/771/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "rks-system": {
    "id": 225,
    "name": "rks-system",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Changes this Pokémon's type to match its held Memory.\n\nThis ability cannot be copied, replaced, or nullified.  This ability only takes effect for Silvally.",
    "shortEffect": "Changes this Pokémon's type to match its held Memory.",
    "flavorText": "Changes the Pokémon’s type to match the\nmemory disc it holds.",
    "pokemon": [
      {
        "name": "silvally",
        "url": "https://pokeapi.co/api/v2/pokemon/773/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "intrepid-sword": {
    "id": 234,
    "name": "intrepid-sword",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Boosts the Pokémon’s Attack stat the first time the Pokémon enters a battle.",
    "shortEffect": "Boosts Attack in battle.",
    "flavorText": "Boosts the Pokémon’s Attack stat when the Pokémon\nenters a battle.",
    "pokemon": [
      {
        "name": "zacian",
        "url": "https://pokeapi.co/api/v2/pokemon/888/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "zacian-crowned",
        "url": "https://pokeapi.co/api/v2/pokemon/10188/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "grassy-surge": {
    "id": 229,
    "name": "grassy-surge",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon enters battle, it changes the terrain to grassy terrain.",
    "shortEffect": "When this Pokémon enters battle, it changes the terrain to Grassy Terrain.",
    "flavorText": "Turns the ground into Grassy Terrain when\nthe Pokémon enters a battle.",
    "pokemon": [
      {
        "name": "tapu-bulu",
        "url": "https://pokeapi.co/api/v2/pokemon/787/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "grookey",
        "url": "https://pokeapi.co/api/v2/pokemon/810/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "thwackey",
        "url": "https://pokeapi.co/api/v2/pokemon/811/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rillaboom",
        "url": "https://pokeapi.co/api/v2/pokemon/812/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "rillaboom-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10209/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "punk-rock": {
    "id": 244,
    "name": "punk-rock",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Boosts the power of sound-based moves. The Pokémon also takes half the damage from these kinds of moves.",
    "shortEffect": "Boosts sound-based moves and halves damage from the same moves.",
    "flavorText": "Boosts the power of sound-based moves.\nThe Pokémon also takes half the damage from\nthese kinds of moves.",
    "pokemon": [
      {
        "name": "toxtricity-amped",
        "url": "https://pokeapi.co/api/v2/pokemon/849/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toxtricity-low-key",
        "url": "https://pokeapi.co/api/v2/pokemon/10184/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toxtricity-amped-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10219/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toxtricity-low-key-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10228/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "battery": {
    "id": 217,
    "name": "battery",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Ally Pokémon's moves have their power increased to 1.3×.",
    "shortEffect": "Ally Pokémon's moves have their power increased to 1.3×.",
    "flavorText": "Powers up ally Pokémon’s special moves.",
    "pokemon": [
      {
        "name": "charjabug",
        "url": "https://pokeapi.co/api/v2/pokemon/737/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "cotton-down": {
    "id": 238,
    "name": "cotton-down",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When the Pokémon is hit by an attack, it scatters cotton fluff around and lowers the Speed stats of all Pokémon except itself.",
    "shortEffect": "When Ignores moves and abilities that draw in moves.",
    "flavorText": "When the Pokémon is hit by an attack, it scatters\ncotton fluff around and lowers the Speed stat of\nall Pokémon except itself.",
    "pokemon": [
      {
        "name": "gossifleur",
        "url": "https://pokeapi.co/api/v2/pokemon/829/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "eldegoss",
        "url": "https://pokeapi.co/api/v2/pokemon/830/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "queenly-majesty": {
    "id": 214,
    "name": "queenly-majesty",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When an opposing Pokémon attempts to use a move that targets this Pokémon or an ally, and that move has priority, it will fail.",
    "shortEffect": "Opposing Pokémon cannot use priority attacks.",
    "flavorText": "Its majesty pressures the opposing Pokémon,\nmaking it unable to attack using priority moves.",
    "pokemon": [
      {
        "name": "tsareena",
        "url": "https://pokeapi.co/api/v2/pokemon/763/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "libero": {
    "id": 236,
    "name": "libero",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Changes the Pokémon’s type to the type of the move it’s about to use. This works only once each time the Pokémon enters battle.",
    "shortEffect": "Libero changes the Pokémon's type to that of its previously used attack.",
    "flavorText": "Changes the Pokémon’s type to the type of the\nmove it’s about to use.",
    "pokemon": [
      {
        "name": "scorbunny",
        "url": "https://pokeapi.co/api/v2/pokemon/813/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "raboot",
        "url": "https://pokeapi.co/api/v2/pokemon/814/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cinderace",
        "url": "https://pokeapi.co/api/v2/pokemon/815/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "cinderace-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10210/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "tangling-hair": {
    "id": 221,
    "name": "tangling-hair",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "When this Pokémon takes regular damage from a contact move, the attacking Pokémon's Speed lowers by one stage.",
    "shortEffect": "When this Pokémon takes regular damage from a contact move, the attacking Pokémon's Speed lowers by one stage.",
    "flavorText": "Contact with the Pokémon lowers the attacker’s\nSpeed stat.",
    "pokemon": [
      {
        "name": "diglett-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10105/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "dugtrio-alola",
        "url": "https://pokeapi.co/api/v2/pokemon/10106/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "schooling": {
    "id": 208,
    "name": "schooling",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "If this Pokémon is a wishiwashi and level 20 or above, then when it enters battle and at the start of each turn, it becomes Schooling Form if its HP is 25% or higher and Solo Form otherwise.\n\nThis ability cannot be replaced, copied, or nullified.",
    "shortEffect": "Wishiwashi becomes Schooling Form when its HP is 25% or higher.",
    "flavorText": "When it has a lot of HP, the Pokémon forms a\npowerful school. It stops schooling when its HP\nis low.",
    "pokemon": [
      {
        "name": "wishiwashi-solo",
        "url": "https://pokeapi.co/api/v2/pokemon/746/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "wishiwashi-school",
        "url": "https://pokeapi.co/api/v2/pokemon/10127/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "berserk": {
    "id": 201,
    "name": "berserk",
    "isMainSeries": true,
    "generation": "generation-vii",
    "effect": "Whenever this Pokémon takes damage from a move that causes its HP to drop below 50%, its Special Attack rises by one stage.",
    "shortEffect": "Raises this Pokémon's Special Attack by one stage every time its HP drops below half.",
    "flavorText": "Boosts the Pokémon’s Sp. Atk stat when it takes a \nhit that causes its HP to become half or less.",
    "pokemon": [
      {
        "name": "drampa",
        "url": "https://pokeapi.co/api/v2/pokemon/780/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "moltres-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10171/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "perish-body": {
    "id": 253,
    "name": "perish-body",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When the Pokémon with Perish Body is hit with a contact move, both the attacker and the Pokémon with Perish Body will faint in three turns.",
    "shortEffect": "When hit by a move that makes direct contact, the Pokémon and the attacker will faint after three turns unless they switch out of battle.",
    "flavorText": "When hit by a move that makes direct contact,\nthe Pokémon and the attacker will faint after three turns\nunless they switch out of battle.",
    "pokemon": [
      {
        "name": "cursola",
        "url": "https://pokeapi.co/api/v2/pokemon/864/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "hadron-engine": {
    "id": 289,
    "name": "hadron-engine",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Turns the ground into Electric Terrain when the Pokémon enters a battle. The futuristic engine within the Pokémon also boosts its Sp. Atk stat on Electric Terrain.",
    "shortEffect": "Creates an Electric Terrain when entering battle, and boosts Special Attack while active.",
    "flavorText": "Turns the ground into Electric Terrain when the Pokémon enters a battle. The futuristic engine within the Pokémon also boosts its Sp. Atk stat on Electric Terrain.",
    "pokemon": [
      {
        "name": "miraidon",
        "url": "https://pokeapi.co/api/v2/pokemon/1008/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "miraidon-low-power-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10268/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "miraidon-low-power-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10268/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "miraidon-drive-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10269/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "miraidon-drive-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10269/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "miraidon-aquatic-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10270/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "miraidon-aquatic-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10270/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "miraidon-glide-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10271/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "miraidon-glide-mode",
        "url": "https://pokeapi.co/api/v2/pokemon/10271/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "cud-chew": {
    "id": 291,
    "name": "cud-chew",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When the Pokémon eats a Berry, it will regurgitate that Berry at the end of the next turn and eat it one more time.",
    "shortEffect": "Causes the Pokémon to reuse an already consumed Berry at the end of the next turn.",
    "flavorText": "When the Pokémon eats a Berry, it will regurgitate that Berry at the end of the next turn and eat it one more time.",
    "pokemon": [
      {
        "name": "farigiraf",
        "url": "https://pokeapi.co/api/v2/pokemon/981/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tauros-paldea-combat-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10250/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tauros-paldea-blaze-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10251/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "tauros-paldea-aqua-breed",
        "url": "https://pokeapi.co/api/v2/pokemon/10252/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "minds-eye": {
    "id": 299,
    "name": "minds-eye",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Mind's Eye enables the Pokémon with this Ability to hit Ghost-type Pokémon with damage-dealing Normal- and Fighting-type moves. It also prevents other Pokémon from lowering the Pokémon's accuracy and ignores changes to the opponents' evasion.",
    "shortEffect": "The Pokémon ignores changes to opponents' evasiveness, its accuracy can't be lowered, and it can hit Ghost types with Normal- and Fighting-type moves.",
    "flavorText": "The Pokémon ignores changes to opponents' evasiveness, its accuracy can't be lowered, and it can hit Ghost types with Normal-type and Fighting-type moves",
    "pokemon": [
      {
        "name": "ursaluna-bloodmoon",
        "url": "https://pokeapi.co/api/v2/pokemon/10272/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "wind-power": {
    "id": 277,
    "name": "wind-power",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The Pokémon becomes charged when it is hit by a wind move, boosting the power of the next Electric-type move the Pokémon uses.",
    "shortEffect": "When hit by a wind move, the power of the next Electric-type move it uses is doubled.",
    "flavorText": "The Pokémon becomes charged when it is hit by a wind move, boosting the power of the next Electric-type move the Pokémon uses.",
    "pokemon": [
      {
        "name": "wattrel",
        "url": "https://pokeapi.co/api/v2/pokemon/940/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "kilowattrel",
        "url": "https://pokeapi.co/api/v2/pokemon/941/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "neutralizing-gas": {
    "id": 256,
    "name": "neutralizing-gas",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "While the Pokémon is in the battle, the effects of all other Pokémon’s Abilities will be nullified or will not be triggered.",
    "shortEffect": "Neutralizes abilities of all Pokémon in battle.",
    "flavorText": "If the Pokémon with Neutralizing Gas is in the battle,\nthe effects of all Pokémon’s Abilities will be nullified\nor will not be triggered.",
    "pokemon": [
      {
        "name": "koffing",
        "url": "https://pokeapi.co/api/v2/pokemon/109/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "weezing",
        "url": "https://pokeapi.co/api/v2/pokemon/110/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "weezing-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10167/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "wind-rider": {
    "id": 274,
    "name": "wind-rider",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Boosts the Pokémon’s Attack stat if Tailwind takes effect or if the Pokémon is hit by a wind move. The Pokémon also takes no damage from wind moves.",
    "shortEffect": "Gives immunity to wind moves, and causes the Pokémon's Attack to increase by one stage when hit by one.",
    "flavorText": "Boosts the Pokémon's Attack stat if Tailwind takes effect or if the Pokémon is hit by a wind move. The Pokémon also takes no damage from wind moves.",
    "pokemon": [
      {
        "name": "shiftry",
        "url": "https://pokeapi.co/api/v2/pokemon/275/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "bramblin",
        "url": "https://pokeapi.co/api/v2/pokemon/946/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "brambleghast",
        "url": "https://pokeapi.co/api/v2/pokemon/947/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "transistor": {
    "id": 262,
    "name": "transistor",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Increases the power of Electric-type moves used by this Pokémon by 50%.",
    "shortEffect": "Powers up Electric-type moves.",
    "flavorText": "Powers up Electric-type moves.",
    "pokemon": [
      {
        "name": "regieleki",
        "url": "https://pokeapi.co/api/v2/pokemon/894/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "electromorphosis": {
    "id": 280,
    "name": "electromorphosis",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The Pokémon becomes charged when it takes damage, boosting the power of the next Electric-type move the Pokémon uses.",
    "shortEffect": "When hit by an attack, the power of the next Electric-type move it uses is doubled.",
    "flavorText": "The Pokémon becomes charged when it takes damage, boosting the power of the next Electric-type move the Pokémon uses.",
    "pokemon": [
      {
        "name": "bellibolt",
        "url": "https://pokeapi.co/api/v2/pokemon/939/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "well-baked-body": {
    "id": 273,
    "name": "well-baked-body",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The Pokémon takes no damage when hit by Fire-type moves. Instead, its Defense stat is sharply boosted.",
    "shortEffect": "Immune to Fire-type moves, and Defense is sharply boosted.",
    "flavorText": "The Pokémon takes no damage when hit by Fire-type moves. Instead, its Defense stat is sharply boosted.",
    "pokemon": [
      {
        "name": "dachsbun",
        "url": "https://pokeapi.co/api/v2/pokemon/927/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "earth-eater": {
    "id": 297,
    "name": "earth-eater",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "If hit by a Ground-type move, the Pokémon has its HP restored instead of taking damage.",
    "shortEffect": "Restores HP when hit by a Ground-type move.",
    "flavorText": "If hit by a Ground-type move, the Pokémon has its HP restored instead of taking damage.",
    "pokemon": [
      {
        "name": "orthworm",
        "url": "https://pokeapi.co/api/v2/pokemon/968/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sword-of-ruin": {
    "id": 285,
    "name": "sword-of-ruin",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The power of the Pokémon’s ruinous sword lowers the Defense stats of all Pokémon except itself.",
    "shortEffect": "Lowers Defense of all Pokémon except itself.",
    "flavorText": "The power of the Pokémon's ruinous sword lowers the Defense stats of all Pokémon except itself.",
    "pokemon": [
      {
        "name": "chien-pao",
        "url": "https://pokeapi.co/api/v2/pokemon/1002/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "zero-to-hero": {
    "id": 278,
    "name": "zero-to-hero",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The Pokémon transforms into its Hero Form when it switches out.",
    "shortEffect": "Transforms into its Hero Form when switching out.",
    "flavorText": "The Pokémon transforms into its Hero Form when it switches out.",
    "pokemon": [
      {
        "name": "palafin-zero",
        "url": "https://pokeapi.co/api/v2/pokemon/964/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "palafin-zero",
        "url": "https://pokeapi.co/api/v2/pokemon/964/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "palafin-hero",
        "url": "https://pokeapi.co/api/v2/pokemon/10256/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "palafin-hero",
        "url": "https://pokeapi.co/api/v2/pokemon/10256/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "wandering-spirit": {
    "id": 254,
    "name": "wandering-spirit",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "The Pokémon exchanges Abilities with a Pokémon that hits it with a move that makes direct contact.",
    "shortEffect": "Swaps abilities with opponents on contact.",
    "flavorText": "The Pokémon exchanges Abilities with a Pokémon\nthat hits it with a move that makes direct contact.",
    "pokemon": [
      {
        "name": "runerigus",
        "url": "https://pokeapi.co/api/v2/pokemon/867/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "yamask-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10179/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "thermal-exchange": {
    "id": 270,
    "name": "thermal-exchange",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Boosts the Attack stat when the Pokémon is hit by a Fire-type move. The Pokémon also cannot be burned.",
    "shortEffect": "Raises Attack when hit by a Fire-type move. Cannot be burned.",
    "flavorText": "Boosts the Attack stat when the Pokémon is hit by a Fire-type move. The Pokémon also cannot be burned.",
    "pokemon": [
      {
        "name": "frigibax",
        "url": "https://pokeapi.co/api/v2/pokemon/996/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "arctibax",
        "url": "https://pokeapi.co/api/v2/pokemon/997/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "baxcalibur",
        "url": "https://pokeapi.co/api/v2/pokemon/998/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "seed-sower": {
    "id": 269,
    "name": "seed-sower",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Turns the ground into Grassy Terrain when the Pokémon is hit by an attack.",
    "shortEffect": "Turns the ground into Grassy Terrain when the Pokémon is hit by an attack.",
    "flavorText": "Turns the ground into Grassy Terrain when the Pokémon is hit by an attack.",
    "pokemon": [
      {
        "name": "arboliva",
        "url": "https://pokeapi.co/api/v2/pokemon/930/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "protosynthesis": {
    "id": 281,
    "name": "protosynthesis",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Boosts the Pokémon’s most proficient stat in harsh sunlight or if the Pokémon is holding Booster Energy.",
    "shortEffect": "Raises highest stat in harsh sunlight, or if holding Booster Energy.",
    "flavorText": "Boosts the Pokémon's most proficient stat in harsh sunlight or if the Pokémon is holding Booster Energy.",
    "pokemon": [
      {
        "name": "great-tusk",
        "url": "https://pokeapi.co/api/v2/pokemon/984/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "scream-tail",
        "url": "https://pokeapi.co/api/v2/pokemon/985/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "brute-bonnet",
        "url": "https://pokeapi.co/api/v2/pokemon/986/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "flutter-mane",
        "url": "https://pokeapi.co/api/v2/pokemon/987/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "slither-wing",
        "url": "https://pokeapi.co/api/v2/pokemon/988/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sandy-shocks",
        "url": "https://pokeapi.co/api/v2/pokemon/989/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "roaring-moon",
        "url": "https://pokeapi.co/api/v2/pokemon/1005/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "walking-wake",
        "url": "https://pokeapi.co/api/v2/pokemon/1009/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "gouging-fire",
        "url": "https://pokeapi.co/api/v2/pokemon/1020/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "raging-bolt",
        "url": "https://pokeapi.co/api/v2/pokemon/1021/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "pastel-veil": {
    "id": 257,
    "name": "pastel-veil",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Prevents the Pokémon and its teammates from being poisoned. It also cures teammates of poisoning when it enters the battlefield.",
    "shortEffect": "Prevents the Pokémon and its allies from being poisoned.",
    "flavorText": "Protects the Pokémon and its ally Pokémon from\nbeing poisoned.",
    "pokemon": [
      {
        "name": "ponyta-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10162/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "rapidash-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10163/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "lingering-aroma": {
    "id": 268,
    "name": "lingering-aroma",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Contact with the Pokémon changes the attacker’s Ability to Lingering Aroma.",
    "shortEffect": "Contact changes the attacker's Ability to Lingering Aroma.",
    "flavorText": "Contact with the Pokémon changes the attacker's Ability to Lingering Aroma.",
    "pokemon": [
      {
        "name": "oinkologne-male",
        "url": "https://pokeapi.co/api/v2/pokemon/916/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "grim-neigh": {
    "id": 265,
    "name": "grim-neigh",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When the Pokémon knocks out a target, it utters a terrifying neigh, which boosts its Sp. Atk stat.",
    "shortEffect": "Boosts Special Attack after knocking out a Pokémon.",
    "flavorText": "When the Pokémon knocks out a target, it utters a\nterrifying neigh, which boosts its Sp. Atk stat.",
    "pokemon": [
      {
        "name": "spectrier",
        "url": "https://pokeapi.co/api/v2/pokemon/897/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "armor-tail": {
    "id": 296,
    "name": "armor-tail",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The mysterious tail covering the Pokémon’s head makes opponents unable to use priority moves against the Pokémon or its allies.",
    "shortEffect": "Prevents the opponent from using any moves that have priority, such as Quick Attack.",
    "flavorText": "The mysterious tail covering the Pokémon's head makes opponents unable to use priority moves against the Pokémon or its allies.",
    "pokemon": [
      {
        "name": "farigiraf",
        "url": "https://pokeapi.co/api/v2/pokemon/981/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "unseen-fist": {
    "id": 260,
    "name": "unseen-fist",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "If the Pokémon uses moves that make direct contact, it can attack the target even if the target protects itself.",
    "shortEffect": "Contact moves can strike through Protect/Detect.",
    "flavorText": "If the Pokémon uses moves that make direct contact,\nit can attack the target even if the target protects itself.",
    "pokemon": [
      {
        "name": "urshifu-single-strike",
        "url": "https://pokeapi.co/api/v2/pokemon/892/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "urshifu-rapid-strike",
        "url": "https://pokeapi.co/api/v2/pokemon/10191/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "urshifu-single-strike-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10226/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "urshifu-rapid-strike-gmax",
        "url": "https://pokeapi.co/api/v2/pokemon/10227/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "toxic-debris": {
    "id": 295,
    "name": "toxic-debris",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Scatters poison spikes at the feet of the opposing team when the Pokémon takes damage from physical moves.",
    "shortEffect": "Scatters poison spikes at the feet of the opposing team when the Pokémon takes damage from physical moves.",
    "flavorText": "Scatters poison spikes at the feet of the opposing team when the Pokémon takes damage from physical moves.",
    "pokemon": [
      {
        "name": "glimmet",
        "url": "https://pokeapi.co/api/v2/pokemon/969/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "glimmora",
        "url": "https://pokeapi.co/api/v2/pokemon/970/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "quark-drive": {
    "id": 282,
    "name": "quark-drive",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Boosts the Pokémon’s most proficient stat on Electric Terrain or if the Pokémon is holding Booster Energy.",
    "shortEffect": "Raises highest stat on Electric Terrain, or if holding Booster Energy.",
    "flavorText": "Boosts the Pokémon's most proficient stat on Electric Terrain or if the Pokémon is holding Booster Energy.",
    "pokemon": [
      {
        "name": "iron-treads",
        "url": "https://pokeapi.co/api/v2/pokemon/990/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-bundle",
        "url": "https://pokeapi.co/api/v2/pokemon/991/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-hands",
        "url": "https://pokeapi.co/api/v2/pokemon/992/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-jugulis",
        "url": "https://pokeapi.co/api/v2/pokemon/993/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-moth",
        "url": "https://pokeapi.co/api/v2/pokemon/994/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-thorns",
        "url": "https://pokeapi.co/api/v2/pokemon/995/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-valiant",
        "url": "https://pokeapi.co/api/v2/pokemon/1006/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-leaves",
        "url": "https://pokeapi.co/api/v2/pokemon/1010/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-boulder",
        "url": "https://pokeapi.co/api/v2/pokemon/1022/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "iron-crown",
        "url": "https://pokeapi.co/api/v2/pokemon/1023/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "tablets-of-ruin": {
    "id": 286,
    "name": "tablets-of-ruin",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The power of the Pokémon’s ruinous wooden tablets lowers the Attack stats of all Pokémon except itself.",
    "shortEffect": "Lowers Attack of all Pokémon except itself.",
    "flavorText": "The power of the Pokémon's ruinous wooden tablets lowers the Attack stats of all Pokémon except itself.",
    "pokemon": [
      {
        "name": "wo-chien",
        "url": "https://pokeapi.co/api/v2/pokemon/1001/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "steely-spirit": {
    "id": 252,
    "name": "steely-spirit",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Powers up the Steel-type moves of the Pokémon and its allies.",
    "shortEffect": "Powers up ally Pokémon's Steel-type moves.",
    "flavorText": "Powers up ally Pokémon’s Steel-type moves.",
    "pokemon": [
      {
        "name": "perrserker",
        "url": "https://pokeapi.co/api/v2/pokemon/863/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "as-one-glastrier": {
    "id": 266,
    "name": "as-one-glastrier",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "This Ability combines the effects of both Calyrex’s\nUnnerve Ability and Glastrier’s Chilling Neigh Ability.",
    "pokemon": [
      {
        "name": "calyrex-ice",
        "url": "https://pokeapi.co/api/v2/pokemon/10193/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "sharpness": {
    "id": 292,
    "name": "sharpness",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Increases the power of all 'slicing' moves by 50%.",
    "shortEffect": "Powers up slicing moves.",
    "flavorText": "Powers up slicing moves.",
    "pokemon": [
      {
        "name": "gallade",
        "url": "https://pokeapi.co/api/v2/pokemon/475/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "kleavor",
        "url": "https://pokeapi.co/api/v2/pokemon/900/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "veluza",
        "url": "https://pokeapi.co/api/v2/pokemon/976/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "samurott-hisui",
        "url": "https://pokeapi.co/api/v2/pokemon/10236/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "vessel-of-ruin": {
    "id": 284,
    "name": "vessel-of-ruin",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The power of the Pokémon’s ruinous vessel lowers the Sp. Atk stats of all Pokémon except itself.",
    "shortEffect": "Lowers Special Attack of all Pokémon except itself.",
    "flavorText": "The power of the Pokémon's ruinous vessel lowers the Sp. Atk stats of all Pokémon except itself.",
    "pokemon": [
      {
        "name": "ting-lu",
        "url": "https://pokeapi.co/api/v2/pokemon/1003/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "guard-dog": {
    "id": 275,
    "name": "guard-dog",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Boosts the Pokémon’s Attack stat if intimidated. Moves and items that would force the Pokémon to switch out also fail to work.",
    "shortEffect": "Boosts Attack if intimidated, and prevents being forced to switch out.",
    "flavorText": "Boosts the Pokémon’s Attack stat if intimidated. Moves and items that would force the Pokémon to switch out also fail to work.",
    "pokemon": [
      {
        "name": "mabosstiff",
        "url": "https://pokeapi.co/api/v2/pokemon/943/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "okidogi",
        "url": "https://pokeapi.co/api/v2/pokemon/1014/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "hunger-switch": {
    "id": 258,
    "name": "hunger-switch",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "The Pokémon changes its form, alternating between its Full Belly Mode and Hangry Mode after the end of every turn.",
    "shortEffect": "Causes Morpeko to change its form each turn, alternating between Full Belly Mode and Hangry Mode",
    "flavorText": "The Pokémon changes its form, alternating between\nits Full Belly Mode and Hangry Mode after the end of\neach turn.",
    "pokemon": [
      {
        "name": "morpeko-full-belly",
        "url": "https://pokeapi.co/api/v2/pokemon/877/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "morpeko-hangry",
        "url": "https://pokeapi.co/api/v2/pokemon/10187/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "as-one-spectrier": {
    "id": 267,
    "name": "as-one-spectrier",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "This Ability combines the effects of both Calyrex’s\nUnnerve Ability and Spectrier’s Grim Neigh Ability.",
    "pokemon": [
      {
        "name": "calyrex-shadow",
        "url": "https://pokeapi.co/api/v2/pokemon/10194/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "anger-shell": {
    "id": 271,
    "name": "anger-shell",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When an attack causes its HP to drop to half or less, the Pokémon gets angry. This lowers its Defense and Sp. Def stats but boosts its Attack, Sp. Atk, and Speed stats.",
    "shortEffect": "When the Pokémon's HP drops below half, Anger Shell lowers its Defense and Special Defense but its Attack, Special Attack and Speed are raised.",
    "flavorText": "When an attack causes its HP to drop to half or less, the Pokémon gets angry. This lowers its Defense and Sp. Def stats but boosts its Attack, Sp. Atk, and Speed stats.",
    "pokemon": [
      {
        "name": "klawf",
        "url": "https://pokeapi.co/api/v2/pokemon/950/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "rocky-payload": {
    "id": 276,
    "name": "rocky-payload",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Increases the power of Rock-type moves used by this Pokémon by 50%.",
    "shortEffect": "Powers up Rock-type moves.",
    "flavorText": "Powers up Rock-type moves.",
    "pokemon": [
      {
        "name": "bombirdier",
        "url": "https://pokeapi.co/api/v2/pokemon/962/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "screen-cleaner": {
    "id": 251,
    "name": "screen-cleaner",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When the Pokémon enters a battle, the effects of Light Screen, Reflect, and Aurora Veil are nullified for both opposing and ally Pokémon.",
    "shortEffect": "Nullifies effects of Light Screen, Reflect, and Aurora Veil.",
    "flavorText": "When the Pokémon enters a battle, the effects of\nLight Screen, Reflect, and Aurora Veil are nullified for\nboth opposing and ally Pokémon.",
    "pokemon": [
      {
        "name": "mr-rime",
        "url": "https://pokeapi.co/api/v2/pokemon/866/",
        "isHidden": false,
        "slot": 2
      },
      {
        "name": "mr-mime-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10168/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "commander": {
    "id": 279,
    "name": "commander",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When the Pokémon enters a battle, it goes inside the mouth of an ally Dondozo if one is on the field. The Pokémon then issues commands from there.",
    "shortEffect": "Goes inside the mouth of an ally Dondozo if one is on the field.",
    "flavorText": "When the Pokémon enters a battle, it goes inside the mouth of an ally Dondozo if one is on the field. The Pokémon then issues commands from there.",
    "pokemon": [
      {
        "name": "tatsugiri-curly",
        "url": "https://pokeapi.co/api/v2/pokemon/978/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tatsugiri-droopy",
        "url": "https://pokeapi.co/api/v2/pokemon/10258/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "tatsugiri-stretchy",
        "url": "https://pokeapi.co/api/v2/pokemon/10259/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "supreme-overlord": {
    "id": 293,
    "name": "supreme-overlord",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When the Pokémon enters a battle, its Attack and Sp. Atk stats are slightly boosted for each of the allies in its party that have already been defeated.",
    "shortEffect": "Attack and Special Attack are boosted for each party Pokémon that has been defeated.",
    "flavorText": "When the Pokémon enters a battle, its Attack and Sp. Atk stats are slightly boosted for each of the allies in its party that have already been defeated.",
    "pokemon": [
      {
        "name": "kingambit",
        "url": "https://pokeapi.co/api/v2/pokemon/983/",
        "isHidden": false,
        "slot": 2
      }
    ]
  },
  "good-as-gold": {
    "id": 283,
    "name": "good-as-gold",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "A body of pure, solid gold gives the Pokémon full immunity to other Pokémon’s status moves.",
    "shortEffect": "Gives immunity to status moves.",
    "flavorText": "A body of pure, solid gold gives the Pokémon full immunity to other Pokémon's status moves.",
    "pokemon": [
      {
        "name": "gholdengo",
        "url": "https://pokeapi.co/api/v2/pokemon/1000/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "chilling-neigh": {
    "id": 264,
    "name": "chilling-neigh",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When the Pokémon knocks out a target, it utters a chilling neigh, which boosts its Attack stat.",
    "shortEffect": "Boosts Attack after knocking out a Pokémon.",
    "flavorText": "When the Pokémon knocks out a target, it utters a\nchilling neigh, which boosts its Attack stat.",
    "pokemon": [
      {
        "name": "glastrier",
        "url": "https://pokeapi.co/api/v2/pokemon/896/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "curious-medicine": {
    "id": 261,
    "name": "curious-medicine",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "When the Pokémon enters a battle, it scatters medicine from its shell, which removes all stat changes from allies.",
    "shortEffect": "Resets all stat changes upon entering battlefield.",
    "flavorText": "When the Pokémon enters a battle, it scatters medicine\nfrom its shell, which removes all stat changes\nfrom allies.",
    "pokemon": [
      {
        "name": "slowking-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10172/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "opportunist": {
    "id": 290,
    "name": "opportunist",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "If an opponent’s stat is boosted, the Pokémon seizes the opportunity to boost the same stat for itself.",
    "shortEffect": "Copies stat boosts by the opponent.",
    "flavorText": "If an opponent's stat is boosted, the Pokémon seizes the opportunity to boost the same stat for itself.",
    "pokemon": [
      {
        "name": "espathra",
        "url": "https://pokeapi.co/api/v2/pokemon/956/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "dragons-maw": {
    "id": 263,
    "name": "dragons-maw",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Increases the power of Dragon-type moves used by this Pokémon by 50%.",
    "shortEffect": "Powers up Dragon-type moves.",
    "flavorText": "Powers up Dragon-type moves.",
    "pokemon": [
      {
        "name": "regidrago",
        "url": "https://pokeapi.co/api/v2/pokemon/895/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "costar": {
    "id": 294,
    "name": "costar",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When the Pokémon enters a battle, it copies an ally’s stat changes.",
    "shortEffect": "Copies ally's stat changes on entering battle.",
    "flavorText": "When the Pokémon enters a battle, it copies an ally's stat changes.",
    "pokemon": [
      {
        "name": "flamigo",
        "url": "https://pokeapi.co/api/v2/pokemon/973/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "mycelium-might": {
    "id": 298,
    "name": "mycelium-might",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The Pokémon will always act more slowly when using status moves, but these moves will be unimpeded by the Ability of the target.",
    "shortEffect": "Status moves go last, but are not affected by the opponent's ability.",
    "flavorText": "The Pokémon will always act more slowly when using status moves, but these moves will be unimpeded by the Ability of the target.",
    "pokemon": [
      {
        "name": "toedscool",
        "url": "https://pokeapi.co/api/v2/pokemon/948/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toedscool",
        "url": "https://pokeapi.co/api/v2/pokemon/948/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "toedscruel",
        "url": "https://pokeapi.co/api/v2/pokemon/949/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "toedscruel",
        "url": "https://pokeapi.co/api/v2/pokemon/949/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "purifying-salt": {
    "id": 272,
    "name": "purifying-salt",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The Pokémon’s pure salt protects it from status conditions and halves the damage taken from Ghost-type moves.",
    "shortEffect": "Protects from status conditions and halves damage from Ghost-type moves.",
    "flavorText": "The Pokémon's pure salt protects it from status conditions and halves the damage taken from Ghost-type moves.",
    "pokemon": [
      {
        "name": "nacli",
        "url": "https://pokeapi.co/api/v2/pokemon/932/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "naclstack",
        "url": "https://pokeapi.co/api/v2/pokemon/933/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "garganacl",
        "url": "https://pokeapi.co/api/v2/pokemon/934/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "gorilla-tactics": {
    "id": 255,
    "name": "gorilla-tactics",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "Boosts the Pokémon’s Attack stat but only allows the use of the first selected move.",
    "shortEffect": "Boosts the Pokémon's Attack stat but only allows the use of the first selected move.",
    "flavorText": "Boosts the Pokémon’s Attack stat but only allows\nthe use of the first selected move.",
    "pokemon": [
      {
        "name": "darmanitan-galar-standard",
        "url": "https://pokeapi.co/api/v2/pokemon/10177/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "darmanitan-galar-zen",
        "url": "https://pokeapi.co/api/v2/pokemon/10178/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "beads-of-ruin": {
    "id": 287,
    "name": "beads-of-ruin",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The power of the Pokémon’s ruinous beads lowers the Sp. Def stats of all Pokémon except itself.",
    "shortEffect": "Lowers Special Defense of all Pokémon except itself.",
    "flavorText": "The power of the Pokémon's ruinous beads lowers the Sp. Def stats of all Pokémon except itself.",
    "pokemon": [
      {
        "name": "chi-yu",
        "url": "https://pokeapi.co/api/v2/pokemon/1004/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "quick-draw": {
    "id": 259,
    "name": "quick-draw",
    "isMainSeries": true,
    "generation": "generation-viii",
    "effect": "If a Pokémon with this Ability selects a damaging move, it has a 30% chance of going first in its priority bracket.",
    "shortEffect": "Enables the Pokémon to move first occasionally.",
    "flavorText": "Enables the Pokémon to move first occasionally.",
    "pokemon": [
      {
        "name": "slowbro-galar",
        "url": "https://pokeapi.co/api/v2/pokemon/10165/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "orichalcum-pulse": {
    "id": 288,
    "name": "orichalcum-pulse",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Turns the sunlight harsh when the Pokémon enters a battle. The ancient pulse thrumming through the Pokémon also boosts its Attack stat in harsh sunlight.",
    "shortEffect": "Turns the sunlight harsh when entering battle, and boosts Attack while active.",
    "flavorText": "Turns the sunlight harsh when the Pokémon enters a battle. The ancient pulse thrumming through the Pokémon also boosts its Attack stat in harsh sunlight.",
    "pokemon": [
      {
        "name": "koraidon",
        "url": "https://pokeapi.co/api/v2/pokemon/1007/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "koraidon-limited-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10264/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "koraidon-limited-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10264/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "koraidon-sprinting-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10265/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "koraidon-sprinting-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10265/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "koraidon-swimming-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10266/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "koraidon-swimming-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10266/",
        "isHidden": true,
        "slot": 3
      },
      {
        "name": "koraidon-gliding-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10267/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "koraidon-gliding-build",
        "url": "https://pokeapi.co/api/v2/pokemon/10267/",
        "isHidden": true,
        "slot": 3
      }
    ]
  },
  "supersweet-syrup": {
    "id": 300,
    "name": "supersweet-syrup",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "A sickly sweet scent spreads across the field the first time the Pokémon enters a battle, lowering the evasiveness of opposing Pokémon.",
    "shortEffect": "Once per battle, when a Pokémon with Supersweet Syrup enters the battle, it lowers the evasion stat of all adjacent opponents by one stage. ",
    "flavorText": "Lowers the evasion of opposing Pokémon by 1 stage when first sent into battle",
    "pokemon": [
      {
        "name": "dipplin",
        "url": "https://pokeapi.co/api/v2/pokemon/1011/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "hydrapple",
        "url": "https://pokeapi.co/api/v2/pokemon/1019/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "embody-aspect": {
    "id": 303,
    "name": "embody-aspect",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "Embody Aspect boosts a particular stat, depending on the form of a Terastallized Ogerpon",
    "shortEffect": "Embody Aspect boosts a particular stat, depending on the form of a Terastallized Ogerpon",
    "flavorText": "The Pokémon's heart fills with memories, causing the Mask to shine and one of the Pokémon's stats to be boosted.",
    "pokemon": []
  },
  "grass-cloak": {
    "id": 10034,
    "name": "grass-cloak",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "confidence": {
    "id": 10042,
    "name": "confidence",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "hot-blooded": {
    "id": 10020,
    "name": "hot-blooded",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "nomad": {
    "id": 10032,
    "name": "nomad",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "teraform-zero": {
    "id": 306,
    "name": "teraform-zero",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When Terapagos changes into its Stellar Form, it uses its hidden powers to eliminate all effects of weather and terrain, reducing them to zero.",
    "shortEffect": "As soon as Terapagos assumes its Stellar Form, it will immediately neutralize weather and terrain effects. ",
    "flavorText": "When Terapagos changes into its Stellar Form, it uses its hidden powers to eliminate all effects of weather and terrain, reducing them to zero.",
    "pokemon": [
      {
        "name": "terapagos-stellar",
        "url": "https://pokeapi.co/api/v2/pokemon/10277/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "hero": {
    "id": 10028,
    "name": "hero",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "gulp": {
    "id": 10017,
    "name": "gulp",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "lunchbox": {
    "id": 10023,
    "name": "lunchbox",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "perception": {
    "id": 10005,
    "name": "perception",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "interference": {
    "id": 10040,
    "name": "interference",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "nurse": {
    "id": 10024,
    "name": "nurse",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "frighten": {
    "id": 10039,
    "name": "frighten",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "jagged-edge": {
    "id": 10009,
    "name": "jagged-edge",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "wave-rider": {
    "id": 10002,
    "name": "wave-rider",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "parry": {
    "id": 10006,
    "name": "parry",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "warm-blanket": {
    "id": 10016,
    "name": "warm-blanket",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "celebrate": {
    "id": 10035,
    "name": "celebrate",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "medic": {
    "id": 10021,
    "name": "medic",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "vanguard": {
    "id": 10031,
    "name": "vanguard",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "sandpit": {
    "id": 10019,
    "name": "sandpit",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "dodge": {
    "id": 10008,
    "name": "dodge",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "melee": {
    "id": 10025,
    "name": "melee",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "skater": {
    "id": 10003,
    "name": "skater",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "poison-puppeteer": {
    "id": 307,
    "name": "poison-puppeteer",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When a Pokémon is poisoned by any of Pecharunt's moves, it will also become confused.",
    "shortEffect": "Pokémon poisoned by Pecharunt's moves will also become confused.",
    "flavorText": "Pokémon poisoned by Pecharunt's moves will also become confused.",
    "pokemon": [
      {
        "name": "pecharunt",
        "url": "https://pokeapi.co/api/v2/pokemon/1025/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "tera-shift": {
    "id": 304,
    "name": "tera-shift",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When the Pokémon enters a battle, it absorbs the energy around itself and transforms into its Terastal Form.",
    "shortEffect": "When Terapagos enters the battle, it turns into its Terastal Form until the end of the battle. ",
    "flavorText": "When the Pokémon enters a battle, it absorbs the energy around itself and transforms into its Terastal Form.",
    "pokemon": [
      {
        "name": "terapagos",
        "url": "https://pokeapi.co/api/v2/pokemon/1024/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "frostbite": {
    "id": 10010,
    "name": "frostbite",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "pride": {
    "id": 10012,
    "name": "pride",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "last-bastion": {
    "id": 10029,
    "name": "last-bastion",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "sequence": {
    "id": 10033,
    "name": "sequence",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "tenacity": {
    "id": 10011,
    "name": "tenacity",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "thrust": {
    "id": 10004,
    "name": "thrust",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "calming": {
    "id": 10037,
    "name": "calming",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "daze": {
    "id": 10038,
    "name": "daze",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "bodyguard": {
    "id": 10027,
    "name": "bodyguard",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "fortune": {
    "id": 10043,
    "name": "fortune",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "hospitality": {
    "id": 301,
    "name": "hospitality",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "When the Pokémon enters a battle, it showers its ally with hospitality, restoring a small amount of the ally's HP.",
    "shortEffect": "When a Pokémon with Hospitality enters a battle, it restores HP for an ally by 25%.",
    "flavorText": "When the Pokémon enters a battle, it showers its ally with hospitality, restoring a small amount of the ally's HP",
    "pokemon": [
      {
        "name": "poltchageist",
        "url": "https://pokeapi.co/api/v2/pokemon/1012/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "sinistcha",
        "url": "https://pokeapi.co/api/v2/pokemon/1013/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "tera-shell": {
    "id": 305,
    "name": "tera-shell",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The Pokémon’s shell contains the powers of each type. All damage-dealing moves that hit the Pokémon when its HP is full will not be very effective.",
    "shortEffect": "All damage-dealing moves that hit the Pokémon when its HP is full will not be very effective.",
    "flavorText": "The Pokémon's shell contains the powers of each type. All damage-dealing moves that hit the Pokémon when its HP is full will not be very effective.",
    "pokemon": [
      {
        "name": "terapagos-terastal",
        "url": "https://pokeapi.co/api/v2/pokemon/10276/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "toxic-chain": {
    "id": 302,
    "name": "toxic-chain",
    "isMainSeries": true,
    "generation": "generation-ix",
    "effect": "The power of the Pokémon's toxic chain may badly poison any target the Pokémon hits with a move.",
    "shortEffect": "May cause bad poisoning when the Pokémon hits an opponent with a move.",
    "flavorText": "The power of the Pokémon's toxic chain may badly poison any target the Pokémon hits with a move",
    "pokemon": [
      {
        "name": "okidogi",
        "url": "https://pokeapi.co/api/v2/pokemon/1014/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "munkidori",
        "url": "https://pokeapi.co/api/v2/pokemon/1015/",
        "isHidden": false,
        "slot": 1
      },
      {
        "name": "fezandipiti",
        "url": "https://pokeapi.co/api/v2/pokemon/1016/",
        "isHidden": false,
        "slot": 1
      }
    ]
  },
  "herbivore": {
    "id": 10018,
    "name": "herbivore",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "mountaineer": {
    "id": 10001,
    "name": "mountaineer",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "deep-sleep": {
    "id": 10013,
    "name": "deep-sleep",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "instinct": {
    "id": 10007,
    "name": "instinct",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "lullaby": {
    "id": 10036,
    "name": "lullaby",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "spirit": {
    "id": 10015,
    "name": "spirit",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "sponge": {
    "id": 10026,
    "name": "sponge",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "mood-maker": {
    "id": 10041,
    "name": "mood-maker",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "power-nap": {
    "id": 10014,
    "name": "power-nap",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "life-force": {
    "id": 10022,
    "name": "life-force",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "stealth": {
    "id": 10030,
    "name": "stealth",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "omnipotent": {
    "id": 10046,
    "name": "omnipotent",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "shadow-dash": {
    "id": 10049,
    "name": "shadow-dash",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "aqua-boost": {
    "id": 10055,
    "name": "aqua-boost",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "run-up": {
    "id": 10056,
    "name": "run-up",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "shackle": {
    "id": 10058,
    "name": "shackle",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "share": {
    "id": 10047,
    "name": "share",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "black-hole": {
    "id": 10048,
    "name": "black-hole",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "high-rise": {
    "id": 10052,
    "name": "high-rise",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "shield": {
    "id": 10060,
    "name": "shield",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "disgust": {
    "id": 10051,
    "name": "disgust",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "bonanza": {
    "id": 10044,
    "name": "bonanza",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "climber": {
    "id": 10053,
    "name": "climber",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "sprint": {
    "id": 10050,
    "name": "sprint",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "explode": {
    "id": 10045,
    "name": "explode",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "decoy": {
    "id": 10059,
    "name": "decoy",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "flame-boost": {
    "id": 10054,
    "name": "flame-boost",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  },
  "conqueror": {
    "id": 10057,
    "name": "conqueror",
    "isMainSeries": false,
    "generation": "generation-v",
    "effect": "No description available.",
    "shortEffect": "No description available.",
    "flavorText": "No flavor text available.",
    "pokemon": []
  }
}

/**
 * Get ability data by name
 */
export function getAbilityData(abilityName: string): AbilityData | null {
  const cleanName = abilityName.toLowerCase().replace(/\s+/g, '-')
  return ABILITIES_DATABASE[cleanName] || null
}

/**
 * Check if ability exists in database
 */
export function hasAbilityData(abilityName: string): boolean {
  const cleanName = abilityName.toLowerCase().replace(/\s+/g, '-')
  return cleanName in ABILITIES_DATABASE
}

/**
 * Get all abilities from a specific generation
 */
export function getAbilitiesByGeneration(generation: string): AbilityData[] {
  return Object.values(ABILITIES_DATABASE).filter(ability => ability.generation === generation)
}

/**
 * Search abilities by name or effect
 */
export function searchAbilities(query: string): AbilityData[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(ABILITIES_DATABASE).filter(ability => 
    ability.name.toLowerCase().includes(lowerQuery) ||
    ability.effect.toLowerCase().includes(lowerQuery) ||
    ability.shortEffect.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get abilities that can be hidden
 */
export function getHiddenAbilities(): AbilityData[] {
  return Object.values(ABILITIES_DATABASE).filter(ability => 
    ability.pokemon.some(p => p.isHidden)
  )
}

/**
 * Get Pokemon that have a specific ability
 */
export function getPokemonWithAbility(abilityName: string): AbilityPokemon[] {
  const ability = getAbilityData(abilityName)
  return ability?.pokemon || []
}