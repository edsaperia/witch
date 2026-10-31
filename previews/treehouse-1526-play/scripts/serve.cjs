const http=require('http'),fs=require('fs'),path=require('path');
const root='/home/user/witch/dist';
const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.wasm':'application/wasm','.svg':'image/svg+xml','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav','.webp':'image/webp','.woff2':'font/woff2'};
function start(port=8765){return new Promise(r=>{const s=http.createServer((q,res)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(root,p);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream','cache-control':'no-store'});res.end(d);});});s.listen(port,()=>r(s));});}
module.exports={start};
if(require.main===module){const port=8765;start(port).then(s=>{const [cmd,...args]=process.argv.slice(2);const c=require('child_process').spawn(cmd,args,{stdio:'inherit'});c.on('exit',code=>{s.close();process.exit(code??1);});});}
