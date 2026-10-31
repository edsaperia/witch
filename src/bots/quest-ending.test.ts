// Focused real-rule fixtures, not a night batch. The candidate cannot veto the
// automatic route/lap. Never copy these privileged test setup values into policy.
import { expect, test } from "vitest";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { largestWorldTuning } from "../test/worlds";
// Largest shipped world: automatic route completion and the final lap must cover its full area count.
import { stepParty } from "../rules/party";
import { stepWin, routeDone, straggler } from "../rules/win";
import { befriend } from "../rules/creatureStates";
import { newObserver } from "./observe";
import { partyPointer } from "../render/view/pointers";

test("timed waves reach the ending without casting or any witch control", () => {
  const g=newGame(7,largestWorldTuning(TUNING));
  g.party.spellAt=undefined;
  // Only the wave clock runs here: no bot, cast, invite, debug-next-wave or allies.
  for(let time=0;time<20000&&!routeDone(g);time+=10)stepParty(g.party,g.map,time,10,false);
  expect(routeDone(g)).toBe(true);
  g.clock.time=20000;stepWin(g,1/60);
  expect(g.win).toBeDefined();
});

test("external neutralization starts an automatic lap; observed cue equals the drawn party pointer", () => {
  const g=newGame(7,largestWorldTuning(TUNING));
  g.party.spellAt=undefined;
  for(let time=0;time<20000&&!routeDone(g);time+=10)stepParty(g.party,g.map,time,10,false);
  const enemy=g.creatures.find(c=>!c.boss&&c.level<3)!;
  for(const c of g.creatures)if(straggler(c))befriend(c,0);
  enemy.gone=false;enemy.enraged=true;
  g.clock.time=20000;stepWin(g,1/60);expect(g.win?.phase).toBe("stragglers");
  const observe=newObserver();expect(observe(g).victoryPointer).toBe(!!partyPointer(g));
  befriend(enemy,g.clock.time);g.clock.time+=1;stepWin(g,1/60);
  expect(g.win?.phase).toBe("lap");expect(observe(g).victoryPointer).toBe(true);expect(!!partyPointer(g)).toBe(true);
  // Advancing just the ending clock wins, without returning home or casting.
  g.clock.time=g.win!.lap.at(-1)!.at+.01;stepWin(g,1/60);
  expect(g.win?.phase).toBe("won");expect(observe(g).victoryPointer).toBe(!!partyPointer(g));
});
