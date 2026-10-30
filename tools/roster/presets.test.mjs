import test from "node:test";
import assert from "node:assert/strict";
import { GENOMES, speciesOf, genomeHash, genomeProblems } from "../../art/genome/index.js";
import { rosterGenome, ROSTER_PRESETS } from "../../art/roster/presets.js";

test("default-off and unknown switch preserve every production record by identity and hash", () => {
  for (const g of GENOMES) {
    assert.equal(rosterGenome(g), g);
    assert.equal(rosterGenome(g, ["unknown"]), g);
    assert.equal(genomeHash(rosterGenome(g)), genomeHash(g));
  }
});

test("opt-in changes only selected genomes, has valid sockets, and leaves source records untouched", () => {
  const before = JSON.stringify(GENOMES);
  for (const id of Object.keys(ROSTER_PRESETS)) for (const g of GENOMES) {
    const selected = rosterGenome(g, [id]);
    if (g.id !== id) assert.equal(selected, g);
    else {
      assert.notEqual(genomeHash(selected), genomeHash(g));
      assert.deepEqual(genomeProblems(selected), []);
      assert.equal(speciesOf(selected).id, g.id);
      assert.deepEqual(selected.levels[3].features, g.levels?.[3]?.features);
      assert.equal(selected.name, g.name);
      assert.equal(selected.builder, g.builder);
    }
  }
  assert.equal(JSON.stringify(GENOMES), before);
});

test("ordinary corrections survive per-level overrides and restore elder anatomy", () => {
  const original = Object.fromEntries(GENOMES.map(g => [g.id, g]));
  const bear = speciesOf(rosterGenome(original.bear, ["bear"]));
  for (const l of [0, 1, 2]) assert.equal(bear.levelQ[l].humpK, 0);
  assert.equal(bear.levelQ[3].humpK, original.bear.levels[3].body.humpK);
  const fox = speciesOf(rosterGenome(original.arcticfox, ["arcticfox"]));
  for (const l of [0, 1, 2]) assert.equal(fox.levelQ[l].ear, "round");
  assert.equal(fox.levelQ[3].ear, "point");
  const snow = speciesOf(rosterGenome(original.snowleopard, ["snowleopard"]));
  for (const l of [0, 1, 2]) { assert.equal(snow.levelQ[l].spots, false); assert.ok(snow.levelQ[l].rosettes); }
  assert.equal(snow.levelQ[3].spots, true);
  assert.equal(snow.levelQ[3].rosettes, false);
});
