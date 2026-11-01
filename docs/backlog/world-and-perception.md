# The witch's world and perception

**Audit status (2026-11-01): Design context with a partly implemented peaceful-play loop; interpretive lore and signal mappings remain proposals.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| Personal imagined/magical world and ambiguous Ent/broom origin | — | Intentional lore possibilities, not a reveal or implementation requirement; preserved as context. |
| Party optional: wander, beach friends and collect mushrooms | **Built** | Pre-spell exploration/beach interactions plus current mushroomButton and MushroomView have no party-on requirement. #1523 source, first shipped version unverified. `rules/mushrooms.ts`, `render/mushrooms.ts`, partyOver.ts. Old six-kind preview is not used to infer current availability. |
| Perception exposes normally invisible machinery | **Partly built** | Implemented trips expose selected render/clock signals, not all candidate mappings. #1535/#1544 and potion registry; first live versions unverified. |
| Gentle ordinary mappings for restlessness, affection and music | — | Candidate connections are not implied built by the existing source signals. |


Design context from Ed's conversation, 2026-10-30. Interpretive possibilities, not a requirement for exposition or a change to the existing island progression.

## A world of her own

Ed imagines that the whole world may be hers: her imagination, or something created through her magic. Each witch has her own world, as each player has their own game. This is why she is at the centre. Owning or creating it does not remove surprise: she can explore, be delighted and challenged, and make animal and witch friends along the way.

Do not resolve how visiting witches cross between worlds unless the game needs an answer. The world can remain personal without its inhabitants feeling like puppets.

The treehouse connects home, growth and exploration. Ed offered two deliberately ambiguous possibilities: she might be a baby Ent; alternatively, her broom might be the baby Ent. Preserve both as possibilities, not simultaneous established lore. Neither requires a reveal or explanatory dialogue.

## The party is optional

Ed values being able to leave the party unstarted, visit friends on the beach, wander and pick mushrooms. These are valid ways of spending time in the world. Judge environmental effects in peaceful wandering as well as combat; they should give that time texture too.

Ed describes the game as a twin-stick shooter with creature collecting and a dash of tower defence. The social and exploratory space coexists with that action structure. "Coven Rush" was raised as a name; this note does not mandate a rename or invent a naming decision.

## Perception reveals the construction

Ed's guiding phrase: "the normally invisible machinery of the game becomes part of her perception." Trips can expose planning, smoothing, masks, clocks, drawing layers and other hidden systems. They can cross signals: scenery becomes an output for animal intention, music quality, affection or restlessness.

Trees, grass, ground and lighting are freely available as visual outputs where their change is scenery-only. Distinguish changing their drawing from changing collision or other gameplay state. Temporary intentional wrongness is the point; normal readability is not a blanket limit on trips.

Light versions may strengthen ordinary communication: tense vegetation during a wind-up, atmosphere reflecting legend restlessness, vegetation responding to affection, or music quality affecting environmental clarity. These remain candidate mappings. Use consistent meanings in normal play; mushrooms can amplify, spread or misroute them.

Projects are in [visual-response-projects.md](visual-response-projects.md); the growing effect catalogue and discovery rule are in [cauldron.md](cauldron.md).
