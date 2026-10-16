/**
 * Static axonometric projection for the stack plate.
 * Plane coordinates (x along the width, y along the depth, z up) map to screen
 * coordinates. No CSS transforms: the geometry is computed, so the SVG stays
 * plain and the "no motion" rule is untouched.
 */
export const ISO = { ax: 0.94, ay: 0.3 } as const

export type Pt = [number, number]
export interface Origin { x: number; y: number }

export function project(x: number, y: number, z = 0, o: Origin = { x: 0, y: 0 }): Pt {
  return [o.x + (x - y) * ISO.ax, o.y + (x + y) * ISO.ay - z]
}

/** Four corners of a rectangle lying on the plane at height z: top, right, bottom, left. */
export function rect(x: number, y: number, w: number, h: number, z = 0, o?: Origin): Pt[] {
  return [project(x, y, z, o), project(x + w, y, z, o), project(x + w, y + h, z, o), project(x, y + h, z, o)]
}

export const points = (pts: Pt[]) => pts.map(([a, b]) => `${round(a)},${round(b)}`).join(' ')
export const round = (n: number) => Math.round(n * 10) / 10

/** SVG matrix that lays upright text along the plane's x direction (a vertical shear). */
export const alongX = (at: Pt) => `matrix(1 ${round(ISO.ay / ISO.ax)} 0 1 ${round(at[0])} ${round(at[1])})`
