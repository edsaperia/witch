import type { TelephoneFace } from "../app/telephoneFaces";
/** Small cosmetic face, no new art job, texture, external image or remembered identity. */
export function telephoneFaceCanvas(face: TelephoneFace): HTMLCanvasElement {
  const c = document.createElement("canvas"); c.width = 24; c.height = 30; c.setAttribute("aria-label", "Face");
  const x = c.getContext("2d"); if (!x) return c;
  const hsl = ([h, s, l]: number[]) => `hsl(${h * 360} ${s * 100}% ${l * 100}%)`;
  x.fillStyle = hsl(face.hairColour); x.fillRect(4, 3, 16, face.hair === "long" ? 25 : 17);
  if (face.hair === "buns") { x.fillRect(0, 2, 7, 8); x.fillRect(17, 2, 7, 8); }
  if (face.hair === "mohawk") { x.clearRect(4, 3, 16, 17); x.fillRect(9, 0, 6, 13); }
  x.fillStyle = hsl(face.skin); x.fillRect(6, 9, 12, 15); x.fillRect(9, 24, 6, 4);
  x.fillStyle = "#23162c"; x.fillRect(8, 14, face.shades ? 9 : 2, face.shades ? 4 : 2); if (!face.shades) x.fillRect(14, 14, 2, 2);
  x.fillStyle = "#91545e"; x.fillRect(10, 21, 4, 1);
  if (face.earrings) { x.fillStyle = "#f8d869"; x.fillRect(4, 20, 2, 3); x.fillRect(18, 20, 2, 3); }
  return c;
}
