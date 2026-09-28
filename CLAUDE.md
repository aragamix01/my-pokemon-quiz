# Claude Code Configuration

This file contains configuration and instructions for Claude Code.

## Project Overview

This is a comprehensive Pokemon toolkit built with Next.js featuring multiple tools and utilities for Pokemon enthusiasts:
- **Quiz Game**: Generation-based Pokemon identification with shadows and multiple choice
- **Complete Pokedex**: Browse all Pokemon by generation with shiny variants
- **Detailed Pokemon Pages**: Individual Pokemon information with complete movesets
- **Comprehensive Moves Database**: All 937 Pokemon moves with complete details
- **Type Effectiveness System**: Complete type matchup calculator and reference
- **AI-Powered Search**: 100% free browser-based semantic search using Transformers.js
- **Navigation System**: Seamless browsing with memory and scroll position restoration
- **Dual Responsive Design**: Optimized layouts for both mobile and desktop experiences

## Quiz Game
Advanced Pokemon identification quiz with flexible generation support:
- **Generation-Based or Cross-Generation**: Choose specific generations (1-9) or play with "All" generations
- **Shadow Recognition**: Show Pokemon silhouettes with 4 multiple-choice answers
- **Smart Answer Selection**: Answer choices are from the same generation for fairness
- **Instant Feedback**: Immediately reveals correct answer after selection
- **10 Questions per Round**: Perfect game length with scoring system
- **Complete Pokemon Coverage**: Uses full Pokemon roster, not limited to popular ones
- **Metadata-Powered**: Ultra-fast loading using local Pokemon database (no API calls)
- **Cross-Generation Mode**: `/quiz/all` route for ultimate challenge with all 1000+ Pokemon

## Learn Mode
- **Play & Learn hub** (`LearnMenu`, home "Play & Learn" tab): "Practise with" chip row (All gens, Gen I-IX, Top 50/100/200, game Pokédex select), then a yellow Daily challenge card (streak, Pokédle and Pixel Reveal buttons with done checks), a red "Who's that Pokémon?" quiz card (silhouette; /quiz/<gen> or /quiz/all), a flashcards progress ring, and a grid of game tiles
Tools for memorizing Pokemon names, reached from the home page "Learn" tab (`?section=learn`):
- **Flashcards** (`/learn/[generation]`): Spaced repetition. Each Pokemon goes intro (see name + facts), then choose (4 look-alike options), then type (name from memory, with step-by-step hints and typo tolerance). Leitner boxes schedule reviews; box 4+ counts as mastered. Daily new-card limit (5/10/20), streak, and a collection grid (silhouettes for unseen Pokemon)
- **Pokedle** (`/guess/[generation]`): Guess a hidden Pokemon in 8 tries; each guess compares type 1/2, generation, color, shape, height, weight (match / close / arrows). Silhouette hint after 4 guesses
- **Name Them All** (`/name-all/[generation]`): Timed recall. Type every Pokemon name you remember (English or Japanese, exact match as you type); each fills its Pokedex slot, misses revealed at the end
- **Memory Match** (`/memory/[generation]`): Flip-card pairs, picture ↔ English name or English ↔ Japanese name, 6 or 8 pairs, fewest moves wins
- **Pixel Reveal** (`/reveal/[generation]`): Name a pixelated artwork (canvas, `PixelatedArt` component); each wrong guess sharpens it and lowers points (6 → 1), optional 4 choices worth 1 point
- **Evolution Order** (`/evolution/[generation]`): Tap an evolution line into order (one random branch per family). Data from `src/data/evolution-chains.json` (`scripts/fetch-evolution-chains.js`, part of `pipeline.js data`), read via `src/lib/evolution-chains.ts`
- **Daily Challenge** (`/daily/[generation]`, puzzles at `/daily/[generation]/pokedle` and `/daily/[generation]/reveal`): Same Pokedle answer and Pixel Reveal picture for everyone per date + scope (seeded RNG in `src/lib/daily.ts`), one try each, shareable emoji result, daily streak, stored in localStorage `pokemon-daily-v1`. Pokedle and Pixel Reveal live in `src/components/games/PokedleGame.tsx` / `RevealGame.tsx` with a `daily` prop; the route pages are thin wrappers
- **Type Quiz** (`/type-quiz/[generation]`): 10 mixed questions from the type chart (type vs type, attack vs a real dual-type Pokemon, "what type is X?", "what beats X?") with explanations; generator in `src/lib/type-quiz.ts`
- **Size Compare** (`/size`): Up to 3 Pokemon next to a person silhouette at real scale (adjustable height), with height and weight comparisons
- **Type colors in games**: Pokemon art sits on `TypePanel` (`src/components/ui/TypePanel.tsx`, first-type card color + Pokeball watermark) or a type-colored background. Where the color would hint the answer (flashcard choose/type steps, Pixel Reveal while guessing, Type Quiz before answering) pass `revealed={false}` until the answer is shown; the collection grid colors only Pokemon already met
- **Popular scopes**: "Top 50 / 100 / 200" buttons in the Learn menu pick the most popular Pokemon across all generations (`popular-50` / `popular-100` / `popular-200` scopes in `getScope()`). The ranked list is hand-curated in `src/lib/popular-pokemon.ts` (led by the 2020 Pokemon of the Year fan vote, plus mascots, starters, legendaries and Gen 9 favorites); the pool is in rank order, so Flashcards introduce the most popular first, and games number Pokemon by rank
- **PokemonPicker** (`src/components/PokemonPicker.tsx`): shared English/Japanese name search with suggestions (exact match first)
- **Game helpers**: `src/lib/game-utils.ts` (scope from route param, shuffle, clock, best scores in localStorage `pokemon-games-best-v1`)
- **Both names**: Learn mode and Pokedle show English + Japanese romaji ("Charmander" / "Hitokage", from `name_ja_roma` in metadata, PokeAPI language `ja-roma`) and accept either when typing
- **Libraries**: `src/lib/learn-progress.ts` (SRS state in localStorage `pokemon-learn-v1`), `src/lib/pokedle.ts` (clue comparison, stats in `pokemon-guess-v1`), `src/lib/pokemon-names.ts` (display names like "Mr. Mime", fuzzy name matching)

