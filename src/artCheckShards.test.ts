// Keep the pure orchestration fixtures in normal CI discovery without editing the shared CI workflow.
import {test,expect} from "vitest";
import {spawnSync} from "node:child_process";

test("nightly art orchestration proves complete coverage without starting an art renderer",()=>{
  const run=spawnSync(process.execPath,["--test","--test-concurrency=1","tools/art-check/shards.test.mjs"],{encoding:"utf8",timeout:30_000,maxBuffer:2*1024*1024});
  expect(run.error,run.stderr).toBeUndefined();
  expect(run.status,run.stdout+run.stderr).toBe(0);
},35_000);
