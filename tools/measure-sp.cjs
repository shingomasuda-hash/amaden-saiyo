const { chromium } = require('playwright');
// 期待値: SP 完成デザイン(実測 image px) ÷ 1.4987、左端 x=6 を 0 とした CSS px
const SP = [
  ['header',        'header',                              {x:0,y:0,w:375,h:90.1}],
  ['logo mark',     'header a img',                        {x:12,y:30,w:74.7,h:18.7}],
  ['cta group',     'header nav',                          {x:139.4,y:20,w:222.9,h:48.1}],
  ['hero',          '[class*=Hero_hero__]',                {x:0,y:90.1,w:375,h:573.8}],
  ['hero photo',    '[class*=Hero_photoSp__]',             {x:20,y:90.7,w:355,h:573.2}],
  ['sub heading',   '[class*=JobIntro_heading__]',         {x:'',y:663.9,w:'',h:178.8}],
  ['job photo',     '[class*=JobIntro_photoSp__]',         {x:0,y:842.7,w:375,h:178.2}],
  ['job point1',    '[class*=JobIntro_point__]',           {x:0,y:1020.9,w:326.3,h:62.7}],
  ['want lead',     '[class*=WantedSection_lead__]',       {x:22,y:1380.5,w:'',h:''}],
  ['want badge',    '[class*=WantedSection_wantBadge__]',  {x:20,y:1623.4,w:110.1,h:55.4}],
  ['want stage',    '[class*=WantedSection_stage__]',      {x:'',y:1699.4,w:'',h:''}],
  ['benefits',      '[class*=Benefits_section__]',         {x:0,y:2262,w:375,h:1209.7}],
  ['ben head',      '[class*=Benefits_section__] h2',      {x:22,y:2322.3,w:'',h:''}],
  ['ben card1 body','[class*=Benefits_cardBody__]',        {x:20,y:2570.5,w:334.3,h:196.2}],
  ['entry cta',     '[class*=EntryCta_section__]',         {x:0,y:3472.3,w:375,h:335.7}],
  ['entry apply',   '[class*=EntryCta_apply__]',           {x:32.7,y:3615.9,w:309.6,h:65.4}],
  ['entry visit',   '[class*=EntryCta_visit__]',           {x:32.7,y:3702,w:309.6,h:65.4}],
  ['stories',       '[class*=EmployeeStories_section__]',  {x:0,y:3808.6,w:375,h:1477.3}],
  ['story head',    '[class*=EmployeeStories_headBlock__]',{x:0,y:3808.6,w:236.9,h:123.4}],
  ['itv1 photo',    '[class*=EmployeeStories_photo1__]',   {x:12,y:3936,w:'',h:''}],
  ['story button',  '[class*=EmployeeStories_moreBtn__]',  {x:23.4,y:5180,w:327,h:64.7}],
  ['career',        '[class*=Career_section__]',           {x:0,y:5285.9,w:375,h:1043.6}],
  ['role',          '[class*=SalesRole_section__]',        {x:0,y:6330.8,w:375,h:1250}],
  ['matching',      '[class*=Matching_section__]',         {x:0,y:7580.8,w:375,h:584.3}],
  ['charm',         '[class*=Attraction_section__]',       {x:0,y:8210.4,w:375,h:1248.5}],
  ['company',       '[class*=Company_section__]',          {x:0,y:9458.9,w:375,h:567.8}],
  ['req',           '[class*=JobDescription_section__]',   {x:0,y:10030,w:375,h:1476.3}],
  ['faq',           '[class*=Faq_section__]',              {x:0,y:11506.3,w:375,h:704.3}],
  ['faq q1',        '[class*=Faq_mark__]',                 {x:20,y:11506.3,w:60.1,h:60.1}],
  ['form',          '[class*=EntryForm_section__]',        {x:0,y:12210.6,w:375,h:1268.4}],
  ['footer',        'footer',                              {x:0,y:13479,w:375,h:458.4}],
];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await b.newContext({ viewport: { width: 375, height: 800 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await p.evaluate(() => new Promise(r => { window.scrollTo(0, document.body.scrollHeight); setTimeout(r, 900); }));
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  console.log('scrollWidth', await p.evaluate(() => document.documentElement.scrollWidth),
              'height', await p.evaluate(() => document.body.scrollHeight), '(design 13937.5)');
  console.log('label            | expect x,y,w,h              | actual                      | Δx    Δy    Δw    Δh');
  for (const [label, sel, e] of SP) {
    const r = await p.evaluate((s) => {
      const el = document.querySelector(s); if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: b.x + window.scrollX, y: b.y + window.scrollY, w: b.width, h: b.height };
    }, sel);
    if (!r) { console.log(`${label.padEnd(17)}| MISSING`); continue; }
    const f = v => (v === '' ? '  -  ' : (Math.round(v*10)/10).toString().padStart(6));
    const d = (a,b2) => (b2 === '' ? '  -  ' : (Math.round((a-b2)*10)/10).toString().padStart(6));
    console.log(`${label.padEnd(17)}|${f(e.x)}${f(e.y)}${f(e.w)}${f(e.h)} |${f(r.x)}${f(r.y)}${f(r.w)}${f(r.h)} |${d(r.x,e.x)}${d(r.y,e.y)}${d(r.w,e.w)}${d(r.h,e.h)}`);
  }
  await b.close();
})();