## Pokedex
- **Layout**: opens straight on all generations (no generation picker screen). Desktop: every filter in a sticky left sidebar (`PokedexFilterPanel`: generation I-IX, game Pokedex, type chips, category, evolution stage, forms, learning, total stats, habitat, color); phones and tablets: the same panel in a bottom sheet from the "Filters" button. Above the grid: Quick picks (All / Starters / Fan favourites / Legendary / Mythical / Mega / Recently viewed; Starters, Fan favourites and Recently viewed are `collection` id lists in `usePokemonFilter`, shown in list order), title with count, sort, Cards/Compact, Shiny and Random, then removable chips for each active filter and the Smart (AI) search switch
- **Recently viewed**: detail pages record the species id in localStorage `pokedex-recent-v1` (newest first, 40 max, `src/lib/recently-viewed.ts`); the quick pick shows only once something was viewed
- **Header search**: the search box lives in the header (`HeaderSearch` in AppHeader: inline on xl screens, a second header row below that). It writes `?q=` (live on the Pokedex; Enter elsewhere opens the Pokedex); `Pokedex` reads it into the filter. Matches English, species, romaji and numbers ("25", "#0025"); "/" focuses it
Ultra-high-performance Pokemon directory with cross-generation capabilities:
- **Cross-Generation Search**: "All" button enables searching across all 1000+ Pokemon from Gen 1-9
- **Smart Generation Filter**: Individual generation buttons (1-9) or "All" for complete database access
- **Skeleton Loading**: Smooth animated placeholders during data processing (especially for large datasets)
- **Advanced Search**: Real-time name-based search with instant results across selected generations
- **Multi-Criteria Filtering**: 
  - Filter by Pokemon types (multiple selection with visual type icons)
  - Filter by legendary/mythical status
  - Filter by habitat, color, and other attributes
  - Filter by base stats range with dual sliders
