/* Fake vinyl ads: reusable module (needs ads.css + a data file that sets window.VINYL_ADS).
   Usage: <div data-vinyl-ad="love-gun"></div>  one record
          <div data-vinyl-ad="ace-1978|space-invader|origins-1"></div>  picks one at random per visit
          <div data-vinyl-ad="shop"></div>  local record shop ad (house rule: always include one)
          <div data-vinyl-ad="coffee"></div>  Buy Me a Coffee ad, removed while bmacUrl is empty
   ?vad=<id> in the page URL forces a record into every random slot (for testing). See README.md. */
(() => {
const D = window.VINYL_ADS; if (!D) return;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const okUrl = u => /^https:\/\//.test(u || '');
let uid = 0;
/* a glossy spinning record, drawn here (no real artwork or logos); the label carries the title */
const disc = (labelTop, labelBot) => { const id = 'vad' + (++uid);
  return `<svg class="vad-art" viewBox="0 0 200 200" aria-hidden="true">
  <defs><radialGradient id="${id}v" cx="50%" cy="50%" r="50%"><stop offset=".3" stop-color="#1b1b20"/><stop offset=".97" stop-color="#050506"/><stop offset="1" stop-color="#2a2a30"/></radialGradient>
  <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset=".75" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <radialGradient id="${id}l"><stop offset="0" stop-color="var(--ac)" stop-opacity=".75"/><stop offset="1" stop-color="var(--ac)"/></radialGradient>
  <path id="${id}a" d="M100 70 a30 30 0 1 1 -0.1 0"/></defs>
  <g class="vad-spin-g"><circle cx="100" cy="100" r="96" fill="url(#${id}v)"/>
    ${[88, 80, 72, 64, 56, 48].map(r => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1.2"/>`).join('')}
    <circle cx="100" cy="100" r="34" fill="url(#${id}l)"/>
    <text class="vad-lbl" font-size="7.4" fill="#0b0b0d"><textPath href="#${id}a" startOffset="0">${esc(labelTop)}</textPath></text>
    <text x="100" y="118" text-anchor="middle" class="vad-lbl" font-size="7" fill="#0b0b0d">${esc(labelBot)}</text>
    <circle cx="100" cy="100" r="3.2" fill="#0b0b0d"/></g>
  <circle cx="100" cy="100" r="96" fill="url(#${id}s)" pointer-events="none"/></svg>`; };
const cup = () => `<svg class="vad-art" viewBox="0 0 200 200" aria-hidden="true">
  <circle cx="100" cy="100" r="96" fill="#111116" stroke="rgba(255,255,255,.12)"/>
  <circle cx="100" cy="100" r="70" fill="#f4efe6"/><path d="M168 96 h20 a12 12 0 0 1 0 24 h-20" fill="none" stroke="#f4efe6" stroke-width="9"/>
  <circle cx="100" cy="100" r="58" fill="#6b3f22"/>
  <g class="vad-spin-g"><path d="M100 62 c-20 14 -20 30 0 40 c20 10 20 26 0 36 M100 74 c-12 9 -12 19 0 26 c12 7 12 17 0 24" fill="none" stroke="#f1dcc0" stroke-width="5" stroke-linecap="round"/></g></svg>`;
const btn = (href, text, cls) => okUrl(href) ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${text}</a>` : '';
const card = (kind, a, art, meta, actions, tag, label) => `
  <aside class="vad vad-${kind}" style="--ac:${esc(a.color || '#ffd60a')}" aria-label="${esc(label)}">
    <div class="vad-hd"><div class="vad-media">${art}</div>
      <p class="vad-top"><span class="vad-tag">${tag}</span>${meta}</p></div>
    <div class="vad-main">
      <p class="vad-head">${esc(a.head)}</p>
      ${a.sub ? `<p class="vad-sub">${esc(a.sub)}</p>` : ''}
      <p class="vad-body">${esc(a.body)}</p>
      ${a.quote ? `<blockquote class="vad-q"><p>“${esc(a.quote)}”</p><cite>${esc(a.who)}</cite></blockquote>` : ''}
      <p class="vad-act">${actions}</p>
      <p class="vad-fine">${esc(a.fine)}</p>
    </div>
  </aside>`;
const record = r => card('rec', r, disc(r.title.toUpperCase() + ' · ' + r.artist.toUpperCase() + ' · ', String(r.year)),
  `<span class="vad-meta"><b>${esc(r.artist)}</b> — <cite>${esc(r.title)}</cite></span><span class="vad-meta">${esc(r.label)} · ${esc(r.year)}</span><span class="vad-track">♪ “${esc(r.track)}”</span>`,
  btn(r.discogs, 'Find this pressing <span aria-hidden="true">→</span>', 'vad-btn') + btn(r.spin, 'Spin it ▸', 'vad-ghost'),
  'Fake ad · real record', `Parody ad for a real record: ${r.artist}, ${r.title} (${r.year})`);
const build = key => {
  if (key === 'shop') { const a = D.shop; return card('shop', a, disc('YOUR LOCAL RECORD SHOP · OPEN TODAY · ', 'LOCAL'), '', btn(a.url, esc(a.label) + ' <span aria-hidden="true">→</span>', 'vad-btn'), 'Fake ad · real advice', 'Parody ad: support your local record shop'); }
  if (key === 'coffee') { const a = D.coffee; if (!okUrl(D.bmacUrl)) return ''; return card('coffee', a, cup(), '', btn(D.bmacUrl, 'Buy me a coffee <span aria-hidden="true">☕</span>', 'vad-btn'), 'Fake ad · real coffee', 'Parody ad: buy the artist a coffee'); }
  const r = D.records[key]; return r ? record(r) : '';
};
const force = new URLSearchParams(location.search).get('vad');
document.querySelectorAll('[data-vinyl-ad]').forEach(el => {
  const opts = el.dataset.vinylAd.split('|').map(s => s.trim()).filter(Boolean);
  let key = opts.length > 1 ? opts[Math.floor(Math.random() * opts.length)] : opts[0];
  if (force && opts.length > 1 && D.records[force]) key = force;
  const html = build(key);
  if (html) { el.innerHTML = html; el.hidden = false; } else el.remove();
});
document.querySelectorAll('[data-vinyl-ads-row]').forEach(row => { if (!row.querySelector('.vad')) row.remove(); });
})();
