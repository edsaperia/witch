# revalidate-1

- Source SHA: 57aa9d40ca8545842237f10f3767d7b6cbb7633c (PR #1477)
- Branch: claude/expert-revalidate-1
- Start: 2026-10-30T04:30:37Z; wall time 150 s; exit code 0
- Preflight (all passed): `npm ci` exit 0; `npm run typecheck` exit 0; `npx vitest run src/bots/expert.test.ts tools/docs` 3 files, 16 tests passed; `node --test` expert-progress, expert-search-core, expert-space: 7 passed, 0 failed.
- Command (repo root):

```
timeout 600s node --input-type=module -e 'import{runtime}from"./tools/balance/report-runtime.mjs";import{writeFileSync}from"node:fs";const R=await runtime();try{const rows=[];for(const bpm of [100,200])for(const bot of ["expert","skilled"])rows.push(R.run({worldSeed:0,seed:1000,bpm,island:"home",condition:"matched",bag:"satchel",hat:"none",wearsHat:false,parts:[],bot},4200));writeFileSync("revalidation.jsonl",rows.map(x=>JSON.stringify(x)).join("\n")+"\n")}finally{await R.close()}'
```

Output: `revalidation.jsonl` (4 rows: expert/skilled at bpm 100 and 200).
