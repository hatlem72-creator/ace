"""Lit-bulb marquee version of the scripted BIZZ wordmark (bulbs sampled inside the bizz.py letter fill)."""
from PIL import Image, ImageDraw, ImageFilter, ImageChops
import numpy as np
import bizz
def bulbs(width, step=10, r=3.4, col=(255, 238, 178)):
    art = bizz.make(width); a = np.asarray(art).astype(int)
    fill = (a[..., 3] > 200) & (a[..., 0] > 150) & (a[..., 1] < 120)  # the red letter fill only
    H, W = fill.shape; lay = Image.new("RGB", (W, H), (0, 0, 0)); d = ImageDraw.Draw(lay)
    for y in range(step // 2, H, step):
        for x in range(step // 2, W, step):
            if fill[y, x]: d.ellipse((x - r, y - r, x + r, y + r), fill=col)
    halo = lay.filter(ImageFilter.GaussianBlur(7)); core = lay.filter(ImageFilter.GaussianBlur(0.6))
    return ImageChops.add(core, ImageChops.multiply(halo, Image.new("RGB", (W, H), (255, 190, 110))))
def screen_onto(im, light, cx, cy, back=0.5):
    """darken a soft panel behind the sign, then screen the bulbs on top"""
    W, H = light.size; x0, y0 = int(cx - W / 2), int(cy - H / 2)
    m = Image.new("L", im.size, 0); ImageDraw.Draw(m).rectangle((x0 - 6, y0 - 6, x0 + W + 6, y0 + H + 6), fill=int(255 * back))
    im = Image.composite(Image.new("RGB", im.size, (10, 8, 12)), im, m.filter(ImageFilter.GaussianBlur(14)))
    L = Image.new("RGB", im.size, (0, 0, 0)); L.paste(light, (x0, y0))
    return ImageChops.screen(im, L)
