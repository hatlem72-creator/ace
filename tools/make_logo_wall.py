#!/usr/bin/env python3
"""The wall of BIZZ test sketches (logo short): scripted lettering on the blank pinned sheets of the generated wall art.
Every sketch spells BIZZ (one has an upside-down Z on purpose); styles get closer to the final sharp BIZZ toward the centre sheet.
Run from repo root: writes img-src/logo/k08-wall.jpg"""
import sys, math, random
sys.path.insert(0, "tools")
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import bizz
random.seed(7)
G = "/usr/share/fonts/truetype/sand-box/google/"
F = {"bubbly": G + "Chewy/Chewy-Regular.ttf", "wobbly": G + "Caveat Brush/CaveatBrush-Regular.ttf", "disco": G + "Lobster/Lobster-Regular.ttf",
     "gothic": G + "UnifrakturMaguntia/UnifrakturMaguntia-Regular.ttf", "thin": G + "Barlow Condensed/BarlowCondensed-Thin.ttf",
     "neon": G + "Monoton/Monoton-Regular.ttf", "block": G + "Rubik Mono One/RubikMonoOne-Regular.ttf", "marker": G + "Permanent Marker/PermanentMarker-Regular.ttf",
     "heavy": G + "Shrikhand/Shrikhand-Regular.ttf", "round": G + "Righteous/Righteous-Regular.ttf", "pirate": G + "Pirata One/PirataOne-Regular.ttf"}
