import { test, expect } from '@playwright/test';

test('Проверка отображения элементов навигации хедера', async ({ page }) => {
  await page.goto('http://users.bugred.ru/');
  await expect.soft(page.getByRole('link', { name: 'Пользователи' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Войти' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Посмотреть' }).first()).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Users' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'О проекте' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Полная документация' })).toBeVisible();
});
test('Проверка названий элементов навигации хедера', async ({ page }) => {
  await page.goto('http://users.bugred.ru/');
  await expect.soft(page.getByRole('link', { name: 'Users' })).toContainText('Users');
  await expect
    .soft(page.locator('#main-menu > ul > li:nth-child(1) > a > span'))
    .toContainText('Пользователи');
  await expect
    .soft(page.locator('#main-menu > ul > li:nth-child(2) > a > span'))
    .toContainText('Войти');
  await expect
    .soft(
      page.locator(
        'body > div.navbar.navbar-inverse.navbar-fixed-top > div > p > ins:nth-child(2) > a',
      ),
    )
    .toContainText('О проекте');
  await expect
    .soft(
      page.locator(
        'body > div.navbar.navbar-inverse.navbar-fixed-top > div > p > ins:nth-child(3) > a',
      ),
    )
    .toContainText('Полная документация');
  await expect
    .soft(
      page.locator('body > div.content > table > tbody > tr:nth-child(1) > td:nth-child(7) > a'),
    )
    .toContainText('Посмотреть');
});
test('Проверка Атрибутов hrev навигации хедера', async ({ page }) => {
  await page.goto('http://users.bugred.ru/');
  await expect.soft(page.getByRole('link', { name: 'Пользователи' })).toHaveAttribute('href', '/');
  await expect
    .soft(page.getByRole('link', { name: 'Войти' }))
    .toHaveAttribute('href', '/user/login/index.html');
  await expect
    .soft(page.getByRole('link', { name: 'Users' }))
    .toHaveAttribute('href', 'http://users.bugred.ru/');
  await expect
    .soft(page.getByRole('link', { name: 'О проекте' }))
    .toHaveAttribute('href', 'https://okiseleva.blogspot.com/2017/04/users-soap-rest.html');
  await expect
    .soft(page.getByRole('link', { name: 'Полная документация' }))
    .toHaveAttribute('href', 'https://testbase.atlassian.net/wiki/spaces/USERS/overview');
});
test('Проверка переключения light mode', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('Проверка заголовка страниц', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect
    .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
    .toBeVisible();
  await expect
    .soft(page.locator('h1'))
    .toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.',
    );
});

test('Проверка кнопки Get started', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
  await expect
    .soft(page.getByRole('link', { name: 'Get started' }))
    .toHaveAttribute('href', '/docs/intro');
});
