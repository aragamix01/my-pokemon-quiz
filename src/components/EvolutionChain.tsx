'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { EvolutionChainLink, EvolutionDetail } from '@/types/pokemon'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { formatPokemonName, japaneseName } from '@/lib/pokemon-names'
import { getFormByName, formDisplayName } from '@/lib/pokemon-forms'
import { getTypeCardColor } from '@/lib/type-card-colors'
import PokemonArt from '@/components/learn/PokemonArt'
import { PokeballMark } from '@/components/ui/PokeballMark'
import { cn } from '@/lib/cn'
import {
  ArrowDown, ArrowRight, ArrowFatLinesUp, Heart, ArrowsLeftRight, Sun, Moon, SunHorizon, MapPin, Lightning,
  CloudRain, GenderFemale, GenderMale, UsersThree, Footprints, Globe, Sparkle, Barbell, DeviceMobile, Star,
} from '@phosphor-icons/react'

// ── names ────────────────────────────────────────────────────────────────

const titleCase = (slug: string) =>
  slug.split('-').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const speciesIdFromUrl = (url: string) => parseInt(url.split('/').slice(-2, -1)[0], 10)

/** A Pokemon or form shown as a card */
interface Entry {
  key: string
  artId: number
  speciesId: number
  name: string
  jaName: string | null
  types: string[]
  href: string
}

function speciesEntry(meta: PokemonMetadata, hrefFor: (id: number, formId?: number) => string): Entry {
  return {
    key: `s${meta.id}`,
    artId: meta.id,
    speciesId: meta.id,
    name: formatPokemonName(meta.species_name),
    jaName: japaneseName(meta),
    types: meta.types,
    href: hrefFor(meta.id),
  }
}

/** Whether a PokeAPI form name is just the species' normal form */
function isDefaultForm(formName: string, meta: PokemonMetadata): boolean {
  return formName === meta.species_name || formName === meta.name
}

/** Card for a form name like "raichu-alola"; cosmetic forms without their own data fall back to the species */
function formEntry(formName: string, meta: PokemonMetadata, hrefFor: (id: number, formId?: number) => string): Entry {
  if (isDefaultForm(formName, meta)) return speciesEntry(meta, hrefFor)
  const form = getFormByName(formName)
  if (form) {
    return {
      key: `f${form.id}`,
      artId: form.id,
      speciesId: meta.id,
      name: formDisplayName(form, meta),
      jaName: null,
      types: form.types,
      href: hrefFor(meta.id, form.id),
    }
  }
  const suffix = formName.indexOf(meta.species_name + '-') === 0 ? formName.slice(meta.species_name.length + 1) : formName
  return { ...speciesEntry(meta, hrefFor), key: `c${formName}`, name: `${formatPokemonName(meta.species_name)} (${titleCase(suffix)})` }
}

// ── conditions ───────────────────────────────────────────────────────────

interface Condition {
  text: string
  icon?: ReactNode
  item?: string
}

const ICON = 12
const TIME: Record<string, { text: string; icon: ReactNode }> = {
  day: { text: 'Daytime', icon: <Sun size={ICON} /> },
  night: { text: 'Night', icon: <Moon size={ICON} /> },
  dusk: { text: 'Dusk', icon: <SunHorizon size={ICON} /> },
}
const SPECIAL_TRIGGERS: Record<string, string> = {
  shed: 'Empty party slot + spare Poké Ball',
  spin: 'Spin around holding a Sweet',
  'tower-of-darkness': 'Train in the Tower of Darkness',
  'tower-of-waters': 'Train in the Tower of Waters',
  'three-critical-hits': '3 critical hits in one battle',
  'take-damage': 'Lose 49+ HP, walk under the stone arch',
  'three-defeated-bisharp': 'Defeat 3 Bisharp holding Leader’s Crest',
  'gimmighoul-coins': 'Collect 999 Gimmighoul Coins',
  other: 'Special condition',
}

