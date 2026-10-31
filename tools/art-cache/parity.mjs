import {build} from 'esbuild';
import {writeFileSync,readFileSync,mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
// Capture before the import-only refactor, then compare its complete typed-array results.
// ImageData-only backend: unsupported canvas operations fail rather than silently no-op.
const mode=process.argv[2], directory=process.argv[3];
if(!['capture','compare'].includes(mode)||!directory)throw Error('Usage: node tools/art-cache/parity.mjs capture|compare <snapshot-directory>');
mkdirSync(directory,{recursive:true});
const source=`
import {runJob} from './src/render/artBuild';
import {loadStyle} from './src/render/style';
import {HOUSE_ROOMS} from './src/rules/houseRooms';
export {runJob,loadStyle,HOUSE_ROOMS};`;
await build({stdin:{contents:source,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:directory+'/bundle.mjs',logLevel:'error',plugins:[{name:'empty-overrides',setup(b){b.onResolve({filter:/^virtual:art-overrides$/},()=>({path:'overrides',namespace:'parity'}));b.onLoad({filter:/.*/,namespace:'parity'},()=>({contents:'export default {}',loader:'js'}));}}]});
const {runJob,loadStyle,HOUSE_ROOMS}=await import(pathToFileURL(directory+'/bundle.mjs'));
class PixelCanvas{
 constructor(width,height){this.width=width;this.height=height;this.data=new Uint8ClampedArray(width*height*4);}
 getContext(){return {createImageData:(w,h)=>({width:w,height:h,data:new Uint8ClampedArray(w*h*4)}),putImageData:(im,dx=0,dy=0)=>{for(let y=0;y<im.height;y++)for(let x=0;x<im.width;x++)if(x+dx>=0&&x+dx<this.width&&y+dy>=0&&y+dy<this.height)this.data.set(im.data.subarray((y*im.width+x)*4,(y*im.width+x)*4+4),((y+dy)*this.width+x+dx)*4);},getImageData:(sx,sy,w,h)=>{const out=new Uint8ClampedArray(w*h*4);for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(x+sx>=0&&x+sx<this.width&&y+sy>=0&&y+sy<this.height)out.set(this.data.subarray(((y+sy)*this.width+x+sx)*4,((y+sy)*this.width+x+sx)*4+4),(y*w+x)*4);return {width:w,height:h,data:out};}};}
}
const style=loadStyle(),jobs=[{kind:'housePiece',id:HOUSE_ROOMS.objects[0].id+'@parity',ppm:8,pitch:.7,style},{kind:'creature',id:'fox',style},{kind:'type',id:0,seed:424242,K:1,style}];
const {serialize}=await import('node:v8');const {createHash}=await import('node:crypto');

for(const job of jobs){const out=runJob(job,(w,h)=>new PixelCanvas(w,h));if(job.kind==='housePiece'&&!out.housePiece)throw Error('house fixture must draw');const bytes=serialize(out),file=directory+'/'+job.kind+'.bin';if(mode==='capture')writeFileSync(file,bytes);else if(!readFileSync(file).equals(bytes))throw Error(job.kind+' output differs');console.log(JSON.stringify({mode,kind:job.kind,id:job.id,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}));}
