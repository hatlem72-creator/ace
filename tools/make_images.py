#!/usr/bin/env python3
"""Issue #1 (Shock Me!, rebuilt) raw art in img-src/issue1/ -> web images in the preview folder (run from repo root)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps
P = "preview-wy4u7thzbj5o"; R = "img-src/issue1"; OUT = P + "/issue-1/img"; IMG = P + "/img"
os.makedirs(OUT, exist_ok=True)
for x in os.listdir(OUT): os.remove(os.path.join(OUT, x))   # old 2026-10-18 art is retired
F = "/workspace/ace-fonts/Bangers.ttf"
PANELS = ["cover", "s01-arena", "s02-backstage", "s03-perch", "s04-crowd", "s05-spin", "s06-touch", "s07-zap", "s08-gasp",
          "s09-fall", "s10-out", "s11-crew", "s12-dressing", "s13-chant", "s14-return", "s15-write", "s16-vocal"]
def save(im, path, w, q=64):
    im = im.convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path + ".webp", "WEBP", quality=q, method=6)
    im.save(path + ".jpg", "JPEG", quality=80, optimize=True, progressive=True)
for n in PANELS:
    save(Image.open(f"{R}/{n}.jpg"), f"{OUT}/{n}", 1280)
c = Image.open(f"{R}/cover.jpg").convert("RGB")  # share = the cover art (no masthead on the thumbnail)
save(ImageOps.fit(c, (540, 720), centering=(0.5, 0.5)), IMG + "/issue1-rack", 540)
s = ImageOps.fit(c, (1200, 630), centering=(0.5, 0.35)); d = ImageDraw.Draw(s)
def T(xy, t, size, fill, sw=4):
    f = ImageFont.truetype(F, size); x, y = xy
    d.text((x + 6, y + 6), t, font=f, fill=(0, 0, 0), stroke_width=sw, stroke_fill=(0, 0, 0)); d.text((x, y), t, font=f, fill=fill, stroke_width=sw, stroke_fill=(0, 0, 0))
f = ImageFont.truetype(F, 92); w = d.textlength("SHOCK ME!", font=f); T(((1200 - w) / 2, 516), "SHOCK ME!", 92, (255, 214, 10), 4)
s.save(IMG + "/issue1-share.jpg", "JPEG", quality=84, optimize=True, progressive=True)
for x in sorted(os.listdir(OUT)): print(OUT + "/" + x, os.path.getsize(OUT + "/" + x) // 1024, "KB")
