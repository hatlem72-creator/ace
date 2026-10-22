# Fake vinyl ads (reusable module)

Cool, modern, **image-first** ads for **real records**, with as few words as possible. Files:

- `ads.js` – renders the ads (no dependencies). Finds `img/` next to itself, so it works from any page depth.
- `ads.css` – the look, all scoped under `.vad` so it never touches the host site's style.
- `ads-data.js` – the per-site data: `BMAC_URL`, the records and the house ads. Only this file and `img/` change between sites.
- `img/` – one picture per ad, 960×540, as `.webp` plus a `.jpg` fallback (`img: "ad-love-gun"` in the data, no extension).

## Use

```html
<link rel="stylesheet" href="ads/ads.css">
<div data-vinyl-ad="love-gun" hidden></div>                  <!-- one record -->
<div data-vinyl-ad="ace-1978|space-invader|@extras" hidden></div>  <!-- random pick per visit; @extras = all wonky-70s extras -->
<div data-vinyl-ad="shop" hidden></div>                      <!-- STANDARD: support your local record shop -->
<div data-vinyl-ad="anywhere" hidden></div>                  <!-- STANDARD: "Buy vinyl. Anywhere!" -->
<div data-vinyl-ad="coffee" hidden></div>                    <!-- Buy Me a Coffee, auto-removed while BMAC_URL is "" -->
<script src="ads/ads-data.js"></script><script src="ads/ads.js"></script>
```

Banner slots (leaderboard, in-feed): add `class="vad-h"` to the slot div for the horizontal layout (stacks on narrow screens).
A labelled wrapper such as `<div class="slot" data-vinyl-slot><p>Advertisement · fake</p>…</div>` removes itself when its ad is hidden (e.g. coffee).
Wrap several in `<div class="vad-row" data-vinyl-ads-row>` for a responsive two-up row (a lone last card is centred);
the row removes itself if all its ads are hidden. Random slots on one page never repeat an ad while unused options remain. `?vad=<id>` forces that ad into the first random slot that allows it (for testing).

## House rules (all of his music sites)

1. **HUMOUR IS EXTREMELY IMPORTANT.** Every ad must be genuinely funny. The joke lives in the **picture** plus a short headline
   ("Please ground your amps.", "Do not extinguish.", "Take me to your vinyl.") and one line of fine print
   ("Gull-wing doors sold separately."). Tie the jokes to the stories on the page. Affectionate toward the artist, never mean.
2. **The record facts are real.** Artist, title, label, year, the featured track and the Discogs link must be checked; never invent them.
   Facts go in `artist`, `title`, `label`, `year`, `track`, `discogs`; jokes go in `head`, `fine` and the picture.
3. No "Fake ad" tag on the ads (removed at the user's request, 22 Oct 2026).
4. **Two standing house ads on every music site, always shown, never rotated out**, side by side on the shelf/home page:
   - **"Support your local record shop!"** – the run-down little shop by itself, **no people at all**, linking to a shop finder (https://recordstoreday.com/Stores).
   - **"Buy vinyl. Anywhere!"** – a wonky invented 1970s superfan beaming and proudly holding up **that site's artist's record**
     (generic stylised sleeve, no real cover art; the caption/alt names the artist), with homemade, wonky DIY fan face paint
     (Ace site: a hand-smeared silver lightning bolt on ONE cheek plus glitter; nothing around the eyes, no white base)
     that clearly does not copy any band member's makeup design. The button goes to the artist's Discogs artist page (verify the URL).
5. **Models are wonky people FROM THE 1970s**: quirky, odd, funny-faced, invented, never real or recognisable people.
   70s hair (perms, feathered hair, afros, mullets, big sideburns, moustaches), flares, wide collars, tinted aviators, polyester,
   70s interiors and colours (orange, brown, mustard, avocado). The photography is a 70s photo with modern punch; the layout stays modern.
   They promote vinyl, music, cassettes and **plastic straws** (a running joke). The comedy is their earnest reaction.
   Exception: the local record shop ad shows the shop only, **no people**.
6. **One strong image, minimum text.** No readable generated text in the pictures, no real album cover images, band logos, makeup designs or readable text in the pictures.
7. "Find this pressing" goes to the Discogs master page; "Spin it" is an optional YouTube or Spotify search.
8. Keep the ads out of story panels: shelf/home page, end pages and footers only.
9. The coffee ad stays hidden until `BMAC_URL` is set to an https:// link.
10. **ALL ad text is BOLD WHITE HELVETICA**: `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700 or 800; color: #fff`,
    for headlines, tags, facts, fine print and buttons (white text, white outlines). The accent colour is only light and glow, never text.
11. **Every ad signs off with the payoff "Lover of muzak!"** (with a z and the exclamation mark), in bold white Helvetica,
    as the last line at the bottom of the ad, always in the same place (`payoff` in the data; `.vad-payoff`).
12. Besides the record ads, every site rotates the **wonky-70s extras** (`extras` in the data, `@extras` in a slot):
    "Flip it.", "Rewind with a pencil.", "Suck it, paper.", "Mixtape = love letter.", "Louder.", "Bring a straw.", "Side B is better."

## Style (cool, not retro)

No 70s mail-order framing, coupons, halftone or "SEND NO MONEY". The look is a sleek, streaming-era ad that fits a dark, minimal site:

- the 16:9 photo is the ad: premium, moody, cinematic ad photography with one coloured light;
- headline in bold white Helvetica (800, tight tracking) set over the bottom of the photo, white outlined tag pill top-left;
- under the photo only: one small facts line, white outlined buttons ("Find this pressing →", "Spin it ▸"), one line of fine print,
  then the "Lover of muzak!" payoff under a hairline;
- dark card, 18px radius, hairline border; one accent per ad (`color` → `--ac`) only for the hover glow; slow zoom on hover,
  all motion off for `prefers-reduced-motion`.
