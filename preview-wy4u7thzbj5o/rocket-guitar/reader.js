/* Ace Is Back! True Tales: full-screen comic reader v2.
   One page at a time; swipe, tap, click or arrow keys. Ken Burns art, timed lettering, spreads, physical page turn. */
(() => {
const $ = s => document.querySelector(s);
const track = $('#track'), endPage = $('#endPage'), dotsEl = $('#dots'), countEl = $('#count');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const KB = { in: ['scale(1.04)', 'scale(1.13)'], out: ['scale(1.15)', 'scale(1.04)'],
  l: ['scale(1.1) translateX(2.5%)', 'scale(1.1) translateX(-2.5%)'], r: ['scale(1.1) translateX(-2.5%)', 'scale(1.1) translateX(2.5%)'],
  up: ['scale(1.1) translateY(2.5%)', 'scale(1.1) translateY(-2.5%)'], dn: ['scale(1.1) translateY(-2.5%)', 'scale(1.1) translateY(2.5%)'] };
const VT = '<span class="vt">Ace’s version</span>';

/* build panel pages */
STORY.panels.forEach((p, i) => {
  const s = document.createElement('section');
  s.className = 'page panel-page' + (p.spread ? ' spread' : '');
  s.setAttribute('aria-label', `Panel ${i + 1} of ${STORY.panels.length}`);
  if (p.buzz) s.dataset.buzz = p.buzz;
  let d = 0.65;                                                  // lettering starts after the art has landed
  const hasSfx = p.bits.some(b => b.t === 'sfx'); if (hasSfx) d = 0.95;
  const html = b => {
    if (b.t === 'sfx') return `<span class="sfx" style="--d:.28s;--x:${b.x}%;--y:${b.y}%;--mx:${b.mx ?? b.x}%;--my:${b.my ?? b.y}%;--r:${b.rot || 0}deg;--s:${b.size || 1}" aria-hidden="true">${esc(b.text)}</span>`;
    const delay = `--d:${d.toFixed(2)}s`; d += 0.85;
    const av = b.acev ? ' acev' : '', tag = b.acev ? VT : '';
    if (b.t === 'quote') return `<figure class="bit bubble ${b.pos}${av}" style="${delay}">${tag}<blockquote>“${esc(b.text)}”</blockquote><figcaption>${esc(b.who)}</figcaption></figure>`;
    if (b.t === 'say') return `<p class="bit say ${b.pos} tail-${b.tail || 'b'}${b.radio ? ' radio' : ''}${av}" style="${delay}">${tag}${esc(b.text)}</p>`;
    return `<p class="bit cap ${b.pos}${b.small ? ' small' : ''}${av}" style="${delay}">${tag}${b.text}</p>`;
  };
  /* lettering is rendered in reading order (delays), then grouped: top / bottom layers stack neatly on portrait screens */
  const parts = p.bits.map(b => [b, html(b)]);
  const grp = f => parts.filter(([b]) => b.t !== 'sfx' && f(b.pos)).map(x => x[1]).join('');
  const bits = parts.filter(([b]) => b.t === 'sfx').map(x => x[1]).join('')
    + `<div class="lt top">${grp(q => q[0] === 't')}</div><div class="lt bot">${grp(q => q[0] === 'b')}</div>`;
  s.dataset.done = Math.round(d * 1000);
  const [k0, k1] = KB[p.kb || 'in'];
  s.innerHTML = `<div class="sheet"><figure class="panel" style="--fx:${p.focus || '50%'};--k0:${k0};--k1:${k1}">
      <picture><source data-srcset="img/${p.img}.webp" type="image/webp"><img data-src="img/${p.img}.jpg" alt="${esc(p.alt)}" width="1280" height="720" decoding="async"></picture>
      ${bits}</figure><span class="pno">${i + 1}</span></div>`;
  track.insertBefore(s, endPage);
});
const pages = [...track.children], N = pages.length;
dotsEl.innerHTML = pages.map((_, i) => `<button type="button" aria-label="Go to page ${i + 1}"></button>`).join('');
const dots = [...dotsEl.children];

const load = i => { const pg = pages[i]; if (!pg) return;
  pg.querySelectorAll('source[data-srcset]').forEach(s => { s.srcset = s.dataset.srcset; s.removeAttribute('data-srcset'); });
  pg.querySelectorAll('img[data-src]').forEach(m => { m.src = m.dataset.src; m.removeAttribute('data-src'); }); };

/* haptic-like feedback: a tiny tick on every turn, a bigger thump on impact pages (Android/Chrome; silently ignored elsewhere) */
let canBuzz = false; addEventListener('pointerdown', () => canBuzz = true, {once: true, capture: true});
const buzz = ms => { if (canBuzz && !RM && navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} };

let cur = 0, shownTimer;
const go = (i, instant) => {
  i = Math.max(0, Math.min(N - 1, i));
  const prev = cur, dir = Math.sign(i - prev); cur = i;
  track.style.transition = instant ? 'none' : '';
  track.style.transform = `translate3d(${-i * 100}%,0,0)`;
  pages.forEach((p, k) => {
    const on = k === i;
    if (!instant && !RM && k === prev && dir) { p.classList.remove('out-l', 'out-r'); p.classList.add(dir > 0 ? 'out-r' : 'out-l');
      setTimeout(() => p.classList.remove('out-l', 'out-r'), 520); }
    if (on && !p.classList.contains('on')) { p.classList.add('on'); p.classList.remove('shown'); }
    else if (!on && p.classList.contains('on')) {           // keep the leaving page's art and lettering until it has slid away
      if (instant || k !== prev) p.classList.remove('on', 'shown');
      else setTimeout(() => { if (cur !== k) p.classList.remove('on', 'shown'); }, 520); }
    p.setAttribute('aria-hidden', !on); p.inert = !on;
  });
  const pg = pages[i];
  if (!instant && dir) { pg.classList.remove('land', 'hit'); void pg.offsetWidth; pg.style.setProperty('--lr', (dir > 0 ? 0.6 : -0.6) + 'deg');
    pg.classList.add(pg.dataset.buzz ? 'hit' : 'land'); setTimeout(() => pg.classList.remove('land', 'hit'), 950);
    buzz(pg.dataset.buzz ? [8, 40, +pg.dataset.buzz] : 8); }
  clearTimeout(shownTimer); if (pg.dataset.done) shownTimer = setTimeout(() => pg.classList.add('shown'), +pg.dataset.done);
  document.body.classList.toggle('dark', pg.classList.contains('spread'));
  dots.forEach((d, k) => d.classList.toggle('on', k === i));
  countEl.textContent = `${i + 1} / ${N}`;
  [i, i + 1, i + 2, i - 1].forEach(load);
  history.replaceState(null, '', i ? `#page-${i + 1}` : location.pathname);
};
/* a forward tap/key while the lettering is still popping in finishes it first; the next one turns the page */
const next = () => { const pg = pages[cur]; if (pg.dataset.done && !pg.classList.contains('shown') && !RM) { clearTimeout(shownTimer); pg.classList.add('shown'); } else go(cur + 1); };
const fromHash = () => { const m = location.hash.match(/page-(\d+)/); return m ? +m[1] - 1 : 0; };
go(fromHash(), true);
addEventListener('hashchange', () => go(fromHash()));
dots.forEach((d, k) => d.addEventListener('click', e => { e.stopPropagation(); go(k); }));
$('#again').addEventListener('click', () => go(0));

/* keys */
addEventListener('keydown', e => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); e.key === 'ArrowRight' ? go(cur + 1) : next(); }
  else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(cur - 1); }
  else if (e.key === 'Home') go(0); else if (e.key === 'End') go(N - 1);
  else if (e.key === 'Escape') location.href = '../';
});

