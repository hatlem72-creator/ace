#!/usr/bin/env python3
"""Turn the raw illustrations in img-src/ into web images in img/.
img-src/hero.jpg, img-src/issue1-strip.jpg, img-src/issue1-cover.jpg (cover art without text)."""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageOps
F = os.path.join(os.path.dirname(__file__), "..", "ace-fonts", "Bangers.ttf")
F = F if os.path.exists(F) else "/workspace/ace-fonts/Bangers.ttf"
os.makedirs("img", exist_ok=True)
def save(im, name, maxw=1200):
    im = im.convert("RGB"); im.thumbnail((maxw, maxw))
    im.save(f"img/{name}.webp", "WEBP", quality=78, method=6)
    im.save(f"img/{name}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
def font(n): return ImageFont.truetype(F, n)
def outlined(d, xy, txt, f, fill, stroke=4, shadow=(0,0,0)):
    x, y = xy; d.text((x+5, y+5), txt, font=f, fill=shadow, stroke_width=stroke, stroke_fill=shadow); d.text((x, y), txt, font=f, fill=fill, stroke_width=stroke, stroke_fill=(0,0,0))
def share(src, out, line1, line2):
    im = ImageOps.fit(Image.open(src).convert("RGB"), (1200, 630), centering=(0.55, 0.5))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 1200, 92], fill=(232, 38, 45)); d.rectangle([0, 88, 1200, 96], fill=(0, 0, 0))
    outlined(d, (28, 12), line1, font(66), (255, 214, 10), 3)
    if line2:
        f = font(92); w = d.textlength(line2, font=f)
        x = (1200 - w) / 2; d.rectangle([x-24, 488, x+w+24, 600], fill=(255, 214, 10), outline=(0,0,0), width=6)
        d.text((x, 494), line2, font=f, fill=(232, 38, 45), stroke_width=3, stroke_fill=(0,0,0))
    im.save(f"img/{out}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
import json
if os.path.exists("img-src/hero.jpg"):
    save(Image.open("img-src/hero.jpg"), "hero", 1600); share("img-src/hero.jpg", "hero-share", "ACE IS BACK!  TRUE TALES", "")
for x in json.load(open("issues.json")):
    n = x["no"]
    if os.path.exists(f"img-src/issue{n}-strip.jpg"): save(Image.open(f"img-src/issue{n}-strip.jpg"), f"issue{n}-strip")
    if os.path.exists(f"img-src/issue{n}-cover.jpg"):
        save(Image.open(f"img-src/issue{n}-cover.jpg"), f"issue{n}-cover", 1000)
        share(f"img-src/issue{n}-cover.jpg", f"issue{n}-share", f"ACE IS BACK!  TRUE TALES  •  No. {n}", x["title"].upper())
for f in sorted(os.listdir("img")): print(f, os.path.getsize("img/" + f) // 1024, "KB")
