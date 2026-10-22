/* Fan poll "Vote for Issue #6!" — built, switched OFF. Set POLL_ENABLED = true and add <section class="poll-mount"></section> + <script src="poll.js"> to a page to use it. */
const POLL_ENABLED = false;
/* ===== Fan poll: "Vote for Issue #6!" =====
   Backend: Abacus (abacus.jasoncameron.dev), one public counter per option, no sign-up, no cookies.
   Repeat votes are blocked per browser with localStorage only: honor system, not fraud-proof. */
(() => {
const API = 'https://abacus.jasoncameron.dev', NS = 'aceisback-poll', LS = 'aceisback-vote-v1';
const OPTIONS = [
  {key: 'option-1', title: 'The Perfume Chug', year: 'Mid-70s', tease: 'Stuck in a limo with no booze. Someone mentions perfume contains alcohol. Down it goes.',
   src: 'https://faroutmagazine.co.uk/insane-story-of-when-ace-frehley-once-downed-a-bottle-of-perfume/'},
  {key: 'option-2', title: 'The Trout Player', year: 1979, tease: 'Live on network TV: “No, actually I’m a plumber!” Gene was not amused.',
   src: 'https://www.rollingstone.com/music/music-features/kiss-ace-frehley-laugh-interview-1235449092/'},
  {key: 'option-6', title: 'Half a Face', year: 1974, tease: 'Laps of the Hollywood Hills, a telephone pole, stitches, and a photo shoot with makeup on only half his face. So: profiles.',
   src: 'https://ultimateclassicrock.com/kiss-hotter-than-hell-album-cover/'},
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
  <h2 class="sec"><span>Vote for Issue #6!</span></h2>
  <p class="sub">Issues #1–#5 are out. You pick which true tale becomes Issue #6. One vote per reader.</p>
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