/* swipe + tap (pointer events). While dragging, the page tilts like paper under a thumb. */
const vp = $('#viewport'); let sx = 0, sy = 0, st = 0, down = false, drag = false, raf = 0, lastDx = 0;
const sheetOf = i => pages[i] && pages[i].querySelector('.sheet');
vp.addEventListener('pointerdown', e => { if (e.button) return; down = true; drag = false; sx = e.clientX; sy = e.clientY; st = Date.now(); });
vp.addEventListener('pointermove', e => {
  if (!down) return; const dx = e.clientX - sx, dy = e.clientY - sy;
  if (!drag && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) drag = true;
  if (drag) { lastDx = dx; if (raf) return; raf = requestAnimationFrame(() => { raf = 0;
    track.style.transition = 'none'; const edge = (cur === 0 && lastDx > 0) || (cur === N - 1 && lastDx < 0) ? 0.3 : 1;
    track.style.transform = `translate3d(calc(${-cur * 100}% + ${lastDx * edge}px),0,0)`;
    const sh = sheetOf(cur); if (sh && !RM) { const f = Math.max(-1, Math.min(1, lastDx / innerWidth));
      sh.style.transition = 'none'; sh.style.transformOrigin = f < 0 ? '0 50%' : '100% 50%';
      sh.style.transform = `rotateY(${f * -16}deg) scale(${1 - Math.abs(f) * .06})`; } }); }
});
const release = () => { const sh = sheetOf(cur); if (sh) { sh.style.transition = ''; sh.style.transform = ''; sh.style.transformOrigin = ''; } };
const end = e => {
  if (!down) return; down = false; const dx = e.clientX - sx, dy = e.clientY - sy;
  if (raf) { cancelAnimationFrame(raf); raf = 0; }
  if (drag) { track.style.transition = ''; release(); if (Math.abs(dx) > Math.min(80, innerWidth * .15) || (Math.abs(dx) > 30 && Date.now() - st < 250)) go(cur + (dx < 0 ? 1 : -1)); else go(cur); return; }
  if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && e.type === 'pointerup') {
    if (e.target.closest('a,button,figure.qbub,.share,.fine,.endnav,.after')) return;
    if (cur === N - 1) return;                       // end page: taps don't flip
    e.clientX < innerWidth * 0.3 ? go(cur - 1) : next();
  }
};
vp.addEventListener('pointerup', end); vp.addEventListener('pointercancel', () => { down = false; if (drag) { track.style.transition = ''; release(); go(cur); } });

