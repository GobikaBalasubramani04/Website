import { WORDS, DOTS, EDGES } from '../data/network';
type Pt = [number, number];
const net = document.getElementById('net');
const svg = document.getElementById('netsvg') as SVGSVGElement | null;
if (net && svg) init(net, svg);

function init(net: HTMLElement, svg: SVGSVGElement): void {
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag: string, attrs: Record<string, string | number>): SVGElement => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    svg.appendChild(e); return e as SVGElement;
  };
  const words = Array.from(net.querySelectorAll<HTMLElement>('.nw'));
  const guides = ([[.42, .3, -.3], [.3, .38, .5], [.2, .2, 0]] as const).map(([rx, ry, r]) =>
    ({ e: mk('ellipse', { fill: 'none', stroke: '#2a2a2a', 'stroke-width': 1 }), rx, ry, r }));
  const lines = EDGES.map(() => mk('line', { stroke: '#F26522', 'stroke-opacity': .28, 'stroke-width': 1 }));
  const dots = DOTS.map(() => mk('circle', { r: 2.5, fill: '#F26522', 'fill-opacity': .8 }));
  let W = 0, H = 0;
  const size = (): void => { const b = net.getBoundingClientRect(); W = b.width; H = b.height; };
  size();
  const orb = (rx: number, ry: number, tl: number, sp: number, ph: number, t: number, wob: number): Pt => {
    const a = ph + sp * t, x = rx * W * Math.cos(a), y = ry * H * Math.sin(a), c = Math.cos(tl), s = Math.sin(tl);
    return [W / 2 + x * c - y * s + wob * Math.sin(t * .4 + ph * 3), H / 2 + x * s + y * c + wob * Math.cos(t * .35 + ph * 2)];
  };
  const pos: Pt[] = [];
  const frame = (t: number): void => {
    const mob = W <= 600, k = mob ? .8 : 1;
    words.forEach((w, i) => {
      const n = WORDS[i]; if (!n) return;
      let [x, y] = orb(n.rx * k, n.ry, n.tilt, n.speed, n.phase, t, mob ? 4 : 8);
      const hw = w.offsetWidth / 2, hh = w.offsetHeight / 2;
      x = Math.min(W - hw - 2, Math.max(hw + 2, x)); y = Math.min(H - hh - 2, Math.max(hh + 2, y));
      pos[i] = [x, y]; w.style.transform = `translate(${x - hw}px,${y - hh}px)`;
    });
    DOTS.forEach((d, i) => {
      const p = orb(d[0] * k, d[1], d[2], d[3], d[4], t, 6); pos[WORDS.length + i] = p;
      dots[i]?.setAttribute('cx', String(p[0])); dots[i]?.setAttribute('cy', String(p[1]));
    });
    EDGES.forEach(([ia, ib], i) => {
      const a = pos[ia], b = pos[ib], l = lines[i]; if (!a || !b || !l) return;
      const hidden = mob && [ia, ib].some((x) => WORDS[x]?.hideOnMobile);
      l.setAttribute('x1', String(a[0])); l.setAttribute('y1', String(a[1])); l.setAttribute('x2', String(b[0])); l.setAttribute('y2', String(b[1]));
      l.style.display = hidden ? 'none' : '';
    });
    guides.forEach(({ e, rx, ry, r }) => {
      e.setAttribute('cx', String(W / 2)); e.setAttribute('cy', String(H / 2)); e.setAttribute('rx', String(rx * W * k)); e.setAttribute('ry', String(ry * H));
      e.setAttribute('transform', `rotate(${r * 57.3} ${W / 2} ${H / 2})`);
    });
  };
  const highlight = (): void => {
    const on = new Set<number>(); while (on.size < 3) on.add(Math.floor(Math.random() * words.length));
    words.forEach((w, i) => w.classList.toggle('hl', on.has(i)));
  };
  highlight();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    frame(20); addEventListener('resize', () => { size(); frame(20); });
  } else {
    addEventListener('resize', size); setInterval(highlight, 3200);
    const t0 = performance.now();
    const loop = (n: number): void => { frame(20 + (n - t0) / 1000); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
}
