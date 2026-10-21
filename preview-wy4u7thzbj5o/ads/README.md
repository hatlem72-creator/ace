# Fake vinyl ads (reusable module)

Cool, modern, deadpan-funny ads for **real records**. Files:

- `ads.js` – renders the ads (no dependencies).
- `ads.css` – the look, all scoped under `.vad` so it never touches the host site's style.
- `ads-data.js` – the per-site data: `BMAC_URL` and the records. Only this file changes between sites.

## Use

```html
<link rel="stylesheet" href="ads/ads.css">
<div data-vinyl-ad="love-gun" hidden></div>                  <!-- one record -->
<div data-vinyl-ad="ace-1978|space-invader" hidden></div>     <!-- random pick per visit -->
<div data-vinyl-ad="shop" hidden></div>                      <!-- local record shop ad -->
<div data-vinyl-ad="coffee" hidden></div>                    <!-- Buy Me a Coffee, auto-removed while BMAC_URL is "" -->
<script src="ads/ads-data.js"></script><script src="ads/ads.js"></script>
```

Wrap several in `<div class="vad-row" data-vinyl-ads-row>` for a responsive row; the row removes itself if all its ads are hidden.
`?vad=<record id>` in the page URL forces a record into every random slot (for testing).

## House rules (all of his music sites)

1. **HUMOUR IS EXTREMELY IMPORTANT.** Every ad must be genuinely funny: witty, modern, deadpan copy
   ("Grounded. Finally.", "Zero to 85 in one track.", "Results not typical. Gull-wing doors sold separately."),
   funny fine print, quotes from obviously made-up fans with invented names (never real people, always labelled "made-up fan"),
   and jokes tied to the stories on the page. Affectionate toward the artist, never mean.
2. **The record facts are real.** Artist, title, label, year, the featured track and the Discogs master link must be checked; never invent them.
   The jokes go in `head`, `sub`, `body`, `quote` and `fine`; facts go in `artist`, `title`, `label`, `year`, `track`, `discogs`.
3. Every ad carries a small **"Fake ad · real record"** tag (shop: "real advice", coffee: "real coffee").
4. **Always include a "SUPPORT YOUR LOCAL RECORD SHOP!" ad**, linking to a record shop finder (https://recordstoreday.com/Stores).
5. No real album cover images, band logos or makeup designs. The sleeves are drawn by `ads.js` (SVG).
6. "Find this pressing" goes to the Discogs master page; "Spin it" is an optional YouTube or Spotify search.
7. Keep the ads out of story panels: shelf/home page, end pages and footers only.
8. The coffee ad stays hidden until `BMAC_URL` is set to an https:// link.

## Style (not retro: cool)

The user asked for **cool, not retro**. No 70s mail-order framing, coupons, halftone or "SEND NO MONEY".
The look is a sleek record-label or streaming-era ad that fits a dark, minimal site:

- dark glossy card (`#0b0b0f` to `#17171e`), 20px radius, hairline border, soft sheen;
- one neon/chrome accent per ad (`color` in the data → `--ac`): tag pill, sub-line, button and hover glow;
- a spinning vinyl record (SVG + CSS), faster on hover, still for `prefers-reduced-motion`;
- bold modern type (Inter/system UI, 800 weight, tight tracking) with a chrome gradient on the headline;
- a pill "Find this pressing →" button and a ghost "Spin it ▸" link; fine print in small grey type.
