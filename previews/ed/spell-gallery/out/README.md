# Spell gallery (mock, 2026-10-27)

Ed: "animal ranged attack graphics… magic spells; they should glow / flame / splash when they land, and have a variety of effects and colours and looks." This is a mock only: nothing in the game changes yet.

A spell is four independent layers:

1. **Delivery**: from the rules (bolt, beam, lob, nova, quake). It sets the motion and the warning.
2. **Element**: one of eight schools. It sets the colours, the core shape, the trail, the impact and the ground mark.
3. **Side effect**: shown by shape, never colour (slow = chain links, stun = circling stars, knockback = shockwave, confuse = spiral).
4. **Power**: adult against legend, shown as size, brightness, particle count and a second ring.

Every wild spell also wears the **danger frame**:
- The warning (the lob's landing ring, the beam's lane, the nova's and quake's reach) is the same white dashed ring or lane, with a dark edge on both sides, marching.
- Bolts get a dark outline.

It doesn't depend on red (now the adult rank colour on sigils). On lit grass the dark edges carry it; at night the white dashes do.

## The files
Everything is at play zoom: the game's art pixel (16 a metre, 3 screen pixels), over real in-game ground, with glow as additive bloom. A dark blob stands in for the creature.

| File | What |
|---|---|
| `gallery-lit.webp`, `gallery-night.webp` | All 5 deliveries × 8 elements, animated, full colour |
| `gallery-lit-<element>.gif`, `gallery-night-<element>.gif` | One element's five deliveries per GIF (a whole-grid GIF loses colours to its 256-colour palette) |
| `gallery-lit.gif`, `gallery-night.gif` | The whole grid as a GIF (colours approximate) |
| `gallery-*-still.png` | Each delivery at its most telling frame: a bolt in flight, the beam firing, the lob landing, the nova ring, the quake warning |
| `side-effects.gif` | The four side-effect shapes, lit and night |
| `adult-vs-legend.gif` | Power: adult (1.0) against legend (1.6), four elements × bolt, lob and nova, at night |

## The eight elements

| Element | Palette (dark → hot) | Core | Trail | Impact | Ground mark |
|---|---|---|---|---|---|
| fire | ember red → yellow-white | orb | rising embers | burst | scorch ring |
| frost | deep blue → white | shard | twinkling sparkles | shatter | rime |
| venom | swamp green → lime | droplet | drips | splash | puddle |
| moonlight | indigo → white | crescent | wisps | ring | halo |
| storm | navy → electric white | zigzag spark | sparks | crackle | char lines |
| earth | umber → amber (glowing edge, solid core) | rock | dust | rubble | cracks |
| shadow | near-black → violet (dark core, bright rim) | void orb | smoke | poof | dark pool |
| bloom | magenta → cream, leaf green | petal ring | drifting petals | blossom | flowers |