/** Readable pills for one PokeAPI evolution detail */
export function describeEvolution(d: EvolutionDetail): Condition[] {
  const out: Condition[] = []
  const trigger = d.trigger?.name
  if (d.min_level) out.push({ text: `Lv. ${d.min_level}`, icon: <ArrowFatLinesUp size={ICON} /> })
  if (trigger === 'trade') {
    out.push({ text: d.trade_species ? `Trade for ${titleCase(d.trade_species.name)}` : 'Trade', icon: <ArrowsLeftRight size={ICON} /> })
  }
  if (d.item) out.push({ text: titleCase(d.item.name), item: d.item.name })
  if (d.held_item) out.push({ text: `Holding ${titleCase(d.held_item.name)}`, item: d.held_item.name })
  if (d.min_happiness) out.push({ text: 'High friendship', icon: <Heart size={ICON} weight="fill" /> })
  if (d.min_affection) out.push({ text: `Affection ${d.min_affection}`, icon: <Heart size={ICON} weight="fill" /> })
  if (d.min_beauty) out.push({ text: 'High beauty', icon: <Sparkle size={ICON} /> })
  if (d.time_of_day && TIME[d.time_of_day]) out.push(TIME[d.time_of_day])
  if (d.known_move) out.push({ text: `Knows ${titleCase(d.known_move.name)}`, icon: <Lightning size={ICON} /> })
  if (d.known_move_type) out.push({ text: `Knows a ${titleCase(d.known_move_type.name)} move`, icon: <Lightning size={ICON} /> })
  if (d.used_move) {
    out.push({ text: `Use ${titleCase(d.used_move.name)}${d.min_move_count ? ` ${d.min_move_count}×` : ''}`, icon: <Lightning size={ICON} /> })
  }
  if (trigger === 'agile-style-move' || trigger === 'strong-style-move') {
    out.push({ text: `${trigger === 'agile-style-move' ? 'Agile' : 'Strong'} Style`, icon: <Lightning size={ICON} /> })
  }
  if (trigger === 'recoil-damage') out.push({ text: `Take ${d.min_damage_taken ?? ''} recoil damage`.replace('  ', ' '), icon: <Barbell size={ICON} /> })
  else if (d.min_damage_taken) out.push({ text: `Take ${d.min_damage_taken} damage`, icon: <Barbell size={ICON} /> })
  if (d.min_steps) out.push({ text: `Walk ${d.min_steps.toLocaleString()} steps`, icon: <Footprints size={ICON} /> })
  if (d.location) out.push({ text: `At ${titleCase(d.location.name)}`, icon: <MapPin size={ICON} /> })
  if (d.near_special_rock) out.push({ text: 'Near a special rock', icon: <MapPin size={ICON} /> })
  if (d.needs_overworld_rain) out.push({ text: 'In the rain', icon: <CloudRain size={ICON} /> })
  if (d.gender === 1) out.push({ text: 'Female', icon: <GenderFemale size={ICON} /> })
  if (d.gender === 2) out.push({ text: 'Male', icon: <GenderMale size={ICON} /> })
  if (d.party_species) out.push({ text: `${titleCase(d.party_species.name)} in party`, icon: <UsersThree size={ICON} /> })
  if (d.party_type) out.push({ text: `${titleCase(d.party_type.name)} type in party`, icon: <UsersThree size={ICON} /> })
  if (d.relative_physical_stats === 1) out.push({ text: 'Attack > Defense', icon: <Barbell size={ICON} /> })
  if (d.relative_physical_stats === -1) out.push({ text: 'Attack < Defense', icon: <Barbell size={ICON} /> })
  if (d.relative_physical_stats === 0) out.push({ text: 'Attack = Defense', icon: <Barbell size={ICON} /> })
  if (d.turn_upside_down) out.push({ text: 'Hold the console upside down', icon: <DeviceMobile size={ICON} /> })
  if (d.needs_multiplayer) out.push({ text: 'In a Union Circle', icon: <UsersThree size={ICON} /> })
  if (trigger && SPECIAL_TRIGGERS[trigger]) out.push({ text: SPECIAL_TRIGGERS[trigger], icon: <Star size={ICON} /> })
  if (d.region) out.push({ text: `In ${titleCase(d.region.name)}`, icon: <Globe size={ICON} /> })
  if (out.length === 0) out.push({ text: 'Level up', icon: <ArrowFatLinesUp size={ICON} /> })
  return out
}

// ── building the chain ───────────────────────────────────────────────────

/**
 * The method to show when several games differ: an evolution stone wins, since newer games
 * replaced location methods (Leafeon, Magnezone) with stones; otherwise the last listed
 */
function pickDetail(details: EvolutionDetail[]): EvolutionDetail {
  const stone = details.filter(d => d.trigger?.name === 'use-item')
  return stone.length ? stone[stone.length - 1] : details[details.length - 1]
}

interface Step {
  entry: Entry
  stage: string
  conditions: Condition[]
  children: Step[]
}

interface FormPair {
  from: Entry
  to: Entry
  conditions: Condition[]
}

function stageLabel(depth: number, rootIsBaby: boolean): string {
  const stage = depth - (rootIsBaby ? 1 : 0)
  if (stage < 0) return 'Baby'
  return stage === 0 ? 'Basic' : `Stage ${stage}`
}

