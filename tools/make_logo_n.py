#!/usr/bin/env python3
"""Script overlays for the 20-panel rework of the logo short (run from repo root).
BIZZ wordmark, Gene's upside-down dollar sign, the button's diamond dot. Outputs go to /workspace/outfits/logo/raw/n*.jpg (final)."""
import sys
sys.path.insert(0, "tools")
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops, ImageOps
import numpy as np
import bizz
from make_logo_bizz_lib import warp, not_hand_mask, comp
RAW = "/workspace/outfits/logo/raw/"
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

# panel 3: Gene from the back, upside-down $ on the denim
im = Image.open(RAW + "n03-fancy-blank.jpg").convert("RGB")
im = place(im, dollar_upside_down(128), 160, 585, dark_front(im, 40), 0.95, rot=-3)
im.save(RAW + "n03-fancy.jpg", quality=95)
# panel 10: the button front: BIZZ (Ace's matching Z's) + the diamond dot over the I
im = Image.open(RAW + "n10-button-blank.jpg").convert("RGB")
art = bizz.make(226); cx, cy = 362, 598
im = place(im, art, cx, cy)
ix = cx - art.width / 2 + bizz_I_x(art)
im = place(im, diamond(30), ix, cy - art.height / 2 - 20)
im.save(RAW + "n10-button.jpg", quality=95)
# panel 12: the crowd and the sheet
im = Image.open(RAW + "n12-crowd-blank.jpg").convert("RGB")
im = place(im, bizz.make(470), 372, 790, not_hand_mask(im), 0.97, rot=1.5)
im.save(RAW + "n12-crowd.jpg", quality=95)
# panel 13: the club window banner gets BIZZ
im = Image.open(RAW + "n13-clubwindow-blank.jpg").convert("RGB")
art = bizz.make(330); im = place(im, art, 316, 298, None, 0.95)
im.save(RAW + "n13-clubwindow.jpg", quality=95)
# panel 14: tiny BIZZ on the dream lapel button
im = Image.open(RAW + "n14-dream-blank.jpg").convert("RGB")
im = place(im, bizz.make(30), 454, 406, None, 0.95)
im.save(RAW + "n14-dream.jpg", quality=95)
# panel 15: the flyer on the lamppost
im = Image.open(RAW + "n15-flyer-blank.jpg").convert("RGB")
quad = [(100, 212), (277, 228), (268, 556), (75, 544)]
lay = warp(bizz.make(700), im.size, quad, (0.1, 0.63, 0.12, 0.2))
im = comp(im, lay, not_hand_mask(im))
im.save(RAW + "n15-flyer.jpg", quality=95)
print("ok")
# reveal: crush the foreground band mates to pure silhouettes (the jeans edit left a little shading in them)
def crush(path, box, thr=78):
    im = Image.open(path).convert("RGB"); a = np.asarray(im).astype(int)
    lum = (a[..., 0] * 3 + a[..., 1] * 6 + a[..., 2]) / 10
    m = np.zeros(lum.shape, "uint8"); x0, y0, x1, y1 = box
    sub = lum[y0:y1, x0:x1] < thr; m[y0:y1, x0:x1] = np.where(sub, 255, 0)
    mi = Image.fromarray(m).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
    im.paste(Image.new("RGB", im.size, (8, 7, 9)), (0, 0), mi); im.save(path, quality=95)
# reveal: Gene is the silhouette on the right, so his upside-down $ shows faintly on his back
im = Image.open("img-src/logo/k10-reveal.jpg").convert("RGB")
im = place(im, dollar_upside_down(96, (200, 160, 60)), 620, 840, None, 0.8, rot=12)
im.save("img-src/logo/k10-reveal.jpg", quality=95)
print("reveal $")
# copy the finished art into img-src/logo/ under the story's panel names; panel 5 gets a Dutch tilt
O = "img-src/logo/"
for k, v in {"k02-name": "n02-name", "k03-fancy": "n03-fancy", "k04-walk": "n04-walk", "k06-lying": "n06-lying", "k07-window": "n07-window",
             "k09-eureka": "n09-eureka", "k11-button": "n10-button", "k12-crowd": "n12-crowd", "k13-window": "n13-clubwindow",
             "k14-dream": "n14-dream", "k15-flyer": "n15-flyer", "k16-handoff": "n16-handoff", "k19-smug": "n19-smug"}.items():
    Image.open(RAW + v + ".jpg").convert("RGB").save(O + k + ".jpg", quality=95)
im = Image.open(RAW + "n05-sweat-raw.jpg").convert("RGB"); W, H = im.size
r = im.rotate(6, Image.BICUBIC); r = r.resize((round(W * 1.17), round(H * 1.17)), Image.LANCZOS)
x, y = (r.width - W) // 2, (r.height - H) // 2; r.crop((x, y, x + W, y + H)).save(O + "k05-sweat.jpg", quality=95)
print("copied")