/* share badges */
const url = 'https://hatlem72-creator.github.io/ace/preview-wy4u7thzbj5o/rocket-guitar/', text = 'Holy Smoke! Ace Frehley’s smoking, rocket-firing Les Paul and how it fought back. A true tale in comic form';
const u = encodeURIComponent(url), t = encodeURIComponent(text);
const sh = $('#share');
sh.insertAdjacentHTML('beforeend', [
  ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`, 'fb'], ['X', `https://twitter.com/intent/tweet?url=${u}&text=${t}`, 'x'],
  ['Reddit', `https://www.reddit.com/submit?url=${u}&title=${t}`, 'rd'], ['WhatsApp', `https://wa.me/?text=${t}%20${u}`, 'wa']
].map(([n, h, c]) => `<a class="badge ${c}" href="${h}" target="_blank" rel="noopener">${n}</a>`).join('') + `<button class="badge cp" type="button" id="copy">Copy link</button>`);
$('#copy').addEventListener('click', async e => { const b = e.currentTarget;
  try { await navigator.clipboard.writeText(url); b.textContent = 'Copied!'; } catch (err) { prompt('Copy this link:', url); }
  setTimeout(() => b.textContent = 'Copy link', 1800); });
if (navigator.share) { const b = document.createElement('button'); b.type = 'button'; b.className = 'badge nat'; b.textContent = 'Share…';
  b.onclick = () => navigator.share({title: document.title, url}).catch(() => {}); sh.appendChild(b); }
})();
