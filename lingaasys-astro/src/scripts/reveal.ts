const items = document.querySelectorAll<HTMLElement>('.rv');
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
items.forEach((n, i) => { n.style.transitionDelay = `${(i % 3) * 90}ms`; io.observe(n); });
