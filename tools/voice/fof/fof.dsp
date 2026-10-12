// Witch's FOF singing voice (Ed, 2026-10-11: "replace Pink Trombone in the music engine ... with Faust's physmodels.lib FOF
// singing model"): Mike Olsen's pm.SFFormantModelFofSmooth (physmodels.lib, faustlibraries; LGPL with GRAME's exception for
// the compiled code) for each of `unison` detuned voices spread across the stereo field, a vibrato creeping in, breath, and
// the vowel morphing smoothly (0 a, 1 e, 2 i, 3 o, 4 u). Polyphonic (nvoices): the engine plays it with keyOn/keyOff on the
// audio clock. Compiled by tools/voice/fof/build.mjs.
declare name "witchFof";
declare options "[nvoices:8]";
import("stdfaust.lib");

freq = hslider("freq", 220, 40, 2000, 0.01);
gain = hslider("gain", 0.5, 0, 1, 0.001);
gate = button("gate");
voiceType = hslider("/h:voice/type [style:menu{'alto':0;'bass':1;'countertenor':2;'soprano':3;'tenor':4}]", 3, 0, 4, 1);
vowel = hslider("/h:voice/vowel", 0, 0, 4, 0.001) : si.smoo;
detune = hslider("/h:voice/detune [unit:cents]", 9, 0, 40, 0.1);
vibRate = hslider("/h:voice/vibratoRate", 5.2, 0.1, 9, 0.01);
vibDepth = hslider("/h:voice/vibrato [unit:cents]", 22, 0, 80, 0.1);
vibDelay = hslider("/h:voice/vibratoDelay", 0.35, 0, 2, 0.01);
breath = hslider("/h:voice/breath", 0.06, 0, 0.5, 0.001);
attack = hslider("/h:voice/attack", 0.12, 0.001, 2, 0.001);
release = hslider("/h:voice/release", 0.5, 0.01, 4, 0.001);

env = en.asr(attack, 1, release, gate);
// the vibrato creeping in after the note starts (a slow envelope on its depth)
vibIn = en.asr(vibDelay + 0.3, 1, 0.05, gate) : ^(2);
cents(c) = 2 ^ (c / 1200);
vib(ph) = cents(vibDepth * vibIn * os.oscp(vibRate, ph));
one(c, ph) = pm.SFFormantModelFofSmooth(voiceType, vowel, freq * cents(c) * vib(ph), env * gain);
air = no.noise : fi.bandpass(1, 2500, 7000) * (breath * env * gain);
// three voices: one in the middle, one each side a little flat and a little sharp, their vibratos out of step
process = (one(0, 0), one(0 - detune, 2.1), one(detune, 4.2), air) : (_, _, _, _) <: ((_, *(0.8), *(0.2), _ :> _), (_, *(0.2), *(0.8), _ :> _)) : par(i, 2, *(0.45));
