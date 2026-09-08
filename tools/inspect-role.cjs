const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await b.newContext({ viewport: { width: 1080, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const items = [...document.querySelectorAll('[class*=SalesRole_item__]')];
    return items.map((it, idx) => {
      const g = (sel) => {
        const e = sel ? it.querySelector(sel) : it;
        if (!e) return null;
        const b = e.getBoundingClientRect(); const cs = getComputedStyle(e);
        return {
          box: [Math.round(b.x), Math.round(b.y + scrollY), Math.round(b.width), Math.round(b.height)],
          pos: cs.position, z: cs.zIndex, of: cs.overflow, isolation: cs.isolation, transform: cs.transform, filter: cs.filter, mixBlend: cs.mixBlendMode, will: cs.willChange, opacity: cs.opacity,
        };
      };
      return { idx, item: g(null), no: g('[class*=SalesRole_no__]'), visual: g('[class*=SalesRole_visual__]'), img: g('[class*=SalesRole_visual__] img:not([class*=_sp__])') };
    });
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
