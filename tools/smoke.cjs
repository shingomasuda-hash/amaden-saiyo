const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await b.newContext({ viewport: { width: 1080, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // --- FAQ アコーディオン ---
  const q1 = p.locator('[class*=Faq_question__]').first();
  console.log('FAQ initial aria-expanded =', await q1.getAttribute('aria-expanded'));
  await q1.click(); await p.waitForTimeout(350);
  console.log('FAQ after click        =', await q1.getAttribute('aria-expanded'));
  const panelH = await p.locator('[class*=Faq_panel__]').first().evaluate(el => el.getBoundingClientRect().height);
  console.log('FAQ panel height when open =', Math.round(panelH));
  await q1.click(); await p.waitForTimeout(350);
  const panelH2 = await p.locator('[class*=Faq_panel__]').first().evaluate(el => el.getBoundingClientRect().height);
  console.log('FAQ panel height when closed =', Math.round(panelH2));

  // --- CTA スムーススクロール ---
  console.log('header CTA href =', await p.locator('header nav a').first().getAttribute('href'));
  console.log('#entry exists   =', await p.locator('#entry').count());

  // --- フォーム: 未入力バリデーション ---
  await p.locator('[class*=EntryForm_submit__]').click();
  await p.waitForTimeout(200);
  console.log('validation errors shown =', await p.locator('[class*=EntryForm_error__]').count());

  // --- フォーム: 入力 → 確認 → 送信 ---
  await p.fill('input[autocomplete="name"]', '山田太郎');
  await p.fill('input[autocomplete="email"]', 'taro@sample.co.jp');
  await p.fill('input[autocomplete="bday"]', '1995年6月1日');
  await p.fill('input[autocomplete="tel"]', '09000000000');
  await p.fill('textarea', '営業職に応募します。');
  await p.locator('[class*=EntryForm_agreeText__]').click();
  await p.locator('[class*=EntryForm_submit__]').click();
  await p.waitForTimeout(500);
  console.log('step2 confirm rows =', await p.locator('[class*=EntryForm_confirmRow__]').count());
  await p.locator('[class*=EntryForm_submit__]').click();
  await p.waitForTimeout(500);
  console.log('step3 done shown   =', await p.locator('[class*=EntryForm_done__]').count());

  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no console/page errors');
  await b.close();
})();
