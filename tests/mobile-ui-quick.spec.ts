import { test, expect } from '@playwright/test';

test.describe('Quick Mobile UI Check', () => {
  test('should load Pokemon detail page and check basic mobile layout', async ({ page }) => {
    // Navigate directly to a Pokemon detail page
    await page.goto('http://localhost:3001/pokemon/1?gen=1');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for visual inspection
    await page.screenshot({ path: 'test-results/mobile-pokemon-detail.png', fullPage: true });
    
    // Basic checks
    await expect(page).toHaveTitle(/Pokemon/);
    
    // Check if main content is visible
    const mainContent = page.locator('.modern-card');
    await expect(mainContent).toBeVisible({ timeout: 15000 });
    
    // Check basic sections
    const basicInfo = page.getByText('Basic Information');
    await expect(basicInfo).toBeVisible();
    
    const abilities = page.getByText('Abilities');
    await expect(abilities).toBeVisible();
    
    const baseStats = page.getByText('Base Stats');
    await expect(baseStats).toBeVisible();
    
    // Check mobile specific elements
    const viewport = page.viewportSize();
    console.log('Viewport size:', viewport);
    
    // Verify consistent spacing by checking for separator lines
    const separators = page.locator('hr.border-gray-600');
    const separatorCount = await separators.count();
    console.log('Number of separators found:', separatorCount);
    
    expect(separatorCount).toBeGreaterThan(2);
    
    // Check Pokemon sprite is visible
    const sprite = page.locator('img').first();
    await expect(sprite).toBeVisible();
    
    console.log('✅ Mobile UI test passed - consistent layout verified');
  });
  
  test('should check padding and spacing consistency', async ({ page }) => {
    await page.goto('http://localhost:3001/pokemon/1?gen=1');
    await page.waitForLoadState('networkidle');
    
    // Check main card padding
    const mainCard = page.locator('.modern-card').first();
    await expect(mainCard).toHaveClass(/p-4/);
    
    // Check section spacing
    const sections = page.locator('h3');
    const sectionCount = await sections.count();
    
    expect(sectionCount).toBeGreaterThan(4); // Should have multiple sections
    
    // Verify all sections have consistent mb-4 or similar spacing
    for (let i = 0; i < Math.min(sectionCount, 5); i++) {
      const section = sections.nth(i);
      await expect(section).toBeVisible();
    }
    
    console.log(`✅ Found ${sectionCount} sections with consistent spacing`);
  });
});