// The taut chain's clip scenes (#1982). node taut.cjs <scene> <frames dir> [old]
//   tug: treetops, a youth 3 m short of its chain's end behind her: pull (dips), let off (rises), pull on (lands), pull on (pop)
//   yank: on foot, a legend at its chain's end: walk on, yanked back
//   look: a youth's, an adult's and a legend's chains side by side, at game zoom, then zoomed out three steps
// old: the same with ?tautchain=0
const { open, film, log } = require("./rec.cjs"), fs = require("fs"), path = require("path");
const [scene, dir, old] = process.argv.slice(2);
(async () => {
  const R = await open({ dist: "/home/user/witch/dist", link: `?shot=at:0,0&seed=123&creator=0&wave=off${old ? "&tautchain=0" : ""}`, init: () => { const s = document.createElement("style"); s.textContent = "#sound-note{display:none!important}"; document.addEventListener("DOMContentLoaded", () => document.head.appendChild(s)); } });
  const states = [];
  try {
    const { page, step, artIn, waitArt } = R, F = film(page, dir);
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForTimeout(1000); }
    const put = (levels, spots, treetop, dx0 = 40) => page.evaluate(([levels, spots, treetop, dx0]) => {
      const w = window.witch, g = w.game, D = g.map.dancefloor, x = D.x + dx0, z = D.z + 30;
      const said = w.shot(`at:${x},${z}${treetop ? ",treetop" : ""}`);
      const pool = g.creatures.filter(c => !c.gone && !c.boss && !c.partyLegend && !c.leashed && c.level >= 1 && c.level < 3);
      for (const id of g.leash.stack) { const c = g.creatures[id]; c.leashed = false; c.state = "wild"; }
      g.leash.stack.length = 0;
      const got = levels.map((lv, i) => { const c = pool[i], [dx, dz] = spots[i]; Object.assign(c, { level: lv, x: x + dx, z: z + dz, tx: x + dx, tz: z + dz, leashed: true, state: "leashed", enraged: false, siege: undefined, fight: undefined, circle: undefined, rest: 0 }); g.leash.stack.push(c.id); return `${c.species}${lv}`; });
      g.byArea = null;
      return JSON.stringify({ said, got, zoomStep: g.camera.zoomStep, taut: g.tuning.leash.chain.taut && g.tuning.leash.chain.taut.on, L: g.tuning.leash.chain.length });
    }, [levels, spots, treetop, dx0]);
    const state = () => page.evaluate(() => { const g = window.witch.game, W = g.witches[0], b = W.body; return { t: +g.clock.time.toFixed(2), x: +b.x.toFixed(1), mode: b.mode, lift: +b.lift.toFixed(2), tug: +(W.tug ?? 0).toFixed(3), pop: W.pop ? +W.pop.k.toFixed(2) : 0, stack: W.leash.stack.length, placed: W.leash.placed.length, yankAt: W.yankAt ?? null, zoom: g.camera.zoomStep, d: W.leash.stack.concat(W.leash.placed.map(p => p.id)).map(id => Math.round(Math.hypot(g.creatures[id].x - b.x, g.creatures[id].z - b.z))) }; });
    let i = 0, last;
    // one game step (1/60 s); every other one drawn and saved (30 fps)
    const tick = async (o, tag) => { const draw = i % 2 === 1; await step(o, 1, draw); if (draw) { await waitArt(); await F.shoot(); } i++; last = await state(); states.push({ i, tag, ...last }); return last; };
    const run = async (o, frames, tag, until) => { for (let k = 0; k < frames; k++) { const s = await tick(typeof o === "function" ? o(k) : o, tag); if (until && until(s)) break; } log(tag, JSON.stringify(last)); };
    const L = 80;
    if (scene === "tug") {
      // (warm the art along her way east first, unfilmed: fly it once with nothing on her chain, then come back)
      log(await put([], [], true, -20)); await artIn();
      for (let k = 0; k < 12; k++) { await step({ moveX: 1 }, 30); await waitArt(); }
      log("warmed to", JSON.stringify(await state()));
      log(await put([1], [[-(L - 1), 0]], true, -20)); await artIn();
      await run({}, 30, "hover");
      if (old) { await run({ moveX: 1 }, 300, "old: pulling on"); await run({}, 60, "old: let off"); }
      else {
        await run({ moveX: 1 }, 180, "pull: dips", s => s.tug >= 0.2);
        await run({}, 240, "let off: rises", s => s.tug === 0 && s.lift >= 0.995);
        await run({}, 30, "up again");
        await run({ moveX: 1 }, 600, "pull on: comes down", s => s.mode === "ground");
        if (last.mode !== "ground") throw new Error("she never landed");
        await run({ moveX: 1 }, 600, "on foot, pulling: the sigil eases out", s => s.placed > 0);
        if (!last.placed) throw new Error("the sigil never popped");
        await run({}, 90, "plopped");
      }
    } else if (scene === "yank") {
      log(await put([3], [[-(L - 2), 0]], false)); await artIn();
      await run({}, 30, "stand");
      await run({ moveX: 1 }, 420, "walk on past the legend's chain");
      await run({}, 60, "stop");
    } else if (scene === "look") {
      // (she walks east at about the pace they follow, so the three chains trail behind her at length, side by side)
      log(await put([1, 2, 3], [[-62, -16], [-68, 0], [-62, 16]], false, 10)); await artIn();
      await run({ moveX: 0.3 }, 360, "three chains, game zoom");
      await run(k => ({ moveX: 0.3, zoom: k % 10 === 0 && k < 40 ? 1 : 0 }), 300, "zoomed out four steps");
    } else throw new Error("scene?");
    log("frames", F.n);
  } finally { fs.writeFileSync(path.join(dir, "..", `${path.basename(dir)}.states.json`), JSON.stringify(states)); await R.close(); }
  if (R.errors.length) process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
