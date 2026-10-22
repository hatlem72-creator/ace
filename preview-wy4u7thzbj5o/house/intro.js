/* "Why no makeup?" house intro: inserted as page 1 of every comic reader, before the cover.
   Usage (before reader.js): <script src="../house/intro.js" data-img="shock"></script>
   data-img picks img/cnd/<name>.jpg|webp; without it the default (base) art is used, so new issues get the page for free.
   data-img="off" leaves it out. Tap, swipe, arrow keys or the button move on to the cover. */
(() => {
  const me = document.currentScript, track = document.getElementById('track');
  const name = (me && me.dataset.img) || 'base';
  if (!track || name === 'off') return;
  const dir = new URL('../img/cnd/', me.src).href;
  const s = document.createElement('section');
  s.className = 'page intro-page'; s.setAttribute('aria-label', 'Before we start: why no makeup?');
  s.innerHTML = `<div class="sheet"><div class="nomk">
    <h2 class="nomk-h">Why no makeup?</h2>
    <figure class="nomk-art">
      <picture><source srcset="${dir}${name}.webp" type="image/webp"><img src="${dir}${name}.jpg" width="1280" height="720" fetchpriority="high" decoding="async"
        alt="Comic panel: the masked rocker sweats as he holds up a big letter stamped CEASE AND DESIST, an envelope marked URGENT at his feet, while a giant shadow with a very long tongue looms behind him"
        onerror="if(!this.dataset.f){this.dataset.f=1;this.previousElementSibling.remove();this.src='${dir}base.jpg'}"></picture>
      <p class="nomk-say">The face paint and costumes belong to someone with very good lawyers. I like my mailbox empty.</p>
    </figure>
    <p class="nomk-fine"><b>The masked rocker is an invented stand-in.</b> All makeup, costumes and logos are trademarks of their owners. (The letter is a joke. Nobody sent us one. Let’s keep it that way.) Lover of muzak!</p>
  </div>
  <p class="nomk-go"><button type="button" class="nomk-skip">On with the story <span>→</span></button></p></div>`;
  track.insertBefore(s, track.firstElementChild);
  s.querySelector('.nomk-skip').addEventListener('click', e => { e.stopPropagation();
    dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true})); });
})();
