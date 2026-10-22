#!/usr/bin/env python3
"""Issue #4 (UFO) PORTRAIT remake: img-src/ufo-v2/*.jpg (720x1280) -> preview ufo-v2/img (run from repo root).
Old landscape art stays in img-src/ufo/ (backup copy in img-src/ufo_landscape/)."""
import os
from PIL import Image
P = "preview-wy4u7thzbj5o"; R = "img-src/ufo-v2"; OUT = P + "/ufo-v2/img"
os.makedirs(OUT, exist_ok=True)
for f in sorted(os.listdir(R)):
    if not f.endswith(".jpg"): continue
    im = Image.open(f"{R}/{f}").convert("RGB")
    if im.width > 720: im = im.resize((720, round(im.height * 720 / im.width)), Image.LANCZOS)
    n = f[:-4]; im.save(f"{OUT}/{n}.webp", "WEBP", quality=64, method=6); im.save(f"{OUT}/{n}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
for x in sorted(os.listdir(OUT)): print(OUT + "/" + x, os.path.getsize(OUT + "/" + x) // 1024, "KB")
