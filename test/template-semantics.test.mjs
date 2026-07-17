import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const baseTemplate = new URL('../_includes/layouts/base.njk', import.meta.url);
const homeTemplate = new URL('../index.njk', import.meta.url);
const cellTemplate = new URL('../细胞.njk', import.meta.url);
const organTemplate = new URL('../器官.njk', import.meta.url);
const individualTemplate = new URL('../个体.njk', import.meta.url);
const wikiIndexTemplate = new URL('../组织wiki.njk', import.meta.url);
const articleTemplate = new URL('../_includes/layouts/article.njk', import.meta.url);
const notFoundTemplate = new URL('../404.njk', import.meta.url);

async function readBaseTemplate() {
  return readFile(baseTemplate, 'utf8');
}

async function readTemplate(template) {
  return readFile(template, 'utf8');
}

test('provides landmark navigation controls and a skip link', async () => {
  const template = await readBaseTemplate();

  assert.match(template, /<a class="skip-link" href="#main-content">/);
  assert.match(template, /<header class="site-header">/);
  assert.match(template, /<button[^>]*class="menu-toggle"[^>]*aria-controls="site-navigation"[^>]*aria-expanded="false"/);
  assert.match(template, /<nav class="site-nav" id="site-navigation" aria-label="主导航">/);
  assert.match(template, /<main id="main-content" tabindex="-1">/);
});

test('exposes a labelled theme control and defers the site script', async () => {
  const template = await readBaseTemplate();

  assert.match(template, /<button[^>]*class="theme-toggle"[^>]*aria-label="切换颜色主题"/);
  assert.match(template, /<script src="{{ '\/scripts\/site\.js' \| url }}" defer><\/script>/);
});

test('provides labelled knowledge-garden entry points on the home page', async () => {
  const template = await readTemplate(homeTemplate);

  assert.match(template, /class="garden-entries"/);
  assert.match(template, /aria-labelledby="garden-entries-title"/);
  assert.match(template, /href="{{ '\/细胞\/' \| url }}"/);
  assert.match(template, /href="{{ '\/器官\/' \| url }}"/);
  assert.match(template, /href="{{ '\/个体\/' \| url }}"/);
  assert.match(template, /href="{{ '\/组织wiki\/' \| url }}"/);
  assert.match(template, /class="recent-posts"/);
});

test('gives each collection page a labelled header and list structure', async () => {
  const [cells, organs, individuals] = await Promise.all([
    readTemplate(cellTemplate),
    readTemplate(organTemplate),
    readTemplate(individualTemplate),
  ]);

  assert.match(cells, /class="collection-page collection-page--cells"/);
  assert.match(cells, /class="collection-list cards"/);
  assert.match(organs, /class="collection-page collection-page--organs"/);
  assert.match(organs, /class="organ-groups"/);
  assert.match(individuals, /class="collection-page collection-page--individuals"/);
  assert.match(individuals, /class="collection-list cards"/);
});

test('provides a labelled index for organization wiki entries', async () => {
  const template = await readTemplate(wikiIndexTemplate);

  assert.match(template, /class="collection-page collection-page--wiki"/);
  assert.match(template, /aria-labelledby="wiki-index-title"/);
  assert.match(template, /collections\.terminology/);
  assert.match(template, /term\.kind == 'wiki'/);
  assert.match(template, /href="{{ term\.url \| url }}"/);
});

test('makes article navigation, metadata, and return path explicit', async () => {
  const template = await readTemplate(articleTemplate);

  assert.match(template, /<nav class="breadcrumb" aria-label="面包屑导航">/);
  assert.match(template, /class="article-meta"/);
  assert.match(template, /<time class="article-meta__date">/);
  assert.match(template, /class="article-return"/);
});

test('makes the not-found page a self-contained recovery landmark', async () => {
  const template = await readTemplate(notFoundTemplate);

  assert.match(template, /class="[^"]*\bnot-found\b/);
  assert.match(template, /class="not-found__home"/);
});
