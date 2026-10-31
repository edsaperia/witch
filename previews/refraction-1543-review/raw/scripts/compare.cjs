const {chromium}=require('playwright'),{diff}=require('./diff.cjs'),fs=require('fs'),path=require('path');
const R='/home/user/witch/previews/refraction-1543-review',raw=R+'/raw';
(async()=>{const b=await chromium.launch();const res={};
 const rd=p=>fs.readFileSync(path.join(raw,p));
 const go=async(key,a,c,save)=>{const {stats,png}=await diff(b,rd(a),rd(c));res[key]={a,b:c,...stats};if(save&&png)fs.writeFileSync(path.join(R,save),png);console.log(key,JSON.stringify(stats));};
 for(const s of ['start','ring','fire','combined']){
  for(const p of ['cand-absent','cand-ref0','base-absent','cand-ref1']) await go(`noise/${p}/${s}`,`${p}/${s}.png`,`${p}/${s}-again.png`);
  await go(`b1a/${s}`,`cand-absent/${s}.png`,`cand-ref0/${s}.png`,`b1a-${s}-absent-vs-ref0-x8.png`);
  await go(`b1b/${s}`,`cand-absent/${s}.png`,`base-absent/${s}.png`,`b1b-${s}-cand-vs-base-x8.png`);
  await go(`b1c/${s}`,`cand-ref0/${s}.png`,`base-absent/${s}.png`);
 }
 for(const c of ['cap-ring','cap-fire','cap-combined']){
  await go(`${c}/off-vs-on`,`cand-ref1/${c}/off.png`,`cand-ref1/${c}/on.png`,`${c}-off-vs-on-x8.png`);
  await go(`${c}/off-vs-return`,`cand-ref1/${c}/off.png`,`cand-ref1/${c}/off-return.png`);
 }
 // the ON page's OFF frames vs the base build (same frozen state)
 await go('cap-ring/off-vs-base-ring',`cand-ref1/cap-ring/off.png`,`base-absent/ring.png`);
 fs.writeFileSync(R+'/diffs.json',JSON.stringify(res,null,1)); await b.close();})();
