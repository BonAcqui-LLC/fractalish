// Strict Boolean retrieval. Ranking never admits a document that fails the query.
export const words = text => text.normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}_]+/gu) || [];
export function parse(query) {
  if (query.length > 500) throw Error('Please keep queries under 500 characters.');
  const tokens = []; let i = 0;
  while (i < query.length) {
    if (/\s/.test(query[i])) { i++; continue; }
    const c = query[i++];
    if ('()-|'.includes(c)) { tokens.push({ type: c === '-' ? 'NOT' : c === '|' ? 'OR' : c }); continue; }
    if (c === '"') {
      const end = query.indexOf('"', i);
      if (end < 0) throw Error('Close the quotation mark around your phrase.');
      const value = words(query.slice(i, end)); i = end + 1;
      if (!value.length) throw Error('Enter words inside quotation marks.');
      tokens.push({ type: 'term', value, prefix: false }); continue;
    }
    let raw = c;
    while (i < query.length && !/[\s()"|]/.test(query[i])) raw += query[i++];
    if (['AND', 'OR', 'NOT'].includes(raw)) { tokens.push({ type: raw }); continue; }
    if (raw.includes('*') && !/^[\p{L}\p{N}_]+\*$/u.test(raw)) throw Error('Use * only at the end of a word, for example morph*.');
    const value = words(raw);
    if (!value.length) throw Error('Enter a word or phrase to search.');
    tokens.push({ type: 'term', value, prefix: raw.endsWith('*') });
  }
  let at = 0;
  function unary() {
    const t = tokens[at++];
    if (!t) throw Error('An operator needs a word, phrase, or group after it.');
    if (t.type === 'NOT') return { type: 'NOT', child: unary() };
    if (t.type === '(') {
      const child = or();
      if (tokens[at++]?.type !== ')') throw Error('Close each opening parenthesis.');
      return child;
    }
    if (t.type !== 'term') throw Error('Expected a word, phrase, or group.');
    return t;
  }
  function and() {
    let node = unary();
    while (at < tokens.length && !['OR', ')'].includes(tokens[at].type)) {
      if (tokens[at].type === 'AND') at++;
      node = { type: 'AND', left: node, right: unary() };
    }
    return node;
  }
  function or() {
    let node = and();
    while (tokens[at]?.type === 'OR') { at++; node = { type: 'OR', left: node, right: and() }; }
    return node;
  }
  if (!tokens.length) return null;
  const tree = or();
  if (at !== tokens.length) throw Error('Unexpected closing parenthesis.');
  return tree;
}
export function occurrences(tokens, term) {
  let count = 0;
  for (let i = 0; i <= tokens.length - term.value.length; i++) {
    if (term.value.every((w, j) => term.prefix ? tokens[i+j].startsWith(w) : tokens[i+j] === w)) count++;
  }
  return count;
}
export function positiveTerms(tree, negative = false) {
  if (!tree) return [];
  if (tree.type === 'term') return negative ? [] : [tree];
  if (tree.type === 'NOT') return positiveTerms(tree.child, !negative);
  return [...positiveTerms(tree.left, negative), ...positiveTerms(tree.right, negative)];
}
export function prepare(documents) {
  return documents.map(d => ({ ...d, fields: [d.title, d.headings, d.text].map(words) }));
}
export function search(documents, query) {
  const tree = parse(query);
  if (!tree) return [];
  const terms = positiveTerms(tree);
  const matches = (d, t) => {
    if (t.type === 'term') return d.fields.some(f => occurrences(f, t));
    if (t.type === 'NOT') return !matches(d, t.child);
    if (t.type === 'AND') return matches(d, t.left) && matches(d, t.right);
    return matches(d, t.left) || matches(d, t.right);
  };
  const idf = terms.map(t => Math.log(1 + documents.length / (1 + documents.filter(d => matches(d, t)).length)));
  return documents.filter(d => matches(d, tree)).map(d => ({ ...d,
    score: terms.reduce((sum, t, i) => sum + idf[i] * d.fields.reduce((s, f, j) => {
      const n = occurrences(f, t);
      return s + [12, 5, 1][j] * (n ? 1 + Math.log(n) : 0) / (1 + f.length / [80, 300, 2500][j]);
    }, 0) * (t.value.length > 1 ? 2 : 1), 0)
  })).sort((a,b) => b.score - a.score || a.title.localeCompare(b.title) || a.url.localeCompare(b.url));
}
