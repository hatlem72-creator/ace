#!/usr/bin/env python3
"""Issue #4 (UFO) raw art in img-src/ufo/ -> web images in the preview folder (run from repo root)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps
P = "preview-wy4u7thzbj5o"; R = "img-src/ufo"; OUT = P + "/ufo/img"; IMG = P + "/img"
os.makedirs(OUT, exist_ok=True)
F = "/workspace/ace-fonts/Bangers.ttf"
PANELS = ["u01-cover", "u02-street", "u03-bbq", "u04-shades", "u05-zip", "u06-pilot", "u07-plane", "u08-watch", "u09-porch", "u10-glow",
          "u11-blackout", "u12-doorway", "u13-couch", "u14-circle", "u15-experts", "u16-hose", "u17-dream", "u18-coin", "u19-deli", "u20-finale"]
def save(im, path, w, q=64):
    im = im.convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path + ".webp", "WEBP", quality=q, method=6)
    im.save(path + ".jpg", "JPEG", quality=80, optimize=True, progressive=True)
for n in PANELS:
    save(Image.open(f"{R}/{n}.jpg"), f"{OUT}/{n}", 1280)
c = Image.open(f"{R}/u01-cover.jpg").convert("RGB")  # thumbnail/share = the cover panel (no masthead, no issue number, no price)
save(ImageOps.fit(c, (540, 720), centering=(0.5, 0.5)), IMG + "/issue4-rack", 540)
s = ImageOps.fit(c, (1200, 630), centering=(0.5, 0.35)); d = ImageDraw.Draw(s)
def T(xy, t, size, fill, sw=4):
    f = ImageFont.truetype(F, size); x, y = xy
    d.text((x + 6, y + 6), t, font=f, fill=(0, 0, 0), stroke_width=sw, stroke_fill=(0, 0, 0)); d.text((x, y), t, font=f, fill=fill, stroke_width=sw, stroke_fill=(0, 0, 0))
title = "CLOSE ENCOUNTERS OF THE YARD KIND!"; size = 92
while ImageFont.truetype(F, size).getlength(title) > 1120: size -= 2
w = ImageFont.truetype(F, size).getlength(title); T(((1200 - w) / 2, 608 - size), title, size, (255, 214, 10), 4)
s.save(IMG + "/issue4-share.jpg", "JPEG", quality=84, optimize=True, progressive=True)
for root in (OUT, IMG):
    for x in sorted(os.listdir(root)):
        if root == OUT or x.startswith("issue4"): print(root + "/" + x, os.path.getsize(root + "/" + x) // 1024, "KB")
