# North biome: concept sheets (art builder 2, 2026-10-11)

North gets colder further out: pine forests first, then tundra. North-east blends into mountains and glaciers. These are concepts only: nothing here is wired into the game.

- **How they're drawn:** by the real art generator, as genome records on the four-legged template (`genomes.js`). Four area types, three ground genomes (snow, lichen, ice) and four new 3D set pieces were added to a scratch copy of the generator. All the changes are in `concept.patch`: apply it to `claude/prototype` to redraw the sheets.
- **`creatures.png`:** baby, young, adult and legend of each, the witch for scale (`node art/preview.mjs lineup`).
- **`sigils.png`:** each sigil at the four levels, flat and on the ground. `sigils-small.png` shows them at stack sizes.
- **`areas.png`** (studio light) and **`areas-night.png`** (the game's night light): one row per area. Each row is its floor tile, wall, small and big pieces, set piece and young creature.

## Wolverine: the Snowy pinewood (the first step north; phase 3 or so)
- **Feel:** a dark, low, arched brawler with a bushy tail, alone in snow under tall pines and firs. The adult grows pale claws and a short crest. The legend is the "frost glutton": a mane of icicle locks with cold fire along its spine, white ice claws and glowing eyes.
- **Fights:** small but tough. A fast lunging biter that won't back off: it keeps attacking after a knockback, and its strength goes up when hurt (the stoat's frenzy, heavier). The legend's claw swipe leaves a frost slow.
- **Sigil idea:** a broad, low face with small round ears and the wolverine's pale band sweeping across its brow. It reads a little like the bear at small sizes; the band needs to be bolder.
- **Area:** snow over needles, with tall Scots pines and firs. The small pieces are juniper with blue berries. Set piece: a trapper's food cache, a log hut on four tall posts with a ladder, snow on the roof and claw marks up a post.
- **Not yet:** snow-laden crowns (a new trait in the tree genomes).

## Reindeer: the Lichen tundra
- **Feel:** a stocky, short-legged deer with a white neck ruff, in herds on open lichen heath. The baby is spotted. The adult grows the ruff, and the legend has aurora antlers that glow, with a pale mane down its neck.
- **Fights:** herds. They charge together (the ram's `charge`, several at once) and sweep with their antlers. The legend's stamp sends an aurora ring outward (the quake ring, recoloured).
- **Sigil idea:** a long, narrow face under two great C-shaped beams sweeping back, with the reindeer's shovel tine down over the brow.
- **Area:** a yellow-grey lichen floor with crowberry, cotton grass, frost mounds, boulders, dwarf birch and a standing stone. Set piece: a cairn crowned with shed antlers.

## Musk ox: the Glacier moraine (north-east)
- **Feel:** a low, humped boulder of a beast. Its shaggy skirt sweeps almost to the ground over pale stockings, and its horns hook down and up. The legend is half mammoth: great curling tusks with cold fire at their tips, blocks of glacier ice standing on its back, and glowing eyes.
- **Fights:** a wall. Adults form a ring round their young: they slow down and take less damage while near each other. They charge one at a time with a head-butt (knockback). The legend's quake splits the ice.
- **Sigil idea:** a broad head under a heavy boss, horns sweeping out, down and hooking up, and a long fringe hanging below.
- **Area:** blue-white ice and gravel, meltwater along its edges, big boulders and a tall cairn. Set piece: a blue ice arch over a meltwater pool, with boulders frozen into it.

## Lemming: the Snowy fell
- **Feel:** a tiny, round, golden-and-dark ball of fury on wind-packed snow, among bent mountain birches and dwarf willow. The legend is the "great migration": twice the size, with a thick ruff, ice stones on its back and cold fire.
- **Fights:** swarms. The area holds many more of them (its strength number low, so `countScale` gives lots). Each is weak and quick, nipping and scattering. The legend calls a stampede: lemmings pour out of the burrows round it.
- **Sigil idea:** a round face, tiny ears, whiskers and two front teeth.
- **Area:** pale snow with dwarf willow (cream catkins), bent mountain birch and boulders. Set piece: a glacial erratic, a great boulder balanced on three small stones, with a snow cap and lemming burrows under it.

## Open questions for Ed
- Is a fantastical north kind wanted at this stage, such as a frost wyrm, a mammoth legend or an ice stag? The musk ox legend is already halfway to a mammoth.
- Snow on the trees would need a trait in the tree genomes. Should it be shown before biomes are built?
