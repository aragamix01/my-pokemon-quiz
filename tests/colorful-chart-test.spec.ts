import { test, expect } from '@playwright/test';

test.describe('Colorful Dynamic Radar Chart', () => {
  test('should show colorful radar chart with dynamic scaling', async ({ page }) => {
    await page.goto('http://localhost:3001/pokemon/1?gen=1');
    await page.waitForLoadState('networkidle');
    
    // Wait for the chart to be visible
    await page.waitForSelector('text=Stats Visualization', { timeout: 10000 });
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'test-results/colorful-radar-chart-bulbasaur.png', fullPage: true });
    
    // Verify the dynamic scaling info is shown
    await expect(page.getByText('Scaled to max stat:', { exact: false })).toBeVisible();
    
    console.log('✅ Colorful dynamic radar chart working for Bulbasaur');
  });
  
  test('should test with a high-stat Pokemon', async ({ page }) => {
    // Test with a legendary Pokemon that should have higher stats
    await page.goto('http://localhost:3001/pokemon/150?gen=1'); // Mewtwo
    await page.waitForLoadState('networkidle');
    
    // Wait for chart
    await page.waitForSelector('text=Stats Visualization', { timeout: 10000 });
    
    // Take screenshot for comparison
    await page.screenshot({ path: 'test-results/colorful-radar-chart-mewtwo.png', fullPage: true });
    
    // Verify scaling info
    await expect(page.getByText('Scaled to max stat:', { exact: false })).toBeVisible();
    
    console.log('✅ Colorful dynamic radar chart working for high-stat Pokemon');
  });
  
  test('should test with a low-stat Pokemon', async ({ page }) => {
    // Test with a Pokemon that has lower stats
    await page.goto('http://localhost:3001/pokemon/10?gen=1'); // Caterpie
    await page.waitForLoadState('networkidle');
    
    // Wait for chart
    await page.waitForSelector('text=Stats Visualization', { timeout: 10000 });
    
    // Take screenshot for comparison
    await page.screenshot({ path: 'test-results/colorful-radar-chart-caterpie.png', fullPage: true });
    
    // Verify scaling info
    await expect(page.getByText('Scaled to max stat:', { exact: false })).toBeVisible();
    
    console.log('✅ Colorful dynamic radar chart working for low-stat Pokemon');
  });
});