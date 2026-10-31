# Mushroom generator

Version 3 adds **Big spots (%)**, default 50–50: each mushroom samples a proportion, rounded to a whole number of its requested spots. Large spots are placed first; spots that cannot fit are still omitted. At 0% all are small, at 100% all are large; size variation controls how far each group differs from the base radius. All ranges start expanded. The preview defaults now match Ed's seed 64 settings supplied with this request.

The preview opens with Ed's seed 61 and the shape ranges chosen on 2026-10-31. Spots use round raster footprints, larger/smaller size variation (a twelfth exposed range), and upper-left highlights. Placement compares candidate positions in cap-relative coordinates, favouring separation and a non-collinear third spot. It still rejects any footprint touching an edge or another spot. Settings exports use version 2 because spot generation has changed; version 1 seeds retain their shape but produce the new spot pattern.

Serve the repository (`npm run dev`) and open `/tools/mushrooms/index.html`. Change the seed, art-pixel setting, lighting or min/max ranges. Each colour family shows three specimens beside the actual witch at the same pixel density, on black. The preview uses the existing lighting helper plus a smooth coloured glow drawn only from emissive pixels; it approximates the game's bloom, not its whole post-processing pipeline.

`art/mushrooms.js`, also exported through `art/generator.js`:

All percentage controls include 0–100%; bend, twist and tilt include −100–100%. Height still supports 150% and width 140%. Extreme tilt/curl combinations compress vertically to fit the chosen total height. Zero height is invisible; zero stem thickness or spot radius removes that feature. **Copy settings** exports seed, pixel grid, lighting and every range as labelled percentages (except spot count); if clipboard access is unavailable, it selects the text for manual copying. Exported percentages must be divided by 100 when passed to the generator API below.

```js
const options = { type: "turquoise", seed: 123,
  ranges: { height: [.5, .667], pointiness: [0, 1], spotCount: [4, 8] } };
const sprite = mushroomSprite(style, options);
const baked = bakeMushroom(style, options);
// baked: A (albedo), N (normal), NF (mirrored normal), w, h,
// anchors.ground, genome, spots (accepted raster footprints), scale: 1
```

Use the game's current style, especially `pixel`, and draw at scale 1 using the ground anchor. Default height is 0.5–0.667 of `witchHeight(style)`, rounded to whole art pixels; the height range is editable. It follows her reference art height, not arbitrary hats or animation poses. Every specimen has one cap and one stem. `MUSHROOM_RANGES` describes thirteen ranges and safe editing limits: height, pointiness, width, cap depth, bend, twist, tilt, rim curl, stem thickness, spot count, spot radius, spot size variation and proportion of big spots. Pointiness 0 is shallow/flat, 1 a taller cone; cap depth controls its proportions too. Negative bend/twist/tilt reverses direction. Equal endpoints fix a parameter; otherwise each specimen samples within the range. `mushroomRanges` validates, clamps and orders endpoints.

Spots are packed on the raster cap mask: a full cap pixel separates them from each other and the edge. Candidates that do not fit are rejected, never clipped. Small/flat caps or large spots may produce fewer than the requested count, including none at extreme settings; the preview reports actual/requested counts. They use saturated colour-matched emissive materials and alpha 254, with white emission only for the white family. No halo is baked into the asset. Cache a bounded bank of variants during asset baking rather than generating canvases every frame.

`BIOME_MUSHROOMS` is the art mapping: temperate red, cold blue, mountains/glaciers white, volcanic orange, badlands purple, hot yellow, mangrove turquoise, jungle pink, cold rainforest green. The game uses matching assignments in `src/rules/mushrooms.ts`: one collectible per non-home area, matching its biome 90% of the time. `src/render/mushrooms.ts` draws seeded specimens with complementary-colour subtractive halos and emissive spots. Collecting, basket unloading and brewing are described in `docs/notes/house.md`; the developer recipe book is `docs/backlog/potion-recipes.md`. Existing decorative fungi are unchanged.

Checks and reproducible sheet (uses the repo's Playwright browser setup):

```sh
node tools/mushrooms/check.mjs
node tools/mushrooms/sheet.mjs previews/mushrooms/generated-sheet.png
node tools/mushrooms/build-preview.mjs
```

`explorer.fragment.html` and `explorer.js` are the shared source for the local page and inline preview. The build command regenerates `index.html`; pass an optional absolute output path to also create a self-contained inline fragment. The dedicated check covers 2,700 default specimens plus 1,040 range-endpoint specimens: seeds, scale, glow, bounds, normals, anchors, default connected silhouettes, spot separation and edge clearance. It complements the repository art check; it does not replace it.
