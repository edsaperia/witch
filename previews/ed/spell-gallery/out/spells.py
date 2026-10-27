# Spell look mock (Ed, 2026-10-27): a spell = DELIVERY x ELEMENT x SIDE EFFECT x POWER, every wild one in a shared DANGER FRAME.
# Drawn at the game's art pixel (16 a metre, 3 screen pixels at play zoom), glow as an additive soft halo (the game's bloom),
# over real in-game ground. Seeded, so every GIF is the same each run. Mock only: nothing here is the game's code.
import math, random, sys, os
from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageFont

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
os.makedirs(OUT, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
PX = 3                      # screen pixels an art pixel at play zoom
CW, CH = 64, 40             # a cell in art pixels (4 m by 2.5 m)
N = 28                      # frames a loop
FMS = 70                    # ms a frame

BG = {k: Image.open(os.path.join(HERE, f"bg-{k}.png")).convert("RGB").resize((CW * PX, CH * PX)) for k in ("lit", "night")}

# ---- ELEMENTS: a palette (dark, mid, bright, hot), a core shape, a trail, an impact, a ground mark ----
EL = {
  "fire":      dict(pal=[(130, 26, 10), (240, 92, 22), (255, 196, 60), (255, 246, 200)], core="orb",     trail="embers",   impact="burst",   mark="scorch"),
  "frost":     dict(pal=[(28, 70, 150), (92, 172, 238), (196, 238, 255), (255, 255, 255)], core="shard",  trail="sparkles", impact="shatter", mark="rime"),
  "venom":     dict(pal=[(30, 72, 18), (96, 176, 40), (186, 242, 80), (238, 255, 196)], core="droplet",   trail="drips",    impact="splash",  mark="puddle"),
  "moonlight": dict(pal=[(62, 52, 126), (156, 146, 236), (224, 218, 255), (255, 255, 255)], core="crescent", trail="wisps",  impact="ring",    mark="halo"),
  "storm":     dict(pal=[(36, 40, 120), (90, 126, 255), (182, 222, 255), (255, 255, 255)], core="spark",  trail="sparks",   impact="crackle", mark="char"),
  "earth":     dict(pal=[(72, 46, 24), (146, 104, 56), (214, 170, 96), (255, 220, 140)], core="rock",     trail="dust",     impact="rubble",  mark="cracks"),
  "shadow":    dict(pal=[(18, 8, 28), (78, 32, 112), (164, 92, 220), (236, 196, 255)], core="void",       trail="smoke",    impact="poof",    mark="pool"),
  "bloom":     dict(pal=[(130, 30, 86), (234, 92, 164), (255, 184, 214), (255, 246, 210)], core="petal",  trail="petals",   impact="blossom", mark="flowers", leaf=(86, 176, 64)),
}
ELEMENTS = list(EL)
DELIVERIES = ["bolt", "beam", "lob", "nova", "quake"]
WHITE, INK = (255, 255, 255), (16, 12, 20)

class Layer:
    """An art-pixel RGBA layer: 'glow' pixels add light (bloom), 'solid' pixels paint over."""
    def __init__(s): s.glow = Image.new("RGBA", (CW, CH), (0, 0, 0, 0)); s.solid = Image.new("RGBA", (CW, CH), (0, 0, 0, 0)); s.g = ImageDraw.Draw(s.glow); s.s = ImageDraw.Draw(s.solid)
    def px(s, x, y, c, a=255, solid=False):
        x, y = int(round(x)), int(round(y))
        if 0 <= x < CW and 0 <= y < CH: (s.s if solid else s.g).point((x, y), fill=c + (a,))
    def disc(s, cx, cy, r, c, a=255, solid=False):
        for y in range(int(cy - r - 1), int(cy + r + 2)):
            for x in range(int(cx - r - 1), int(cx + r + 2)):
                if (x - cx) ** 2 + (y - cy) ** 2 <= r * r: s.px(x, y, c, a, solid)
    def ring(s, cx, cy, r, c, w=1, a=255, solid=False, flat=.55, dash=None, phase=0):
        n = max(12, int(r * 7))
        for i in range(n):
            t = i / n * 2 * math.pi
            if dash and int((i + phase) / dash) % 2: continue
            for k in range(w): s.px(cx + math.cos(t) * (r - k * .7), cy + math.sin(t) * (r - k * .7) * flat, c, a, solid)
    def line(s, x0, y0, x1, y1, c, a=255, solid=False):
        n = int(max(abs(x1 - x0), abs(y1 - y0))) + 1
        for i in range(n + 1): s.px(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, c, a, solid)

def compose(bg, L, night):
    """The layer over the ground at play zoom: its glow added through a soft bloom, its solid pixels painted, crisp."""
    big = lambda im: im.resize((CW * PX, CH * PX), Image.NEAREST)
    base = bg.copy().convert("RGB")
    g = big(L.glow)
    rgb = Image.new("RGB", g.size); rgb.paste(g.convert("RGB"), mask=g.split()[3])
    halo = rgb.filter(ImageFilter.GaussianBlur(7 if night else 5))
    base = ImageChops.add(base, Image.eval(halo, lambda v: int(v * (1.1 if night else .7))))
    base.paste(g.convert("RGB"), mask=g.split()[3])
    sd = big(L.solid); base.paste(sd.convert("RGB"), mask=sd.split()[3])
    return base

# ---- the shared DANGER FRAME: the same for every wild spell, whatever its element ----
def danger_ring(L, cx, cy, r, f, tighten=1.0):
    rr = r * tighten
    L.ring(cx, cy, rr + .8, INK, 1, 230, solid=True)                       # dark outside
    L.ring(cx, cy, rr, WHITE, 1, 255, solid=True, dash=3, phase=f)          # white dashes, marching
    L.ring(cx, cy, rr - .8, INK, 1, 200, solid=True)                        # dark inside
def danger_lane(L, x0, x1, y, w, f):
    for x in range(int(x0), int(x1)):
        for sy in (-1, 1):
            L.px(x, y + sy * (w + .8), INK, 220, True)
            if (x + f) % 6 < 3: L.px(x, y + sy * w, WHITE, 255, True)
    for k in range(0, int(x1 - x0), 6):                                     # chevrons marching along it
        x = x0 + (k + f * 2) % (x1 - x0)
        L.px(x, y, WHITE, 200, True); L.px(x - 1, y - 1, WHITE, 160, True); L.px(x - 1, y + 1, WHITE, 160, True)

# ---- ELEMENT parts ----
def core(L, e, x, y, f, power, dirx=1):
    P, c = EL[e]["pal"], EL[e]["core"]; s = power * 1.5
    if c in ("orb", "void"):
        L.disc(x, y, 2.2 * s, P[1]); L.disc(x, y, 1.4 * s, P[2]); L.disc(x, y, .7 * s, P[3])
        if c == "void": L.disc(x, y, 1.3 * s, P[0], solid=True); L.ring(x, y, 2.2 * s, P[2], 1, flat=1)
    elif c == "shard":
        for k in range(int(4 * s)): L.px(x - k * dirx, y, P[2 if k else 3]); L.px(x - k * dirx, y - (1 if k < 2 * s else 0), P[1])
        L.px(x + dirx, y, P[3]); L.px(x, y + 1, P[1])
    elif c == "droplet":
        L.disc(x, y, 1.7 * s, P[1]); L.disc(x + .5 * dirx, y - .4, .8 * s, P[3]); L.px(x - 2.2 * s * dirx, y, P[1]); L.px(x - 3 * s * dirx, y, P[0])
    elif c == "crescent":
        for t in range(0, 360, 20):
            a = math.radians(t)
            if math.cos(a - (0 if dirx > 0 else math.pi)) > -.2: L.px(x + math.cos(a) * 2.2 * s, y + math.sin(a) * 2.2 * s, P[2])
        L.px(x, y, P[3])
    elif c == "spark":
        pts = [(x - 3 * s * dirx, y), (x - 1.5 * s * dirx, y - 1.5), (x - .5 * dirx, y + 1), (x + 1 * dirx, y - .5), (x + 2 * s * dirx, y)]
        for (a, b), (c2, d) in zip(pts, pts[1:]): L.line(a, b, c2, d, P[3] if f % 2 else P[2])
        L.disc(x, y, 1, P[3])
    elif c == "rock":
        L.disc(x, y, 1.8 * s, P[0], solid=True); L.disc(x - .4, y - .4, 1 * s, P[1], solid=True); L.ring(x, y, 2.3 * s, P[3], 1, a=180, flat=1)
    elif c == "petal":
        for k in range(5):
            a = k / 5 * 2 * math.pi + f * .5
            L.px(x + math.cos(a) * 1.6 * s, y + math.sin(a) * 1.6 * s, P[1]); L.px(x + math.cos(a) * 2.4 * s, y + math.sin(a) * 2.4 * s, P[2])
        L.px(x, y, P[3]); L.px(x - 1, y, EL[e]["leaf"])

def trail(L, e, pts, f, power, rnd):
    """Bits left along the path behind (pts: the core's past places, newest last)."""
    P, t = EL[e]["pal"], EL[e]["trail"]
    for i, (x, y) in enumerate(pts[:-1]):
        age = len(pts) - 1 - i
        if rnd.random() > .75 * power: continue
        j = lambda: rnd.uniform(-1.2, 1.2)
        if t == "embers": L.px(x + j(), y - age * .35 + j(), P[2] if age < 3 else P[1], max(60, 255 - age * 28))
        elif t == "sparkles":
            if (f + i) % 3 == 0: X, Y = x + j(), y + j(); L.px(X, Y, P[3]); L.px(X - 1, Y, P[1], 140); L.px(X + 1, Y, P[1], 140); L.px(X, Y - 1, P[1], 140); L.px(X, Y + 1, P[1], 140)
        elif t == "drips": L.px(x + j() * .4, y + age * .5, P[1] if age < 4 else P[0], max(80, 255 - age * 25))
        elif t == "wisps": L.px(x + math.sin(age + f * .4) * 1.4, y + math.cos(age * .7) * 1.2, P[2], max(50, 220 - age * 26))
        elif t == "sparks":
            if age < 4: L.line(x, y, x + j() * 2, y + j() * 2, P[3] if age < 2 else P[2], 220)
        elif t == "dust": L.px(x + j(), y + age * .3 + j(), P[2], max(50, 200 - age * 20), solid=True)
        elif t == "smoke": L.disc(x + j() * .5, y - age * .2, .6 + age * .18, P[1] if age < 3 else P[0], max(40, 200 - age * 22), solid=True)
        elif t == "petals": L.px(x + math.sin(age * 1.3 + f * .3) * 1.8, y + age * .35, P[2] if age % 2 else EL[e]["leaf"], max(70, 230 - age * 20))

def impact(L, e, x, y, k, power, rnd, r=8):
    """The landing, k from 0 (the hit) to 1 (gone): big and bright for a frame or two, then its bits fly and fade."""
    P, im = EL[e]["pal"], EL[e]["impact"]; R = r * power
    fade = int(255 * (1 - k) ** .6)
    bit = lambda X, Y, c, a=255, solid=False: L.disc(X, Y, .8 * min(1.6, power), c, a, solid)
    if k < .22: L.disc(x, y, 4 * power * (1 - k * 2), P[3]); L.disc(x, y, 5 * power * (1 - k * 2), P[2], 160)   # the flash, every element
    if k < .45: L.ring(x, y, R * (.4 + k * 1.2), P[2], 1, int(220 * (1 - k * 2)))                   # and its shock ring
    if im == "burst":
        for a in range(0, 360, 30):
            d = R * (.3 + k); A = math.radians(a + 15 * (a // 30 % 2)); bit(x + math.cos(A) * d, y + math.sin(A) * d * .6, P[2] if k < .5 else P[1], fade)
        L.disc(x, y - k * 3, 1.5 * (1 - k) * power, P[1], fade)
    elif im == "shatter":
        for a in range(0, 360, 40):
            A = math.radians(a); d = R * (.2 + k * .9); X, Y = x + math.cos(A) * d, y + math.sin(A) * d * .6
            L.line(X, Y, X + math.cos(A) * 1.5, Y + math.sin(A), P[2] if k < .5 else P[1], fade)
    elif im == "splash":
        for a in range(-160, -10, 25):
            A = math.radians(a); d = R * .8 * k; bit(x + math.cos(A) * d, y + math.sin(A) * d - 4 * k * (1 - k) * power, P[2], fade)
        L.ring(x, y, R * .4 * (.4 + k), P[1], 1, fade)
    elif im == "ring": L.ring(x, y, R * (.3 + k * .8), P[2], 1 + int(power > 1.2), fade); L.ring(x, y, R * (.15 + k * .5), P[3], 1, fade // 2)
    elif im == "crackle":
        for a in range(0, 360, 60):
            A = math.radians(a + rnd.uniform(-20, 20)); X, Y = x, y
            for st in range(int(3 + 3 * power)):
                nx, ny = X + math.cos(A) * 1.5 + rnd.uniform(-1, 1), Y + math.sin(A) * 1 + rnd.uniform(-1, 1)
                if k < .6: L.line(X, Y, nx, ny, P[3] if st < 2 else P[2], fade)
                X, Y = nx, ny
    elif im == "rubble":
        for a in range(-170, -10, 30):
            A = math.radians(a); d = R * .7 * k; L.disc(x + math.cos(A) * d, y + math.sin(A) * d * .7 - 5 * k * (1 - k), .8, P[1 if a % 60 else 0], 255, solid=True)
        L.ring(x, y, R * .5 * k, P[2], 1, fade // 2, solid=True)
    elif im == "poof":
        for a in range(0, 360, 45):
            A = math.radians(a); d = R * .5 * k; L.disc(x + math.cos(A) * d, y + math.sin(A) * d * .6 - k * 2, 1 + k * 1.5, P[1] if a % 90 else P[0], int(fade * .8), solid=True)
        L.ring(x, y, R * (.3 + k * .6), P[2], 1, fade)
    elif im == "blossom":
        for a in range(0, 360, 36):
            A = math.radians(a + k * 60); d = R * (.2 + .6 * k); bit(x + math.cos(A) * d, y + math.sin(A) * d * .6, P[2] if a % 72 else EL[e]["leaf"], fade)
        L.disc(x, y, 1.2, P[3], fade)

def mark(L, e, x, y, k, power, r=5):
    """What the landing leaves on the ground, briefly: k 0 to 1, fading out."""
    P, m = EL[e]["pal"], EL[e]["mark"]; a = int(200 * (1 - k)); R = r * power
    if a <= 10: return
    if m == "scorch": L.ring(x, y, R * .6, P[0], 2, a, solid=True); L.px(x + 1, y, P[2], a); L.px(x - 2, y + 1, P[1], a)
    elif m == "rime":
        for i in range(-int(R), int(R) + 1, 2): L.px(x + i, y + (i % 3) - 1, P[2], a); L.px(x + i * .5, y + i * .3, P[3], a // 2)
    elif m == "puddle": L.disc(x, y, R * .55, P[0], a, solid=True); L.px(x - 1, y - 1, P[2], a)
    elif m == "halo": L.ring(x, y, R * .7, P[1], 1, a); L.ring(x, y, R * .45, P[2], 1, a // 2)
    elif m == "char":
        for i in range(4): A = i * 1.6; L.line(x, y, x + math.cos(A) * R * .6, y + math.sin(A) * R * .35, P[0], a, solid=True)
    elif m == "cracks":
        for i in range(5): A = i * 1.25 + .3; L.line(x, y, x + math.cos(A) * R * .7, y + math.sin(A) * R * .4, P[0], a, solid=True)
    elif m == "pool": L.disc(x, y, R * .6, P[0], int(a * .9), solid=True); L.ring(x, y, R * .6, P[2], 1, a // 2)
    elif m == "flowers":
        for i in range(5): A = i * 1.3; X, Y = x + math.cos(A) * R * .5, y + math.sin(A) * R * .3; L.px(X, Y, P[2], a); L.px(X, Y + 1, EL[e]["leaf"], a)

# ---- DELIVERIES: motion and telegraph; the element dresses them ----
def caster(L, x, y, legend=False):
    """A stand-in for the creature: a dark silhouette blob (the mock's, not the game's art)."""
    L.disc(x, y, 3.2 if legend else 2.4, (34, 26, 30), solid=True); L.px(x + 1, y - 1, (255, 230, 120), solid=True)

def frame(e, d, f, power=1.0, night=False, seed=1):
    L = Layer(); rnd = random.Random(seed * 1000 + f); t = f / N; legend = power > 1.2
    cx, cy = 7, 22; tx, ty = 52, 24
    caster(L, cx, cy, legend)
    if d == "bolt":
        travel = 14; fy = lambda x: cy + (ty - cy) * (x - cx) / (tx - cx)
        if f < travel:
            pts = [(cx + 3 + (tx - cx - 3) * max(0, (f - k) / travel), fy(cx + 3 + (tx - cx - 3) * max(0, (f - k) / travel))) for k in range(8, -1, -1)]
            trail(L, e, pts, f, power, rnd)
            x, y = pts[-1]
            core(L, e, x, y, f, power)
            # the danger frame on a bolt: a dark outline round its core, every element
            L.ring(x, y, 4.2 * power, INK, 1, 170, solid=True, flat=1)
        else:
            k = (f - travel) / (N - travel); impact(L, e, tx, ty, k, power, rnd); mark(L, e, tx, ty + 1, k, power)
    elif d == "beam":
        tele = 7
        if f < tele: danger_lane(L, cx + 3, tx, cy, 2 * power, f)
        elif f < 22:
            P = EL[e]["pal"]; w = (1 if power < 1.2 else 2)
            for x in range(cx + 3, tx):
                wob = math.sin(x * .7 + f) * .6
                for k in range(-w - 1, w + 2): L.px(x, cy + k + wob, P[1] if abs(k) > w - 1 else (P[3] if k == 0 else P[2]), 230 if abs(k) <= w else 120)
                if rnd.random() < .15 * power: trail(L, e, [(x, cy), (x, cy)], f, power, rnd)
            core(L, e, tx, cy, f, power); impact(L, e, tx, cy, (f % 4) / 8, power * .6, rnd, r=4)
        else: mark(L, e, tx, cy + 1, (f - 22) / 6, power)
    elif d == "lob":
        flight = 15; R = 6 * power
        if f < flight:
            danger_ring(L, tx, ty, R, f, 1 + .4 * (1 - f / flight))                  # tightening as it falls
            pts = []
            for k in range(6, -1, -1):
                u = max(0, (f - k) / flight); pts.append((cx + (tx - cx) * u, cy + (ty - cy) * u - 22 * u * (1 - u) * 4 * .5))
            trail(L, e, pts, f, power, rnd); L.disc(cx + (tx - cx) * f / flight, cy + (ty - cy) * f / flight, 1.2, (0, 0, 0), 90, solid=True)  # its shadow
            core(L, e, *pts[-1], f, power)
        else:
            k = (f - flight) / (N - flight); impact(L, e, tx, ty, k, power, rnd, r=R); mark(L, e, tx, ty, k, power, r=R)
    elif d == "nova":
        cx2 = 32; tele = 8; R = 12 * power
        caster(L, cx2, cy, legend)
        if f < tele: danger_ring(L, cx2, cy, R, f)
        else:
            k = (f - tele) / (N - tele); P = EL[e]["pal"]
            if k < .15: L.disc(cx2, cy, 4 * power, P[3], 220)
            L.ring(cx2, cy, R * min(1, k * 1.4), P[3], 1, int(255 * (1 - k) ** .5))
            L.ring(cx2, cy, R * min(1, k * 1.4) - .9, P[2], 2 + int(power > 1.2), int(255 * (1 - k) ** .7))
            L.ring(cx2, cy, R * min(1, k * 1.4) - 2.6, P[1], 1, int(160 * (1 - k)))
            for a in range(0, 360, 24):
                A = math.radians(a); d2 = R * min(1, k * 1.4)
                pts = [(cx2 + math.cos(A) * d2 * q, cy + math.sin(A) * d2 * .55 * q) for q in (.7, .8, .9, 1)]
                trail(L, e, pts, f, power * .6, rnd)
            mark(L, e, cx2, cy, k, power, r=6)
    elif d == "quake":
        cx2 = 32; tele = 11; R = 14 * power
        caster(L, cx2, cy, legend)
        if f < tele: danger_ring(L, cx2, cy, R, f, 1 + .05 * math.sin(f))
        else:
            k = (f - tele) / (N - tele); P = EL[e]["pal"]
            for i in range(9):
                A = i / 9 * 2 * math.pi + .2; l = R * min(1, k * 1.6)
                X, Y = cx2, cy
                for s2 in range(int(l / 2)):
                    nx, ny = X + math.cos(A) * 2 + rnd.uniform(-.7, .7), Y + math.sin(A) * 1.1 + rnd.uniform(-.5, .5)
                    L.line(X, Y, nx, ny, P[0], int(230 * (1 - k * .6)), solid=True)
                    L.line(X, Y - 1, nx, ny - 1, P[2] if s2 % 2 else P[1], int(255 * (1 - k) ** .5)); X, Y = nx, ny
                impact(L, e, X, Y, min(1, k * 1.1), power * .55, rnd, r=4)
    return L

def cell(e, d, f, power=1.0, night=False):
    return compose(BG["night" if night else "lit"], frame(e, d, f, power, night), night)

FONT = ImageFont.load_default()
def savegif(frames, name, webp=False):
    q = [f.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE) for f in frames]
    q[0].save(os.path.join(OUT, name + ".gif"), save_all=True, append_images=q[1:], duration=FMS, loop=0, disposal=1)
    if webp: frames[0].save(os.path.join(OUT, name + ".webp"), save_all=True, append_images=frames[1:], duration=FMS, loop=0, lossless=True)
def gallery(night, power, name):
    lab, top = 70, 16
    W, H = lab + len(DELIVERIES) * CW * PX, top + len(ELEMENTS) * CH * PX
    frames = []
    for f in range(N):
        im = Image.new("RGB", (W, H), (12, 12, 16)); dr = ImageDraw.Draw(im)
        for j, d in enumerate(DELIVERIES): dr.text((lab + j * CW * PX + 4, 2), d, fill=(230, 230, 230), font=FONT)
        for i, e in enumerate(ELEMENTS):
            dr.text((4, top + i * CH * PX + 4), e, fill=EL[e]["pal"][2], font=FONT)
            for j, d in enumerate(DELIVERIES): im.paste(cell(e, d, f, power, night), (lab + j * CW * PX, top + i * CH * PX))
        frames.append(im)
    savegif(frames, name, webp=True)
    # one GIF an element (its five deliveries): few enough colours that a GIF keeps them true
    for i, e in enumerate(ELEMENTS):
        savegif([fr.crop((0, top + i * CH * PX, W, top + (i + 1) * CH * PX)) for fr in frames], f"{name}-{e}")
    # a still: each delivery at its most telling frame (a bolt in flight, the beam firing, the lob landing, the nova's ring, the quake's warning)
    pick = {"bolt": 9, "beam": 12, "lob": 17, "nova": 13, "quake": 6}
    st = frames[0].copy()
    for i, e in enumerate(ELEMENTS):
        for j, d in enumerate(DELIVERIES): st.paste(cell(e, d, pick[d], power, night), (lab + j * CW * PX, top + i * CH * PX))
    st.save(os.path.join(OUT, name + "-still.png"))
    print("wrote", name)

# ---- SIDE EFFECTS by shape: over a struck creature, after the hit ----
def side_frame(effect, e, f, night):
    L = Layer(); P = EL[e]["pal"]; x, y = 32, 26
    caster(L, x, y)
    if effect == "slow":                                              # chains/rings: links turning round its feet
        for i in range(8):
            A = i / 8 * 2 * math.pi + f * .15; X, Y = x + math.cos(A) * 6, y + 2 + math.sin(A) * 2.5
            L.ring(X, Y, 1, P[2], 1, flat=1) if i % 2 else L.px(X, Y, P[1])
    elif effect == "stun":                                            # stars circling over its head
        for i in range(3):
            A = i / 3 * 2 * math.pi + f * .3; X, Y = x + math.cos(A) * 5, y - 6 + math.sin(A) * 1.6
            for dx, dy in ((0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)): L.px(X + dx, Y + dy, P[3] if (dx, dy) == (0, 0) else P[2])
    elif effect == "knockback":                                       # a shockwave and speed lines, pushed away
        k = (f % 14) / 14
        for r, c in ((5 + k * 9, P[3]), (3.5 + k * 9, P[2])):
            for a in range(-70, 71, 8): A = math.radians(a); L.disc(x + 1 + math.cos(A) * r, y + math.sin(A) * r * .8, .7, c, int(255 * (1 - k) ** .6))
        for i in range(4): L.line(x + 5 + k * 5, y - 3 + i * 2, x + 11 + k * 7, y - 3 + i * 2, P[3] if i % 2 else P[2], int(230 * (1 - k) ** .6))
    elif effect == "confuse":                                         # a spiral turning over its head
        for i in range(18):
            A = i * .55 + f * .4; r = 1 + i * .25; L.px(x + math.cos(A) * r, y - 7 + math.sin(A) * r * .7, P[2] if i % 2 else P[1])
    return compose(BG["night" if night else "lit"], L, night)

def sides(name):
    effs = ["slow", "stun", "knockback", "confuse"]; els = ["frost", "storm", "earth", "moonlight"]
    lab, top = 70, 16; W, H = lab + 4 * CW * PX, top + 2 * CH * PX
    frames = []
    for f in range(N):
        im = Image.new("RGB", (W, H), (12, 12, 16)); dr = ImageDraw.Draw(im)
        for j, ef in enumerate(effs): dr.text((lab + j * CW * PX + 4, 2), f"{ef} ({els[j]})", fill=(230, 230, 230), font=FONT)
        for i, night in enumerate((False, True)):
            dr.text((4, top + i * CH * PX + 4), "night" if night else "lit grass", fill=(200, 200, 200), font=FONT)
            for j, ef in enumerate(effs): im.paste(side_frame(ef, els[j], f, night), (lab + j * CW * PX, top + i * CH * PX))
        frames.append(im)
    savegif(frames, name)
    print("wrote", name)

def power(name):
    els = ["fire", "frost", "storm", "shadow"]; ds = ["bolt", "lob", "nova"]
    lab, top = 70, 16; W, H = lab + len(ds) * 2 * CW * PX, top + len(els) * CH * PX
    frames = []
    for f in range(N):
        im = Image.new("RGB", (W, H), (12, 12, 16)); dr = ImageDraw.Draw(im)
        for j, d in enumerate(ds):
            for p, pw in enumerate((1.0, 1.6)): dr.text((lab + (j * 2 + p) * CW * PX + 4, 2), f"{d} {'legend' if p else 'adult'}", fill=(230, 230, 230), font=FONT)
        for i, e in enumerate(els):
            dr.text((4, top + i * CH * PX + 4), e, fill=EL[e]["pal"][2], font=FONT)
            for j, d in enumerate(ds):
                for p, pw in enumerate((1.0, 1.6)): im.paste(cell(e, d, f, pw, True), (lab + (j * 2 + p) * CW * PX, top + i * CH * PX))
        frames.append(im)
    savegif(frames, name)
    print("wrote", name)

if __name__ == "__main__":
    which = sys.argv[2] if len(sys.argv) > 2 else "all"
    if which in ("all", "lit"): gallery(False, 1.0, "gallery-lit")
    if which in ("all", "night"): gallery(True, 1.0, "gallery-night")
    if which in ("all", "sides"): sides("side-effects")
    if which in ("all", "power"): power("adult-vs-legend")

# ---- TELEGRAPHS: one family for every warning (Ed, 2026-10-27: "composability and telegraphing") ----
# The grammar, whatever the element: WHITE is the warning, a DARK EDGE keeps it readable on any ground, MARCHING dashes mean it's
# live, a FILL creeping in shows the time left, a FLASH says now; only then does the element show (its impact).
TEL_N = 18                                     # frames of warning before the hit, in a 28-frame loop
def witch(L, x, y):                            # the stand-in target: a pale figure
    L.disc(x, y, 1.6, (236, 220, 240), solid=True); L.px(x, y - 2, (180, 120, 200), solid=True)
def fill_ring(L, cx, cy, r, u):                # time left, as a fill creeping in from the ring
    if u <= 0: return
    L.ring(cx, cy, r * (1 - .5 * u), WHITE, 1, int(60 + 100 * u), flat=.55)
def fill_line(L, x0, y0, x1, y1, u, w=1):
    xe, ye = x0 + (x1 - x0) * u, y0 + (y1 - y0) * u
    for k in range(-w + 1, w): L.line(x0, y0 + k, xe, ye + k, WHITE, 150)
def flash(L, x, y, r=4):
    L.disc(x, y, r, WHITE); L.ring(x, y, r + 1.5, INK, 1, 200, solid=True, flat=1)
def dashed_line(L, x0, y0, x1, y1, f, edge=True):
    n = int(math.hypot(x1 - x0, y1 - y0))
    nx, ny = -(y1 - y0) / max(1, n), (x1 - x0) / max(1, n)
    for i in range(n):
        x, y = x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n
        if edge: L.px(x + nx, y + ny, INK, 200, True); L.px(x - nx, y - ny, INK, 200, True)
        if (i + f) % 4 < 2: L.px(x, y, WHITE, 255, True)
def brackets(L, x, y, r, a=255):                # a lock-on / next-target mark: four corner ticks
    for sx in (-1, 1):
        for sy in (-1, 1):
            X, Y = x + sx * r, y + sy * r * .8
            for k in range(3): L.px(X - sx * k, Y, WHITE, a, True); L.px(X, Y - sy * k, WHITE, a, True)
            L.px(X + sx, Y, INK, 200, True); L.px(X, Y + sy, INK, 200, True)

def telegraph_frame(kind, e, f):
    L = Layer(); rnd = random.Random(f * 7 + len(kind)); u = min(1, f / TEL_N); hit = f >= TEL_N; k = (f - TEL_N) / (N - TEL_N)
    cx, cy = 8, 22
    if kind == "wind-up tell":                  # the creature's pose glows as it winds up: a rim brightening, a spark gathering
        x, y = 32, 22; caster(L, x, y)
        if not hit:
            L.ring(x, y, 3.4, WHITE, 1, int(80 + 175 * u), flat=1); L.ring(x, y, 4.4, INK, 1, int(120 * u), solid=True, flat=1)
            g = 1 + 2 * u; L.disc(x + 2, y - 4 - u * 2, g * .6, WHITE, int(255 * u)); fill_ring(L, x, y + 3, 6, u)
        else: core(L, e, x + 8 + k * 30, y, f, 1.0)
    elif kind == "lane":
        x1 = 56; caster(L, cx, cy)
        if not hit: danger_lane(L, cx + 3, x1, cy, 2.5, f); fill_line(L, cx + 3, cy, x1, cy, u)
        else: x = cx + 3 + (x1 - cx) * k * 2; core(L, e, min(x, x1), cy, f, 1.0); impact(L, e, x1, cy, max(0, k * 2 - 1), 1.0, rnd) if k > .5 else None
    elif kind == "landing ring":
        tx, ty = 46, 24; caster(L, cx, cy)
        if not hit: danger_ring(L, tx, ty, 7, f, 1 + .5 * (1 - u)); fill_ring(L, tx, ty, 7, u); witch(L, tx - 2, ty)
        else: impact(L, e, tx, ty, k, 1.0, rnd, r=7); mark(L, e, tx, ty, k, 1.0, r=7)
    elif kind == "cone":
        caster(L, cx, cy); A = math.radians(24); R = 44
        if not hit:
            for s in (-1, 1): dashed_line(L, cx + 3, cy, cx + 3 + math.cos(A) * R, cy + s * math.sin(A) * R * .55, f)
            for a in range(-24, 25, 3): X, Y = cx + 3 + math.cos(math.radians(a)) * R, cy + math.sin(math.radians(a)) * R * .55; L.px(X, Y, WHITE if (a // 3 + f) % 2 else INK, 230, True)
            for a in range(-20, 21, 5):
                X, Y = cx + 3 + math.cos(math.radians(a)) * R * u, cy + math.sin(math.radians(a)) * R * .55 * u; L.px(X, Y, WHITE, 160)
        else:
            for a in range(-24, 25, 6):
                d = R * min(1, k * 1.5); trail(L, e, [(cx + 3 + math.cos(math.radians(a)) * d * q, cy + math.sin(math.radians(a)) * d * .55 * q) for q in (.6, .8, 1)], f, 1.0, rnd)
    elif kind == "beam thin to full":
        x1 = 56; caster(L, cx, cy)
        if not hit:
            w = int(u * 3)
            for x in range(cx + 3, x1):
                for kk in range(-w, w + 1): L.px(x, cy + kk, WHITE if (x + f) % 4 < 2 or w > 1 else INK, 140 + 100 * (kk == 0), True)
                L.px(x, cy - w - 1, INK, 200, True); L.px(x, cy + w + 1, INK, 200, True)
        else:
            P = EL[e]["pal"]
            for x in range(cx + 3, x1):
                for kk in range(-2, 3): L.px(x, cy + kk, P[3] if kk == 0 else P[2] if abs(kk) == 1 else P[1])
    elif kind == "delayed blast":               # a mark that counts down: three pips go out, a flash on each beat
        tx, ty = 32, 24
        if not hit:
            danger_ring(L, tx, ty, 8, f); left = 3 - int(u * 3)
            for i in range(3): L.disc(tx - 4 + i * 4, ty - 9, 1, WHITE if i < left else INK, 255, True)
            if f % 6 == 0: fill_ring(L, tx, ty, 8, 1)
        else: impact(L, e, tx, ty, k, 1.2, rnd, r=8); mark(L, e, tx, ty, k, 1.2, r=8)
    elif kind == "mine arming":                 # dim while arming, its ring solid and pulsing fast once armed
        tx, ty = 32, 24; armed = u > .6; P = EL[e]["pal"]
        L.disc(tx, ty, 1.5, P[1] if armed else P[0], 255, True); L.px(tx, ty, P[3] if (armed and f % 2) else P[2])
        if not hit:
            sp = 2 if armed else 5
            L.ring(tx, ty, 4 + (f % sp) * .4, WHITE, 1, (255 if f % 2 else 200) if armed else 150, solid=True, dash=None if armed else 3, phase=f)
            L.ring(tx, ty, 5.2 + (f % sp) * .4, INK, 1, 170, solid=True)
            witch(L, tx + 14 - u * 10, ty)
        else: impact(L, e, tx, ty, k, 1.0, rnd); mark(L, e, tx, ty, k, 1.0)
    elif kind == "chain next-target":           # the hop to come: a dashed link to the next one, brackets on it
        a, b = (14, 22), (46, 20); caster(L, *a); caster(L, *b)
        if not hit: dashed_line(L, a[0] + 3, a[1], b[0] - 3, b[1], f); brackets(L, b[0], b[1], 4.5 - u, int(150 + 105 * u))
        else: P = EL[e]["pal"]; L.line(a[0], a[1], b[0], b[1], P[3]); impact(L, e, b[0], b[1], k, .8, rnd, r=5)
    elif kind == "tether pre-live":             # a line between two that will hurt to cross: dashed, then live
        a, b = (12, 18), (52, 28); caster(L, *a); caster(L, *b)
        if not hit:
            dashed_line(L, a[0], a[1], b[0], b[1], f)
            if f > TEL_N - 5 and f % 2: dashed_line(L, a[0], a[1], b[0], b[1], f + 2, edge=False)
        else:
            P = EL[e]["pal"]
            for t in range(41): X = a[0] + (b[0] - a[0]) * t / 40; Y = a[1] + (b[1] - a[1]) * t / 40 + math.sin(t * .8 + f) * .7; L.px(X, Y, P[2 if t % 3 else 3])
    elif kind == "homing lock-on":              # brackets closing on her, then the bolt
        wx, wy = 48, 24; caster(L, cx, cy); witch(L, wx, wy)
        if not hit: brackets(L, wx, wy, 9 - 5 * u, 255 if u > .8 or f % 3 else 140); dashed_line(L, cx + 3, cy, wx, wy, f, edge=False) if u > .7 else None
        else: x = cx + 3 + (wx - cx) * min(1, k * 2); core(L, e, x, cy + (wy - cy) * min(1, k * 2), f, 1.0); impact(L, e, wx, wy, max(0, k * 2 - 1), 1.0, rnd) if k > .5 else None
    elif kind == "shrinking safe circle":       # the safe ground is inside the ring; outside, the dark hatch
        tx, ty = 32, 22; r = 26 - 14 * u
        for y in range(CH):
            for x in range(CW):
                if (x - tx) ** 2 + ((y - ty) / .55) ** 2 > r * r and (x + y + f) % 4 == 0: L.px(x, y, INK, 150, True)
        danger_ring(L, tx, ty, r, f); witch(L, tx + 3, ty)
        if hit:
            for i in range(6): A = i * 1.05 + f * .1; impact(L, e, tx + math.cos(A) * (r + 4), ty + math.sin(A) * (r + 4) * .55, k, .6, rnd, r=4)
    elif kind == "rain marks":                  # many small rings, staggered, each tightening to its own hit
        spots = [(14, 14), (30, 26), (46, 16), (22, 32), (52, 30), (38, 10)]
        for i, (x, y) in enumerate(spots):
            ff = f - i * 3; uu = ff / 12
            if 0 <= uu < 1: danger_ring(L, x, y, 4, ff, 1 + .5 * (1 - uu)); fill_ring(L, x, y, 4, uu)
            elif 1 <= uu < 1.8: impact(L, e, x, y, uu - 1, .6, rnd, r=4)
        witch(L, 34, 20)
    return L

TELS = ["wind-up tell", "lane", "landing ring", "cone", "beam thin to full", "delayed blast", "mine arming", "chain next-target",
        "tether pre-live", "homing lock-on", "shrinking safe circle", "rain marks"]
def telegraphs(night, name):
    cols, lab, top = 4, 0, 14
    rows = (len(TELS) + cols - 1) // cols
    W, H = cols * CW * PX, rows * (CH * PX + top)
    frames = []
    for f in range(N):
        im = Image.new("RGB", (W, H), (12, 12, 16)); dr = ImageDraw.Draw(im)
        for i, kind in enumerate(TELS):
            e = ELEMENTS[i % len(ELEMENTS)]; x, y = (i % cols) * CW * PX, (i // cols) * (CH * PX + top)
            dr.text((x + 4, y + 1), f"{kind}  ({e})", fill=(230, 230, 230), font=FONT)
            im.paste(compose(BG["night" if night else "lit"], telegraph_frame(kind, e, f), night), (x, y + top))
        frames.append(im)
    savegif(frames, name, webp=True)
    # a contact sheet: four moments of each, from first warning to the hit
    moments = [1, 9, 16, 21]; sh = Image.new("RGB", (len(moments) * CW * PX, len(TELS) * (CH * PX + top)), (12, 12, 16)); dr = ImageDraw.Draw(sh)
    for i, kind in enumerate(TELS):
        e = ELEMENTS[i % len(ELEMENTS)]
        for j, m in enumerate(moments):
            dr.text((j * CW * PX + 4, i * (CH * PX + top) + 1), f"{kind}: {['first warning', 'filling', 'about to', 'hit'][j]}", fill=(220, 220, 220), font=FONT)
            sh.paste(compose(BG["night" if night else "lit"], telegraph_frame(kind, e, m), night), (j * CW * PX, i * (CH * PX + top) + top))
    sh.save(os.path.join(OUT, name + "-sequence.png"))
    print("wrote", name)

if __name__ == "__main__" and len(sys.argv) > 2 and sys.argv[2] in ("tel", "all"):
    telegraphs(False, "telegraphs-lit"); telegraphs(True, "telegraphs-night")
