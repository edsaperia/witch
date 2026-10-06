# Art review, round 2 (2026-10-06, about 03:20 UTC)

**Build:** a preview of the work in flight, not `claude/prototype` alone. It is `claude/prototype` at 650141b with these merged in:
- the spooky lighting stack: #184, #189, #195 and #199 (`claude/spooky-rim`);
- the warm party: #198 (`claude/party-warm`). #189 and #198 conflict in `src/render/partyObjects.ts`; I resolved it only for the preview, keeping both the mood's light count and the area-neon pieces.

The calm HUD (#188) and the bedroom (#143) are already on prototype.

**Capture:** seed 123, at night, 1280×720, `node tools/art-review/capture.cjs` (with `DIST` pointing at the preview build). Round 1's set is beside it in `../round-01/`.

## What changed since round 1

| Round 1 problem | Now |
|---|---|
| The witch at the floor's value, lost | **Fixed.** The moonlit rim and her own light on her make her the clearest figure in every ground shot (moor, ravine, shrine). The fox in the shrine reads too. |
| The areas look alike at night | **Much better.** The fern forest has red-brown leaf litter under pale birches, the ravine olive-grey, the shrine blue-grey stone, and each area has its own fog and tint (#195). The moor is still plain cold grass, though: it needs its heather and moss (art builder 1). |
| The party as six hues | **Better, not there.** The party decor is warm (#198), but at home the cyan speakers and runes, the lime ley line and red and yellow flecks over the floor all still glow at full strength. |
| Pools as black holes | Not in this set's frames; to check in round 3. |
| The UI shouting | **Fixed** (#188): amber, calmer. |
| Bold and ref barely show at night | Unchanged (see `bold-*` and `ref-*`). |

## New in round 2

1. **Too dark in the middle distance.** The mood is right, a cold dark wood with warm pools, but half of each frame is now near-black. From the treetops over the moor you can hardly see the forest's shape. Dark should still be legible: the canopy's tops and open ground should catch a little moonlight, so the forest's forms read at 15 to 25% value, not 5%. (Rendering: lift the moon's fill on upward-facing surfaces, not the ambient.)
2. **Eyeshine as big soft red blobs.** Creatures' eyes in the dark are spooky and right for Ed's direction. But through bloom and tilt-shift they are large blurred red discs, as big as a creature's head, and they read as warning lights. Make them a crisp pair of 1-art-pixel dots with a small glow.
3. **The ley line is the brightest thing on the ground.** The lime-to-amber line in the fight shot outshines the party. It should be in the HUD's amber or the next area's colour, at about half its brightness: a guide, not a light source.
4. **The home's own neons.** The dancefloor speakers' and runes' cyan is home's colour, which is fine as its one neon. The red and yellow flecks over the floor should then go, or join it, so home has one neon and the warm light.
5. **Two flat mint-green domes** at the fern forest's lower right (`default-fern-forest-ground.png`). They look like crowns or glowcaps drawn as flat discs at ground level, with no shading. Art builder 1, please check what they are.
6. **The creator's panel is still pink.** The bedroom itself reads well (#143). The panel's accent (Start button, sliders, chosen chips) is hot pink, while the game's HUD went amber in #188. Carry the amber into the creator so the first screen matches the game.
7. **Creatures in the fight.** The wolves read now as dark shapes with a cool rim, the boars by their warm brown. The fight's own effects are next (#193 notes).

## Briefs (round 2)

- **Rendering (spooky stack):**
  - moonlight on upward faces, so the dark mid-distance reads (1);
  - crisp eyeshine (2);
  - the ley line at half brightness in amber (3).
- **Art builder 1:**
  - the moor's floor (heather, moss, peat);
  - the mint domes (5).
- **Art builder 3 / home:** one neon at home, without the red and yellow flecks over the floor (4).
- **Golf:**
  - the amber accent in the creator panel (6);
  - with the creator open, the game never finishes loading in headless software GL (the capture now shoots it in a load of its own); worth a check on a slow machine.
- **Art builder 2:** the attack feel (#193 notes: whole-pixel squash, no strobing flip, crisp star, coat-coloured bits).
