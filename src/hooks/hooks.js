const { Before, After, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(30000);

Before(async function () {
  await this.init();
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
});

After(async function ({ result }) {
  await this.cleanup();
});
