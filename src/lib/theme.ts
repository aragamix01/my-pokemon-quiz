'use client'

import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_KEY = 'pokemon-theme'

/**
 * Runs before first paint (inlined in layout.tsx) so the page never flashes the wrong theme:
 * saved choice first, else the system setting
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`

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
