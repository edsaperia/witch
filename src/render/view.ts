// The Three.js view: reads the game state each frame and draws it. Rendered into a canvas of
// (window size / pixel size) and stretched with nearest-neighbour by the browser, so every art
// pixel stays a crisp square.
import { RigView, rigOn } from "./rig/rigView";
import type { RigGear } from "./rig/rigBuild";
import type { Creature } from "../rules/creatures";
import { partyGearOf } from "./artBuild";
import { beatTime } from "../rules/beat";
import * as THREE from "three";
import { sigilColour } from "../../art/generator.js";
import type { Game } from "../rules/game";
import { poseOf, STEP } from "../rules/game";
import { FALLBACK_LOOK, floorLook, type FloorLook } from "./legendFloor";
import { AREA_TYPES, HOME_LOOK, nearestClearings, type LegendClearing } from "../rules/map";
import { canopyShown, witchHeight } from "../rules/witch";
import { AssetLibrary } from "./assets";
import type { LightSource } from "../rules/forest";
import { Ground } from "./ground";
import { Sky } from "./sky";
import { moonState, type MoonState } from "../rules/moon";
import { Clouds } from "./clouds";
import { Smoke } from "./smoke";
import { Ride } from "./ride";
import { bendPoint, groundHeight, HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL, HeightField, placed, useHeightField } from "./height";
import { PathView } from "./paths";
import { applyStyleLight, LIGHT_UNIFORMS } from "./lighting";
import { AreaMoods, hsvInto, moodOf } from "./mood";
import { hsv2rgb } from "../../art/generator.js";
import { Post } from "./post";
import { GrassView } from "./grass";
import { SpellFx } from "./spellfx";
import { TRAIL_DEFAULT, WitchTrail } from "./trail";
import { SWOOP_TRAIL_DEFAULT, SwoopTrails } from "./swoopTrails";
import { InviteView } from "./invites";
import { stunned } from "../rules/knock";
import { StateMarks } from "./looks";
import { ActionBar } from "./actionbar";
import { BuffHud } from "./buffhud";
import { Dancefloor } from "./dancefloor";
import { PartyView } from "./party";
import { MarkerArt, MarkerFx, type Mote } from "./markers";
import { PARTY_CAST, waveCountdown, type SpawnMarker } from "../rules/party";
import { WaveNumbers } from "./waveNumbers";
import { StringLightsView } from "./strings";
import { LeashView } from "./leash";
import { Lasers, type RingSpeaker } from "./lasers";
import { PartyWitchView } from "./partyWitches";
import { BeachView } from "./beach";
import { PartyObjectsView } from "./partyObjects";
import { BorderView } from "./borders";
import { HAT, StoneIndicator } from "./indicator";
import { hatMarker } from "../rules/hat";
import { hasRune } from "../rules/creatureStates";
import { leyPulse, pointerShown } from "../rules/leypulse";
import { Minimap } from "./minimap";
import { Rulers } from "./rulers";
import { Mist } from "./mist";
import { ShadowBatch, type ShadowInstance } from "./shadows";
import { newBudget, stepBudget, type SceneryBudget } from "../rules/budget";
import { packAtlas } from "./atlas";
import { berrySprite } from "./berries";
import { LeyLines, leyReveal, shaderPulse } from "./leylines";
import { bootLineAt, bootPath, bootPulseAt, bootShare } from "../rules/bootRing";
import { Glades } from "./glades";
import { leyChain, leyKey } from "../rules/leylines";
import { SPRITE_UNIFORMS, SpriteBatch } from "./sprites";
import type { Style } from "./style";

// The view's parts, each in its own module under view/ (issue #122), as functions of the View:
// what the camera can see, the pop check, the scenery rebuild, creatures and berries, home's
// pieces (markers, speakers, treehouse), and the lights. Its fields they share aren't private.
import { inView, overBulge, updateFrustum, viewRect } from "./view/culling";
import { checkPops, drawGhosts } from "./view/pops";
import { refresh } from "./view/scenery";
import { drawBerries, drawCreatures } from "./view/creatures";
import { drawMarkers, drawSpeakers, placeTreehouse } from "./view/home";
import { setLights, updateSources } from "./view/lights";

/** Her shadow, lying on the rolling ground corner by corner. */
const SHADOW_VERT = `varying vec2 vUv;
${HEIGHT_VERT_GLSL}
void main(){ vUv = uv; gl_Position = clipOf(onGround((modelMatrix * vec4(position, 1.0)).xyz)); }`;

/** A point light: where, how far it reaches, its colour and strength. */
export interface ForestLight { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number }

/** A frame's CPU budget (ms) for the view, drawing included, of which the work done ahead (the
 *  forest, the hills, ground tiles, art) gets whatever the frame's own work and its drawing (as
 *  the last frames' took) leave, each at least its floor. (It was 9 ms before the drawing: with
 *  the drawing's few ms on top, a frame with work ahead ran long. Ed, 2026-10-05: spiky late in a run.) */
const FRAME_MS = 11;

export interface ViewStats { berries: number; forestMs: number; forestMissing: number; sceneryRadius: number; fps: number; gameplay: number; scenery: number; dropped: number; trees: number; bushes: number; creatures: number; batches: number; drawCalls: number; pendingArt: number; pendingGround: number; lights: number; heightMoves?: number }

/** Her dropped hat is drawn this far (m) to the side of where she went down, so it isn't under her as she sits slumped
 *  (well inside the pick-up radius of the spot itself). */
const HAT_BESIDE = 0.9;
const HAT_INK = new THREE.Vector3(232 / 255, 180 / 255, 106 / 255); // (the HUD's one accent)

export class View {
  readonly renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  private ground: Ground;
  /** The rolling ground (height.ts): drawn only, the rules stay flat. */
  private heights: HeightField;
  /** The bend the view is easing to (the treetops' when she's rising or up there), for culling. */
  bendTo = 0;
  /** How much each wave number shows over the bent horizon (eased), by its area, and when it was last eased. */
  numberSeen = new Map<string, number>();
  numbersAt = 0;
  /** How far the camera is lifted to see her over a hill in between (metres, eased). */
  private camLift = 0;
  /** The night sky that shows over the bend, in treetop mode. */
  private sky: Sky;
  /** The moonlight as the style and mood set it, before the moon's colour tints it (rules/moon.ts). */
  private moonBase = new THREE.Vector3();
  private moonUpBase = new THREE.Vector3();
  /** Seconds added to game time for the moon only (previews: a time-lapse of its phases, way and colours). */
  moonShift = 0;
  /** Real clouds over the bend, with lightning. */
  private clouds: Clouds;
  /** Smoke rising from the fires (Ed, round 13). */
  private smoke: Smoke;
  /** The charcoal huts' smouldering mounds near her (looked up when she has moved far), for the smoke. */
  private mounds: number[] = [];
  private moundsAt = { x: Infinity, z: Infinity };
  readonly assets: AssetLibrary;
  typeBatches = new Map<number, SpriteBatch>();
  decorBatches = new Map<string, SpriteBatch>();
  creatureBatches = new Map<string, SpriteBatch>();
  private witchBatch: SpriteBatch;
  /** Her with her hat knocked off, and the hat where it lies (rules/hat.ts): made once the game is up. */
  private bareBatch: SpriteBatch | null = null;
  private bareAsked = false;
  /** The smoothed heights she and the camera ride over the hills (ride.ts), and how far hers is
   *  over the ground under her this frame (everything drawn at her adds it). */
  private ride = new Ride();
  private camRide = new Ride();
  private rideOff = 0;
  private rideTime = NaN;
  treehouseBatch: SpriteBatch;
  markerArt: MarkerArt;
  markerBatch: SpriteBatch;
  markerFx = new MarkerFx();
  markerCache = { wave: -1, n: -1, list: [] as SpawnMarker[] };
  /** 1 while she sits on the treehouse terrace, easing to 0 as she takes off. */
  private seatK = 1;
  private seatTime = 0;
  speakerBatch: SpriteBatch | null = null;
  readonly grass: GrassView;
  private spellFx = new SpellFx();
  /** The party spell's cast already burst into sparkles (its time). */
  private castSeen: number | null | undefined = undefined;
  /** Her flight trail: a ribbon of glow in the colour of the area she's over (render/trail.ts). */
  private trail: WitchTrail;
  private trailAt = -1;
  private trailRgb = new THREE.Vector3();
  readonly actionBar = new ActionBar(document.body);
  private buffHud = new BuffHud(document.body);
  private shadow: THREE.Mesh;
  mpp: number; // metres per art pixel
  lastBuild = { x: Infinity, y: Infinity, z: Infinity, version: -1, radius: -1 };
  /** The scenery budget: how far round the witch scenery is drawn (rules/budget.ts). */
  budget: SceneryBudget;
  /** ?scenery=<metres>: a fixed scenery radius instead of the adaptive one. */
  sceneryFixed: number | null = null;
  private lastReal = 0;
  readonly post: Post;
  private dancefloor: Dancefloor;
  propBatch: SpriteBatch;
  private partyView: PartyView;
  private strings: StringLightsView;
  leashView: LeashView;
  private lasers: Lasers;
  /** The ley lines through the runestones in wave order (Ed, 2026-10-04). */
  private ley: LeyLines;
  /** The ley line's brightness by the mood, and the share of it shown (it fades as the party's over: rules/partyOver.ts). */
  private leyBright = 1;
  private leyShown = 1;
  /** The sleeping legends' clearings: their twilight and rising motes. */
  private glades: Glades;
  private gladeTime = 0;
  /** The ley line's colour by the mood (leyRgb), or null for each area's own. */
  private leyRgb: THREE.Vector3 | null;
  /** The party the ley line follows (without quests done when it moves on only by waves), its chain, and each stone's colour. */
  private leyParty: Game["party"] | null = null;
  private readonly leyHome = new THREE.Vector3(0.8, 0.7, 1);
  private readonly leyChainNow = () => leyChain(this.leyParty ?? this.game.party, this.game.map);
  private readonly leyColour = (s: { cell: readonly [number, number] }) => {
    if (this.leyRgb) return this.leyRgb; // the mood's: a guide in the HUD's amber, not a light source (the art director's round 2)
    return this.markerArt.colour.get(AREA_TYPES[this.game.map.typeOf(s.cell[0], s.cell[1])].creature) ?? this.leyHome;
  };
  /** The party witches on the dancefloor, and our witch when she idles into the party. */
  private partyWitchView: PartyWitchView;
  /** The beach round the circular map: nothing made until she's near it. */
  private beachView: BeachView;
  /** The party witches' rainbow swoop trails (render/swoopTrails.ts). */
  private swoopTrails: SwoopTrails;
  /** The 💌s, their bubbles and rings (render/invites.ts). */
  private inviteView: InviteView;
  /** Angry brows and daze stars over the creatures (render/looks.ts). */
  private stateMarks: StateMarks;
  /** The smoke test sets this to draw trunks flat magenta for a frame, to count them on screen. */
  debugTrunks = false;
  /** The party objects strewn over partified areas (#38). */
  partyObjects: PartyObjectsView;
  private borders: BorderView;
  private nextStones: StoneIndicator[] = [];
  /** The pointer to her hat while it lies where she was knocked out (rules/hat.ts): 🎩 in a whole ring. */
  private hatPointer: StoneIndicator | null = null;
  readonly minimap: Minimap;
  /** Metre rulers and a ground grid (G). */
  readonly rulers = new Rulers(document.body);
  /** Show debug readouts (the debug overlay is on). */
  debugReadouts = false;
  private soundBatch: SpriteBatch;
  sources: LightSource[] = [];
  /** Lights in the forest besides the witch's glow, from the light sources (set by the view). */
  forestLights: ForestLight[] = [];
  shadows: ShadowBatch;
  /** The live rig (#79 stage 5, ?rig=1): creatures put together from parts each frame. */
  readonly rig: RigView | null;
  /** The camera's snap this frame, in the picture's pixels (x right, y down): what main.ts shifts the canvas by. */
  readonly subpixel = { x: 0, y: 0 };
  /** What the canvas's glide follows: "witch" (her own snap, so she holds still on screen while the
   *  world glides: Ed's 2026-10-06 playtest, "it feels low") or "camera" (the camera's snap: the world
   *  exact, her a pixel either way from frame to frame). ?glide= picks one. */
  glide: "witch" | "camera" = "witch";
  /** Her sprite's base this frame (world, before the bend), for the frame-feel trace. */
  readonly witchBase = { x: 0, y: 0, z: 0 };
  shadowList: ShadowInstance[] = [];
  private mist: Mist | null = null;
  width = 1;
  height = 1;
  /** ?debug=cull: tint anything that has just appeared bright red, and mark where anything has
   *  just vanished with a red frame for a second. */
  debugCull = false;
  /** ?quick=1, for the quick smoke test in CI: no drawing the rest of the map's art ahead of need. */
  quick = false;
  ghosts: { x: number; z: number; h: number; until: number }[] = [];
  ghostLines: THREE.LineSegments | null = null;
  now = 0;
  /** The area moods (render/mood.ts), if the mood is spooky; the area she's in, when it's next looked up, and when they were last eased. */
  private areaMoods: AreaMoods | null = null;
  private moodArea = "";
  private moodAt = -Infinity;
  private moodTime = NaN;
  stats: ViewStats = { berries: 0, forestMs: 0, forestMissing: 0, sceneryRadius: 0, fps: 0, gameplay: 0, scenery: 0, dropped: 0, trees: 0, bushes: 0, creatures: 0, batches: 0, drawCalls: 0, pendingArt: 0, pendingGround: 0, lights: 0 };

