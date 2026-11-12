import json, re, os, sys
D=os.path.dirname(os.path.abspath(__file__))
LV={1:'young',2:'adult',3:'legend'}
P=['still','across','away','toward','zigzag']
def load(n):
    f=os.path.join(D,n)
    if not os.path.exists(f): return None
    return json.load(open(f))
def key(r): return (r['kind'],r['level'],r['path'])
def cell(r): return '/'.join(str(round(100*r['hits'][p])) for p in P)
flags=[]
LEADRE=r'leads ×([0-9.]+)'
def harness(tag, old, new, drift, title):
    out=[f'### {title}','','Engine harness, caster still unless the last column says otherwise. Each cell: still / across / away / toward / zig-zag, % of casts that hit. Treetops: 0% in every row, before and after.','',
         '| kind | level | path | before | after | after, caster drifting 4 m/s till its lock | aim after |','|---|---|---|---|---|---|---|']
    O={key(r):r for r in old['rows']}; N={key(r):r for r in new['rows']}; Dd={key(r):r for r in drift['rows']} if drift else {}
    ORDER=['dormouse','fox','marten','squirrel','mole','hedgehog','stoat','hare','badger','dragonfly','rhino','heron','owl','hydra','tiger','cat','stegosaurus','fennec','jaguar','polarbear','spider','featheredserpent','sphinx','beaver','toad']
    legend_done=False
    for k,r in sorted(N.items(), key=lambda kv:(ORDER.index(kv[0][0]) if kv[0][0] in ORDER else 99, kv[0][1], kv[0][2])):
        if k[1]==3:
            if legend_done: continue
            legend_done=True; k=('every legend ('+k[0]+"'s row)",3,k[2]); o=O.get((r['kind'],3,r['path'])); d=Dd.get((r['kind'],3,r['path']))
        else:
            o=O.get(k); d=Dd.get(k)
        aimed = r['aim'].startswith('followed')
        tt=[round(100*r['hits'].get('treetop',0))]
        how = ('followed, lead x'+re.search(LEADRE,r['aim']).group(1)) if aimed else 'as before (left out)'
        out.append(f"| {k[0]} | {LV[k[1]]} | {k[2]} | {cell(o) if o else '–'} | {cell(r)} | {cell(d) if d else '–'} | {how} |")
        if aimed:
            z=r['hits']['zigzag']; s=r['hits']['still']
            if z>0.6: flags.append(f"{tag}: {k[0]} {LV[k[1]]} {k[2]}: zig-zag {round(100*z)}% (caster still)")
            if s<0.8: flags.append(f"{tag}: {k[0]} {LV[k[1]]} {k[2]}: still {round(100*s)}% (caster still)")
        if r['hits'].get('treetop',0)>0: flags.append(f"{tag}: {k[0]} {LV[k[1]]} {k[2]}: treetops {round(100*r['hits']['treetop'])}%")
    return out
def realtab(files):
    rows={}
    for f in files:
        p=os.path.join(D,f)
        if not os.path.exists(p): continue
        for line in open(p):
            m=line.strip().split('|')
            if len(m)<12 or m[1].strip() in ('kind','---') or not m[2].strip().isdigit(): continue
            sp,lv,n,bot=m[1].strip(),int(m[2]),int(m[3]),m[4].strip()
            ec=int(m[5]); eh=m[6].strip(); oc=int(m[7]); oh=m[8].strip()
            pct=lambda s:0 if s in ('–','-') else int(s.rstrip('%'))
            hits=round(pct(eh)*ec/100)+round(pct(oh)*oc/100); shots=ec+oc
            rows[(sp,lv,n,bot)]=(hits,shots,m[11].strip() if len(m)>11 else '')
    return rows
def real(before,after):
    B=realtab(before); A=realtab(after)
    out=['### Real-rules check','','The whole game through `stepGame`, one or three of a kind 25–33 m from her in a wild area, a bot moving her, 3 seeds x 60 s a cell (the report had 2 x 60). Shots counted are those aimed at her (species casts, and old pack bolts for the stoat, hare and badger); hits from `observeAttacks`. Each cell: hit % (hits/shots). "across" in the real game is across the line to the nearest caster, so at close range it circles the caster.','',
         '| kind | level | group | before still | before across | before away | before zig-zag | after still | after across | after away | after zig-zag |','|---|---|---|---|---|---|---|---|---|---|---|']
    ks=sorted({k[:3] for k in A}|{k[:3] for k in B}, key=lambda k:(['dormouse','fox','marten','squirrel','mole','hedgehog','stoat','hare','badger'].index(k[0]) if k[0] in ['dormouse','fox','marten','squirrel','mole','hedgehog','stoat','hare','badger'] else 99,k[1],k[2]))
    def c(T,k):
        if k not in T: return '–'
        h,s,_=T[k]; return f"{round(100*h/s)}% ({h}/{s})" if s else '– (0)'
    for k in ks:
        out.append(f"| {k[0]} | {LV[k[1]]} | {'alone' if k[2]==1 else 'three'} | "+' | '.join(c(B,k+(b,)) for b in ['still','across','away','zigzag'])+' | '+' | '.join(c(A,k+(b,)) for b in ['still','across','away','zigzag'])+' |')
        for b in ['still','zigzag']:
            if k+(b,) in A:
                h,s,_=A[k+(b,)]
                if s>=8 and b=='zigzag' and h/s>0.6: flags.append(f"real: {k[0]} {LV[k[1]]} {'alone' if k[2]==1 else 'three'}: zig-zag {round(100*h/s)}% ({h}/{s})")
                if s>=8 and b=='still' and h/s<0.8: flags.append(f"real: {k[0]} {LV[k[1]]} {'alone' if k[2]==1 else 'three'}: still {round(100*h/s)}% ({h}/{s})")
    return out
parts=[]
ho,hn,hd=load('h-home-old.json'),load('h-home-new.json'),load('h-home-new-drift.json')
if ho and hn: parts+=harness('harness home',ho,hn,hd,"Home's kinds")+['']
ro,rn,rd=load('h-rep-old.json'),load('h-rep-new.json'),load('h-rep-new-drift.json')
if ro and rn: parts+=harness('harness spread',ro,rn,rd,"The report's representative spread")+['']
K9=['dormouse','fox','marten','squirrel','mole','hedgehog','stoat','hare','badger']
parts+=real(['real-old-'+k+'.md' for k in K9],['real-new-'+k+'.md' for k in K9])
open(os.path.join(D,'tables.md'),'w').write('\n'.join(parts)+'\n')
open(os.path.join(D,'flags.txt'),'w').write('\n'.join(flags)+'\n')
print(len(parts),'lines;',len(flags),'flags')
