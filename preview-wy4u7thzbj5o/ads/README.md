# Retro fake vinyl ads (reusable module)

Playful 1970s back-of-the-comic mail-order ads for **real records**. Files:

- `ads.js` – renders the ads (no dependencies).
- `ads.css` – the cheap-print look, all scoped under `.vad` so it never touches the host site's style.
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

1. **HUMOUR IS EXTREMELY IMPORTANT.** Every ad must be genuinely funny: cheeky 70s mail-order parody copy
   ("Guaranteed to SHOCK you! (Not literally. Please ground your amps.)", "Results not typical. Gull-wing doors sold separately."),
   silly fine print, fake testimonials from obviously made-up fans with invented names (never real people, and always tagged "made-up fan"),
   and jokes tied to the stories on the page. Affectionate toward the artist, never mean.
2. **The record facts are real.** Artist, title, label, year, the featured track and the Discogs master link must be checked; never invent them.
   The jokes go in `head`, `sub`, `body`, `quote` and `fine`; facts go in `artist`, `title`, `label`, `year`, `track`, `discogs`.
3. Every ad carries a small **"Fake ad · real record"** tag (shop: "real advice", coffee: "real coffee").
4. **Always include a "SUPPORT YOUR LOCAL RECORD SHOP!" ad**, linking to a record shop finder (https://recordstoreday.com/Stores).
5. No real album cover images, band logos or makeup designs. The sleeves are drawn by `ads.js` (SVG).
6. "Find this pressing" goes to the Discogs master page; "Spin it" is an optional YouTube or Spotify search.
7. Keep the ads out of story panels: shelf/home page, end pages and footers only.
8. The coffee ad stays hidden until `BMAC_URL` is set to an https:// link.
