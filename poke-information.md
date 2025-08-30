# 🎮 PokeAPI Information Guide

Complete reference for all Pokemon data available through the PokeAPI (https://pokeapi.co/api/v2/)

---

## 📋 Table of Contents

1. [Core Pokemon Data](#-core-pokemon-data)
2. [Pokemon Species Information](#-pokemon-species-information)
3. [Evolution & Breeding](#-evolution--breeding)
4. [Battle & Stats](#-battle--stats)
5. [Visual & Audio Assets](#-visual--audio-assets)
6. [Game Integration](#-game-integration)
7. [Localization](#-localization)
8. [API Endpoints Reference](#-api-endpoints-reference)

---

## 🎯 Core Pokemon Data

### Basic Information
**Endpoint:** `GET /pokemon/{id or name}`

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | Integer | Unique Pokemon ID | `25` (Pikachu) |
| `name` | String | Pokemon name | `"pikachu"` |
| `height` | Integer | Height in decimeters | `4` (0.4m) |
| `weight` | Integer | Weight in hectograms | `60` (6.0kg) |
| `base_experience` | Integer | Base EXP when defeated | `112` |
| `order` | Integer | Order in National Dex | `32` |

### Types
```json
"types": [
  {
    "slot": 1,
    "type": {
      "name": "electric",
      "url": "https://pokeapi.co/api/v2/type/13/"
    }
  }
]
```
- **Primary Type:** `slot: 1`
- **Secondary Type:** `slot: 2` (if exists)

### Abilities
```json
"abilities": [
  {
    "is_hidden": false,
    "slot": 1,
    "ability": {
      "name": "static",
      "url": "https://pokeapi.co/api/v2/ability/9/"
    }
  },
  {
    "is_hidden": true,
    "slot": 3,
    "ability": {
      "name": "lightning-rod",
      "url": "https://pokeapi.co/api/v2/ability/31/"
    }
  }
]
```
- **Regular Abilities:** `is_hidden: false`
- **Hidden Abilities:** `is_hidden: true`

---

## 🧬 Pokemon Species Information

### Biological Characteristics
**Endpoint:** `GET /pokemon-species/{id or name}`

| Field | Type | Description | Values |
|-------|------|-------------|---------|
| `gender_rate` | Integer | Gender distribution | `-1` (genderless), `0` (100% male), `8` (100% female) |
| `capture_rate` | Integer | Catch difficulty | `0-255` (higher = easier) |
| `base_happiness` | Integer | Starting happiness | `0-255` |
| `is_baby` | Boolean | Baby Pokemon flag | `true/false` |
| `is_legendary` | Boolean | Legendary status | `true/false` |
| `is_mythical` | Boolean | Mythical status | `true/false` |
| `has_gender_differences` | Boolean | Visual gender differences | `true/false` |

### Breeding Information
```json
"egg_groups": [
  {
    "name": "ground",
    "url": "https://pokeapi.co/api/v2/egg-group/5/"
  },
  {
    "name": "fairy",
    "url": "https://pokeapi.co/api/v2/egg-group/6/"
  }
]
```

| Field | Description | Example |
|-------|-------------|---------|
| `hatch_counter` | Egg cycles to hatch | `10` (2560 steps) |
| `growth_rate` | EXP curve type | `"medium"` |

### Classification
```json
"genera": [
  {
    "genus": "Mouse Pokémon",
    "language": {
      "name": "en"
    }
  }
]
```

---

## 🔄 Evolution & Breeding

### Evolution Chain
**Endpoint:** `GET /evolution-chain/{id}`

```json
"chain": {
  "species": {
    "name": "pichu",
    "url": "https://pokeapi.co/api/v2/pokemon-species/172/"
  },
  "evolves_to": [
    {
      "species": {
        "name": "pikachu",
        "url": "https://pokeapi.co/api/v2/pokemon-species/25/"
      },
      "evolution_details": [
        {
          "trigger": {
            "name": "level-up",
            "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
          },
          "min_level": null,
          "min_happiness": 220,
          "time_of_day": "",
          "item": null,
          "known_move": null,
          "location": null
        }
      ],
      "evolves_to": [...]
    }
  ]
}
```

### Evolution Triggers
| Trigger | Requirements |
|---------|-------------|
| `level-up` | Level, happiness, time, location |
| `use-item` | Evolution stones, held items |
| `trade` | Trading, with/without items |
| `shed` | Specific conditions (Ninjask/Shedinja) |
| `spin` | Spinning (Alcremie forms) |
| `tower-of-darkness` | Urshifu forms |

---

## ⚔️ Battle & Stats

### Base Stats
```json
"stats": [
  {
    "base_stat": 35,
    "effort": 0,
    "stat": {
      "name": "hp"
    }
  },
  {
    "base_stat": 55,
    "effort": 0,
    "stat": {
      "name": "attack"
    }
  }
  // ... speed, special-defense, special-attack, defense
]
```

### Moves
```json
"moves": [
  {
    "move": {
      "name": "mega-punch",
      "url": "https://pokeapi.co/api/v2/move/5/"
    },
    "version_group_details": [
      {
        "level_learned_at": 0,
        "move_learn_method": {
          "name": "machine"
        },
        "version_group": {
          "name": "red-blue"
        }
      }
    ]
  }
]
```

### Move Learning Methods
| Method | Description |
|--------|-------------|
| `level-up` | Learned by leveling up |
| `machine` | TM/HM/TR moves |
| `tutor` | Move tutor exclusive |
| `egg` | Egg moves from breeding |

### Held Items
```json
"held_items": [
  {
    "item": {
      "name": "oran-berry"
    },
    "version_details": [
      {
        "rarity": 50,
        "version": {
          "name": "ruby"
        }
      }
    ]
  }
]
```

---

## 🎨 Visual & Audio Assets

### Sprites
```json
"sprites": {
  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
  "front_female": null,
  "front_shiny_female": null,
  "back_female": null,
  "back_shiny_female": null,
  "other": {
    "dream_world": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
    },
    "home": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
      "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/25.png"
    },
    "official-artwork": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    }
  },
  "versions": {
    // Generation-specific sprites
    "generation-i": { ... },
    "generation-ii": { ... }
  }
}
```

### Audio
```json
"cries": {
  "latest": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg",
  "legacy": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/25.ogg"
}
```

---

## 🎮 Game Integration

### Game Indices
```json
"game_indices": [
  {
    "game_index": 25,
    "version": {
      "name": "red"
    }
  },
  {
    "game_index": 25,
    "version": {
      "name": "blue"
    }
  }
]
```

### Pokedex Numbers
```json
"pokedex_numbers": [
  {
    "entry_number": 25,
    "pokedex": {
      "name": "national"
    }
  },
  {
    "entry_number": 25,
    "pokedex": {
      "name": "kanto"
    }
  }
]
```

### Encounter Locations
**Endpoint:** `GET /pokemon/{id}/encounters`
```json
[
  {
    "location_area": {
      "name": "kanto-route-2-south-towards-viridian-city",
      "url": "https://pokeapi.co/api/v2/location-area/296/"
    },
    "version_details": [
      {
        "encounter_details": [
          {
            "chance": 10,
            "condition_values": [],
            "max_level": 5,
            "method": {
              "name": "walk"
            },
            "min_level": 3
          }
        ],
        "max_chance": 10,
        "version": {
          "name": "red"
        }
      }
    ]
  }
]
```

---

## 🌍 Localization

### Multi-language Support
Most text content is available in multiple languages:

```json
"names": [
  {
    "language": {
      "name": "en"
    },
    "name": "Pikachu"
  },
  {
    "language": {
      "name": "ja"
    },
    "name": "ピカチュウ"
  },
  {
    "language": {
      "name": "ko"
    },
    "name": "피카츄"
  }
]
```

### Available Languages
- `en` - English
- `ja` - Japanese
- `ko` - Korean
- `zh-Hant` - Chinese Traditional
- `fr` - French
- `de` - German
- `es` - Spanish
- `it` - Italian
- `pt` - Portuguese
- `ru` - Russian

### Flavor Text (Pokedex Entries)
```json
"flavor_text_entries": [
  {
    "flavor_text": "When several of these POKéMON gather, their electricity could build and cause lightning storms.",
    "language": {
      "name": "en"
    },
    "version": {
      "name": "red"
    }
  }
]
```

---

## 🔗 API Endpoints Reference

### Primary Endpoints
| Endpoint | Purpose | Key Data |
|----------|---------|----------|
| `/pokemon/{id}` | Main Pokemon data | Stats, sprites, moves, abilities |
| `/pokemon-species/{id}` | Species information | Evolution, breeding, descriptions |
| `/evolution-chain/{id}` | Evolution tree | Evolution requirements and chain |
| `/ability/{id}` | Ability details | Effects and descriptions |
| `/move/{id}` | Move information | Power, accuracy, effects |
| `/type/{id}` | Type effectiveness | Damage relationships |

### Helper Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/pokemon/{id}/encounters` | Location encounters |
| `/generation/{id}` | Generation-specific data |
| `/pokedex/{id}` | Regional Pokedex entries |
| `/item/{id}` | Evolution items and held items |
| `/location-area/{id}` | Detailed location information |

### Pagination
Most list endpoints support pagination:
```
GET /pokemon?limit=20&offset=0
```

### Rate Limiting
- No API key required
- Fair use policy
- Consider caching responses
- Batch requests when possible

---

## 💡 Usage Tips

### For Quiz Applications
- Use `sprites.other.official-artwork.front_default` for high-quality images
- `sprites.front_default` for pixel art style
- Filter moves by `move_learn_method.name === "level-up"` for natural moves

### For Pokedex Applications
- Combine `/pokemon/{id}` and `/pokemon-species/{id}` for complete data
- Use `flavor_text_entries` for descriptions
- `pokedex_numbers` for regional organization

### For Battle Simulators
- `stats` array for base statistics
- `abilities` for battle effects
- `moves` with full battle data from move endpoint
- Type effectiveness from `/type/{id}`

### Performance Optimization
- Cache frequently accessed data (sprites, basic info)
- Use pagination for large lists
- Consider storing evolution chains locally
- Batch related requests when possible

---

## 📝 Notes

- All URLs in responses are fully qualified API endpoints
- Null values indicate unavailable data (e.g., no shiny sprite)
- Some Pokemon have form variations with separate endpoints
- Generation-specific data varies by game version
- Images are served from GitHub CDN (reliable but consider local caching)

---

*Last updated: 2024*
*API Version: v2*
*Documentation: https://pokeapi.co/docs/v2*