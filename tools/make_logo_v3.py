#!/usr/bin/env python3
"""The Logo! v3 (18 panels): script overlays + copies from /workspace/outfits/logo/raw/v3 into img-src/logo/ (run from repo root),
then run tools/make_logo.py. All lettering (BIZZ, parody brands, Gene's upside-down $) is drawn here, never by the image generator."""
import sys, subprocess
sys.path.insert(0, "tools")
from PIL import Image, ImageDraw, ImageFilter
import numpy as np, cv2
import bizz
from make_logo_bizz_lib import warp, not_hand_mask, comp, glow, place, dollar_upside_down, dark_front
V = "/workspace/outfits/logo/raw/v3/"; O = "img-src/logo/"
def load(n): return Image.open(V + n + ".jpg").convert("RGB")
def unpatch(im, spots):  # paint out brand-like ankle patches on the sneakers (plain canvas, no logos)
    a = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR); m = np.zeros(a.shape[:2], "uint8")
    for x, y, r in spots: cv2.circle(m, (x, y), r, 255, -1)
    return Image.fromarray(cv2.cvtColor(cv2.inpaint(a, m, 7, cv2.INPAINT_TELEA), cv2.COLOR_BGR2RGB))
def like(im, ref_xy, tol=46):  # mask of pixels close to a sampled board/paper colour (keeps people in front)
    a = np.asarray(im).astype(int); x, y = ref_xy; c = np.median(a[y - 4:y + 5, x - 4:x + 5].reshape(-1, 3), axis=0)
    m = (np.abs(a - c).sum(axis=2) < tol).astype("uint8") * 255
    return Image.fromarray(m).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1))
def save(im, n): im.save(O + n + ".jpg", quality=95)

# 1 cover: Ace's sketch on the pad, the marker hand stays in front
im = load("k01-cover-blank")
lay = warp(bizz.make(900), im.size, [(79, 747), (318, 696), (455, 815), (270, 912)], (0.06, 0.24, 0.30, 0.47))
hm = Image.new("L", im.size, 255)
ImageDraw.Draw(hm).polygon([(298, 762), (312, 735), (330, 708), (345, 690), (370, 650), (480, 630), (480, 790), (400, 776), (352, 770), (318, 772)], fill=0)
im = comp(im, lay, hm.filter(ImageFilter.GaussianBlur(1.2)), 0.96); im = glow(im, (301, 757), 26, 0.6); save(im, "k01-cover")
for n in ("k02-name", "k04-walk", "k06-lying", "k07-window", "k10-crowd", "k14-handoff", "k15-sofa", "k17-smug"):
    save(load(n), n)
# 3 Gene talks 'fancy': upside-down $ on his jeans jacket, hair stays in front
def hair_front(im):  # near-black, non-blue pixels (his hair) stay in front of the paint; the blue denim does not
    a = np.asarray(im).astype(int); lum = (a[..., 0] * 3 + a[..., 1] * 6 + a[..., 2]) / 10
    m = np.where((lum < 50) & (a[..., 2] - a[..., 0] < 22), 0, 255).astype("uint8")
    return Image.fromarray(m).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1))
im = load("k03-fancy-blank"); im = place(im, dollar_upside_down(104), 165, 572, hair_front(im), 0.93, rot=-2); save(im, "k03-fancy")
# 5 boxers panel: Dutch tilt
im = load("k05-sweat-raw"); W, H = im.size
r = im.rotate(6, Image.BICUBIC).resize((round(W * 1.17), round(H * 1.17)), Image.LANCZOS)
x, y = (r.width - W) // 2, (r.height - H) // 2; save(r.crop((x, y, x + W, y + H)), "k05-sweat")
# 8 wall of tries (filled by make_logo_wall.py from the blank wall)
subprocess.run([sys.executable, "tools/make_logo_wall.py", V + "k08-wall-blank.jpg", O + "k08-wall.jpg"], check=True)
# 9 the leap: finished sketch held overhead
im = unpatch(load("k09-leap-blank"), [(285, 1008, 13)])
lay = warp(bizz.make(900), im.size, [(138, 55), (570, 25), (593, 265), (150, 300)], (0.09, 0.22, 0.09, 0.24))
im = comp(im, lay, not_hand_mask(im)); save(im, "k09-leap")
# 11 stage: BIZZ in the light box, Gene's $ on the bassist's back
im = load("k11-stage-blank")
art = bizz.make(300); lay = Image.new("RGBA", im.size, (0, 0, 0, 0)); lay.paste(art, (451 - art.width // 2, 196 - art.height // 2), art)
im = glow(im, (451, 196), 120, 0.35); im = comp(im, lay)
im = place(im, dollar_upside_down(60), 384, 520, None, 0.95); save(im, "k11-stage")
# 12 dream: tiny BIZZ on the lapel button
im = load("k12-dream-blank"); im = place(im, bizz.make(30), 454, 406, None, 0.95); save(im, "k12-dream")
# 13 merch machine: BIZZ on the poster, tees, lunchboxes and poster stacks
im = unpatch(load("k13-merch-blank"), [(497, 1104, 13)])
for quad, inset, w in (([(369, 56), (685, 50), (685, 335), (369, 335)], (0.08, 0.28, 0.08, 0.28), 900),
                       ([(56, 890), (162, 906), (137, 962), (15, 944)], (0.12, 0.25, 0.12, 0.25), 500),
                       ([(50, 1010), (206, 1050), (187, 1144), (0, 1112)], (0.12, 0.28, 0.12, 0.28), 600)):
    im = comp(im, warp(bizz.make(w), im.size, quad, inset), not_hand_mask(im))
for cx, cy, w, rot in ((306, 810, 72, 3), (381, 748, 60, 3), (286, 897, 40, 0), (206, 989, 48, 0)):
    im = place(im, bizz.make(w * 3).resize((w, round(bizz.make(w * 3).height * w / (w * 3))), Image.LANCZOS), cx, cy, None, 0.97, rot=rot)
im = place(im, dollar_upside_down(56), 94, 492, hair_front(im), 0.95); save(im, "k13-merch")
save(load("k16-ruler"), "k16-ruler")  # ruler close-up: unchanged art (built earlier by make_logo_bizz.py)
# 18 billboards: parody brands drawn on the blank boards, people stay in front
im = unpatch(load("k18-billboards-blank"), [(300, 952, 10)]); im.save("/tmp/bb_in.jpg", quality=97)
subprocess.run([sys.executable, "tools/make_logo_billboards.py", "/tmp/bb_in.jpg", O + "k18-billboards.jpg"], check=True)
print("v3 ok")
