#!/usr/bin/env python3
"""Paint the parody billboards (NIKKY / Coca-Cooler / Apfel) onto the blank-billboard art for the logo short's last panel.
All three are invented parodies: a droopy BACKWARDS noodle swoosh, an ice-cube mascot, a bitten LEMON. Usage: make_logo_billboards.py in.jpg out.jpg"""
import sys, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
G = "/usr/share/fonts/truetype/sand-box/google/"
ANT = G + "Antonio/Antonio-VariableFont_wght.ttf"; OLEO = G + "Oleo Script/OleoScript-Bold.ttf"
src, out = sys.argv[1], sys.argv[2]
base = Image.open(src).convert("RGB")
S = 3  # supersample
L = Image.new("RGBA", (base.width * S, base.height * S), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
def font(p, size, wght=None):
    f = ImageFont.truetype(p, size * S)
    if wght:
        try: f.set_variation_by_axes([wght])
        except Exception: pass
    return f
def text_center(cx, cy, t, f, fill, stroke=0, sf=None):
    w = d.textlength(t, font=f); bb = d.textbbox((0, 0), t, font=f)
    d.text((cx * S - w / 2, cy * S - (bb[1] + bb[3]) / 2), t, font=f, fill=fill, stroke_width=stroke * S, stroke_fill=sf)
K = (18, 16, 14, 255)
# 1) NIKKY: white board (190,83)-(525,257)
text_center(357, 140, "NIKKY", font(ANT, 78, 700), K)
# backwards, wobbly swoosh: a crescent mirrored left-right (tail tip at top LEFT, fat end at bottom RIGHT)
lower, upper = [], []
for i in range(41):
    t = i / 40
    x = 236 + 238 * t
    lower.append((x, 176 + 58 * math.sin(t * math.pi * 0.62) + 3 * math.sin(t * 13)))
    upper.append((x, 176 + 40 * math.sin(t * math.pi * 0.55) - 14 * t * t + 3 * math.sin(t * 11 + 1)))
poly = lower + [(478, 200)] + upper[::-1]
d.polygon([(x * S, y * S) for x, y in poly], fill=K)
d.rounded_rectangle((423 * S, 222 * S, 429 * S, 244 * S), radius=3 * S, fill=K)  # one drip
d.ellipse((421 * S, 240 * S, 431 * S, 250 * S), fill=K)
# 2) Coca-Cooler: cream board (185,294)-(532,483)
RED = (214, 32, 39, 255)
text_center(330, 372, "Coca-Cooler", font(OLEO, 56), RED)
d.line(((215) * S, 420 * S, 440 * S, 412 * S), fill=RED, width=5 * S)
cx, cy = 482, 440  # ice-cube mascot with shades
d.rounded_rectangle(((cx - 30) * S, (cy - 30) * S, (cx + 30) * S, (cy + 30) * S), radius=10 * S, fill=(190, 228, 245, 255), outline=K, width=3 * S)
d.line(((cx - 20) * S, (cy - 18) * S, (cx - 6) * S, (cy - 24) * S), fill=(255, 255, 255, 255), width=4 * S)
for ex in (-13, 13): d.rounded_rectangle(((cx + ex - 11) * S, (cy - 8) * S, (cx + ex + 11) * S, (cy + 4) * S), radius=4 * S, fill=K)
d.line(((cx - 2) * S, (cy - 4) * S, (cx + 2) * S, (cy - 4) * S), fill=K, width=3 * S)
d.arc(((cx - 10) * S, (cy + 2) * S, (cx + 10) * S, (cy + 18) * S), 20, 160, fill=K, width=3 * S)
# 3) Apfel: grey board (166,510)-(546,719); keep clear of his head (x 300-412, y > 640)
lx, ly = 222, 618  # bitten LEMON, upright, yellow with ink outline, pointy nubs top and bottom
def lemon(o, fill):
    d.ellipse(((lx - 44 - o) * S, (ly - 56 - o) * S, (lx + 44 + o) * S, (ly + 56 + o) * S), fill=fill)
    d.polygon([((lx - 13 - o) * S, (ly - 50) * S), (lx * S, (ly - 72 - o) * S), ((lx + 13 + o) * S, (ly - 50) * S)], fill=fill)
    d.polygon([((lx - 13 - o) * S, (ly + 50) * S), (lx * S, (ly + 72 + o) * S), ((lx + 13 + o) * S, (ly + 50) * S)], fill=fill)
lemon(3, K); lemon(0, (250, 214, 40, 255))
d.ellipse(((lx - 26) * S, (ly - 34) * S, (lx - 8) * S, (ly - 8) * S), fill=(255, 245, 170, 255))  # shine
d.polygon([((lx + 2) * S, (ly - 66) * S), ((lx + 20) * S, (ly - 92) * S), ((lx + 42) * S, (ly - 90) * S), ((lx + 26) * S, (ly - 70) * S)], fill=(60, 150, 60, 255), outline=K)  # leaf
import statistics
sm = [base.getpixel((x, y)) for x in range(lx + 70, lx + 110, 3) for y in range(ly - 40, ly + 40, 3)]
GREY = tuple(int(statistics.median(c[i] for c in sm)) for i in range(3)) + (255,)
d.ellipse(((lx + 30) * S, (ly - 24) * S, (lx + 66) * S, (ly + 12) * S), fill=(0, 0, 0, 0))  # the bite, on the right side (clears the layer, board texture shows through)
text_center(452, 566, "Apfel", font(ANT, 74, 250), K)
L = L.resize(base.size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.4))
import numpy as np
A = np.asarray(base).astype(int); keep = np.zeros(A.shape[:2], bool)
for (x0, y0, x1, y1), (sx, sy) in (((185, 77, 527, 265), (200, 100)), ((178, 287, 535, 487), (200, 300)), ((169, 512, 544, 719), (190, 530))):
    c = np.median(A[sy - 4:sy + 5, sx - 4:sx + 5].reshape(-1, 3), axis=0); sub = np.abs(A[y0:y1, x0:x1] - c).sum(axis=2) < 100
    keep[y0:y1, x0:x1] = sub  # only paint where the board shows, so anyone standing in front stays in front
km = Image.fromarray((keep * 255).astype("uint8")).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.GaussianBlur(1))
from PIL import ImageChops
base.paste(L, (0, 0), ImageChops.multiply(L.getchannel("A"), km))
base.save(out, quality=95); print("wrote", out)
