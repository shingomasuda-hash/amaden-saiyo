const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const w of [1080, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    await p.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
    const res = await p.evaluate((vw) => {
      const out = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 0) out.push(`${el.tagName}.${el.className}`.slice(0,90) + ` right=${Math.round(r.right)} w=${Math.round(r.width)}`);
      });
      return { docW: document.documentElement.scrollWidth, list: out.slice(0, 14) };
    }, w);
    console.log(`=== viewport ${w} === scrollWidth=${res.docW}`);
    res.list.forEach(l => console.log('   ', l));
    await ctx.close();
  }
  await b.close();
})();
