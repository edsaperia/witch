// MOCK ONLY (docs/backlog/workshop.md): the Workshop's bay, lathe and pegboard panels, in the station menus' look (src/ui/stationPanel.ts's
// CSS with no backing and a thin border, as the station-menus mock Ed chose), injected over the live game. Never shipped.
// window.__mockPanel(kind, thumbs): kind "bay" | "lathe" | "pegboard"; thumbs: part id -> data URL.
window.__mockPanel = (kind, T) => {
  document.getElementById("station-panel")?.style.setProperty("display", "none", "important");
  const old = document.getElementById("mock-panel"); if (old) old.remove();
  const css = document.createElement("style");
  css.textContent = `
#mock-panel { position: fixed; left: 0; top: 16px; bottom: 16px; width: 380px; z-index: 30; box-sizing: border-box; padding: 12px 14px 10px; background: transparent; color: #e8e2f4; border: 1px solid rgba(232,180,106,.45); border-left: 0; border-radius: 0 12px 12px 0; font: 13px/1.35 ui-monospace, Menlo, Consolas, monospace; display: flex; flex-direction: column; gap: 8px; text-shadow: 0 1px 2px #000, 0 0 6px rgba(0,0,0,.8); }
#mock-panel .head { display: flex; align-items: baseline; gap: 8px; padding-bottom: 5px; border-bottom: 1px solid rgba(232,226,244,.12); }
#mock-panel .head b { font-size: 18px; color: #e8b46a; letter-spacing: 1px; } #mock-panel .head span { margin-left: auto; color: #9a93b4; font-size: 11px; }
#mock-panel .lab { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9a93b4; margin: 2px 0 4px; display: flex; gap: 4px; align-items: baseline; }
#mock-panel .lab span { text-transform: none; letter-spacing: 0; color: #e8e2f4; } #mock-panel .lab em { margin-left: auto; font-style: normal; text-transform: none; letter-spacing: 0; color: rgba(232,180,106,.75); }
#mock-panel .row { display: flex; gap: 6px; }
#mock-panel .card { position: relative; width: 78px; height: 46px; border-radius: 7px; background: rgba(255,255,255,.06); border: 1px solid rgba(232,226,244,.14); display: grid; place-items: center; overflow: hidden; box-sizing: border-box; }
#mock-panel .card img { max-width: 70px; max-height: 38px; image-rendering: pixelated; }
#mock-panel .card.locked { background: rgba(0,0,0,.35); border-style: dashed; } #mock-panel .card.locked img { filter: brightness(0) invert(.18); }
#mock-panel .card.worn { background: rgba(232,180,106,.13); } #mock-panel .card.focus { outline: 2px solid #e8b46a; outline-offset: 1px; box-shadow: 0 0 12px rgba(232,180,106,.45); }
#mock-panel .card.empty i { font-style: normal; font-size: 20px; color: #9a93b4; } #mock-panel .card.empty { width: 40px; }
#mock-panel .tick { position: absolute; top: 2px; right: 3px; width: 14px; height: 14px; border-radius: 50%; background: #e8b46a; color: #1a1430; font-size: 9px; display: grid; place-items: center; text-shadow: none; }
#mock-panel .lock { position: absolute; bottom: 1px; right: 2px; font-size: 10px; }
#mock-panel .sets { display: flex; flex-wrap: wrap; gap: 4px; }
#mock-panel .set { font-size: 11px; padding: 2px 7px; border-radius: 10px; border: 1px solid rgba(232,226,244,.25); color: #9a93b4; }
#mock-panel .set b { font-weight: normal; color: #e8e2f4; } #mock-panel .set.on { border-color: #e8b46a; color: #e8e2f4; background: rgba(232,180,106,.15); }
#mock-panel .detail { padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(232,226,244,.14); }
#mock-panel .detail h3 { margin: 0 0 3px; font-size: 14px; font-weight: 600; } #mock-panel .detail h3 small { font-weight: normal; color: #9a93b4; font-size: 11px; }
#mock-panel .detail p { margin: 2px 0; font-size: 12px; } #mock-panel .up { color: #8fe3a8; } #mock-panel .down { color: #f0a08a; } #mock-panel .dim { color: #9a93b4; }
#mock-panel .stats { display: grid; grid-template-columns: 1fr auto; gap: 1px 10px; font-size: 12px; }
#mock-panel .stats span:nth-child(2n) { text-align: right; }
#mock-panel .grid { display: grid; grid-template-columns: repeat(13, 1fr); gap: 2px; } #mock-panel .grid i { height: 14px; border-radius: 2px; border: 1px solid rgba(0,0,0,.4); }
#mock-panel .grid i.sel { outline: 2px solid #e8b46a; z-index: 1; position: relative; }
#mock-panel .chips { display: flex; gap: 6px; margin: 2px 0 4px; } #mock-panel .chips span { display: inline-flex; gap: 5px; align-items: center; font-size: 11px; padding: 1px 8px; border-radius: 10px; border: 1px solid rgba(232,226,244,.3); color: #9a93b4; }
#mock-panel .chips span.on { border-color: #e8b46a; color: #e8e2f4; } #mock-panel .chips i { width: 10px; height: 10px; border-radius: 50%; }
#mock-panel .fit { display: flex; align-items: center; gap: 10px; padding: 3px 6px; } #mock-panel .fit.focus { outline: 2px solid #e8b46a; border-radius: 6px; }
#mock-panel .fit span { width: 104px; font-size: 12px; } #mock-panel .fit .bar { position: relative; flex: 1; height: 6px; background: rgba(255,255,255,.18); border-radius: 3px; }
#mock-panel .fit .bar i { position: absolute; top: -5px; width: 10px; height: 16px; margin-left: -5px; border-radius: 3px; background: #e8b46a; }
#mock-panel .foot { margin-top: auto; font-size: 11px; color: #9a93b4; display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
#mock-panel .k { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 4px; background: rgba(255,255,255,.12); border: 1px solid rgba(232,226,244,.35); border-bottom-width: 2px; color: #e8e2f4; font-size: 10px; text-shadow: none; }
#mock-panel .peg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
#mock-panel .cell { border: 1px solid rgba(232,226,244,.18); border-radius: 8px; padding: 5px 4px 4px; min-height: 92px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
#mock-panel .cell .bio { font-size: 9.5px; text-transform: uppercase; letter-spacing: .5px; color: #9a93b4; text-align: center; line-height: 1.1; }
#mock-panel .cell .bio b { color: #e8e2f4; font-weight: normal; display: block; letter-spacing: 1px; }
#mock-panel .cell img { max-width: 88px; max-height: 36px; image-rendering: pixelated; margin: auto 0; }
#mock-panel .cell.missing img { filter: brightness(0) invert(.18); opacity: .8; }
#mock-panel .cell.tonight { border-color: #9fe8ff; box-shadow: 0 0 14px rgba(140,220,255,.55), inset 0 0 10px rgba(140,220,255,.25); }
#mock-panel .cell.tonight img { filter: brightness(0) invert(.75) sepia(1) hue-rotate(160deg) saturate(4) drop-shadow(0 0 4px #8fe0ff); opacity: 1; }
#mock-panel .cell .nm { font-size: 10.5px; text-align: center; } #mock-panel .cell.missing .nm { color: #9a93b4; }
#mock-panel .cell.home { border-color: rgba(232,180,106,.5); }
#mock-tag { position: fixed; right: 14px; top: 12px; z-index: 31; font: bold 13px ui-monospace, monospace; color: #1a1430; background: #e8b46a; padding: 3px 9px; border-radius: 4px; letter-spacing: 1px; }
`;
  document.head.appendChild(css);
  const hsv = (h, s, v) => { const f = n => { const k = (n + h * 6) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); }; return `rgb(${f(5) * 255 | 0},${f(3) * 255 | 0},${f(1) * 255 | 0})`; };
  const ROWS = [[1, .5], [1, .74], [1, 1], [.5, 1], [.3, 1]];
  const grid = (selC, selR) => `<div class="grid">${ROWS.map(([s, v], r) => Array.from({ length: 13 }, (_, c) => `<i class="${c === selC && r === selR ? "sel" : ""}" style="background:${c === 12 ? hsv(0, 0, .06 + .94 * r / 4) : hsv(c / 12, s, v)}"></i>`).join("")).join("")}</div>`;
  const card = (id, { own = true, worn = false, focus = false } = {}) => `<div class="card${own ? "" : " locked"}${worn ? " worn" : ""}${focus ? " focus" : ""}"><img src="${T[id]}">${worn ? `<b class="tick">✓</b>` : ""}${own ? "" : `<b class="lock">🔒</b>`}</div>`;
  const empty = () => `<div class="card empty"><i>∅</i></div>`;
  const foot = `<div class="foot"><span class="k">🖱</span> click <span class="k">← ↑ → ↓</span> or <span class="k">✥</span> move · walk away to close</div>`;
  let html = "";
  if (kind === "bay") {
    html = `<div class="head"><b>The bay</b><span>6 of 9 parts found</span></div>
<div><div class="lab">Tip<span> · Missile nose</span><em>steering</em></div><div class="row">${empty()}${card("missile-nose", { worn: true })}${card("curled-tip", { own: false })}${card("horse-head")}</div></div>
<div><div class="lab">Chassis<span> · Jet-bike fairing</span><em>body</em></div><div class="row">${empty()}${card("jet-fairing", { worn: true })}${card("ladder", { own: false })}${card("canoe-hull")}</div></div>
<div><div class="lab">Exhaust<span> · Jet nozzles</span><em>thrust</em></div><div class="row">${empty()}${card("jet-nozzles", { worn: true, focus: true })}${card("twig-bristles")}${card("oar-blade", { own: false })}</div></div>
<div><div class="lab">Sets</div><div class="sets"><span class="set on">✦ Rocket 3/3 · <b>Speed</b></span><span class="set">Joust 1/2 · Battering</span><span class="set">Pile driver 1/2 · Ground pound</span><span class="set">Hedge 0/3 · Stealth</span><span class="set">Ferry 0/3 · Ley jump</span></div></div>
<div class="detail"><h3>Jet nozzles <small>exhaust · Rocket set</small></h3>
<p class="up">▲ Take-off 1.0 → 0.5 s, landing 1.5 → 0.75 s</p><p class="down">▼ Lets go slowly: glides 1.0 → 1.8 s to a stop</p>
<p class="dim">Completes the Rocket set: R casts Speed.</p></div>
<div class="detail"><div class="lab" style="margin-top:0">Her broom<em>bare → now</em></div><div class="stats">
<span>Treetop speed</span><span class="up">48 → 53 m/s</span><span>Turning</span><span class="down">150 → 120°/s</span>
<span>Ground speed</span><span class="up">19.3 → 22 m/s</span><span>Off the mark</span><span class="down">28 → 20</span>
<span>Take-off / landing</span><span class="up">1 / 1.5 → 0.5 / 0.75 s</span><span>Spell (R)</span><span class="up">Speed ×2.2, 4 s</span></div></div>
${foot}`;
  } else if (kind === "lathe") {
    html = `<div class="head"><b>The lathe</b><span>Missile · Jet bike · Jets</span></div>
<div><div class="lab">Body<span> · handle, fairing, hull</span></div>${grid(7, 1)}</div>
<div><div class="lab">Trim<span> · stripes, seat, bristles</span></div>${grid(2, 4)}</div>
<div><div class="lab">Fit<em>shape, never stats</em></div>
<div class="fit"><span>Length</span><div class="bar"><i style="left:55%"></i></div></div>
<div class="fit focus"><span>Thickness</span><div class="bar"><i style="left:68%"></i></div></div>
<div class="fit"><span>Bend</span><div class="bar"><i style="left:20%"></i></div></div>
<div class="fit"><span>Exhaust size</span><div class="bar"><i style="left:45%"></i></div></div></div>
<div class="detail"><h3>Thickness</h3><p class="dim">The lathe turns the handle fatter or slimmer; every part fattens with it. Looks only: the bay's parts set what it does.</p></div>
${foot}`;
  } else {
    const C = [
      ["North-west", "cold rainforest", "oar-blade", "Oar blade", "missing"], ["North", "cold", "ladder", "Ladder", "tonight"], ["North-east", "mountains", "missile-nose", "Missile nose", ""],
      ["West", "jungle", "horse-head", "Hobby-horse head", ""], ["Home", "temperate", "twig-bristles", "Twig bristles", "home"], ["East", "rocky", "jet-fairing", "Jet-bike fairing", ""],
      ["South-west", "mangrove", "canoe-hull", "Canoe hull", ""], ["South", "hot", "curled-tip", "Curled tip", "missing"], ["South-east", "badlands", "jet-nozzles", "Jet nozzles", ""],
    ];
    html = `<div class="head"><b>Pegboard</b><span>6 of 9 parts found</span></div>
<div class="lab">Her finds, laid out like the world<em>north up</em></div>
<div class="peg">${C.map(([d, b, id, nm, st]) => `<div class="cell ${st === "home" ? "home" : st}"><div class="bio"><b>${d}</b>${b}</div><img src="${T[id]}"><div class="nm">${st === "missing" || st === "tonight" ? "?" : nm}</div></div>`).join("")}</div>
<div class="detail"><h3>A glowing outline <small>north · cold</small></h3><p>One lies on tonight's island: a wreck somewhere in its woods. The board never says where; the telescope shows its outline in the stars.</p></div>
<div class="detail"><div class="lab" style="margin-top:0">The columns are the sets</div><p class="dim">West: Ferry (Ley jump) · middle: Hedge (Stealth) · east: Rocket (Speed). Joust and Pile driver cross them.</p></div>
${foot}`;
  }
  const el = document.createElement("div"); el.id = "mock-panel"; el.innerHTML = html; document.body.appendChild(el);
  const tag = document.createElement("div"); tag.id = "mock-tag"; tag.textContent = "MOCK"; document.body.appendChild(tag);
};
