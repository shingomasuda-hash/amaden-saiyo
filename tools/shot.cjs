const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const out = process.argv[2] || '/tmp/shots';
  const fs = require('fs');
  fs.mkdirSync(out, { recursive: true });
  for (const [name, width, dsf] of [['pc', 1080, 2], ['sp', 375, 1.4987]]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: dsf });
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
    await page.evaluate(() => new Promise(r => { window.scrollTo(0, document.body.scrollHeight); setTimeout(r, 1200); }));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const h1 = await page.evaluate(() => document.body.scrollHeight);
    await page.screenshot({ path: `${out}/${name}_closed.png`, fullPage: true, clip: { x: 0, y: 0, width, height: h1 } });
    await page.evaluate(() => {
      document.querySelectorAll('button[aria-expanded="false"]').forEach(b => b.click());
    });
    await page.waitForTimeout(600);
    const h2 = await page.evaluate(() => document.body.scrollHeight);
    await page.screenshot({ path: `${out}/${name}_open.png`, fullPage: true, clip: { x: 0, y: 0, width, height: h2 } });
    await ctx.close();
  }
  await browser.close();
})();