function buildChain(root: EvolutionChainLink, hrefFor: (id: number, formId?: number) => string) {
  const pairs: FormPair[] = []
  const stages: Record<number, string> = {}
  const rootIsBaby = !!root.is_baby

  const walk = (link: EvolutionChainLink, depth: number, conditions: Condition[]): Step | null => {
    const meta = pokemonMetadataService.getMetadataById(speciesIdFromUrl(link.species.url))
    if (!meta) return null
    stages[meta.id] = stageLabel(depth, rootIsBaby)
    const children: Step[] = []
    link.evolves_to.forEach(child => {
      const childMeta = pokemonMetadataService.getMetadataById(speciesIdFromUrl(child.species.url))
      if (!childMeta) return
      // Split the details: the normal evolution, and ones between special forms (Alolan Raichu, Galarian Meowth...)
      const normal: EvolutionDetail[] = []
      child.evolution_details.forEach(d => {
        const from = d.required_pokemon_form?.name ?? meta.species_name
        const to = d.evolved_pokemon_form?.name ?? childMeta.species_name
        const special = !isDefaultForm(from, meta) || !isDefaultForm(to, childMeta)
        if (!special) {
          normal.push(d)
          return
        }
        const pair = { from: formEntry(from, meta, hrefFor), to: formEntry(to, childMeta, hrefFor), conditions: describeEvolution(d) }
        // One pair per from/to; later games come last in PokeAPI, so the newest method wins
        const existing = pairs.findIndex(p => p.from.key === pair.from.key && p.to.key === pair.to.key)
        if (existing === -1) pairs.push(pair)
        else pairs[existing] = pair
      })
      const details = normal.length ? normal : child.evolution_details
      let conditions: Condition[] = details.length ? describeEvolution(pickDetail(details)) : [{ text: 'Level up' }]
      // Only a special form evolves this way (Galarian Meowth -> Perrserker): say which
      if (!normal.length && details.length) {
        const from = details[details.length - 1].required_pokemon_form?.name
        if (from && !isDefaultForm(from, meta)) conditions = [{ text: `From ${formEntry(from, meta, hrefFor).name}` }, ...conditions]
      }
      const step = walk(child, depth + 1, conditions)
      if (step) children.push(step)
    })
    return { entry: speciesEntry(meta, hrefFor), stage: stages[meta.id], conditions, children }
  }

  const tree = walk(root, 0, [])
  return { tree, lines: joinPairs(pairs), stages }
}

/** Joins form pairs into lines: Alolan Geodude -> Alolan Graveler -> Alolan Golem */
function joinPairs(pairs: FormPair[]): Array<{ entries: Entry[]; conditions: Condition[][] }> {
  const lines: Array<{ entries: Entry[]; conditions: Condition[][] }> = []
  const starts = pairs.filter(p => !pairs.some(q => q.to.key === p.from.key))
  const follow = (entries: Entry[], conditions: Condition[][]) => {
    const last = entries[entries.length - 1]
    const next = pairs.filter(p => p.from.key === last.key && entries.every(e => e.key !== p.to.key))
    if (next.length === 0) {
      lines.push({ entries, conditions })
      return
    }
    next.forEach(p => follow(entries.concat(p.to), conditions.concat([p.conditions])))
  }
  starts.forEach(p => follow([p.from, p.to], [p.conditions]))
  return lines
}

// ── pieces ───────────────────────────────────────────────────────────────

