#!/usr/bin/env python3
"""Issue #5 (Room Service!) portrait raw art in img-src/room/ -> web images in the preview folder (run from repo root)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps
P = "preview-wy4u7thzbj5o"; R = "img-src/room"; OUT = P + "/room/img"; IMG = P + "/img"
os.makedirs(OUT, exist_ok=True)
F = "/workspace/ace-fonts/Bangers.ttf"
PANELS = ["r01-cover", "r02-arrival", "r03-bored", "r04-cable", "r05-drop", "r06-desk", "r07-hammer", "r08-wall", "r09-waiter", "r10-crossbow",
          "r11-darts", "r12-confiscate", "r13-flood", "r14-car", "r15-brake", "r16-roll", "r17-laugh", "r18-bunker", "r19-cheque", "r20-finale"]
def save(im, path, w, q=64):
    im = im.convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path + ".webp", "WEBP", quality=q, method=6)
    im.save(path + ".jpg", "JPEG", quality=80, optimize=True, progressive=True)
for n in PANELS:
    save(Image.open(f"{R}/{n}.jpg"), f"{OUT}/{n}", 720)
c = Image.open(f"{R}/r01-cover.jpg").convert("RGB")  # thumbnail/share = the cover panel (no masthead, no issue number, no price)
save(ImageOps.fit(c, (540, 720), centering=(0.5, 0.3)), IMG + "/issue5-rack", 540)
s = ImageOps.fit(c, (1200, 630), centering=(0.5, 0.12)); d = ImageDraw.Draw(s)
def T(xy, t, size, fill, sw=4):
    f = ImageFont.truetype(F, size); x, y = xy
    d.text((x + 6, y + 6), t, font=f, fill=(0, 0, 0), stroke_width=sw, stroke_fill=(0, 0, 0)); d.text((x, y), t, font=f, fill=fill, stroke_width=sw, stroke_fill=(0, 0, 0))
title = "ROOM SERVICE!"; size = 120
while ImageFont.truetype(F, size).getlength(title) > 1120: size -= 2
w = ImageFont.truetype(F, size).getlength(title); T(((1200 - w) / 2, 608 - size), title, size, (255, 214, 10), 4)
s.save(IMG + "/issue5-share.jpg", "JPEG", quality=84, optimize=True, progressive=True)
for root in (OUT, IMG):
    for x in sorted(os.listdir(root)):
        if root == OUT or x.startswith("issue5"): print(root + "/" + x, os.path.getsize(root + "/" + x) // 1024, "KB")
