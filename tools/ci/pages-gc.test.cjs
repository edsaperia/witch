// main's gh-pages clean-up keeps the new and the previous build, and never touches previews, the Making Of or the root's files.
//   node --test tools/ci/pages-gc.test.cjs
const {test,after}=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs'), os=require('node:os'), path=require('node:path');
const {execFileSync}=require('node:child_process');
const {plan,apply}=require('./pages-gc.cjs');

const made=[]; after(()=>{ for(const d of made) fs.rmSync(d,{recursive:true,force:true}); });
function tree(files){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'pages-gc-')); made.push(root);
  for(const [f,text] of Object.entries(files)){ fs.mkdirSync(path.dirname(path.join(root,f)),{recursive:true}); fs.writeFileSync(path.join(root,f),text); }
  return root;
}
const has=(root,f)=>fs.existsSync(path.join(root,f));
// A new build (v3) and a gh-pages holding v2 (the previous build, live now) over the leftovers of v1.
const dist=()=>tree({
  'index.html':'<script type="module" src="./assets/main-v3.js"></script>',
  'assets/main-v3.js':'import("./chart-v3.js"); new URL("worker-v3.js", import.meta.url); fetch(base+"news/index.json")',
  'assets/chart-v3.js':'x', 'assets/worker-v3.js':'x', 'assets/font-same.woff2':'f',
  'news/index.json':'{"batches":["batch-0-c.json"]}', 'news/batch-0-c.json':'{}',
  'online/online.html':'<script src="./assets/online-v3.js"></script>', 'online/assets/online-v3.js':'x', 'online/version.json':'{}',
  'making-of/index.html':'<img src="media/a.png">', 'making-of/media/a.png':'p',
  'music-lab/samples/alto/alto-55.ogg':'o', 'version.json':'{"version":"v3"}',
});
const site=()=>tree({
  'index.html':'<link rel="modulepreload" href="./assets/main-v2.js"><style>@font-face{src:url(assets/font-same.woff2)}</style>',
  'assets/main-v2.js':'const m=["assets/chart-v2.js"];new URL("worker-v2.js",import.meta.url);fetch(base+"news/index.json")',
  'assets/chart-v2.js':'import"./lazy-v2.js"', 'assets/lazy-v2.js':'x', 'assets/worker-v2.js':'importScripts("shared-v2.js")', 'assets/shared-v2.js':'x',
  'assets/font-same.woff2':'f',
  'assets/main-v1.js':'old', 'assets/chart-v1.js':'old', 'assets/worker-v1.js':'old', 'assets/old/kept.js':'not a build folder',
  'news/index.json':'{"batches":["batch-0-b.json","batch-1-b.json"]}', 'news/batch-0-b.json':'{}', 'news/batch-1-b.json':'{}', 'news/batch-0-a.json':'{}',
  'online/online.html':'<script src="./assets/online-v2.js"></script>', 'online/assets/online-v2.js':'x', 'online/assets/online-v1.js':'old', 'online/version.json':'{}',
  'making-of/media/gone.png':'p', 'making-of/media/a.png':'p',
  'pr-12/index.html':'x', 'pr-12/assets/main-pr.js':'x', 'music-lab/samples/alto/alto-53.ogg':'o',
  'version.json':'{"version":"v2"}', '.nojekyll':'', 'CNAME-ish.txt':'root file', 'legacy/assets/main-v0.js':'outside the build folders',
});

test('deletes only stale files in the build folders, keeping the new and the previous build',()=>{
  const d=dist(), s=site(), p=plan(d,s);
  assert.equal(p.reason,null);
  assert.deepEqual(p.delete,['assets/chart-v1.js','assets/main-v1.js','assets/worker-v1.js','music-lab/samples/alto/alto-53.ogg','news/batch-0-a.json','online/assets/online-v1.js']);
  for(const f of ['assets/main-v2.js','assets/chart-v2.js','assets/lazy-v2.js','assets/worker-v2.js','assets/shared-v2.js','news/batch-1-b.json','online/assets/online-v2.js']) assert.ok(p.previous.includes(f),f);
  apply(p,s);
  for(const f of p.delete) assert.ok(!has(s,f),f);
  for(const f of ['pr-12/assets/main-pr.js','making-of/media/gone.png','version.json','.nojekyll','online/version.json','CNAME-ish.txt','legacy/assets/main-v0.js','assets/old/kept.js','assets/main-v2.js','news/batch-0-b.json']) assert.ok(has(s,f),f);
});

test('deletes nothing when the scan cannot find the previous build',()=>{
  const d=dist();
  const noIndex=site(); fs.rmSync(path.join(noIndex,'index.html'));
  assert.match(plan(d,noIndex).reason,/no index.html/);
  const opaque=site(); fs.writeFileSync(path.join(opaque,'index.html'),'<p>moved</p>'); fs.writeFileSync(path.join(opaque,'online/online.html'),'<p>moved</p>');
  const p=plan(d,opaque); assert.match(p.reason,/understood nothing/); assert.deepEqual(p.delete,[]);
  const gameOnly=site(); fs.writeFileSync(path.join(gameOnly,'index.html'),'<script src="loader.js"></script>');
  assert.match(plan(d,gameOnly).reason,/understood nothing/);
  const emptyDist=tree({'assets/x.js':'x'}); assert.match(plan(emptyDist,site()).reason,/new dist has no index.html/);
});

test('apply refuses a path outside the build folders',()=>{
  const s=site();
  assert.throws(()=>apply({delete:['making-of/media/a.png'],buildDirs:['assets']},s),/refusing/);
  assert.throws(()=>apply({delete:['assets/version.json'],buildDirs:['assets']},s),/refusing/);
  assert.ok(has(s,'making-of/media/a.png'));
});

test('the command line deletes and reports, and --dry-run deletes nothing',()=>{
  const d=dist(), s=site(), cli=path.join(__dirname,'pages-gc.cjs');
  const dry=execFileSync('node',[cli,d,s,'--dry-run'],{encoding:'utf8',env:{...process.env,GITHUB_ACTIONS:''}});
  assert.match(dry,/would delete 6 stale build files/); assert.ok(has(s,'assets/main-v1.js'));
  const run=execFileSync('node',[cli,d,s],{encoding:'utf8',env:{...process.env,GITHUB_ACTIONS:'true'}});
  assert.match(run,/deleting 6 stale build files/); assert.match(run,/::group::/); assert.match(run,/- assets\/main-v1.js/);
  assert.ok(!has(s,'assets/main-v1.js'));
});

test("the deploy runs it for main's root only, before the copy, and a failure never stops the deploy",()=>{
  const steps=require('yaml').parse(fs.readFileSync('.github/workflows/ci.yml','utf8')).jobs.deploy.steps;
  const run=steps.find(s=>s.name==='Publish to gh-pages').run;
  const gc=run.indexOf('node ../tools/ci/pages-gc.cjs ../dist .');
  assert.ok(gc>0);
  const before=run.slice(0,gc), branch=before.lastIndexOf('if [ "$DEST" != "." ]; then rm -rf "$DEST"; else');
  // (inside the main-only branch: every if opened since it is closed again, so it is still open)
  const code=before.slice(branch).split('\n').filter(l=>!/^\s*#/.test(l)).join('\n'), count=re=>(code.match(re)??[]).length;
  assert.ok(branch>0 && count(/(?:^|[\s;])if\s/g)===count(/(?:^|[\s;])fi\b/g)+1,'inside the main-only branch');
  assert.ok(gc<run.indexOf('cp -a ../dist/.'));
  assert.match(run.slice(gc,run.indexOf('\n',gc)),/\|\| echo "::warning::/);
});
