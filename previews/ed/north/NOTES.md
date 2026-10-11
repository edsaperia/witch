# North biome: concept sheets (art builder 2, 2026-10-11)

North gets colder further out: pine forests first, then tundra. North-east blends into mountains and glaciers. These are concepts only: nothing here is wired into the game.

## Ed's decisions (2026-10-11)
1. **All four kinds and their areas: yes, as drawn.** (Wolverine, reindeer, musk ox and lemming, with their areas.)
2. **A fifth, fantastical north kind: the Mammoth.** It's added below. The musk ox legend was "half mammoth"; I changed it so the two read clearly differently (see the musk ox section).
3. **Snow-laden tree crowns are built** in the art kit (PR into claude/prototype, no roster or game wiring):
   - `snowCrown` in `art/trees.js`, taken by any area or tree recipe as `snow: 0..1`.
   - The new ground genomes snow, lichen and ice go in the same PR.
   - Sheets: `snow-crowns-0.png` (as today), `snow-crowns-0.4.png` (a dusting), `snow-crowns-0.85.png` (laden) and `snow-crowns-0.85-night.png`.
4. **The wolverine sigil is redrawn** with a bold double brow band from ear to ear, so it no longer reads as the bear.

- **How they're drawn:** by the real art generator, as genome records on the four-legged template (`genomes.js`). Four area types, three ground genomes (snow, lichen, ice) and four new 3D set pieces were added to a scratch copy of the generator. All the changes are in `concept.patch`: apply it to `claude/prototype` to redraw the sheets.
- **`creatures.png`:** baby, young, adult and legend of each of the five, the witch for scale (`node art/preview.mjs lineup`).
- **`sigils.png`:** each sigil at the four levels, flat and on the ground. `sigils-small.png` shows them at stack sizes.
- **`areas.png`** (studio light) and **`areas-night.png`** (the game's night light): one row per area. Each row is its floor tile, wall, small and big pieces, set piece and young creature.

## Wolverine: the Snowy pinewood (the first step north; phase 3 or so)
- **Feel:** a dark, low, arched brawler with a bushy tail, alone in snow under tall pines and firs. The adult grows pale claws and a short crest. The legend is the "frost glutton": a mane of icicle locks with cold fire along its spine, white ice claws and glowing eyes.
- **Fights:** small but tough. A fast lunging biter that won't back off: it keeps attacking after a knockback, and its strength goes up when hurt (the stoat's frenzy, heavier). The legend's claw swipe leaves a frost slow.
- **Sigil:** a broad, low face with small round ears, and the wolverine's pale band across its brow drawn as two strokes from ear to ear (Ed: bolder, so it isn't the bear).
- **Area:** snow over needles, with tall Scots pines and firs. The small pieces are juniper with blue berries. Set piece: a trapper's food cache, a log hut on four tall posts with a ladder, snow on the roof and claw marks up a post.
- **Snow:** its pines, firs and juniper carry snow (`snow: .85`; the trait is in the art-kit PR).

## Reindeer: the Lichen tundra
- **Feel:** a stocky, short-legged deer with a white neck ruff, in herds on open lichen heath. The baby is spotted. The adult grows the ruff, and the legend has aurora antlers that glow, with a pale mane down its neck.
- **Fights:** herds. They charge together (the ram's `charge`, several at once) and sweep with their antlers. The legend's stamp sends an aurora ring outward (the quake ring, recoloured).
- **Sigil idea:** a long, narrow face under two great C-shaped beams sweeping back, with the reindeer's shovel tine down over the brow.
- **Area:** a yellow-grey lichen floor with crowberry, cotton grass, frost mounds, boulders, dwarf birch and a standing stone. Set piece: a cairn crowned with shed antlers.

## Musk ox: the Glacier moraine (north-east)
- **Feel:** a low, humped boulder of a beast. Its shaggy skirt sweeps almost to the ground over pale stockings, and its horns hook down and up. The legend is a walking glacier: its horns grow into great hooks of glacier ice with cold fire at their tips, blocks of ice stand on its back, and its eyes glow.
- **Changed for the mammoth (Ed, 2026-10-11):** the legend's tusks are gone. It's now horns of ice and ice on its back. The mammoth keeps the tusks and trunk, so the two read apart: the musk ox is low, wide and horned; the mammoth is tall, domed, tusked and trunked.
- **Fights:** a wall. Adults form a ring round their young: they slow down and take less damage while near each other. They charge one at a time with a head-butt (knockback). The legend's quake splits the ice.
- **Sigil idea:** a broad head under a heavy boss, horns sweeping out, down and hooking up, and a long fringe hanging below.
- **Area:** blue-white ice and gravel, meltwater along its edges, big boulders and a tall cairn. Set piece: a blue ice arch over a meltwater pool, with boulders frozen into it.

## Mammoth: the Mammoth steppe (the fantastical north kind; Ed, 2026-10-11)
- **Feel:** the giant of the north. A tall, high-shouldered, humped and shaggy beast with a trunk and tusks, on frosted steppe grass among boulders and lone larches.
  - The calf has no tusks and only a short trunk.
  - The young grows little tusks.
  - The adult has long curving tusks and a shaggy skirt.
  - The legend is the Old One of the steppe: colossal spiral tusks with cold fire at their tips, a long skirt, a frosted face and glowing eyes.
- **Fights:** slow, huge and hard to stop. It ignores knockback, and its charge tramples the party (the boar's charge, much heavier, short range). Its trunk sweeps sideways, knocking a small creature away. The legend's stamp is the heaviest quake in the north, and its trumpet stuns (the screech ring).
- **Sigil:** drawn whole, in profile, like the spider, beetle and moth are: the high domed head and sloping back, the trunk hanging and curling at its tip, one great tusk sweeping forward and up, four pillar legs. Front-on, with its trunk and tusks hanging, it read as an octopus.
- **Area:** frosted steppe grass with snow drifts (a sixth ground genome, frostgrass, concept only), dry grass and wormwood, big boulders, frost mounds and lone larches. Set piece: an arch of four giant ivory tusks crossing over a cairn.
- **Drawn with:** the quadruped template, plus one new evolution feature in the concept patch, the trunk (`trunk`). It's a stand-in: a real mammoth wants its own head (a domed skull, the trunk built into the face), as the vulture wants its own bird.

## Lemming: the Snowy fell
- **Feel:** a tiny, round, golden-and-dark ball of fury on wind-packed snow, among bent mountain birches and dwarf willow. The legend is the "great migration": twice the size, with a thick ruff, ice stones on its back and cold fire.
- **Fights:** swarms. The area holds many more of them (its strength number low, so `countScale` gives lots). Each is weak and quick, nipping and scattering. The legend calls a stampede: lemmings pour out of the burrows round it.
- **Sigil idea:** a round face, tiny ears, whiskers and two front teeth.
- **Area:** pale snow with dwarf willow (cream catkins), bent mountain birch dusted with snow (`snow: .6`) and boulders. Set piece: a glacial erratic, a great boulder balanced on three small stones, with a snow cap and lemming burrows under it.

## Still open
- The mammoth's real head (its own builder) when it's built for the game.
