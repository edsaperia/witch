# fixed close-up crop of the leash/fox region, base above candidate, for each chain pose
import sys
from PIL import Image
base,cand,out=sys.argv[1:4]
box=(560,120,1100,420); s=2
names=['chain','falling','path','lifting','rejoined']
w,h=(box[2]-box[0])*s,(box[3]-box[1])*s
S=Image.new('RGB',(w*5,h*2))
for i,n in enumerate(names):
    for j,d in enumerate([base,cand]):
        S.paste(Image.open(f'{d}/{n}.png').convert('RGB').crop(box).resize((w,h),Image.NEAREST),(i*w,j*h))
S.save(out,optimize=True)
