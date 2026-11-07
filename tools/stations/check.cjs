// The dressing stations in the built game (Ed's playtest of v4273, 2026-10-23: "When the camera zooms in on the witch, it aims at her
// feet, and so when you're zoomed close her head is off screen"; "When choosing clothes etc I can't select them, I can only move the
// selector around"). For each of her dressing stations (the bedroom's, the basin, the mirror, the cloak pegs and the bags; ?shot=object:<id>, app/shot.ts), the loop running as in play:
//  - no scrolling (Ed, 2026-11-07: "no station menu is taller than the screen at 1280×720, so there's no scrolling"): its panel's
//    body never scrolls, with the focus walked over every line (the detail at each card's foot as tall as it gets), on a fresh save and
//    again with everything owned (the pause page's Unlock everything, app/debugUnlock.ts, read as the panel opens again); shots of both,
//    <out>/<station>-fresh.png and -owned.png, and the heights in <out>/heights.json;
//  - framing: once she's choosing, the part of her the station changes framed in the right half (camera.station.parts, Ed 2026-11-07:
//    "frame the part of her that station changes ... Trousers and shoes frame from the waist down"): the point the camera aims at on
//    her near the right half's middle, and, framing her legs, her feet on screen, at the start's zoom and with the zoom all the way in
//    (Z); the panel the left half, a card a shelf;
//  - the pad (a stubbed one): the d-pad moves the focus and changes nothing, ✕ chooses, R1 jumps to the next card;
//  - choosing: a click, and Space after the arrow keys move the focus (the arrows alone changing nothing), each put an owned item on her, and her drawn look follows (the view's assets: her look now,
//    and at a hat-off station her hat-off frames for it); Enter, E and Space choose in the panel, not in the game (she neither rises
//    nor puts anything down), a locked item saying it isn't found yet.
// Fails on any of those or a page error; writes <out>/<station>-<zoom>.png.
//   npm run build && node tools/stations/check.cjs [out] [dist]   (about 20 minutes in the cloud; ONLY=wardrobe,shoeRack)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/stations", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const W = 1280, H = 720, ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
const STATIONS = ["mirror", "dressingTable", "basin", "wardrobe", "shoeRack", "cloakPegs", "bags"];
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const heights = {}, fails = [], ok = (cond, what) => { log(cond ? "ok  " : "FAIL", what); if (!cond) fails.push(what); };
  try {
    for (const id of STATIONS) {
      if (ONLY && !ONLY.includes(id)) continue;
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      // a pad the page can read, its buttons set from here (window.__pad), as tools/settings/shots.cjs
      await page.addInitScript(() => {
        window.__pad = { buttons: Array.from({ length: 17 }, () => false), axes: [0, 0, 0, 0] };
        const real = navigator.getGamepads ? navigator.getGamepads.bind(navigator) : null;
        Object.defineProperty(navigator, "getGamepads", { configurable: true, writable: true, value: () => (window.__padOn ? [{ id: "DualSense (STANDARD GAMEPAD Vendor: 054c)", index: 0, connected: true, mapping: "standard", timestamp: performance.now(), axes: window.__pad.axes, buttons: window.__pad.buttons.map(p => ({ pressed: p, touched: p, value: p ? 1 : 0 })) }] : real ? real() : []) });
      });
      page.on("pageerror", e => fails.push(`${id}: page error ${e.message}`));
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=object:${id}&seed=123`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      // (the start card's any key: Q, which the station's panel leaves alone, as it takes Enter, E and Space)
      await page.keyboard.press("KeyQ");
      // (then E at it: nothing opens by nearness, Ed's playtest of 2026-10-26; pressed till the rules' step has seen her there)
      const panelIn = () => page.evaluate(() => !!document.querySelector("#station-panel")?.classList.contains("in") && !window.witch.game.clock.paused);
      for (let i = 0; i < 300 && !(await panelIn()); i++) { if (await page.evaluate(() => !window.witch.game.clock.paused)) { await page.keyboard.press("KeyE"); for (let j = 0; j < 40 && !(await panelIn()); j++) await page.waitForTimeout(500); } else await page.waitForTimeout(1000); } /* (one E, then up to 20 s for a slow frame to see it: E closes it too) */
      await page.waitForFunction(() => document.querySelector("#station-panel")?.classList.contains("in") && !window.witch.game.clock.paused, null, { timeout: 30000, polling: 500 });
      // (her art and the house's in: the outdoor world's jobs left out, which in the house never land under a software GL, on
      // claude/prototype too: party objects, relics, creatures; 2026-10-29)
      // (and the camera eased in on her, once she's choosing)
      const settle = async () => {
        await page.waitForTimeout(1500);
        try { await page.waitForFunction(bare => [...window.witch.view.assets.inFlight].every(k => /^(partyObjects|relics|creature)s?:/.test(k) || (bare === false && /-bare/.test(k))) && (!document.querySelector("#station-panel.in") || (window.witch.game.camera.station ?? 0) > 0.99), id !== "dressingTable" ? false : null, { timeout: 180000, polling: 500 }); }
        catch { log(id, "settle: still in flight", JSON.stringify([...await page.evaluate(() => [...window.witch.view.assets.inFlight])]), "station", await page.evaluate(() => window.witch.game.camera.station)); }
        await page.waitForTimeout(3000);
      };
      // Where she's drawn on screen: her feet (the view's witchBase) and her top (up her sprite by her drawn height).
      const her = () => page.evaluate(([W, H]) => {
        const v = window.witch.view, c = v.camera, b = v.witchBase, up = window.witch.spriteUp(), V = c.position.constructor;
        const at = k => { const p = new V(b.x + up.x * v.witchTall * k, b.y + up.y * v.witchTall * k, b.z + up.z * v.witchTall * k).project(c); return [(p.x * 0.5 + 0.5) * W, (-p.y * 0.5 + 0.5) * H]; };
        const tall = v.witchFeetTop / v.witchTall, cam = window.witch.game.camera; // (her feet to her hat's top, of her frame's height)
        return { feet: at(0), top: at(tall), aim: at(cam.stationAim ?? 0), part: document.querySelector("#station-panel")?.dataset.frame || null, choosing: cam.station ?? 0 };
      }, [W, H]);
      // No scrolling: the body's height against what it holds, the focus walked over every line from the top (ArrowDown, then along the
      // last), the most it would scroll noted; on a fresh save, then with everything owned (E twice: the panel reopened reads it).
      const noScroll = async state => {
        await page.mouse.move(W - 20, H - 20);
        const m = () => page.evaluate(() => { const b = document.querySelector("#station-panel .sp-body"), kids = [...b.children], content = kids.length ? Math.ceil(Math.max(...kids.map(k => k.getBoundingClientRect().bottom)) - b.getBoundingClientRect().top + 2) : 0; return { client: b.clientHeight, scroll: Math.max(b.scrollHeight > b.clientHeight ? b.scrollHeight : 0, content), /* (what it holds: its scroll height when it scrolls, else its cards' extent) */ lines: new Set([...document.querySelectorAll("#station-panel [data-line]")].map(e => e.dataset.line)).size }; });
        let worst = await m(), at0 = null;
        for (let i = 0; i < 80; i++) { await page.keyboard.press("ArrowUp"); await page.waitForTimeout(60); const a = await page.evaluate(() => document.querySelector("#station-panel .focus")?.dataset.line); if (a === at0) break; at0 = a; }
        for (let i = 0; i < 120; i++) {
          const before = await page.evaluate(() => { const f = document.querySelector("#station-panel .focus"); return f ? `${f.dataset.line}:${f.dataset.col}` : null; });
          await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250);
          const n = await m(); if (n.scroll > worst.scroll) worst = n;
          const after = await page.evaluate(() => { const f = document.querySelector("#station-panel .focus"); return f ? `${f.dataset.line}:${f.dataset.col}` : null; });
          if (after === before) break;
        }
        for (let i = 0, was = null; i < 80; i++) { await page.keyboard.press("ArrowUp"); await page.waitForTimeout(60); const f = await page.evaluate(() => document.querySelector("#station-panel .focus")?.dataset.line); if (f === was) break; was = f; } // (back to the top: the checks after start from the first card)
        heights[`${id}:${state}`] = { visible: worst.client, content: worst.scroll, ratio: +(worst.scroll / worst.client).toFixed(2), lines: worst.lines };
        ok(worst.scroll <= worst.client + 1, `${id} (${state}): its panel doesn't scroll (content ${worst.scroll} px in ${worst.client} px, ${worst.lines} lines)`);
      };
      const reopen = async () => {
        await page.keyboard.press("KeyE"); for (let i = 0; i < 20 && (await panelIn()); i++) await page.waitForTimeout(500);
        for (let i = 0; i < 5 && !(await panelIn()); i++) { await page.keyboard.press("KeyE"); for (let j = 0; j < 40 && !(await panelIn()); j++) await page.waitForTimeout(500); }
      };
      await settle();
      await page.screenshot({ path: path.join(out, `${id}-fresh.png`), timeout: 300000 });
      await noScroll("fresh");
      for (const zoom of ["start", "closest"]) {
        if (zoom === "closest") { for (let i = 0; i < 10; i++) { await page.keyboard.press("KeyZ"); await page.waitForTimeout(150); } }
        await settle();
        const h = await her();
        await page.screenshot({ path: path.join(out, `${id}-${zoom}.png`), timeout: 300000 });
        log(id, zoom, JSON.stringify({ feet: h.feet.map(Math.round), aim: h.aim.map(Math.round), part: h.part, choosing: +h.choosing.toFixed(2) }));
        ok(h.choosing > 0.9, `${id} (${zoom} zoom): the camera's in on her, choosing`);
        ok(Math.abs(h.aim[0] - W * 0.75) < W * 0.12 && Math.abs(h.aim[1] - H / 2) < H * 0.18, `${id} (${zoom} zoom): the part it changes (${h.part}) framed in the right half (aimed at ${h.aim.map(Math.round)} of ${W}x${H})`);
        if (h.part === "legs") ok(h.feet[1] <= H && h.feet[1] > H / 2, `${id} (${zoom} zoom): her legs framed, waist down, her feet on screen (feet ${Math.round(h.feet[1])} of ${H})`);
        const P = await page.evaluate(() => { const p = document.querySelector("#station-panel").getBoundingClientRect(); return { w: p.width, cards: document.querySelectorAll("#station-panel .sp-shelf").length, titled: [...document.querySelectorAll("#station-panel .sp-shelf")].every(c => c.querySelector(".sp-lab b")?.textContent.trim()) }; });
        ok(Math.abs(P.w - W / 2) < 4 && P.cards >= 1 && P.titled, `${id}: the panel the left half (${Math.round(P.w)} px), ${P.cards} titled cards`);
      }
      // The pad: the d-pad moves the focus (nothing on her changes), R1 the next card, ✕ chooses.
      {
        // (each button held till the focus moves, up to 20 s: in the house under a software GL a frame can take seconds, and a fixed
        // press fell between frames)
        const focusNow = () => page.evaluate(() => { const f = document.querySelector("#station-panel .focus"); return f ? { at: `${f.dataset.line}:${f.dataset.col}`, card: f.closest(".sp-shelf")?.dataset.shelf, worn: [...document.querySelectorAll("#station-panel .worn, #station-panel .sel")].map(e => `${e.dataset.line}:${e.dataset.col}`).join(",") } : null; });
        const press = async b => { const was = (await focusNow())?.at; await page.evaluate(b => { window.__pad.buttons[b] = true; }, b); for (let t = 0; t < 40 && (await focusNow())?.at === was; t++) await page.waitForTimeout(500); await page.evaluate(b => { window.__pad.buttons[b] = false; }, b); await page.waitForTimeout(1500); };
        await page.evaluate(() => { window.__padOn = true; }); await page.waitForTimeout(600);
        let a = await focusNow(); await press(15); let b = await focusNow();
        if (a && b && a.at === b.at) { a = b; await press(14); b = await focusNow(); } // (at the end of its line: the d-pad left instead)
        ok(a && b && a.at !== b.at && a.worn === b.worn, `${id}: the pad's d-pad moves the focus and changes nothing (${a?.at} → ${b?.at})`);
        const cards = await page.evaluate(() => document.querySelectorAll("#station-panel .sp-shelf").length);
        if (cards > 1) { await press(5); const c = await focusNow(); ok(c && c.card !== b.card, `${id}: R1 jumps to the next card (${b?.card} → ${c?.card})`); await press(4); }
        await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(800); // (back where it was: the keys, at once)
        await page.evaluate(() => { window.__padOn = false; }); await page.waitForTimeout(600);
      }
      // Choosing: what's in focus, what she wears, and what's drawn on her.
      const state = () => page.evaluate(() => { const p = document.querySelector("#station-panel"), f = p.querySelector(".focus"); return { worn: [...p.querySelectorAll(".sp-card.worn")].map(e => `${e.dataset.line}:${e.dataset.col}`), focus: f ? `${f.dataset.line}:${f.dataset.col}` : null, locked: !!f?.classList.contains("locked"), detail: p.querySelector(".sp-detail")?.innerText ?? "", saved: localStorage.getItem("witch.genome"), drawn: JSON.stringify(window.witch.view.assets.witchGenome ?? null), witch: { y: window.witch.game.witch.mode, perch: !!window.witch.game.witch.perch } }; });
      const owned = await page.evaluate(() => [...document.querySelectorAll("#station-panel .sp-card:not(.unfound):not(.sp-toggle):not(.sp-trail)")].map(e => `${e.dataset.line}:${e.dataset.col}`));
      const s0 = await state();
      if (owned.length >= 2) {
        const other = owned.find(o => !s0.worn.includes(o));
        // the arrow keys (from the first card, right to the next owned one)
        const [line, col] = other.split(":").map(Number);
        const box = await page.evaluate(([l, c]) => { const e = document.querySelector(`#station-panel .sp-card[data-line="${l}"][data-col="${c}"]`), r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, [line, col]);
        await page.mouse.click(box[0], box[1]); await settle();
        let s = await state();
        ok(s.worn.includes(other), `${id}: a click on an owned item puts it on her (worn ${s.worn})`);
        ok(s.saved && JSON.stringify(JSON.parse(s.saved)) === s.drawn, `${id}: her drawn look is the one chosen`);
        await page.mouse.move(W - 20, H - 20); // (the pointer off the panel: the arrows next)
        // (Ed, 2026-10-28: "she should change only when I press the 'choose' button": an arrow only moves the focus, Space puts it on)
        await page.keyboard.press("ArrowLeft"); await settle();
        s = await state();
        ok(s.worn.includes(other) && s.focus !== other, `${id}: an arrow key moves the focus and changes nothing on her (worn ${s.worn}, focus ${s.focus})`);
        const to = s.focus;
        await page.keyboard.press("Space"); await settle();
        s = await state();
        if (owned.includes(to)) ok(!s.worn.includes(other) && s.worn.includes(to), `${id}: Space puts on what's in focus instead (worn ${s.worn})`);
        else log(id, `the arrow landed on ${to}, not an owned card: Space's choice not checked here`);
        ok(s.saved && JSON.stringify(JSON.parse(s.saved)) === s.drawn, `${id}: her drawn look follows the choice`);
      } else log(id, `fewer than two owned items in its first row (${owned.length}): click and arrows on items skipped`);
      // Enter and Space: chosen in the panel, never the game's (no rise, nothing put down); on a locked item, not found yet. (E closes
      // it: Ed, 2026-10-26, "I think E should also close, and we can have spacebar to select"; below.)
      const locked = await page.evaluate(() => { const e = document.querySelector("#station-panel .sp-card.unfound"); if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
      for (const key of ["Enter", "Space"]) {
        const before = await state();
        await page.keyboard.press(key); await page.waitForTimeout(800);
        const after = await state();
        ok(after.witch.perch && after.witch.y === "ground", `${id}: ${key} stays in the panel (she's still on foot in the house)`);
        ok(JSON.stringify(after.worn) === JSON.stringify(before.worn), `${id}: ${key} on the item she wears keeps it on`);
      }
      if (locked) {
        const box = await page.evaluate(() => { const e = document.querySelector("#station-panel .sp-card.unfound"); if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }); // (where it is now: the detail box moves the cards about)
        await page.mouse.click(box[0], box[1]); await page.waitForTimeout(500); await page.keyboard.press("Enter"); await page.waitForTimeout(500);
        const s = await state();
        ok(/not found yet/i.test(s.detail), `${id}: Enter on an item not found yet says so ("${s.detail.replace(/\s+/g, " ").trim()}")`);
      }
      // E again: the panel slides out, she still stands there (and E once more brings it back)
      await page.keyboard.press("KeyE");
      for (let i = 0; i < 20 && (await panelIn()); i++) await page.waitForTimeout(500);
      ok(!(await panelIn()), `${id}: E again closes its panel`);
      for (let i = 0; i < 5 && !(await panelIn()); i++) { await page.keyboard.press("KeyE"); for (let j = 0; j < 40 && !(await panelIn()); j++) await page.waitForTimeout(500); } /* (one E, then up to 20 s for a slow frame to see it: E closes it too) */
      ok(await panelIn(), `${id}: and E there opens it again`);
      // Everything owned: the pause page's Unlock everything (app/debugUnlock.ts), read as the panel opens again.
      log(id, "unlock:", await page.evaluate(() => { const pre = [...new Set(Object.keys(localStorage).map(k => (/^(witch\.fresh\.[a-z0-9]+\.)/.exec(k) || [])[1]).filter(Boolean))]; for (const p of ["", ...pre]) for (const k of ["", "witch.save.s1.", "witch.save.s2.", "witch.save.s3.", "witch.save.s4.", "witch.save.s5."]) localStorage.setItem(p + k + "witch.debug.unlockAll", "1"); return location.search + " " + pre.join(","); })); // (the switch is a save's own, app/saveSlots.ts slotKey: set in every slot, and in a fresh game's namespace too, platform/storageScope.ts)
      await reopen(); await settle();
      await page.screenshot({ path: path.join(out, `${id}-owned.png`), timeout: 300000 });
      await noScroll("owned");
      await page.close();
    }
  } finally { await browser.close(); server.close(); fs.writeFileSync(path.join(out, "heights.json"), JSON.stringify(heights, null, 1)); }
  if (fails.length) { console.error(`\n${fails.length} failed:\n` + fails.join("\n")); process.exit(1); }
  log("all ok");
})().catch(e => { console.error(e); process.exit(1); });
