// Offline source-attributed compression model, NOT a working split build or boot measurement.
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const ts = require('typescript');
const { decode } = require('@jridgewell/sourcemap-codec');
const baseline = JSON.parse(fs.readFileSync('docs/archive/rare-screens/startup-before.json'));
const creatorRetain = new Set(['loadGenome','saveGenome','classicPalette','cpuCanvas','slot','swatchAt']);
const creatorText = fs.readFileSync('src/ui/creator.ts','utf8');
const tree = ts.createSourceFile('creator.ts',creatorText,ts.ScriptTarget.Latest,true), declarations = new Map();
for(const node of tree.statements) {
  if(ts.isVariableStatement(node)) { for(const d of node.declarationList.declarations) if(ts.isIdentifier(d.name)) declarations.set(d.name.text,node); }
  else if((ts.isFunctionDeclaration(node)||ts.isClassDeclaration(node))&&node.name) declarations.set(node.name.text,node);
}
// Resolve the top-level helper closure; property names do not create false dependencies.
let changed=true;
while(changed){changed=false;for(const name of [...creatorRetain]){const root=declarations.get(name);if(!root)continue;const visit=n=>{
  if(ts.isIdentifier(n)&&!(ts.isPropertyAccessExpression(n.parent)&&n.parent.name===n)&&declarations.has(n.text)&&!creatorRetain.has(n.text)){creatorRetain.add(n.text);changed=true;}
  ts.forEachChild(n,visit);
};visit(root);}}
const retainedRanges=[...new Set([...creatorRetain].map(n=>declarations.get(n)).filter(Boolean))].map(n=>[n.getFullStart(),n.end]);
if(retainedRanges.length<6)throw Error('Required eager Creator helpers were not resolved');
const groups={
  Telescope:['src/app/telescope.ts'], Zoo:['src/app/zooOverlay.ts'], DJ:['src/ui/djBooth.ts'],
  Studio:['src/app/studio.ts','src/ui/studioPanel.ts'],
  Creator:['src/ui/creator.ts','src/ui/roomWalk.ts','src/ui/spellScroll.ts','src/render/hatIcons.ts'],
};
const files=[];
for(const file of baseline.files.filter(f=>f.file.endsWith('.js'))){
 const code=fs.readFileSync(path.join('dist',file.file),'utf8'),map=JSON.parse(fs.readFileSync(path.join('dist',file.file+'.map'),'utf8')),lines=code.split('\n'),mappings=decode(map.mappings),ranges=[];
 let offset=0;
 for(let line=0;line<lines.length;line++){
  const parts=mappings[line]||[];
  for(let i=0;i<parts.length;i++){
   const s=parts[i];if(s.length<4)continue;
   const source=map.sources[s[1]].replace(/^(\.\.\/)+/,''),start=offset+s[0],end=offset+(parts[i+1]?.[0]??lines[line].length);
   let group=Object.keys(groups).find(g=>groups[g].includes(source));if(!group)continue;
   if(source==='src/ui/creator.ts'){
     if(map.sourcesContent[s[1]]!==creatorText)throw Error('Creator source differs from baseline');
     const pos=tree.getPositionOfLineAndCharacter(s[2],s[3]);if(retainedRanges.some(([a,b])=>pos>=a&&pos<b))continue;
   }
   // integratedGpu stays eager; zooUrl can stay as a tiny URL-only helper.
   if(source==='src/app/telescope.ts'&&s[2]>=152)continue;
   if(source==='src/app/zooOverlay.ts'&&s[2]>=32&&s[2]<=33)continue;
   if(end>start)ranges.push({start,end,group,source});
  }
  offset+=lines[line].length+1;
 }
 files.push({code,ranges,gzip:file.gzip9});
}
const measure=names=>{
 const bySource={},fragments=[];let generated=0,gzipDelta=0;
 for(const file of files){let cursor=0,kept='';for(const r of file.ranges.filter(r=>names.includes(r.group))){
   kept+=file.code.slice(cursor,r.start);cursor=r.end;const text=file.code.slice(r.start,r.end),bytes=Buffer.byteLength(text);generated+=bytes;bySource[r.source]=(bySource[r.source]||0)+bytes;fragments.push(text);
  }kept+=file.code.slice(cursor);gzipDelta+=file.gzip-zlib.gzipSync(Buffer.from(kept),{level:9}).length;
 }
 return {generatedBytes:generated,estimatedGzip9Reduction:gzipDelta,isolatedFragmentGzip9:zlib.gzipSync(Buffer.from(fragments.join('')),{level:9}).length,bySource};
};
const result={sourceSha:baseline.sourceSha,method:'Source-map spans removed from original chunks then gzip9 recomputed; compression model only, no valid split JS, new chunk/bridge/helper overhead excluded, unmapped bytes retained. Group marginal reductions are not additive.',creatorRetainedDeclarations:[...creatorRetain].sort(),groups:Object.fromEntries(Object.keys(groups).map(g=>[g,measure([g])])),combined:measure(Object.keys(groups)),actualSplitOrBootMeasured:false};
for(const row of Object.values(result.groups)) for(const [source,bytes]of Object.entries(row.bySource)) {
 const base=baseline.sources.find(s=>s.source===source);if(!base||bytes>base.generatedBytes)throw Error('Attribution exceeds baseline: '+source);
}
fs.writeFileSync('docs/archive/rare-screens/value-estimate.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
