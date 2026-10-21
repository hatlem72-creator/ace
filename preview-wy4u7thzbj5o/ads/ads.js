/* Retro fake vinyl ads: reusable module (needs ads.css + a data file that sets window.VINYL_ADS).
   Usage: <div data-vinyl-ad="love-gun"></div>  one record
          <div data-vinyl-ad="ace-1978|space-invader|origins-1"></div>  picks one at random per visit
          <div data-vinyl-ad="shop"></div>  local record shop ad (house rule: always include one)
          <div data-vinyl-ad="coffee"></div>  Buy Me a Coffee ad, removed while bmacUrl is empty
   ?vad=<id> in the page URL forces a record for every random slot (for testing). See README.md. */
(() => {
const D = window.VINYL_ADS; if (!D) return;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const okUrl = u => /^https:\/\//.test(u || '');
let uid = 0;
/* a cheap-print record sleeve with the disc sliding out: drawn here, no real artwork or logos */
const disc = (r) => { const id = 'vad' + (++uid);
  const t = esc(r.title.toUpperCase()), yr = esc(r.year);
  return `<svg class="vad-disc" viewBox="0 0 200 150" role="img" aria-label="Illustration: a vinyl record sliding out of a sleeve">
  <defs><pattern id="${id}h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3" cy="3" r="1.3" fill="rgba(0,0,0,.28)"/></pattern>
  <radialGradient id="${id}g"><stop offset="0" stop-color="#3a3a3a"/><stop offset="1" stop-color="#0c0c0c"/></radialGradient></defs>
  <g class="vad-vinyl"><circle cx="128" cy="75" r="64" fill="url(#${id}g)" stroke="#000" stroke-width="2"/>
  ${[56, 49, 42, 35].map(rr => `<circle cx="128" cy="75" r="${rr}" fill="none" stroke="rgba(255,255,255,.13)" stroke-width="1"/>`).join('')}
  <path d="M86 40 A55 55 0 0 1 150 26" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="128" cy="75" r="22" fill="${esc(r.color)}" stroke="#000" stroke-width="1.5"/><circle cx="128" cy="75" r="22" fill="url(#${id}h)"/>
  <circle cx="128" cy="75" r="3" fill="#f4ecd6" stroke="#000"/></g>
  <rect x="6" y="9" width="132" height="132" fill="${esc(r.sleeve)}" stroke="#000" stroke-width="3"/><rect x="6" y="9" width="132" height="132" fill="url(#${id}h)"/>
  <path d="M6 141 L138 9" stroke="rgba(255,255,255,.18)" stroke-width="18"/>
  <text x="72" y="${t.length > 12 ? 70 : 74}" text-anchor="middle" class="vad-st" fill="${esc(r.ink)}" font-size="${t.length > 12 ? 15 : 20}">${t}</text>
  <text x="72" y="104" text-anchor="middle" class="vad-st" fill="${esc(r.ink)}" font-size="13">★ ${yr} ★</text></svg>`; };
const linkBtn = (href, text, cls) => okUrl(href) ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>` : '';
const shell = (kind, a, art, facts, actions, tag) => `
  <aside class="vad vad-${kind}" aria-label="Parody advertisement${a.title ? ': ' + esc(a.artist) + ', ' + esc(a.title) : ''}">
    <span class="vad-tag">${tag}</span>
    ${a.burst ? `<span class="vad-burst" aria-hidden="true"><span>${esc(a.burst)}</span></span>` : ''}
    <p class="vad-head">${esc(a.head)}</p>
    ${a.sub ? `<p class="vad-sub">${esc(a.sub)}</p>` : ''}
    <div class="vad-mid">${art}<div class="vad-copy">${facts}<p class="vad-body">${esc(a.body)}</p>
      ${a.quote ? `<blockquote class="vad-q">“${esc(a.quote)}”<cite>— ${esc(a.who)}</cite></blockquote>` : ''}</div></div>
    <div class="vad-coupon"><span class="vad-scissors" aria-hidden="true">✂</span>
      <p class="vad-cq">${esc(a.coupon)}</p>
      <p class="vad-lines" aria-hidden="true"><span>Name</span><i></i><span>Planet</span><i></i></p>
      <p class="vad-act">${actions}</p></div>
    <p class="vad-fine">${esc(a.fine)}</p>
  </aside>`;
const record = r => shell('rec', r, disc(r),
  `<p class="vad-facts"><b>${esc(r.artist)}</b> · <cite>${esc(r.title)}</cite> · ${esc(r.label)}, ${esc(r.year)}<br>Featuring “${esc(r.track)}”</p>`,
  linkBtn(r.discogs, 'Find this pressing', 'vad-btn') + linkBtn(r.spin, 'Spin it ▸', 'vad-spin'),
  'Fake ad · real record');
const shopArt = `<svg class="vad-disc vad-shop-art" viewBox="0 0 200 150" role="img" aria-label="Illustration: a little record shop with a striped awning">
  <rect x="20" y="40" width="160" height="104" fill="#f4ecd6" stroke="#000" stroke-width="3"/>
  <path d="M14 40 L186 40 L176 62 L24 62 Z" fill="#e3262d" stroke="#000" stroke-width="3"/>
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${30 + i * 22} 40 L${41 + i * 22} 40 L${38 + i * 22} 62 L${27 + i * 22} 62 Z" fill="#fff"/>`).join('')}
  <rect x="34" y="12" width="132" height="24" fill="#ffd60a" stroke="#000" stroke-width="3"/><text x="100" y="30" text-anchor="middle" class="vad-st" font-size="16" fill="#111">RECORDS</text>
  <rect x="34" y="74" width="74" height="58" fill="#9fd3ff" stroke="#000" stroke-width="3"/>
  <circle cx="60" cy="104" r="18" fill="#111"/><circle cx="60" cy="104" r="6" fill="#e3262d"/><circle cx="86" cy="100" r="13" fill="#222"/><circle cx="86" cy="100" r="4" fill="#ffd60a"/>
  <rect x="122" y="74" width="44" height="70" fill="#1d5fd8" stroke="#000" stroke-width="3"/><circle cx="158" cy="110" r="3" fill="#ffd60a"/>
  <text x="144" y="94" text-anchor="middle" font-size="9" class="vad-st" fill="#fff">OPEN</text></svg>`;
const cupArt = `<svg class="vad-disc vad-cup-art" viewBox="0 0 200 150" role="img" aria-label="Illustration: a steaming coffee mug with a lightning bolt">
  <path d="M74 26 q-10 -12 0 -22 M100 26 q-10 -12 0 -22 M126 26 q-10 -12 0 -22" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M46 36 L154 36 L144 138 L56 138 Z" fill="#fff" stroke="#000" stroke-width="3"/>
  <path d="M152 56 q34 4 26 34 q-6 22 -32 22" fill="none" stroke="#000" stroke-width="9"/><path d="M152 56 q34 4 26 34 q-6 22 -32 22" fill="none" stroke="#fff" stroke-width="4"/>
  <path d="M106 52 L82 94 L100 94 L90 126 L122 80 L104 80 L114 52 Z" fill="#ffd60a" stroke="#000" stroke-width="2.5"/></svg>`;
const build = key => {
  if (key === 'shop') { const a = D.shop; return shell('shop', a, shopArt, '', linkBtn(a.url, a.label, 'vad-btn'), 'Fake ad · real advice'); }
  if (key === 'coffee') { const a = D.coffee; if (!okUrl(D.bmacUrl)) return ''; return shell('coffee', a, cupArt, '', linkBtn(D.bmacUrl, 'Buy me a coffee ☕', 'vad-btn'), 'Fake ad · real coffee'); }
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
