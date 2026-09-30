const words = Array.from(document.querySelectorAll<HTMLElement>('#headline .hw'));
const STAGGER = 90, HOLD = 2500, GAP = 350;
if (words.length) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) words.forEach((w) => w.classList.add('show'));
  else {
    const play = (): void => {
      words.forEach((w, i) => setTimeout(() => w.classList.add('show'), i * STAGGER));
      setTimeout(() => { words.forEach((w) => w.classList.remove('show')); setTimeout(play, GAP); }, words.length * STAGGER + 200 + HOLD);
    };
    play();
  }
}