NOTE = G + "Caveat Brush/CaveatBrush-Regular.ttf"
RED = (214, 36, 36, 255); INK = (30, 28, 30, 255); PENCIL = (95, 95, 105, 235)
import sys
SRC, DST = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else ("/workspace/outfits/logo/raw/k08-wall-blank.jpg", "img-src/logo/k08-wall.jpg")
src = Image.open(SRC).convert("RGB"); W, H = src.size
a = np.asarray(src).astype(int); lum = a.mean(2); sat = a.max(2) - a.min(2)
paper = (lum > 150) & (sat < 75)
# connected components of paper on a 4x grid
s = 4; g = paper[: H // s * s, : W // s * s].reshape(H // s, s, W // s, s).mean((1, 3)) > 0.9
lab = np.zeros(g.shape, int); comps = []
for y0 in range(g.shape[0]):
    for x0 in range(g.shape[1]):
        if g[y0, x0] and not lab[y0, x0]:
            n = len(comps) + 1; st = [(y0, x0)]; lab[y0, x0] = n; pts = []
            while st:
                y, x = st.pop(); pts.append((y, x))
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < g.shape[0] and 0 <= xx < g.shape[1] and g[yy, xx] and not lab[yy, xx]: lab[yy, xx] = n; st.append((yy, xx))
            ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
            comps.append((len(pts), min(xs) * s, min(ys) * s, (max(xs) + 1) * s, (max(ys) + 1) * s))
sheets = [c for c in comps if c[0] > 250 and (c[3] - c[1]) > 50 and (c[4] - c[2]) > 50]
cx, cy = W * 0.42, H * 0.38
sheets.sort(key=lambda c: -math.hypot((c[1] + c[3]) / 2 - cx, (c[2] + c[4]) / 2 - cy))  # far ones first, centre last
print(len(sheets), "sheets")
def fit_text(d, box, t, path, fill, rot=0, stroke=0):
    x0, y0, x1, y1 = box; bw, bh = x1 - x0, y1 - y0
    size = 200
    while size > 8:
        f = ImageFont.truetype(path, size); bb = d.textbbox((0, 0), t, font=f, stroke_width=stroke)
        if bb[2] - bb[0] <= bw and bb[3] - bb[1] <= bh: break
        size -= 2
    tile = Image.new("RGBA", (bw + 40, bh + 40), (0, 0, 0, 0)); td = ImageDraw.Draw(tile)
    bb = td.textbbox((0, 0), t, font=f, stroke_width=stroke)
    td.text(((bw + 40 - (bb[2] - bb[0])) / 2 - bb[0], (bh + 40 - (bb[3] - bb[1])) / 2 - bb[1]), t, font=f, fill=fill, stroke_width=stroke, stroke_fill=INK)
    tile = tile.rotate(rot, Image.BICUBIC)
    return tile, (x0 - 20, y0 - 20)
def note(d, xy, t, size=20, col=RED, rot=0, maxw=None):
    f = ImageFont.truetype(NOTE, size)
    while maxw and d.textlength(t, font=f) > maxw and size > 9: size -= 1; f = ImageFont.truetype(NOTE, size)
    d.text(xy, t, font=f, fill=col)
def cross(d, b, w=4):
    x0, y0, x1, y1 = b; d.line(((x0, y0), (x1, y1)), fill=RED, width=w); d.line(((x1, y0), (x0, y1)), fill=RED, width=w)
lay = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
STYLES = [("bubbly", (240, 140, 40, 255), 0, None), ("wobbly", PENCIL, 0, None), ("disco", (200, 60, 160, 255), 0, None),
          ("pirate", (110, 30, 30, 255), 0, "x"), ("thin", PENCIL, 0, "TOO THIN"), ("neon", (60, 120, 220, 255), 0, None),
          ("updown", INK, 0, "?!"), ("heavy", (120, 70, 40, 255), 0, "x"), ("round", (40, 140, 90, 255), 0, None),
          ("disco", INK, 0, "x"), ("bubbly", (230, 60, 60, 255), 0, "FANCY??"), ("wobbly", INK, 0, "x"),
          ("block", INK, 0, None), ("marker", (200, 30, 30, 255), 0, "MORE SHARP!"), ("near", None, 0, None)]
n = len(sheets); picks = STYLES[: max(0, n - 1)]
while len(picks) < n - 1: picks.insert(0, random.choice(STYLES[:12]))
for (area, x0, y0, x1, y1), st in zip(sheets[:-1], picks[-(n - 1):] if n > 1 else []):
    bw, bh = x1 - x0, y1 - y0; m = int(min(bw, bh) * 0.12)
    box = (x0 + m, y0 + m + int(bh * 0.12), x1 - m, y0 + int(bh * 0.58))
    name, col, _, extra = st; rot = random.uniform(-6, 6)
    if name == "near":
        art = bizz.make(int((box[2] - box[0]) * 0.95)).rotate(rot * 0.5, Image.BICUBIC, expand=True)
        lay.alpha_composite(art, (box[0], box[1]))
    elif name == "updown":  # every letter at a crazy angle (still spells BIZZ)
        lw = (box[2] - box[0]) // 4; lh = box[3] - box[1]; f = ImageFont.truetype(F["block"], int(min(lw, lh) * 0.95))
        for i, ch in enumerate("BIZZ"):
            t = Image.new("RGBA", (lw * 2, lw * 2), (0, 0, 0, 0)); td = ImageDraw.Draw(t); tb = td.textbbox((0, 0), ch, font=f)
            td.text((lw - (tb[0] + tb[2]) / 2, lw - (tb[1] + tb[3]) / 2), ch, font=f, fill=col)
            t = t.rotate((-28, 22, -14, 34)[i], Image.BICUBIC)
            lay.alpha_composite(t, (box[0] + i * lw - lw // 2, box[1] + lh // 2 - lw + (6, -8, 10, -4)[i]))
    else:
        tile, pos = fit_text(d, box, "BIZZ", F[name], col, rot, stroke=2 if name in ("bubbly", "heavy", "round") else 0)
        lay.alpha_composite(tile, pos)
    if extra == "x": cross(d, (x0 + m, y0 + m, x1 - m, y0 + int(bh * 0.66)))
    elif extra: note(d, (x0 + m, y0 + int(bh * 0.62)), extra, size=max(14, int(bh * 0.15)), rot=rot, maxw=bw - 2 * m)
# centre sheet: Ace's final sketch, circled, with an arrow
area, x0, y0, x1, y1 = sheets[-1]; bw, bh = x1 - x0, y1 - y0
art = bizz.make(int(bw * 0.86)); ax, ay = x0 + (bw - art.width) // 2, y0 + int(bh * 0.30)
lay.alpha_composite(art, (ax, ay))
d.ellipse((ax - 14, ay - 18, ax + art.width + 14, ay + art.height + 18), outline=RED, width=4)
note(d, (x0 + int(bw * 0.30), ay + art.height + 24), "YES!!", size=int(bh * 0.11))
# keep the rocker (dark/skin) in front: only paint on paper-ish pixels
mask = Image.fromarray(np.where(paper | ((lum > 140) & (sat < 70)), 255, 0).astype("uint8")).filter(ImageFilter.GaussianBlur(0.8))
alpha = Image.fromarray((np.asarray(lay.getchannel("A")).astype(int) * np.asarray(mask).astype(int) // 255).astype("uint8"))
out = src.copy(); out.paste(lay.convert("RGB"), (0, 0), alpha.filter(ImageFilter.GaussianBlur(0.3)))
out.save(DST, quality=95); print("wrote", DST, [s[1:] for s in sheets[-3:]])
