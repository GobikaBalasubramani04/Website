/** Turns a set of buttons (data-title / data-text) into a selector that fills a detail panel. */
export function bindPicker(itemSel: string, panelSel: string): void {
  const items = Array.from(document.querySelectorAll<HTMLButtonElement>(itemSel));
  const panel = document.querySelector<HTMLElement>(panelSel);
  if (!panel || !items.length) return;
  const isTile = itemSel === '.tile';
  const select = (b: HTMLButtonElement): void => {
    items.forEach((i) => i.setAttribute('aria-pressed', String(i === b)));
    const wrap = document.createElement('div'); wrap.className = 'fade';
    const h = document.createElement(isTile ? 'h3' : 'h3'); h.textContent = b.dataset.title ?? '';
    const p = document.createElement('p'); p.textContent = b.dataset.text ?? '';
    wrap.append(h, p); panel.replaceChildren(wrap);
  };
  items.forEach((b) => { b.addEventListener('click', () => select(b)); b.addEventListener('mouseenter', () => select(b)); b.addEventListener('focus', () => select(b)); });
  select(items[0]);
}
