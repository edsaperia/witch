# side-by-side base | candidate | 8x diff, plus metrics JSON and a 5-frame candidate chain strip
import json, sys, os
import numpy as np
from PIL import Image, ImageDraw
base, cand, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
CHAIN = ['chain','falling','path','lifting','rejoined']
MUSH = [f'{c}-{d}' for c in ['blue','red','turquoise'] for d in ['near','far']]
def load(p): return np.asarray(Image.open(p).convert('RGB')).astype(np.int16)
def label(img, text):
    d = ImageDraw.Draw(img); d.rectangle([0,0,8+7*len(text),18], fill=(0,0,0)); d.text((4,3), text, fill=(255,255,0)); return img
metrics = {}
for i, name in enumerate(CHAIN + MUSH):
    a, b = load(f'{base}/{name}.png'), load(f'{cand}/{name}.png')
    diff = np.abs(a-b); m = diff.max(axis=2); ys, xs = np.nonzero(m)
    r = {'changed_px': int((m>0).sum()), 'changed_px_gt8': int((m>8).sum()), 'max_diff': int(m.max()),
         'mean_diff_changed': round(float(m[m>0].mean()),2) if m.any() else 0,
         'bounds': [int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())] if len(xs) else None}
    # mean RGB of changed region in each (helps judge "own colour vs whiter")
    if m.any():
        mask = m>8
        if mask.any():
            r['mean_rgb_base_changed'] = [round(float(v),1) for v in a[mask].mean(axis=0)]
            r['mean_rgb_cand_changed'] = [round(float(v),1) for v in b[mask].mean(axis=0)]
    metrics[name] = r
    d8 = np.clip(diff*8,0,255).astype(np.uint8)
    h, w = a.shape[:2]
    sheet = Image.new('RGB', (w*3, h))
    sheet.paste(label(Image.fromarray(a.astype(np.uint8)), f'base ea42af8 {name}'), (0,0))
    sheet.paste(label(Image.fromarray(b.astype(np.uint8)), f'candidate f136339 {name}'), (w,0))
    sheet.paste(label(Image.fromarray(d8), f'|diff| x8  changed={r["changed_px"]} max={r["max_diff"]}'), (2*w,0))
    prefix = f'{i+1:02d}-' + ('chain-' if name in CHAIN else 'mushroom-') + name
    sheet.save(f'{out}/{prefix}.png', optimize=True)
    # crop pair around bounds for close look
    if r['bounds']:
        x0,y0,x1,y1 = r['bounds']; pad=40
        x0,y0,x1,y1 = max(0,x0-pad),max(0,y0-pad),min(w,x1+pad),min(h,y1+pad)
        cw,ch = x1-x0, y1-y0; s = max(1, min(4, 600//max(cw,ch,1)))
        crop = Image.new('RGB', (cw*3*s, ch*s))
        for j,arr in enumerate([a, b, np.clip(diff*8,0,255)]):
            crop.paste(Image.fromarray(arr[y0:y1,x0:x1].astype(np.uint8)).resize((cw*s,ch*s), Image.NEAREST), (j*cw*s,0))
        crop.save(f'{out}/{prefix}-zoom.png', optimize=True)
        r['zoom_box']=[x0,y0,x1,y1]; r['zoom_scale']=s
strip = [Image.open(f'{cand}/{n}.png').convert('RGB') for n in CHAIN]
w,h = strip[0].size; sc=0.5
S = Image.new('RGB', (int(w*sc)*5, int(h*sc)))
for i,(n,im) in enumerate(zip(CHAIN,strip)):
    S.paste(label(im.resize((int(w*sc),int(h*sc))), f'{i+1} {n}'), (i*int(w*sc),0))
S.save(f'{out}/candidate-chain-strip.png', optimize=True)
# candidate-to-candidate pose deltas (smoothness of the transition)
seq = {}
for x,y in zip(CHAIN, CHAIN[1:]):
    m = np.abs(load(f'{cand}/{x}.png')-load(f'{cand}/{y}.png')).max(axis=2)
    seq[f'{x}->{y}'] = {'changed_px': int((m>0).sum()), 'changed_px_gt8': int((m>8).sum()), 'max_diff': int(m.max())}
json.dump({'base_vs_candidate': metrics, 'candidate_pose_to_pose': seq}, open(f'{out}/metrics.json','w'), indent=1)
print(json.dumps({'base_vs_candidate': metrics, 'candidate_pose_to_pose': seq}, indent=1))
