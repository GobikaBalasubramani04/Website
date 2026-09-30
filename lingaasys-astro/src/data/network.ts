export interface OrbitWord { label: string; rx: number; ry: number; tilt: number; speed: number; phase: number; hideOnMobile?: boolean }
export type OrbitDot = [rx: number, ry: number, tilt: number, speed: number, phase: number];
/** rx/ry are fractions of the network width/height; speed is rad/s. */
export const WORDS: OrbitWord[] = [
  { label: 'Technology', rx: .40, ry: .36, tilt: -.25, speed: .07, phase: 0 },
  { label: 'Software', rx: .30, ry: .40, tilt: .4, speed: -.06, phase: 1.2, hideOnMobile: true },
  { label: 'Systems', rx: .24, ry: .24, tilt: .2, speed: .09, phase: 2.4 },
  { label: 'Textile', rx: .36, ry: .22, tilt: .1, speed: -.05, phase: 3.4, hideOnMobile: true },
  { label: 'Development', rx: .44, ry: .30, tilt: -.5, speed: .05, phase: 4.1 },
  { label: 'Engineering', rx: .32, ry: .44, tilt: .6, speed: .06, phase: 5.0 },
  { label: 'Innovation', rx: .46, ry: .20, tilt: .3, speed: -.07, phase: .6 },
  { label: 'Intelligence', rx: .20, ry: .30, tilt: -.4, speed: .08, phase: 1.9, hideOnMobile: true },
  { label: 'Digital', rx: .28, ry: .16, tilt: .9, speed: -.09, phase: 2.9 },
  { label: 'Solutions', rx: .38, ry: .42, tilt: -.7, speed: .045, phase: 3.9, hideOnMobile: true },
  { label: 'AI', rx: .16, ry: .20, tilt: .5, speed: .1, phase: 4.6 },
  { label: 'Data', rx: .34, ry: .30, tilt: -.1, speed: -.06, phase: 5.6 },
  { label: 'Automation', rx: .42, ry: .26, tilt: .7, speed: .055, phase: .3 },
  { label: 'Retail', rx: .47, ry: .38, tilt: -.3, speed: -.045, phase: 1.6, hideOnMobile: true },
  { label: 'FinTech', rx: .26, ry: .46, tilt: .15, speed: .065, phase: 2.2 }];
export const DOTS: OrbitDot[] = [[.35, .3, .3, .08, .5], [.22, .36, -.6, -.07, 2], [.44, .4, .1, .06, 3.3], [.3, .2, .8, -.08, 4.4], [.4, .18, -.2, .07, 5.5], [.18, .28, .4, .09, 1]];
/** Indices 0-14 are words, 15-20 are dots. */
export const EDGES: [number, number][] = [[0,4],[4,6],[6,12],[12,2],[2,8],[8,14],[14,5],[5,11],[11,10],[10,2],[0,15],[15,6],[16,12],[16,4],[17,8],[18,5],[19,11],[20,14],[15,16],[15,18]];
