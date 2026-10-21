#!/usr/bin/env python3
"""Issue #3 (rocket guitar) raw art in img-src/delorean/ -> web images in the preview folder (run from repo root)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps
P = "preview-wy4u7thzbj5o"; R = "img-src/rocket"; OUT = P + "/rocket-guitar/img"; IMG = P + "/img"
os.makedirs(OUT, exist_ok=True)
F = "/workspace/ace-fonts/Bangers.ttf"
PANELS = ["r01-shop", "r02-stuff", "r03-light", "r04-bench", "r05-glow", "r06-planb", "r07-heat", "r08-foomp",
          "r09-after", "r10-launcher", "r11-thumb", "r12-gene", "r13-finale", "cover"]
def save(im, path, w, q=64):
    im = im.convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path + ".webp", "WEBP", quality=q, method=6)
    im.save(path + ".jpg", "JPEG", quality=80, optimize=True, progressive=True)
for n in PANELS:
    save(Image.open(f"{R}/{n}.jpg"), f"{OUT}/{n}", 1280)
c = Image.open(f"{R}/cover.jpg").convert("RGB")
save(ImageOps.fit(c, (540, 720), centering=(0.42, 0.5)), IMG + "/issue3-rack", 540)
s = ImageOps.fit(c, (1200, 630), centering=(0.5, 0.45)); d = ImageDraw.Draw(s)
def T(xy, t, size, fill, sw=4):
    f = ImageFont.truetype(F, size); x, y = xy
    d.text((x + 6, y + 6), t, font=f, fill=(0, 0, 0), stroke_width=sw, stroke_fill=(0, 0, 0)); d.text((x, y), t, font=f, fill=fill, stroke_width=sw, stroke_fill=(0, 0, 0))
d.rectangle([0, 0, 1200, 84], fill=(10, 10, 14)); T((28, 12), "ACE IS BACK!  TRUE TALES  •  No. 3", 58, (255, 214, 10), 2)
f = ImageFont.truetype(F, 130); w = d.textlength("HOLY SMOKE!", font=f); T(((1200 - w) / 2, 470), "HOLY SMOKE!", 130, (255, 214, 10), 5)
s.save(IMG + "/issue3-share.jpg", "JPEG", quality=84, optimize=True, progressive=True)
for root in (OUT, IMG):
    for x in sorted(os.listdir(root)): print(root + "/" + x, os.path.getsize(root + "/" + x) // 1024, "KB")
