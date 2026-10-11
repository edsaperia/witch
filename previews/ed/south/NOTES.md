# South: hotter, eventually desert; south-west blends into mangrove swamp (concepts)

These are concept sheets only, and nothing here is in the game. Each kind is a scratch genome record on an existing builder, with a sigil and a sleeping-legend pose. Each area type is a scratch area recipe, drawn by the existing art generator.

The sheets:
- `creatures-lineup.png`: baby, young, adult and legend, with the witch for scale.
- `faces.png`: the adult, young and baby in each expression (neutral, angry, happy and dazed), then enraged.
- `sleeping-legends.png`: the sleeping legend in its two breathing frames, then awake.
- `sigils.png`: the sigil at its four levels, then as the ground rune.
- `areas.png`: one row per area: its floor, small and big objects, set piece and creature.

## Ed's decisions (2026-10-11)
1. All six kinds and their areas are approved, as drawn.
2. The four gaps are now built properly in the art kit (PR "Journey art kit" into claude/prototype, with no roster or game wiring), and these sheets are redrawn with them:
   - a `sand` floor kind (long low swells, wind ripples, a few stones and blades) with its own tuft mix: the dunes and the salt pan;
   - a real palm genome, `datePalm` (a tall bending ringed trunk, arching fronds, a bunch of dates): the dunes, the jungle and the wallow;
   - a stilt-root `mangrove` (a low wide dome on arching prop roots): the mangrove swamp;
   - a `scarab` builder (a domed beetle with a head horn growing each level, a rake of teeth, toothed digging legs; its legend rolls a ball of sunlight, `sunBall`): the sun scarab.
3. The jaguar's sigil has been redrawn to read clearly as a big cat (see `../west/`).

`new-trees.png` shows the date palm and mangrove whole, then as their crown and their trunk. `tufts.png` shows each area's ground tufts.

## Fennec (area: Dune scrub)
- **Feel:** small, quick and bright-eyed, the fox family's desert cousin, all ears. Its legend is a desert kitsune with a fan of sand-gold tails.
- **How it fights:** a skirmisher. It darts in, nips and darts out, and kicks a spray of sand: a short cone that slows the target. Fennecs come in threes, and the legend fans its tails to throw a sandstorm ring.
- **Sigil:** a front-on face that is almost all ears, in orange neon.
- **Dune scrub:** rippled sand floor, dune ridges at the edges, dry grass and pebbles. Lone flat-topped thorn trees (the `flat` tree standing in for an acacia), a few date palms, wind-cut boulders. Floor: the new `sand` kind. Set piece: a ring of sun-bleached stones round a dry well (the `ring` set generator on the area's sand).

## Sun scarab (area: Salt pan)
- **Feel:** a gold, metallic beetle that rolls a ball of light, Ra's dung beetle. It is slow and heavy, and armoured.
- **How it fights:** a tank and roller. It winds up, then charges, rolling a burning ball that bowls the posse over in a line. It shrugs off weak hits (the "tink"). The legend's ball is a small sun that leaves scorched ground.
- **Sigil:** a beetle seen from above, pushing a disc, in lemon neon.
- **Salt pan:** a white salt-crust floor (the `sand` kind, pale), low cliffs, pebbles and bleached stumps, boulders and spires far apart. Set piece: a sun temple fallen to rubble and half-buried (the `heap` generator; it wants dressed sandstone, not moss).
- **Built:** it now has its own `scarab` builder: a domed beetle with a head horn, and a legend rolling a ball of sunlight.

## Mangrove croc (area: Mangrove swamp, south-west)
- **Feel:** a long, low ambusher: a log with eyes in brackish water. Its legend is a sunk old croc grown into a mangrove islet, with trees on its back (the `moss` legend feature).
- **How it fights:** it lies submerged and still until the witch comes close, then snaps (a fast, high-damage bite with a short telegraph). It drags its target back toward the water (a pull, the reverse of a knockback). It is slow on open ground.
- **Sigil:** a long snout seen from above, with eye bumps and teeth, in acid neon.
- **Mangrove swamp:** grey tidal-mud floor, brackish channels, reeds and arching roots. Stilt-root mangroves (the new `mangrove` tree), with a little alder. Set piece: a stilt jetty half-sunk among the roots (`jetty`).

