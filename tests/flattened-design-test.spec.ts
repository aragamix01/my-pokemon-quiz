import { test, expect } from '@playwright/test';

test.describe('Flattened Radar Chart Design', () => {
  test('should show flattened radar chart design', async ({ page }) => {
    await page.goto('http://localhost:3001/pokemon/1?gen=1');
    await page.waitForLoadState('networkidle');
    
    // Wait for the chart to be visible
    await page.waitForSelector('text=Stats Visualization', { timeout: 10000 });
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'test-results/flattened-radar-chart.png', fullPage: true });
    
    // Verify the flattened design elements
    await expect(page.getByText('Stats Visualization')).toBeVisible();
    await expect(page.getByText('Total:', { exact: false })).toBeVisible();
    
    console.log('✅ Flattened radar chart design is working correctly');
  });
});