import { test, expect, Page } from '@playwright/test';

/**
 * Все локаторы страницы собраны в одну константу.
 * Каждый локатор хранит:
 *   - name  — человекочитаемое имя (используется в test.step и названии теста)
 *   - locator — функция, возвращающая Playwright-локатор
 */
const Elements = {
  // ===== Навигация хедера (users.bugred.ru) =====
  navLinkUsers: {
    name: 'Пользователи',
    locator: (page: Page) => page.getByRole('link', { name: 'Пользователи' }),
  },
  navLinkLogin: {
    name: 'Войти',
    locator: (page: Page) => page.getByRole('link', { name: 'Войти' }),
  },
  navLinkWatch: {
    name: 'Посмотреть',
    locator: (page: Page) => page.getByRole('link', { name: 'Посмотреть' }).first(),
  },
  navLinkUsersEn: {
    name: 'Users',
    locator: (page: Page) => page.getByRole('link', { name: 'Users' }),
  },
  navLinkAbout: {
    name: 'О проекте',
    locator: (page: Page) => page.getByRole('link', { name: 'О проекте' }),
  },
  navLinkFullDocs: {
    name: 'Полная документация',
    locator: (page: Page) => page.getByRole('link', { name: 'Полная документация' }),
  },

  // ===== Текстовые элементы меню (по CSS) =====
  menuItemUsers: {
    name: 'Пользователи (пункт меню)',
    locator: (page: Page) => page.locator('#main-menu > ul > li:nth-child(1) > a > span'),
  },
  menuItemLogin: {
    name: 'Войти (пункт меню)',
    locator: (page: Page) => page.locator('#main-menu > ul > li:nth-child(2) > a > span'),
  },
  menuItemAbout: {
    name: 'О проекте (пункт меню)',
    locator: (page: Page) =>
      page.locator(
        'body > div.navbar.navbar-inverse.navbar-fixed-top > div > p > ins:nth-child(2) > a',
      ),
  },
  menuItemFullDocs: {
    name: 'Полная документация (пункт меню)',
    locator: (page: Page) =>
      page.locator(
        'body > div.navbar.navbar-inverse.navbar-fixed-top > div > p > ins:nth-child(3) > a',
      ),
  },
  menuItemWatch: {
    name: 'Посмотреть (пункт меню)',
    locator: (page: Page) =>
      page.locator('body > div.content > table > tbody > tr:nth-child(1) > td:nth-child(7) > a'),
  },

  // ===== Playwright.dev =====
  themeToggleButton: {
    name: 'Кнопка переключения темы',
    locator: (page: Page) => page.getByRole('button', { name: 'Switch between dark and light' }),
  },
  htmlRoot: {
    name: 'Корневой тег html',
    locator: (page: Page) => page.locator('html'),
  },
  headingMain: {
    name: 'Заголовок "Playwright enables reliable"',
    locator: (page: Page) => page.getByRole('heading', { name: 'Playwright enables reliable' }),
  },
  headingH1: {
    name: 'Заголовок h1',
    locator: (page: Page) => page.locator('h1'),
  },
  linkGetStarted: {
    name: 'Get started',
    locator: (page: Page) => page.getByRole('link', { name: 'Get started' }),
  },
};

// ===== Вспомогательные функции =====

/** Возвращает локатор элемента */
const el = (element: { locator: (page: Page) => any }, page: Page) => element.locator(page);

