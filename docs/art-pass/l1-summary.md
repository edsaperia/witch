# L1 skeleton targets

**Provisional checkpoint, 7 November 2026 — not READY.** Branch `codex/art-pass-l1`, [PR1898](https://github.com/edsaperia/witch/pull/1898), base524b0acaa. Eight species: fox, arcticfox, fennec, wolf, raccoon, redpanda, badger and the game's **smooth-coated otter**.

Authority: [original brief](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707737381), superseded in scope by [skeleton-first ruling](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707758462). Targets for1866; no current-art fixes or graph/game changes. Old sprite review omitted. Native-size recognition and exact camera fit are untested.

## Evidence and limits

Eight generated eight-cell sheets: adult/mobile-young × standing/walking × towards/away, 64 whole-animal cells. Each species page embeds its sheet and records its exact prompt, source-photo link, checklist, proportions, mass profile and limitations. [Manifest](l1-evidence.json) records provenance/checksums. Camera target: art/model3d.js PITCH=.52 radians, yaw±.6. Generated photos are approximate, not calibrated orthographic renders or measured gaits.

**Only red-fox and Arctic-fox real photos were visually inspected. Six adult photo checks and all eight mobile-young photo checks remain incomplete:** Commons returned HTTP429 for remaining downloads. No photo is committed or republished. Ratios are provisional artist blockout estimates, not measured zoological data. Generated badger/otter body heights are especially provisional. Real anatomy wins.

## Lane table

| Species | Reads-as target | Top 3 priorities | Missing graph features / existing capabilities |
|---|---|---|---|
| [fox](fox.md) | Red fox, target only | Slender torso with real tuck; Narrow muzzle and triangular ear cups; Long low brush with pale terminal zone | Existing triangular ear geometry and tapered tail are usable. Missing in generic graph contract: head-local child attachments (ears currently use an adapter), an independently articulated hock/ankle in the diagnostic leg, and age-aware fur/brush volume controls. Multiple tail sockets are structurally possible; the level2 two-tail and level3 nine-tail design still needs a reviewed adapter, not extra biological tails. |
| [arcticfox](arcticfox.md) | Arctic fox, target only | Short muzzle and small rounded ears; Compact short-limbed body; Dense coat and low brush | Torso station profiles, short legs and an ordinary tail already exist. Missing in the generic contract: rounded cupped ear attachments parented to the head, age/coat volume independent of bone length, and an explicit hock chain. The base adapter's ear controls reduce the gap; ears themselves are not wholly absent. |
| [fennec](fennec.md) | Fennec fox, target only | Broad cupped ear geometry and roots; Light body and fine muzzle; Dark-tipped pale brush | Triangular ears with width/height/depth and root angle exist in quadruped.js, so do not request 'add ears'. The generic graph still lacks a reusable head-parented pinna socket and articulated hock. A broad concave sail-like pinna and controlled inner/outer material boundary need validation beyond the existing four-face cup. |
| [wolf](wolf.md) | Grey wolf, target only | Deep chest and long articulated limbs; Broad muzzle with restrained ears; Low straight bushy tail | Digitigrade family, torso profile and pointed ears exist. Missing from diagnostic graph gait: separate hock/ankle articulation and head/neck local transforms. Shared graph must retain a proper shoulder-ribcage-waist profile under ruff. This is a target handoff to1866; no parallel wolf candidate or tuning here. |
| [raccoon](raccoon.md) | Raccoon, target only | Rump-high low-headed mass profile; Distinct forehands and elongated hind feet; Mask and moderate ringed tail | Plantigrade family, curved spine stations and tail rings already exist. Missing generic controls: five articulated/splayed foredigits, differentiated long hind sole versus forehand, head-parented round ears. Generic foot ellipsoids cannot supply recognisable raccoon hands alone. Rings are a tuning/adapter task, not a missing shared primitive. |
| [redpanda](redpanda.md) | Red panda, target only | Broad short-muzzled face and pale ear rims; Black lower body with rounded trunk; Long thick ringed tail | Plantigrade legs, torso profiles, tail rings and tip masks exist. Missing generic graph features: head-local rounded ear attachments, distinct claw-bearing grasping feet, and age-specific fur/tail volume controls. No new 'ringed-tail system' is needed; the current shared tail painter should be reused. |
| [badger](badger.md) | European badger, target only | Long low broad torso; Low wedge head and longitudinal stripes; Digging foreclaws on short heavy limbs | Plantigrade legs, low torso profiles and stub tails exist. Missing generic graph controls: broad separate forefeet with directional digging claws, head-local ear attachments, and anisotropic shoulder/neck transitions. Legacy claw decoration is not proof that generic compiled feet carry claws correctly through gait. |
| [otter](otter.md) | Smooth-coated otter, target only | Long low flowing body and neck; Flattened muscular tapering tail; Broad muzzle and short webbed feet | Low plantigrade limbs and circular tapered tail chains exist. Missing generic features: webbing between toes, per-axis tail cross-section (current tail points specify one radius), and head-local tiny round ears. Flattened tail is a true geometry-contract gap, distinct from existing ring/tip painting. |

## Combined graph gaps

1. Separate hock/ankle in generic diagnostic gait; its root→knee→end chain is distinct from richer existing production anatomy.
2. Head-local child attachments and rotating frames; existing quadruped ear root/splay/cup controls should be reused, not rebuilt.
3. Species feet: raccoon fingers, badger foreclaws, otter webbing and separate fore/hind sole proportions.
4. Non-circular tail cross-section for otter: generic tail points expose one radius. Tail rings and terminal colour zones already exist.
5. Age/coat volume separate from bone lengths, after real juvenile-photo checks. Keep existing genome levels and ornaments; no new age registry.

This audit describes **published base524b0acaa**, not the unmerged1866 candidate. Route gaps to that owner through this PR; no duplicate candidate or worktree edits.

## Legend addition: provisional picks

Three actual generated concepts per species (24 total) are in the [legend review contact sheet](l1-legends.md), with the chosen checklist/body-plan/graph gaps on each species page. These picks are recommendations for Ed. Source-matched today's-legend panels are pending root/cloud response; no historical image is called today. Fit-and-variety correction6707992824 supersedes the older generic-motif ban.

| Species | Provisional pick | Signature element |
|---|---|---|
| fox | B: Hollow-oak listener | Wood-grain whorl within one immense brush |
| arcticfox | A: Shelter of winters | One drift-layered shelter brush |
| fennec | B: The last hearth | Ember light held inside ear sails |
| wolf | A: Voice of winters | A howl made visible |
| raccoon | A: The first hand | Luminous handprints |
| redpanda | A: Keeper of the steps | Mist terraces released by tail rings |
| badger | A: Keeper of the old sett | Epoch-worn spade foreclaws |
| otter | C: The water reader | Light droplets on sensing whiskers |

Tail-based picks have distinct animal-specific reasons: fox memory in fur, Arctic fox shelter, red panda balance. Other-lane committed picks were checked at14:20UTC; none matching the pick/signature markers was available then. Global spread still needs coordinator review; see the contact sheet for exact limits.

## Remaining / wake condition

Complete six blocked adult and eight juvenile visual comparisons when Commons is accessible without429 or root supplies cloud evidence; resolve per-sheet cautions and settle camera fit with1866 owner. Then coordinator assesses READY. No local browser/heavy run requested or used. No idle monitor.
