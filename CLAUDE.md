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
The game is seperate by generation of pokemon
Show a shadow of pokemon and have 4 choices for selection (4 choice are in the same generations pokemon name)
After user select a choices instantly reveal an answer
The game have a round. (10 question per round)
Uses complete pokemon list from each generation (not limited to 50)

## Pokedex
Complete pokemon directory organized by generation
- Shows all pokemon from selected generation (Gen 1-9)
- Pokemon ordered by pokedex number (#001, #002, etc.)
- Each pokemon card displays: number, name, image, type badges
- Shiny toggle feature to view shiny variants when available
- Visual indicators for pokemon with/without shiny sprites
- Responsive grid layout (2-5 columns based on screen size)
- Generation selector component for easy navigation between generations
- Click-through navigation to detailed Pokemon information pages
- Scroll position restoration when returning from Pokemon details
- Back button remembers selected generation and scroll position

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

## Main API Call For Pokemon Data
get pokemon name and image from this docs -> https://github.com/PokeAPI/pokedex-promise-v2?tab=readme-ov-file#install-


## Technical Architecture

### Standardized Local Database System
- **Moves Database**: Complete local database with 937 Pokemon moves
- **Type Effectiveness Database**: Comprehensive type matchup data with multipliers
- **Abilities Database**: All Pokemon abilities with effects and associations
- **Items Database**: Complete Pokemon items catalog with costs and categories
- **Database Utilities**: Standardized search, filter, and utility functions for all databases
- **Pokemon API Integration**: Uses pokedex-promise-v2 for Pokemon data with local database fallbacks
- **Performance Optimization**: Instant local data access without API calls

### Database Management Scripts
- **Master Data Fetcher**: `scripts/fetch-all-data.js` - Generate all databases with one command
- **Move Fetcher**: `scripts/fetch-moves.js` - Automated script to fetch all moves from PokeAPI
- **Type Fetcher**: `scripts/fetch-types.js` - Generate complete type effectiveness database
- **Ability Fetcher**: `scripts/fetch-abilities.js` - Fetch all Pokemon abilities database
- **Item Fetcher**: `scripts/fetch-items.js` - Generate complete items database
- **Database Utilities**: `src/lib/database-utils.ts` - Common functions for all database operations

### Build Tools & Scripts
- **Type Safety**: Full TypeScript coverage with custom interfaces and types
- **Build Optimization**: Next.js optimized builds with code splitting
- **Local Database Architecture**: JSON + TypeScript dual format for optimal performance

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
node scripts/fetch-all-data.js items  # Regenerate only items database

# Individual Database Scripts (if needed)
node scripts/fetch-moves.js      # Regenerate moves database from PokeAPI
node scripts/fetch-types.js      # Regenerate type effectiveness database
node scripts/fetch-abilities.js  # Regenerate abilities database
node scripts/fetch-items.js      # Regenerate items database
```

## Notes
This project are base on mobile web app device so supporting responsive on mobile an desktop
Use strict syntax for deploy on Vercel
- to memorize