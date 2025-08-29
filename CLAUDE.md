# Claude Code Configuration

This file contains configuration and instructions for Claude Code.

## Project Overview

This is free time project base on next.js that help me memorize pokemon name with a quiz game

## Quiz Game
The game is seperate by generation of pokemon
Show a shadow of pokemon and have 4 choices for selection (4 choice are in the same generations pokemon name)
After user select a choices instantly reveal an answer
The game have a round. (10 question per round)

## Theme
- **Pixel Art Style**: Retro 8-bit/16-bit aesthetic with pixelated rendering
- **Color Scheme**: Dark background (#0f0f23) with purple/blue gradients and gold accents (#ffd700)
- **Typography**: "Press Start 2P" pixel font for authentic retro gaming feel
- **UI Elements**: 
  - Pixel-perfect borders and buttons with 3D inset/outset effects
  - Retro-style loading spinners and animations
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