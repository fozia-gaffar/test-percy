const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const fs = require('fs');
async function captureFullPageScreenshot(url, outputPath) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await autoScroll(page); // Scroll to the bottom of the page to load all images
    const bodyHandle = await page.$('body');
    const { width, height } = await bodyHandle.boundingBox();
    await page.setViewport({ width: Math.ceil(width), height: Math.ceil(height) });
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(outputPath, screenshot);
    await browser.close();
    console.log('Full-page screenshot captured successfully!');
  } catch (error) {
    console.error('An error occurred while capturing the full-page screenshot:', error);
  }
}
// Helper function to scroll to the bottom of the page
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
// Example usage:
const url = 'http://unbouncepages.com/the-heros-journal-apexure/';
const outputPath = 'screenshot.png';
captureFullPageScreenshot(url, outputPath)
  .catch(error => {
    console.error('Failed to capture the full-page screenshot:', error);
  });