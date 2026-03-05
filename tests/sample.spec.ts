import { test, expect } from '@playwright/test';

test.describe('Sample test to see allure report', async () => {

    test.beforeEach('Navigation', async ({ page }) => {
        await test.step('Navigation to login form', async () => {
            await page.goto('https://the-internet.herokuapp.com/');
            const loginLink = page.getByText('Form Authentication');
            await loginLink.click();
            await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
        });
    })
    test('The internet login form test - Wrong password', async ({ page }) => {
        await test.step('Fill out login form', async () => {
            const usernameField = page.getByRole('textbox', { name: 'username' });
            const passwordField = page.getByRole('textbox', { name: 'password' });
            await usernameField.fill('tomsmith');
            await passwordField.fill('WrongPassword!');
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('Verify login message', async () => {
            const flashMessage = page.locator('#flash');
            await expect(flashMessage).toContainText('Your password is invalid!');
        });
    });

    test('The internet login form test - Empty input', async ({ page }) => {
        await test.step('Fill out login form', async () => {
            const usernameField = page.getByRole('textbox', { name: 'username' });
            const passwordField = page.getByRole('textbox', { name: 'password' });
            await usernameField.fill('');
            await passwordField.fill('');
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('Verify login message', async () => {
            const flashMessage = page.locator('#flash');
            await expect(flashMessage).toContainText('Your username is invalid!');
        });
    });

    test('The internet login form test - Happy path', async ({ page }) => {
        await test.step('Fill out login form', async () => {
            const usernameField = page.getByRole('textbox', { name: 'username' });
            const passwordField = page.getByRole('textbox', { name: 'password' });
            await usernameField.fill('tomsmith');
            await passwordField.fill('SuperSecretPassword!');
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('Verify login message', async () => {
            const flashMessage = page.locator('#flash');
            await expect(flashMessage).toContainText('You logged into a secure area!');
        });
    });

    test('The internet login form test - Fail on purpose', async ({ page }) => {
        await test.step('Fill out login form', async () => {
            const usernameField = page.getByRole('textbox', { name: 'username' });
            const passwordField = page.getByRole('textbox', { name: 'password' });
            await usernameField.fill('');
            await passwordField.fill('');
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('Verify login message', async () => {
            const flashMessage = page.locator('#flash');
            await expect(flashMessage).toContainText('You logged into a secure area!');
        });
    });

    test.skip('Skipped test', async () => {});
});