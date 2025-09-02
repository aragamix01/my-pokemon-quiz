/**
 * Pokemon Items Utilities (Evolution Items Focus)
 * Service class and utilities for the evolution items JSON database
 */

import { EvolutionItemData, EvolutionItemsDatabase, EvolutionType } from '@/types/evolution-items'

// Import the JSON database
import evolutionItemsDatabase from '@/data/evolution-items.json'

export interface ItemSearchOptions {
  query?: string
  evolutionType?: EvolutionType
  generation?: string
  minCost?: number
  maxCost?: number
  hasSprite?: boolean
}

export interface ItemSortOptions {
  field: 'name' | 'displayName' | 'cost' | 'id' | 'generation' | 'evolutionType'
  direction: 'asc' | 'desc'
}

export class ItemsService {
  private database: EvolutionItemsDatabase

  constructor() {
    this.database = evolutionItemsDatabase as EvolutionItemsDatabase
  }

  /**
   * Get all evolution items
   */
  getAllItems(): Record<string, EvolutionItemData> {
    return this.database.items
  }

  /**
   * Get item by name
   */
  getItem(name: string): EvolutionItemData | null {
    return this.database.items[name] || null
  }

  /**
   * Get items by IDs
   */
  getItemsByIds(ids: number[]): EvolutionItemData[] {
    return Object.values(this.database.items)
      .filter(item => ids.includes(item.id))
      .sort((a, b) => a.id - b.id)
  }

  /**
   * Search and filter evolution items
   */
  searchAndFilter(options: ItemSearchOptions = {}): EvolutionItemData[] {
    let results = Object.values(this.database.items)

    // Text search
    if (options.query) {
      const query = options.query.toLowerCase()
      results = results.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.displayName.toLowerCase().includes(query) ||
        item.effect.toLowerCase().includes(query) ||
        item.shortEffect.toLowerCase().includes(query) ||
        item.flavorText.toLowerCase().includes(query)
      )
    }

    // Filter by evolution type
    if (options.evolutionType) {
      results = results.filter(item => item.evolutionType === options.evolutionType)
    }

    // Filter by generation
    if (options.generation) {
      results = results.filter(item => item.generation === options.generation)
    }

    // Filter by cost range
    if (options.minCost !== undefined) {
      results = results.filter(item => item.cost >= options.minCost!)
    }

    if (options.maxCost !== undefined) {
      results = results.filter(item => item.cost <= options.maxCost!)
    }

    // Filter by sprite availability
    if (options.hasSprite !== undefined) {
      results = results.filter(item => (item.sprite !== null) === options.hasSprite)
    }

