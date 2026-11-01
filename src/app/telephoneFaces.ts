import { appearance } from "../platform/online/appearance";
import { telephoneNumber, type TelephoneStorage } from "./telephoneBook";
import { DEFAULT_OUTFIT } from "../../art/witch.js";

export interface TelephoneFace { hair: string; skin: number[]; hairColour: number[]; shades: boolean; earrings: boolean }
const KEY = "witch.telephone.faces.v1";
const colour = (v: unknown): v is number[] => Array.isArray(v) && v.length === 3 && v.every(n => typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 1);
export function telephoneFace(value: unknown): TelephoneFace | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  if (Object.keys(v).sort().join() !== "earrings,hair,hairColour,shades,skin" || !["long", "bob", "buns", "mohawk"].includes(String(v.hair)) || !colour(v.skin) || !colour(v.hairColour) || typeof v.shades !== "boolean" || typeof v.earrings !== "boolean") return null;
  return structuredClone(v) as unknown as TelephoneFace;
}
/** Clearable cosmetic data only. Signing identity remains in the separate verified telephone book. */
export function telephoneFaces(storage: TelephoneStorage | null) {
  let faces: Record<string, TelephoneFace> = {};
  try { const saved = JSON.parse(storage?.getItem(KEY) ?? "{}"); if (saved && typeof saved === "object" && !Array.isArray(saved)) for (const [number, value] of Object.entries(saved).slice(0, 24)) { const face = telephoneFace(value); if (telephoneNumber(number) && face) faces[number] = face; } } catch { /* Cosmetic storage is optional. */ }
  const save = () => { try { storage?.setItem(KEY, JSON.stringify(faces)); } catch { /* Transient cosmetics only. */ } };
  return {
    get(number: string) { return faces[number] ? structuredClone(faces[number]) : null; },
    remember(number: string, value: unknown) {
      const look = appearance(value); if (!telephoneNumber(number) || !look) return;
      const p = look.palette as Record<string, number[]> | null, a = look.accessories as Record<string, unknown>;
      const defaults = DEFAULT_OUTFIT as Record<string, number[]>;
      const face = telephoneFace({ hair: look.hair, skin: p?.skin ?? defaults.skin, hairColour: p?.hair ?? defaults.hair, shades: !!a.shades, earrings: !!a.earrings });
      if (!face) return; faces = { [number]: face, ...Object.fromEntries(Object.entries(faces).filter(([n]) => n !== number).slice(0, 23)) }; save();
    },
    clear() { faces = {}; save(); },
  };
}
