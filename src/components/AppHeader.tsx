'use client'

import { Suspense, useEffect, useRef, useState, FormEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Moon, Sun, SquaresFour, GameController, MagnifyingGlass, X } from '@phosphor-icons/react'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/cn'

type NavId = 'pokedex' | 'types' | 'learn'

const NAV: { id: NavId; label: string; short: string; href: string }[] = [
  { id: 'pokedex', label: 'Pokédex', short: 'Pokédex', href: '/?section=pokedex' },
  { id: 'types', label: 'Type Chart', short: 'Types', href: '/?section=types' },
  { id: 'learn', label: 'Play & Learn', short: 'Play', href: '/?section=learn' },
]

// Game routes belong to the Play & Learn tab, detail pages to the Pokedex
const PLAY_ROUTES = ['/learn', '/guess', '/name-all', '/memory', '/reveal', '/evolution', '/daily', '/type-quiz', '/size', '/quiz']

function useActiveNav(): NavId {
  const pathname = usePathname()
  const section = useSearchParams().get('section')
  if (pathname === '/') {
    if (section === 'types') return 'types'
    if (section === 'learn' || section === 'quiz') return 'learn'
    return 'pokedex'
  }
  if (PLAY_ROUTES.some(r => pathname.startsWith(r))) return 'learn'
  return 'pokedex'
}

function NavIcon({ id, size }: { id: NavId; size: number }) {
  if (id === 'types') return <SquaresFour size={size} weight="bold" />
  if (id === 'learn') return <GameController size={size} weight="bold" />
  return <PokeballIcon size={size} />
}

function PokeballIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h6M15 12h6" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      className="dex-iconbtn"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
    >
      {dark ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
    </button>
  )
}

/**
 * Pokedex search in the header. On the Pokedex it filters the list as you type (?q= in the URL);
 * anywhere else Enter opens the Pokedex with the search. "/" focuses it
 */
function HeaderSearch({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''
  const [value, setValue] = useState(urlQuery)
  const inputRef = useRef<HTMLInputElement>(null)
  const onPokedex = pathname === '/' && (searchParams.get('section') ?? 'pokedex') === 'pokedex'

  // Follow the URL (back button, chips that clear the search)
  useEffect(() => { setValue(urlQuery) }, [urlQuery])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const urlFor = (q: string) => {
    const params = new URLSearchParams(onPokedex ? searchParams.toString() : '')
    params.set('section', 'pokedex')
    if (q.trim()) params.set('q', q.trim())
    else params.delete('q')
    return `/?${params.toString()}`
  }

  // Live filtering on the Pokedex, lightly debounced so typing stays smooth
  useEffect(() => {
    if (!onPokedex || value.trim() === urlQuery) return
    const timer = window.setTimeout(() => router.replace(urlFor(value), { scroll: false }), 150)
    return () => window.clearTimeout(timer)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (onPokedex) router.replace(urlFor(value), { scroll: false })
    else router.push(urlFor(value))
    inputRef.current?.blur()
  }

  return (
    <form role="search" onSubmit={submit} className={cn('dex-search', className)}>
      <MagnifyingGlass size={18} weight="bold" color="#565a68" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search name, romaji or #no."
        aria-label="Search Pokémon"
        enterKeyHint="search"
      />
      {value ? (
        <button type="button" className="clear" aria-label="Clear search" onClick={() => { setValue(''); inputRef.current?.focus() }}>
          <X size={14} weight="bold" />
        </button>
      ) : (
        <kbd className="hidden xl:inline" aria-hidden>/</kbd>
      )}
    </form>
  )
}

function Nav() {
  const active = useActiveNav()
  return (
    <>
      <nav aria-label="Main" className="hidden sm:flex items-center gap-1">
        {NAV.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className={cn('dex-navtab', active === item.id && 'on')}
            aria-current={active === item.id ? 'page' : undefined}
          >
            <NavIcon id={item.id} size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
      {/* Phones: tabs sit at the bottom, within thumb reach */}
      <nav aria-label="Main" className="dex-bottomnav sm:hidden">
        {NAV.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(active === item.id && 'on')}
            aria-current={active === item.id ? 'page' : undefined}
          >
            <NavIcon id={item.id} size={24} />
            {item.short}
          </Link>
        ))}
      </nav>
    </>
  )
}

/** Search on a second header row below large screens, only where you browse Pokemon */
function SearchRow() {
  const active = useActiveNav()
  if (active !== 'pokedex') return null
  return (
    <div className="xl:hidden max-w-7xl mx-auto px-4 pb-4 -mt-1">
      <HeaderSearch />
    </div>
  )
}

/** Pokedex-device header: red shell, blue lens and three lights, black band below */
export default function AppHeader() {
  return (
    <header className="dex-header">
      <div className="max-w-7xl mx-auto px-4 h-[68px] sm:h-[84px] flex items-center gap-3 sm:gap-5">
        <Link href="/?section=pokedex" className="flex items-center gap-3 min-w-0" aria-label="Pokémon Toolkit home">
          <span className="dex-lens" aria-hidden="true"><span /></span>
          <span className="flex gap-1.5 self-start mt-3 sm:mt-4" aria-hidden="true">
            <span className="dex-led" style={{ background: '#ff5a4e' }} />
            <span className="dex-led" style={{ background: '#ffcb05' }} />
            <span className="dex-led" style={{ background: '#5fd068' }} />
          </span>
          <span className="flex flex-col leading-tight min-w-0">
            <span className="font-display text-xl sm:text-2xl font-bold truncate">Pokémon Toolkit</span>
            <span className="hidden sm:block text-xs font-semibold opacity-85">1025 Pokémon · Gen I–IX</span>
          </span>
        </Link>
        <div className="flex-1" />
        <Suspense fallback={null}>
          <Nav />
          <div className="hidden xl:block w-[260px]"><HeaderSearch /></div>
        </Suspense>
        <ThemeToggle />
      </div>
      <Suspense fallback={null}>
        <SearchRow />
      </Suspense>
    </header>
  )
}