function ItemIcon({ name }: { name: string }) {
  const [src, setSrc] = useState(`/sprites/optimized/items/${name}.webp`)
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="w-4 h-4 object-contain"
      style={{ imageRendering: 'pixelated' }}
      onError={() => {
        const github = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`
        if (src !== github) setSrc(github)
        else setFailed(true)
      }}
    />
  )
}

/** Arrow with the evolution conditions: down on phones, right on bigger screens */
function Connector({ conditions }: { conditions: Condition[] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-1.5 sm:py-0 sm:px-1.5 sm:w-[104px] flex-shrink-0">
      <div className="flex flex-wrap justify-center gap-1 max-w-[220px] sm:max-w-none">
        {conditions.map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] leading-tight text-center"
            style={{ background: 'var(--color-neutral-800)', color: 'var(--text-secondary)', border: '1px solid var(--color-neutral-700)' }}
          >
            {c.item ? <ItemIcon name={c.item} /> : c.icon}
            {c.text}
          </span>
        ))}
      </div>
      <ArrowDown size={16} className="sm:hidden" color="var(--color-accent)" />
      <ArrowRight size={16} className="hidden sm:block" color="var(--color-accent)" />
    </div>
  )
}

function EvoCard({ entry, stage, current }: { entry: Entry; stage?: string; current: boolean }) {
  const color = getTypeCardColor(entry.types[0])
  const body = (
    <>
      <PokeballMark className="absolute -right-4 -bottom-5 w-20 h-20 pointer-events-none" style={{ color: 'rgba(255,255,255,0.2)' }} />
      <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0">
        <PokemonArt id={entry.artId} alt={entry.name} lazy className="w-full h-full drop-shadow-md" />
      </div>
      <div className="relative min-w-0 flex-1 sm:flex-none sm:w-full sm:text-center">
        <div className="flex items-center gap-1 sm:justify-center text-[9px] uppercase tracking-wide nx-typecard-text" style={{ color: 'rgba(255,255,255,0.85)' }}>
          {current ? 'You are here' : stage}
        </div>
        <div className="nx-typecard-text text-[13px] font-bold leading-tight truncate" title={entry.name}>{entry.name}</div>
        {entry.jaName && <div className="nx-typecard-text text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>{entry.jaName}</div>}
        <div className="flex gap-1 mt-1 sm:justify-center flex-wrap">
          {entry.types.map(t => <span key={t} className="nx-typecard-pill" style={{ width: 52, fontSize: 9 }}>{t}</span>)}
        </div>
      </div>
    </>
  )
  const className = cn(
    'relative overflow-hidden rounded-lg flex flex-row sm:flex-col items-center gap-2 sm:gap-1 p-2 w-full max-w-[240px] sm:w-[128px] text-white',
    !current && 'transition hover:-translate-y-0.5 hover:brightness-105',
  )
  const style = {
    background: color,
    boxShadow: current ? `0 0 0 2px var(--color-surface), 0 0 0 4.5px var(--color-text)` : `0 6px 14px -8px ${color}`,
  }
  return current ? (
    <div aria-current="page" className={className} style={style}>{body}</div>
  ) : (
    <Link href={entry.href} className={className} style={style} aria-label={`View ${entry.name}`}>{body}</Link>
  )
}

function StepView({ step, currentKey }: { step: Step; currentKey: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto min-w-0">
      <EvoCard entry={step.entry} stage={step.stage} current={step.entry.key === currentKey} />
      {step.children.length === 1 && (
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto min-w-0">
          <Connector conditions={step.children[0].conditions} />
          <StepView step={step.children[0]} currentKey={currentKey} />
        </div>
      )}
      {step.children.length > 1 && (
        // Branches: a grid under the Pokemon on phones, stacked rows to its right on bigger screens
        <div className="w-full sm:w-auto mt-1 sm:mt-0 sm:ml-1 sm:pl-2 sm:border-l" style={{ borderColor: 'var(--color-neutral-700)' }}>
          <ArrowDown size={16} className="sm:hidden block mx-auto mb-1" color="var(--color-accent)" />
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:flex sm:flex-col sm:gap-2">
            {step.children.map(child => (
              <div key={child.entry.key} className="flex flex-col sm:flex-row items-center min-w-0">
                <Connector conditions={child.conditions} />
                <StepView step={child} currentKey={currentKey} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── main ─────────────────────────────────────────────────────────────────

interface EvolutionChainProps {
  chain: EvolutionChainLink
  currentSpeciesId: number
  /** Form ID currently shown on the page, to highlight a form card */
  currentFormId?: number
  hrefFor: (speciesId: number, formId?: number) => string
}

/** Evolution family as type-colored cards: vertical on phones, horizontal on bigger screens, with branches and form evolutions */
export default function EvolutionChain({ chain, currentSpeciesId, currentFormId, hrefFor }: EvolutionChainProps) {
  const { tree, lines, stages } = buildChain(chain, hrefFor)
  if (!tree) return null
  const currentKey = currentFormId && currentFormId > 10000 ? `f${currentFormId}` : `s${currentSpeciesId}`

  if (tree.children.length === 0 && lines.length === 0) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <EvoCard entry={tree.entry} current={tree.entry.key === currentKey} stage={tree.stage} />
        <p className="text-sm text-center sm:text-left" style={{ color: 'var(--text-secondary)' }}>
          {tree.entry.name} does not evolve.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center sm:justify-start overflow-x-auto nx-scroll-x p-1.5 -m-1.5">
        <StepView step={tree} currentKey={currentKey} />
      </div>

      {lines.length > 0 && (
        <div>
          <h4 className="text-[11px] uppercase tracking-wide mb-2" style={{ color: 'var(--color-neutral-400)' }}>
            Regional and other form evolutions
          </h4>
          <div className="flex flex-col gap-4">
            {lines.map(line => (
              <div
                key={line.entries.map(e => e.key).join('>')}
                className="flex flex-col sm:flex-row items-center overflow-x-auto nx-scroll-x p-1.5 -m-1.5"
              >
                {line.entries.map((entry, i) => (
                  <div key={entry.key} className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
                    {i > 0 && <Connector conditions={line.conditions[i - 1]} />}
                    <EvoCard entry={entry} stage={stages[entry.speciesId]} current={entry.key === currentKey} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
