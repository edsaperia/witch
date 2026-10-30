import type * as THREE from 'three';

/** Stable source fingerprint, independent of material UUIDs and runtime program numbering. */
export function shaderSignature(source: string): string {
  let hash = 2166136261;
  for (let i = 0; i < source.length; i++) hash = Math.imul(hash ^ source.charCodeAt(i), 16777619);
  return `${source.length}:${(hash >>> 0).toString(16)}`;
}
export interface ProgramUse {
  path: string; originallyVisible: boolean; layers: number; material: string;
  vertex: string; fragment: string; fragmentLead: string; uniforms: string[]; defines: string;
}
/** Capture before compileAll temporarily reveals hidden objects. No scene mutation or GL calls. */
export function captureProgramUses(roots: { label: string; root: THREE.Object3D }[]): Map<THREE.Material, ProgramUse[]> {
  const uses = new Map<THREE.Material, ProgramUse[]>();
  const visit = (o: THREE.Object3D, path: string, parentVisible: boolean) => {
    const visible = parentVisible && o.visible;
    for (const m of ([] as THREE.Material[]).concat((o as THREE.Mesh).material ?? [])) {
      const shader = m as THREE.ShaderMaterial;
      const list = uses.get(m) ?? [];
      // Each use retains original ancestor visibility and layer membership; neither means frustum visibility.
      list.push({ path, originallyVisible: visible && m.visible, layers: o.layers.mask, material: m.name || m.type,
        vertex: shaderSignature(shader.vertexShader ?? ''), fragment: shaderSignature(shader.fragmentShader ?? ''),
        fragmentLead: (shader.fragmentShader ?? '').slice(0, 240), uniforms: Object.keys(shader.uniforms ?? {}).sort(),
        defines: JSON.stringify(shader.defines ?? {}) });
      uses.set(m, list);
    }
    o.children.forEach((child, i) => visit(child, `${path}/${i}:${child.name || child.type}`, visible));
  };
  for (const { label, root } of roots) visit(root, label, true);
  return uses;
}
export function mapProgramUses(uses: Map<THREE.Material, ProgramUse[]>, idOf: (m: THREE.Material) => number | undefined) {
  const result: Record<number, { uses: ProgramUse[]; totalUses: number; visibleUses: number }> = {};
  for (const [material, list] of uses) {
    const id = idOf(material); if (id === undefined) continue;
    const row = result[id] ??= { uses: [], totalUses: 0, visibleUses: 0 };
    row.totalUses += list.length; row.visibleUses += list.filter(x => x.originallyVisible).length;
    row.uses.push(...list.slice(0, Math.max(0, 12 - row.uses.length)));
  }
  return result;
}
