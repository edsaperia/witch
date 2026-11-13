import json, sys, numpy as np
from PIL import Image
run=sys.argv[1]; g=json.load(open('geo.json')); bars=np.array(g['bars'])  # [28][9][2]
st=json.load(open(f'd/{run}.states.json')); sp=[s for s in st if s['spellAt'] is not None][0]['spellAt']
drawn=[s for s in st if s['drawn']]
img=lambda k: np.asarray(Image.open(f'd/{run}/f{k:05d}.jpg').convert('RGB')).astype(np.int16)
ref=img(0)
def lit(fr, dy, dx=0):
    out=np.zeros((28,9),bool)
    for i in range(28):
        for j in range(9):
            x=int(round(bars[i,j,0]+dx)); y=int(round(bars[i,j,1]+dy))
            if 2<=x<1278 and 2<=y<718:
                p=fr[y-2:y+3,x-3:x+4]; r=ref[y-2:y+3,x-3:x+4]
                d=np.abs(p-r).sum(2); sat=p.max(2)-p.min(2)
                out[i,j]=((d>90)&(sat>90)).mean()>0.25
    return out
# calibrate the ground's height (screen px) on a frame mid-routine
k0=[k for k,s in enumerate(drawn) if s['t']-sp>3.2][0]; fr=img(k0)
best=max(((lit(fr,dy,dx).sum(),dy,dx) for dy in range(150,260,3) for dx in (-6,-3,0,3,6)))
print('calibration: lit dots',best[0],'dy',best[1],'dx',best[2]); dy,dx=best[1],best[2]
rows=[]
for k,s in enumerate(drawn):
    L=lit(img(k),dy,dx); h=np.zeros(28,int)
    for i in range(28):
        idx=np.where(L[i])[0]; h[i]=idx.max()+1 if len(idx) else 0
    rows.append({'k':k,'t':round(s['t']-sp,3),'tag':s['tag'],'h':h.tolist(),'vis':int((h>0).sum())})
json.dump(rows,open(f'd/{run}.heights.json','w'))
print('frames',len(rows))
