import fs from 'node:fs';
import path from 'node:path';
import { buildTerminology, linkTerminology, reflectionsTerminology } from './src/terminology.mjs';

const root = path.resolve('content');
const markdownFiles = (folder) => fs.existsSync(folder)
  ? fs.readdirSync(folder, { recursive: true }).filter((file) => file.endsWith('.md')).map((file) => path.join(folder, file))
  : [];
const toUrl = (file) => `/${path.relative(root, file).replace(/\\/g, '/').replace(/\.md$/, '/')}`;
const pathPrefix = '/';

export default function (config) {
  config.ignores.add('./docs/**');
  config.ignores.add('./test/**');
  config.ignores.add('./src/**');
  config.addPassthroughCopy('styles.css');
  config.addPassthroughCopy('scripts');
  config.addPassthroughCopy('CNAME');
  config.addFilter('url', (url) => {
    if (/^(?:https?:|#)/.test(url)) return url;
    const normalized = url.startsWith('/') ? url : `/${url}`;
    return normalized.startsWith(pathPrefix) ? normalized : `${pathPrefix.slice(0, -1)}${normalized}`;
  });
  config.addGlobalData('site', { name: '晨汐', description: '记录 AI 学习，把复杂概念讲得可亲近。' });
  config.addFilter('displayDate', (value) => new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(value).replaceAll('/', '.'));
  config.addCollection('recent', (api) => api.getAll().filter((item) => ['个体', '我的感悟'].some((name) => item.inputPath.includes(`/content/${name}/`))).sort((a, b) => b.date - a.date).slice(0, 5));
  config.addCollection('individuals', (api) => api.getFilteredByGlob('./content/个体/**/*.md').sort((a, b) => b.date - a.date));
  config.addCollection('reflections', (api) => api.getFilteredByGlob('./content/我的感悟/**/*.md').sort((a, b) => b.date - a.date));
  config.addCollection('terminology', () => buildTerminology([
    ...markdownFiles(path.join(root, '组织wiki')).map((file) => ({ name: path.basename(file, '.md'), url: toUrl(file), kind: 'wiki' })),
    ...markdownFiles(path.join(root, '器官')).map((file) => ({ name: path.basename(file, '.md'), url: toUrl(file), kind: 'organ' })),
    ...reflectionsTerminology,
  ]));
  config.addFilter('autoLinks', (html, terms, currentTerm) => linkTerminology(html, terms || [], currentTerm));
  return { dir: { input: '.', includes: '_includes', output: 'dist' }, pathPrefix: '/', ignores: ['docs/**', 'test/**', 'src/**', 'node_modules/**'], templateFormats: ['md', 'njk', 'html'] };
}
