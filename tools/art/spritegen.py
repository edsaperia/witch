"""Cheap-and-cheerful procedural pixel sprites for Witch: an experiment.

Sprites are built as material maps (which pixel is body, belly, leaf, trunk...),
then a *style* turns materials into colour: palette ramps, banded shading from a
light direction, outline. The same map can therefore be redrawn in any style, and
the shape gives a normal map for free, so sprites can be lit by coloured lights.
"""
import math, random, colorsys
from PIL import Image, ImageDraw, ImageFont

EMPTY, BODY, BELLY, ACCENT, EYE, GLINT, TRUNK, LEAF, LEAF2, CLOTH, SKIN, HAIR, BROOM, STRAW, BERRY = range(15)
FLAT = {EYE, GLINT}  # materials drawn without shading


class Sprite:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.m = [[EMPTY] * w for _ in range(h)]

    def set(self, x, y, mat):
        if 0 <= x < self.w and 0 <= y < self.h:
            self.m[y][x] = mat

    def get(self, x, y):
        return self.m[y][x] if 0 <= x < self.w and 0 <= y < self.h else EMPTY

    def ellipse(self, cx, cy, rx, ry, mat, only_on=None):
        for y in range(self.h):
            for x in range(self.w):
                if ((x + .5 - cx) / rx) ** 2 + ((y + .5 - cy) / ry) ** 2 <= 1:
                    if only_on is None or self.m[y][x] in only_on:
                        self.m[y][x] = mat

    def rect(self, x0, y0, x1, y1, mat):
        for y in range(y0, y1):
            for x in range(x0, x1):
                self.set(x, y, mat)

    def tri(self, pts, mat):
        (ax, ay), (bx, by), (cx, cy) = pts
        def s(px, py, x1, y1, x2, y2):
            return (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2)
        for y in range(self.h):
            for x in range(self.w):
                px, py = x + .5, y + .5
                d1, d2, d3 = s(px, py, ax, ay, bx, by), s(px, py, bx, by, cx, cy), s(px, py, cx, cy, ax, ay)
                if not ((d1 < 0 or d2 < 0 or d3 < 0) and (d1 > 0 or d2 > 0 or d3 > 0)):
                    self.set(x, y, mat)

    def mask(self):
        return [[self.m[y][x] != EMPTY for x in range(self.w)] for y in range(self.h)]


# ---------- shape -> height -> normals ----------

def heights(sp):
    """Distance to the silhouette's edge, as a dome height in 0..1."""
    INF = 99
    d = [[0 if not sp.m[y][x] else INF for x in range(sp.w)] for y in range(sp.h)]
    for _ in range(2):  # two-pass chamfer, forward then back
        for y in range(sp.h):
            for x in range(sp.w):
                if d[y][x]:
                    for dx, dy, c in ((-1, 0, 1), (0, -1, 1), (-1, -1, 1.4), (1, -1, 1.4)):
                        nx, ny = x + dx, y + dy
                        v = d[ny][nx] if 0 <= nx < sp.w and 0 <= ny < sp.h else 0
                        d[y][x] = min(d[y][x], v + c)
        for y in reversed(range(sp.h)):
            for x in reversed(range(sp.w)):
                if d[y][x]:
                    for dx, dy, c in ((1, 0, 1), (0, 1, 1), (1, 1, 1.4), (-1, 1, 1.4)):
                        nx, ny = x + dx, y + dy
                        v = d[ny][nx] if 0 <= nx < sp.w and 0 <= ny < sp.h else 0
                        d[y][x] = min(d[y][x], v + c)
    mx = max(max(r) for r in d) or 1
    return [[math.sqrt(min(v, mx) / mx) for v in r] for r in d]


def normals(sp):
    h = heights(sp)
    out = [[(0, 0, 1)] * sp.w for _ in range(sp.h)]
    k = 2.2
    for y in range(sp.h):
        for x in range(sp.w):
            if not sp.m[y][x]:
                continue
            g = lambda xx, yy: h[yy][xx] if 0 <= xx < sp.w and 0 <= yy < sp.h else 0
            nx = (g(x - 1, y) - g(x + 1, y)) * k
            ny = (g(x, y - 1) - g(x, y + 1)) * k
            l = math.sqrt(nx * nx + ny * ny + 1)
            out[y][x] = (nx / l, ny / l, 1 / l)
    return out


