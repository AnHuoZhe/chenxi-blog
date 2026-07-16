import test from 'node:test';
import assert from 'node:assert/strict';

import { buildTerminology, linkTerminology } from '../src/terminology.mjs';

test('sorts longer terminology before shorter matching names', () => {
  const terms = buildTerminology([
    { name: 'JSON', url: '/组织wiki/JSON.html', kind: 'wiki' },
    { name: 'JSON处理', url: '/器官/数据/JSON处理.html', kind: 'organ' },
  ]);

  assert.deepEqual(terms.map(({ name }) => name), ['JSON处理', 'JSON']);
});

test('does not link the current article terminology to itself', () => {
  const html = linkTerminology('React 会处理 JSON 数据。', [
    { name: 'React', url: '/器官/前端/React/', kind: 'organ' },
    { name: 'JSON', url: '/组织wiki/JSON/', kind: 'wiki' },
  ], 'React');

  assert.match(html, /^React 会处理 /);
  assert.doesNotMatch(html, /href="\/器官\/前端\/React\//);
  assert.match(html, /href="\/组织wiki\/JSON\//);
});
