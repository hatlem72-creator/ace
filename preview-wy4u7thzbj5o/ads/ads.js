/* Fake vinyl ads: reusable module (needs ads.css + a data file that sets window.VINYL_ADS + an img/ folder next to this file).
   Usage: <div data-vinyl-ad="love-gun"></div>              one record (or one extra, e.g. "flip")
          <div data-vinyl-ad="ace-1978|space-invader|@extras"></div>   random pick per visit; @extras = every wonky-70s extra ad
          <div data-vinyl-ad="shop"></div>                  STANDARD: Vinyl Heaven / support your local record shop
          <div data-vinyl-ad="rsd"></div>                   Record Store Day (also in rsd|@extras rotation)
          <div data-vinyl-ad="anywhere"></div>              STANDARD: "Buy vinyl. Anywhere!"
          <div data-vinyl-ad="coffee"></div>                Buy Me a Coffee ad, removed while bmacUrl is empty
   Random slots on one page never repeat an ad while there are unused options left.
   ?vad=<id> in the page URL forces that ad into the first random slot that can show it (for testing). See README.md. */
(() => {
const D = window.VINYL_ADS; if (!D) return;
const X = D.extras || {};
const BASE = ((document.currentScript && document.currentScript.src) || '').replace(/[^/]*$/, '') + 'img/';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const okUrl = u => /^https:\/\//.test(u || '');
const btn = (href, text, cls) => okUrl(href) ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${text}</a>` : '';
const pic = a => {
  const ver = a.v ? `?v=${esc(a.v)}` : '';
  return `<picture><source srcset="${BASE}${esc(a.img)}.webp${ver}" type="image/webp">
  <img src="${BASE}${esc(a.img)}.jpg${ver}" alt="${esc(a.alt)}" width="${a.width || 960}" height="${a.height || 540}" loading="lazy" decoding="async"></picture>`;
};
const inviteCard = (kind, a, label) => `
  <aside class="vad vad-invite vad-${kind}" style="--ac:${esc(a.color || '#ff7a18')}" aria-label="${esc(label)}">
    <figure class="vad-pic">${pic(a)}</figure>
    <div class="vad-foot">
      <p class="vad-head">${esc(a.head)}</p>
      ${a.line ? `<p class="vad-line">${esc(a.line)}</p>` : ''}
      ${okUrl(a.url) ? `<p class="vad-act">${btn(a.url, esc(a.label) + arrow, 'vad-btn')}</p>` : ''}
      ${a.payoff ? `<p class="vad-payoff">${esc(a.payoff)}</p>` : ''}
    </div>
  </aside>`;
const collectionHref = () => new URL('../../collection/', BASE).href;
const scanCard = a => `
  <aside class="vad vad-scan" style="--ac:${esc(a.color || "#c4a35a")}" aria-label="${esc(a.label || "Vintage print advertisement")}">
    <figure class="vad-pic">${pic(a)}</figure>
    <div class="vad-foot">
      <p class="vad-act"><a class="vad-ghost" href="${esc(collectionHref())}">From the collection${arrow}</a></p>
    </div>
  </aside>`;
const arrow = ' <span aria-hidden="true">→</span>';
const card = (kind, a, meta, actions, label) => `
  <aside class="vad vad-${kind}" style="--ac:${esc(a.color || '#ffd60a')}" aria-label="${esc(label)}">
    <figure class="vad-pic">${pic(a)}
      <figcaption class="vad-head">${esc(a.head)}</figcaption>
    </figure>
    <div class="vad-foot">
      ${meta ? `<p class="vad-meta">${meta}</p>` : ''}
      ${actions ? `<p class="vad-act">${actions}</p>` : ''}
      ${a.fine ? `<p class="vad-fine">${esc(a.fine)}</p>` : ''}
      <p class="vad-payoff">${esc(D.payoff || 'Lover of muzak!')}</p>
    </div>
  </aside>`;
const record = r => card('rec', r,
  `${esc(r.artist)} · ${esc(r.title)} · ${esc(r.year)} · ${esc(r.label)} · ♪ ${esc(r.track)}`,
  btn(r.discogs, 'Find this pressing' + arrow, 'vad-btn') + btn(r.spin, 'Spin it ▸', 'vad-ghost'),
  `Parody ad for a real record: ${r.artist}, ${r.title} (${r.year})`);
const build = key => {
  if (D.hifi && D.hifi[key]) return scanCard(D.hifi[key]);
  const a = D[key];
  if (key === 'shop') return inviteCard('shop', a, 'Advertisement: support your local record shop');
  if (key === 'rsd') return inviteCard('rsd', a, 'Advertisement: Record Store Day');
  if (key === 'anywhere') return a ? card('anywhere', a, a.caption ? esc(a.caption) : '', btn(a.url, esc(a.label) + arrow, 'vad-btn'), 'Parody ad: buy vinyl anywhere') : '';
  if (key === 'coffee') return okUrl(D.bmacUrl) ? card('coffee', a, '', btn(D.bmacUrl, 'Buy me a coffee <span aria-hidden="true">☕</span>', 'vad-btn'), 'Parody ad: buy the artist a coffee') : '';
  if (X[key]) return card('fun', X[key], '', btn(X[key].url, esc(X[key].label || 'More') + arrow, 'vad-btn'), `Parody ad: ${X[key].head}`);
  const r = D.records[key]; return r ? record(r) : '';
};
const expand = list => list.flatMap(k => k === '@extras' ? Object.keys(X) : k === '@records' ? Object.keys(D.records) : k === '@hifi' ? Object.keys(D.hifi || {}) : [k]);
const used = new Set();
let force = new URLSearchParams(location.search).get('vad');
document.querySelectorAll('[data-vinyl-ad]').forEach(el => {
  const opts = expand(el.dataset.vinylAd.split('|').map(s => s.trim()).filter(Boolean));
  let key = opts[0];
  if (opts.length > 1) {
    if (force && opts.includes(force)) { key = force; force = null; }
    else { const fresh = opts.filter(k => !used.has(k)); const pool = fresh.length ? fresh : opts; key = pool[Math.floor(Math.random() * pool.length)]; }
  }
  used.add(key);
  const html = build(key);
  if (html) { el.innerHTML = html; el.hidden = false; } else el.remove();
});
/* a row or a labelled slot wrapper (data-vinyl-slot) disappears when none of its ads is shown */
document.querySelectorAll('[data-vinyl-ads-row],[data-vinyl-slot]').forEach(w => { if (!w.querySelector('.vad')) w.remove(); });
})();
