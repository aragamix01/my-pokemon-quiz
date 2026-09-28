'use client'

import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_KEY = 'pokemon-theme'
export const FOIL_KEY = 'pokemon-foil'

/**
 * Runs before first paint (inlined in layout.tsx) so the page never flashes the wrong theme:
 * saved choice first, else the system setting
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.documentElement.dataset.foil=localStorage.getItem('${FOIL_KEY}')==='off'?'off':'on'}catch(e){document.documentElement.dataset.theme='dark'}})()`

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // private mode: the choice lasts for this page only
  }
}

/** Current theme, updated whenever <html data-theme> changes */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setState] = useState<Theme>('dark')

  useEffect(() => {
    setState(readTheme())
    const observer = new MutationObserver(() => setState(readTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return [theme, setTheme]
}

/** Holo foil switch: "off" turns every card's foil, sparkles, glare, tilt, glow and auto-shine off (<html data-foil>) */
export function foilEnabled() {
  return typeof document === 'undefined' || document.documentElement.dataset.foil !== 'off'
}

export function setFoil(on: boolean) {
  document.documentElement.dataset.foil = on ? 'on' : 'off'
  try {
    localStorage.setItem(FOIL_KEY, on ? 'on' : 'off')
  } catch {
    // private mode: the choice lasts for this page only
  }
}

/** Whether the holo foil is on, updated whenever <html data-foil> changes */
export function useFoil(): [boolean, (on: boolean) => void] {
  const [on, setOn] = useState(true)

  useEffect(() => {
    setOn(foilEnabled())
    const observer = new MutationObserver(() => setOn(foilEnabled()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-foil'] })
    return () => observer.disconnect()
  }, [])

  return [on, setFoil]
}