- **Flexible Sorting**: Sort by Pokedex number, name, total stats, height, weight
- **Performance Optimized**: 87% fewer API calls using metadata system with smart loading
- **Enhanced Mobile UX**: Fully responsive controls with touch-optimized type filters
- **Shiny Toggle**: View shiny variants with availability indicators
- **Responsive Design**: Adaptive grid layout (2-6 columns based on screen size)
- **Memory Management**: Scroll position restoration and efficient state handling
- **Japanese Name Search**: Search matches English and Japanese romaji names ("hitokage" finds Charmander); cards show the Japanese name under the English one
- **Evolution & Form Filters**: Evolution stage (first / middle / fully evolved / does not evolve, from `getEvolutionStages()` in `src/lib/evolution-chains.ts`) and special forms (Mega / regional / Gigantamax, from metadata variants via `hasFormKind()`)
- **Learning Progress**: Cards show ★ (mastered) or ● (learning) from Flashcards progress, with a "Learning progress" filter (not met / learning / mastered)
- **Random Button**: Opens a random Pokemon from the current filtered list
- **Type-Colored Cards**: Cards and compact rows use the first type's soft color (`getTypeCardColor()` in `src/lib/type-card-colors.ts`, separate from the saturated badge colors), white text, a faint Pokeball watermark (`src/components/ui/PokeballMark.tsx`) and a big faded number. Card style `.nx-typecard` (name, Japanese name and type pills on the left, artwork bottom right); sprites use `lighten={false}` because the `lighten` blend mode washes them out on colored backgrounds
- **Holo Foil Cards**: Cards and compact rows are `HoloCard`s with `still` and `glow`, using the plain cosmos foil for a consistent grid (random Foil Lab finishes are only on the detail page) (foil and glare follow the pointer with a small tilt; no idle drift or idle glow, so large grids stay cheap)
- **Compact View**: "Cards / Compact" toggle above the grid switches to small type-colored row cards (round sprite, name, round type icons via `src/components/ui/TypeIcon.tsx`, number; `.nx-pokerow` in globals.css), 2-4 per row, remembered in localStorage `pokedex-compact-view`
- **Browse by Game**: Pick a game's own Pokedex (Paldea, Galar, Kitakami, Lumiose...) instead of a generation; list uses that game's order and numbers (`regionalDex` in `usePokemonFilter`, a mode rather than a filter so Reset keeps it)

## Game (Regional) Pokedexes
- **Data**: `src/data/regional-pokedexes.json` (33 game Pokedexes with `[regionalNumber, speciesId]` entries, plus English game and version-group names), from `scripts/fetch-regional-pokedexes.js`, part of `pipeline.js data`
- **Library**: `src/lib/regional-pokedexes.ts` (`getPokedexes`, `pokedexesForSpecies`, `numberInVersion`, `versionName`)
- **Learn scope**: every Learn game and Flashcards accept `dex-<name>` scopes (e.g. `/learn/dex-paldea`) via `getScope()` in `src/lib/game-utils.ts`; `PokedexSelect` component picks one
- **Detail page**: "Found in these games" section (`GamePokedexes`) and regional numbers next to each Pokedex entry

