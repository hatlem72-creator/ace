#!/usr/bin/env python3
"""Put the scripted BIZZ parody wordmark onto the blank-page art of the logo short (run from repo root).
Blank art lives in /workspace/outfits/logo/raw/*-blank.jpg; results go to img-src/logo/.
Ace's sketch (cover, reveal, wall) has two matching Z's; the polished final (ruler close-up) has mismatched Z's."""
import sys, math
sys.path.insert(0, "tools")
from PIL import Image, ImageDraw, ImageFilter, ImageChops
import bizz
RAW = "/workspace/outfits/logo/raw/"; OUT = "img-src/logo/"
def coeffs(dst, src):  # perspective coefficients mapping output (dst quad) -> input (src rect)
    import numpy as np
    A = []; b = []
    for (x, y), (u, v) in zip(dst, src):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; b += [u, v]
    return np.linalg.solve(np.array(A, float), np.array(b, float)).tolist()
def warp(art, size, quad, inset=(0.1, 0.3, 0.1, 0.3)):
    """place art inside quad (TL,TR,BR,BL) of an output image of size; inset = fraction of the quad left empty (l,t,r,b)"""
    l, t, r, bt = inset
    def lerp(p, q, k): return (p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k)
    def at(u, v):
        top = lerp(quad[0], quad[1], u); bot = lerp(quad[3], quad[2], u); return lerp(top, bot, v)
    dq = [at(l, t), at(1 - r, t), at(1 - r, 1 - bt), at(l, 1 - bt)]
    w, h = art.size
    return art.transform(size, Image.PERSPECTIVE, coeffs(dq, [(0, 0), (w, 0), (w, h), (0, h)]), Image.BICUBIC)
def paper_mask(im, thr):
    g = im.convert("L").point(lambda v: 255 if v > thr else 0)
    return g.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
def not_hand_mask(im):
    """everything except skin and dark ink/marker: lets hands and pens stay in front of the lettering"""
    import numpy as np
    a = np.asarray(im).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]; lum = (r * 3 + g * 6 + b) / 10
    skin = (r - b > 75) & (lum < 200); dark = lum < 70
    m = np.where(skin | dark, 0, 255).astype("uint8")
    return Image.fromarray(m).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1))
def comp(base, layer, mask=None, opacity=1.0):
    a = layer.getchannel("A")
    if mask is not None: a = ImageChops.multiply(a, mask)
    if opacity < 1: a = a.point(lambda v: int(v * opacity))
    out = base.copy(); out.paste(layer.convert("RGB"), (0, 0), a); return out
def glow(im, xy, r, strength=1.0):
    g = Image.new("L", im.size, 0); d = ImageDraw.Draw(g)
    for k in range(12, 0, -1):
        rr = r * k / 12; d.ellipse((xy[0] - rr, xy[1] - rr, xy[0] + rr, xy[1] + rr), fill=int(255 * (1 - k / 13) ** 1.6 * strength))
    g = g.filter(ImageFilter.GaussianBlur(r / 8))
    white = Image.new("RGB", im.size, (255, 248, 225)); return Image.composite(white, im, g)
# 1) COVER: Ace finishing his sketch on the table, spark at the marker tip
im = Image.open(RAW + "k01-cover-v2-blank.jpg").convert("RGB")
quad = [(79, 747), (335, 690), (460, 790), (270, 912)]
art = bizz.make(900)
lay = warp(art, im.size, quad, (0.06, 0.22, 0.32, 0.47))
hm = Image.new("L", im.size, 255)  # the drawing hand + marker stay in front (hand-traced polygon)
ImageDraw.Draw(hm).polygon([(296, 773), (316, 742), (334, 712), (346, 690), (370, 655), (480, 640), (480, 780), (400, 772), (352, 768), (318, 780)], fill=0)
im = comp(im, lay, hm.filter(ImageFilter.GaussianBlur(1.2)), 0.96)
im = glow(im, (301, 767), 28, 0.7)
im.save(OUT + "k01-cover.jpg", quality=95)
# 2) REVEAL: pad facing us, BIZZ big on the page, hands stay in front
im = Image.open(RAW + "k08-reveal-v2-blank.jpg").convert("RGB")
quad = [(217, 410), (372, 406), (408, 612), (260, 602)]
lay = warp(bizz.make(900), im.size, quad, (0.07, 0.05, 0.07, 0.635))
im = comp(im, lay, not_hand_mask(im))
im.save(OUT + "k10-reveal.jpg", quality=95)
# 3) RULER close-up: the polished final with mismatched Z's, a steel ruler below, red check marks
im = Image.open(RAW + "k10r-ruler-blank.jpg").convert("RGB")
art = bizz.make(560, final=True); x0, y0 = 360 - art.width // 2, 712 - art.height
lay = Image.new("RGBA", im.size, (0, 0, 0, 0)); lay.paste(art, (x0, y0), art)
d = ImageDraw.Draw(lay); RED = (230, 40, 40, 255); PEN = (60, 60, 70, 190)
# where are the two Z's? (design units -> pixels, same maths as bizz.make)
total = 58 + 19 + 58 + 68 + 30; pad = 9; sc = art.width / (total + 2 * pad)
z1 = (x0 + (pad + 58 + 10 + 19 + 10) * sc, x0 + (pad + 58 + 10 + 19 + 10 + 58) * sc)
z2 = (x0 + (pad + 58 + 10 + 19 + 10 + 58 + 10) * sc, x0 + (pad + 58 + 10 + 19 + 10 + 58 + 10 + 68) * sc)
for a, b, yy in ((z1[0], z1[1], y0 - 14), (z2[0], z2[1], y0 - 34)):  # width brackets above each Z
    d.line(((a, yy), (b, yy)), fill=RED, width=3); d.line(((a, yy - 9), (a, yy + 9)), fill=RED, width=3); d.line(((b, yy - 9), (b, yy + 9)), fill=RED, width=3)
for xx in (z1[1], z2[1]):  # dashed guide lines from the Z edges down to the ruler
    for yy in range(int(y0 - 40), 752, 12): d.line(((xx, yy), (xx, yy + 6)), fill=PEN, width=2)
d.line(((x0 - 10, y0 + 2), (x0 + art.width + 10, y0 + 2)), fill=(90, 120, 200, 120), width=1)  # faint pencil baselines
d.line(((x0 - 10, y0 + art.height - 6), (x0 + art.width + 10, y0 + art.height - 6)), fill=(90, 120, 200, 120), width=1)
im = comp(im, lay)
im.save(OUT + "k18-ruler.jpg", quality=95)
print("ok")
