import fs from 'node:fs';
import path from 'node:path';
import { buildTerminology, linkTerminology } from './src/terminology.mjs';

const root = path.resolve('content');
const markdownFiles = (folder) => fs.existsSync(folder)
  ? fs.readdirSync(folder, { recursive: true }).filter((file) => file.endsWith('.md')).map((file) => path.join(folder, file))
  : [];
const toUrl = (file) => `/chenxi-blog/${path.relative(root, file).replace(/\\/g, '/').replace(/\.md$/, '/')}`;
const organCategories = ['前端', '后端', '部署', 'AI', '数据'];
const pathPrefix = '/chenxi-blog/';

export default function (config) {
  config.ignores.add('./docs/**');
  config.ignores.add('./test/**');
  config.ignores.add('./src/**');
  config.addPassthroughCopy('styles.css');
  config.addPassthroughCopy('scripts');
  config.addFilter('url', (url) => {
    if (/^(?:https?:|#)/.test(url)) return url;
    const normalized = url.startsWith('/') ? url : `/${url}`;
    return normalized.startsWith(pathPrefix) ? normalized : `${pathPrefix.slice(0, -1)}${normalized}`;
  });
  config.addGlobalData('site', { name: '晨汐', description: '记录 AI 学习，把复杂概念讲得可亲近。' });
  config.addFilter('displayDate', (value) => new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(value).replaceAll('/', '.'));
  config.addCollection('recent', (api) => api.getAll().filter((item) => ['细胞', '器官', '个体'].some((name) => item.inputPath.includes(`/content/${name}/`))).sort((a, b) => b.date - a.date).slice(0, 5));
  config.addCollection('cells', (api) => api.getFilteredByGlob('./content/细胞/**/*.md').sort((a, b) => b.date - a.date));
  config.addCollection('individuals', (api) => api.getFilteredByGlob('./content/个体/**/*.md').sort((a, b) => b.date - a.date));
  config.addCollection('organs', (api) => api.getFilteredByGlob('./content/器官/**/*.md'));
  config.addCollection('organGroups', (api) => {
    const groups = new Map(organCategories.map((name) => [name, []]));
    for (const item of api.getFilteredByGlob('./content/器官/**/*.md')) {
      const relativePath = path.relative(path.join(root, '器官'), path.resolve(item.inputPath));
      const category = relativePath.split(path.sep)[0];
      if (groups.has(category)) groups.get(category).push(item);
    }
    return organCategories.map((name) => ({ name, organs: groups.get(name) }));
  });
  config.addCollection('terminology', () => buildTerminology([
    ...markdownFiles(path.join(root, '组织wiki')).map((file) => ({ name: path.basename(file, '.md'), url: toUrl(file), kind: 'wiki' })),
    ...markdownFiles(path.join(root, '器官')).map((file) => ({ name: path.basename(file, '.md'), url: toUrl(file), kind: 'organ' })),
  ]));
  config.addFilter('autoLinks', (html, terms, currentTerm) => linkTerminology(html, terms || [], currentTerm));
  return { dir: { input: '.', includes: '_includes', output: 'dist' }, pathPrefix: '/chenxi-blog/', ignores: ['docs/**', 'test/**', 'src/**', 'node_modules/**'], templateFormats: ['md', 'njk', 'html'] };
}
