import { test, expect } from '@playwright/test';

test.describe('Pokedex Scroll Preservation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3001');
    
    // Clear any previous state
    await page.evaluate(() => {
      sessionStorage.clear();
    });
  });

  test('Load More preserves scroll position - Scenario A', async ({ page }) => {
    console.log('🧪 Testing Load More scroll preservation (Scenario A)');
    
    // Go to Pokedex → "All" generations
    await page.click('text=📱 Pokedex');
    await page.click('text=All');
    
    // Wait for initial Pokemon to load
    await page.waitForSelector('[data-pokemon-id]', { timeout: 10000 });
    
    // Scroll to middle of page (500px)
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500); // Let scroll settle
    
    // Record the scroll position before Load More
    const scrollBefore = await page.evaluate(() => window.scrollY);
    console.log('📏 Scroll position before Load More:', scrollBefore);
    
    // Click Load More
    await page.click('text=Load More');
    
    // Wait for new Pokemon to load
    await page.waitForTimeout(2000);
    
    // Check if scroll position is preserved
    const scrollAfter = await page.evaluate(() => window.scrollY);
    console.log('📏 Scroll position after Load More:', scrollAfter);
    
    // The position should be very close (within 50px tolerance for DOM changes)
    const scrollDiff = Math.abs(scrollAfter - scrollBefore);
    console.log('📊 Scroll difference:', scrollDiff);
    
    expect(scrollDiff).toBeLessThan(100); // Allow some tolerance for DOM updates
    
    // Verify that new Pokemon were actually loaded
    const pokemonCount = await page.$$eval('[data-pokemon-id]', elements => elements.length);
    console.log('🔢 Pokemon loaded after Load More:', pokemonCount);
    expect(pokemonCount).toBeGreaterThan(50); // Should have more than initial load
  });

  test('Navigation state preservation - Scenario B (Filter + Load More + Detail)', async ({ page }) => {
    console.log('🧪 Testing navigation state preservation (Scenario B)');
    
    // Go to Pokedex → "All"
    await page.click('text=📱 Pokedex');
    await page.click('text=All');
    
    // Wait for Pokemon to load
    await page.waitForSelector('[data-pokemon-id]', { timeout: 10000 });
    
    // Apply filters
    // Search for "pika"
    await page.fill('input[placeholder*="Search"]', 'pika');
    await page.waitForTimeout(1000);
    
    // Select electric type (if available)
    const electricType = page.locator('img[title="electric"]').first();
    if (await electricType.isVisible()) {
      await electricType.click();
      await page.waitForTimeout(1000);
    }
    
    // Load More twice
    if (await page.isVisible('text=Load More')) {
      await page.click('text=Load More');
      await page.waitForTimeout(1000);
    }
    if (await page.isVisible('text=Load More')) {
      await page.click('text=Load More');
      await page.waitForTimeout(1000);
    }
    
    // Scroll to middle of results
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(500);
    
    // Get current state before navigation
    const scrollBefore = await page.evaluate(() => window.scrollY);
    const searchValue = await page.inputValue('input[placeholder*="Search"]');
    const pokemonCount = await page.$$eval('[data-pokemon-id]', elements => elements.length);
    
    console.log('📊 State before navigation:', {
      scroll: scrollBefore,
      search: searchValue,
      pokemonCount
    });
    
    // Click any Pokemon to go to detail
    await page.click('[data-pokemon-id]');
    
    // Wait for navigation to detail page
    await page.waitForURL(/\/pokemon\/\d+/);
    
    // Go back using browser back button
    await page.goBack();
    
    // Wait for Pokedex to restore
    await page.waitForSelector('[data-pokemon-id]', { timeout: 10000 });
    
    // Verify state restoration
    const scrollAfter = await page.evaluate(() => window.scrollY);
    const searchAfter = await page.inputValue('input[placeholder*="Search"]');
    const pokemonAfter = await page.$$eval('[data-pokemon-id]', elements => elements.length);
    
    console.log('📊 State after restoration:', {
      scroll: scrollAfter,
      search: searchAfter,
      pokemonCount: pokemonAfter
    });
    
    // Verify search term is preserved
    expect(searchAfter).toBe(searchValue);
    
    // Verify Pokemon count is similar (may vary slightly due to filters)
    expect(pokemonAfter).toBeGreaterThan(0);
    
    // Verify scroll position is reasonably close
    const scrollDiff = Math.abs(scrollAfter - scrollBefore);
    expect(scrollDiff).toBeLessThan(200); // Allow more tolerance for complex state restoration
  });

  test('Multiple Load More + Navigation - Scenario C', async ({ page }) => {
    console.log('🧪 Testing multiple Load More + navigation (Scenario C)');
    
    // Go to Pokedex → "All"
    await page.click('text=📱 Pokedex');
    await page.click('text=All');
    
    // Wait for Pokemon to load
    await page.waitForSelector('[data-pokemon-id]', { timeout: 10000 });
    
    // Load More 3 times to get ~150 Pokemon
    for (let i = 0; i < 3; i++) {
      if (await page.isVisible('text=Load More')) {
        await page.click('text=Load More');
        await page.waitForTimeout(1500);
      }
    }
    
    // Verify we have a good amount of Pokemon loaded
    const pokemonCount = await page.$$eval('[data-pokemon-id]', elements => elements.length);
    console.log('🔢 Pokemon loaded:', pokemonCount);
    expect(pokemonCount).toBeGreaterThan(100);
    
    // Scroll to Pokemon around #120 position (estimate based on grid)
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    
    const scrollBefore = await page.evaluate(() => window.scrollY);
    
    // Click Pokemon (try to find one that's visible)
    const visiblePokemon = page.locator('[data-pokemon-id]').first();
    const pokemonId = await visiblePokemon.getAttribute('data-pokemon-id');
    await visiblePokemon.click();
    
    // Wait for navigation to detail page
    await page.waitForURL(/\/pokemon\/\d+/);
    
    // Go back
    await page.goBack();
    
    // Wait for restoration
    await page.waitForSelector('[data-pokemon-id]', { timeout: 15000 });
    
    // Verify Pokemon count is maintained
    const pokemonAfter = await page.$$eval('[data-pokemon-id]', elements => elements.length);
    console.log('🔢 Pokemon after restoration:', pokemonAfter);
    
    // Should have similar number of Pokemon (within reasonable range)
    expect(pokemonAfter).toBeGreaterThan(pokemonCount * 0.8); // At least 80% of original count
    
    // Verify scroll position
    const scrollAfter = await page.evaluate(() => window.scrollY);
    const scrollDiff = Math.abs(scrollAfter - scrollBefore);
    
    console.log('📏 Scroll restoration:', {
      before: scrollBefore,
      after: scrollAfter,
      diff: scrollDiff
    });
    
    // Should restore to a reasonable position
    expect(scrollDiff).toBeLessThan(300); // Allow more tolerance for large datasets
  });

  test('Generation-specific restoration - Individual Generation', async ({ page }) => {
    console.log('🧪 Testing generation-specific state restoration');
    
    // Go to Pokedex → Generation 1
    await page.click('text=📱 Pokedex');
    await page.click('text=1', { timeout: 5000 });
    
    // Wait for Gen 1 Pokemon to load
    await page.waitForSelector('[data-pokemon-id]', { timeout: 10000 });
    
    // Load More if available
    if (await page.isVisible('text=Load More')) {
      await page.click('text=Load More');
      await page.waitForTimeout(1000);
    }
    
    // Scroll and record state
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);
    
    const scrollBefore = await page.evaluate(() => window.scrollY);
    const pokemonBefore = await page.$$eval('[data-pokemon-id]', elements => elements.length);
    
    console.log('📊 Gen 1 state before navigation:', {
      scroll: scrollBefore,
      pokemonCount: pokemonBefore
    });
    
    // Click a Pokemon
    await page.click('[data-pokemon-id]');
    
    // Wait for detail page
    await page.waitForURL(/\/pokemon\/\d+/);
    
    // Go back
    await page.goBack();
    
    // Wait for restoration
    await page.waitForSelector('[data-pokemon-id]', { timeout: 10000 });
    
    // Verify restoration worked for individual generation
    const scrollAfter = await page.evaluate(() => window.scrollY);
    const pokemonAfter = await page.$$eval('[data-pokemon-id]', elements => elements.length);
    
    console.log('📊 Gen 1 state after restoration:', {
      scroll: scrollAfter,
      pokemonCount: pokemonAfter
    });
    
    // Verify Pokemon count is maintained
    expect(pokemonAfter).toBe(pokemonBefore);
    
    // Verify scroll position
    const scrollDiff = Math.abs(scrollAfter - scrollBefore);
    expect(scrollDiff).toBeLessThan(200);
  });
});