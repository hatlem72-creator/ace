#!/usr/bin/env python3
"""'Why no makeup?' intro panels: img-src/cnd/*.jpg -> preview img/cnd/ (run from repo root).
base = default for any issue without its own variant."""
import os
from PIL import Image
P = "preview-wy4u7thzbj5o"; R = "img-src/cnd"; OUT = P + "/img/cnd"
os.makedirs(OUT, exist_ok=True)
for n in ["base", "shock", "delorean", "rocket", "ufo"]:
    im = Image.open(f"{R}/{n}.jpg").convert("RGB")
    if im.width > 1280: im = im.resize((1280, round(im.height * 1280 / im.width)), Image.LANCZOS)
    im.save(f"{OUT}/{n}.webp", "WEBP", quality=66, method=6)
    im.save(f"{OUT}/{n}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
for x in sorted(os.listdir(OUT)): print(OUT + "/" + x, os.path.getsize(OUT + "/" + x) // 1024, "KB")
