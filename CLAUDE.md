# Claude Code Configuration

This file contains configuration and instructions for Claude Code.

## Project Overview

This is a comprehensive Pokemon toolkit built with Next.js featuring multiple tools and utilities for Pokemon enthusiasts:
- **Quiz Game**: Generation-based Pokemon identification with shadows and multiple choice
- **Complete Pokedex**: Browse all Pokemon by generation with shiny variants
- **Detailed Pokemon Pages**: Individual Pokemon information with complete movesets
- **Comprehensive Moves Database**: All 937 Pokemon moves with complete details
- **Type Effectiveness System**: Complete type matchup calculator and reference
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

## Pokedex
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

## Pokemon Detail Pages
Comprehensive individual Pokemon information pages featuring:
- **Complete Pokemon Data**: ID, name, height, weight, base experience, generation, habitat
- **Visual Elements**: High-quality official artwork, shiny variants toggle, Pokemon cries audio
- **Type Information**: Color-coded type badges with official Pokemon type styling
- **Form Variations**: Support for different Pokemon forms (Alolan, Galarian, etc.)
- **Base Stats Display**: All 6 base stats with visual progress bars and color gradients
- **Abilities Information**: Normal and hidden abilities with clear indicators
- **Species Data**: Capture rate, base happiness, flavor text descriptions
- **Evolution Chain**: Complete evolution line with conditions and requirements
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
- Complete Pokemon type effectiveness data and calculations
- Type advantage/disadvantage system with multiplier values
- Interactive type effectiveness display component
- Comprehensive type matchup data for all Pokemon types
- Support for dual-type Pokemon effectiveness calculations

## Theme
- **Pixel Art Style**: Retro 8-bit/16-bit aesthetic with pixelated rendering
- **Color Scheme**: Retro classic Pokemon pixel style with darker tones
  - Background: Deep navy (#1a1a2e)
  - Primary: Dark blue-gray (#16213e) 
  - Accent: Coral red (#e94560)
  - Not too light - maintains classic Game Boy Color feel
- **Typography**: "Press Start 2P" pixel font for authentic retro gaming feel
- **UI Elements**: 
  - Pixel-perfect borders and buttons with 3D inset/outset effects
  - Pokeball loading spinner with spinning animation
  - Pokemon-themed colors with pixel-smooth image rendering
- **Interactive Elements**: Buttons have classic pixel game feel with hover/press effects

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
node scripts/download-and-optimize-sprites.js forms-only  # All 277 variant forms (Mega/Alolan/Galarian/etc) (~8MB)
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
node scripts/download-and-optimize-sprites.js forms-only  # All 277 variant forms (Mega/Alolan/Galarian/etc)
```

## Notes
This project is based on mobile web app device so supporting responsive design on mobile and desktop.
Uses strict TypeScript syntax for deployment on Vercel.