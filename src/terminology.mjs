export function buildTerminology(entries) {
  return entries
    .filter(({ name }) => name.length >= 3)
    .sort((left, right) => right.name.length - left.name.length);
}

export function linkTerminology(html, entries, currentTerm = '') {
  return buildTerminology(entries).filter(({ name }) => name !== currentTerm).reduce((result, term) => {
    const escaped = term.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matcher = new RegExp(escaped, 'g');
    return result.replace(matcher, `<a href="${term.url}" target="_blank" rel="noopener noreferrer">${term.name}</a>`);
  }, html);
}
