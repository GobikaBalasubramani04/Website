const btn = document.getElementById('bot-btn') as HTMLButtonElement | null;
const panel = document.getElementById('bot-panel');
const msgs = document.getElementById('bot-msgs');
const form = document.getElementById('bot-form') as HTMLFormElement | null;
const setOpen = (open: boolean): void => {
  panel?.classList.toggle('open', open);
  btn?.setAttribute('aria-expanded', String(open));
  btn?.setAttribute('aria-label', open ? 'Close chat' : 'Open chat');
  if (open) form?.querySelector('input')?.focus(); else if (document.activeElement && panel?.contains(document.activeElement)) btn?.focus();
};
const add = (text: string, who: 'b' | 'u'): void => {
  const m = document.createElement('div'); m.className = `bm ${who}`; m.textContent = text; msgs?.append(m); msgs?.scrollTo({ top: msgs.scrollHeight });
};
btn?.addEventListener('click', () => setOpen(!panel?.classList.contains('open')));
panel?.querySelector('.bot-x')?.addEventListener('click', () => setOpen(false));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.elements.namedItem('q') as HTMLInputElement;
  const v = input.value.trim(); if (!v) return;
  add(v, 'u'); input.value = '';
  setTimeout(() => add("The assistant isn't connected yet. Please use the Contact page to reach the team.", 'b'), 500);
});
