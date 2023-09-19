import { expect, test } from '@playwright/test';

test('should render all books images', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('listitem')).toHaveCount(13);
});
