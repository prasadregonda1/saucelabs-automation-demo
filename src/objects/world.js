const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async init() {
    const headless = process.env.HEADLESS === 'true';
    this.browser = await chromium.launch({ headless, slowMo: headless ? 0 : 50 });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
