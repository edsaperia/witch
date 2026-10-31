# Diffs and side-by-sides for capture.cjs's raw/ frames: OFF | ON | 8x diff, per capture point, plus the
# single-dodge strip (ON). python3 -I previews/dodge-echoes-1545/compose.py
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw

D = os.path.dirname(os.path.abspath(__file__)); RAW = os.path.join(D, "raw")
meta = json.load(open(os.path.join(D, "capture.json")))
load = lambda n: np.asarray(Image.open(os.path.join(RAW, n)).convert("RGB")).astype(np.int16)

def diff(a, b):
    d = np.abs(a - b).max(axis=2); ys, xs = np.nonzero(d)
    return d, {"changed": int((d > 0).sum()), "max": int(d.max()), "bounds": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())] if len(xs) else None}

def label(img, text):
    ImageDraw.Draw(img).rectangle([0, 0, img.width, 16], fill=(0, 0, 0)); ImageDraw.Draw(img).text((4, 2), text, fill=(255, 255, 255)); return img

results = []
for f in meta["frames"]:
    n = f["name"]; on, off, on2 = load(f"{n}-on.png"), load(f"{n}-off.png"), load(f"{n}-on2.png")
    d, r = diff(on, off); _, idem = diff(on, on2)
    r.update(name=n, note=f["note"], echoes=len(f["state"]["echoes"]), idempotent_changed=idem["changed"])
    results.append(r)
    dimg = Image.fromarray(np.clip(d * 8, 0, 255).astype(np.uint8)).convert("RGB")
    tiles = [label(Image.fromarray(off.astype(np.uint8)), f"OFF {n}"), label(Image.fromarray(on.astype(np.uint8)), f"ON {n} ({r['echoes']} echoes)"), label(dimg, f"8x diff: {r['changed']} px, max {r['max']}")]
    # crop around the change (or centre) so the witch is visible at a readable size, then 2x
    b = r["bounds"] or [380, 170, 580, 370]
    cx, cy = (b[0] + b[2]) // 2, (b[1] + b[3]) // 2; w = max(240, b[2] - b[0] + 80); h = max(160, b[3] - b[1] + 80)
    box = (max(0, cx - w // 2), max(0, cy - h // 2), min(960, cx + w // 2), min(540, cy + h // 2))
    k = min(2, 960 / (box[2] - box[0])); crops = [t.crop(box).resize((int((box[2] - box[0]) * k), int((box[3] - box[1]) * k)), Image.NEAREST) for t in [Image.fromarray(off.astype(np.uint8)), Image.fromarray(on.astype(np.uint8)), dimg]]
    full = Image.new("RGB", (960 * 3, 540 + crops[0].height), (20, 20, 20))
    for i, t in enumerate(tiles): full.paste(t, (960 * i, 0))
    for i, c in enumerate(crops): full.paste(c, (960 * i, 540))
    full.save(os.path.join(D, f"side-{n}.png"))

strip = [n for n in ["a-before", "a-0.05", "a-0.15", "a-0.30", "a-0.40"]]
# common crop over the whole sequence
bs = [r["bounds"] for r in results if r["name"] in strip and r["bounds"]] or [[330, 130, 630, 330]]
x0 = min(b[0] for b in bs) - 60; y0 = min(b[1] for b in bs) - 60; x1 = max(b[2] for b in bs) + 60; y1 = max(b[3] for b in bs) + 60
box = (max(0, x0), max(0, y0), min(960, x1), min(540, y1))
tiles = [label(Image.open(os.path.join(RAW, f"{n}-on.png")).convert("RGB").crop(box).resize(((box[2] - box[0]) * 2, (box[3] - box[1]) * 2), Image.NEAREST), f"ON {n}") for n in strip]
s = Image.new("RGB", (sum(t.width for t in tiles), tiles[0].height)); x = 0
for t in tiles: s.paste(t, (x, 0)); x += t.width
s.save(os.path.join(D, "strip-single-dodge-on.png"))
im = Image.new('RGB', (4 * 520, 440))
for i, n in enumerate(['hidden', 'alpha-0.19', 'alpha-0.45', 'alpha-0.75']):
    im.paste(label(Image.open(os.path.join(RAW, f'diag-{n}.png')).convert('RGB').crop((360, 150, 620, 370)).resize((520, 440), Image.NEAREST), 'echo hidden' if n == 'hidden' else f'echo forced to {n} (game uses <=0.24)'), (i * 520, 0))
im.save(os.path.join(D, 'diag-alpha-sweep.png'))

fl, fh = load("flag-disabled.png"), load("flag-hidden.png"); _, flag = diff(fl, fh)
json.dump({"frames": results, "flag_disabled_vs_hidden": flag}, open(os.path.join(D, "diffs.json"), "w"), indent=1)
for r in results: print(f"{r['name']:18} echoes={r['echoes']} changed={r['changed']:6} max={r['max']:3} bounds={r['bounds']} idem={r['idempotent_changed']}")
print("flag disabled vs hidden:", flag)
