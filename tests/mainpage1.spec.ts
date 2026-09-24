import { test, expect } from '@playwright/test';

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://users.bugred.ru/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    await test.step('Проверка отображения элемента "Пользователи"', async () => {
      await expect.soft(page.getByRole('link', { name: 'Пользователи' })).toBeVisible();
    });
    await test.step('Проверка отображения элемента "Войти"', async () => {
      await expect.soft(page.getByRole('link', { name: 'Войти' })).toBeVisible();
    });
    await test.step('Проверка отображения элемента "Посмотреть"', async () => {
      await expect.soft(page.getByRole('link', { name: 'Посмотреть' }).first()).toBeVisible();
    });
    await test.step('Проверка отображения элемента "Users"', async () => {
      await expect.soft(page.getByRole('link', { name: 'Users' })).toBeVisible();
    });
    await test.step('Проверка отображения элемента "О проекте"', async () => {
      await expect.soft(page.getByRole('link', { name: 'О проекте' })).toBeVisible();
    });
    await test.step('Проверка отображения элемента "Полная документация"', async () => {
      await expect.soft(page.getByRole('link', { name: 'Полная документация' })).toBeVisible();
    });
  });

  test('Проверка названий элементов навигации хедера', async ({ page }) => {
    await test.step('Проверка текста ссылки "Users"', async () => {
      await expect.soft(page.getByRole('link', { name: 'Users' })).toContainText('Users');
    });
    await test.step('Проверка текста пункта "Пользователи"', async () => {
      await expect
        .soft(page.locator('#main-menu > ul > li:nth-child(1) > a > span'))
        .toContainText('Пользователи');
    });
    await test.step('Проверка текста пункта "Войти"', async () => {
      await expect
        .soft(page.locator('#main-menu > ul > li:nth-child(2) > a > span'))
        .toContainText('Войти');
    });
    await test.step('Проверка текста пункта "О проекте"', async () => {
      await expect
        .soft(
          page.locator(
            'body > div.navbar.navbar-inverse.navbar-fixed-top > div > p > ins:nth-child(2) > a',
          ),
        )
        .toContainText('О проекте');
    });
    await test.step('Проверка текста пункта "Полная документация"', async () => {
      await expect
        .soft(
          page.locator(
            'body > div.navbar.navbar-inverse.navbar-fixed-top > div > p > ins:nth-child(3) > a',
          ),
        )
        .toContainText('Полная документация');
    });
    await test.step('Проверка текста пункта "Посмотреть"', async () => {
      await expect
        .soft(
          page.locator(
            'body > div.content > table > tbody > tr:nth-child(1) > td:nth-child(7) > a',
          ),
        )
        .toContainText('Посмотреть');
    });
  });

  test('Проверка Атрибутов href навигации хедера', async ({ page }) => {
    await test.step('Проверка href ссылки "Пользователи"', async () => {
      await expect
        .soft(page.getByRole('link', { name: 'Пользователи' }))
        .toHaveAttribute('href', '/');
    });
    await test.step('Проверка href ссылки "Войти"', async () => {
      await expect
        .soft(page.getByRole('link', { name: 'Войти' }))
        .toHaveAttribute('href', '/user/login/index.html');
    });
    await test.step('Проверка href ссылки "Users"', async () => {
      await expect
        .soft(page.getByRole('link', { name: 'Users' }))
        .toHaveAttribute('href', 'http://users.bugred.ru/');
    });
    await test.step('Проверка href ссылки "О проекте"', async () => {
      await expect
        .soft(page.getByRole('link', { name: 'О проекте' }))
        .toHaveAttribute('href', 'https://okiseleva.blogspot.com/2017/04/users-soap-rest.html');
    });
    await test.step('Проверка href ссылки "Полная документация"', async () => {
      await expect
        .soft(page.getByRole('link', { name: 'Полная документация' }))
        .toHaveAttribute('href', 'https://testbase.atlassian.net/wiki/spaces/USERS/overview');
    });
  });

  test('Проверка переключения light mode', async ({ page }) => {
    await test.step('Открыть главную страницу Playwright', async () => {
      await page.goto('https://playwright.dev/');
    });
    await test.step('Переключить на светлую тему', async () => {
      await page.getByRole('button', { name: 'Switch between dark and light' }).click();
      await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
    });
    await test.step('Переключить обратно на тёмную тему', async () => {
      await page.getByRole('button', { name: 'Switch between dark and light' }).click();
      await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });

  test('Проверка заголовка страниц', async ({ page }) => {
    await test.step('Открыть главную страницу Playwright', async () => {
      await page.goto('https://playwright.dev/');
    });
    await test.step('Проверить видимость заголовка', async () => {
      await expect
        .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
        .toBeVisible();
    });
    await test.step('Проверить текст заголовка h1', async () => {
      await expect
        .soft(page.locator('h1'))
        .toContainText(
          'Playwright enables reliable web automation for testing, scripting, and AI agents.',
        );
    });
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    await test.step('Открыть главную страницу Playwright', async () => {
      await page.goto('https://playwright.dev/');
    });
    await test.step('Проверить видимость кнопки "Get started"', async () => {
      await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    });
    await test.step('Проверить текст кнопки "Get started"', async () => {
      await expect
        .soft(page.getByRole('link', { name: 'Get started' }))
        .toContainText('Get started');
    });
    await test.step('Проверить атрибут href кнопки "Get started"', async () => {
      await expect
        .soft(page.getByRole('link', { name: 'Get started' }))
        .toHaveAttribute('href', '/docs/intro');
    });
  });
});
