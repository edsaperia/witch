// Explicit allocation launcher; importing this file never starts a browser or supervisor.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const c=require('./contract.cjs');
async function main() {
  const localPath=path.resolve(process.argv[2]),local=JSON.parse(fs.readFileSync(localPath,'utf8'));
  const ready=JSON.parse(fs.readFileSync(path.join(__dirname,'ready.json'),'utf8'));
  c.inputs(local,ready);
  const head=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
  c.assert(cp.execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim()==='codex/lake-shader-measurement','Wrong owner branch');
  c.assert(!cp.execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim(),'Tracked preparation changes are not reviewed');
  const a=JSON.parse(fs.readFileSync(path.resolve(process.argv[3]),'utf8'));
  c.allocation(a,head); // Expensive file checks happen BEFORE freshness is accepted.
  const out=path.resolve(local.out);c.assert(!fs.existsSync(out),'Fresh dedicated output required');
  const {run}=require(path.join(local.watchdogDir,'owned-run-watchdog.cjs'));
  const receipt=await run({cwd:process.cwd(),out,deadlineMs:250000,args:[path.join(__dirname,'driver.cjs'),localPath,out],env:{INTEL_SLOT:a.slot,PRECEDING_RELEASE:a.priorFree}});
  console.log(JSON.stringify(receipt));
  process.exitCode=receipt.cleanupVerified&&receipt.withinCap&&!receipt.externalWatchdog&&receipt.driverExitCode===0?0:1;
}
if(require.main===module)main().catch(e=>{console.error(String(e));process.exitCode=1;});
module.exports={main};
