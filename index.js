'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://unbouncepages.com/the-heros-journal-apexure/');
  await page.screenshot({path: 'reference_image1.png'});
  await browser.close();
})();