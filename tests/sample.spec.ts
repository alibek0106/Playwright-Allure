import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Sample test to see allure report', () => {

    test.beforeEach('Navigation', async ({ page }) => {
        await test.step('Navigation to login form', async () => {
            await page.goto('https://the-internet.herokuapp.com/');
            const loginLink = page.getByText('Form Authentication');
            await loginLink.click();
            await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
        });
    })
    test('The internet login form test - Wrong password', async ({ page }) => {
        await allure.feature('UI Login form');
        await allure.story('Login with wrong password');
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
        await allure.feature('UI Login form');
        await allure.story('Login with empty inputs');
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
        await allure.feature('UI Login form');
        await allure.story('Login with correct credentials');
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
        test.fail();
        await allure.feature('UI Login form');
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

    test.skip('Skipped test', async () => {
        await allure.feature('UI Login form');
    });

    test('The internet login form test - Broken status on purpose', async ({ page }) => {
        test.setTimeout(2000);
        await allure.feature('UI Login form');
        await test.step('Fill out login form', async () => {
            // Purposefully wrong locators
            const usernameField = page.locator('#falseElement');
            const passwordField = page.locator('#falseElement');
            await usernameField.fill('');
            await passwordField.fill('');
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('Verify login message', async () => {
            const flashMessage = page.locator('#flash');
            await expect(flashMessage).toContainText('Your username is invalid!');
        });
    });
});