/** Возвращает человекочитаемое имя элемента */
const name = (element: { name: string }) => element.name;

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://users.bugred.ru/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    const links = [
      Elements.navLinkUsers,
      Elements.navLinkLogin,
      Elements.navLinkWatch,
      Elements.navLinkUsersEn,
      Elements.navLinkAbout,
      Elements.navLinkFullDocs,
    ];

    for (const link of links) {
      await test.step(`Проверка отображения элемента "${name(link)}"`, async () => {
        await expect.soft(el(link, page)).toBeVisible();
      });
    }
  });

  test('Проверка названий элементов навигации хедера', async ({ page }) => {
    const items: Array<{ element: typeof Elements.navLinkUsers; text: string }> = [
      { element: Elements.navLinkUsersEn, text: 'Users' },
      { element: Elements.menuItemUsers, text: 'Пользователи' },
      { element: Elements.menuItemLogin, text: 'Войти' },
      { element: Elements.menuItemAbout, text: 'О проекте' },
      { element: Elements.menuItemFullDocs, text: 'Полная документация' },
      { element: Elements.menuItemWatch, text: 'Посмотреть' },
    ];

    for (const { element, text } of items) {
      await test.step(`Проверка текста пункта "${name(element)}"`, async () => {
        await expect.soft(el(element, page)).toContainText(text);
      });
    }
  });

  test('Проверка атрибутов href навигации хедера', async ({ page }) => {
    const items: Array<{ element: typeof Elements.navLinkUsers; href: string }> = [
      { element: Elements.navLinkUsers, href: '/' },
      { element: Elements.navLinkLogin, href: '/user/login/index.html' },
      { element: Elements.navLinkUsersEn, href: 'http://users.bugred.ru/' },
      {
        element: Elements.navLinkAbout,
        href: 'https://okiseleva.blogspot.com/2017/04/users-soap-rest.html',
      },
      {
        element: Elements.navLinkFullDocs,
        href: 'https://testbase.atlassian.net/wiki/spaces/USERS/overview',
      },
    ];

    for (const { element, href } of items) {
      await test.step(`Проверка href ссылки "${name(element)}"`, async () => {
        await expect.soft(el(element, page)).toHaveAttribute('href', href);
      });
    }
  });

  test('Проверка переключения light mode', async ({ page }) => {
    await test.step(`Открыть главную страницу Playwright`, async () => {
      await page.goto('https://playwright.dev/');
    });
    await test.step(`Переключить на светлую тему (${name(Elements.themeToggleButton)})`, async () => {
      await el(Elements.themeToggleButton, page).click();
      await expect.soft(el(Elements.htmlRoot, page)).toHaveAttribute('data-theme', 'light');
    });
    await test.step(`Переключить обратно на тёмную тему (${name(Elements.themeToggleButton)})`, async () => {
      await el(Elements.themeToggleButton, page).click();
      await expect.soft(el(Elements.htmlRoot, page)).toHaveAttribute('data-theme', 'dark');
    });
  });

  test('Проверка заголовка страниц', async ({ page }) => {
    await test.step('Открыть главную страницу Playwright', async () => {
      await page.goto('https://playwright.dev/');
    });
    await test.step(`Проверить видимость заголовка "${name(Elements.headingMain)}"`, async () => {
      await expect.soft(el(Elements.headingMain, page)).toBeVisible();
    });
    await test.step(`Проверить текст заголовка "${name(Elements.headingH1)}"`, async () => {
      await expect
        .soft(el(Elements.headingH1, page))
        .toContainText(
          'Playwright enables reliable web automation for testing, scripting, and AI agents.',
        );
    });
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    await test.step('Открыть главную страницу Playwright', async () => {
      await page.goto('https://playwright.dev/');
    });
    await test.step(`Проверить видимость кнопки "${name(Elements.linkGetStarted)}"`, async () => {
      await expect.soft(el(Elements.linkGetStarted, page)).toBeVisible();
    });
    await test.step(`Проверить текст кнопки "${name(Elements.linkGetStarted)}"`, async () => {
      await expect.soft(el(Elements.linkGetStarted, page)).toContainText('Get started');
    });
    await test.step(`Проверить атрибут href кнопки "${name(Elements.linkGetStarted)}"`, async () => {
      await expect.soft(el(Elements.linkGetStarted, page)).toHaveAttribute('href', '/docs/intro');
    });
  });
});
