# close-ups of each mushroom glow (base left, candidate right) and colour stats in a fixed box around it
import json, colorsys
import numpy as np
from PIL import Image
boxes={'near':(560,250,720,370),'far':(590,90,690,175)}
rows=[];stats={}
for c in ['blue','red','turquoise']:
  for d in ['near','far']:
    n=f'{c}-{d}';b=boxes[d];s=4 if d=='far' else 3
    ims=[Image.open(f'out-{k}/{n}.png').convert('RGB').crop(b) for k in ['base','cand']]
    st={}
    for k,im in zip(['base','cand'],ims):
        a=np.asarray(im).astype(float)/255; mx=a.max(2); mn=a.min(2)
        sat=np.where(mx>0,(mx-mn)/np.maximum(mx,1e-6),0)
        st[k]={'mean_rgb':[round(v*255,1) for v in a.reshape(-1,3).mean(0)],'mean_value':round(float(mx.mean()),3),'mean_saturation':round(float(sat.mean()),3),'near_white_px(min>0.85)':int((mn>0.85).sum())}
    stats[n]=st
    w,h=(b[2]-b[0])*s,(b[3]-b[1])*s
    row=Image.new('RGB',(w*2+10,h));[row.paste(im.resize((w,h),Image.NEAREST),(i*(w+10),0)) for i,im in enumerate(ims)]
    rows.append(row)
W=max(r.width for r in rows);S=Image.new('RGB',(W,sum(r.height+6 for r in rows)));y=0
for r in rows: S.paste(r,(0,y));y+=r.height+6
S.save('sheets/mushroom-glow-closeups.png',optimize=True)
json.dump(stats,open('sheets/mushroom-glow-stats.json','w'),indent=1);print(json.dumps(stats,indent=0))
