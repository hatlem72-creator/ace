/* Ace Is Back! True Tales: full-screen comic reader. One page at a time; swipe, tap, click or arrow keys. */
(() => {
const $ = s => document.querySelector(s);
const track = $('#track'), endPage = $('#endPage'), dotsEl = $('#dots'), countEl = $('#count');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* build panel pages */
STORY.panels.forEach((p, i) => {
  const s = document.createElement('section');
  s.className = 'page panel-page'; s.setAttribute('aria-label', `Panel ${i + 1} of ${STORY.panels.length}`);
  const bits = p.bits.map(b => {
    if (b.t === 'sfx') return `<span class="sfx" style="--x:${b.x}%;--y:${b.y}%;--mx:${b.mx ?? b.x}%;--my:${b.my ?? b.y}%;--r:${b.rot || 0}deg;--s:${b.size || 1}">${esc(b.text)}</span>`;
    if (b.t === 'quote') return `<figure class="bit bubble ${b.pos}"><blockquote>“${esc(b.text)}”</blockquote><figcaption>${esc(b.who)}</figcaption></figure>`;
    return `<p class="bit cap ${b.pos}${b.small ? ' small' : ''}">${b.text}</p>`;
  }).join('');
  s.innerHTML = `<div class="sheet"><figure class="panel" style="--fx:${p.focus || '50%'}">
      <picture><source data-srcset="img/${p.img}.webp" type="image/webp"><img data-src="img/${p.img}.jpg" alt="${esc(p.alt)}" width="1280" height="720"></picture>
      ${bits}</figure><span class="pno">${i + 1}</span></div>`;
  track.insertBefore(s, endPage);
});
const pages = [...track.children], N = pages.length;
dotsEl.innerHTML = pages.map((_, i) => `<button type="button" aria-label="Go to page ${i + 1}"></button>`).join('');
const dots = [...dotsEl.children];

const load = i => { const pg = pages[i]; if (!pg) return;
  pg.querySelectorAll('source[data-srcset]').forEach(s => { s.srcset = s.dataset.srcset; s.removeAttribute('data-srcset'); });
  pg.querySelectorAll('img[data-src]').forEach(m => { m.src = m.dataset.src; m.removeAttribute('data-src'); }); };

let cur = 0;
const go = (i, instant) => {
  i = Math.max(0, Math.min(N - 1, i));
  cur = i;
  track.style.transition = instant ? 'none' : '';
  track.style.transform = `translate3d(${-i * 100}%,0,0)`;
  pages.forEach((p, k) => { p.classList.toggle('on', k === i); p.setAttribute('aria-hidden', k !== i); p.inert = k !== i; });
  dots.forEach((d, k) => d.classList.toggle('on', k === i));
  countEl.textContent = `${i + 1} / ${N}`;
  [i, i + 1, i + 2, i - 1].forEach(load);
  history.replaceState(null, '', i ? `#page-${i + 1}` : location.pathname);
};
const fromHash = () => { const m = location.hash.match(/page-(\d+)/); return m ? +m[1] - 1 : 0; };
go(fromHash(), true);
addEventListener('hashchange', () => go(fromHash()));
dots.forEach((d, k) => d.addEventListener('click', e => { e.stopPropagation(); go(k); }));
$('#again').addEventListener('click', () => go(0));

/* keys */
addEventListener('keydown', e => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
  else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(cur - 1); }
  else if (e.key === 'Home') go(0); else if (e.key === 'End') go(N - 1);
  else if (e.key === 'Escape') location.href = '../';
});

/* swipe + tap (pointer events) */
const vp = $('#viewport'); let sx = 0, sy = 0, st = 0, down = false, drag = false;
vp.addEventListener('pointerdown', e => { if (e.button) return; down = true; drag = false; sx = e.clientX; sy = e.clientY; st = Date.now(); });
vp.addEventListener('pointermove', e => {
  if (!down) return; const dx = e.clientX - sx, dy = e.clientY - sy;
  if (!drag && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) drag = true;
  if (drag) { track.style.transition = 'none'; const edge = (cur === 0 && dx > 0) || (cur === N - 1 && dx < 0) ? 0.3 : 1;
    track.style.transform = `translate3d(calc(${-cur * 100}% + ${dx * edge}px),0,0)`; }
});
const end = e => {
  if (!down) return; down = false; const dx = e.clientX - sx, dy = e.clientY - sy;
  if (drag) { track.style.transition = ''; if (Math.abs(dx) > Math.min(80, innerWidth * .15) || (Math.abs(dx) > 30 && Date.now() - st < 250)) go(cur + (dx < 0 ? 1 : -1)); else go(cur); return; }
  if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && e.type === 'pointerup') {
    if (e.target.closest('a,button,figure.qbub,.share,.fine,.endnav')) return;
    if (cur === N - 1) return;                       // end page: taps don't flip
    e.clientX < innerWidth * 0.3 ? go(cur - 1) : go(cur + 1);
  }
};
vp.addEventListener('pointerup', end); vp.addEventListener('pointercancel', e => { down = false; if (drag) { track.style.transition = ''; go(cur); } });

/* share badges */
const url = 'https://hatlem72-creator.github.io/ace/preview-wy4u7thzbj5o/issue-1/', text = 'Shock Me! The night Ace Frehley was electrocuted on stage (1976). A true tale in comic form';
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
