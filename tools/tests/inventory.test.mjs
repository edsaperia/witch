// Small synthetic fixtures for the static inventory; no game imports or simulations.
// node --test tools/tests/inventory.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCases, classify, candidates, systemFor } from './inventory.mjs';
import { applyReviews, reviewMembers, reviewOutputs } from './semantic.mjs';

test('finds aliased nested declarations and parameterized templates without executing', () => {
  const result=parseCases(`import { it as check, describe } from 'vitest';
    describe('rules',()=>{ check.each([[1],[2]])('cost %s',()=>{ throw Error('must not run'); });
    check.skip('later',()=>{}); });`, 'fixture.test.ts');
  assert.equal(result.cases.length,2);
  assert.equal(result.cases[0].parameterized,true);
  assert.equal(result.cases[0].fullName,'rules > cost %s');
  assert.deepEqual(result.cases[1].modifiers,['skip']);
});
test('ignores declaration-looking strings and records scoped dated comments',()=>{
  const result=parseCases(`// Ed, 2026-10-08: fixture setup only.
    import {it} from 'vitest';
    const fake="it('not a case',()=>{})";
    it('real',()=>{});`, 'fixture.test.ts');
  assert.equal(result.cases.length,1);
  assert.equal(result.cases[0].citations[0].scope,'file');
});
test('keeps hard limits above outcome or historical wording',()=>{
  assert.equal(classify({fullName:'legacy replay stays deterministic',body:'simulate()'}).kind,'hard limits');
  assert.equal(classify({fullName:'performance budget',body:'advance()'}).recommendation,'keep');
  assert.equal(classify({fullName:'fighting value is 40',body:'expect(value).toBe(40)'}).kind,'current rules');
  assert.equal(classify({fullName:'survives the night',body:'advance(world)'}).kind,'outcome stats');
});
test('only suggests later same-topic evidence and labels it unverified',()=>{
  const c={fullName:'sleeping legend raw cells',citations:[{quote:'Ed sleeping legend raw cells',dates:['2026-10-01']}]};
  const result=candidates(c,[{file:'notes',line:1,quote:'2026-10-02: sleeping legend raw cells replaced',dates:['2026-10-02']},{file:'notes',line:2,quote:'sleeping legend raw cells replaced',dates:[]}]);
  assert.equal(result.length,1);
  assert.match(result[0].status,/not a verified/);
});
test('routes protected owner areas and tools',()=>{
  assert.equal(systemFor('src/rules/combat.test.ts'),'combat');
  assert.equal(systemFor('src/online/authority.test.ts'),'multiplayer');
  assert.equal(systemFor('tools/ci/select.test.ts'),'tools-ci');
});
test('semantic groups use explicit membership and preserve undivided file timing',()=>{
  const data={files:[{file:'one.test.ts',fileRuntimeSeconds:10,cases:[{id:'one.test.ts:1',line:1,name:'keep'},{id:'one.test.ts:2',line:2,name:'other'}]}]};
  const group={id:'S1',title:'Integrity',kind:'hard limits',files:['one.test.ts'],includeLines:[1],examples:['keep'],question:'Keep?',reason:'Exact equality.'};
  const reviews={'saves-replay-robustness':{status:'preview',protections:[],rulings:[],groups:[group]}};
  assert.equal(reviewMembers(data,group).length,1);
  applyReviews(data,reviews);
  assert.equal(data.files[0].cases[0].kind,'hard limits');
  assert.equal(data.files[0].cases[1].kind,undefined);
  assert.match(reviewOutputs(data,reviews)['saves-replay-robustness.md'],/~10.000 historical file-seconds/);
});
test('semantic review rejects missing examples and duplicate case assignments',()=>{
  const data={files:[{file:'one.test.ts',cases:[{id:'one.test.ts:1',line:1,name:'keep'}]}]};
  const group={id:'S1',files:['one.test.ts'],examples:['missing']};
  assert.throws(()=>applyReviews(data,{x:{groups:[group]}}),/Example missing/);
  group.examples=['keep'];
  assert.throws(()=>applyReviews(data,{x:{groups:[group,group]}}),/Duplicate/);
});
test('finds numeric simulated outcomes without relying on survival wording',()=>{
  assert.equal(classify({fullName:'curves on its way home',simulationContext:true,body:'run(g,60); expect(maxAway).toBeGreaterThan(70);'}).kind,'outcome stats');
  assert.equal(classify({fullName:'guard creates a shot',simulationContext:true,body:'for(let i=0;i<100;i++) stepGame(g); expect(shots.length).toBe(3);'}).kind,'outcome stats');
  assert.equal(classify({fullName:'circle geometry',simulationContext:false,body:'expect(radius).toBeGreaterThan(3)'}).kind,'current rules');
});