## Data format (one file, `config/spells.json`)
```json
{
  "elements": {
    "fire": { "palette": ["#821a0a", "#f05c16", "#ffc43c", "#fff6c8"], "core": "orb", "trail": "embers", "impact": "burst", "mark": "scorch", "particles": 1 },
    "…": {}
  },
  "effects": { "slow": "chains", "stun": "stars", "knockback": "shockwave", "confuse": "spiral" },
  "power": { "1": 0.7, "2": 1.0, "3": 1.6 },
  "danger": { "dash": 3, "march": 1, "edge": "#100c14", "outline": true },
  "byBiome": { "volcanic": "fire", "hot": "fire", "cold": "frost", "mountains and glaciers": "frost", "mangrove swamp": "venom", "jungle": "bloom", "badlands": "earth", "cold rainforest": "moonlight", "temperate": "earth" },
  "bySpecies": { "salamander": "fire", "spider": "venom", "…": "…" }
}
```
- **Delivery and side effect** come from `config/combat.json` (the attack's `delivery` and `modifier`), so a new delivery (bounce, curve, boomerang, homing, delayed explode) needs only its motion. Its look comes from the element's parts.
- **Element** is the species', else its biome's.
- **Power** is by level.

## Rendering approach
- **One pixel atlas**, baked once at load by the art generator (`art/effects.js` grows):
  - the 8 cores at 3 sizes;
  - each impact's 6 frames;
  - the 8 marks;
  - the 4 side-effect motifs;
  - the danger frame's pieces.
  - It's drawn in a 4-step ramp (dark, mid, bright, hot), so each element is a palette, not new art. That's about 120 sprites of 32 px or under, one 512×512 texture.
- **One shared particle pool**: instanced quads in typed arrays, about 2,000 slots, one draw call.
  - Each instance carries an atlas cell, a palette row and a glow flag.
  - The shader looks the ramp step up in the palette row, so tinting costs nothing.
  - Trails, impact bits and marks are pool particles, seeded from the attack's id and time (`hash2`), so a replay or a shot is the same every time.
- **Glow** rides the existing bloom. The solid parts (earth's rock, shadow's core, the danger frame's edges) draw unlit.
- **What it replaces:** the red dots, lines and rings in `src/render/leash/combat.ts`, which call into the pool instead.
- **Wild and party:** both use the same system. A party animal's spells can keep their species neon as the palette and drop the danger frame.

## Cost
- **Per spell:** up to about 40 live particles for an adult, 80 for a legend.
- **A busy wave:** 20 spells in the air is about 1,000 quads in one draw call. CPU update is about 0.1 ms a frame on the pool (typed arrays, no allocation).
- **Memory:** one 512² atlas (1 MB) and the pool's arrays (about 100 KB).
- **Build, in three PRs:**
  1. The atlas and data, with the art check (cores, impacts, marks, motifs drawn and in budget).
  2. The pool, with `combat.ts` switched over and the danger frame.
  3. The species picks and tuning, with proof shots.

## Picks: species → element (side effect from its attack)

| Species | Attack (delivery) | Element | Why |
|---|---|---|---|
| salamander | beam | fire | volcanic, a fire lizard |
| woodlouse | spit (bolt) | earth | volcanic grit; fire is the salamander's |
| moth | spit (bolt) | moonlight | dusty night flier |
| bat | screech (nova) | shadow | its screech is a dark ring; confuse fits |
| toad | slam (nova) | venom | a toxic slam; slow fits |
| raven | longspit (bolt) | storm | mountain sky; stun fits |
| spider | web (bolt) | venom | a sticky web shot; slow shown as chains |
| snake | spit (bolt) | venom | venom spit |
| owl | lob | moonlight | night hunter, a silent arc |
| mole | upheaval (nova) | earth | heaving ground; knockback |
| elephant | slam (nova) | earth | a jungle giant's stamp; knockback |
| frost troll | slam (nova) | frost | cold; slow |
| frost wyrm | legend nova | frost | the obvious one |
| sphinx | screech, legend beam | moonlight | riddles; confuse |
| feathered serpent | spit, legend nova | storm | the jungle sky serpent |
| every legend's quake | quake | its biome's (`byBiome`) | the island's own colour |

Bloom has no species of its own here. It's the jungle's biome default, and the obvious home for the unicorn or a flower creature if one gets a ranged attack.

## Honest read
**Works:**
- Colour plus shape tells the eight elements apart at play zoom, day and night.
- The danger frame reads the same over all eight.
- Power reads clearly.

**Weaker:**
- On lit grass the glow is quieter, as the game's bloom would be. Venom and earth sit closest to the grass's colours, so their impacts read less than fire, frost or storm. They lean on their shapes (splash, rubble).
- The stand-in creature is a blob, so the bolts' mouth flare isn't shown.
- Side effects are shown over a dummy, not timed to a real hit.
- A whole-grid GIF loses colours: use the WebP or the per-element GIFs.
