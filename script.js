const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Simple accessible testimonial carousel: rotates card order on arrow clicks.
const grid = document.querySelector('#testimonial-grid');
document.querySelector('#next-testimonial')?.addEventListener('click', () => {
  if (grid?.firstElementChild) grid.append(grid.firstElementChild);
});
document.querySelector('#prev-testimonial')?.addEventListener('click', () => {
  if (grid?.lastElementChild) grid.prepend(grid.lastElementChild);
});
