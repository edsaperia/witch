# A4: split main.ts and view.ts (Ed's architecture review, 30 Oct; A3 input stack shipped v6059)

Ed decided (30 Oct): after the input/overlay stack (A3), split the two biggest files. Today
`src/main.ts` and `src/render/view.ts` are each touched by nearly every PR, which causes most merge conflicts (today: #1531, #1541, #1544, #1538 and #1542 all collided there).

## Do
- **Mechanical moves only, no behaviour change.**
  - `main.ts`: page wiring by concern (pause/freeze wiring, station dispatch, telephone/online hooks, new-build notice, debug tools, night start/replacement) into `src/app/` modules with a thin `main.ts` that composes them.
  - `view.ts`: by layer (camera, home/house, markers/stones, lighting, post wiring, per-frame update ordering) into `src/render/view/` modules, keeping `View`'s public surface.
- **Proof of no change:** `npm run typecheck`, the full unit suite, bench:quick with **no** expected-change declaration (frames and rules fingerprints identical), smoke, and art identical.
- Plan the cut lines first (PLAN comment with the module list and what moves where) for the coordinator's OK.

## Fence
This conflicts with every open PR touching these files, so the coordinator runs it as a **short fenced window**:
1. The coordinator announces the fence once the then-current combined release is live.
2. Builders park edits to main.ts/view.ts and push what they have.
3. The split lands as its own release.
4. Everyone merges prototype.

Until the fence starts: PLAN only, plus a dry-run branch to measure how big each move is.