    return results
  }

  /**
   * Sort items
   */
  sortItems(items: EvolutionItemData[], options: ItemSortOptions): EvolutionItemData[] {
    const { field, direction } = options

    return [...items].sort((a, b) => {
      let aVal = a[field]
      let bVal = b[field]

      // Handle null values
      if (aVal === null && bVal === null) return 0
      if (aVal === null) return direction === 'asc' ? 1 : -1
      if (bVal === null) return direction === 'asc' ? -1 : 1

      // Handle string comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  /**
   * Get items by evolution type
   */
  getItemsByType(type: EvolutionType): EvolutionItemData[] {
    return this.database.evolutionTypes[type] || []
  }

  /**
   * Get all evolution stones
   */
  getEvolutionStones(): EvolutionItemData[] {
    return this.getItemsByType('stone')
  }

  /**
   * Get all hold items (for evolution)
   */
  getHoldItems(): EvolutionItemData[] {
    return this.getItemsByType('hold')
  }

  /**
   * Get all trade items
   */
  getTradeItems(): EvolutionItemData[] {
    return this.getItemsByType('trade')
  }

  /**
   * Get all special evolution items
   */
  getSpecialItems(): EvolutionItemData[] {
    return this.getItemsByType('special')
  }

  /**
   * Get items by generation
   */
  getItemsByGeneration(generation?: string): Record<string, EvolutionItemData[]> {
    const items = Object.values(this.database.items)
    
    if (generation) {
      return {
        [generation]: items.filter(item => item.generation === generation)
      }
    }

    // Group by all generations
    const grouped: Record<string, EvolutionItemData[]> = {}
    items.forEach(item => {
      const gen = item.generation || 'unknown'
      if (!grouped[gen]) {
        grouped[gen] = []
      }
      grouped[gen].push(item)
    })

    return grouped
  }

  /**
   * Get free evolution items (cost = 0)
   */
  getFreeItems(): EvolutionItemData[] {
    return Object.values(this.database.items).filter(item => item.cost === 0)
  }

  /**
   * Get purchasable evolution items (cost > 0)
   */
  getPurchasableItems(): EvolutionItemData[] {
    return Object.values(this.database.items).filter(item => item.cost > 0)
  }

  /**
   * Get items with fling effects
   */
  getItemsWithFling(): EvolutionItemData[] {
    return Object.values(this.database.items).filter(item => item.flingPower !== null)
  }

  /**
   * Get database categories summary
   */
  getCategories() {
    return this.database.categories
  }

  /**
   * Get database metadata
   */
  getMetadata() {
    return this.database.metadata
  }

  /**
   * Search items by effect
   */
  searchByEffect(query: string): EvolutionItemData[] {
    const lowerQuery = query.toLowerCase()
    return Object.values(this.database.items).filter(item =>
      item.effect.toLowerCase().includes(lowerQuery) ||
      item.shortEffect.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get items by cost range
   */
  getItemsByCostRange(min: number, max: number): EvolutionItemData[] {
    return Object.values(this.database.items).filter(item =>
      item.cost >= min && item.cost <= max
    )
  }

  /**
   * Get most expensive evolution items
   */
  getMostExpensive(limit = 10): EvolutionItemData[] {
    return Object.values(this.database.items)
      .sort((a, b) => b.cost - a.cost)
      .slice(0, limit)
  }

  /**
   * Get cheapest evolution items
   */
  getCheapest(limit = 10): EvolutionItemData[] {
    return Object.values(this.database.items)
      .filter(item => item.cost > 0)
      .sort((a, b) => a.cost - b.cost)
      .slice(0, limit)
  }

  /**
   * Get database summary for display
   */
  getSummary() {
    return {
      totalItems: this.database.metadata.totalItems,
      byType: {
        stones: this.database.categories.stones,
        holdItems: this.database.categories.holdItems,
        tradeItems: this.database.categories.tradeItems,
        special: this.database.categories.special
      },
      lastUpdated: this.database.metadata.lastUpdated,
      costDistribution: {
        free: this.getFreeItems().length,
        purchasable: this.getPurchasableItems().length
      }
    }
  }

  /**
   * Check if item is evolution stone
   */
  isEvolutionStone(itemName: string): boolean {
    const item = this.getItem(itemName)
    return item?.evolutionType === 'stone' || false
  }

  /**
   * Check if item is hold evolution item
   */
  isHoldItem(itemName: string): boolean {
    const item = this.getItem(itemName)
    return item?.evolutionType === 'hold' || false
  }

  /**
   * Check if item is trade evolution item
   */
  isTradeItem(itemName: string): boolean {
    const item = this.getItem(itemName)
    return item?.evolutionType === 'trade' || false
  }
}

// Export singleton instance for easy use
export const itemsService = new ItemsService()

// Export utility functions for direct use
export const getAllEvolutionItems = () => itemsService.getAllItems()
export const getEvolutionItem = (name: string) => itemsService.getItem(name)
export const searchEvolutionItems = (options: ItemSearchOptions) => itemsService.searchAndFilter(options)
export const sortEvolutionItems = (items: EvolutionItemData[], options: ItemSortOptions) => itemsService.sortItems(items, options)
export const getEvolutionStones = () => itemsService.getEvolutionStones()
export const getHoldItems = () => itemsService.getHoldItems()
export const getTradeItems = () => itemsService.getTradeItems()
export const getSpecialItems = () => itemsService.getSpecialItems()
export const isEvolutionStone = (itemName: string) => itemsService.isEvolutionStone(itemName)