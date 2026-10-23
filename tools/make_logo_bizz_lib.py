"""Helpers shared by the logo-short overlay scripts."""
from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageFont, ImageOps
import numpy as np
import bizz
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

def place(im, art, cx, cy, mask=None, op=1.0, rot=0):
    if rot: art = art.rotate(rot, Image.BICUBIC, expand=True)
    lay = Image.new("RGBA", im.size, (0, 0, 0, 0)); lay.paste(art, (int(cx - art.width / 2), int(cy - art.height / 2)), art)
    return comp(im, lay, mask, op)
def bizz_I_x(art):  # x centre of the I in a bizz.make() image (same maths as bizz.make)
    total = 58 + 19 + 58 + 58 + 30; pad = 9; sc = art.width / (total + 2 * pad)
    return (pad + 58 + 10 + 9.5) * sc
def diamond(size, col=(235, 240, 248)):
    S = 4; w = size * S; im = Image.new("RGBA", (w * 2, w * 2), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = w
    d.polygon([(c, c - w * .55), (c + w * .38, c), (c, c + w * .55), (c - w * .38, c)], fill=(12, 10, 10, 255))
    d.polygon([(c, c - w * .44), (c + w * .28, c), (c, c + w * .44), (c - w * .28, c)], fill=col + (255,))
    d.polygon([(c, c - w * .44), (c + w * .28, c), (c, c)], fill=(255, 255, 255, 255))
    for a, b in (((c, c - w * .95), (c, c - w * .6)), ((c, c + w * .6), (c, c + w * .95)), ((c - w * .85, c), (c - w * .5, c)), ((c + w * .5, c), (c + w * .85, c))):
        d.line((a, b), fill=(255, 250, 220, 255), width=S * 2)
    return im.resize((w * 2 // S, w * 2 // S), Image.LANCZOS)
def dollar_upside_down(h, col=(222, 178, 60)):
    f = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(h * 1.15))
    im = Image.new("RGBA", (int(h * 1.2), int(h * 1.5)), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.text((im.width / 2, im.height / 2), "$", font=f, anchor="mm", fill=col + (255,), stroke_width=max(2, h // 28), stroke_fill=(30, 22, 10, 255))
    im = ImageOps.flip(im)  # flipped top-to-bottom: a $ turned 180 degrees looks unchanged, so it has to be mirrored to read as upside down
    a = np.asarray(im).astype(float); rng = np.random.default_rng(3)  # worn paint
    a[..., 3] *= np.clip(0.82 + rng.normal(0, 0.12, a.shape[:2]), 0.45, 1)
    return Image.fromarray(a.astype("uint8"))
def dark_front(im, thr=62):  # hair and other dark bits stay in front
    g = np.asarray(im.convert("L")); m = np.where(g < thr, 0, 255).astype("uint8")
    return Image.fromarray(m).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1))