  constructor(readonly canvas: HTMLCanvasElement, readonly game: Game, readonly style: Style, witchGenome: unknown = null) {
    const t = game.tuning;
    this.budget = newBudget(t);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.info.autoReset = false; // count every pass of a frame, reset in render()
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // colours are the art's own sRGB values, untouched
    this.mpp = 1 / (t.artPixelsPerMetre * (2 / t.pixelSize));
    this.camera = new THREE.PerspectiveCamera(t.camera.fov, 1, 1, 900);
    this.post = new Post(this.renderer, t);
    this.scene.background = new THREE.Color(0x0b0a16);
    // With find on (Ed, v244), a touch more ambient and a cooler, more coloured moonlight.
    const moonLook: Record<string, number> = t.find.on ? { moonHue: t.find.moonHue, moonSat: t.find.moonSat } : {};
    // The mood (render/mood.ts): the spooky grade over the style's light, or the plain light.
    const M = moodOf(t), moodLook: Record<string, number> = M ? { ambientHue: M.ambientHue, moonHue: M.moonHue, moonSat: M.moonSat, glowHue: M.glowHue, glowSat: M.glowSat } : {};
    applyStyleLight({ ...style, shafts: style.shafts * t.moonbeams, ...moonLook, ...moodLook }, t.glowReach, this.mpp, (t.find.on ? t.find.ambient : t.tone.ambient) * (M?.ambient ?? 1), t.glowFalloff, t.tone.moon * (M?.moon ?? 1));
    this.areaMoods = M ? new AreaMoods(M) : null;
    // The characters' moonlight rim and her own glow on her (the art director's round 1), the mood's.
    // A stylised art style (?style=bold|ref) bakes its light into dark tones with flat normals, so it takes its own,
    // stronger rim and glow on her (the art director's round 3: she vanished in her own pool on the dark moor).
    const styled = (style as { artStyle?: string }).artStyle === "bold" || (style as { artStyle?: string }).artStyle === "ref";
    { const rgb = new THREE.Vector3(); hsvInto(rgb, M?.rimHue ?? 0.66, M?.rimSat ?? 0.4, 1); SPRITE_UNIFORMS.uMoodRim.value.set(rgb.x, rgb.y, rgb.z, (styled ? M?.styledRim : undefined) ?? M?.rim ?? 0); }
    SPRITE_UNIFORMS.uWitchGlow.value = (styled ? M?.styledGlow : undefined) ?? M?.witchGlow ?? 0;
    SPRITE_UNIFORMS.uWitchLift.value = (styled ? M?.styledLift : undefined) ?? M?.witchLift ?? 0;
    SPRITE_UNIFORMS.uRimInset.value = styled ? 1 : 0;
    // The moon's fill on upward faces (the art director's round 2), in its own hue (round 3: green-cyan, not periwinkle);
    // its strength a share of the moon's.
    { const U = LIGHT_UNIFORMS.uMoon.value, c = new THREE.Vector3(); hsvInto(c, M?.moonUpHue ?? M?.moonHue ?? 0, M?.moonUpSat ?? M?.moonSat ?? 0, 1, Math.max(U.x, U.y, U.z) * (M?.moonUp ?? 0)); LIGHT_UNIFORMS.uMoonUp.value.set(c.x, c.y, c.z, M?.moonUpWrap ?? 0); }
    if (M) LIGHT_UNIFORMS.uHazeColour.value.fromArray(hsv2rgb(M.hazeHue, M.hazeSat, 1).map((c: number) => (c / 255) * M.haze));
    LIGHT_UNIFORMS.uGlowPower.value = t.glowPower;
    LIGHT_UNIFORMS.uGlowNear.value = Math.max(0.05, Math.min(1, t.glowNear ?? 1));
    if (t.bare) {
      // The bare view: a low moon raking across the ground so the slopes read; no glow, no haze.
      LIGHT_UNIFORMS.uMoonDir.value.set(-0.85, 0.28, 0.42).normalize();
      LIGHT_UNIFORMS.uMoon.value.multiplyScalar(4);
      LIGHT_UNIFORMS.uAmb.value.multiplyScalar(2);
      LIGHT_UNIFORMS.uGlowPower.value = 0;
    }
    this.moonBase.copy(LIGHT_UNIFORMS.uMoon.value); { const U = LIGHT_UNIFORMS.uMoonUp.value; this.moonUpBase.set(U.x, U.y, U.z); } // (the moonlight before the moon's own colour: updateMoon)
    this.assets = new AssetLibrary(style, game.seed, t.pixelSize, witchGenome);
    this.assets.crownShare = t.trunkFade.crownShare;
    {
      // The steepest the hills may be: the camera's shallowest pitch at any zoom, ground or treetop (Ed, v289).
      const C = t.camera, pitch = Math.min(C.ground.angleIn, C.ground.angleOut, C.treetop.angleIn, C.treetop.angleOut);
      this.heights = new HeightField(game.map, game.forest, { ...t.ground.hills, maxSlope: Math.tan((pitch * Math.PI) / 180) });
    }
    useHeightField(this.heights);
    this.heights.follow(game.witch.x, game.witch.z);
    this.ground = new Ground(game.map, game.forest, style, this.mpp);
    this.sky = new Sky(t.sky, t.moon.disc);
    this.scene.add(this.sky.mesh);
    this.clouds = new Clouds(t.sky.clouds, t.sky.lightning, game.seed);
    this.scene.add(this.clouds.mesh, this.clouds.bolt);
    this.smoke = new Smoke(t.smoke);
    this.scene.add(this.smoke.mesh);
    this.assets.onFloor = (type, tile) => this.ground.setFloor(type, tile);
    this.assets.prefetchType(HOME_LOOK); // home's meadow floor (no trees ask for it)
    const cs = t.canopyShadow;
    this.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind);
    this.shadows = new ShadowBatch(t.shadows.strength, t.fx === "smooth");
    this.shadows.mesh.visible = t.shadows.on;
    this.scene.add(this.shadows.mesh);
    const smooth = t.fx === "smooth";
    LIGHT_UNIFORMS.uSmooth.value = smooth ? 1 : 0;
    if (t.mist.on && t.mist.strength > 0) {
      this.mist = new Mist(M?.mist ?? t.mist.strength, t.mist.height, t.mist.wind, this.mpp, smooth, this.post.scene.depthTexture, this.post.lowSize);
      if (smooth) { this.post.fxScene = new THREE.Scene(); this.post.fxScene.add(this.mist.mesh); }
      else this.scene.add(this.mist.mesh);
    }
    // (no haze in the bare view; the mood's fog comes nearer than the culling's far edge, which stays t.haze.far)
    LIGHT_UNIFORMS.uHazeRange.value.set(t.bare ? 1e5 : M?.hazeNear ?? t.haze.near, t.bare ? 2e5 : M?.hazeFar ?? t.haze.far);
    this.ground.mesh.renderOrder = -1; // first: the grounds' decals go on it before anything stands on it
    this.scene.add(this.ground.mesh);
    this.scene.add(new PathView(game.map, style, this.mpp, t.pathFade.metres).group);

