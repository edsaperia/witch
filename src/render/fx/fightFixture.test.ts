import { expect, it } from "vitest";
import fixture from "../../../tools/magic-mock/fight-fixture.json";
import { newGame, stepGame, STEP } from "../../rules/game";
import { setupArena, arenaAttack } from "../../rules/arena";
import { TUNING } from "../../rules/tuning";

it("the timing fixture reaches four real grammar bodies within twelve seconds",()=>{
  const g=newGame(fixture.seed,TUNING);g.clock.paused=false;g.party.paused=true;
  setupArena(g,fixture.pack,{wildOnly:true});
  expect(arenaAttack(g,JSON.stringify(fixture.attack))).toEqual([]);
  let active=0;
  for(let i=0;i<12/STEP&&active<4;i++){
    g.witches[0].health.hp=1e6;
    stepGame(g,{moveX:0,moveZ:0,toggleMode:false,zoom:0,autoTalk:false},STEP);
    const s=g.combat.spells;
    active=(s?.bodies.filter(b=>b.alive).length??0)+(s?.beams.length??0)+(s?.zones.length??0);
  }
  expect(active).toBeGreaterThanOrEqual(4);
  expect(g.creatures.filter(c=>!c.gone&&Math.hypot(c.x-g.witch.x,c.z-g.witch.z)<45).length).toBeGreaterThanOrEqual(12);
});
