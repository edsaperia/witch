// Every area folder's recipe, flora and kind line (art/areas/<id>/recipe.js, flora.js, kind.json) and the placeholders' lines
// (config/kinds/), gathered for art/recipes.js, art/flora/areas.js and src/rules/kinds.ts (the kinds table, by slot). Written by
// node tools/data.mjs areas index (and adopt), the recipes and flora sorted by id, the kinds by slot: don't edit it, run that.
import { FEN } from "./fen/recipe.js";
import { HERONRY } from "./heronry/recipe.js";
import { ERG } from "./erg/recipe.js";
import { WARREN } from "./warren/recipe.js";
import { SAVANNA } from "./savanna/recipe.js";
import { PLAINS } from "./plains/recipe.js";
import { SCRUB_WASH } from "./scrub-wash/recipe.js";
import { MOSSY_CREEK } from "./mossy-creek/recipe.js";
import { FROSTCAVE } from "./frostcave/recipe.js";
import { EYRIE } from "./eyrie/recipe.js";
import { DELL } from "./mossy-dell/recipe.js";
import { MANGROVE_POOLS } from "./mangrove-pools/recipe.js";
import { MUDFLAT } from "./mudflat/recipe.js";
import { TERRACES } from "./misty-terraces/recipe.js";
import { MANGROVE } from "./mangrove/recipe.js";
import { BUSHVELD } from "./bushveld/recipe.js";
import { PACKICE } from "./packice/recipe.js";
import { CACTUS_FLATS } from "./cactus-flats/recipe.js";
import { RED_CANYON } from "./red-canyon/recipe.js";
import { BAMBOO_JUNGLE } from "./bamboo-jungle/recipe.js";
import { TEMPLE_JUNGLE } from "./temple-jungle/recipe.js";
import { RIVER_JUNGLE } from "./river-jungle/recipe.js";
import { ROOKERY } from "./rookery/recipe.js";
import { MOONPOOL } from "./moonpool-glade/recipe.js";
import { DRAGON_SCRUB } from "./dragon-scrub/recipe.js";
import { SNOWFIELD } from "./snowfield/recipe.js";
import { CRAGS } from "./crags/recipe.js";
import { ICEFALL } from "./icefall/recipe.js";
import { MISTWOOD } from "./mistwood/recipe.js";
import { TROLLWOOD } from "./trollwood/recipe.js";
import { CINDER_SLOPES } from "./cinder-slopes/recipe.js";
import { AREA_FLORA_ALDER_FOREST } from "./alder-forest/flora.js";
import { AREA_FLORA_ANCIENT } from "./ancient/flora.js";
import { AREA_FLORA_BEAVER_POND } from "./beaver-pond/flora.js";
import { AREA_FLORA_BERRY_THICKET } from "./berry-thicket/flora.js";
import { AREA_FLORA_BLUEBELL_GLADE } from "./bluebell-glade/flora.js";
import { AREA_FLORA_BOG } from "./bog/flora.js";
import { AREA_FLORA_CAVE_MOUTH } from "./cave-mouth/flora.js";
import { AREA_FLORA_DEADWOOD } from "./deadwood/flora.js";
import { AREA_FLORA_FERN_FOREST } from "./fern-forest/flora.js";
import { AREA_FLORA_GARDEN } from "./garden/flora.js";
import { AREA_FLORA_GRASSLAND } from "./grassland/flora.js";
import { AREA_FLORA_HAZEL_FOREST } from "./hazel-forest/flora.js";
import { AREA_FLORA_HEATH } from "./heath/flora.js";
import { AREA_FLORA_HOLLY_THICKET } from "./holly-thicket/flora.js";
import { AREA_FLORA_HONEYSUCKLE_TANGLE } from "./honeysuckle-tangle/flora.js";
import { AREA_FLORA_LOG_PILE } from "./log-pile/flora.js";
import { AREA_FLORA_MEADOW } from "./meadow/flora.js";
import { AREA_FLORA_MOOR } from "./moor/flora.js";
import { AREA_FLORA_MUDDY_FOREST } from "./muddy-forest/flora.js";
import { AREA_FLORA_NORWAY } from "./norway/flora.js";
import { AREA_FLORA_OLD_OAKS } from "./old-oaks/flora.js";
import { AREA_FLORA_OLD_PINEWOOD } from "./old-pinewood/flora.js";
import { AREA_FLORA_RAVINE } from "./ravine/flora.js";
import { AREA_FLORA_ROCKY_SLOPE } from "./rocky-slope/flora.js";
import { AREA_FLORA_STONE_SHRINE } from "./stone-shrine/flora.js";
import { AREA_FLORA_STREAM } from "./stream/flora.js";
import { AREA_FLORA_TANGLY_FOREST } from "./tangly-forest/flora.js";
import { AREA_FLORA_TWIGGY_FOREST } from "./twiggy-forest/flora.js";
import { AREA_FLORA_WETLAND } from "./wetland/flora.js";
import { AREA_FLORA_WISPY_FOREST } from "./wispy-forest/flora.js";
export const AREA_FOLDER_RECIPES = [FEN, HERONRY, ERG, WARREN, SAVANNA, PLAINS, SCRUB_WASH, MOSSY_CREEK, FROSTCAVE, EYRIE, DELL, MANGROVE_POOLS, MUDFLAT, TERRACES, MANGROVE, BUSHVELD, PACKICE, CACTUS_FLATS, RED_CANYON, BAMBOO_JUNGLE, TEMPLE_JUNGLE, RIVER_JUNGLE, ROOKERY, MOONPOOL, DRAGON_SCRUB, SNOWFIELD, CRAGS, ICEFALL, MISTWOOD, TROLLWOOD, CINDER_SLOPES];
export const AREA_FOLDER_FLORA = { "alder-forest": AREA_FLORA_ALDER_FOREST, ancient: AREA_FLORA_ANCIENT, "beaver-pond": AREA_FLORA_BEAVER_POND, "berry-thicket": AREA_FLORA_BERRY_THICKET, "bluebell-glade": AREA_FLORA_BLUEBELL_GLADE, bog: AREA_FLORA_BOG, "cave-mouth": AREA_FLORA_CAVE_MOUTH, deadwood: AREA_FLORA_DEADWOOD, "fern-forest": AREA_FLORA_FERN_FOREST, garden: AREA_FLORA_GARDEN, grassland: AREA_FLORA_GRASSLAND, "hazel-forest": AREA_FLORA_HAZEL_FOREST, heath: AREA_FLORA_HEATH, "holly-thicket": AREA_FLORA_HOLLY_THICKET, "honeysuckle-tangle": AREA_FLORA_HONEYSUCKLE_TANGLE, "log-pile": AREA_FLORA_LOG_PILE, meadow: AREA_FLORA_MEADOW, moor: AREA_FLORA_MOOR, "muddy-forest": AREA_FLORA_MUDDY_FOREST, norway: AREA_FLORA_NORWAY, "old-oaks": AREA_FLORA_OLD_OAKS, "old-pinewood": AREA_FLORA_OLD_PINEWOOD, ravine: AREA_FLORA_RAVINE, "rocky-slope": AREA_FLORA_ROCKY_SLOPE, "stone-shrine": AREA_FLORA_STONE_SHRINE, stream: AREA_FLORA_STREAM, "tangly-forest": AREA_FLORA_TANGLY_FOREST, "twiggy-forest": AREA_FLORA_TWIGGY_FOREST, wetland: AREA_FLORA_WETLAND, "wispy-forest": AREA_FLORA_WISPY_FOREST };
export const AREA_FOLDER_KINDS = [
  {"kind":"hedgehog","slot":0,"phase":0,"bearing":170,"dir":"S","biome":"temperate"},
  {"kind":"squirrel","slot":1,"phase":0,"bearing":285,"dir":"WNW","biome":"temperate"},
  {"kind":"hare","slot":2,"phase":0,"bearing":0,"dir":"N","biome":"temperate"},
  {"kind":"fox","slot":3,"phase":0,"bearing":40,"dir":"NE","biome":"temperate"},
  {"kind":"marten","slot":4,"phase":0,"bearing":345,"dir":"NNW","biome":"temperate"},
  {"kind":"stoat","slot":5,"phase":0,"bearing":250,"dir":"WSW","biome":"temperate"},
  {"kind":"mole","slot":6,"phase":0,"bearing":80,"dir":"E","biome":"temperate"},
  {"kind":"snail","slot":7,"phase":0,"bearing":215,"dir":"SW","biome":"temperate"},
  {"kind":"dormouse","slot":8,"phase":0,"bearing":310,"dir":"NW","biome":"temperate"},
  {"kind":"badger","slot":9,"phase":0,"bearing":130,"dir":"SE","biome":"temperate"},
  {"kind":"beetle","slot":10,"phase":1,"bearing":70,"dir":"ENE","biome":"temperate"},
  {"kind":"boar","slot":11,"phase":1,"bearing":300,"dir":"WNW","biome":"temperate"},
  {"kind":"otter","slot":12,"phase":1,"bearing":270,"dir":"W","biome":"temperate"},
  {"kind":"heron","slot":13,"phase":1,"bearing":240,"dir":"WSW","biome":"temperate"},
  {"kind":"newt","slot":14,"phase":1,"bearing":225,"dir":"SW","biome":"temperate"},
  {"kind":"woodlouse","slot":15,"phase":1,"bearing":110,"dir":"ESE","biome":"temperate"},
  {"kind":"moth","slot":16,"phase":1,"bearing":160,"dir":"SSE","biome":"temperate"},
  {"kind":"bat","slot":17,"phase":1,"bearing":195,"dir":"SSW","biome":"temperate"},
  {"kind":"toad","slot":18,"phase":1,"bearing":15,"dir":"NNE","biome":"temperate"},
  {"kind":"raven","slot":19,"phase":1,"bearing":35,"dir":"NE","biome":"temperate"},
  {"kind":"elk","slot":20,"phase":2,"bearing":0,"dir":"N","biome":"temperate"},
  {"kind":"wolf","slot":21,"phase":2,"bearing":25,"dir":"NNE","biome":"temperate"},
  {"kind":"lynx","slot":22,"phase":2,"bearing":50,"dir":"NE","biome":"temperate"},
  {"kind":"ram","slot":23,"phase":2,"bearing":75,"dir":"ENE","biome":"temperate"},
  {"kind":"salamander","slot":24,"phase":2,"bearing":100,"dir":"E","biome":"temperate"},
  {"kind":"spider","slot":25,"phase":2,"bearing":135,"dir":"SE","biome":"temperate"},
  {"kind":"snake","slot":26,"phase":2,"bearing":170,"dir":"S","biome":"temperate"},
  {"kind":"cat","slot":27,"phase":2,"bearing":205,"dir":"SSW","biome":"temperate"},
  {"kind":"stag","slot":28,"phase":2,"bearing":265,"dir":"W","biome":"temperate"},
  {"kind":"beaver","slot":29,"phase":2,"bearing":290,"dir":"WNW","biome":"temperate"},
  {"kind":"bear","slot":30,"phase":2,"bearing":320,"dir":"NW","biome":"temperate"},
  {"kind":"owl","slot":31,"phase":2,"bearing":335,"dir":"NNW","biome":"temperate"},
  {"kind":"arcticfox","slot":32,"phase":3,"bearing":12,"dir":"NNE","biome":"cold"},
  {"kind":"ibex","slot":33,"phase":3,"bearing":38,"dir":"NE","biome":"mountains and glaciers"},
  {"kind":"redpanda","slot":34,"phase":3,"bearing":63,"dir":"ENE","biome":"mountains and glaciers"},
  {"kind":"komodo","slot":35,"phase":3,"bearing":89,"dir":"E","biome":"rocky"},
  {"kind":"meerkat","slot":36,"phase":3,"bearing":115,"dir":"ESE","biome":"badlands"},
  {"kind":"armadillo","slot":37,"phase":3,"bearing":141,"dir":"SE","biome":"badlands"},
  {"kind":"fennec","slot":38,"phase":3,"bearing":166,"dir":"SSE","biome":"hot"},
  {"kind":"lion","slot":39,"phase":3,"bearing":192,"dir":"SSW","biome":"hot"},
  {"kind":"crocodile","slot":40,"phase":3,"bearing":218,"dir":"SW","biome":"mangrove swamp"},
  {"kind":"dragonfly","slot":41,"phase":3,"bearing":243,"dir":"WSW","biome":"mangrove swamp"},
  {"kind":"tiger","slot":42,"phase":3,"bearing":269,"dir":"W","biome":"jungle"},
  {"kind":"flyingsquirrel","slot":43,"phase":3,"bearing":295,"dir":"WNW","biome":"cold rainforest"},
  {"kind":"roe","slot":44,"phase":3,"bearing":321,"dir":"NW","biome":"cold rainforest"},
  {"kind":"penguin","slot":45,"phase":3,"bearing":346,"dir":"NNW","biome":"cold"},
  {"kind":"frosttroll","slot":46,"phase":4,"bearing":5,"dir":"N","biome":"cold"},
  {"kind":"snowleopard","slot":47,"phase":4,"bearing":25,"dir":"NNE","biome":"mountains and glaciers"},
  {"kind":"frostwyrm","slot":48,"phase":4,"bearing":45,"dir":"NE","biome":"mountains and glaciers"},
  {"kind":"griffin","slot":49,"phase":4,"bearing":65,"dir":"ENE","biome":"mountains and glaciers"},
  {"kind":"unknown-19","slot":50,"phase":4,"bearing":85,"dir":"E","biome":"rocky","placeholder":true},
  {"kind":"stegosaurus","slot":51,"phase":4,"bearing":105,"dir":"ESE","biome":"volcanic"},
  {"kind":"rattlesnake","slot":52,"phase":4,"bearing":125,"dir":"SE","biome":"badlands"},
  {"kind":"scorpion","slot":53,"phase":4,"bearing":145,"dir":"SE","biome":"badlands"},
  {"kind":"rhino","slot":54,"phase":4,"bearing":165,"dir":"SSE","biome":"hot"},
  {"kind":"cheetah","slot":55,"phase":4,"bearing":185,"dir":"S","biome":"hot"},
  {"kind":"unknown-25","slot":56,"phase":4,"bearing":205,"dir":"SSW","biome":"mangrove swamp","placeholder":true},
  {"kind":"crab","slot":57,"phase":4,"bearing":225,"dir":"SW","biome":"mangrove swamp"},
  {"kind":"unknown-27","slot":58,"phase":4,"bearing":245,"dir":"WSW","biome":"mangrove swamp","placeholder":true},
  {"kind":"elephant","slot":59,"phase":4,"bearing":265,"dir":"W","biome":"jungle"},
  {"kind":"jaguar","slot":60,"phase":4,"bearing":285,"dir":"WNW","biome":"jungle"},
  {"kind":"raccoon","slot":61,"phase":4,"bearing":305,"dir":"NW","biome":"cold rainforest"},
  {"kind":"unicorn","slot":62,"phase":4,"bearing":325,"dir":"NW","biome":"cold rainforest"},
  {"kind":"polarbear","slot":63,"phase":4,"bearing":345,"dir":"NNW","biome":"cold"},
];
