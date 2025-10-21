'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  searchPokemonWithEmbeddings,
  preloadHybridSearch,
  isModelLoaded,
  isModelLoading,
  areEmbeddingsLoaded
} from '@/lib/pokemon-hybrid-ai-search';
import type { PokemonMetadata } from '@/types/pokemon-metadata';
import styles from './AISearchBar.module.css';

interface AISearchBarProps {
  pokemonList: PokemonMetadata[];
  onResults: (results: PokemonMetadata[]) => void;
  placeholder?: string;
  maxResults?: number;
}

export default function AISearchBar({
  pokemonList,
  onResults,
  placeholder = 'Try: "strong fire starter" or "fast electric type"',
  maxResults = 10,
}: AISearchBarProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadingState, setLoadingState] = useState<string>('');

  // Check if ready on mount
  useEffect(() => {
    setIsReady(isModelLoaded() && areEmbeddingsLoaded());
  }, []);

  // Preload on first focus
  const handleFocus = useCallback(async () => {
    if (!isReady && !isModelLoading()) {
      setLoadingState('Loading AI model and embeddings...');
      try {
        await preloadHybridSearch();
        setIsReady(true);
        setLoadingState('');
      } catch (err) {
        console.error('Failed to load AI:', err);
        setError('Failed to load AI. Make sure embeddings are generated.');
        setLoadingState('');
      }
    }
  }, [isReady]);

  // Perform AI search
  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      onResults(pokemonList);
      return;
    }

    if (!isReady) {
      setError('AI not ready. Click search box to load.');
      return;
    }

    setIsSearching(true);
    setError(null);

    // Use setTimeout to allow UI to update
    setTimeout(async () => {
      try {
        const results = await searchPokemonWithEmbeddings(query, pokemonList, maxResults);
        onResults(results.map(r => r.pokemon));
      } catch (err) {
        console.error('Search error:', err);
        setError('Search failed. Please try again.');
        onResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 50);
  }, [query, pokemonList, maxResults, onResults, isReady]);

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    onResults(pokemonList);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.iconContainer}>
          {loadingState ? (
            <div className={styles.spinner} title="Loading..." />
          ) : isReady ? (
            <span className={styles.aiIcon} title="AI Ready">✨</span>
          ) : (
            <span className={styles.searchIcon} title="Click to load AI">🔍</span>
          )}
        </div>

        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          disabled={isSearching}
        />

        {query && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            disabled={isSearching}
            title="Clear search"
          >
            ✕
          </button>
        )}

        <button
          className={styles.searchButton}
          onClick={handleSearch}
          disabled={isSearching || !query.trim() || !isReady}
          title="AI Search"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {loadingState && (
        <div className={styles.loadingMessage}>
          {loadingState}
        </div>
      )}

      {isReady && !query && !isSearching && (
        <div className={styles.hint}>
          ✨ AI Search Ready! Try natural language:
          <ul>
            <li>&quot;strong fire starter Pokemon&quot;</li>
            <li>&quot;fast electric types&quot;</li>
            <li>&quot;defensive water Pokemon&quot;</li>
            <li>&quot;legendary Pokemon from Gen 3&quot;</li>
          </ul>
        </div>
      )}

      {!isReady && !loadingState && (
        <div className={styles.hint}>
          Click the search box to load AI search (one-time ~23MB)
        </div>
      )}
    </div>
  );
}
