'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseVirtualScrollProps {
  itemHeight: number
  containerHeight: number
  overscan?: number
  totalItems: number
}

interface VirtualScrollState {
  startIndex: number
  endIndex: number
  visibleItems: number[]
  scrollTop: number
}

export function useVirtualScroll({ 
  itemHeight, 
  containerHeight, 
  overscan = 5, 
  totalItems 
}: UseVirtualScrollProps) {
  const [state, setState] = useState<VirtualScrollState>({
    startIndex: 0,
    endIndex: 0,
    visibleItems: [],
    scrollTop: 0
  })

  const scrollElementRef = useRef<HTMLDivElement>(null)

  const calculateVisibleRange = useCallback((scrollTop: number) => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan
    const endIndex = Math.min(totalItems - 1, startIndex + visibleCount)
    
    const visibleItems = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i)

    return { startIndex, endIndex, visibleItems }
  }, [itemHeight, containerHeight, overscan, totalItems])

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement
    const scrollTop = target.scrollTop
    
    const { startIndex, endIndex, visibleItems } = calculateVisibleRange(scrollTop)
    
    setState({
      startIndex,
      endIndex, 
      visibleItems,
      scrollTop
    })
  }, [calculateVisibleRange])

  useEffect(() => {
    const element = scrollElementRef.current
    if (!element) return

    element.addEventListener('scroll', handleScroll, { passive: true })
    
    // Calculate initial visible range
    const { startIndex, endIndex, visibleItems } = calculateVisibleRange(0)
    setState({
      startIndex,
      endIndex,
      visibleItems,
      scrollTop: 0
    })

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, calculateVisibleRange])

  const scrollToIndex = useCallback((index: number) => {
    if (scrollElementRef.current) {
      scrollElementRef.current.scrollTop = index * itemHeight
    }
  }, [itemHeight])

  return {
    ...state,
    scrollElementRef,
    scrollToIndex,
    totalHeight: totalItems * itemHeight
  }
}