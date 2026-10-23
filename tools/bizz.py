#!/usr/bin/env python3
"""BIZZ: the invented parody wordmark for the logo short (crisp, scripted, never generated).
Bold blocky sharp-edged letters, tall angular B and I, Z's as sharp zigzags with FLAT top and bottom bars
(so they can never read as S-runes or S-bolts). Red fill with a light top shine, silver rim, black ink outline.
make(width, final=False) -> RGBA image. final=True = the polished version, whose two Z's are visibly mismatched (the last one wider and thicker), like the real logo's eyeballed S's. CLI: python3 bizz.py out.png [width]"""
import sys
from PIL import Image, ImageDraw
H = 100
B = ([(0, 0), (44, 0), (56, 12), (56, 40), (48, 49), (58, 58), (58, 88), (46, 100), (0, 100)],
     [[(17, 15), (36, 15), (40, 19), (40, 37), (36, 41), (17, 41)], [(17, 57), (38, 57), (42, 61), (42, 81), (38, 85), (17, 85)]])
I = ([(0, 0), (19, 0), (19, 100), (0, 100)], [])
Z = ([(0, 0), (56, 0), (56, 15), (20, 85), (58, 85), (58, 100), (0, 100), (0, 85), (36, 15), (0, 15)], [])
Z2 = ([(0, 0), (66, 0), (66, 20), (31, 80), (68, 80), (68, 100), (0, 100), (0, 80), (35, 20), (0, 20)], [])  # Paul's eyeballed one: wider, thicker bars, steeper stroke
WORD = [(B, 58), (I, 19), (Z, 58), (Z, 58)]
WORD_FINAL = [(B, 58), (I, 19), (Z, 58), (Z2, 68)]
def make(width, final=False, fill=(224, 30, 38), rim=(220, 226, 234), ink=(12, 10, 10), S=4):
    word = WORD_FINAL if final else WORD
    gap, pad = 10, 9
    total = sum(w for _, w in word) + gap * (len(word) - 1)
    sc = S * width / (total + 2 * pad); W, Hh = round((total + 2 * pad) * sc), round((H + 2 * pad) * sc)
    shapes = []; ox = pad
    for (outer, holes), w in word:
        shapes.append(([((ox + x) * sc, (pad + y) * sc) for x, y in outer], [[((ox + x) * sc, (pad + y) * sc) for x, y in h] for h in holes]))
        ox += w + gap
    out = Image.new("RGBA", (W, Hh), (0, 0, 0, 0)); d = ImageDraw.Draw(out)
    def layer(col, r):
        for outer, holes in shapes:
            d.polygon(outer, fill=col)
            if r: d.line(outer + [outer[0]], fill=col, width=int(2 * r * sc), joint="curve")
            for h in holes:
                if r: d.line(h + [h[0]], fill=col, width=int(2 * r * sc), joint="curve")
    layer(ink + (255,), 6.0); layer(rim + (255,), 3.0)
    # holes: punch inner area (inside the rim band)
    m = Image.new("L", (W, Hh), 0); md = ImageDraw.Draw(m)
    for outer, holes in shapes:
        md.polygon(outer, fill=255)
        for h in holes: md.polygon(h, fill=0)
    hole = Image.new("L", (W, Hh), 0); hd = ImageDraw.Draw(hole)
    for outer, holes in shapes:
        for h in holes:
            hd.polygon(h, fill=255); hd.line(h + [h[0]], fill=0, width=int(5 * sc), joint="curve")
    out.putalpha(Image.composite(Image.new("L", (W, Hh), 0), out.getchannel("A"), hole))
    grad = Image.new("RGBA", (W, Hh)); gd = ImageDraw.Draw(grad)
    for y in range(Hh):
        t = (y / sc - pad) / H; k = 0.16 if t < 0.36 else 0.0
        gd.line(((0, y), (W, y)), fill=tuple(int(c + (255 - c) * k) for c in fill) + (255,))
    out.paste(grad, (0, 0), m)
    for outer, holes in shapes:  # thin ink line around the holes
        for h in holes: d.line(h + [h[0]], fill=ink + (255,), width=int(2 * sc), joint="curve")
    return out.resize((max(1, W // S), max(1, Hh // S)), Image.LANCZOS)
if __name__ == "__main__":
    make(int(sys.argv[2]) if len(sys.argv) > 2 else 900, final=len(sys.argv) > 3).save(sys.argv[1] if len(sys.argv) > 1 else "/tmp/bizz.png")
