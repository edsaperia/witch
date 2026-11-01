// Small synthetic fixtures for the static inventory; no game imports or simulations.
// node --test tools/tests/inventory.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCases, classify, candidates, systemFor } from './inventory.mjs';

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
