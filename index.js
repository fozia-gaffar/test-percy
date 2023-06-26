'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 }); // Set the viewport size for a laptop screen
  await page.goto('http://unbouncepages.com/the-heros-journal-apexure/');
  await page.screenshot({ path: 'full_img.png', fullPage: true });
  await browser.close();
})();
