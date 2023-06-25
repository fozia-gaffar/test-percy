const puppeteer = require('puppeteer');

async function captureSnapshot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const snapshot = await page.content();
  await browser.close();
  return snapshot;
}
module.exports = {
  captureSnapshot   
};


