const {chromium}=require('playwright'),{diff}=require('./diff.cjs'),fs=require('fs');
const raw='/home/user/witch/previews/refraction-1543-review/raw/';
(async()=>{const b=await chromium.launch();const out={};for(const [k,a,c] of JSON.parse(process.argv[2])){const {stats}=await diff(b,fs.readFileSync(raw+a),fs.readFileSync(raw+c));out[k]=stats;console.log(k,JSON.stringify(stats));}
fs.writeFileSync(raw+process.argv[3],JSON.stringify(out,null,1));await b.close();})();
