import json, sys, numpy as np
base=sys.argv[1]; a0=float(sys.argv[2]); a1=float(sys.argv[3])
st=json.load(open(base+'.audio.states.json')); sp=st[-1]['spellAt']
a=np.fromfile(base+'.audio.f32',dtype=np.float32).reshape(-1,2).mean(1).astype(np.float64); sr=44100
t=np.array([s['t'] for s in st]); au=np.array([s['audio'] for s in st])
print('audio s',len(a)/sr,'last state audio',au[-1],'peak',abs(a).max())
def lp(x,fc):
    k=1-np.exp(-2*np.pi*fc/sr); y=np.empty_like(x); acc=0.0
    for i,v in enumerate(x): acc+=k*(v-acc); y[i]=acc
    return y
i0=int(np.interp(sp+a0,t,au)*sr); i1=int(np.interp(sp+a1,t,au)*sr)
seg=a[i0:i1]; low=lp(lp(seg,120),120); hop=441
env=np.array([np.sqrt((low[i:i+hop]**2).mean()) for i in range(0,len(low)-hop,hop)])
full=np.array([np.sqrt((seg[i:i+hop]**2).mean()) for i in range(0,len(seg)-hop,hop)])
tt=a0+np.arange(len(env))*hop/sr
if len(sys.argv)>4:
    for k in range(0,len(env),4): print(round(tt[k],2), '#'*int(env[k]*600), round(env[k],3), round(full[k],3))
# onsets: local maxima of env rise
on=[]
for k in range(3,len(env)-1):
    if env[k]>0.5*env.max() and env[k]>=env[k-1] and env[k]>env[k+1] and (not on or tt[k]-on[-1]>0.2): on.append(round(tt[k],2))
print('low-band peaks (s after cast):',on)
