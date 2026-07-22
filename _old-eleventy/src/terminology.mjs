const pathPrefix = '/chenxi-blog';

export const reflectionsTerminology = [
  { name: 'LLM', url: '/我的感悟/llm-characteristics-limitations/' },
  { name: 'Agent', url: '/我的感悟/what-is-an-agent/' },
  { name: 'RAG', url: '/我的感悟/traditional-rag-replacement-trends-and-llm-wiki/' },
  { name: 'Prompt工程', url: '/我的感悟/prompt-engineering/' },
  { name: 'AI蒸馏', url: '/我的感悟/ai-distillation-and-digital-twin-differences/' },
  { name: '数字分身', url: '/我的感悟/ai-distillation-and-digital-twin-differences/' },
  { name: 'Eval体系', url: '/我的感悟/eval-system-and-lifecycle/' },
];

export function buildTerminology(entries) {
  return entries
    .filter(({ name }) => name.length >= 3)
    .sort((left, right) => right.name.length - left.name.length);
}

export function linkTerminology(html, entries, currentTerm = '') {
  return buildTerminology(entries).filter(({ name }) => name !== currentTerm).reduce((result, term) => {
    const escaped = term.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matcher = new RegExp(escaped, 'g');
    const url = term.url.startsWith(pathPrefix) ? term.url : `${pathPrefix}${term.url.startsWith('/') ? '' : '/'}${term.url}`;
    return result.replace(matcher, `<a href="${url}" target="_blank" rel="noopener noreferrer">${term.name}</a>`);
  }, html);
}
