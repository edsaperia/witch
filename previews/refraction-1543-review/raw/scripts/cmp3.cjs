const {chromium}=require('playwright'),{diff}=require('./diff.cjs'),fs=require('fs');
const R='/home/user/witch/previews/refraction-1543-review/',raw=R+'raw/';const out={};
(async()=>{const b=await chromium.launch();
const go=async(k,a,c,save)=>{const {stats,png}=await diff(b,fs.readFileSync(raw+a),fs.readFileSync(raw+c));out[k]={a,b:c,...stats};if(save)fs.writeFileSync(R+save,png);console.log(k,JSON.stringify(stats));};
for(const s of ['start','ring','fire','combined']){
 for(const p of ['F-cand-absent','F-cand-ref0','F-base-absent']) await go(`noise/${p}/${s}`,`${p}/${s}.png`,`${p}/${s}-again.png`);
 await go(`b1a/${s}`,`F-cand-absent/${s}.png`,`F-cand-ref0/${s}.png`,`b1a-${s}-absent-vs-ref0-x8.png`);
 await go(`b1b/${s}`,`F-cand-absent/${s}.png`,`F-base-absent/${s}.png`,`b1b-${s}-cand-vs-base-x8.png`);
}
for(const c of ['cap-ring','cap-fire','cap-combined']){
 await go(`${c}/off-vs-on`,`F-cand-absent/${c}/off.png`,`F-cand-absent/${c}/on.png`,`${c}-off-vs-on-x8.png`);
 await go(`${c}/off-vs-return`,`F-cand-absent/${c}/off.png`,`F-cand-absent/${c}/off-return.png`);
 await go(`${c}/off-vs-base`,`F-cand-absent/${c}/off.png`,`F-base-absent/${c.replace('cap-','')}.png`);
}
fs.writeFileSync(R+'diffs-frozen.json',JSON.stringify(out,null,1));await b.close();})();