# ---------- styles ----------

def ramp(rgb, n, hue_shift, sat, val_lo, val_hi):
    """A palette ramp: shadows cooler and darker, highlights warmer and lighter."""
    h, s, v = colorsys.rgb_to_hsv(*[c / 255 for c in rgb])
    cols = []
    for i in range(n):
        t = i / (n - 1)
        hh = (h + (t - .5) * hue_shift) % 1
        ss = max(0, min(1, s * sat * (1.15 - .35 * t)))
        vv = val_lo + (val_hi - val_lo) * t
        cols.append(tuple(int(c * 255) for c in colorsys.hsv_to_rgb(hh, ss, vv)))
    return cols


STYLES = {
    "mossy dusk": dict(bands=3, hue_shift=-.10, sat=.85, val=(.22, .78), outline=(24, 18, 34), light=(-.6, -.7, .55)),
    "bright storybook": dict(bands=4, hue_shift=-.06, sat=1.0, val=(.42, 1.0), outline="darken", light=(-.6, -.7, .55)),
}


def render(sp, colours, style, scale=1, lights=None):
    st = STYLES[style]
    nm = normals(sp)
    lx, ly, lz = st["light"]
    ll = math.sqrt(lx * lx + ly * ly + lz * lz)
    L = (lx / ll, ly / ll, lz / ll)
    ramps = {m: ramp(c, st["bands"], st["hue_shift"], st["sat"], *st["val"]) for m, c in colours.items() if m not in FLAT}
    img = Image.new("RGBA", (sp.w, sp.h), (0, 0, 0, 0))
    px = img.load()
    for y in range(sp.h):
        for x in range(sp.w):
            m = sp.m[y][x]
            if not m:
                continue
            if m in FLAT:
                px[x, y] = colours[m] + (255,)
                continue
            n = nm[y][x]
            if lights:  # coloured point lights: pick a ramp step by brightness, tint by light colour
                lum, tint = 0.12, [0.0, 0.0, 0.0]
                for (lxp, lyp, lzp, col, power) in lights:
                    dx, dy, dz = lxp - x, lyp - y, lzp
                    dist = math.sqrt(dx * dx + dy * dy + dz * dz)
                    ndl = max(0, (n[0] * dx + n[1] * dy + n[2] * dz) / dist)
                    a = ndl * power / (1 + (dist / 14) ** 2)
                    lum += a
                    for i in range(3):
                        tint[i] += a * col[i] / 255
                r = ramps[m]
                step = min(len(r) - 1, int(lum * len(r)))
                base = r[step]
                t = sum(tint) or 1
                k = min(.6, lum * .55)
                px[x, y] = tuple(int(min(255, base[i] * (1 - k) + 255 * (tint[i] / t) * k * 1.2)) for i in range(3)) + (255,)
            else:
                d = max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2])
                i = min(len(ramps[m]) - 1, int(d * len(ramps[m]) * 1.05))
                px[x, y] = ramps[m][i] + (255,)
    # outline
    out = img.copy()
    o = out.load()
    for y in range(sp.h):
        for x in range(sp.w):
            if sp.m[y][x]:
                continue
            nbrs = [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
            inside = [sp.get(a, b) for a, b in nbrs if sp.get(a, b)]
            if inside:
                if st["outline"] == "darken":
                    c = ramps.get(inside[0], [colours.get(inside[0], (0, 0, 0))])[0]
                    o[x, y] = tuple(int(v * .55) for v in c) + (255,)
                else:
                    o[x, y] = st["outline"] + (255,)
    return out.resize((sp.w * scale, sp.h * scale), Image.NEAREST) if scale > 1 else out


def normal_map(sp):
    nm = normals(sp)
    img = Image.new("RGBA", (sp.w, sp.h), (0, 0, 0, 0))
    px = img.load()
    for y in range(sp.h):
        for x in range(sp.w):
            if sp.m[y][x]:
                n = nm[y][x]
                px[x, y] = (int((n[0] * .5 + .5) * 255), int((-n[1] * .5 + .5) * 255), int((n[2] * .5 + .5) * 255), 255)
    return img


# ---------- content: trees ----------

def round_tree(seed):
    """Returns (bottom, top): the trunk half and the canopy half, as the design asks."""
    rng = random.Random(seed)
    W, H = 32, 44
    top, bot = Sprite(W, H), Sprite(W, H)
    # trunk (bottom half)
    tx = W // 2
    bot.rect(tx - 2, 22, tx + 2, H - 1, TRUNK)
    bot.rect(tx - 3, H - 3, tx + 3, H - 1, TRUNK)
    bot.tri([(tx - 1, 26), (tx - 7, 18), (tx - 5, 18)], TRUNK)  # a branch
    # canopy (top half): a cluster of blobs
    for _ in range(9):
        cx = tx + rng.uniform(-8, 8)
        cy = 16 + rng.uniform(-8, 5)
        r = rng.uniform(5, 8)
        top.ellipse(cx, cy, r, r * .85, LEAF)
    for _ in range(5):
        top.ellipse(tx + rng.uniform(-7, 7), 13 + rng.uniform(-6, 4), rng.uniform(1.5, 3), rng.uniform(1.5, 2.5), LEAF2, only_on={LEAF})
    return bot, top


def pine_tree(seed):
    rng = random.Random(seed)
    W, H = 24, 48
    top, bot = Sprite(W, H), Sprite(W, H)
    tx = W // 2
    bot.rect(tx - 1, 34, tx + 2, H - 1, TRUNK)
    for i, y in enumerate((6, 14, 22, 30)):
        w = 5 + i * 2.6 + rng.uniform(-.5, .5)
        top.tri([(tx, y - 6), (tx - w, y + 7), (tx + w, y + 7)], LEAF)
    return bot, top


# ---------- content: creatures ----------

def critter(seed, level, frame):
    """A parametric creature: the same seed is the same kind; level grows it.
    Babies get big heads and eyes (cuteness); higher levels get horns, spots, size."""
    rng = random.Random(seed)
    arche = rng.choice(["quad", "blob", "bird", "fluff"])
    size = [11, 17, 26][level]
    W = H = size + 8
    sp = Sprite(W, H)
    head_ratio = [.42, .32, .26][level]
    cx = W / 2 - 1
    if arche == "blob":
        bh = size * .36
        cy = H - bh - 1 - (1 if frame else 0)
        squash = 1.08 if frame else 1.0
        sp.ellipse(cx, cy, size * .42 * squash, bh / squash, BODY)
        sp.ellipse(cx, cy + bh * .5, size * .3, bh * .4, BELLY, only_on={BODY})
        hx, hy, hr = cx + size * .12, cy - bh * .2, size * .2
    else:
        bw = size * rng.uniform(.3, .42) * (1.3 if arche == "quad" else 1)
        bh = size * rng.uniform(.24, .3) * (1.25 if arche == "fluff" else 1)
        legs = 2 if arche in ("bird", "fluff") else 4
        leg_len = max(2, int(size * (.22 if arche == "bird" else .13)))
        cy = H - leg_len - bh - 1
        for i in range(legs):
            lx = int(cx - bw * .5 + i * (bw * 1.0) / max(1, legs - 1))
            lift = 1 if (i + frame) % 2 else 0
            sp.rect(lx, int(cy + bh * .6), lx + max(1, size // 11), H - 1 - lift, ACCENT if arche == "bird" else BODY)
        sp.ellipse(cx, cy, bw, bh, BODY)
        sp.ellipse(cx, cy + bh * .45, bw * .75, bh * .5, BELLY, only_on={BODY})
        hr = size * head_ratio * (1.1 if arche == "fluff" else 1)
        hx = cx + bw * (.75 if arche != "fluff" else .35)
        hy = cy - bh * (.55 if arche != "fluff" else .9)
        sp.ellipse(hx, hy, hr, hr * .9, BODY)
        if arche == "bird":
            sp.tri([(hx + hr * .7, hy - 1), (hx + hr * 1.6, hy + .5), (hx + hr * .7, hy + 2)], ACCENT)
        else:
            sp.ellipse(cx - bw * 1.05, cy - bh * .3 + frame * .5, size * .1 + 1, size * .07 + 1, BODY)
    kind = rng.choice(["ears", "antlers", "crest"])
    if kind == "ears":
        mat = ACCENT if level == 2 else BODY
        sp.tri([(hx - hr * .6, hy - hr * .4), (hx - hr * .9, hy - hr * 1.6), (hx - hr * .05, hy - hr * .8)], mat)
        sp.tri([(hx + hr * .1, hy - hr * .7), (hx + hr * .3, hy - hr * 1.7), (hx + hr * .75, hy - hr * .5)], mat)
    elif kind == "antlers" and level >= 1:
        top = int(hy - hr * (1.4 + level * .3))
        sp.rect(int(hx - 1), top, int(hx), int(hy - hr * .6), ACCENT)
        sp.rect(int(hx - 3), top, int(hx + 2), top + 1, ACCENT)
    elif kind == "crest" and level >= 1:
        for i in range(level + 1):
            sp.tri([(hx - hr * .6 + i * 2, hy - hr * .7), (hx - hr * .4 + i * 2, hy - hr * (1.5 + .2 * level)), (hx - hr * .1 + i * 2, hy - hr * .7)], ACCENT)
    for _ in range(level * 2):
        sp.ellipse(cx + rng.uniform(-size * .25, size * .1), cy - size * rng.uniform(.04, .12), 1.2 + level * .3, 1, ACCENT, only_on={BODY})
    # eyes: big and glinting on babies, smaller and sharper on legends
    ex, ey = int(hx + hr * .3), int(hy - hr * .2)
    eye = [2, 2, 1][level]
    for dx in range(eye):
        for dy in range(eye):
            sp.set(ex - dx, ey + dy, EYE)
    if eye == 2:
        sp.set(ex, ey, GLINT)
    return sp


def creature_colours(seed):
    rng = random.Random(seed * 7 + 1)
    h = rng.random()
    body = tuple(int(c * 255) for c in colorsys.hsv_to_rgb(h, .55, .75))
    belly = tuple(int(c * 255) for c in colorsys.hsv_to_rgb((h + .08) % 1, .3, .9))
    accent = tuple(int(c * 255) for c in colorsys.hsv_to_rgb((h + .45) % 1, .7, .85))
    return {BODY: body, BELLY: belly, ACCENT: accent, EYE: (20, 14, 26), GLINT: (250, 250, 240)}


# ---------- content: the witch ----------

WITCH = """
.........HH.........
........HHHH........
.......HHHHHH.......
......HHHHHHHH......
....HHHHHHHHHHHH....
........SSS.........
.......SSESS........
.......hSSSS........
......hCCCC.........
.....hhCCCCC........
.....h.CCCCCC.......
.......CCCCCCC......
.......CCCCCCCC.....
SSSS.BBBBBBBBBBBBBBB
SSSSSBBBBBBBBBBBBBBB
SSSS......CC.CC.....
"""


def witch():
    rows = [r for r in WITCH.strip("\n").split("\n")]
    sp = Sprite(len(rows[0]), len(rows))
    key = {"H": CLOTH, "S": SKIN, "E": EYE, "h": HAIR, "C": CLOTH, "B": BROOM}
    for y, r in enumerate(rows):
        for x, ch in enumerate(r):
            if ch in key:
                sp.set(x, y, key[ch])
    # straw at the broom's tail (left), skin 'S' there was a placeholder
    for y in (13, 14, 15):
        for x in range(0, 5):
            if sp.get(x, y) == SKIN:
                sp.set(x, y, STRAW)
    return sp


WITCH_COLOURS = {CLOTH: (70, 52, 120), SKIN: (236, 196, 160), EYE: (20, 14, 26), HAIR: (196, 70, 60), BROOM: (140, 96, 60), STRAW: (220, 180, 90)}
TREE_COLOURS = {TRUNK: (110, 80, 62), LEAF: (70, 130, 80), LEAF2: (120, 170, 90)}
PINE_COLOURS = {TRUNK: (100, 70, 60), LEAF: (40, 100, 90)}


def merge(a, b):
    sp = Sprite(a.w, a.h)
    for y in range(a.h):
        for x in range(a.w):
            sp.m[y][x] = b.m[y][x] or a.m[y][x]
    return sp
