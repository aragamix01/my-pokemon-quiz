# Claude Code Configuration

This file contains configuration and instructions for Claude Code.

## Project Overview

This is a comprehensive Pokemon toolkit built with Next.js featuring multiple tools and utilities for Pokemon enthusiasts:
- Quiz game for memorizing Pokemon names
- Complete Pokedex browser with generation filtering
- Type effectiveness calculator and reference
- Additional Pokemon-related tools and features

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


## Commands

Add frequently used commands here for easy reference:

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Notes
This project are base on mobile web app device so supporting responsive on mobile an desktop
Use strict syntax for deploy on Vercel