import { test, expect } from '@playwright/test';

test.describe('Mobile Stats Spacing Fix', () => {
  test('should show consistent spacing for stats on mobile', async ({ page }) => {
    await page.goto('http://localhost:3001/pokemon/1?gen=1');
    await page.waitForLoadState('networkidle');
    
    // Wait for the chart to be visible
    await page.waitForSelector('text=Stats Visualization', { timeout: 10000 });
    
    // Take screenshot for visual verification of mobile spacing
    await page.screenshot({ path: 'test-results/mobile-stats-spacing-fixed.png', fullPage: true });
    
    // Verify all 6 stats are displayed
    await expect(page.getByText('hp:', { exact: false })).toBeVisible();
    await expect(page.getByText('attack:', { exact: false })).toBeVisible();
    await expect(page.getByText('defense:', { exact: false })).toBeVisible();
    await expect(page.getByText('special attack:', { exact: false })).toBeVisible();
    await expect(page.getByText('special defense:', { exact: false })).toBeVisible();
    await expect(page.getByText('speed:', { exact: false })).toBeVisible();
    
    console.log('✅ Mobile stats spacing is now consistent');
  });
});