    // The witch is depth-tested like everything else, drawn after it; where something still hides
    // her, a silhouette in her glow colour shows through, and tall things in front of her fade.
    const O = t.occlusion;
    this.witchBatch = this.makeWitchBatch();
    SPRITE_UNIFORMS.uOcc.value.set(O.fadeOpacity, O.edge, O.minHeight, O.on ? 1 : 0);
    // The treehouse, home: its base and its crown (the crown only from the treetops), its trunk's
    // foot on its spot. It fades like other tall things when she's behind it.
    {
      // (Placed each frame by placeTreehouse: where it stands depends on the camera's angle.)
      this.treehouseBatch = new SpriteBatch(this.assets.treehouse.atlas, this.mpp, { fade: true });
      this.scene.add(...this.treehouseBatch.meshes);
    }
    // Spawn markers: gameplay (always drawn in range, never budget-culled).
    this.minimap = new Minimap(document.body, game.map);
    this.markerArt = new MarkerArt(style, t);
    this.markerBatch = new SpriteBatch(this.markerArt.atlas, this.mpp, { solid: true });
    this.scene.add(...this.markerBatch.meshes, this.markerFx.group, this.waveNumbers.mesh);
    // The ground cover: tufts round the witch, in ground mode.
    this.grass = new GrassView(game.map, t, this.mpp, style, game.forest, (this.ground.mesh.material as THREE.ShaderMaterial).uniforms);
    this.scene.add(this.grass.mesh);
    this.scene.add(this.spellFx.trail);
    this.trail = new WitchTrail(game.tuning.trail ?? TRAIL_DEFAULT);
    this.scene.add(this.trail.mesh);
    // The dancefloor's speakers: their batch comes with their art (drawSpeakers).
    this.assets.speakerArt();
    this.propBatch = new SpriteBatch(this.assets.props, this.mpp, { fade: true });
    // Berries: a small shiny dark-red berry, drawn here (a highlight upper left, a darker side),
    // always drawn (gameplay), unlit so it reads at night; its halo and glints are in leash.ts.
    this.berryBatch = new SpriteBatch(packAtlas([berrySprite(t.berries.colour)], 64), this.mpp, { unlit: true });
    this.scene.add(...this.berryBatch.meshes);
    this.scene.add(...this.propBatch.meshes);
    this.partyView = new PartyView(this.assets.soundsystems, this.mpp);
    this.strings = new StringLightsView(this.scene, game);
    this.leashView = new LeashView(this.scene, game);
    this.rig = rigOn() ? new RigView(this.scene, this.assets, this.mpp) : null; // the live rig (#79): on unless ?rig=0
    this.lasers = new Lasers(this.scene, game);
    this.ley = new LeyLines(t.leyLines, (x, z) => this.heights.sourceAt(x, z), game.map);
    this.leyBright = M?.leyBright ?? 1;
    this.ley.scale(this.leyBright);
    this.leyRgb = M?.leyRgb ? new THREE.Vector3(...[1, 3, 5].map(i => parseInt(M.leyRgb!.slice(i, i + 2), 16) / 255)) : null;
    this.scene.add(...this.ley.meshes);
    this.glades = new Glades(t.glades);
    this.scene.add(this.glades.points);
    this.partyObjects = new PartyObjectsView(this.scene, this.assets, this.mpp);
    this.partyWitchView = new PartyWitchView(this.scene, this.assets, this.mpp, t.witch);
    this.beachView = new BeachView(this.scene, this.assets, this.ground, this.mpp, t.witch);
    this.swoopTrails = new SwoopTrails(game.tuning.swoopTrail ?? SWOOP_TRAIL_DEFAULT);
    this.scene.add(this.swoopTrails.mesh);
    this.inviteView = new InviteView(game);
    this.stateMarks = new StateMarks(this.scene, this.mpp);
    this.borders = new BorderView(this.scene, game);
    this.soundBatch = new SpriteBatch(this.assets.soundsystems, this.mpp, { solid: true });
    this.scene.add(...this.soundBatch.meshes);
    this.dancefloor = new Dancefloor(game.map, t, SPRITE_UNIFORMS, this.mpp);
    this.scene.add(this.dancefloor.ball, this.dancefloor.beam, this.dancefloor.motes);