## Pokemon Detail Pages
- **Layout**: top bar (back to Pokédex, previous / next pills with number, artwork and name; within the generation when opened with ?gen=, else by national number), a sticky left column with the big holo card (types, cry and shiny buttons inside the card, faded number) and form chips, and on the right the title (#, English name, romaji · category), a sticky section tab bar that follows the scroll (About / Stats / Evolution / Matchups / Games / Moves) and one card per section. About = stat tiles + Pokedex entries + abilities/species/breeding. Matchups = `PokemonTypeEffectiveness` grouped by ×4 / ×2 / ×½ / ×¼ / ×0 badges (`.nx-mult`)
Comprehensive individual Pokemon information pages featuring:
- **Foil finishes**: `HoloCard` `finish` prop: cosmos (the original rainbow + stars), glitter, sunburst, shatter, etched, bubbles, ripple, frame (speckled silver border), or `random` = one picked by `foilFor(seed)` with its own angle, hue shift and grain, so each Pokemon always wears the same finish on its card and its page. `glow` adds a soft type-colored halo while lit, `glow="idle"` also a faint pulse at rest (styles `.nx-holo-fx`, `.fx-*`, `.nx-holo.glow` in globals.css; designed in the Foil Lab canvas)
- **Holo Foil**: The artwork panel is a `HoloCard` (`src/components/ui/HoloCard.tsx`, `.nx-holo` in globals.css): it tilts toward the pointer or finger with a rainbow foil sheen, star sparkles (two SVG layers moving against each other, masked around the light) and glare; idle it only shows a faint sheen that drifts slowly (`still` turns the drift off). On the detail page `autoShine={5000}` sweeps a light across the card (1.4 s), then rests 5 seconds after each sweep ends, while nobody touches or hovers it (paused when the tab is hidden or with reduced motion), and stays flat with reduced motion
- **Type Color**: Artwork and types sit on a panel in the first type's card color with a Pokeball watermark (same palette as Pokedex cards); the number badge and the card's top edge use it too. The right column has `min-w-0` so wide rows scroll (`.nx-scroll-x`, thin dark scrollbar) instead of widening the page
- **Header**: Number, English name, Japanese romaji name and category ("Charizard / Lizardon · Flame Pokémon", from species `genera`)
- **Pokedex Entries**: Every English entry by game, identical texts grouped (`src/components/PokedexEntries.tsx`), newest selected by default
- **Stat Ranks**: Each base stat and the total compared with all Pokemon ("Speed 100 · faster than 85% of Pokemon", `src/components/StatRanks.tsx`)
- **Complete Pokemon Data**: ID, name, height, weight, base experience, generation, habitat
- **Visual Elements**: High-quality official artwork, shiny variants toggle, Pokemon cries audio
- **Type Information**: Color-coded type badges with official Pokemon type styling
- **Form Variations**: Support for different Pokemon forms (Alolan, Galarian, etc.)
- **Base Stats Display**: All 6 base stats with visual progress bars and color gradients
- **Abilities Information**: Normal and hidden abilities with clear indicators
- **Species Data**: Capture rate, base happiness, flavor text descriptions
- **Evolution Chain** (`src/components/EvolutionChain.tsx`): type-colored cards (art, English + Japanese name, type pills, stage label Baby / Basic / Stage 1 / Stage 2, "You are here" on the current one). Vertical with down arrows on phones, horizontal on bigger screens; branches (Eevee, Wurmple) become a 2-column grid on phones and stacked rows on desktop. Conditions are readable pills from every PokeAPI evolution detail field (`describeEvolution`: Lv., items with sprites, friendship, time, trade, moves, location, region...); a stone method is preferred when games differ. Details with `required_pokemon_form` / `evolved_pokemon_form` become a "Regional and other form evolutions" section (Alolan Raichu, Galarian Meowth -> Perrserker, Alolan Geodude line). Single-stage Pokemon say "does not evolve"
- **Navigation**: Floating left/right buttons for previous/next Pokemon within generation
- **Responsive Design**: Optimized layout for both mobile and desktop viewing

## Moves Database System
Comprehensive Pokemon moves system with complete database:
- **Complete Coverage**: All 937 Pokemon moves from Generation 1-9 with full details
- **Rich Move Data**: Power, PP, accuracy, type, damage class, effects, and more
- **Local Database**: No API calls required - instant loading of all move information
- **Dual Layout System**: 
  - **Desktop**: Professional table format with sticky headers and sortable columns
  - **Mobile**: Clean card layout optimized for touch interaction
- **Advanced Features**:
  - Moves sorted by type then alphabetically for easy browsing
  - Color-coded type and category badges for quick identification
  - Effect descriptions with probability percentages
  - Support for all move categories: Physical, Special, Status
  - Comprehensive move metadata including generation, contest type, target info

## Type Effectiveness System
- **Type Chart layout**: desktop = the full 18×18 matrix (`TypeMatrix`: attacking down the side, defending across the top, green 2 / salmon ½ / black 0; hovering dims the other rows and reads the cell out; clicking a column or cell checks that defending type) with the Matchup checker in a sticky right column. Phones = Checker / Full chart / By type switch, opening on the checker. By type = the Weak to / Strong against / Resists / Immune to lists
- **Type Chart page** (`src/components/TypeAdvantage.tsx`, home "Type Chart" tab): rows in game order (Stellar left out, it is Terastal-only), mode tabs Weak to / Strong against / Resists / Immune to computed from `EFFECTIVENESS_MATRIX`, plus a Matchup checker (pick 1-2 types or search a Pokemon) in three sections: Selected, damage taken grouped by ×4 / ×2 / ×½ / ×¼ / ×0, and Pokemon with the type(s) as picture + name chips linking to their pages (40 shown, "Show all"). The list includes alternate forms with their own types (Zacian Crowned, Megas, regional forms; src/data/pokemon-forms.json from scripts/fetch-pokemon-forms.js, part of pipeline.js data, read via getTypeForms() in src/lib/pokemon-forms.ts); form chips link to /pokemon/<species>?form=<formId>, which opens the detail page on that form
- **Uniform pills**: `TypePill` is fixed width (92px) by default everywhere (`fixed={false}` sizes by text); white `.nx-typecard-pill` pills are 64px (`.lg` 84px on the detail panel)
- Complete Pokemon type effectiveness data and calculations
- Type advantage/disadvantage system with multiplier values
- Interactive type effectiveness display component
- Comprehensive type matchup data for all Pokemon types
- Support for dual-type Pokemon effectiveness calculations

## AI-Powered Search System ✨ NEW
100% free browser-based AI using Transformers.js for natural language search:
- **Zero Cost**: No API fees, runs entirely in user's browser
- **Semantic Search**: Understands natural language queries like "strong fire starter" or "fast electric types"
- **Pokemon Search**: Natural language search over all 1000+ Pokemon
- **Move Search**: Find moves by description (e.g., "physical fire moves with high power")
- **Ability Search**: Search abilities by effect (e.g., "abilities that boost attack")
- **Team Builder AI**: Suggests Pokemon to complement your team based on type coverage
- **Privacy First**: All processing client-side, no data sent to servers
- **Offline Ready**: Works without internet after initial model cache
- **Fast Performance**: <100ms searches after initial model load (~23MB one-time download)
- **Documentation**: See `docs/ai-integration/` folder for complete guides

### AI Components & Libraries
- **`src/lib/ai-search.ts`**: Core semantic search engine with embeddings
- **`src/lib/pokemon-ai-search.ts`**: Pokemon-specific AI utilities
- **`src/components/AISearchBar.tsx`**: Ready-to-use AI search component with pixel art styling
- **Model**: Xenova/all-MiniLM-L6-v2 (sentence transformers for semantic similarity)

## Theme
- **Pokedex device look**: red header shell with a blue lens and three lights, black band under it (`AppHeader` in `src/components/AppHeader.tsx`, rendered by the root layout on every page). Desktop nav tabs sit in the header (Pokédex / Type Chart / Play & Learn, all `/?section=...`); phones get a fixed bottom tab bar instead (`.dex-bottomnav`). Old `?section=quiz` links open Play & Learn, which holds the silhouette quiz picker plus the Learn menu
- **Light and dark**: `<html data-theme>` picks the token set in `globals.css`; the moon/sun button in the header toggles it, saved in localStorage `pokemon-theme` (first visit follows the system). `THEME_INIT_SCRIPT` in `src/lib/theme.ts` sets it before paint; `useTheme()` gives the current theme to components that need literal colors (Recharts in `PokemonStatsChart`)
- **Colors**: light = warm cream #f6f1e7 page, white surfaces, ink #1a1b22 text, Pokeball red #d8261b accent; dark = #111218 page, #1b1d26 surfaces, #f2eee6 text, #ff5a4e accent, Pikachu yellow #ffcb05 for selected chips. Neutral and accent scales run from strongest contrast (100) to closest to the surface (900) in both themes, so `--color-neutral-800` is always a subtle fill and `-100` readable text. Legacy names (`--card-bg`, `--text-secondary`...) point at the new tokens. Use tokens, not hex, for anything on page surfaces; white text is only for type-colored cards
- **Typography**: Fredoka for headings (`.font-display`, h1-h3), Figtree for text, JetBrains Mono for numbers (`.font-number`), Kanit kept for Thai
- **Shapes**: pill buttons and chips (`.nx-tab` active = yellow in dark, ink in light), 14-20px card radius, filled red `.btn-primary`
- **Sprites**: `.lighten` blend mode is switched off in the light theme (it would wash sprites into the cream page)

## Data Fetching & Loading Architecture

### Pokemon Data Sources
- **Primary API**: [PokeAPI v2](https://pokeapi.co/) via [pokedex-promise-v2](https://github.com/PokeAPI/pokedex-promise-v2) wrapper
- **Local Databases**: JSON-based databases for instant access to moves, abilities, evolution items, and metadata
- **Hybrid Approach**: Combines API calls for Pokemon details with local databases for supplementary data

### Data Loading Strategy
1. **Metadata-First Architecture**: Load lightweight Pokemon metadata (1025 Pokemon, 530KB) for instant search/filtering
2. **Lazy Loading**: Pokemon details loaded on-demand when actually viewed
3. **Local Database Priority**: Moves, abilities, and evolution items served instantly from local JSON files
4. **Smart Caching**: API responses cached to minimize network requests
5. **Smart Loading**: Asynchronous processing for large datasets with skeleton loading

### Sprite Loading System
- **Local-First Strategy**: Prioritizes locally optimized WebP sprites for instant loading
- **Multi-Tier Fallback System**: 
  1. **WebP Optimized** (`/sprites/optimized/pokemon-artwork/*.webp`) - 88% smaller, 300px
  2. **PNG Variants** (`/sprites/optimized/pokemon-forms/*.webp`) - Regional forms support
  3. **GitHub Fallback** - Official PokeAPI sprites via GitHub
  4. **Placeholder Fallback** - Graceful degradation for missing sprites
- **Smart Form Detection**: Automatically selects correct sprite based on Pokemon ID and form variations
- **Shiny Support**: Dedicated shiny sprite directories with availability detection
- **Pre-loading Options**: Download sprite collections (Gen 1, Gen 1-2, popular, minimal, all, forms-only)


## Technical Architecture

### Standardized Local Database System
- **Moves Database**: Complete local database with 937 Pokemon moves
- **Type Effectiveness Database**: Comprehensive type matchup data with multipliers
- **Abilities Database**: All Pokemon abilities with effects and associations
- **Items Database**: Complete Pokemon items catalog with costs and categories
- **Pokemon Metadata Database**: Lightweight Pokemon data for search/sort operations
- **Database Utilities**: Standardized search, filter, and utility functions for all databases
- **Pokemon API Integration**: Uses pokedex-promise-v2 for Pokemon data with local database fallbacks
- **Performance Optimization**: Instant local data access without API calls

### High-Performance Pokedex System
- **Cross-Generation Architecture**: Seamlessly handles individual generations or all 1000+ Pokemon
- **Metadata-First Design**: Lightweight JSON database for instant search/sort operations across any dataset size
- **Smart Loading Management**: Asynchronous processing for large datasets (200+ Pokemon) with skeleton loading
- **Generation-Aware Filtering**: `usePokemonFilter` hook supports null generation for cross-generation queries
- **Enhanced Navigation**: Pokemon detail pages work with or without generation context
- **Real-time Filtering**: Instant search and filter results without API delays
- **Memory Efficient**: Optimized data conversion with intelligent loading states

### Optimized Sprite System
- **Complete Solution**: `scripts/download-and-optimize-sprites.js` - Download + WebP conversion in one command
- **88% Size Reduction**: PNG → WebP conversion with mobile optimization (300px)
- **Smart Strategies**: Choose from gen1, gen1-2, popular, or minimal collections
- **Zero Rate Limits**: Local-first architecture eliminates GitHub 402 errors
- **Instant Loading**: WebP format + local storage = blazing fast performance

### Database Management Scripts ✅ JSON-Only Architecture
- **Master Data Fetcher**: `scripts/fetch-all-data.js` - Generate all JSON databases with one command
- **Moves Fetcher**: `scripts/fetch-moves-json.js` - All 937 moves → `src/data/pokemon-moves.json`
- **Abilities Fetcher**: `scripts/fetch-abilities-json.js` - All 367 abilities → `src/data/pokemon-abilities.json`
- **Evolution Items Fetcher**: `scripts/fetch-evolution-items.js` - 48 evolution items → `src/data/evolution-items.json`
- **Type Effectiveness Fetcher**: `scripts/fetch-types.js` - Type matchups → `src/data/pokemon-type-effectiveness.json`
- **Metadata Fetcher**: `scripts/fetch-pokemon-metadata.js` - Pokemon metadata → `src/data/pokemon-metadata.json`

### Build Tools & Scripts  
- **Type Safety**: Full TypeScript coverage with auto-generated interfaces
- **Build Optimization**: Next.js optimized builds with WebP support and code splitting
- **JSON Database Architecture**: Standardized storage in `src/data/` with TypeScript utilities in `src/lib/`

### Standardized Database Storage ✅ Complete JSON Migration
All databases now follow a consistent JSON-first structure:

#### Data Storage (`src/data/`)
- **Pokemon Metadata**: `pokemon-metadata.json` - 1025 Pokemon metadata (530KB)
- **Pokemon Generations**: `pokemon-generations.json` - Generation groupings and counts
- **Moves Database**: `pokemon-moves.json` - All 937 moves with complete data (804KB)
- **Abilities Database**: `pokemon-abilities.json` - All 367 abilities with details (322KB)
- **Evolution Items**: `evolution-items.json` - Focused 48 evolution items database
- **Evolution Chains**: `evolution-chains.json` - All 540 evolution chains as species-ID trees (36KB)
- **Regional Pokedexes**: `regional-pokedexes.json` - 33 game Pokedexes with regional numbers, plus game names (69KB)
- **Type Effectiveness**: `pokemon-type-effectiveness.json` - Complete type matchup matrix

#### Utility Services (`src/lib/`)
- **MovesService**: `moves-utils.ts` - Comprehensive moves search, filter, and utility functions
- **AbilitiesService**: `abilities-utils.ts` - Complete abilities search and filter capabilities  
- **ItemsService**: `items-utils.ts` - Evolution items search, filter, and categorization utilities
- **MetadataService**: `pokemon-metadata.ts` - High-performance Pokemon metadata operations
- **TypeService**: `type-effectiveness.ts` - Type effectiveness calculations and utilities

#### Auto-Generated Types (`src/types/`)
- **pokemon-moves.ts** - MoveData interface and MovesDatabase structure
- **pokemon-abilities.ts** - AbilityData interface and AbilitiesDatabase structure
- **evolution-items.ts** - EvolutionItemData interface and EvolutionItemsDatabase structure  
- **pokemon-metadata.ts** - Complete metadata type definitions

## Optimized Sprite System

Ultra-efficient sprite system with **88% size reduction** and mobile optimization:

### How It Works
1. **Download + Optimize**: Single command downloads and converts to WebP format with 85% quality
2. **Mobile Optimized**: All images automatically resized to 300px for perfect mobile performance
3. **Smart Strategies**: Choose from gen1, gen1-2, popular, minimal, all, or forms-only collections
4. **Zero Rate Limits**: Local-first architecture eliminates GitHub 402 errors completely
5. **Instant Loading**: WebP format + local storage = blazing fast performance (0ms load times)
6. **Resume Support**: Can resume interrupted downloads without re-downloading existing files
7. **Intelligent Fallbacks**: Multi-tier fallback system ensures images always load gracefully

### Commands
```bash
# 🚀 RECOMMENDED: Gen 1 complete collection (~4MB)
node scripts/download-and-optimize-sprites.js gen1

# 📊 Available strategies:
node scripts/download-and-optimize-sprites.js gen1        # Gen 1 with shiny + forms (~4MB)
node scripts/download-and-optimize-sprites.js gen1-2      # Gen 1-2 with shiny + forms (~8MB)  
node scripts/download-and-optimize-sprites.js popular     # 80 popular Pokemon (~3MB)
node scripts/download-and-optimize-sprites.js minimal     # Gen 1 artwork only (~1.5MB)
node scripts/download-and-optimize-sprites.js all         # ALL Pokemon Gen 1-9 + variants (~12MB) 
node scripts/download-and-optimize-sprites.js forms-only  # All variant forms upstream (Mega/Alolan/Galarian/etc) (~9MB)
```

### Optimized Storage Structure
```
public/sprites/optimized/
├── pokemon-artwork/     # WebP artwork (300px, 85% quality)
│   └── shiny/          # Shiny variants
├── pokemon-forms/       # Regional variants (Alolan, Galarian, Hisuian, Paldean)
│   └── shiny/          # Shiny variant forms (when available)
├── items/              # Evolution items (WebP optimized, 64x64px)
└── types/              # Type icons (WebP optimized)
```

### Performance Features
- **88% Smaller**: WebP conversion reduces 42MB → 5MB
- **Mobile Perfect**: 300px images ideal for mobile screens
- **Smart Fallbacks**: WebP → PNG → GitHub → placeholder
- **Resume Capability**: Can resume interrupted downloads
- **Rate Limit Handling**: Built-in retry logic with exponential backoff
- **Batch Processing**: Downloads in batches of 10 to avoid overwhelming GitHub
- **Skip Existing**: Only downloads missing sprites (won't re-download)
- **Robust Error Handling**: Handles timeouts, network errors, and rate limits

### Runtime Sprite Loading Behavior
The application uses an intelligent sprite loading system with multiple fallback tiers:

1. **Primary**: WebP optimized sprites (`/sprites/optimized/pokemon-artwork/123.webp`)
2. **Forms Fallback**: Regional form variants (`/sprites/optimized/pokemon-forms/123.webp`)  
3. **GitHub API Fallback**: Official PokeAPI sprites for missing local files
4. **Placeholder Fallback**: Graceful placeholder for completely failed loads

**Smart Form Detection**: Automatically detects variant forms (Alolan, Galarian, Hisuian, Paldean) and loads appropriate sprites based on Pokemon name patterns and ID ranges.

### Post-Download Benefits
- ⚡ **Lightning Fast**: All images load instantly from local storage (0ms load time)
- 🚫 **Zero 402 Errors**: No GitHub requests = no rate limit issues
- 📱 **Perfect for Mobile**: No network dependency + 300px optimization for mobile screens
- 🎯 **100% Reliability**: Multi-tier fallback system prevents failed image loads
- 🔒 **Offline Ready**: Sprites work perfectly without internet connection
- 🎨 **Shiny Support**: Dedicated shiny directories with automatic detection
- 📦 **Small Bundle**: 88% size reduction means faster initial app download

## Commands

Add frequently used commands here for easy reference:

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint

# Database Management Scripts
node scripts/fetch-all-data.js        # Generate all databases (recommended)
node scripts/fetch-all-data.js moves  # Regenerate only moves database
node scripts/fetch-all-data.js types  # Regenerate only types database
node scripts/fetch-all-data.js abilities # Regenerate only abilities database
node scripts/fetch-all-data.js evolution-items # Regenerate only evolution items database
node scripts/fetch-all-data.js metadata # Regenerate only Pokemon metadata database

# Individual Database Scripts (if needed)
node scripts/fetch-moves-json.js  # Generate JSON moves database from PokeAPI (937 moves, 804KB)
node scripts/fetch-types.js      # Regenerate type effectiveness database
node scripts/fetch-abilities-json.js  # Generate JSON abilities database (367 abilities, 322KB)
node scripts/fetch-evolution-items.js  # Generate evolution items database (48 items only)
node scripts/fetch-pokemon-metadata.js # Regenerate Pokemon metadata database from PokeAPI

# Optimized Sprite Download Scripts
node scripts/download-and-optimize-sprites.js gen1        # 🚀 Gen 1 complete (RECOMMENDED)
node scripts/download-and-optimize-sprites.js gen1-2      # Gen 1-2 complete collection
node scripts/download-and-optimize-sprites.js popular     # 80 popular Pokemon only
node scripts/download-and-optimize-sprites.js minimal     # Gen 1 artwork only (no shiny/forms)
node scripts/download-and-optimize-sprites.js all         # ALL Pokemon + variants (complete)
node scripts/download-and-optimize-sprites.js forms-only  # All variant forms upstream (Mega/Alolan/Galarian/etc)

# AI Embeddings Generation (for semantic search)
node scripts/generate-pokemon-embeddings.js  # Generate Pokemon embeddings for AI search (~23MB model)
node scripts/test-pokemon-similarity.js      # Test Pokemon similarity results (quiz testing)

# ⚠️ Deprecated Scripts (Reference Only)
# The following scripts output TypeScript format and are kept for reference:
# - scripts/fetch-moves.js (use fetch-moves-json.js instead)
# - scripts/fetch-abilities.js (use fetch-abilities-json.js instead)
# - scripts/fetch-items.js (use fetch-evolution-items.js instead)
```

## Notes
This project is based on mobile web app device so supporting responsive design on mobile and desktop.
Uses strict TypeScript syntax for deployment on Vercel.
- to memorize