# Evolution briefs: each level its own design

Ed (2026-10-05): "I would emphasise the exaggerated silhouettes and the evolved design per stage (not just being larger) - the creatures, especially adult and legendary, can be quite fantastic with lots of details; not just 'large versions of the creature'."

**The bar** is Ed's boar reference (described in `docs/ART-GUIDE.md` section 0): a round piglet, a hump-shouldered tusked adult, and a monstrous legend with sweeping tusks, flame wisps and a shaggy mane.

**The rules for every species:**
- Every level gains something new and pushes the silhouette further.
- The species stays readable at every level.
- The legend tells its area's story.
- Sizes stay as the size checks require. These briefs are about **shape and features**, not scale.

What the generator has to support is listed at the end. `tools/art-iterations/evolutions.js` has a first evolved boar made with the little that exists today.

## Boar (fern forest)
- **Baby:** a near-ball on four stubs. Big head, tiny snout disc, small upright ears, a curl of tail. Three pale bands along the back, at least 2 px each, or a single pale back stripe at baby size. No tusks.
- **Young:** longer and leaner, the first hump over the shoulders, short tusk nubs. The bristle ridge starts as a short jagged edge.
- **Adult:**
  - A big shoulder hump with a heavy front and a narrow rump, the head carried low.
  - A pale snout and two big curved white tusks hooking up.
  - Dark bristles in a jagged crest from crown to hump, and a tufted tail curling up.
  - Stocky legs with dark hooves.
- **Legend:**
  - Massive and top-heavy, its head down to charge.
  - Tusks sweeping up and curling round past its head; a second, smaller pair below.
  - A shaggy dark mane from crown to hump and under the belly.
  - Pale fire wisps rising from the tusk tips and the mane (the fern forest's story: an old fire-boar of the pinewood).
  - Its eye is a bright point under a heavy brow.

## Badger (moor)
- **Baby:** round and low, a big head with an oversized white blaze (the cue is all face), tiny legs, a fluffy body.
- **Young:** a longer, flatter wedge body. The blaze runs nose to crown, between two black bands.
- **Adult:**
  - A broad, low, armoured-looking back with a coat in layered shaggy plates.
  - Heavy digging forelegs with big pale claws.
  - The face bands pushed wider, and a short bristled tail.
- **Legend:**
  - Huge and wide, low as a boulder.
  - Its back is a ridge of grey standing stones growing out of the fur, each with a moonlit rune on its face.
  - Moss and heather at its flanks.
  - Long pale claws like stone blades, and a white blaze glowing faintly in moonlight (the moor's story: the stones walk).

## Snail (muddy forest)
- **Baby:** a tiny, almost transparent pale shell with one turn, a soft body, and big stalk eyes for its size.
- **Young:** an amber banded shell of two turns, the body grey-brown.
- **Adult:**
  - A tall shell, its spiral raised into a cone with a ridge on each whorl.
  - Bands in amber and umber.
  - A broad mantle frill and longer eye stalks.
  - A slime sheen as one pale highlight line.
- **Legend:**
  - A shell grown into a spiral tower with buttresses, mud and roots caked at its base.
  - Tiny trees and fungi on its whorls.
  - A warm amber glow from the shell's mouth.
  - Huge, slow eye stalks with glowing tips (the muddy forest's story: a house the forest built).

## Fox (stone shrine)
- **Baby:** a fluffy round kit, oversized ears, a short round tail with a white tip, dark socks just starting.
- **Young:** a slim body, long legs, a full brush tail, a sharp face.
- **Adult:**
  - A ruff of fur at the neck and cheeks.
  - Ears with dark backs.
  - Two tails, the second smaller (the first sign of the kitsune), with pale tips.
- **Legend:**
  - A kitsune: seven tails rooted along the rump, sweeping up and back together like flames, of different lengths, their tips in pale fox-fire.
  - A white mask-like marking on the face, and a ruff of fur like a mane.
  - Stone-grey prayer-bead markings along its legs (the shrine's story).

## Ram (tangly forest)
- **Baby:** a white curly ball of fleece, a black face and legs, no horns, oversized ears.
- **Young:** fleece in clear curls, the first horn buds spiralling back.
- **Adult:**
  - Heavy dark horns in a full curl, ridged.
  - A thick fleece ruff at the neck.
  - Black face and legs, a broad chest.
- **Legend:**
  - Bronze horns in a double spiral.
  - Brambles and nettles woven through the fleece, with a few red berries.
  - Thorny growths along the horn ridges.
  - Huge, its fleece hanging in shaggy locks (the tangly forest's story: the thicket grows from it).

## Woodlouse (wispy forest)
- **Baby:** pale, almost white, few plates (5), short feelers, round.
- **Young:** slate grey, 7 plates with pale edges, longer feelers.
- **Adult:**
  - 10 plates, each edge a raised rim.
  - Two tail spikes.
  - Long jointed feelers.
  - A pale fleck pattern only on the plate edges.
- **Legend:**
  - Armoured like a fortress, its plates grown into overlapping shields with spiked edges.
  - Moonstone crystals growing along the spine.
  - Long whip feelers, and dry leaves caught in its plates (the wispy forest's story: it rolls through the leaf litter).

## Wolf (test case)
- **Baby:** a round pup, big paws, a big head, floppy ears, a stubby tail.
- **Young:** lanky, ears up, a long tail.
- **Adult:**
  - A heavy shaggy mane over the shoulders.
  - A dark saddle, a long snout, a brush tail with a dark tip.
- **Legend:**
  - Shoulders twice the hips.
  - A mane in spiky locks.
  - Pale spirit-fire running along the spine and tail.
  - Glowing eyes, and frost on its muzzle.

## Owl (test case)
- **Baby:** an owlet, a fluffy ball of down with huge eyes and no ear tufts.
- **Young:** smooth feathers, a facial disc forming, short ear tufts.
- **Adult:**
  - A strong facial disc with a dark rim.
  - Long ear tufts, barred chest feathers, folded wings with patterned tips.
- **Legend:**
  - Wings half spread like a cloak.
  - Ear tufts swept back like horns.
  - A ring of glowing eyes in the disc's rim.
  - Feathers edged in moonlight.

## What the creature generator has to support (for art builder 2)
1. **Per-level genome changes.** A `levels` patch (body, head, coat, parts) and per-level `features`, so each stage can change shape and gain parts. A first opt-in version is in `art/genome/index.js` and `quad3d` on #121 (pixel-identical by default). Every builder should read it.
2. **A parts kit by socket**, each part with size curves by level:
   - curved and double tusks;
   - horn and antler shapes beyond today's two or three;
   - manes and ruffs (shaggy locks along a path);
   - crests and jagged bristle edges;
   - armour plates and spikes;
   - multiple tails along a root line;
   - tail flourishes;
   - shell towers.
3. **Area-tied flourishes.** Elemental wisps (fire, moonlight, frost), standing stones, moss, brambles and crystals as parts, with materials from the area. Today's legend features are primitives and read as toys.
4. **Posture per level.** Head low or raised, body weight forward, so a charging legend keeps its face readable. Today, lowering the neck hides the head behind the hump (see the evolved boar on the ladder).
5. **Markings per level as parts:** a piglet's bands, the badger's blaze, the fox's mask, the woodlouse's plate rims. These go with the texture work and need a minimum width at each level's size.
