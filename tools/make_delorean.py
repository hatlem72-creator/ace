#!/usr/bin/env python3
"""Issue #2 (DeLorean) raw art in img-src/delorean/ -> web images in the preview folder (run from repo root)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps
P = "preview-wy4u7thzbj5o"; R = "img-src/delorean"; OUT = P + "/delorean/img"; IMG = P + "/img"
os.makedirs(OUT, exist_ok=True)
F = "/workspace/ace-fonts/Bangers.ttf"
PANELS = ["d01-open", "d01b-doors", "d02-driver", "d03-bump", "d03b-shrug", "d04-cop", "d06-close", "d07-vroom", "d08-speedo",
          "d09-pov", "d09b-parkway", "d10-roadblock", "d11-krunch", "d12-florist", "d12b-phone", "d13-busted", "d13b-booking", "d14-cell", "cover"]
def save(im, path, w, q=64):
    im = im.convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path + ".webp", "WEBP", quality=q, method=6)
    im.save(path + ".jpg", "JPEG", quality=80, optimize=True, progressive=True)
for n in PANELS:
    save(Image.open(f"{R}/{n}.jpg"), f"{OUT}/{n}", 1280)
c = Image.open(f"{R}/d14-cell.jpg").convert("RGB")  # thumbnail/share = the story's strongest panel (no masthead)
save(ImageOps.fit(c, (540, 720), centering=(0.5, 0.5)), IMG + "/issue2-rack", 540)
s = ImageOps.fit(c, (1200, 630), centering=(0.5, 0.4)); d = ImageDraw.Draw(s)
def T(xy, t, size, fill, sw=4):
    f = ImageFont.truetype(F, size); x, y = xy
    d.text((x + 6, y + 6), t, font=f, fill=(0, 0, 0), stroke_width=sw, stroke_fill=(0, 0, 0)); d.text((x, y), t, font=f, fill=fill, stroke_width=sw, stroke_fill=(0, 0, 0))
f = ImageFont.truetype(F, 92); w = d.textlength("GONE IN FIFTH GEAR!", font=f); T(((1200 - w) / 2, 516), "GONE IN FIFTH GEAR!", 92, (255, 214, 10), 4)
s.save(IMG + "/issue2-share.jpg", "JPEG", quality=84, optimize=True, progressive=True)
for root in (OUT, IMG):
    for x in sorted(os.listdir(root)): print(root + "/" + x, os.path.getsize(root + "/" + x) // 1024, "KB")
