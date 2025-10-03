import { test, expect } from '@playwright/test'

test.describe('Preparation Tracker', () => {
  test('should load the dashboard page', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page).toHaveTitle(/Preparation Tracker/)
    await expect(page.locator('h1')).toContainText('Good')
  })

  test('should navigate to DSA page', async ({ page }) => {
    await page.goto('/dashboard')
    
    await page.click('text=DSA Problems')
    await expect(page).toHaveURL('/dsa')
    await expect(page.locator('h1')).toContainText('DSA Problems')
  })

  test('should navigate to Frontend page', async ({ page }) => {
    await page.goto('/dashboard')
    
    await page.click('text=Frontend')
    await expect(page).toHaveURL('/frontend')
    await expect(page.locator('h1')).toContainText('Frontend Development')
  })

  test('should navigate to System Design page', async ({ page }) => {
    await page.goto('/dashboard')
    
    await page.click('text=System Design')
    await expect(page).toHaveURL('/system-design')
    await expect(page.locator('h1')).toContainText('System Design')
  })

  test('should open command palette with Ctrl+K', async ({ page }) => {
    await page.goto('/dashboard')
    
    await page.keyboard.press('Control+k')
    await expect(page.locator('[cmdk-dialog]')).toBeVisible()
  })
})
