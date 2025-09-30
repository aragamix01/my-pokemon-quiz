import { test, expect } from '@playwright/test';

test.describe('Pokemon Stats Radar Chart', () => {
  test('should display radar chart and total stats summary', async ({ page }) => {
    // Navigate directly to Pokemon detail page
    await page.goto('http://localhost:3001/pokemon/1?gen=1');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Wait for the radar chart component to be visible
    await page.waitForSelector('text=Base Stats Radar', { timeout: 10000 });
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'test-results/radar-chart-pokemon-1.png', fullPage: true });
    
    // Check that the radar chart section exists
    await expect(page.getByText('Base Stats Radar')).toBeVisible();
    
    // Check that total stats section exists
    await expect(page.getByText('Total Stats:', { exact: false })).toBeVisible();
    
    // Verify the quality indicator is shown
    const qualityIndicators = ['Legendary', 'Excellent', 'Great', 'Good', 'Average', 'Below Average'];
    let foundQuality = false;
    
    for (const quality of qualityIndicators) {
      if (await page.getByText(quality).isVisible()) {
        foundQuality = true;
        break;
      }
    }
    
    expect(foundQuality).toBe(true);
    
    // Check that individual stats are displayed in the summary table
    await expect(page.getByText('hp:', { exact: false })).toBeVisible();
    await expect(page.getByText('attack:', { exact: false })).toBeVisible();
    
    console.log('✅ Radar chart and total stats summary are working correctly');
  });
  
  test('should work with different Pokemon', async ({ page }) => {
    // Test with a different Pokemon (Charizard)
    await page.goto('http://localhost:3001/pokemon/6?gen=1');
    await page.waitForLoadState('networkidle');
    
    // Wait for radar chart
    await page.waitForSelector('text=Base Stats Radar', { timeout: 10000 });
    
    // Take screenshot for comparison
    await page.screenshot({ path: 'test-results/radar-chart-pokemon-6.png', fullPage: true });
    
    // Verify components are present
    await expect(page.getByText('Base Stats Radar')).toBeVisible();
    await expect(page.getByText('Total Stats:', { exact: false })).toBeVisible();
    
    console.log('✅ Radar chart works with different Pokemon');
  });
  
  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('http://localhost:3001/pokemon/1?gen=1');
      await page.waitForLoadState('networkidle');
      
      // Wait for radar chart on mobile
      await page.waitForSelector('text=Base Stats Radar', { timeout: 10000 });
      
      // Take mobile screenshot
      await page.screenshot({ path: 'test-results/radar-chart-mobile.png', fullPage: true });
      
      // Verify mobile layout
      await expect(page.getByText('Base Stats Radar')).toBeVisible();
      await expect(page.getByText('Total Stats:', { exact: false })).toBeVisible();
      
      console.log('✅ Radar chart is responsive on mobile');
    }
  });
});