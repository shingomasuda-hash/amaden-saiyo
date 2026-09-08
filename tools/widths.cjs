const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const out = process.argv[2];
  require('fs').mkdirSync(out, { recursive: true });
  for (const w of [1920, 1440, 1280, 1080, 900, 768, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 760 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    const info = await p.evaluate(() => {
      const q = s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
      return {
        client: document.documentElement.clientWidth,
        scrollW: document.documentElement.scrollWidth,
        logo: q('header a img'),
        cta: q('header nav'),
        fvPhoto: q('[class*=Hero_photo__]'),
        headline: q('[class*=Hero_xl1__]'),
        lg: q('[class*=Hero_lg__]'),
        coil: q('[class*=Hero_coil__]'),
      };
    });
    console.log(`w=${w}`, JSON.stringify(info));
    await p.screenshot({ path: `${out}/top_${w}.png`, clip: { x: 0, y: 0, width: w, height: 760 } });
    await ctx.close();
  }
  await b.close();
})();
