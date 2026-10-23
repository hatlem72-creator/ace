"""Helpers shared by the logo-short overlay scripts."""
from PIL import Image, ImageDraw, ImageFilter, ImageChops
def coeffs(dst, src):  # perspective coefficients mapping output (dst quad) -> input (src rect)
    import numpy as np
    A = []; b = []
    for (x, y), (u, v) in zip(dst, src):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; b += [u, v]
    return np.linalg.solve(np.array(A, float), np.array(b, float)).tolist()
def warp(art, size, quad, inset=(0.1, 0.3, 0.1, 0.3)):
    """place art inside quad (TL,TR,BR,BL) of an output image of size; inset = fraction of the quad left empty (l,t,r,b)"""
    l, t, r, bt = inset
    def lerp(p, q, k): return (p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k)
    def at(u, v):
        top = lerp(quad[0], quad[1], u); bot = lerp(quad[3], quad[2], u); return lerp(top, bot, v)
    dq = [at(l, t), at(1 - r, t), at(1 - r, 1 - bt), at(l, 1 - bt)]
    w, h = art.size
    return art.transform(size, Image.PERSPECTIVE, coeffs(dq, [(0, 0), (w, 0), (w, h), (0, h)]), Image.BICUBIC)
def paper_mask(im, thr):
    g = im.convert("L").point(lambda v: 255 if v > thr else 0)
    return g.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
def not_hand_mask(im):
    """everything except skin and dark ink/marker: lets hands and pens stay in front of the lettering"""
    import numpy as np
    a = np.asarray(im).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]; lum = (r * 3 + g * 6 + b) / 10
    skin = (r - b > 75) & (lum < 200); dark = lum < 70
    m = np.where(skin | dark, 0, 255).astype("uint8")
    return Image.fromarray(m).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1))
def comp(base, layer, mask=None, opacity=1.0):
    a = layer.getchannel("A")
    if mask is not None: a = ImageChops.multiply(a, mask)
    if opacity < 1: a = a.point(lambda v: int(v * opacity))
    out = base.copy(); out.paste(layer.convert("RGB"), (0, 0), a); return out
def glow(im, xy, r, strength=1.0):
    g = Image.new("L", im.size, 0); d = ImageDraw.Draw(g)
    for k in range(12, 0, -1):
        rr = r * k / 12; d.ellipse((xy[0] - rr, xy[1] - rr, xy[0] + rr, xy[1] + rr), fill=int(255 * (1 - k / 13) ** 1.6 * strength))
    g = g.filter(ImageFilter.GaussianBlur(r / 8))
    white = Image.new("RGB", im.size, (255, 248, 225)); return Image.composite(white, im, g)
