'use client'

// Global image state manager to persist image loading states across component re-renders
interface ImageState {
  isLoaded: boolean
  hasError: boolean
  currentSrcIndex: number
}

class ImageStateManager {
  private states: Map<string, ImageState> = new Map()

  getImageState(key: string): ImageState {
    return this.states.get(key) || {
      isLoaded: false,
      hasError: false,
      currentSrcIndex: 0
    }
  }

  setImageState(key: string, state: Partial<ImageState>) {
    const currentState = this.getImageState(key)
    this.states.set(key, { ...currentState, ...state })
  }

  clearImageState(key: string) {
    this.states.delete(key)
  }

  isImageLoaded(key: string): boolean {
    return this.states.get(key)?.isLoaded || false
  }

  // Clear states that haven't been accessed recently to prevent memory leaks
  cleanup() {
    // For now, keep all states as the cleanup logic would be complex
    // In a production app, you might want to implement LRU cache or timestamp-based cleanup
  }
}

// Global singleton instance
export const imageStateManager = new ImageStateManager()