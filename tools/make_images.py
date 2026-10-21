#!/usr/bin/env python3
"""Raw art in img-src/raw/ -> optimised web images in issue-1/img/ and img/ (run from repo root; writes into the preview folder)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps
P = "preview-wy4u7thzbj5o"; R = "img-src/raw"; OUT = P + "/issue-1/img"; IMG = P + "/img"; os.makedirs(OUT, exist_ok=True); os.makedirs(IMG, exist_ok=True)
F = "/workspace/ace-fonts/Bangers.ttf"
def save(im, path, w):
    im = im.convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path + ".webp", "WEBP", quality=70, method=6)
    im.save(path + ".jpg", "JPEG", quality=82, optimize=True, progressive=True)
for n in ["p1-arena", "p2-stage", "p3-boot", "p4-hand", "p5-zap", "p6-guitar", "p7-crew", "p8-show", "cover"]:
    save(Image.open(f"{R}/{n}.jpg"), f"{OUT}/{n}", 1280)
c = Image.open(f"{R}/p5-zap.jpg").convert("RGB")  # thumbnail/share = the story's strongest panel (no masthead)
# portrait crop for the shop rack (3:4)
save(ImageOps.fit(c, (540, 720), centering=(0.5, 0.5)), IMG + "/issue1-rack", 540)
# 1200x630 share image with banner
s = ImageOps.fit(c, (1200, 630), centering=(0.5, 0.4)); d = ImageDraw.Draw(s)
def T(xy, t, size, fill, sw=4):
    f = ImageFont.truetype(F, size); x, y = xy
    d.text((x + 6, y + 6), t, font=f, fill=(0, 0, 0), stroke_width=sw, stroke_fill=(0, 0, 0)); d.text((x, y), t, font=f, fill=fill, stroke_width=sw, stroke_fill=(0, 0, 0))
f = ImageFont.truetype(F, 92); w = d.textlength("SHOCK ME!", font=f); T(((1200 - w) / 2, 516), "SHOCK ME!", 92, (255, 214, 10), 4)
s.save(IMG + "/issue1-share.jpg", "JPEG", quality=84, optimize=True, progressive=True)
for root in (OUT, IMG):
    for x in sorted(os.listdir(root)): print(root + "/" + x, os.path.getsize(root + "/" + x) // 1024, "KB")
