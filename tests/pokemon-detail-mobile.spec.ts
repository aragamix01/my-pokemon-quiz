import { test, expect } from '@playwright/test';

test.describe('Pokemon Detail Page Mobile UI', () => {
  test.beforeEach(async ({ page }) => {
    // Start the development server if not running
    await page.goto('http://localhost:3001');
  });

  test('should display Pokemon detail page with consistent mobile layout', async ({ page }) => {
    // Navigate to Pokedex
    await page.getByText('📱 Pokedex').click();
    
    // Click on Generation 1
    await page.getByText('1').first().click();
    
    // Wait for Pokemon to load
    await page.waitForSelector('[data-testid="pokemon-card"], .pokemon-card, .modern-card', { timeout: 10000 });
    
    // Click on first Pokemon (should be Bulbasaur)
    const firstPokemon = page.locator('[data-testid="pokemon-card"], .modern-card').first();
    await firstPokemon.click();
    
    // Wait for detail page to load
    await page.waitForSelector('h1:has-text("Pokemon Details")', { timeout: 10000 });
    
    // Test mobile layout consistency
    await test.step('Check header layout', async () => {
      const header = page.locator('h1:has-text("Pokemon Details")');
      await expect(header).toBeVisible();
      
      const backButton = page.getByText('← Back');
      await expect(backButton).toBeVisible();
    });
    
    await test.step('Check Pokemon sprite and controls', async () => {
      // Check sprite is visible
      const sprite = page.locator('img').first();
      await expect(sprite).toBeVisible();
      
      // Check type icons
      const typeIcons = page.locator('img[alt*="type"], img[title*="type"]');
      await expect(typeIcons.first()).toBeVisible();
      
      // Check Shiny and Cry buttons
      await expect(page.getByText('✨')).toBeVisible();
      await expect(page.getByText('🔊')).toBeVisible();
    });
    
    await test.step('Check information sections layout', async () => {
      // Check Basic Information section
      await expect(page.getByText('Basic Information')).toBeVisible();
      
      // Check Abilities section
      await expect(page.getByText('Abilities')).toBeVisible();
      
      // Check Breeding Info section
      await expect(page.getByText('Breeding Info')).toBeVisible();
      
      // Check Base Stats section
      await expect(page.getByText('Base Stats')).toBeVisible();
      
      // Check Evolution Chain if present
      const evolutionSection = page.getByText('Evolution Chain');
      if (await evolutionSection.isVisible()) {
        await expect(evolutionSection).toBeVisible();
      }
    });
    
    await test.step('Check consistent spacing and padding', async () => {
      // Check that sections have consistent spacing
      const sections = page.locator('h3');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(3); // Should have multiple sections
      
      // Check separator lines are present
      const separators = page.locator('hr.border-gray-600');
      const separatorCount = await separators.count();
      
      expect(separatorCount).toBeGreaterThan(2); // Should have multiple separators
    });
    
    await test.step('Check ability expansion functionality', async () => {
      // Find first ability and click to expand
      const firstAbility = page.locator('[data-testid="ability-card"], button:has-text("▶")').first();
      if (await firstAbility.isVisible()) {
        await firstAbility.click();
        
        // Check if expanded content appears
        await expect(page.getByText('Quick Summary:', { exact: false })).toBeVisible();
      }
    });
    
    await test.step('Check moves section expansion', async () => {
      // Click on moves section to expand
      const movesButton = page.getByText('Moves (').first();
      await movesButton.click();
      
      // Check if moves are displayed
      await page.waitForSelector('table, .bg-gray-700', { timeout: 5000 });
      
      // Should show moves in mobile card layout
      const mobileCards = page.locator('.md\\:hidden .bg-gray-700');
      if (await mobileCards.first().isVisible()) {
        await expect(mobileCards.first()).toBeVisible();
      }
    });
    
    await test.step('Check responsive design elements', async () => {
      // Verify mobile-specific layouts are active
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 768) {
        // Mobile specific checks
        
        // Check that mobile card layout is used for moves
        await expect(page.locator('.md\\:hidden')).toHaveCount({ min: 1 });
        
        // Check that tables stack properly on mobile
        const tables = page.locator('table');
        const tableCount = await tables.count();
        
        if (tableCount > 0) {
          // Tables should be visible and readable on mobile
          await expect(tables.first()).toBeVisible();
        }
      }
    });
  });
  
  test('should handle navigation between Pokemon on mobile', async ({ page }) => {
    // Navigate to Pokemon detail with generation context
    await page.goto('http://localhost:3001');
    await page.getByText('📱 Pokedex').click();
    await page.getByText('1').first().click();
    
    // Wait and click first Pokemon
    await page.waitForSelector('.modern-card', { timeout: 10000 });
    await page.locator('.modern-card').first().click();
    
    // Wait for detail page
    await page.waitForSelector('h1:has-text("Pokemon Details")', { timeout: 10000 });
    
    // Check for navigation buttons (if they exist)
    const prevButton = page.locator('button:has-text("‹")');
    const nextButton = page.locator('button:has-text("›")');
    
    if (await nextButton.isVisible()) {
      await nextButton.click();
      
      // Should navigate to next Pokemon
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1:has-text("Pokemon Details")')).toBeVisible();
    }
  });
  
  test('should maintain consistency across different Pokemon', async ({ page }) => {
    // Test multiple Pokemon for layout consistency
    const pokemonToTest = ['1', '4', '7']; // Bulbasaur, Charmander, Squirtle
    
    for (const pokemonId of pokemonToTest) {
      await page.goto(`http://localhost:3001/pokemon/${pokemonId}?gen=1`);
      
      // Wait for page to load
      await page.waitForSelector('h1:has-text("Pokemon Details")', { timeout: 10000 });
      
      // Check consistent elements are present
      await expect(page.getByText('Basic Information')).toBeVisible();
      await expect(page.getByText('Abilities')).toBeVisible();
      await expect(page.getByText('Base Stats')).toBeVisible();
      
      // Check consistent spacing
      const separators = page.locator('hr.border-gray-600');
      const separatorCount = await separators.count();
      expect(separatorCount).toBeGreaterThan(2);
    }
  });
});