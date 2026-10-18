/* Ace Is Back! True Tales — shared script for home + issue pages */
/* Feature flag: set to true to switch on the 'Vote for Issue #5!' poll (counters already exist on Abacus). */
const POLL_ENABLED = false;
const COUNTER_URL = "https://abacus.jasoncameron.dev/hit/hatlem72-creator-ace/visits";
(() => {
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* starfield with parallax */
const cv = $('#stars');
if (cv && cv.getContext) {
  const ctx = cv.getContext('2d'); let W, H, S = [];
  const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight;
    S = Array.from({length: Math.min(260, (W * H) / 5000 | 0)}, () => ({x: Math.random() * W, y: Math.random() * H, z: Math.random() * 0.9 + 0.1, t: Math.random() * 6})); };
  size(); addEventListener('resize', size);
  const draw = now => { ctx.clearRect(0, 0, W, H); const sy = scrollY;
    for (const s of S) { const y = ((s.y - sy * s.z * 0.35) % H + H) % H; const a = 0.45 + 0.55 * Math.abs(Math.sin(now / 900 + s.t));
      ctx.fillStyle = `rgba(255,255,255,${a * s.z})`; ctx.fillRect(s.x, y, s.z * 2.2, s.z * 2.2); }
    if (!reduce) requestAnimationFrame(draw); };
  requestAnimationFrame(draw); if (reduce) addEventListener('scroll', () => requestAnimationFrame(draw), {passive: true});
}

/* home: rack + timeline + sources */
const grid = $('#rackGrid');
if (grid && typeof ISSUES !== 'undefined') {
  const meterMini = n => `<span class="mini-meter" aria-label="Shock-o-meter ${n} of 10">⚡ ${n}/10</span>`;
  grid.innerHTML = ISSUES.filter(x => x.status === 'out').map(x => `
    <a class="cover tilt" href="issue-${x.no}/" aria-label="Issue ${x.no}: ${esc(x.title)} (${x.year})">
      <div class="masthead"><span class="mh-series">Ace Is Back! True Tales</span><span class="mh-no">No. ${x.no}</span><span class="mh-price">${esc(x.price)}</span></div>
      <div class="c-art"><picture><source srcset="${x.cover}.webp" type="image/webp"><img src="${x.cover}.jpg" alt="" loading="lazy" width="800" height="450" style="object-position:${x.focus || '50%'} 50%" onerror="this.closest('picture').remove()"></picture></div>
      <div class="c-burst">${esc(x.title)}</div>
      <div class="c-foot"><span class="yr">${x.year}</span><span class="kick">${esc(x.kicker)}</span>${meterMini(x.shock)}</div>
      <span class="true-stamp">${x.legend ? 'Legend!' : '100% True!'}</span>
    </a>`).join('') + ISSUES.filter(x => x.status !== 'out').map(x => `
    <div class="cover soon" aria-label="Issue ${x.no}: coming soon">
      <div class="masthead"><span class="mh-series">Ace Is Back! True Tales</span><span class="mh-no">No. ${x.no}</span><span class="mh-price">35¢</span></div>
      <div class="c-art soon-art"><span>?</span></div>
      <div class="c-burst">Coming soon!</div>
      <div class="c-foot"><span class="kick">Issue #${x.no}: coming soon</span></div>
    </div>`).join('');
  const eras = {'70s': 'The 70s', '80s': 'The 80s', 'later': 'Later years'};
  $('#timeline').innerHTML = Object.entries(eras).filter(([k]) => ISSUES.some(x => x.era === k)).map(([k, lbl]) => `<div class="era"><span class="era-n">${lbl}</span>${ISSUES.filter(x => x.era === k).map(x =>
    x.status === 'out' ? `<a class="tl" href="issue-${x.no}/"><b>#${x.no}</b><span>${x.year}</span></a>` : `<a class="tl soon" href="#rack"><b>#${x.no}</b><span>Soon</span></a>`).join('')}</div>`).join('');
  const all = ISSUES.filter(x => x.sources).flatMap(x => x.sources.map(([t, h]) => `<li>Issue #${x.no}: <a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a></li>`));
  $('#allSources').innerHTML = all.join('');
}

/* hover tilt */
if (!reduce && matchMedia('(hover:hover)').matches) document.addEventListener('pointermove', e => {
  document.querySelectorAll('.tilt').forEach(el => {
    const r = el.getBoundingClientRect(), inside = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
    if (!inside) { el.style.transform = ''; return; }
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) scale(1.03)`;
  });
});

/* copy link */
document.querySelectorAll('.badge.cp').forEach(b => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.url); b.textContent = 'Copied! ⚡'; }
  catch (e) { prompt('Copy this link:', b.dataset.url); }
  setTimeout(() => b.textContent = 'Copy link', 2000);
}));
/* native share on phones */
const sh = document.querySelector('.share');
if (sh && navigator.share) { const n = document.createElement('button'); n.type = 'button'; n.className = 'badge nat'; n.textContent = 'Share…';
  n.onclick = () => navigator.share({title: document.title, url: location.href}).catch(() => {}); sh.appendChild(n); }

/* visitor counter (Abacus, no cookies) */
if (COUNTER_URL && location.protocol.startsWith('http')) fetch(COUNTER_URL).then(r => r.ok ? r.json() : null).then(d => {
  if (d && typeof d.value === 'number') { $('#visitCount').textContent = d.value.toLocaleString('en-US'); $('#visits').hidden = false; }
}).catch(() => {});
})();

/* ===== Fan poll: "Vote for Issue #5!" =====
   Backend: Abacus (abacus.jasoncameron.dev), one public counter per option, no sign-up, no cookies.
   Repeat votes are blocked per browser with localStorage only: honor system, not fraud-proof. */
(() => {
const API = 'https://abacus.jasoncameron.dev', NS = 'aceisback-poll', LS = 'aceisback-vote-v1';
const OPTIONS = [
  {key: 'option-1', title: 'The Perfume Chug', year: 'Mid-70s', tease: 'Stuck in a limo with no booze. Someone mentions perfume contains alcohol. Down it goes.',
   src: 'https://faroutmagazine.co.uk/insane-story-of-when-ace-frehley-once-downed-a-bottle-of-perfume/'},
  {key: 'option-2', title: 'The Trout Player', year: 1979, tease: 'Live on network TV: “No, actually I’m a plumber!” Gene was not amused.',
   src: 'https://www.rollingstone.com/music/music-features/kiss-ace-frehley-laugh-interview-1235449092/'},
  {key: 'option-3', title: 'Close Encounters of the Ace Kind', year: 'Legend', tease: 'He woke half outside his front door, with a circle pressed into the lawn. (Ace’s own account.)',
   src: 'https://www.denofgeek.com/culture/kiss-guitarist-ace-frehley-claims-ufo-and-ghost-encounters/'},
  {key: 'option-4', title: 'Blinded in Paris', year: '70s', tease: 'Four bottles of champagne, asleep in silver face paint, and he woke up with his eyes swollen shut.',
   src: 'https://www.loudersound.com/news/frehley-i-feared-kiss-face-paint-made-me-blind'},
  {key: 'option-5', title: 'The Ghost Punch', year: 'Legend', tease: 'The Spaceman believed in ghosts, and says one hit him. (Ace’s own account.)',
   src: 'https://www.denofgeek.com/culture/kiss-guitarist-ace-frehley-claims-ufo-and-ghost-encounters/'}
];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mounts = document.querySelectorAll('.poll-mount'); if (!POLL_ENABLED || !mounts.length) { mounts.forEach(m => m.remove()); return; }
const voted = () => { try { return localStorage.getItem(LS); } catch (e) { return null; } };
const getJSON = (u, ms = 6000) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms);
  return fetch(u, {signal: c.signal, cache: 'no-store'}).then(r => r.ok ? r.json() : Promise.reject(r.status)).finally(() => clearTimeout(t)); };
const readAll = () => Promise.all(OPTIONS.map(o => getJSON(`${API}/get/${NS}/${o.key}`).then(d => +d.value || 0).catch(() => null)));

const shell = m => { m.classList.add('poll'); m.innerHTML = `
  <h2 class="sec"><span>Vote for Issue #5!</span></h2>
  <p class="sub">Issues #2–#4 are already on the editor’s desk. You pick which true tale becomes Issue #5. One vote per reader.</p>
  <div class="poll-grid">${OPTIONS.map((o, i) => `
    <button class="pcard" type="button" data-i="${i}">
      <span class="p-no">${String.fromCharCode(65 + i)}</span><span class="p-yr">${o.year}</span>
      <b class="p-t">${esc(o.title)}</b><span class="p-tease">${esc(o.tease)}</span>
      <span class="p-res" hidden><span class="p-bar"><i></i></span><span class="p-pct"></span></span>
      <span class="p-cta">Vote! ⚡</span>
    </button>`).join('')}</div>
  <p class="poll-msg" aria-live="polite"></p>
  <p class="poll-fine">Honor-system poll: votes are public counters at <a href="https://abacus.jasoncameron.dev" target="_blank" rel="noopener">Abacus</a>, and your browser remembers that you voted. No cookies, no tracking. All five stories are real and sourced; “Legend” means Ace’s own telling is the only source.</p>`; };
mounts.forEach(shell);

const show = (counts, mine) => mounts.forEach(m => {
  const ok = counts.every(c => c !== null), tot = ok ? counts.reduce((a, b) => a + b, 0) : 0, max = ok ? Math.max(...counts) : 0;
  m.classList.add('done');
  m.querySelectorAll('.pcard').forEach((b, i) => {
    b.disabled = true; b.classList.toggle('mine', OPTIONS[i].key === mine); b.classList.toggle('lead', ok && tot > 0 && counts[i] === max);
    const r = b.querySelector('.p-res'); r.hidden = !ok;
    if (ok) { const p = tot ? Math.round(counts[i] * 100 / tot) : 0; r.querySelector('i').style.width = p + '%'; r.querySelector('.p-pct').textContent = `${p}% · ${counts[i]} vote${counts[i] === 1 ? '' : 's'}`; }
    b.querySelector('.p-cta').textContent = OPTIONS[i].key === mine ? 'Your pick! ★' : '';
  });
  m.querySelector('.poll-msg').textContent = ok ? `KA-CHING! ${tot} vote${tot === 1 ? '' : 's'} so far.` : 'Your vote is saved, but the vote counter isn’t answering right now. Check back later for results.';
});

const mine = voted();
if (mine) readAll().then(c => show(c, mine));
document.addEventListener('click', e => {
  const b = e.target.closest('.pcard'); if (!b || b.disabled || voted()) return;
  const o = OPTIONS[+b.dataset.i];
  mounts.forEach(m => m.querySelectorAll('.pcard').forEach(x => x.disabled = true));
  mounts.forEach(m => m.querySelector('.poll-msg').textContent = 'Counting… ZZZAP!');
  getJSON(`${API}/hit/${NS}/${o.key}`).then(() => { try { localStorage.setItem(LS, o.key); } catch (e) {} return readAll(); })
    .then(c => show(c, o.key))
    .catch(() => { mounts.forEach(m => { m.querySelectorAll('.pcard').forEach(x => x.disabled = false); m.querySelector('.poll-msg').textContent = 'Whoops, the vote counter is offline right now. Please try again in a bit!'; }); });
});
})();
