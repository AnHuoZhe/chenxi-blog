import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const siteScript = new URL('../scripts/site.js', import.meta.url);
const stylesheet = new URL('../styles.css', import.meta.url);

test('ships a compact theme and mobile-navigation controller', async () => {
  const script = await readFile(siteScript, 'utf8');

  assert.ok(script.split(/\r?\n/).length <= 60, 'site script stays within 60 lines');
  assert.match(script, /\.theme-toggle/);
  assert.match(script, /document\.documentElement/);
  assert.match(script, /\.dataset\.theme/);
  assert.match(script, /localStorage/);
  assert.match(script, /\.menu-toggle/);
  assert.match(script, /\.site-nav/);
  assert.match(script, /aria-expanded/);
});

test('styles the controls and the mobile navigation state used by the controller', async () => {
  const css = await readFile(stylesheet, 'utf8');

  assert.match(css, /\.skip-link\b/);
  assert.match(css, /\.visually-hidden\b/);
  assert.match(css, /\.menu-toggle\b/);
  assert.match(css, /\.theme-toggle\b/);
  assert.match(css, /\.site-nav\.is-open\b/);
  assert.match(css, /\.garden-entries__grid\b/);
  assert.match(css, /\.garden-entry\b/);
  assert.match(css, /\.breadcrumb\b/);
  assert.match(css, /\.article-meta\b/);
  assert.match(css, /\.article-return\b/);
  assert.match(css, /\.not-found\b/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)/);
});
