#!/usr/bin/env python3
# pipeline: tools/make_logo_bizz.py (cover, reveal, ruler), tools/make_logo_wall.py (wall), tools/make_logo_billboards.py RAW/k12-blank.jpg img-src/logo/k20-billboards.jpg, tools/make_logo_n.py (other overlays + copies), then this script
"""Logo short (The Logo!) portrait raw art in img-src/logo/ -> web images in the preview folder (run from repo root)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps
P = "preview-wy4u7thzbj5o"; R = "img-src/logo"; OUT = P + "/logo/img"; IMG = P + "/img"
os.makedirs(OUT, exist_ok=True)
F = "/workspace/ace-fonts/Bangers.ttf"
PANELS = ["k01-cover", "k02-name", "k03-fancy", "k04-walk", "k05-sweat", "k06-lying", "k07-window", "k08-wall", "k09-eureka", "k10-button", "k11-reveal", "k12-crowd", "k13-window", "k14-dream", "k15-flyer", "k16-handoff", "k17-sofa", "k18-ruler", "k19-smug", "k20-billboards"]
def save(im, path, w, q=64):
    im = im.convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path + ".webp", "WEBP", quality=q, method=6)
    im.save(path + ".jpg", "JPEG", quality=80, optimize=True, progressive=True)
for n in PANELS:
    save(Image.open(f"{R}/{n}.jpg"), f"{OUT}/{n}", 720)
c = Image.open(f"{R}/k01-cover.jpg").convert("RGB")  # thumbnail/share = the cover panel (no masthead, no issue number, no price)
save(ImageOps.fit(c, (540, 720), centering=(0.5, 0.3)), IMG + "/logo-rack", 540)
s = ImageOps.fit(c, (1200, 630), centering=(0.5, 0.42)); d = ImageDraw.Draw(s)
def T(xy, t, size, fill, sw=4):
    f = ImageFont.truetype(F, size); x, y = xy
    d.text((x + 6, y + 6), t, font=f, fill=(0, 0, 0), stroke_width=sw, stroke_fill=(0, 0, 0)); d.text((x, y), t, font=f, fill=fill, stroke_width=sw, stroke_fill=(0, 0, 0))
title = "THE LOGO!"; size = 120
while ImageFont.truetype(F, size).getlength(title) > 1120: size -= 2
w = ImageFont.truetype(F, size).getlength(title); T(((1200 - w) / 2, 608 - size), title, size, (255, 214, 10), 4)
s.save(IMG + "/logo-share.jpg", "JPEG", quality=84, optimize=True, progressive=True)
for root in (OUT, IMG):
    for x in sorted(os.listdir(root)):
        if root == OUT or x.startswith("logo"): print(root + "/" + x, os.path.getsize(root + "/" + x) // 1024, "KB")
