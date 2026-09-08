const { chromium } = require('playwright');
// [label, selector, expected {x,y,w,h} in CSS px from design (image px / 2)]
const PC = [
  ['header',            'header',                      {x:0,y:0,w:1080,h:79}],
  ['logo mark',         'header a img',                {x:31,y:15.5,w:156,h:39.5}],
  ['CTA visit',         'header nav > a:nth-child(1)', {x:597,y:15,w:250,h:49.5}],
  ['CTA apply',         'header nav > a:nth-child(2)', {x:847,y:15,w:202.5,h:49.5}],
  ['FV photo',          '[class*=Hero_photo__]',       {x:30,y:113,w:1050,h:452}],
  ['FV orange',         '[class*=Hero_orange__]',      {x:0,y:355.5,w:1080,h:265.5}],
  ['FV leadBand',       '[class*=Hero_leadBand__]',    {x:30,y:289,w:504.5,h:24.5}],
  ['FV leadText',       '[class*=Hero_leadText__]',    {x:30,y:272.5,w:'',h:''}],
  ['FV xl1 技術',        '[class*=Hero_xl1__]',         {x:135.5,y:358,w:210,h:''}],
  ['FV xl2 顧客',        '[class*=Hero_xl2__]',         {x:342.5,y:433,w:210,h:''}],
  ['FV lg',             '[class*=Hero_lg__]',          {x:597.5,y:457,w:423,h:''}],
  ['FV coil',           '[class*=Hero_coil__]',        {x:30,y:565,w:270,h:185}],
  ['sub heading',       '[class*=JobIntro_heading__]', {x:'',y:735,w:'',h:108}],
  ['job photo',         '[class*=JobIntro_photo__]',   {x:56,y:891,w:746,h:496.5}],
  ['job point1',        '[class*=JobIntro_point__]',   {x:739.5,y:856.5,w:281,h:185}],
  ['job coil',          '[class*=JobIntro_coil__]',    {x:67,y:1388,w:260,h:142}],
  ['want lead',         '[class*=WantedSection_lead__]', {x:56,y:1587,w:'',h:''}],
  ['want badge',        '[class*=WantedSection_wantBadge__]', {x:243,y:1781.5,w:222,h:68}],
  ['want orange',       '[class*=WantedSection_orange__]',    {x:16,y:1867.5,w:1064,h:316}],
  ['want photoL',       '[class*=WantedSection_photoLeft__]', {x:56,y:1846.5,w:241,h:351}],
  ['want bar1',         '[class*=WantedSection_bar__]',       {x:250.5,y:1943.5,w:525,h:28}],
  ['benefits sect',     '[class*=Benefits_section__]',        {x:0,y:2316,w:1080,h:1382.5}],
  ['benefits head',     '[class*=Benefits_section__] h2',     {x:56,y:2379,w:'',h:''}],
  ['ben card1 tab',     '[class*=Benefits_tab__]',            {x:56.5,y:2581,w:393.5,h:64}],
  ['ben card1 body',    '[class*=Benefits_cardBody__]',       {x:56.5,y:2641.5,w:967,h:207}],
  ['ben card2 body',    '[class*=Benefits_card__]:nth-child(2) [class*=cardBody]', {x:56.5,y:2879.5,w:967,h:180}],
  ['ben card3 body',    '[class*=Benefits_card__]:nth-child(3) [class*=cardBody]', {x:56.5,y:3136,w:967,h:242}],
  ['ben card4 body',    '[class*=Benefits_card__]:nth-child(4) [class*=cardBody]', {x:56.5,y:3402,w:967,h:243}],
  ['entry cta',         '[class*=EntryCta_section__]',        {x:0,y:3699,w:1080,h:383}],
  ['entry heading',     '[class*=EntryCta_heading__]',        {x:'',y:3811.5,w:'',h:''}],
  ['entry visit',       '[class*=EntryCta_visit__]',          {x:243,y:3888,w:324.5,h:87.5}],
  ['story block',       '[class*=EmployeeStories_headBlock__]',{x:0,y:4081.5,w:398.5,h:218}],
  ['itv1 photo',        '[class*=EmployeeStories_photo1__]',  {x:56,y:4231,w:539,h:264}],
  ['itv1 bars',         '[class*=EmployeeStories_bars1__]',   {x:505,y:4414.5,w:'',h:100}],
  ['itv2 photo',        '[class*=EmployeeStories_photo2__]',  {x:453.5,y:4710,w:513,h:286}],
  ['story button',      '[class*=EmployeeStories_moreBtn__]', {x:406,y:5296,w:268,h:48}],
  ['career sect',       '[class*=Career_section__]',          {x:0,y:5397,w:1080,h:727.5}],
  ['career head',       '[class*=Career_section__] h2',       {x:56,y:5459.5,w:'',h:''}],
  ['career chart',      '[class*=Career_chart__]',            {x:0,y:5609.5,w:1080,h:461.5}],
  ['role heading',      '[class*=SalesRole_heading__]',       {x:'',y:6183,w:'',h:79}],
  ['role item1',        '[class*=SalesRole_item__]',          {x:59,y:6342,w:320,h:''}],
  ['mismatch head',     '[class*=Matching_heading__]',        {x:'',y:6820.5,w:'',h:34}],
  ['charm section',     '[class*=Attraction_section__]',      {x:0,y:7197,w:1080,h:1151.5}],
  ['charm box',         '[class*=Attraction_box__]',          {x:56.5,y:7249,w:967,h:1047}],
  ['charm card1',       '[class*=Attraction_card__]',         {x:101,y:7427,w:413,h:283}],
  ['company sect',      '[class*=Company_section__]',         {x:0,y:8349,w:1080,h:520}],
  ['req card',          '[class*=JobDescription_card__]',     {x:165,y:8922,w:750,h:1436.5}],
  ['req heading',       '[class*=JobDescription_heading__]',  {x:'',y:9007,w:'',h:34}],
  ['faq head',          '[class*=Faq_heading__]',             {x:56,y:10475,w:'',h:''}],
  ['faq list',          '[class*=Faq_list__]',                {x:165,y:10594.5,w:750,h:''}],
  ['faq q1 mark',       '[class*=Faq_mark__]',                {x:165,y:10594.5,w:50,h:50}],
  ['form section',      '[class*=EntryForm_section__]',       {x:0,y:11155,w:1080,h:1096.5}],
  ['form box',          '[class*=EntryForm_box__]',           {x:165,y:11206,w:750,h:993.5}],
  ['form step01',       '[class*=EntryForm_stepNo__]',        {x:415,y:11334.5,w:38,h:39}],
  ['form input1',       '[class*=EntryForm_input__]',         {x:463.5,y:11443,w:300,h:45}],
  ['form submit',       '[class*=EntryForm_submit__]',        {x:439,y:12105,w:202,h:49.5}],
  ['footer',            'footer',                             {x:0,y:12253,w:1080,h:331.5}],
  ['footer logo',       'footer img',                         {x:476.5,y:12297.5,w:157,h:39.5}],
];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await b.newContext({ viewport: { width: 1080, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await p.evaluate(() => new Promise(r => { window.scrollTo(0, document.body.scrollHeight); setTimeout(r, 900); }));
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  console.log('scrollWidth', await p.evaluate(() => document.documentElement.scrollWidth),
              'height', await p.evaluate(() => document.body.scrollHeight));
  console.log('label                 | expect x,y,w,h              | actual                      | Δx    Δy    Δw    Δh');
  for (const [label, sel, e] of PC) {
    const r = await p.evaluate((s) => {
      const el = document.querySelector(s); if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: b.x + window.scrollX, y: b.y + window.scrollY, w: b.width, h: b.height };
    }, sel);
    if (!r) { console.log(`${label.padEnd(21)}| MISSING (${sel})`); continue; }
    const f = (v) => (v === '' ? '  -  ' : (Math.round(v*10)/10).toString().padStart(6));
    const d = (a, b2) => (b2 === '' ? '  -  ' : (Math.round((a-b2)*10)/10).toString().padStart(6));
    console.log(`${label.padEnd(21)}|${f(e.x)}${f(e.y)}${f(e.w)}${f(e.h)} |${f(r.x)}${f(r.y)}${f(r.w)}${f(r.h)} |${d(r.x,e.x)}${d(r.y,e.y)}${d(r.w,e.w)}${d(r.h,e.h)}`);
  }
  await b.close();
})();
