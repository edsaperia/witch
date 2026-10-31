// Ground warm probe: build and verify an exact-head game-data fixture without a browser or server.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files = root => fs.readdirSync(root,{withFileTypes:true}).flatMap(e => e.isDirectory() ? files(path.join(root,e.name)) : [path.join(root,e.name)]);
export function verifyInventory(root, inventory) {
  for (const [name,digest] of Object.entries(inventory)) {
    const file = path.resolve(root,name);
    if (!file.startsWith(path.resolve(root) + path.sep) || !fs.existsSync(file) || hash(file) !== digest) throw Error(`Missing or changed built path: ${name}`);
  }
  if (!inventory['index.html'] || !inventory['version.json'] || !Object.keys(inventory).some(p => p.endsWith('.js'))) throw Error('Incomplete built asset inventory');
}
export async function preflight(root, sha) {
  const metadata = JSON.parse(fs.readFileSync(path.join(root,'ground-warm-preflight.json'),'utf8'));
  if (metadata.sha !== sha) throw Error('Preflight fixture SHA mismatch');
  verifyInventory(root,metadata.inventory);
  const {groundWarmFixture} = await import(pathToFileURL(path.join(root,'ground-warm-fixture.mjs')).href);
  return groundWarmFixture();
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const root = path.resolve(process.argv[2] || 'dist'), sha = process.env.EXPECT_SHA;
    if (!sha) throw Error('EXPECT_SHA required');
    if (process.argv.includes('--prepare')) {
      if (execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim() !== sha || execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim()) throw Error('Prepare requires clean exact candidate checkout');
      const version = JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
      if (!version.version.includes(sha.slice(0,7))) throw Error('Prepared build SHA mismatch');
      // Use Vite's real virtual data and glob transforms; never replace game data with a test stub.
      process.env.WITCH_SHA = sha;
      const {build,loadConfigFromFile} = await import('vite');
      const loaded = await loadConfigFromFile({command:'build',mode:'production'},path.resolve('vite.config.ts'));
      await build({...loaded.config,configFile:false,build:{...loaded.config.build,ssr:'tools/bench/ground-warm-fixture.ts',outDir:root,emptyOutDir:false,rollupOptions:{input:'tools/bench/ground-warm-fixture.ts',output:{entryFileNames:'ground-warm-fixture.mjs'}}}});
      const inventory = Object.fromEntries(files(root).filter(f => !f.endsWith('ground-warm-preflight.json')).map(f => [path.relative(root,f),hash(f)]));
      fs.writeFileSync(path.join(root,'ground-warm-preflight.json'),JSON.stringify({sha,inventory}));
    }
    const fixture = await preflight(root,sha);
    console.log(JSON.stringify({status:'PREFLIGHT PASS',fixture}));
  } catch (error) { console.error(`INSUFFICIENT ground-warm: preflight: ${error.message}`);process.exitCode=2; }
}
