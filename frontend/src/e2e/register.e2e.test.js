import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('Registration and login flow', () => {
  let browser;
  let page;
  const username = `username_${(new Date()).getTime()}`;
  const password = 'Password*123';

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should register a new user', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#register__btn');
    await page.click('#register__btn');
    await page.waitForSelector('[data-testid="RegisterForm"]');

    await page.click('input[name=username]');
    await page.type('input[name=username]', username);

    await page.click('input[name=email]');
    await page.type('input[name=email]', 'mail@email.com');

    await page.click('input[name=password]');
    await page.type('input[name=password]', password);

    await page.click('input[name=passwordConfirmation]');
    await page.type('input[name=passwordConfirmation]', password);

    const isDisabled = await page.$('[data-testid="RegisterButton"][disabled]') !== null;

    expect(isDisabled).toBeFalsy();

    await page.click('[data-testid="RegisterButton"]');
    await page.waitForSelector('[data-testid="LoginForm"]');
  });

  describe('Login after registering a user', () => {
    it('it should login with new created user', async () => {
      await page.goto('http://localhost:3000');
      await page.waitForSelector('#register__btn');

      await page.click('input[name=username]');
      await page.type('input[name=username]', username);

      await page.click('input[name=password]');
      await page.type('input[name=password]', password);

      await page.click('#login__btn');
      await page.waitForSelector('#page__title');

      const text = await page.$eval('#page__title', (e) => e.textContent);
      expect(text).toContain('Donit');
    });
  });

  afterAll(() => browser.close());
});
