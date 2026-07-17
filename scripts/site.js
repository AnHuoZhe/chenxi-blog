const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const themeKey = 'chenxi-theme';

const preferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const setTheme = (theme) => {
  root.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
};

const savedTheme = localStorage.getItem(themeKey);
if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;

themeToggle?.addEventListener('click', () => {
  setTheme((root.dataset.theme || preferredTheme()) === 'dark' ? 'light' : 'dark');
});

const setMenu = (open) => {
  navigation?.classList.toggle('is-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
};

menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});