    // A shadow under the witch, so her height reads: soft (multiplied over the ground), or
    // dithered with ?fx=pixel.
    const sm = t.fx === "smooth"
      ? new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
        vertexShader: SHADOW_VERT, uniforms: { ...HEIGHT_UNIFORMS },
        fragmentShader: "varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }",
      })
      : new THREE.ShaderMaterial({
        transparent: false, depthWrite: false,
        vertexShader: SHADOW_VERT, uniforms: { ...HEIGHT_UNIFORMS },
        fragmentShader: "varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }",
      });
    // Finely divided, each point laid on the rolling ground, and drawn a little toward the camera: one
    // flat quad on a slope (Ed, v289) sank into the ground's coarser grid in places, a ragged blob.
    sm.polygonOffset = true; sm.polygonOffsetFactor = -2; sm.polygonOffsetUnits = -4;
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7, 6, 3).rotateX(-Math.PI / 2), sm);
    this.shadow.renderOrder = 1;
    this.scene.add(this.shadow);
  }

  /** Fit the canvas to the window: the scene at low resolution, shown scaled up by the pixel size. */
  resize(cssW: number, cssH: number): void {
    const p = this.game.tuning.pixelSize;
    this.width = Math.max(1, Math.ceil(cssW / p));
    this.height = Math.max(1, Math.ceil(cssH / p));
    // With the tilt-shift after the upscale, the canvas holds the full-size image; otherwise the
    // low-resolution one, which the browser scales up with nearest-neighbour.
    const k = this.post.fullResolution ? p : 1;
    this.renderer.setSize(this.width * k, this.height * k, false);
    this.post.resize(this.width, this.height, this.width * k, this.height * k);
    this.canvas.style.width = this.width * p + "px";
    this.canvas.style.height = this.height * p + "px";
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    SPRITE_UNIFORMS.uRes.value.set(this.width, this.height);
  }

  /** Make the art and ground round the start before the first frame. */
  async prepare(): Promise<void> {
    this.render(0, false);
    drawCreatures(this);
    this.ground.fill(this.renderer, viewRect(this, this.game.tuning.haze.near, 20), this.game.witch.x, this.game.witch.z, Infinity);
    await this.assets.whenIdle();
    this.render(0, false);
    refresh(this, true);
    // There are only 30 area types and 30 creatures: draw them all in the background now, so
    // the forest ahead is ready however fast she flies; the area types nearest her first.
    const m = this.game.map, w = this.game.witch, near = new Map<number, number>();
    for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
      const s = m.siteOf(x, y), t = m.typeOf(x, y), d = Math.hypot(s.x - w.x, s.z - w.z);
      if (!(near.get(t)! <= d)) near.set(t, d);
    }
    for (let t = 0; t < AREA_TYPES.length; t++) if (!near.has(t)) near.set(t, Infinity);
    this.prepared = true;
    if (this.quick) return; // ?quick=1 (the CI smoke test): only what's needed, as it's needed
    for (const [t] of [...near].sort((a, b) => a[1] - b[1])) this.assets.prefetchType(t);
    for (const t of AREA_TYPES) this.assets.creatureArt(t.creature);
  }

  batchFor<K>(map: Map<K, SpriteBatch>, key: K, atlas: () => SpriteBatch | undefined): SpriteBatch | undefined {
    let b = map.get(key);
    if (!b) {
      b = atlas();
      if (b) {
        map.set(key, b); this.scene.add(...b.meshes);
        // A set drawn after the start (flying toward an area whose art was still being drawn)
        // fades in rather than popping in.
        if (this.prepared) { b.appearU.value = 0; this.appearing.set(b, performance.now()); }
      }
    }
    return b;
  }
  /** Sets fading in since they were drawn, and when they arrived (real ms). */
  appearing = new Map<SpriteBatch, number>();
  private prepared = false;
  private easeAppearing(): void {
    const now = performance.now();
    for (const [b, at] of this.appearing) {
      const k = Math.min(1, (now - at) / 800);
      b.appearU.value = k * k * (3 - 2 * k);
      if (k >= 1) this.appearing.delete(b);
    }
  }

  // What the camera can see: its frustum now, and the frustum it is easing toward (a zoom step
  // or a rise or descent changes the view faster than any margin), plus a margin round both.
  // Everything drawn goes through this one test, so nothing is added or dropped on screen.
  frustum = new THREE.Frustum();
  frustumTo = new THREE.Frustum();
  /** How far the camera moved since the last frame (m): the horizon cull judges things that much nearer (view/culling.ts inView). */
  camStep = 0;
  lastCamPos = new THREE.Vector3(NaN, NaN, NaN);
  cullCam = new THREE.PerspectiveCamera();
  box = new THREE.Box3();
  m4 = new THREE.Matrix4();
  v3 = new THREE.Vector3();
  v3b = new THREE.Vector3();
  v3c = new THREE.Vector3();
  /** What was drawn last time, for the fresh tint and the pop check: one record for what the
   *  rebuild places (trees, undergrowth, walls, set pieces), one for what moves every frame
   *  (creatures, light props). */
  kindIds = new Map<string, number>();
  kindNames: string[] = [];
  /** What was drawn this frame and last, by key: each key's index into its list of x, z, height, kind. */
  tracks = {
    placed: { now: new Map<number, number>(), before: new Map<number, number>(), nowAt: [] as number[], beforeAt: [] as number[] },
    moving: { now: new Map<number, number>(), before: new Map<number, number>(), nowAt: [] as number[], beforeAt: [] as number[] },
  };
  pops: string[] = [];
  /** Keep track of what appears and vanishes (into pops): the smoke check turns it on (and
   *  ?debug=cull); off, a rebuild skips the bookkeeping. */
  trackPops = false;

  /** On foot: 0 flying, 1 landed (eased), and the sigil pose she's playing, if any. */
  private foot = 0;
  private footTime = 0;
  private footAct: { pose: string; at: number } | null = null;

  /** Where the last rebuild looked: the middle and half-size of its square (for the prefetch). */
  lastView: { x: number; z: number; half: number } | null = null;
  lastPose = { distance: 0, angle: 0, zoomStep: -1, lift: -1 };

  berryBatch: SpriteBatch;
  /** When each berry last grew again (game time), so it grows in rather than appearing. */
  regrewAt = new Map<number, number>();
  /** Berries just eaten: where, and when (game time), for the nibble's sparkle. */
  nibbles: { x: number; z: number; at: number }[] = [];
  /** When each party animal evolved (game time): the flash, the pop and the sparkles. */
  readonly evolvedAt = new Map<number, number>();
  /** Each area legend's lying down and getting up, as the view has seen its state change (render/legendSleep.ts). */
  readonly legendSleeps = new Map<number, import("./legendSleep").SleepTrack>();
  /** Each creature's distance walked as drawn, for its baked walk's frames (view/creatures.ts strideFrame). */
  readonly strides = new Map<number, { x: number; z: number; d: number; at: number }>();
  /** A party animal's gear for its rig page (as its party bake wears it), kept per creature and look. */
  private rigGears = new Map<string, RigGear>();
  rigGear(c: Creature, leashed: boolean): RigGear {
    const k = `${c.id}|${leashed ? 1 : 0}`;
    let g = this.rigGears.get(k);
    if (!g) { if (this.rigGears.size > 2000) this.rigGears.clear(); this.rigGears.set(k, (g = partyGearOf(c.id, leashed ? sigilColour(c.species) : null))); }
    return g;
  }
  // Campfires flicker, magic stones pulse; their props are drawn (ponds are in the ground).
  fire = new THREE.Vector3(1, 0.5, 0.16);
  runeCyan = new THREE.Vector3(0.3, 0.9, 1);
  runeViolet = new THREE.Vector3(0.75, 0.45, 1);
  runeGreen = new THREE.Vector3(0.45, 1, 0.5);
  /** Sparks from campfires lighting up as the party arrives (drawn with the markers' motes, next frame). */
  fireSparks: Mote[] = [];
  /** The world's campfires showing this frame, for the party objects to draw. */
  worldFires: { x: number; z: number; scale: number; flip: boolean }[] = [];
  /** Each light source's area (a campfire's party), worked out once. */
  sourceCell = new WeakMap<object, string>();
  /** ?bare: hide everything but the ground, the witch, soundsystems, the dancefloor and its
   *  speakers, the bend and the sky (set each frame, as the batches show themselves when set). */
  private hideForBare(): void {
    for (const b of [...this.typeBatches.values(), ...this.decorBatches.values(), ...this.creatureBatches.values(), this.treehouseBatch, this.propBatch, this.markerBatch])
      for (const m of b.meshes) m.visible = false;
    for (const o of [this.grass.mesh, this.markerFx.group, this.borders.mesh, this.lasers.mesh, this.spellFx.trail, this.trail.mesh, this.swoopTrails.mesh]) o.visible = false;
  }

  speakerFlare: (number | undefined)[] = [];
  /** Her lean cycle's phase (frames) and the time it was last stepped. */
  private leanPhase = 0;
  private leanTime = 0;
  /** Each ring speaker's top, state and power, for its laser (Ed: one each, none from the disco ball). */
  speakerTops: RingSpeaker[] = [];
  readonly waveNumbers = new WaveNumbers();
  /** Each dormant area's wave (wavePlan), worked out again when the party changes. */
  plan = { key: "", waves: new Map<string, number>() };
  /** When the ley line's tip reaches each stone (rules/leypulse.ts leyReachTimes), worked out again when the line changes. */
  leyReach: { key: string; times: Map<string, number> | null } = { key: "", times: null };
  /** Draw a frame; with draw false, only bring the camera, batches and art requests up to date. */
  /** Milliseconds each part of the latest frame took (for the perf check: tools/smoke). */
  ms: Record<string, number> = {};
  private lap = 0;
  private frameStart = 0;
  /** Whether the hills' next strip was all worked out last frame. */
  private heightsReady = true;
  /** The moon now (one moon: rules/moon.ts), and the moonlight tinted a little with its colour (moon.tint). */
  private updateMoon(g: Game): MoonState {
    const m = moonState(g.clock.time + this.moonShift, g.seed, g.tuning), k = m.kind === "red" ? g.tuning.moon.bloodTint : g.tuning.moon.tint, P = [0.92, 0.94, 0.86];
    const r = 1 + (m.rgb[0] / P[0] - 1) * k, gr = 1 + (m.rgb[1] / P[1] - 1) * k, b = 1 + (m.rgb[2] / P[2] - 1) * k, n = 3 / (r + gr + b); // its hue, not its brightness
    LIGHT_UNIFORMS.uMoon.value.set(this.moonBase.x * r * n, this.moonBase.y * gr * n, this.moonBase.z * b * n);
    const U = LIGHT_UNIFORMS.uMoonUp.value;
    U.set(this.moonUpBase.x * r * n, this.moonUpBase.y * gr * n, this.moonUpBase.z * b * n, U.w);
    return m;
  }

  /** The smoke (render/smoke.ts): the world's campfires burning now, the party's fires, and the charcoal huts' mounds, nearest first. */
  private updateSmoke(g: Game, time: number): void {
    const S = this.smoke, t = g.tuning, w = g.witch, R = t.smoke.range;
    S.begin();
    for (const f of this.worldFires) S.add(f.x, groundHeight(f.x, f.z), f.z, f.scale, w.x, w.z);
    this.partyObjects.fires(g, time, w.x, w.z, R, (x, z, size) => S.add(x, groundHeight(x, z), z, size, w.x, w.z));
    if (Math.hypot(w.x - this.moundsAt.x, w.z - this.moundsAt.z) > R * 0.25) { // the charcoal burner's mound smoulders by its hut (art/setpieces.js charcoal-hut: the mound to its right, a little nearer)
      this.moundsAt = { x: w.x, z: w.z }; this.mounds = [];
      const k = t.setPieceScale;
      for (const p of g.forest.setPiecesNear(w.x, w.z, R * 1.3)) if (AREA_TYPES[p.type]?.id === "twiggy-forest") this.mounds.push(p.x + 2.3 * k, p.z + 1.0 * k);
    }
    for (let i = 0; i < this.mounds.length; i += 2) S.add(this.mounds[i], groundHeight(this.mounds[i], this.mounds[i + 1]), this.mounds[i + 1], 1.2, w.x, w.z);
    S.end(time);
  }

  private time(part: string): void { const now = performance.now(); this.ms[part] = (this.ms[part] ?? 0) + now - this.lap; this.lap = now; }

  /** Her sprite batch, from the assets' witch frames (bare: her hat knocked off, and the hat on the ground). */
  private makeWitchBatch(bare = false): SpriteBatch {
    const t = this.game.tuning, b = new SpriteBatch(bare ? this.assets.witchBare() : this.assets.witch, this.mpp, { absolute: true, rim: true, witchLight: t.witch, silhouette: { colour: LIGHT_UNIFORMS.uGlowRgb.value.clone(), opacity: t.occlusion.silhouette } });
    b.mesh.renderOrder = 10;
    this.scene.add(...b.meshes);
    return b;
  }
  /** The character creator changed her look (her genome, art/witchGenome.js): her frames re-baked and her batch swapped. */
  setWitch(genome: unknown): void {
    this.assets.rebakeWitch(genome);
    this.scene.remove(...this.witchBatch.meshes);
    this.witchBatch = this.makeWitchBatch();
    if (this.bareBatch) { this.scene.remove(...this.bareBatch.meshes); this.bareBatch = null; this.bareAsked = false; }
  }

  /** How much of a thing shows over the bent horizon (culling.ts overBulge): the smoke check reads it. */
  overBulge(x: number, z: number, top: number): number { return overBulge(this, x, z, top); }

  /** The 💌's aim (issue #87): the world direction from the witch to the ground under a point on the page. */
  aimAt(clientX: number, clientY: number): { x: number; z: number } | null {
    const r = this.canvas.getBoundingClientRect(), w = this.game.witch;
    if (!r.width || !r.height) return null;
    this.aimRay.setFromCamera(new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, 1 - ((clientY - r.top) / r.height) * 2), this.camera);
    const at = this.aimRay.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(groundHeight(w.x, w.z) + 1)), this.v3);
    return at ? { x: at.x - w.x, z: at.z - w.z } : null;
  }
  private aimRay = new THREE.Raycaster();
  /** The drawing's CPU time (ms), eased over the last frames: the work ahead leaves room for it. */
  private drawEst = 0;

  /** The legends' clearings nearest her this frame (reused: no garbage a frame). */
  private nearRings: LegendClearing[] = [];
  /** Each clearing's ring brightening: eased up while she stands in it, and its last cue (a flash when
   *  something meant for its legend was put down outside it). */
  private ringGlow = new Map<LegendClearing, { k: number; flash: number }>();
  private ringItems: { x: number; z: number; r: number; edge: number; glow: number }[] = Array.from({ length: 6 }, () => ({ x: 0, z: 0, r: 0, edge: 0, glow: 0 }));
  private lastRingTime = 0;
  /** The legends' clearings nearest her, each with its ring's brightening (Ed, 2026-10-06: quest sigils and relics count
   *  only in the circle): up while she stands on the ground inside it, and a flash (dying over a second and a half) when a
   *  sigil or a relic meant for its legend was put down outside it. No garbage a frame. */
  private legendRings(g: Game, time: number): { x: number; z: number; r: number; edge: number; glow: number }[] {
    const w = g.witch, dt = Math.min(0.1, Math.max(0, time - this.lastRingTime)), near = nearestClearings(g.map.legendClearings, w.x, w.z, this.nearRings);
    this.lastRingTime = time;
    for (const e of g.leashEvents) if (e.kind === "outsideCircle") {
      const L = g.creatures[e.id], c = L && g.map.legendClearing(L.cell[0], L.cell[1]);
      if (c) { const s = this.ringGlow.get(c) ?? { k: 0, flash: -9 }; s.flash = time; this.ringGlow.set(c, s); }
    }
    const out = this.ringItems;
    for (let i = 0; i < near.length; i++) {
      const c = near[i], s = this.ringGlow.get(c) ?? { k: 0, flash: -9 };
      const inside = w.mode === "ground" && Math.hypot(w.x - c.x, w.z - c.z) <= c.r ? 1 : 0;
      s.k += (inside - s.k) * Math.min(1, dt * 4);
      if (!this.ringGlow.has(c)) this.ringGlow.set(c, s);
      const f = time - s.flash, flash = f >= 0 && f < 1.5 ? (1 - f / 1.5) * (0.6 + 0.4 * Math.cos(f * 12)) : 0;
      Object.assign(out[i], { x: c.x, z: c.z, r: c.r, edge: c.edge, glow: Math.min(1, Math.max(s.k, flash)) });
    }
    this.ringCount = near.length;
    // Their floors (render/ground.ts): each carving its legend's kind; its grooves' glint (the tuning's knob, 0 off) while it sleeps.
    const glint = g.tuning.legendClearing.floor?.glint ?? 0;
    for (let i = 0; i < near.length; i++) {
      const c = near[i], f = this.floorItems[i];
      const A = AREA_TYPES[g.map.typeOf(c.cell[0], c.cell[1])];
      f.species = A.creature; f.look = floorLook(A.id);
      let id = this.ringLegend.get(c);
      if (id === undefined) { id = (g.legendIds ?? []).find(k => { const L = g.creatures[k]; return L && L.cell[0] === c.cell[0] && L.cell[1] === c.cell[1]; }) ?? -1; this.ringLegend.set(c, id); }
      const L = id >= 0 ? g.creatures[id] : undefined;
      f.glint = glint > 0 && L && !L.gone && (L.legendState === "asleep" || L.legendState === "restless") ? glint : 0;
    }
    return out;
  }
  private floorItems: { species: string; glint: number; look: FloorLook }[] = Array.from({ length: 6 }, () => ({ species: "", glint: 0, look: FALLBACK_LOOK }));
  private ringLegend = new Map<LegendClearing, number>();
  private ringCount = 0;

  render(time: number, draw = true): void {
    this.ms = {}; this.lap = this.frameStart = performance.now();
    const g = this.game, t = g.tuning, pose = poseOf(g);
    // Her clock (rules/slowTime.ts): she and everything of hers (her frames, blinks, trail, 💌s, sigils, the action bar) at full
    // speed, while the world (time) may run slow in a sleeping legend's circle; eased between steps as the world's is.
    const ht = Math.max(0, g.herTime - Math.max(0, g.clock.time - time) / Math.max(1e-3, g.timeScale));
    // The scenery budget follows the real frame rate (only frames that are drawn count).
    if (draw) {
      const now = performance.now();
      if (this.lastReal) this.budget = stepBudget(this.budget, (now - this.lastReal) / 1000, t);
      this.lastReal = now;
    }
    if (this.sceneryFixed !== null) this.budget.radius = Math.min(t.haze.far, Math.max(1, this.sceneryFixed));
    LIGHT_UNIFORMS.uScenery.value.set(this.budget.radius, Math.max(1, t.scenery.fade));
    const a = (pose.angle * Math.PI) / 180;
    // Camera, snapped to the pixel grid along the screen's axes so the art does not shimmer.
    const wpp = (2 * pose.distance * Math.tan((t.camera.fov * Math.PI) / 360)) / this.height;
    const up = new THREE.Vector3(0, Math.cos(a), -Math.sin(a));
    // The rolling ground: its window follows her, and the camera rides over its height.
    this.time("start");
    if (this.heights.follow(g.witch.x, g.witch.z)) this.stats.heightMoves = (this.stats.heightMoves ?? 0) + 1;
    this.time("heights");
    this.ground.follow(g.witch.x, g.witch.z);
    // Riding the hills smoothly (Ed, v289): she and the camera follow damped heights, not the bumps.
    {
      const W = g.witch, rdt = Number.isNaN(this.rideTime) ? 0 : time - this.rideTime, full = W.mode === "ground" ? t.groundSpeed : t.treetopSpeed;
      this.rideTime = time;
      this.ride.update(rdt, W.x, W.z, W.vx, W.vz, full, groundHeight, t.witch, witchHeight(W, t));
      this.camRide.update(rdt, pose.tx, pose.tz, W.vx, W.vz, full, groundHeight, t.witch, Infinity); // (no floor: just the smoothed ground)
      this.rideOff = W.seated ? 0 : this.ride.h - groundHeight(W.x, W.z);
    }
    const target = new THREE.Vector3(pose.tx, pose.ty + this.camRide.h, pose.tz);
    // The world's bend: only over the treetops (Ed, 2026-10-04), eased in as she rises; from the
    // camera's focus, along its forward on the ground.
    {
      const C = t.camera.curve, m = Math.min(1, Math.max(0, g.witch.lift)), k = C.ground + (C.treetop - C.ground) * m * m * (3 - 2 * m);
      HEIGHT_UNIFORMS.uBend.value.set(Math.max(0, k), pose.tx, pose.tz, t.ground.hills.on ? t.ground.hills.amplitude : 0); // (w: the hills' amplitude, for the horizon test)
      this.bendTo = Math.max(0, g.witch.mode === "rising" || g.witch.mode === "treetop" ? C.treetop : C.ground);
      HEIGHT_UNIFORMS.uBendFwd.value.set(0, -1); // the camera always looks north (toward -z)
      const far = t.haze.far;
      this.sky.update(k, pose.tx, pose.tz, far, 2 * far * Math.tan((t.camera.fov * Math.PI) / 360) * (this.width / this.height), this.updateMoon(g));
    }
    this.time("sky");
    const u = target.dot(up), r = target.x, eu = Math.round(u / wpp) * wpp - u, er = Math.round(r / wpp) * wpp - r;
    target.addScaledVector(up, eu);
    target.x += er;
    // What the snap took off (in the picture's pixels): main.ts moves the canvas back by it, in whole
    // screen pixels, so the art stays on its grid but the view glides (Ed, 2026-10-05: whole art-pixel
    // steps of the camera felt like a low framerate). Moved right, the picture moves left; up, down.
    this.subpixel.x = er / wpp; this.subpixel.y = -eu / wpp;
    const back = new THREE.Vector3(0, Math.sin(a), Math.cos(a)).multiplyScalar(pose.distance);
    this.camera.position.copy(target).add(back);
    // Over tall hills a rise between the camera and her could hide her: lift the camera (eased)
    // just enough that its line of sight to her clears the ground in between by 4 m.
    {
      let need = 0;
      for (let f = 0.08; f < 0.95; f += 0.08) {
        const px = target.x + back.x * f, pz = target.z + back.z * f, line = target.y + back.y * f;
        need = Math.max(need, (groundHeight(px, pz) + 4 - line) / f);
      }
      this.camLift += (Math.max(0, need) - this.camLift) * (need > this.camLift ? 0.35 : 0.06);
      this.camera.position.y += this.camLift;
    }
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(target);
    // A legend's quake nearby shakes the screen (only legends: Stage 4).
    const shake = this.leashView.shake(time);
    if (shake > 0) this.camera.position.add(this.v3.set(Math.sin(time * 61) * shake, Math.sin(time * 47 + 1) * shake * 0.6, 0));
    updateFrustum(this);

    // Sprites face the camera, tilted back toward it by spriteTilt.
    const tilt = t.spriteTilt;
    SPRITE_UNIFORMS.uUp.value.set(0, 1, 0).lerp(up, tilt).normalize();
    SPRITE_UNIFORMS.uFacing.value.crossVectors(SPRITE_UNIFORMS.uRight.value, SPRITE_UNIFORMS.uUp.value).normalize();
    // The canopy is always drawn; round the witch a hole is cut, sized to the view, which shrinks
    // to nothing as she rises (and opens as she descends).
    const lifted = canopyShown(g.witch), cut = t.canopyCutout;
    this.camera.updateMatrixWorld();
    const ws = placed(this.v3.set(g.witch.x, witchHeight(g.witch, t) * 0.5 + this.rideOff, g.witch.z)).project(this.camera);
    // (The edge stays its full softness as the hole closes: shrunk with it, a small hole's edge was crisp, Ed v289.)
    SPRITE_UNIFORMS.uCutout.value.set((ws.x * 0.5 + 0.5) * this.width, (ws.y * 0.5 + 0.5) * this.height, 0.5 * cut.screenFraction * this.width * (1 - lifted), Math.max(1, cut.edge * this.width));
    SPRITE_UNIFORMS.uCutWhole.value = cut.whole ?? 0;
    SPRITE_UNIFORMS.uTopFade.value = lifted;
    SPRITE_UNIFORMS.uTrunkFade.value.set(t.trunkFade.metres, this.mpp, t.trunkFade.share);
    SPRITE_UNIFORMS.uTrunkLook.value.set(t.trunkFade.lightFloor, t.trunkFade.rim);
    SPRITE_UNIFORMS.uDebugTrunks.value = this.debugTrunks ? 1 : 0;
    const Fd = t.find; // finding wild creatures in the dark (Ed, v244; ?find=0 turns it off)
    SPRITE_UNIFORMS.uFindLook.value.set(Fd.on ? Fd.lightFloor : 0, Fd.on ? Fd.rim : 0, Fd.on ? Fd.eyeshine.strength : 0, Fd.eyeshine.blink);
    SPRITE_UNIFORMS.uEyeRange.value = Fd.eyeshine.range;
    // The wind: gentler over the treetops (Ed, v171: "gentle and lovely").
    const W = t.wind;
    SPRITE_UNIFORMS.uWind.value.set(W.on ? W.strength * (1 + (W.treetop - 1) * lifted) : 0, W.speed, W.gustScale, time);
    // The witch's glow reaches as far as the ground-mode canopy hole round her (Ed, v149: "about
    // the width of the canopy hiding circle"): the hole's radius plus its soft edge, in metres at
    // her depth, times glowToCutout; beyond it the forest is dark. ?glow= fixes it instead.
    if (!t.glowFixed) {
      const wx = g.witch.x, wz = g.witch.z, R = SPRITE_UNIFORMS.uRight.value;
      const a = placed(this.v3.set(wx, 0, wz)).project(this.camera).x, b = placed(this.v3.set(wx + R.x * 10, 0, wz + R.z * 10)).project(this.camera).x;
      const pxPerM = Math.max(1e-3, (Math.abs(b - a) * 0.5 * this.width) / 10);
      LIGHT_UNIFORMS.uGlowR.value = ((0.5 * cut.screenFraction + cut.edge) * this.width / pxPerM) * t.glowToCutout;
    }
    SPRITE_UNIFORMS.uDebugCull.value = this.debugCull ? 1 : 0;

    const w = g.witch, h = witchHeight(w, t);
    LIGHT_UNIFORMS.uGlowPos.value.set(w.x, groundHeight(w.x, w.z) + this.rideOff + h + t.glowHeight, w.z);
    LIGHT_UNIFORMS.uHazeCentre.value.set(w.x, w.z);
    // The mood where she is (render/mood.ts): each area's own fog, grade tint and mist, eased across;
    // which area, looked up four times a second.
    if (this.areaMoods) {
      if (!(time < this.moodAt) || time < this.moodAt - 1) {
        this.moodAt = time + 0.25;
        const d = g.map.dancefloor;
        this.moodArea = Math.hypot(w.x - d.x, w.z - d.z) < g.map.homeRadius ? "home" : AREA_TYPES[g.map.typeOf(...g.map.cellSafe(w.x, w.z).cell)]?.id ?? "";
      }
      this.areaMoods.update(this.moodArea, Number.isNaN(this.moodTime) ? 0 : time - this.moodTime, LIGHT_UNIFORMS.uHazeColour.value, this.post.gradeTint, this.mist);
      this.moodTime = time;
    }
    this.time("uniforms");
    updateSources(this, time);
    this.time("sources");
    // The party: soundsystems rising in partifying areas, their lights, the sweeping fronts.
    const party = this.partyView.update(g, time, (x, z, ww, hh) => inView(this, x, z, ww, hh, 4), () => false);
    this.soundBatch.set(party.items);
    this.ground.setSweeps(party.sweeps);
    this.ground.setLegendRings(this.legendRings(g, time), this.ringCount);
    this.ground.setLegendFloors(this.floorItems, this.ringCount);
    this.lasers.update(time, party.playing, w.x, w.z, this.speakerTops, g.map.dancefloor);
    {
      // The ley lines: fading from the colour of the area each starts in to that of the area it ends
      // in (Ed, 2026-10-05), the colour partified areas and soundsystems use: its creature's sigil's.
      // (advance "wave": it moves on only when the next area's wave arrives, not when its quest is done)
      // (Nothing allocated a frame but on a change: the key's a number, the callbacks are the view's own.)
      this.leyParty = t.leyLines.advance === "wave" ? (this.leyParty?.areas === g.party.areas && this.leyParty.wave === g.party.wave ? this.leyParty : { ...g.party, leyDone: undefined }) : g.party;
      if (1 - g.partyOver !== this.leyShown) { this.leyShown = 1 - g.partyOver; this.ley.scale(this.leyBright * this.leyShown); } // (the party's over: the line fades)
      this.ley.update(leyKey(this.leyParty), this.leyChainNow, this.leyColour, time, canopyShown(w));
      this.ley.pulse(shaderPulse(g.party, g.map, time)); // the wave's pulse along the current link, by the party's clock (as the HUD's pointer)
      this.ley.grow(leyReveal(g.party, g.map, time, t.leyLines.reveal ?? 3)); // none while home boots, then out from the treehouse along the route (Ed)
      { // The boot's ring (rules/bootRing.ts): the line round the home ring at reveal x the pulse, the pulse turning the stones; faint after.
        const B = bootPath(g.map), share = bootShare(g.party, g.map, time), live = g.party.spellAt !== null && share < 1;
        this.ley.ring(live ? bootPulseAt(g.party, g.map, time) / B.length : null, bootLineAt(g.party, g.map, time, t.leyLines.reveal ?? 3) / B.length, (g.party.spellAt === null ? 0 : live ? 1 : 0.35) * this.leyShown, this.leyRgb ?? undefined);
      }
    }
    // The sleeping legends' clearings: their twilight and motes, the nearest few (render/glades.ts).
    { const gdt = Math.min(0.1, Math.max(0, time - this.gladeTime)); this.gladeTime = time; this.glades.update(g, w.x, w.z, gdt, w.mode === "ground"); }
    this.time("party");
    // The canopy uplight over the nearest partified areas, fading in with each one's transition.
    {
      const U = SPRITE_UNIFORMS, P = t.party, list = [...g.party.areas.values()].map(a => ({ a, s: g.map.siteOf(a.cell[0], a.cell[1]) }))
        .sort((p, q) => Math.hypot(p.s.x - w.x, p.s.z - w.z) - Math.hypot(q.s.x - w.x, q.s.z - w.z)).slice(0, 16);
      list.forEach(({ a, s }, i) => {
        const fade = a.wave === 0 ? 1 : Math.min(1, Math.max(0, (time - a.at) / Math.max(0.01, P.transition)));
        U.uParty.value[i].set(s.x, s.z, g.map.areaSize * 0.85, fade);
        const c = sigilColour(AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature);
        U.uPartyCol.value[i].set(c[0] / 255, c[1] / 255, c[2] / 255);
      });
      U.uPartyCount.value = list.length;
      U.uUplight.value.set(P.uplight.strength, P.uplight.pulse, P.uplight.edge, (beatTime(g.beat, time) * t.beat.bpm / 60) * Math.PI * 2);
    }
    this.strings.update();
    this.borders.update();
    // A point on the treehouse's sprite (its pixels) in the world, standing on its spot.
    const T = this.assets.treehouse, thf = T.atlas.frames[0], at = placeTreehouse(this, pose.angle), U2 = SPRITE_UNIFORMS;
    const onTreehouse = (px: number, py: number) => {
      const r = U2.uRight.value, u = U2.uUp.value, dx = (px - thf.w / 2) * this.mpp, dy = (thf.h - py) * this.mpp;
      return { x: at.x + r.x * dx + u.x * dy, y: at.y + r.y * dx + u.y * dy, z: at.z + r.z * dx + u.z * dy };
    };
    const thLights: ForestLight[] = T.lights.filter(l => l.kind === "lantern" || l.kind === "window").slice(0, 2).map(l => ({
      ...onTreehouse(l.x, l.y), reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3 + l.x)),
    }));
    const markerLights = drawMarkers(this, time);
    const speakerLights = drawSpeakers(this, time, pose.angle);
    this.spellFx.update(g, ht, witchHeight(w, t) + 0.6 + this.rideOff);
    {
      // her trail: behind her broom, as long as she's fast, in the colour of the area under her (its creature's neon, as the
      // ley lines and runestones; home's own lavender)
      const lift = canopyShown(w), A = g.map.areaAt(w.x, w.z), sp = Math.hypot(w.vx, w.vz), top = t.groundSpeed + (t.treetopSpeed - t.groundSpeed) * lift;
      const c = A.look === HOME_LOOK ? this.trailRgb.set(0.8, 0.7, 1) : this.trailRgb.copy(this.markerArt.colour.get(AREA_TYPES[A.type].creature) ?? this.trailRgb.set(0.8, 0.7, 1));
      const dt = this.trailAt < 0 ? 0 : Math.min(0.1, Math.max(0, ht - this.trailAt)); this.trailAt = ht;
      const back = sp > 0.1 ? 0.6 / sp : 0, D = g.witches[0].dash;
      this.trail.update(w.x - w.vx * back, witchHeight(w, t) + 0.25 + this.rideOff, w.z - w.vz * back, sp, top, lift, c, ht, dt, D.at);
    }
    this.actionBar.update(g, ht);
    this.buffHud.update(g, time);
    // Tufts part round her and the three nearest creatures.
    // (only those within reach made into objects: mapping every creature, a thousand late in a run, every frame was much of the frame's garbage)
    const near: { x: number; z: number; r: number; d: number }[] = [], GR = t.groundCover.radius;
    for (const c of g.creatures) {
      const dx = c.x - w.x, dz = c.z - w.z;
      if (Math.abs(dx) >= GR || Math.abs(dz) >= GR) continue;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < GR) near.push({ x: c.x, z: c.z, r: Math.max(0.8, (this.leashView.tops.get(c.id) ?? 1.6) * 0.75), d }); // parting by its drawn size (#47)
    }
    const parts = [{ x: w.x, z: w.z, r: 1.6 * (1 - canopyShown(w)) }, ...near.sort((a, b) => a.d - b.d).slice(0, 3)];
    // No tufts over a placed sigil's rune (Ed, v233): trampled out to groundCover.sigilClear, or the rune's own size.
    const clear = g.leash.placed.map(p => ({ x: p.x, z: p.z, r: Math.max(t.groundCover.sigilClear, (3 + g.creatures[p.id].level * 0.8) * 0.45) }));
    { const H = g.witches[0].hat.down; if (H && g.witches[0].hat.has) clear.push({ x: H.x + HAT_BESIDE, z: H.z, r: t.groundCover.sigilClear }); } // (her hat where it lies)
    for (const c of g.creatures) if (Math.abs(c.x - w.x) < GR && Math.abs(c.z - w.z) < GR && hasRune(c)) clear.push({ x: c.x, z: c.z, r: t.groundCover.sigilClear }); // (a happy one's rune at its feet)
    for (const r of g.relics) if (r.state === "lying" && Math.abs(r.sx - w.x) < GR && Math.abs(r.sz - w.z) < GR) clear.push({ x: r.sx, z: r.sz, r: Math.max(t.groundCover.sigilClear, 3.4 * 0.45) }); // (and a relic's sigil, south of it)
    this.time("markers");
    this.grass.update(w.x, w.z, 1 - canopyShown(w), parts, LIGHT_UNIFORMS.uGlowR.value * 1.05, clear); // out to the canopy hole's edge
    const partyObjectLights = this.partyObjects.update(g, time, this.camera, (x, z, ww, hh) => inView(this, x, z, ww, hh, 4), this.worldFires, this.lastView);
    this.updateSmoke(g, time);
    if (t.bare) { this.dancefloor.update(time, this.ground, g); setLights(this, [], w.x, w.z); } else setLights(this, [this.dancefloor.update(time, this.ground, g), ...party.lights, ...thLights, ...markerLights, ...speakerLights, ...partyObjectLights, ...this.forestLights], w.x, w.z);
    this.time("grass+lights");
    LIGHT_UNIFORMS.uTime.value = time;
    this.mist?.follow(pose.tx, pose.tz);
    const bob = Math.sin(ht * 2.4) * 0.12;
    // Her hover frames, turned away when flying up the screen, leaning when fast.
    // Climbing to the treetops or dropping to the ground: the rise or descend pose, fluttering
    // between its two frames, until the move is about 90% done.
    const climbing = w.mode === "rising" && w.lift < 0.9, dropping = w.mode === "descending" && w.lift > 0.1;
    // Leaning, her four-frame lean cycle (#37) plays faster the faster she goes: 8 fps at her ordinary ground speed.
    const ldt = Math.min(0.1, Math.max(0, ht - this.leanTime));
    this.leanTime = ht;
    this.leanPhase += ldt * 8 * Math.hypot(w.vx, w.vz) / Math.max(1, t.groundSpeed);
    const leanK = Math.floor(this.leanPhase) % 4, LC = this.assets.witchLean[w.away ? "away" : "towards"];
    let wf = climbing || dropping ? (climbing ? 8 : 12) + (w.away ? 2 : 0) + (Math.floor(ht * 7) % 2)
      : w.lean ? LC[leanK] ?? 6 + (w.away ? 1 : 0) : (w.away ? 3 : 0) + (Math.floor(ht * 4) % 3);
    // Treetop momentum: skidding to brake on a sharp turn, and the fast pose at boost.
    if (!climbing && !dropping) {
      const Fl = this.assets.witchFly, sideF = w.away ? "away" : "towards";
      if (w.braking) wf = Fl.brake[sideF][Math.floor(ht * Fl.brake.fps) % Fl.brake[sideF].length];
      else if ((w.boost ?? 0) > 0.7) wf = Fl.fast[sideF][Math.floor(ht * Fl.fast.fps) % Fl.fast[sideF].length];
      // Straight up or down the screen (#27): her heading frames, from behind or coming at us.
      const Hd = w.heading && w.heading !== "side" ? this.assets.witchHeading[w.heading] : null;
      if (Hd) wf = w.braking ? Hd.brake[Math.floor(ht * Fl.brake.fps) % Hd.brake.length] : (w.boost ?? 0) > 0.7 ? Hd.fast[Math.floor(ht * Fl.fast.fps) % Hd.fast.length] : w.lean ? Hd.leanCycle[leanK] ?? Hd.lean : Hd.hover[Math.floor(ht * 4) % Hd.hover.length];
    }
    // Handling a sigil, she lands first (Ed, 2026-10-03): down to the ground, then the placeSigil or
    // liftSigil pose, and back up into the air when she's done. Talking (by herself, Ed v244), she
    // chats on the fly while moving and settles into the talk pose when she comes to rest.
    const L = g.leash, F = this.assets.witchFoot, side = w.away ? "away" : "towards";
    for (const e of L.events) if (e.kind === "placed" || e.kind === "fizzled") this.footAct = { pose: "placeSigil", at: ht }; else if (e.kind === "picked" || e.kind === "hatPicked") this.footAct = { pose: "liftSigil", at: ht };
    const actLen = this.footAct ? F[this.footAct.pose].towards.length / F[this.footAct.pose].fps : 0;
    const acting = !!this.footAct && ht - this.footAct.at < actLen + 0.3;
    const still = Math.hypot(w.vx, w.vz) < 0.6;
    const wantFoot = w.mode === "ground" && ((!!L.talk && still) || acting || !!w.stargazing) ? 1 : 0;
    const fdt = Math.min(0.1, Math.max(0, ht - this.footTime)), prevFoot = this.foot;
    this.footTime = ht;
    this.foot += (wantFoot - this.foot) * Math.min(1, fdt * 8);
    if (Math.abs(wantFoot - this.foot) < 0.01) this.foot = wantFoot;
    const pick = (pose: string, k: number) => { const fr = F[pose][side]; return fr[Math.max(0, Math.min(fr.length - 1, k))]; };
    if (this.foot > 0.6) {
      if (acting && this.footAct) wf = pick(this.footAct.pose, Math.floor((ht - this.footAct.at) * F[this.footAct.pose].fps));
      else if (L.talk) wf = pick("talk", Math.floor(ht * F.talk.fps) % F.talk[side].length);
      else wf = pick("stand", Math.floor(ht * F.stand.fps) % F.stand[side].length);
    } else if (this.foot > 0.02) wf = this.foot >= prevFoot ? pick("land", Math.floor(this.foot * 3)) : pick("takeoff", Math.floor((1 - this.foot) * 3));
    const footEase = this.foot * this.foot * (3 - 2 * this.foot), wy = (h + bob - 0.4) * (1 - footEase);
    // At the start she sits on the treehouse terrace (the sit pose, swinging her legs), and eases
    // off it into the air when she first moves.
    const sdt = Math.min(0.1, Math.max(0, ht - this.seatTime));
    this.seatTime = ht;
    this.seatK = w.seated ? 1 : Math.max(0, this.seatK - sdt / 1.0); // down from the studio (some 7 m up) over a second
    let wx = w.x, wz = w.z, wyy = wy;
    // Staggered by a blow (rules/knock.ts): a wobble side to side, fading as it wears off.
    { const K = g.witches[0].knock; if (stunned(K, ht)) { const left = (K!.stunUntil - ht) / Math.max(0.1, K!.stunUntil - K!.at); wx += Math.sin(ht * 34) * 0.18 * Math.min(1, left * 2); } }
    if (this.seatK > 0) {
      const seat = onTreehouse(T.seat.x, T.seat.y), k = this.seatK * this.seatK * (3 - 2 * this.seatK);
      const cam = onTreehouse(T.camera.x, T.camera.y);
      g.introFocus = { x: cam.x, y: cam.y, z: cam.z }; // the opening shot frames the studio (the art's camera anchor)
      const fwd = this.camera.getWorldDirection(this.v3);
      wx += (seat.x - fwd.x * 0.6 - wx) * k; wyy += (seat.y - fwd.y * 0.6 - wyy) * k; wz += (seat.z - fwd.z * 0.6 - wz) * k;
      if (w.seated) {
        // Behind the decks (Ed, 2026-10-06): standing, waiting for the party spell; casting it, her arms up over her hat
        // (the liftSigil pose, through once over the cast) in a burst of sparkles; in a game without the spell, sitting.
        const sp = g.party.spellAt, casting = typeof sp === "number" && time >= sp && time < sp + PARTY_CAST;
        if (casting) { const n = F.liftSigil.towards.length; wf = F.liftSigil.towards[Math.min(n - 1, Math.floor(((time - sp!) / PARTY_CAST) * n))]; }
        else if (sp === undefined) wf = F.sit.towards[Math.floor(time * F.sit.fps) % F.sit.towards.length];
        else wf = F.stand.towards[Math.floor(time * F.stand.fps) % F.stand.towards.length];
        if (typeof sp === "number" && sp !== this.castSeen) { this.castSeen = sp; this.spellFx.partyBurst(wx, wyy, wz, sp); }
      }
    }
    // Knocked out (Ed, 2026-10-04): she sits slumped on the ground while her stack lets go, then
    // vanishes in a sparkle and comes back in one at the treehouse.
    const KO = g.witches[0].ko;
    // Mid-blink she's nowhere (from the step it starts, so she never slides between its two points).
    const D = g.witches[0].dash;
    let hidden = ht >= D.at - STEP && ht < D.until;
    if (KO) {
      if (ht < KO.teleportAt) { wf = F.sit.towards[Math.floor(ht * F.sit.fps) % F.sit.towards.length]; wyy = 0; }
      else hidden = ht < KO.backAt - (KO.backAt - KO.teleportAt) * 0.25;
    }
    // Over the ride's smoothed height (eased in off the treehouse seat).
    wyy += this.rideOff * (1 - this.seatK * this.seatK * (3 - 2 * this.seatK));
    // Her hat knocked off (rules/hat.ts): her frames without it, and the hat where it lies. Baked a moment after the game is up
    // (not at a knockout, mid-fight), if she has a hat to lose.
    const Hat = g.witches[0].hat;
    if (!this.bareAsked && Hat.has && !g.clock.paused && ht > 1) { this.bareAsked = true; setTimeout(() => { this.bareBatch ??= this.makeWitchBatch(true); }, 0); }
    const bare = Hat.has && !!Hat.down ? (this.bareBatch ??= this.makeWitchBatch(true)) : null;
    const wframe = (bare ? this.assets.witchBare() : this.assets.witch).frames[wf], hatTop = wyy + wframe.h * this.mpp;
    this.partyWitchView.update(g, time, (x, z, ww, hh) => inView(this, x, z, ww, hh, 4));
    this.swoopTrails.update(g.partyWitches.list, time);
    this.partyWitchView.bubbles(g, time, this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight);
    const onBeach = this.beachView.update(g, time, (x, z, ww, hh) => inView(this, x, z, ww, hh, 4), this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight);
    this.stateMarks.update(g, time, this.leashView.tops);
    this.inviteView.update(ht, this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, this.leashView.tops);
    // Idling into the party, she's drawn in her party pose there instead.
    const her = this.partyWitchView.herIdle || onBeach || hidden ? [] : [{ x: wx, y: wyy + groundHeight(wx, wz), z: wz, frame: wframe, flip: w.seated ? false : w.facing < 0 }];
    const hatFrame = bare ? this.assets.witchBare().frames[this.assets.witchHatFrame] : undefined;
    this.witchBatch.set(bare ? [] : her);
    this.bareBatch?.set(bare ? (hatFrame ? [...her, { x: Hat.down!.x + HAT_BESIDE, y: groundHeight(Hat.down!.x + HAT_BESIDE, Hat.down!.z), z: Hat.down!.z, frame: hatFrame, flip: false }] : her) : []);
    // The glide by her own snap: what the sprite shader's snap of her base takes off, given back by
    // the canvas's shift (main.ts) with the camera's own snap, so she lands where the unsnapped camera
    // would put her, to a screen pixel, every frame (the world then lands within half an art pixel).
    this.witchBase.x = wx; this.witchBase.y = wyy + groundHeight(wx, wz); this.witchBase.z = wz;
    if (this.glide === "witch" && !hidden && !this.partyWitchView.herIdle && !onBeach) {
      const b = bendPoint(this.v3.set(wx, wyy + groundHeight(wx, wz), wz)).project(this.camera);
      const X = (b.x * 0.5 + 0.5) * this.width, Y = (b.y * 0.5 + 0.5) * this.height;
      // (Her place under the camera before its snap: what her own snap takes off, and what the camera's did.)
      this.subpixel.x += X - (Math.floor(X) + 0.5); this.subpixel.y += -(Y - (Math.floor(Y) + 0.5));
    }
    // Where she is on screen (low-res pixels) and how far from the camera, for the occluder fade.
    {
      const px = (x: number, y: number, z: number) => { const p = placed(this.v3.set(x, y, z)).project(this.camera); return [(p.x + 1) / 2 * this.width, (p.y + 1) / 2 * this.height]; };
      const base = px(wx, wyy, wz), top = px(wx, hatTop, wz), side = px(wx + wframe.w * this.mpp / 2, wyy, wz);
      SPRITE_UNIFORMS.uWitch.value.set((base[0] + top[0]) / 2, (base[1] + top[1]) / 2, Math.abs(side[0] - base[0]) + 1, Math.abs(top[1] - base[1]) / 2 + 1);
      SPRITE_UNIFORMS.uWitchDepth.value = -placed(this.v3.set(wx, this.seatK > 0 ? wyy : h + this.rideOff, wz)).applyMatrix4(this.camera.matrixWorldInverse).z;
      // Her pool on screen, for the grade to spare (render/post.ts: on a dark floor her light sits among the tones the
      // spooky grade drains to blue, and it vanished: the art director's round 3, the fern forest): its centre under her
      // feet and its half-widths across and up the screen, out to half her light's reach.
      const R = LIGHT_UNIFORMS.uGlowR.value * LIGHT_UNIFORMS.uGlowNear.value * 0.5, foot = px(wx, 0, wz), across = px(wx + R, 0, wz), down = px(wx, 0, wz + R);
      this.post.pool.set(foot[0] / this.width, foot[1] / this.height, Math.max(1e-3, Math.abs(across[0] - foot[0]) / this.width), Math.max(1e-3, Math.abs(down[1] - foot[1]) / this.height));
    }
    this.clouds.update(time, this.camera, SPRITE_UNIFORMS.uWitch.value, this.width, this.height);
    this.shadow.position.set(wx, 0.08, wz);
    this.shadow.scale.setScalar((1 - 0.5 * canopyShown(w)) * (1 - this.seatK) + 1e-3); // none while she's up on the terrace

    this.time("witch");
    refresh(this);
    this.time("refresh");
    this.easeAppearing();
    drawCreatures(this, time);
    drawBerries(this, time);
    checkPops(this, "moving");
    this.time("creatures");
    this.rulers.update(this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, w.x, w.z);
    // (no cue toward the dancefloor any more: Ed, 2026-10-06, "You can remove the UI icon that points towards the dancefloor")
    this.minimap.update(g.party, w.x, w.z);
    // The wave pointer (Ed, 2026-10-06): toward the ley line's pulse on its way to the next wave's stone (rules/leypulse.ts,
    // along the link as drawn), 🎶 in its ring as the countdown fills; for a second witch's next stone, its rune as before
    // (Ed, 2026-10-05: "We only need the UI indicator for the next one, not the next two"). None while home boots up (Ed,
    // 2026-10-06: "The wave pointer first appears when bootup finishes"; the dancefloor's boot ring shows the boot), fading
    // in as the pulse sets off.
    {
      const cw = this.canvas.clientWidth || window.innerWidth, ch = this.canvas.clientHeight || window.innerHeight, cd = waveCountdown(g.party, g.map, time);
      const shown = pointerShown(g.party, g.map, time);
      const cue = (list: StoneIndicator[], cells: readonly (readonly [number, number])[], make: () => StoneIndicator, fill: number, label?: string) => {
        while (list.length < cells.length) list.push(make());
        list.forEach((ind, i) => {
          const c = cells[i];
          ind.fade(shown);
          if (!c || shown <= 0) { ind.update(this.camera, cw, ch, null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 0); return; }
          const s = g.map.soundsystemSpot(c[0], c[1]), species = AREA_TYPES[g.map.typeOf(c[0], c[1])].creature;
          const pulse = i === 0 ? leyPulse(g.party, g.map, time, this.ley.currentLink()) : null, at = pulse ?? s;
          ind.update(this.camera, cw, ch, { x: at.x, z: at.z, colour: this.markerArt.colour.get(species)!, species, notes: i === 0 }, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, fill, label);
        });
      };
      // Pausing holds the countdown.
      cue(this.nextStones, g.party.next, () => new StoneIndicator(document.body, 3), cd.gone);
      // Her hat on the ground (Ed, 2026-10-06: "there's a direction marker for it, so you can go back and find it"): toward it
      // off screen, over it on screen, while it lies there; in the HUD's amber.
      const H = hatMarker(g.witches[0].hat);
      if (H || this.hatPointer) {
        const P = (this.hatPointer ??= new StoneIndicator(document.body, 3));
        P.fade(H ? 1 : 0);
        P.update(this.camera, cw, ch, H ? { x: H.x + HAT_BESIDE, z: H.z, colour: HAT_INK, species: "", glyph: HAT } : null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 1);
      }
    }
    this.time("hud");
    this.leashView.update(ht, this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, hatTop);
    this.time("leash");
    // Work done ahead, a little each frame, out of what's left of the frame's budget (Ed, v256:
    // boosting over the treetops dropped frames when a rebuild, the hills' window moving and
    // these all fell in one frame). Each gets at least its floor, so all keep up at full boost.
    let spare = FRAME_MS - (performance.now() - this.frameStart) - this.drawEst;
    const give = (most: number, floor: number) => Math.max(floor, Math.min(most, spare));
    const took = (from: number) => { spare -= performance.now() - from; };
    let t0 = performance.now();
    // The hills' next strip, in the direction she's flying (the window moves every 16 m).
    // (More while it's behind: at full boost the next strip is due every 8 frames or so.)
    this.heightsReady = this.heights.prepare(w.vx, w.vz, give(this.heightsReady ? 2 : 6, 0.5));
    took(t0); this.time("heightsAhead"); t0 = performance.now();
    // The forest ahead, centred where the view will be in two seconds at her speed, so a rebuild
    // finds its chunks already made instead of making a whole strip at once.
    const lv = this.lastView;
    if (lv) this.stats.forestMissing = g.forest.prefetch(lv.x + w.vx * 2, lv.z + w.vz * 2, lv.half + 64, give(4, 1));
    this.stats.forestMs = g.forest.buildMs; g.forest.buildMs = 0;
    took(t0); this.time("prefetch"); t0 = performance.now();
    this.assets.work(give(6, 1));
    took(t0); this.time("art");
    // The ground's area tiles: everything the cameras can see, plus a band ahead.
    this.stats.pendingGround = this.ground.fill(this.renderer, viewRect(this, t.haze.far, 40), w.x, w.z, give(4, 1));
    this.stats.pendingArt = this.assets.pending;
    this.time("groundTiles");
    if (this.debugCull) drawGhosts(this, time);
    if (!draw) return;
    this.renderer.info.reset();
    this.post.lift = this.game.witch.lift;
    if (t.bare) this.hideForBare();
    this.post.render(this.scene, this.camera);
    this.time("draw");
    this.drawEst += (Math.min(8, this.ms.draw) - this.drawEst) * 0.1; // (eased; a stalled frame counts for at most 8 ms)
    // Anything set but not drawn (three.js capping a batch's instances) is a bug: count and log it.
    let dropped = 0;
    for (const b of [...this.typeBatches.values(), ...this.creatureBatches.values(), this.propBatch, this.soundBatch, ...(this.speakerBatch ? [this.speakerBatch] : [])]) dropped += b.dropped;
    if (dropped && !this.stats.dropped) console.warn(`view: ${dropped} sprite instances set but not drawn`);
    this.stats.dropped = dropped;
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.batches = this.typeBatches.size + this.creatureBatches.size;
    this.stats.sceneryRadius = this.budget.radius; this.stats.fps = this.budget.fps;
    this.stats.scenery = this.stats.trees + this.stats.bushes;
    this.stats.gameplay = this.stats.creatures + this.propBatch.count + this.soundBatch.count;
  }
}

